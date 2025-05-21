export type Roadmap = {
  id: string
  title: string
  category: string
  description: string
  duration: string
  created_at?: string
  start_date?: string
  target_completion_date?: string
  actual_completion_date?: string
  estimated_hours?: number
  prerequisites?: Roadmap[]
  completion_percentage?: number
  total_tasks?: number
  completed_tasks?: number
  velocity?: number
  time_remaining?: string
  days_remaining?: number
}

export type RoadmapPrerequisite = {
  id: number
  roadmap_id: string
  prerequisite_id: string
}

export type Phase = {
  id: number
  roadmap_id: string
  title: string
  description: string
  phase_order: number
  created_at?: string
  estimated_hours?: number
  tasks?: Task[]
  completion_percentage?: number
  total_tasks?: number
  completed_tasks?: number
}

export type Task = {
  id: number
  phase_id: number
  description: string
  task_order: number
  is_completed: boolean
  created_at?: string
  completed_at?: string
  estimated_hours?: number
}

export type Note = {
  id: number
  roadmap_id: string
  content: string
  created_at: string
  updated_at: string
}

export type ResourceCategory = "article" | "documentation" | "tool" | "video" | "book" | "other"

export type Resource = {
  id: number
  title: string
  link: string
  description: string
  category: ResourceCategory
  icon?: string
  created_at?: string
}

export type RoadmapCompletion = {
  roadmap_id: string
  roadmap_title: string
  total_phases: number
  total_tasks: number
  completed_tasks: number
  completion_percentage: number
}

export type PhaseCompletion = {
  phase_id: number
  roadmap_id: string
  phase_title: string
  total_tasks: number
  completed_tasks: number
  completion_percentage: number
}

export type TimeMetrics = {
  estimated_total_hours: number
  completed_hours: number
  remaining_hours: number
  days_elapsed: number
  days_remaining: number
  velocity: number
  estimated_completion_date: Date
}
