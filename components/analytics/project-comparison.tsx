import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Roadmap } from "@/types"

interface ProjectComparisonProps {
  roadmaps: Roadmap[]
}

export function ProjectComparison({ roadmaps }: ProjectComparisonProps) {
  // Sort roadmaps by completion percentage (descending)
  const sortedByCompletion = [...roadmaps].sort(
    (a, b) => (b.completion_percentage || 0) - (a.completion_percentage || 0),
  )

  // Calculate average metrics
  const avgCompletionRate = roadmaps.reduce((sum, r) => sum + (r.completion_percentage || 0), 0) / roadmaps.length
  const avgEstimatedHours = roadmaps.reduce((sum, r) => sum + (r.estimated_hours || 0), 0) / roadmaps.length
  const avgVelocity =
    roadmaps.filter((r) => r.velocity !== undefined && r.velocity > 0).reduce((sum, r) => sum + (r.velocity || 0), 0) /
      roadmaps.filter((r) => r.velocity !== undefined && r.velocity > 0).length || 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Comparison</CardTitle>
          <CardDescription>Compare key metrics across all projects</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Project</th>
                <th className="pb-2 text-center font-medium">Completion</th>
                <th className="pb-2 text-center font-medium">Est. Hours</th>
                <th className="pb-2 text-center font-medium">Velocity</th>
                <th className="pb-2 text-center font-medium">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {sortedByCompletion.map((roadmap) => {
                const completionPercentage = roadmap.completion_percentage || 0
                const estimatedHours = roadmap.estimated_hours || 0
                const velocity = roadmap.velocity || 0
                const remainingDays = Math.ceil((100 - completionPercentage) / (velocity || 1))

                return (
                  <tr key={roadmap.id} className="border-b">
                    <td className="py-3 pr-4">
                      <div className="font-medium">{roadmap.title}</div>
                      <div className="text-xs text-muted-foreground">{roadmap.category}</div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <div className="font-medium">{Math.round(completionPercentage)}%</div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${
                            completionPercentage > 66
                              ? "bg-green-500"
                              : completionPercentage > 33
                                ? "bg-amber-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {completionPercentage > avgCompletionRate ? (
                          <span className="text-green-600">Above avg</span>
                        ) : (
                          <span className="text-red-600">Below avg</span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <div className="font-medium">{estimatedHours}</div>
                      <div className="text-xs text-muted-foreground">
                        {estimatedHours > avgEstimatedHours ? (
                          <span className="text-amber-600">Above avg</span>
                        ) : (
                          <span className="text-green-600">Below avg</span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <div className="font-medium">{velocity.toFixed(2)}%</div>
                      <div className="text-xs text-muted-foreground">
                        {velocity > avgVelocity ? (
                          <span className="text-green-600">Above avg</span>
                        ) : (
                          <span className="text-red-600">Below avg</span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center">
                      <div className="font-medium">{remainingDays} days</div>
                      <div className="text-xs text-muted-foreground">
                        {roadmap.days_remaining || "N/A"} until deadline
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr className="border-t bg-muted/50">
                <td className="py-2 font-medium">Average</td>
                <td className="py-2 text-center font-medium">{Math.round(avgCompletionRate)}%</td>
                <td className="py-2 text-center font-medium">{Math.round(avgEstimatedHours)}</td>
                <td className="py-2 text-center font-medium">{avgVelocity.toFixed(2)}%</td>
                <td className="py-2 text-center font-medium">
                  {Math.ceil((100 - avgCompletionRate) / (avgVelocity || 1))} days
                </td>
              </tr>
            </tfoot>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
