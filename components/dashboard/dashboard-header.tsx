import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

type DashboardHeaderProps = {
  totalProjects: number
  overallCompletion: number
  atRiskProjects: number
}

export function DashboardHeader({ totalProjects, overallCompletion, atRiskProjects }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your project roadmaps, monitor progress, and analyze performance metrics.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/">View All Roadmaps</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/seed">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
    </div>
  )
}
