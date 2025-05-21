"use server"

import { createServerClient } from "@/lib/supabase"
import type { Roadmap } from "@/types"
import { revalidatePath } from "next/cache"
import { calculateTimeMetrics } from "@/lib/time-calculations"

// Get all roadmaps with completion stats and real metrics
export async function getRoadmaps() {
  const supabase = createServerClient()

  const { data: roadmaps, error } = await supabase.from("roadmaps").select("*")

  if (error) {
    console.error("Error fetching roadmaps:", error)
    return []
  }

  // Get completion stats for each roadmap
  const { data: completionStats, error: statsError } = await supabase.from("roadmap_completion").select("*")

  if (statsError) {
    console.error("Error fetching completion stats:", statsError)
    return roadmaps
  }

  // Get all tasks to calculate real hours
  const { data: allTasks, error: tasksError } = await supabase.from("tasks").select("*")

  if (tasksError) {
    console.error("Error fetching tasks:", tasksError)
  }

  // Get all phases to map tasks to roadmaps
  const { data: allPhases, error: phasesError } = await supabase.from("phases").select("*")

  if (phasesError) {
    console.error("Error fetching phases:", phasesError)
  }

  // Create a map of phase_id to roadmap_id
  const phaseToRoadmapMap = new Map()
  if (allPhases) {
    allPhases.forEach((phase) => {
      phaseToRoadmapMap.set(phase.id, phase.roadmap_id)
    })
  }

  // Calculate real hours for each roadmap
  const roadmapHours = new Map()
  const roadmapCompletedHours = new Map()

  if (allTasks && allPhases) {
    allTasks.forEach((task) => {
      const phaseId = task.phase_id
      const roadmapId = phaseToRoadmapMap.get(phaseId)

      if (roadmapId) {
        // Add to total hours
        const currentHours = roadmapHours.get(roadmapId) || 0
        roadmapHours.set(roadmapId, currentHours + (task.estimated_hours || 0))

        // Add to completed hours if task is completed
        if (task.is_completed) {
          const currentCompletedHours = roadmapCompletedHours.get(roadmapId) || 0
          roadmapCompletedHours.set(roadmapId, currentCompletedHours + (task.estimated_hours || 0))
        }
      }
    })
  }

  // Merge roadmaps with their completion stats and real metrics
  const roadmapsWithStats = await Promise.all(
    roadmaps.map(async (roadmap) => {
      const stats = completionStats.find((stat) => stat.roadmap_id === roadmap.id)
      const totalHours = roadmapHours.get(roadmap.id) || 0
      const completedHours = roadmapCompletedHours.get(roadmap.id) || 0

      // Parse dates safely
      const startDate = roadmap.start_date ? new Date(roadmap.start_date) : new Date()
      const targetCompletionDate = roadmap.target_completion_date ? new Date(roadmap.target_completion_date) : null

      // Calculate real time metrics
      const timeMetrics = calculateTimeMetrics({
        startDate,
        targetCompletionDate,
        estimatedHours: totalHours,
        completedHours: completedHours,
        completionPercentage: stats?.completion_percentage || 0,
      })

      return {
        ...roadmap,
        completion_percentage: stats?.completion_percentage || 0,
        total_tasks: stats?.total_tasks || 0,
        completed_tasks: stats?.completed_tasks || 0,
        estimated_hours: totalHours,
        completed_hours: completedHours,
        remaining_hours: timeMetrics.remaining_hours,
        velocity: timeMetrics.velocity,
        time_remaining: timeMetrics.is_overdue ? "Overdue" : `${timeMetrics.days_remaining} days`,
        days_remaining: timeMetrics.days_remaining,
        days_elapsed: timeMetrics.days_elapsed,
        is_overdue: timeMetrics.is_overdue,
      }
    }),
  )

  return roadmapsWithStats
}

