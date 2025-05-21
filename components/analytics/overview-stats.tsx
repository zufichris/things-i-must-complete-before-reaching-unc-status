import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ProjectAnalytics } from "@/lib/analytics"
import { BarChart3, Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface OverviewStatsProps {
  analytics: ProjectAnalytics
}

export function OverviewStats({ analytics }: OverviewStatsProps) {
  const {
    totalProjects,
    completedProjects,
    inProgressProjects,
    notStartedProjects,
    totalEstimatedHours,
    totalCompletedHours,
    averageCompletionRate,
    averageVelocity,
  } = analytics

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Project Status</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProjects}</div>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Completed: {completedProjects}</span>
            </div>
            <div className="mx-2">•</div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>In Progress: {inProgressProjects}</span>
            </div>
            <div className="mx-2">•</div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <span>Not Started: {notStartedProjects}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(totalEstimatedHours)}</div>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Completed: {Math.round(totalCompletedHours)} hrs</span>
            </div>
            <div className="mx-2">•</div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>Remaining: {Math.round(totalEstimatedHours - totalCompletedHours)} hrs</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(averageCompletionRate)}%</div>
          <p className="text-xs text-muted-foreground">Average across all projects</p>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <div className="h-2 rounded-full bg-green-500" style={{ width: `${averageCompletionRate}%` }}></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Velocity</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageVelocity.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">Completion percentage per day</p>
          <div className="mt-2 text-xs">
            {averageVelocity > 2 ? (
              <span className="text-green-600">Good progress rate</span>
            ) : averageVelocity > 1 ? (
              <span className="text-amber-600">Moderate progress rate</span>
            ) : (
              <span className="text-red-600">Slow progress rate</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
