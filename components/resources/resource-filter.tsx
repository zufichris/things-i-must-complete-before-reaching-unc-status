"use client"

import type { ResourceCategory } from "@/types"
import { Button } from "@/components/ui/button"
import { getCategoryIcon } from "@/lib/resource-utils"

interface ResourceFilterProps {
  selectedCategory: ResourceCategory | "all"
  onCategoryChange: (category: ResourceCategory | "all") => void
}

export function ResourceFilter({ selectedCategory, onCategoryChange }: ResourceFilterProps) {
  const categories: (ResourceCategory | "all")[] = ["all", "article", "documentation", "tool", "video", "book", "other"]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const Icon = category === "all" ? undefined : getCategoryIcon(category as ResourceCategory)

        return (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="flex items-center gap-1"
          >
            {Icon && <Icon className="h-4 w-4" />}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        )
      })}
    </div>
  )
}
