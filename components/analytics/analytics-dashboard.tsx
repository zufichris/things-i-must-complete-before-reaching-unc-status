import type { Roadmap } from "@/types"
import type { ProjectAnalytics } from "@/lib/analytics"
import { AnalyticsHeader } from "./analytics-header"
import { OverviewStats } from "./overview-stats"
import { TimeAnalytics } from "./time-analytics"
import { ProjectDistribution } from "./project-distribution"
import { PerformanceMetrics } from "./performance-metrics"
import { ProjectComparison } from "./project-comparison"
import { RiskAssessment } from "./risk-assessment"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AnalyticsDashboardProps {
  analytics: ProjectAnalytics
  roadmaps: Roadmap[]
}

export function AnalyticsDashboard({ analytics, roadmaps }: AnalyticsDashboardProps) {
  return (
    <div className="container space-y-8 py-8">
      <AnalyticsHeader
        totalProjects={analytics.totalProjects}
        completionRate={analytics.averageCompletionRate}
        totalHours={analytics.totalEstimatedHours}
      />

      <OverviewStats analytics={analytics} />

      <Tabs defaultValue="time" className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-5">
          <TabsTrigger value="time">Time Analytics</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="time" className="mt-6">
          <TimeAnalytics
            totalHours={analytics.totalEstimatedHours}
            completedHours={analytics.totalCompletedHours}
            remainingHours={analytics.totalRemainingHours}
            roadmaps={roadmaps}
          />
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <ProjectDistribution
            projectsByCategory={analytics.projectsByCategory}
            timeDistribution={analytics.timeDistribution}
          />
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <PerformanceMetrics
            averageVelocity={analytics.averageVelocity}
            fastestProject={analytics.fastestProject}
            slowestProject={analytics.slowestProject}
            mostEfficientProject={analytics.mostEfficientProject}
            roadmaps={roadmaps}
          />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <ProjectComparison roadmaps={roadmaps} />
        </TabsContent>

        <TabsContent value="risk" className="mt-6">
          <RiskAssessment riskProjects={analytics.riskProjects} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
