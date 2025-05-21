type TimeCalculationParams = {
  startDate: Date
  targetDate: Date
  estimatedHours: number
  completionPercentage: number
}

export function calculateTimeMetrics(params: TimeCalculationParams) {
  const { startDate, targetDate, estimatedHours, completionPercentage } = params

  // Calculate days elapsed since start
  const now = new Date()
  const msPerDay = 1000 * 60 * 60 * 24
  const daysElapsed = Math.max(0, Math.round((now.getTime() - startDate.getTime()) / msPerDay))

  // Calculate days remaining until target
  const daysRemaining = Math.max(0, Math.round((targetDate.getTime() - now.getTime()) / msPerDay))

  // Calculate completed and remaining hours
  const completedHours = Math.round((estimatedHours * completionPercentage) / 100)
  const remainingHours = estimatedHours - completedHours

  // Calculate velocity (tasks completed per day)
  // For simplicity, we'll assume each task takes equal time
  const velocity = daysElapsed > 0 ? completionPercentage / daysElapsed : 0

  // Estimate completion date based on current velocity
  const estimatedCompletionDate = new Date()
  if (velocity > 0 && completionPercentage < 100) {
    const daysToComplete = (100 - completionPercentage) / velocity
    estimatedCompletionDate.setDate(now.getDate() + daysToComplete)
  } else {
    estimatedCompletionDate.setDate(now.getDate() + remainingHours / 8) // Assuming 8 hours per day
  }

  return {
    estimated_total_hours: estimatedHours,
    completed_hours: completedHours,
    remaining_hours: remainingHours,
    days_elapsed: daysElapsed,
    days_remaining: daysRemaining,
    velocity: Number.parseFloat(velocity.toFixed(2)),
    estimated_completion_date: estimatedCompletionDate,
  }
}
