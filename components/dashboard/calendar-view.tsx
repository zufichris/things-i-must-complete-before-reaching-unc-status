import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Roadmap } from "@/types"

export function CalendarView({ roadmaps }: { roadmaps: Roadmap[] }) {
  // Get current date and month details
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Get first day of month and number of days in month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Create array of days in month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Create calendar grid with empty cells for days before first of month
  const calendarGrid = Array(firstDayOfMonth).fill(null).concat(days)

  // Generate events for the calendar
  const events: Record<number, { roadmapId: string; title: string; type: "start" | "end" | "milestone" }[]> = {}

  roadmaps.forEach((roadmap) => {
    const startDate = new Date(roadmap.start_date || today)
    const endDate = new Date(roadmap.target_completion_date || today)

    // Only add events for the current month
    if (startDate.getMonth() === currentMonth && startDate.getFullYear() === currentYear) {
      const day = startDate.getDate()
      if (!events[day]) events[day] = []
      events[day].push({
        roadmapId: roadmap.id,
        title: roadmap.title,
        type: "start",
      })
    }

    if (endDate.getMonth() === currentMonth && endDate.getFullYear() === currentYear) {
      const day = endDate.getDate()
      if (!events[day]) events[day] = []
      events[day].push({
        roadmapId: roadmap.id,
        title: roadmap.title,
        type: "end",
      })
    }

    // Add a milestone in the middle of the project
    const midpointDate = new Date(startDate)
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    midpointDate.setDate(startDate.getDate() + Math.floor(totalDays / 2))

    if (midpointDate.getMonth() === currentMonth && midpointDate.getFullYear() === currentYear) {
      const day = midpointDate.getDate()
      if (!events[day]) events[day] = []
      events[day].push({
        roadmapId: roadmap.id,
        title: `${roadmap.title} Milestone`,
        type: "milestone",
      })
    }
  })

  // Get month name
  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {monthName} {currentYear}
        </CardTitle>
        <CardDescription>Project timeline and milestones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-sm font-medium">
              {day}
            </div>
          ))}

          {calendarGrid.map((day, index) => (
            <div
              key={index}
              className={`relative min-h-24 rounded-md border p-1 ${
                day === today.getDate() ? "border-primary bg-primary/5" : "border-muted"
              } ${!day ? "bg-muted/20" : ""}`}
            >
              {day && (
                <>
                  <div className="text-right text-sm">{day}</div>
                  <div className="mt-1 space-y-1">
                    {events[day]?.map((event, eventIndex) => (
                      <div
                        key={`${event.roadmapId}-${event.type}-${eventIndex}`}
                        className={`text-left text-xs ${
                          event.type === "start"
                            ? "rounded bg-blue-100 px-1 py-0.5 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                            : event.type === "end"
                              ? "rounded bg-green-100 px-1 py-0.5 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                              : "rounded bg-purple-100 px-1 py-0.5 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                        }`}
                      >
                        {event.title.length > 15 ? `${event.title.substring(0, 15)}...` : event.title}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