// Get a single roadmap with its phases, tasks, and prerequisites
export async function getRoadmapById(id: string) {
  const supabase = createServerClient()

  // Get the roadmap
  const { data: roadmap, error } = await supabase.from("roadmaps").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching roadmap:", error)
    return null
  }

  // Get the roadmap's phases
  const { data: phases, error: phasesError } = await supabase
    .from("phases")
    .select("*")
    .eq("roadmap_id", id)
    .order("phase_order", { ascending: true })

  if (phasesError) {
    console.error("Error fetching phases:", phasesError)
    return roadmap
  }

  // Get phase completion stats
  const { data: phaseStats, error: phaseStatsError } = await supabase
    .from("phase_completion")
    .select("*")
    .eq("roadmap_id", id)

  if (phaseStatsError) {
    console.error("Error fetching phase stats:", phaseStatsError)
  }

  // Get tasks for each phase
  const phasesWithTasks = await Promise.all(
    phases.map(async (phase) => {
      const { data: tasks, error: tasksError } = await supabase
        .from("tasks")
        .select("*")
        .eq("phase_id", phase.id)
        .order("task_order", { ascending: true })

      if (tasksError) {
        console.error("Error fetching tasks:", tasksError)
        return phase
      }

      // Calculate real hours for the phase
      const totalHours = tasks.reduce((sum, task) => sum + (task.estimated_hours || 0), 0)
      const completedHours = tasks
        .filter((task) => task.is_completed)
        .reduce((sum, task) => sum + (task.estimated_hours || 0), 0)

      // Add completion stats to the phase
      const stats = phaseStats?.find((stat) => stat.phase_id === phase.id)

      return {
        ...phase,
        tasks,
        completion_percentage: stats?.completion_percentage || 0,
        total_tasks: stats?.total_tasks || 0,
        completed_tasks: stats?.completed_tasks || 0,
        estimated_hours: totalHours,
        completed_hours: completedHours,
        remaining_hours: totalHours - completedHours,
      }
    }),
  )

  // Get prerequisites
  const { data: prerequisiteIds, error: prerequisitesError } = await supabase
    .from("roadmap_prerequisites")
    .select("prerequisite_id")
    .eq("roadmap_id", id)

  if (prerequisitesError) {
    console.error("Error fetching prerequisites:", prerequisitesError)
  }

  let prerequisites: Roadmap[] = []

  if (prerequisiteIds && prerequisiteIds.length > 0) {
    const ids = prerequisiteIds.map((p) => p.prerequisite_id)

    const { data: prereqRoadmaps, error: prereqError } = await supabase.from("roadmaps").select("*").in("id", ids)

    if (prereqError) {
      console.error("Error fetching prerequisite roadmaps:", prereqError)
    } else {
      prerequisites = prereqRoadmaps

      // Get completion stats for prerequisites
      const { data: prereqStats, error: prereqStatsError } = await supabase
        .from("roadmap_completion")
        .select("*")
        .in("roadmap_id", ids)

      if (prereqStatsError) {
        console.error("Error fetching prerequisite stats:", prereqStatsError)
      } else {
        prerequisites = await Promise.all(
          prereqRoadmaps.map(async (prereq) => {
            const stats = prereqStats.find((stat) => stat.roadmap_id === prereq.id)

            // Get all tasks for this prerequisite to calculate real hours
            const { data: prereqPhases } = await supabase.from("phases").select("id").eq("roadmap_id", prereq.id)

            let totalHours = 0
            let completedHours = 0

            if (prereqPhases && prereqPhases.length > 0) {
              const phaseIds = prereqPhases.map((p) => p.id)

              const { data: prereqTasks } = await supabase.from("tasks").select("*").in("phase_id", phaseIds)

              if (prereqTasks) {
                totalHours = prereqTasks.reduce((sum, task) => sum + (task.estimated_hours || 0), 0)
                completedHours = prereqTasks
                  .filter((task) => task.is_completed)
                  .reduce((sum, task) => sum + (task.estimated_hours || 0), 0)
              }
            }

            return {
              ...prereq,
              completion_percentage: stats?.completion_percentage || 0,
              total_tasks: stats?.total_tasks || 0,
              completed_tasks: stats?.completed_tasks || 0,
              estimated_hours: totalHours,
              completed_hours: completedHours,
              remaining_hours: totalHours - completedHours,
            }
          }),
        )
      }
    }
  }

  // Get roadmap completion stats
  const { data: roadmapStats, error: roadmapStatsError } = await supabase
    .from("roadmap_completion")
    .select("*")
    .eq("roadmap_id", id)
    .single()

  if (roadmapStatsError && roadmapStatsError.code !== "PGRST116") {
    // PGRST116 is "Results contain 0 rows" which is fine for a new roadmap
    console.error("Error fetching roadmap stats:", roadmapStatsError)
  }

  // Calculate real hours for the roadmap
  const totalHours = phasesWithTasks.reduce((sum, phase) => sum + (phase.estimated_hours || 0), 0)
  const completedHours = phasesWithTasks.reduce((sum, phase) => sum + (phase.completed_hours || 0), 0)

  // Parse dates safely
  const startDate = roadmap.start_date ? new Date(roadmap.start_date) : new Date()
  const targetCompletionDate = roadmap.target_completion_date ? new Date(roadmap.target_completion_date) : null

  // Calculate real time metrics
  const timeMetrics = calculateTimeMetrics({
    startDate,
    targetCompletionDate,
    estimatedHours: totalHours,
    completedHours: completedHours,
    completionPercentage: roadmapStats?.completion_percentage || 0,
  })

  return {
    ...roadmap,
    phases: phasesWithTasks,
    prerequisites,
    completion_percentage: roadmapStats?.completion_percentage || 0,
    total_tasks: roadmapStats?.total_tasks || 0,
    completed_tasks: roadmapStats?.completed_tasks || 0,
    estimated_hours: totalHours,
    completed_hours: completedHours,
    remaining_hours: timeMetrics.remaining_hours,
    velocity: timeMetrics.velocity,
    time_remaining: timeMetrics.is_overdue ? "Overdue" : `${timeMetrics.days_remaining} days`,
    days_remaining: timeMetrics.days_remaining,
    days_elapsed: timeMetrics.days_elapsed,
    is_overdue: timeMetrics.is_overdue,
  }
}

