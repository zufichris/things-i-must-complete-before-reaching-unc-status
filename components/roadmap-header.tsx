import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2 } from "lucide-react"
import type { Roadmap } from "@/types"

export function RoadmapHeader({ roadmap }: { roadmap: Roadmap }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-2 py-1 font-medium">
              {roadmap.category}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {roadmap.duration}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{roadmap.title}</h1>
          <p className="text-muted-foreground">{roadmap.description}</p>
        </div>
        <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold">{Math.round(roadmap.completion_percentage || 0)}%</span>
            <span className="text-xs">Complete</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <span className="font-medium">Progress Overview</span>
          </div>
          <span className="text-sm font-medium">
            {roadmap.completed_tasks || 0} of {roadmap.total_tasks || 0} tasks completed
          </span>
        </div>
        <Progress value={roadmap.completion_percentage || 0} className="h-2" />
      </div>
    </div>
  )
}
