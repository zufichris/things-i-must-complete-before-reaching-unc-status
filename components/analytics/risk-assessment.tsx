import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Roadmap } from "@/types"

interface RiskAssessmentProps {
  riskProjects: Roadmap[]
}

export function RiskAssessment({ riskProjects }: RiskAssessmentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
          <CardDescription>Projects at risk of missing deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          {riskProjects.length > 0 ? (
            <div className="space-y-6">
              {riskProjects.map((roadmap) => {
                const completionPercentage = roadmap.completion_percentage || 0
                const daysRemaining = roadmap.days_remaining || 0
                const velocity = roadmap.velocity || 0.1
                const daysNeeded = Math.ceil((100 - completionPercentage) / velocity)
                const riskLevel =
                  daysNeeded > daysRemaining * 1.5 ? "High" : daysNeeded > daysRemaining ? "Medium" : "Low"

                return (
                  <div key={roadmap.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`h-5 w-5 ${
                            riskLevel === "High"
                              ? "text-red-500"
                              : riskLevel === "Medium"
                                ? "text-amber-500"
                                : "text-green-500"
                          }`}
                        />
                        <h3 className="font-medium">{roadmap.title}</h3>
                      </div>
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          riskLevel === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                            : riskLevel === "Medium"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                              : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                        }`}
                      >
                        {riskLevel} Risk
                      </div>
                    </div>

                    <div className="mb-2 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(completionPercentage)}%</span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" />
                    </div>

                    <div className="mb-4 grid grid-cols-3 gap-2 text-center text-sm">
                      <div>
                        <div className="font-medium">{daysRemaining}</div>
                        <div className="text-xs text-muted-foreground">Days Left</div>
                      </div>
                      <div>
                        <div className="font-medium">{daysNeeded}</div>
                        <div className="text-xs text-muted-foreground">Days Needed</div>
                      </div>
                      <div>
                        <div className="font-medium">{velocity.toFixed(1)}%</div>
                        <div className="text-xs text-muted-foreground">Daily Velocity</div>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {riskLevel === "High" ? (
                        <p>
                          At the current pace, this project will miss the deadline by approximately{" "}
                          <span className="font-medium text-red-600 dark:text-red-400">
                            {daysNeeded - daysRemaining} days
                          </span>
                          . Immediate action required.
                        </p>
                      ) : riskLevel === "Medium" ? (
                        <p>
                          This project is at risk of missing the deadline by approximately{" "}
                          <span className="font-medium text-amber-600 dark:text-amber-400">
                            {daysNeeded - daysRemaining} days
                          </span>
                          . Consider allocating more resources.
                        </p>
                      ) : (
                        <p>
                          This project is slightly behind but can still meet the deadline with{" "}
                          <span className="font-medium text-green-600 dark:text-green-400">minor adjustments</span>.
                        </p>
                      )}
                    </div>

                    <div className="mt-4">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/roadmaps/${roadmap.id}`}>
                          View Project Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-6 text-center">
              <div className="mb-2 flex justify-center">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/20">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
              <h3 className="mb-1 text-lg font-medium">No Projects at Risk</h3>
              <p className="text-sm text-muted-foreground">
                All projects are currently on track to meet their deadlines.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
