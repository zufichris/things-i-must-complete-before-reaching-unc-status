type TimeCalculationParams = {
  startDate: Date
  targetCompletionDate: Date | null
  estimatedHours: number
  completedHours: number
  completionPercentage: number
}

export function calculateTimeMetrics(params: TimeCalculationParams) {
  const { startDate, targetCompletionDate, estimatedHours, completedHours, completionPercentage } = params

  // Calculate days elapsed since start
  const now = new Date()
  const msPerDay = 1000 * 60 * 60 * 24
  const daysElapsed = Math.max(0, Math.round((now.getTime() - startDate.getTime()) / msPerDay))

  // Calculate days remaining until target (if target date exists)
  let daysRemaining = 0
  if (targetCompletionDate) {
    daysRemaining = Math.max(0, Math.round((targetCompletionDate.getTime() - now.getTime()) / msPerDay))
  } else {
    // If no target date, estimate based on remaining hours (assuming 8 hours per day)
    const remainingHours = estimatedHours - completedHours
    daysRemaining = Math.ceil(remainingHours / 8)
  }

  // Calculate remaining hours
  const remainingHours = estimatedHours - completedHours

  // Calculate velocity (percentage completed per day)
  const velocity = daysElapsed > 0 ? completionPercentage / daysElapsed : 0

  // Estimate completion date based on current velocity
  const estimatedCompletionDate = new Date()
  if (velocity > 0 && completionPercentage < 100) {
    const daysToComplete = (100 - completionPercentage) / velocity
    estimatedCompletionDate.setDate(now.getDate() + Math.ceil(daysToComplete))
  } else if (completionPercentage < 100) {
    // If velocity is 0 but not complete, estimate based on remaining hours
    estimatedCompletionDate.setDate(now.getDate() + Math.ceil(remainingHours / 8)) // Assuming 8 hours per day
  }

  return {
    estimated_total_hours: estimatedHours,
    completed_hours: completedHours,
    remaining_hours: remainingHours,
    days_elapsed: daysElapsed,
    days_remaining: daysRemaining,
    velocity: Number.parseFloat(velocity.toFixed(2)),
    estimated_completion_date: estimatedCompletionDate,
    is_overdue: targetCompletionDate ? now > targetCompletionDate : false,
  }
}
