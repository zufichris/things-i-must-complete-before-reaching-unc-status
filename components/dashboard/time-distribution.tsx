import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Roadmap } from "@/types"

export function TimeDistribution({ roadmaps }: { roadmaps: Roadmap[] }) {
  // Calculate total estimated hours
  const totalHours = roadmaps.reduce((sum, r) => sum + (r.estimated_hours || 0), 0)

  // Sort roadmaps by estimated hours (descending)
  const sortedRoadmaps = [...roadmaps]
    .filter((r) => r.estimated_hours !== undefined)
    .sort((a, b) => (b.estimated_hours || 0) - (a.estimated_hours || 0))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time Distribution</CardTitle>
        <CardDescription>Estimated hours per project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {sortedRoadmaps.map((roadmap) => {
            const percentage = ((roadmap.estimated_hours || 0) / totalHours) * 100
            const completedPercentage = ((roadmap.estimated_hours || 0) * (roadmap.completion_percentage || 0)) / 100
            const completedWidth = (completedPercentage / (roadmap.estimated_hours || 1)) * 100

            return (
              <div key={roadmap.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{roadmap.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {roadmap.estimated_hours} hours ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="h-3 w-full rounded-full bg-muted">
                  <div className="relative h-3 rounded-full bg-primary/30" style={{ width: `${percentage}%` }}>
                    <div
                      className="absolute left-0 top-0 h-3 rounded-full bg-primary"
                      style={{ width: `${completedWidth}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {Math.round(((roadmap.estimated_hours || 0) * (roadmap.completion_percentage || 0)) / 100)} hours
                    spent
                  </span>
                  <span>
                    {Math.round((roadmap.estimated_hours || 0) * (1 - (roadmap.completion_percentage || 0) / 100))}{" "}
                    hours remaining
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
