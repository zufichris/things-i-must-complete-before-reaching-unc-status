import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Roadmap } from "@/types"
import { Progress } from "@/components/ui/progress"

export function PrerequisiteWarning({ prerequisites }: { prerequisites: Roadmap[] }) {
  return (
    <Alert
      variant="warning"
      className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-600"
    >
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="mb-2 font-semibold">Prerequisites Required</AlertTitle>
      <AlertDescription>
        <p className="mb-4">You need to complete the following roadmaps before starting this one:</p>
        <div className="space-y-4">
          {prerequisites.map((prereq) => (
            <div
              key={prereq.id}
              className="rounded-md border border-amber-200 bg-white p-3 dark:border-amber-800/30 dark:bg-amber-950/30"
            >
              <div className="mb-2 flex items-center justify-between">
                <Link
                  href={`/roadmaps/${prereq.id}`}
                  className="flex items-center font-medium text-amber-900 hover:underline dark:text-amber-500"
                >
                  {prereq.title}
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </Link>
                <span className="text-sm font-medium">{Math.round(prereq.completion_percentage || 0)}% complete</span>
              </div>
              <Progress value={prereq.completion_percentage || 0} className="h-2" />
            </div>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  )
}
