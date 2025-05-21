import { Button } from "@/components/ui/button"
import { BarChart3, Download, PlusCircle } from "lucide-react"
import Link from "next/link"

interface AnalyticsHeaderProps {
  totalProjects: number
  completionRate: number
  totalHours: number
}

export function AnalyticsHeader({ totalProjects, completionRate, totalHours }: AnalyticsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Project Analytics</h1>
        </div>
        <p className="text-muted-foreground">
          Comprehensive analytics across {totalProjects} projects with {Math.round(completionRate)}% average completion
          and {Math.round(totalHours)} total estimated hours.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
        <Button asChild size="sm">
          <Link href="/admin/seed">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
    </div>
  )
}
