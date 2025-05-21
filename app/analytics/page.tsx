import { getRoadmaps } from "../actions"
import { calculateTimeMetrics } from "@/lib/time-calculations"
import { calculateProjectAnalytics } from "@/lib/analytics"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { ErrorDisplay } from "@/components/error-display"

export default async function AnalyticsPage() {
  try {
    const roadmaps = await getRoadmaps()

    if (!roadmaps || roadmaps.length === 0) {
      return (
        <ErrorDisplay
          title="No projects found"
          message="You need to create some projects before you can see analytics."
          actionText="Create a project"
          actionHref="/admin/seed"
        />
      )
    }

    // Add time metrics to roadmaps
    const roadmapsWithMetrics = roadmaps.map((roadmap) => {
      // For demo purposes, we'll add some estimated values if they don't exist
      const estimatedHours = roadmap.estimated_hours || Math.floor(Math.random() * 100) + 50 // 50-150 hours

      const startDate = roadmap.start_date
        ? new Date(roadmap.start_date)
        : (() => {
            const date = new Date()
            date.setDate(date.getDate() - Math.floor(Math.random() * 30)) // Started 0-30 days ago
            return date
          })()

      const targetDate = roadmap.target_completion_date
        ? new Date(roadmap.target_completion_date)
        : (() => {
            const date = new Date(startDate)
            const durationWeeks = Number.parseInt(roadmap.duration.split(" ")[0]) || 8
            date.setDate(date.getDate() + durationWeeks * 7)
            return date
          })()

      const metrics = calculateTimeMetrics({
        startDate,
        targetDate,
        estimatedHours,
        completionPercentage: roadmap.completion_percentage || 0,
      })

      return {
        ...roadmap,
        estimated_hours: estimatedHours,
        start_date: startDate.toISOString(),
        target_completion_date: targetDate.toISOString(),
        velocity: metrics.velocity,
        time_remaining: `${metrics.days_remaining} days`,
        days_remaining: metrics.days_remaining,
        days_elapsed: metrics.days_elapsed,
      }
    })

    // Calculate analytics
    const analytics = calculateProjectAnalytics(roadmapsWithMetrics)

    return <AnalyticsDashboard analytics={analytics} roadmaps={roadmapsWithMetrics} />
  } catch (error) {
    console.error("Error loading analytics:", error)
    return (
      <ErrorDisplay
        title="Connection Error"
        message="Failed to connect to the server. Please check your connection and try again."
        actionText="Try Again"
        actionHref="/analytics"
      />
    )
  }
}
