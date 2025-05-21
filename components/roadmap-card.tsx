import Link from "next/link"
import { CalendarClock, CheckCircle2, Clock, ArrowRight, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Roadmap } from "@/types"

export function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  // Calculate status based on completion percentage
  const getStatus = () => {
    const completion = roadmap.completion_percentage || 0
    if (completion === 0) return "not-started"
    if (completion < 50) return "in-progress"
    if (completion < 100) return "advanced"
    return "completed"
  }

  const status = getStatus()

  // Get appropriate status badge
  const getStatusBadge = () => {
    switch (status) {
      case "not-started":
        return (
          <Badge variant="outline" className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
            Not Started
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            In Progress
          </Badge>
        )
      case "advanced":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
            Advanced
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Completed
          </Badge>
        )
    }
  }

  // Get progress color based on status
  const getProgressColor = () => {
    switch (status) {
      case "not-started":
        return "bg-slate-500"
      case "in-progress":
        return "bg-blue-500"
      case "advanced":
        return "bg-amber-500"
      case "completed":
        return "bg-green-500"
    }
  }

  // Format the completion percentage
  const formattedPercentage = Math.round(roadmap.completion_percentage || 0)

  return (
    <Card
      className={cn(
        "roadmap-card group h-full overflow-hidden transition-all duration-300 hover:shadow-md",
        status === "not-started" ? "hover:border-slate-400" : "",
        status === "in-progress" ? "hover:border-blue-400" : "",
        status === "advanced" ? "hover:border-amber-400" : "",
        status === "completed" ? "hover:border-green-400" : "",
      )}
    >
      <div className="relative">
        {/* Category Badge */}
        <div className="absolute left-4 top-4 z-10">
          <Badge variant="secondary" className="px-2 py-1 text-xs font-medium">
            {roadmap.category}
          </Badge>
        </div>

        {/* Status Badge */}
        <div className="absolute right-4 top-4 z-10">{getStatusBadge()}</div>

        {/* Colored Header Bar */}
        <div
          className={cn(
            "h-2 w-full",
            status === "not-started" ? "bg-slate-200 dark:bg-slate-700" : "",
            status === "in-progress" ? "bg-blue-200 dark:bg-blue-800" : "",
            status === "advanced" ? "bg-amber-200 dark:bg-amber-800" : "",
            status === "completed" ? "bg-green-200 dark:bg-green-800" : "",
          )}
        />

        {/* Card Content */}
        <CardContent className="p-6 pt-12">
          <h3 className="line-clamp-1 text-xl font-bold tracking-tight">{roadmap.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{roadmap.description}</p>

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{roadmap.duration}</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {roadmap.completed_tasks || 0} of {roadmap.total_tasks || 0} tasks
              </span>
            </div>
            <div className="flex items-center">
              <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Est. {roadmap.estimated_hours || 0} hours</span>
            </div>
            {roadmap.has_prerequisites && (
              <div className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                <span className="text-amber-500 dark:text-amber-400">Has prerequisites</span>
              </div>
            )}
          </div>
        </CardContent>

        {/* Progress Footer */}
        <CardFooter className="border-t bg-muted/30 px-6 py-4">
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-bold">{formattedPercentage}%</span>
            </div>
            <Progress
              value={roadmap.completion_percentage || 0}
              className="h-2"
              indicatorClassName={getProgressColor()}
            />
            <div className="pt-2">
              <Link href={`/roadmaps/${roadmap.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between p-0 opacity-70 transition-opacity group-hover:opacity-100"
                >
                  <span>View Roadmap</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
