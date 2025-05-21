import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Roadmap } from "@/types"

interface TimeAnalyticsProps {
  totalHours: number
  completedHours: number
  remainingHours: number
  roadmaps: Roadmap[]
}

export function TimeAnalytics({ totalHours, completedHours, remainingHours, roadmaps }: TimeAnalyticsProps) {
  // Sort roadmaps by estimated hours (descending)
  const sortedByHours = [...roadmaps]
    .filter((r) => r.estimated_hours !== undefined)
    .sort((a, b) => (b.estimated_hours || 0) - (a.estimated_hours || 0))
    .slice(0, 5) // Top 5 projects by hours

  const completionPercentage = (completedHours / totalHours) * 100

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Overall Time Allocation</CardTitle>
          <CardDescription>Total hours across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{Math.round(completedHours)} hours completed</span>
                <span>{Math.round(remainingHours)} hours remaining</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Time Distribution</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border bg-card p-3 text-center">
                  <div className="text-xl font-bold">{Math.round(completedHours)}</div>
                  <p className="text-xs text-muted-foreground">Hours Spent</p>
                </div>
                <div className="rounded-lg border bg-card p-3 text-center">
                  <div className="text-xl font-bold">{Math.round(remainingHours)}</div>
                  <p className="text-xs text-muted-foreground">Hours Remaining</p>
                </div>
                <div className="rounded-lg border bg-card p-3 text-center">
                  <div className="text-xl font-bold">{Math.round(remainingHours / 8)}</div>
                  <p className="text-xs text-muted-foreground">Work Days Left</p>
                </div>
                <div className="rounded-lg border bg-card p-3 text-center">
                  <div className="text-xl font-bold">{Math.round(totalHours / roadmaps.length)}</div>
                  <p className="text-xs text-muted-foreground">Avg Hours/Project</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projects by Time Investment</CardTitle>
          <CardDescription>Top 5 projects by estimated hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedByHours.map((roadmap) => {
              const completedHours = ((roadmap.estimated_hours || 0) * (roadmap.completion_percentage || 0)) / 100
              const remainingHours = (roadmap.estimated_hours || 0) - completedHours

              return (
                <div key={roadmap.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{roadmap.title}</span>
                    <span className="text-sm text-muted-foreground">{roadmap.estimated_hours} hours</span>
                  </div>
                  <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                    <div className="bg-green-500" style={{ width: `${roadmap.completion_percentage || 0}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{Math.round(completedHours)} hours spent</span>
                    <span>{Math.round(remainingHours)} hours remaining</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
