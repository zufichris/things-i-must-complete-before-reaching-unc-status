export function DashboardHeader() {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Project Roadmaps</h1>
        <p className="text-muted-foreground">
          Track and manage your software project roadmaps. View progress, complete tasks, and stay organized.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <span className="text-2xl font-bold text-primary">RM</span>
        </div>
      </div>
    </div>
  )
}
