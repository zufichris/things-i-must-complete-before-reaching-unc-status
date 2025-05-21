import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Roadmap } from "@/types"
import { Award, Zap, Clock } from "lucide-react"

interface PerformanceMetricsProps {
  averageVelocity: number
  fastestProject: { title: string; velocity: number } | null
  slowestProject: { title: string; velocity: number } | null
  mostEfficientProject: { title: string; efficiency: number } | null
  roadmaps: Roadmap[]
}

export function PerformanceMetrics({
  averageVelocity,
  fastestProject,
  slowestProject,
  mostEfficientProject,
  roadmaps,
}: PerformanceMetricsProps) {
  // Sort roadmaps by velocity (descending)
  const sortedByVelocity = [...roadmaps]
    .filter((r) => r.velocity !== undefined && r.velocity > 0)
    .sort((a, b) => (b.velocity || 0) - (a.velocity || 0))
    .slice(0, 5) // Top 5 projects by velocity

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Performance Highlights</CardTitle>
          <CardDescription>Key performance metrics across projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Average Velocity</div>
                  <div className="text-2xl font-bold">{averageVelocity.toFixed(2)}% / day</div>
                  <div className="text-xs text-muted-foreground">
                    {averageVelocity > 2
                      ? "Good progress rate"
                      : averageVelocity > 1
                        ? "Moderate progress rate"
                        : "Slow progress rate"}
                  </div>
                </div>
              </div>
            </div>

            {fastestProject && (
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/20">
                    <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Fastest Project</div>
                    <div className="text-xl font-bold">{fastestProject.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {fastestProject.velocity.toFixed(2)}% completion per day
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mostEfficientProject && (
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Most Efficient Project</div>
                    <div className="text-xl font-bold">{mostEfficientProject.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {mostEfficientProject.efficiency.toFixed(2)}% completion per day spent
                    </div>
                  </div>
                </div>
              </div>
            )}

            {slowestProject && (
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900/20">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Slowest Project</div>
                    <div className="text-xl font-bold">{slowestProject.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {slowestProject.velocity.toFixed(2)}% completion per day
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Velocity Ranking</CardTitle>
          <CardDescription>Projects ranked by completion speed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedByVelocity.map((roadmap, index) => {
              const velocity = roadmap.velocity || 0

              return (
                <div key={roadmap.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{roadmap.title}</span>
                    </div>
                    <span className="text-sm font-medium">{velocity.toFixed(2)}%/day</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${Math.min(100, (velocity / (sortedByVelocity[0]?.velocity || 1)) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{Math.round(roadmap.completion_percentage || 0)}% complete</span>
                    <span>
                      Est. completion in {Math.ceil((100 - (roadmap.completion_percentage || 0)) / velocity || 0)} days
                    </span>
                  </div>
                </div>
              )
            })}

            {sortedByVelocity.length === 0 && (
              <div className="rounded-lg border border-dashed p-6 text-center text-muted-foreground">
                No velocity data available for projects
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
