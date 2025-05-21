import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectDistributionProps {
  projectsByCategory: Record<string, number>
  timeDistribution: Record<string, number>
}

export function ProjectDistribution({ projectsByCategory, timeDistribution }: ProjectDistributionProps) {
  const categories = Object.keys(projectsByCategory)
  const totalProjects = Object.values(projectsByCategory).reduce((sum, count) => sum + count, 0)
  const totalHours = Object.values(timeDistribution).reduce((sum, hours) => sum + hours, 0)

  // Generate colors for categories
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500",
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Projects by Category</CardTitle>
          <CardDescription>Distribution of projects across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex h-40 items-end gap-2">
              {categories.map((category, index) => {
                const count = projectsByCategory[category]
                const percentage = (count / totalProjects) * 100

                return (
                  <div key={category} className="flex flex-1 flex-col items-center">
                    <div
                      className={`w-full rounded-t-md ${colors[index % colors.length]}`}
                      style={{ height: `${percentage}%` }}
                    ></div>
                    <div className="mt-2 w-full truncate text-center text-xs font-medium">{category}</div>
                  </div>
                )
              })}
            </div>

            <div className="space-y-2">
              {categories.map((category, index) => {
                const count = projectsByCategory[category]
                const percentage = (count / totalProjects) * 100

                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`mr-2 h-3 w-3 rounded-full ${colors[index % colors.length]}`}></div>
                      <span className="text-sm">{category}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {count} projects ({percentage.toFixed(1)}%)
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Distribution by Category</CardTitle>
          <CardDescription>Estimated hours across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
              {categories.map((category, index) => {
                const hours = timeDistribution[category] || 0
                const percentage = (hours / totalHours) * 100
                const previousCategories = categories.slice(0, index)
                const previousPercentage = previousCategories.reduce(
                  (sum, cat) => sum + ((timeDistribution[cat] || 0) / totalHours) * 100,
                  0,
                )

                return (
                  <div
                    key={category}
                    className={`h-full ${colors[index % colors.length]}`}
                    style={{
                      width: `${percentage}%`,
                      float: "left",
                      marginLeft: index === 0 ? "0" : undefined,
                    }}
                  ></div>
                )
              })}
            </div>

            <div className="space-y-2">
              {categories.map((category, index) => {
                const hours = timeDistribution[category] || 0
                const percentage = (hours / totalHours) * 100

                return (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`mr-2 h-3 w-3 rounded-full ${colors[index % colors.length]}`}></div>
                      <span className="text-sm">{category}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(hours)} hours ({percentage.toFixed(1)}%)
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.round(totalHours)}</div>
                  <p className="text-xs text-muted-foreground">Total Hours</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{Math.round(totalHours / categories.length)}</div>
                  <p className="text-xs text-muted-foreground">Avg Hours/Category</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