// Toggle task completion status
export async function toggleTaskCompletion(taskId: number, isCompleted: boolean) {
  const supabase = createServerClient()

  try {
    // Update the completed_at timestamp if the task is being completed
    const updateData = isCompleted
      ? { is_completed: true }
      : { is_completed: false }

    const { data, error } = await supabase.from("tasks").update(updateData).eq("id", taskId).select().single()

    if (error) {
      throw error
    }

    // Revalidate the page to update other components that might depend on this data
    // This happens in the background and doesn't block the UI update
    revalidatePath("/roadmaps/[id]", "page")
    return data
  } catch (error) {
    console.error("Error updating task:", error)
    throw error // Re-throw the error so the client can handle it
  }
}

// Check if all prerequisites are completed
export async function checkPrerequisitesCompleted(roadmapId: string) {
  const supabase = createServerClient()

  // Get prerequisites
  const { data: prerequisiteIds, error: prerequisitesError } = await supabase
    .from("roadmap_prerequisites")
    .select("prerequisite_id")
    .eq("roadmap_id", roadmapId)

  if (prerequisitesError) {
    console.error("Error fetching prerequisites:", prerequisitesError)
    return true // Assume no prerequisites if there's an error
  }

  if (!prerequisiteIds || prerequisiteIds.length === 0) {
    return true // No prerequisites
  }

  const ids = prerequisiteIds.map((p) => p.prerequisite_id)

  // Get completion stats for prerequisites
  const { data: prereqStats, error: prereqStatsError } = await supabase
    .from("roadmap_completion")
    .select("*")
    .in("roadmap_id", ids)

  if (prereqStatsError) {
    console.error("Error fetching prerequisite stats:", prereqStatsError)
    return false
  }

  return true
  // Check if all prerequisites are 100% complete
  // return prereqStats.every((stat) => stat.completion_percentage === 100)
}

// Notes CRUD operations
export async function getNotesByRoadmapId(roadmapId: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("roadmap_id", roadmapId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching notes:", error)
    return []
  }

  return data
}

export async function createNote(roadmapId: string, content: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("notes").insert({ roadmap_id: roadmapId, content }).select().single()

    if (error) {
      throw error
    }

    revalidatePath(`/roadmaps/${roadmapId}`, "page")
    return data
  } catch (error) {
    console.error("Error creating note:", error)
    throw error
  }
}

export async function updateNote(noteId: number, content: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase
      .from("notes")
      .update({ content, updated_at: new Date().toISOString() })
      .eq("id", noteId)
      .select()
      .single()

    if (error) {
      throw error
    }

    revalidatePath(`/roadmaps/[id]`, "page")
    return data
  } catch (error) {
    console.error("Error updating note:", error)
    throw error
  }
}

export async function deleteNote(noteId: number, roadmapId: string) {
  const supabase = createServerClient()

  try {
    const { error } = await supabase.from("notes").delete().eq("id", noteId)

    if (error) {
      throw error
    }

    revalidatePath(`/roadmaps/${roadmapId}`, "page")
    return { success: true }
  } catch (error) {
    console.error("Error deleting note:", error)
    throw error
  }
}
