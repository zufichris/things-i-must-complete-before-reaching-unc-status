import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Roadmap } from "@/types"

type Task = {
  id: string
  description: string
  roadmapId: string
  roadmapTitle: string
  status: "not-started" | "in-progress" | "completed"
}

export function KanbanView({ roadmaps }: { roadmaps: Roadmap[] }) {
  // Generate sample tasks for demonstration
  const tasks: Task[] = []

  roadmaps.forEach((roadmap) => {
    const totalTasks = roadmap.total_tasks || 10
    const completedTasks = roadmap.completed_tasks || 0

    // Create completed tasks
    for (let i = 0; i < completedTasks; i++) {
      tasks.push({
        id: `${roadmap.id}-task-${i}`,
        description: `Task ${i + 1} for ${roadmap.title}`,
        roadmapId: roadmap.id,
        roadmapTitle: roadmap.title,
        status: "completed",
      })
    }

    // Create in-progress tasks (about 30% of remaining)
    const inProgressCount = Math.floor((totalTasks - completedTasks) * 0.3)
    for (let i = 0; i < inProgressCount; i++) {
      tasks.push({
        id: `${roadmap.id}-task-${completedTasks + i}`,
        description: `Task ${completedTasks + i + 1} for ${roadmap.title}`,
        roadmapId: roadmap.id,
        roadmapTitle: roadmap.title,
        status: "in-progress",
      })
    }

    // Create not-started tasks
    const notStartedCount = totalTasks - completedTasks - inProgressCount
    for (let i = 0; i < notStartedCount; i++) {
      tasks.push({
        id: `${roadmap.id}-task-${completedTasks + inProgressCount + i}`,
        description: `Task ${completedTasks + inProgressCount + i + 1} for ${roadmap.title}`,
        roadmapId: roadmap.id,
        roadmapTitle: roadmap.title,
        status: "not-started",
      })
    }
  })

  // Group tasks by status
  const notStartedTasks = tasks.filter((t) => t.status === "not-started")
  const inProgressTasks = tasks.filter((t) => t.status === "in-progress")
  const completedTasks = tasks.filter((t) => t.status === "completed")

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <KanbanColumn
        title="Not Started"
        description={`${notStartedTasks.length} tasks`}
        tasks={notStartedTasks}
        className="border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
      />

      <KanbanColumn
        title="In Progress"
        description={`${inProgressTasks.length} tasks`}
        tasks={inProgressTasks}
        className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30"
      />

      <KanbanColumn
        title="Completed"
        description={`${completedTasks.length} tasks`}
        tasks={completedTasks}
        className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30"
      />
    </div>
  )
}

function KanbanColumn({
  title,
  description,
  tasks,
  className,
}: {
  title: string
  description: string
  tasks: Task[]
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.slice(0, 8).map((task) => (
            <Card key={task.id} className="border shadow-sm">
              <CardContent className="p-3">
                <p className="mb-2 text-sm">{task.description}</p>
                <Badge variant="outline" className="text-xs">
                  {task.roadmapTitle}
                </Badge>
              </CardContent>
            </Card>
          ))}
          {tasks.length > 8 && (
            <div className="mt-2 text-center text-sm text-muted-foreground">+ {tasks.length - 8} more tasks</div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
