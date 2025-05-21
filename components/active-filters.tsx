"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AdvancedSearchFilters } from "./search-bar"

interface ActiveFiltersProps {
  searchTerm: string
  selectedCategories: string[]
  advancedFilters?: AdvancedSearchFilters
  onClearSearch: () => void
  onClearCategories: () => void
  onClearAdvancedFilter: (filterType: string) => void
  onClearAll: () => void
}

export function ActiveFilters({
  searchTerm,
  selectedCategories,
  advancedFilters,
  onClearSearch,
  onClearCategories,
  onClearAdvancedFilter,
  onClearAll,
}: ActiveFiltersProps) {
  // Count active filters
  const hasActiveFilters =
    searchTerm ||
    selectedCategories.length > 0 ||
    (advancedFilters &&
      (advancedFilters.status !== "all" ||
        (advancedFilters.completionRange &&
          (advancedFilters.completionRange.min > 0 || advancedFilters.completionRange.max < 100)) ||
        (advancedFilters.dateRange && (advancedFilters.dateRange.start || advancedFilters.dateRange.end))))

  if (!hasActiveFilters) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>

      <div className="flex flex-wrap gap-1">
        {searchTerm && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>Search: {searchTerm}</span>
            <Button variant="ghost" size="icon" className="h-3 w-3 p-0 hover:bg-transparent" onClick={onClearSearch}>
              <X className="h-3 w-3" />
              <span className="sr-only">Clear search</span>
            </Button>
          </Badge>
        )}

        {selectedCategories.length > 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>
              {selectedCategories.length === 1
                ? `Category: ${selectedCategories[0]}`
                : `Categories: ${selectedCategories.length}`}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-3 w-3 p-0 hover:bg-transparent"
              onClick={onClearCategories}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear categories</span>
            </Button>
          </Badge>
        )}

        {advancedFilters?.status && advancedFilters.status !== "all" && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>Status: {advancedFilters.status}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-3 w-3 p-0 hover:bg-transparent"
              onClick={() => onClearAdvancedFilter("status")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear status</span>
            </Button>
          </Badge>
        )}

        {advancedFilters?.completionRange &&
          (advancedFilters.completionRange.min > 0 || advancedFilters.completionRange.max < 100) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>
                Completion: {advancedFilters.completionRange.min}% - {advancedFilters.completionRange.max}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-3 w-3 p-0 hover:bg-transparent"
                onClick={() => onClearAdvancedFilter("completion")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Clear completion range</span>
              </Button>
            </Badge>
          )}

        {advancedFilters?.dateRange?.start && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>From: {advancedFilters.dateRange.start}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-3 w-3 p-0 hover:bg-transparent"
              onClick={() => onClearAdvancedFilter("dateStart")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear start date</span>
            </Button>
          </Badge>
        )}

        {advancedFilters?.dateRange?.end && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <span>To: {advancedFilters.dateRange.end}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-3 w-3 p-0 hover:bg-transparent"
              onClick={() => onClearAdvancedFilter("dateEnd")}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Clear end date</span>
            </Button>
          </Badge>
        )}
      </div>

      <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onClearAll}>
        Clear all
      </Button>
    </div>
  )
}
