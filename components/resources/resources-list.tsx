"use client"

import { useState } from "react"
import type { Resource, ResourceCategory } from "@/types"
import { ResourceCard } from "./resource-card"
import { ResourceFilter } from "./resource-filter"
import { ResourceSearch } from "./resource-search"
import { searchResources } from "@/app/resources/actions"

interface ResourcesListProps {
  initialResources: Resource[]
}

export function ResourcesList({ initialResources }: ResourcesListProps) {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleCategoryChange = (category: ResourceCategory | "all") => {
    setSelectedCategory(category)

    if (category === "all") {
      // If search query exists, filter by search
      if (searchQuery) {
        handleSearch(searchQuery)
      } else {
        setResources(initialResources)
      }
    } else {
      // Filter by category and search query if it exists
      const filtered = initialResources.filter(
        (resource) =>
          resource.category === category &&
          (searchQuery
            ? resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              resource.description.toLowerCase().includes(searchQuery.toLowerCase())
            : true),
      )
      setResources(filtered)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      // If no query, show all or filter by category
      if (selectedCategory === "all") {
        setResources(initialResources)
      } else {
        const filtered = initialResources.filter((resource) => resource.category === selectedCategory)
        setResources(filtered)
      }
      return
    }

    setIsSearching(true)
    try {
      const results = await searchResources(query)

      // Apply category filter if needed
      if (selectedCategory !== "all") {
        const filtered = results.filter((resource) => resource.category === selectedCategory)
        setResources(filtered)
      } else {
        setResources(results)
      }
    } catch (error) {
      console.error("Error searching resources:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <ResourceFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <ResourceSearch onSearch={handleSearch} isSearching={isSearching} />
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  )
}
