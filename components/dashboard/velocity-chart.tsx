import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Roadmap } from "@/types"

export function VelocityChart({ roadmaps }: { roadmaps: Roadmap[] }) {
  // Sort roadmaps by velocity (descending)
  const sortedRoadmaps = [...roadmaps]
    .filter((r) => r.velocity !== undefined)
    .sort((a, b) => (b.velocity || 0) - (a.velocity || 0))

  const maxVelocity = Math.max(...sortedRoadmaps.map((r) => r.velocity || 0))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Velocity</CardTitle>
        <CardDescription>Completion percentage per day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {sortedRoadmaps.map((roadmap) => {
            const velocityPercentage = ((roadmap.velocity || 0) / maxVelocity) * 100

            return (
              <div key={roadmap.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{roadmap.title}</span>
                  <span className="text-sm font-medium">{roadmap.velocity?.toFixed(2)}% / day</span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted">
                  <div className="h-3 rounded-full bg-primary" style={{ width: `${velocityPercentage}%` }} />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {roadmap.completed_tasks} of {roadmap.total_tasks} tasks completed
                  </span>
                  <span>{Math.round(roadmap.completion_percentage || 0)}% complete</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
