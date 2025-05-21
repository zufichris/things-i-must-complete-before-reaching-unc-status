import { getRoadmaps } from "./actions"
import { DashboardHeader } from "@/components/dashboard-header"
import { Suspense } from "react"
import { RoadmapCardSkeleton } from "@/components/roadmap-card-skeleton"
import { FilteredRoadmaps } from "@/components/filtered-roadmaps"

export default async function Home() {
  const roadmaps = await getRoadmaps()

  // Extract unique categories
  const categories = Array.from(new Set(roadmaps.map((roadmap) => roadmap.category)))

  return (
    <div className="container space-y-8 py-8">
      <DashboardHeader />

      <Suspense fallback={<div className="h-20 animate-pulse rounded-md bg-muted"></div>}>
        <FilteredRoadmaps roadmaps={roadmaps} categories={categories} />
      </Suspense>
    </div>
  )
}

function RoadmapGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <RoadmapCardSkeleton key={i} />
        ))}
    </div>
  )
}
