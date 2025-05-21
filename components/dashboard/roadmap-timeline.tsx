import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Roadmap } from "@/types"

export function RoadmapTimeline({ roadmaps }: { roadmaps: Roadmap[] }) {
  // Sort roadmaps by start date
  const sortedRoadmaps = [...roadmaps].sort(
    (a, b) => new Date(a.start_date || "").getTime() - new Date(b.start_date || "").getTime(),
  )

  const now = new Date()
  const timelineStart = new Date(Math.min(...sortedRoadmaps.map((r) => new Date(r.start_date || now).getTime())))
  const timelineEnd = new Date(
    Math.max(...sortedRoadmaps.map((r) => new Date(r.target_completion_date || now).getTime())),
  )

  // Calculate total timeline duration in days
  const timelineDuration = (timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Timeline</CardTitle>
        <CardDescription>Visual timeline of all projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mt-6">
          {/* Timeline axis */}
          <div className="absolute left-0 right-0 h-0.5 bg-border" />

          {/* Now marker */}
          <div
            className="absolute top-0 h-8 w-0.5 bg-primary"
            style={{
              left: `${((now.getTime() - timelineStart.getTime()) / (timelineEnd.getTime() - timelineStart.getTime())) * 100}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium">Today</div>
          </div>

          {/* Projects */}
          <div className="mt-10 space-y-8">
            {sortedRoadmaps.map((roadmap, index) => {
              const startDate = new Date(roadmap.start_date || now)
              const endDate = new Date(roadmap.target_completion_date || now)

              // Calculate position and width as percentages of the timeline
              const startPos =
                ((startDate.getTime() - timelineStart.getTime()) / (timelineEnd.getTime() - timelineStart.getTime())) *
                100
              const width =
                ((endDate.getTime() - startDate.getTime()) / (timelineEnd.getTime() - timelineStart.getTime())) * 100

              return (
                <div key={roadmap.id} className="relative">
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{roadmap.title}</span>
                    <span className="text-muted-foreground">{roadmap.duration}</span>
                  </div>
                  <div className="relative h-8">
                    <div
                      className="absolute h-8 rounded-md bg-primary/20 dark:bg-primary/30"
                      style={{ left: `${startPos}%`, width: `${width}%` }}
                    >
                      <div
                        className="h-full rounded-md bg-primary/60"
                        style={{ width: `${roadmap.completion_percentage || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Timeline labels */}
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <div>{timelineStart.toLocaleDateString()}</div>
            <div>{timelineEnd.toLocaleDateString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
