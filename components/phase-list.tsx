import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Lock } from "lucide-react"
import type { Phase } from "@/types"
import { TaskList } from "@/components/task-list"

export function PhaseList({
  phases,
  roadmapId,
  isLocked,
}: {
  phases: Phase[]
  roadmapId: string
  isLocked: boolean
}) {
  return (
    <div className="space-y-6">
      <h2 className="flex items-center text-2xl font-bold tracking-tight">
        <span>Phases</span>
        <Badge variant="outline" className="ml-2">
          {phases.length}
        </Badge>
      </h2>

      <div className="space-y-6">
        {phases.map((phase, index) => (
          <Card key={phase.id} className="phase-card overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">
                    Phase {index + 1}
                  </Badge>
                  <CardTitle>{phase.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="mr-1.5 h-4 w-4 text-primary" />
                    <span>
                      {phase.completed_tasks || 0} of {phase.total_tasks || 0} tasks
                    </span>
                  </div>
                  <Badge variant={phase.completion_percentage === 100 ? "default" : "outline"}>
                    {Math.round(phase.completion_percentage || 0)}%
                  </Badge>
                </div>
              </div>
              <Progress value={phase.completion_percentage || 0} className="h-2" />
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-sm text-muted-foreground">{phase.description}</p>

              {isLocked && (
                <div className="mb-4 flex items-center rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-600">
                  <Lock className="mr-2 h-4 w-4" />
                  <span className="text-sm">This phase is locked until all prerequisites are completed.</span>
                </div>
              )}

              <TaskList tasks={phase.tasks || []} phaseId={phase.id} roadmapId={roadmapId} isLocked={isLocked} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
