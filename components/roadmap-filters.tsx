"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "./search-bar"
import { CategoryFilter } from "./category-filter"
import { ActiveFilters } from "./active-filters"
import type { Roadmap } from "@/types"

export function RoadmapFilters({
  roadmaps,
  categories,
  onFilteredRoadmaps,
}: { roadmaps: Roadmap[]; categories: string[]; onFilteredRoadmaps: (roadmaps: Roadmap[]) => void }) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Apply filters whenever the filter criteria change
  useEffect(() => {
    const filtered = roadmaps.filter((roadmap) => {
      // Filter by category if any categories are selected
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(roadmap.category)

      // Filter by search query
      const searchMatch =
        searchQuery === "" ||
        roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.description.toLowerCase().includes(searchQuery.toLowerCase())

      return categoryMatch && searchMatch
    })

    onFilteredRoadmaps(filtered)
  }, [roadmaps, selectedCategories, searchQuery, onFilteredRoadmaps])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      <ActiveFilters
        searchTerm={searchQuery}
        selectedCategories={selectedCategories}
        onClearSearch={() => setSearchQuery("")}
        onClearCategories={() => setSelectedCategories([])}
        onClearAll={() => {
          setSearchQuery("")
          setSelectedCategories([])
        }}
        onClearAdvancedFilter={() => { }}
      />
    </div>
  )
}
