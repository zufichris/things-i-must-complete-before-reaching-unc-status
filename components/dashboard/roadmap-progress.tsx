import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Roadmap } from "@/types"

export function RoadmapProgress({ roadmaps }: { roadmaps: Roadmap[] }) {
  // Sort roadmaps by completion percentage (descending)
  const sortedRoadmaps = [...roadmaps].sort((a, b) => (b.completion_percentage || 0) - (a.completion_percentage || 0))

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
        <CardDescription>Completion percentage across all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedRoadmaps.map((roadmap) => (
            <div key={roadmap.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{roadmap.title}</span>
                <span className="text-sm text-muted-foreground">{Math.round(roadmap.completion_percentage || 0)}%</span>
              </div>
              <Progress
                value={roadmap.completion_percentage || 0}
                className="h-2"
                indicatorClassName={
                  (roadmap.completion_percentage || 0) > 66
                    ? "bg-green-500"
                    : (roadmap.completion_percentage || 0) > 33
                      ? "bg-amber-500"
                      : "bg-red-500"
                }
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {roadmap.completed_tasks} of {roadmap.total_tasks} tasks
                </span>
                <span>{roadmap.time_remaining} remaining</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
