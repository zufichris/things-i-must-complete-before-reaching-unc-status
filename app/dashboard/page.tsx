import { getRoadmaps } from "../actions"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSummary } from "@/components/dashboard/dashboard-summary"
import { RoadmapTimeline } from "@/components/dashboard/roadmap-timeline"
import { RoadmapProgress } from "@/components/dashboard/roadmap-progress"
import { VelocityChart } from "@/components/dashboard/velocity-chart"
import { TimeDistribution } from "@/components/dashboard/time-distribution"
import { KanbanView } from "@/components/dashboard/kanban-view"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { MilestoneTracker } from "@/components/dashboard/milestone-tracker"
import { calculateTimeMetrics } from "@/lib/time-calculations"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Roadmap {
  id: string
  title: string
  duration: string
  completion_percentage?: number
  total_tasks?: number
  completed_tasks?: number
}

export default async function Dashboard() {
  const roadmaps = await getRoadmaps()

  // Add time metrics to roadmaps
  const roadmapsWithMetrics = roadmaps.map((roadmap) => {
    // For demo purposes, we'll add some estimated values
    const estimatedHours = Math.floor(Math.random() * 100) + 50 // 50-150 hours
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30)) // Started 0-30 days ago

    const targetDate = new Date(startDate)
    const durationWeeks = Number.parseInt(roadmap.duration.split(" ")[0]) || 8
    targetDate.setDate(targetDate.getDate() + durationWeeks * 7)

    const metrics = calculateTimeMetrics({
      startDate,
      estimatedHours,
      completionPercentage: roadmap.completion_percentage || 0,
      targetCompletionDate:targetDate,
      completedHours:estimatedHours
    })

    return {
      ...roadmap,
      estimated_hours: estimatedHours,
      start_date: startDate.toISOString(),
      target_completion_date: targetDate.toISOString(),
      velocity: metrics.velocity,
      time_remaining: `${metrics.days_remaining} days`,
      days_remaining: metrics.days_remaining,
    }
  })

  // Calculate overall metrics
  const totalTasks = roadmapsWithMetrics.reduce((sum, r) => sum + (r.total_tasks || 0), 0)
  const completedTasks = roadmapsWithMetrics.reduce((sum, r) => sum + (r.completed_tasks || 0), 0)
  const overallCompletion = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
  const totalEstimatedHours = roadmapsWithMetrics.reduce((sum, r) => sum + (r.estimated_hours || 0), 0)
  const averageVelocity =
    roadmapsWithMetrics.reduce((sum, r) => sum + (r.velocity || 0), 0) / roadmapsWithMetrics.length

  // Find roadmaps at risk (low completion percentage but close to target date)
  const atRiskRoadmaps = roadmapsWithMetrics.filter(
    (r) => (r.completion_percentage || 0) < 50 && (r.days_remaining || 30) < 14,
  )

  return (
    <div className="container space-y-8 py-8">
      <DashboardHeader
        totalProjects={roadmapsWithMetrics.length}
        overallCompletion={overallCompletion}
        atRiskProjects={atRiskRoadmaps.length}
      />

      <DashboardSummary
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        totalEstimatedHours={totalEstimatedHours}
        averageVelocity={averageVelocity}
      />

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-7">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <RoadmapProgress roadmaps={roadmapsWithMetrics} />
            <TimeDistribution roadmaps={roadmapsWithMetrics} />
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <RoadmapTimeline roadmaps={roadmapsWithMetrics} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <VelocityChart roadmaps={roadmapsWithMetrics} />
        </TabsContent>

        <TabsContent value="kanban" className="mt-6">
          <KanbanView roadmaps={roadmapsWithMetrics} />
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <CalendarView roadmaps={roadmapsWithMetrics} />
        </TabsContent>

        <TabsContent value="milestones" className="mt-6">
          <MilestoneTracker roadmaps={roadmapsWithMetrics} />
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Projects at Risk</h2>
        {atRiskRoadmaps.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {atRiskRoadmaps.map((roadmap) => (
              <AtRiskCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
            <p className="flex items-center">
              <CheckCircleIcon className="mr-2 h-5 w-5" />
              No projects currently at risk. Great job!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function AtRiskCard({ roadmap }: { roadmap: Roadmap & { time_remaining?: string } }) {
  return (
    <Card className="border-red-200 dark:border-red-900">
      <CardHeader className="bg-red-50 dark:bg-red-950/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{roadmap.title}</h3>
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{Math.round(roadmap.completion_percentage || 0)}%</span>
          </div>
          <Progress value={roadmap.completion_percentage || 0} className="h-2" />
        </div>
        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Time Remaining:</span>
            <span className="font-medium">{roadmap.time_remaining}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tasks Completed:</span>
            <span className="font-medium">
              {roadmap.completed_tasks} of {roadmap.total_tasks}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/roadmaps/${roadmap.id}`}>View Project</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
