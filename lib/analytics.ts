import type { Roadmap } from "@/types"

export type ProjectAnalytics = {
  totalProjects: number
  completedProjects: number
  inProgressProjects: number
  notStartedProjects: number
  totalEstimatedHours: number
  totalCompletedHours: number
  totalRemainingHours: number
  averageCompletionRate: number
  averageVelocity: number
  fastestProject: { title: string; velocity: number } | null
  slowestProject: { title: string; velocity: number } | null
  mostEfficientProject: { title: string; efficiency: number } | null
  riskProjects: Roadmap[]
  projectsByCategory: Record<string, number>
  timeDistribution: Record<string, number>
  overdueProjects: number
}

export function calculateProjectAnalytics(roadmaps: Roadmap[]): ProjectAnalytics {
  if (!roadmaps.length) {
    return {
      totalProjects: 0,
      completedProjects: 0,
      inProgressProjects: 0,
      notStartedProjects: 0,
      totalEstimatedHours: 0,
      totalCompletedHours: 0,
      totalRemainingHours: 0,
      averageCompletionRate: 0,
      averageVelocity: 0,
      fastestProject: null,
      slowestProject: null,
      mostEfficientProject: null,
      riskProjects: [],
      projectsByCategory: {},
      timeDistribution: {},
      overdueProjects: 0,
    }
  }

  // Count projects by status
  const completedProjects = roadmaps.filter((r) => (r.completion_percentage || 0) === 100).length
  const notStartedProjects = roadmaps.filter((r) => (r.completion_percentage || 0) === 0).length
  const inProgressProjects = roadmaps.length - completedProjects - notStartedProjects
  const overdueProjects = roadmaps.filter((r) => r.is_overdue).length

  // Calculate time metrics using real data
  const totalEstimatedHours = roadmaps.reduce((sum, r) => sum + (r.estimated_hours || 0), 0)
  const totalCompletedHours = roadmaps.reduce((sum, r) => sum + (r.completed_hours || 0), 0)
  const totalRemainingHours = roadmaps.reduce((sum, r) => sum + (r.remaining_hours || 0), 0)

  // Calculate average completion rate
  const averageCompletionRate = roadmaps.reduce((sum, r) => sum + (r.completion_percentage || 0), 0) / roadmaps.length

  // Calculate velocity metrics
  const projectsWithVelocity = roadmaps.filter((r) => r.velocity !== undefined && r.velocity > 0)
  const averageVelocity = projectsWithVelocity.length
    ? projectsWithVelocity.reduce((sum, r) => sum + (r.velocity || 0), 0) / projectsWithVelocity.length
    : 0

  // Find fastest and slowest projects
  let fastestProject = null
  let slowestProject = null
  let mostEfficientProject = null

  if (projectsWithVelocity.length) {
    const sortedByVelocity = [...projectsWithVelocity].sort((a, b) => (b.velocity || 0) - (a.velocity || 0))
    fastestProject = {
      title: sortedByVelocity[0].title,
      velocity: sortedByVelocity[0].velocity || 0,
    }
    slowestProject = {
      title: sortedByVelocity[sortedByVelocity.length - 1].title,
      velocity: sortedByVelocity[sortedByVelocity.length - 1].velocity || 0,
    }

    // Calculate efficiency (completion percentage relative to time spent)
    const projectsWithEfficiency = roadmaps.map((r) => {
      const daysElapsed = r.days_elapsed || 0
      const efficiency = daysElapsed > 0 ? (r.completion_percentage || 0) / daysElapsed : 0
      return { ...r, efficiency }
    })

    const sortedByEfficiency = projectsWithEfficiency
      .filter((r) => r.efficiency > 0)
      .sort((a, b) => (b.efficiency || 0) - (a.efficiency || 0))

    if (sortedByEfficiency.length) {
      mostEfficientProject = {
        title: sortedByEfficiency[0].title,
        efficiency: sortedByEfficiency[0].efficiency || 0,
      }
    }
  }

  // Find projects at risk (less than 50% complete and less than 14 days remaining)
  const riskProjects = roadmaps.filter(
    (r) => (r.completion_percentage || 0) < 50 && (r.days_remaining || 30) < 14 && !r.is_overdue,
  )

  // Count projects by category
  const projectsByCategory: Record<string, number> = {}
  roadmaps.forEach((r) => {
    const category = r.category || "Uncategorized"
    projectsByCategory[category] = (projectsByCategory[category] || 0) + 1
  })

  // Calculate time distribution by category using real hours
  const timeDistribution: Record<string, number> = {}
  roadmaps.forEach((r) => {
    const category = r.category || "Uncategorized"
    timeDistribution[category] = (timeDistribution[category] || 0) + (r.estimated_hours || 0)
  })

  return {
    totalProjects: roadmaps.length,
    completedProjects,
    inProgressProjects,
    notStartedProjects,
    totalEstimatedHours,
    totalCompletedHours,
    totalRemainingHours,
    averageCompletionRate,
    averageVelocity,
    fastestProject,
    slowestProject,
    mostEfficientProject,
    riskProjects,
    projectsByCategory,
    timeDistribution,
    overdueProjects,
  }
}
