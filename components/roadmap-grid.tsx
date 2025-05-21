import { RoadmapCard } from "@/components/roadmap-card"
import type { Roadmap } from "@/types"

export function RoadmapGrid({ roadmaps }: { roadmaps: Roadmap[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap) => (
        <RoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  )
}
