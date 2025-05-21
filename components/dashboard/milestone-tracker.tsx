import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"
import type { Roadmap } from "@/types"

type Milestone = {
  id: string
  roadmapId: string
  roadmapTitle: string
  title: string
  dueDate: Date
  status: "completed" | "upcoming" | "overdue"
  completionPercentage: number
}

export function MilestoneTracker({ roadmaps }: { roadmaps: Roadmap[] }) {
  const today = new Date()

  // Generate milestones for demonstration
  const milestones: Milestone[] = []

  roadmaps.forEach((roadmap) => {
    const startDate = new Date(roadmap.start_date || today)
    const endDate = new Date(roadmap.target_completion_date || today)
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)

    // Create 25% milestone
    const milestone25Date = new Date(startDate)
    milestone25Date.setDate(startDate.getDate() + Math.floor(totalDays * 0.25))

    milestones.push({
      id: `${roadmap.id}-25`,
      roadmapId: roadmap.id,
      roadmapTitle: roadmap.title,
      title: "25% Completion",
      dueDate: milestone25Date,
      status:
        (roadmap.completion_percentage || 0) >= 25 ? "completed" : milestone25Date < today ? "overdue" : "upcoming",
      completionPercentage: Math.min(100, ((roadmap.completion_percentage || 0) / 25) * 100),
    })

    // Create 50% milestone
    const milestone50Date = new Date(startDate)
    milestone50Date.setDate(startDate.getDate() + Math.floor(totalDays * 0.5))

    milestones.push({
      id: `${roadmap.id}-50`,
      roadmapId: roadmap.id,
      roadmapTitle: roadmap.title,
      title: "50% Completion",
      dueDate: milestone50Date,
      status:
        (roadmap.completion_percentage || 0) >= 50 ? "completed" : milestone50Date < today ? "overdue" : "upcoming",
      completionPercentage: Math.min(100, ((roadmap.completion_percentage || 0) / 50) * 100),
    })

    // Create 75% milestone
    const milestone75Date = new Date(startDate)
    milestone75Date.setDate(startDate.getDate() + Math.floor(totalDays * 0.75))

    milestones.push({
      id: `${roadmap.id}-75`,
      roadmapId: roadmap.id,
      roadmapTitle: roadmap.title,
      title: "75% Completion",
      dueDate: milestone75Date,
      status:
        (roadmap.completion_percentage || 0) >= 75 ? "completed" : milestone75Date < today ? "overdue" : "upcoming",
      completionPercentage: Math.min(100, ((roadmap.completion_percentage || 0) / 75) * 100),
    })

    // Create 100% milestone
    milestones.push({
      id: `${roadmap.id}-100`,
      roadmapId: roadmap.id,
      roadmapTitle: roadmap.title,
      title: "Project Completion",
      dueDate: endDate,
      status: (roadmap.completion_percentage || 0) >= 100 ? "completed" : endDate < today ? "overdue" : "upcoming",
      completionPercentage: Math.min(100, roadmap.completion_percentage || 0),
    })
  })

  // Sort milestones by due date
  const sortedMilestones = [...milestones].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

  // Group milestones by status
  const completedMilestones = sortedMilestones.filter((m) => m.status === "completed")
  const upcomingMilestones = sortedMilestones.filter((m) => m.status === "upcoming")
  const overdueMilestones = sortedMilestones.filter((m) => m.status === "overdue")

  return (
    <div className="space-y-6">
      {overdueMilestones.length > 0 && (
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader className="bg-red-50 dark:bg-red-950/30">
            <CardTitle className="text-red-800 dark:text-red-300">Overdue Milestones</CardTitle>
            <CardDescription className="text-red-700 dark:text-red-400">
              {overdueMilestones.length} milestones past due date
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {overdueMilestones.map((milestone) => (
                <MilestoneItem key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Milestones</CardTitle>
          <CardDescription>{upcomingMilestones.length} milestones scheduled</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMilestones.length > 0 ? (
              upcomingMilestones.map((milestone) => <MilestoneItem key={milestone.id} milestone={milestone} />)
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming milestones</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Completed Milestones</CardTitle>
          <CardDescription>{completedMilestones.length} milestones achieved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedMilestones.length > 0 ? (
              completedMilestones
                .slice(0, 5)
                .map((milestone) => <MilestoneItem key={milestone.id} milestone={milestone} />)
            ) : (
              <p className="text-sm text-muted-foreground">No completed milestones yet</p>
            )}
            {completedMilestones.length > 5 && (
              <div className="text-center text-sm text-muted-foreground">
                + {completedMilestones.length - 5} more completed milestones
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MilestoneItem({ milestone }: { milestone: Milestone }) {
  return (
    <div className="flex items-start gap-3">
      {milestone.status === "completed" ? (
        <CheckCircle className="mt-0.5 h-5 w-5 text-green-600 dark:text-green-400" />
      ) : milestone.status === "overdue" ? (
        <Clock className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400" />
      ) : (
        <Circle className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
      )}

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{milestone.title}</h4>
          <Badge
            variant={
              milestone.status === "completed" ? "default" : milestone.status === "overdue" ? "destructive" : "outline"
            }
          >
            {milestone.status === "completed" ? "Completed" : milestone.status === "overdue" ? "Overdue" : "Upcoming"}
          </Badge>
        </div>

        <div className="mt-1 text-sm text-muted-foreground">
          <span>{milestone.roadmapTitle}</span>
          <span className="mx-2">•</span>
          <span>Due: {milestone.dueDate.toLocaleDateString()}</span>
        </div>

        <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
          <div
            className={`h-1.5 rounded-full ${
              milestone.status === "completed" ? "bg-green-600 dark:bg-green-500" : "bg-blue-600 dark:bg-blue-500"
            }`}
            style={{ width: `${milestone.completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
