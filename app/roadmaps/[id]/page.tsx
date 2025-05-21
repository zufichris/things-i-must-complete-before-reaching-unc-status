import { notFound } from "next/navigation"
import { getRoadmapById, checkPrerequisitesCompleted } from "@/app/actions"
import { RoadmapHeader } from "@/components/roadmap-header"
import { PhaseList } from "@/components/phase-list"
import { PrerequisiteWarning } from "@/components/prerequisite-warning"
import { Suspense } from "react"
import { RoadmapDetailsSkeleton } from "@/components/roadmap-details-skeleton"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { NoteList } from "@/components/notes/note-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function RoadmapPage({ params }: { params: { id: string } }) {
  const roadmap = await getRoadmapById(params.id)

  if (!roadmap) {
    notFound()
  }

  const prerequisitesCompleted = await checkPrerequisitesCompleted(params.id)

  return (
    <div className="container animate-in py-8">
      <Link href="/">
        <Button variant="ghost" size="sm" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <Suspense fallback={<RoadmapDetailsSkeleton />}>
        <div className="space-y-8">
          <RoadmapHeader roadmap={roadmap} />

          {!prerequisitesCompleted && roadmap.prerequisites && roadmap.prerequisites.length > 0 && (
            <PrerequisiteWarning prerequisites={roadmap.prerequisites} />
          )}

          <Tabs defaultValue="phases" className="w-full">
            <TabsList>
              <TabsTrigger value="phases">Phases & Tasks</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="phases" className="mt-6">
              <PhaseList phases={roadmap.phases || []} roadmapId={roadmap.id} isLocked={!prerequisitesCompleted} />
            </TabsContent>
            <TabsContent value="notes" className="mt-6">
              <NoteList roadmapId={roadmap.id} />
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    </div>
  )
}
