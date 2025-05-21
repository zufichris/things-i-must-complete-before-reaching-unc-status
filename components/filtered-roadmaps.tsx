"use client"

import { useState, useEffect } from "react"
import { RoadmapGrid } from "@/components/roadmap-grid"
import { RoadmapFilters } from "@/components/roadmap-filters"
import type { Roadmap } from "@/types"

export function FilteredRoadmaps({
  roadmaps,
  categories,
}: {
  roadmaps: Roadmap[]
  categories: string[]
}) {
  const [filteredRoadmaps, setFilteredRoadmaps] = useState<Roadmap[]>(roadmaps)

  // Update filtered roadmaps when the input roadmaps change
  useEffect(() => {
    setFilteredRoadmaps(roadmaps)
  }, [roadmaps])

  return (
    <>
      <RoadmapFilters roadmaps={roadmaps} categories={categories} onFilteredRoadmaps={setFilteredRoadmaps} />
      <RoadmapGrid roadmaps={filteredRoadmaps} />
    </>
  )
}
