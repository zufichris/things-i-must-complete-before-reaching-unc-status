import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, AlertTriangle, Zap } from "lucide-react"

type DashboardSummaryProps = {
  totalTasks: number
  completedTasks: number
  totalEstimatedHours: number
  averageVelocity: number
}

export function DashboardSummary({
  totalTasks,
  completedTasks,
  totalEstimatedHours,
  averageVelocity,
}: DashboardSummaryProps) {
  const completionPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completedTasks} / {totalTasks}
          </div>
          <p className="text-xs text-muted-foreground">{completionPercentage}% completion rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Estimated Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEstimatedHours}</div>
          <p className="text-xs text-muted-foreground">Total project hours</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Average Velocity</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageVelocity.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground">Completion per day</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Estimated Completion</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round((totalEstimatedHours * (1 - completionPercentage / 100)) / 8)} days
          </div>
          <p className="text-xs text-muted-foreground">At current velocity</p>
        </CardContent>
      </Card>
    </div>
  )
}
