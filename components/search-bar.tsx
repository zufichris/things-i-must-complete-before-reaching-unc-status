"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Filter, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onChange: (term: string) => void
  onAdvancedSearch?: (filters: AdvancedSearchFilters) => void
  className?: string
}

export interface AdvancedSearchFilters {
  searchFields: {
    title: boolean
    description: boolean
    category: boolean
  }
  status?: string
  completionRange?: {
    min: number
    max: number
  }
  dateRange?: {
    start?: string
    end?: string
  }
}

const defaultFilters: AdvancedSearchFilters = {
  searchFields: {
    title: true,
    description: true,
    category: true,
  },
  status: "all",
  completionRange: {
    min: 0,
    max: 100,
  },
}

export function SearchBar({ value, onChange, onAdvancedSearch, className }: SearchBarProps) {
  const [filters, setFilters] = useState<AdvancedSearchFilters>(defaultFilters)
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Calculate active filter count
  useEffect(() => {
    let count = 0

    if (filters.status && filters.status !== "all") count++

    if (filters.completionRange && (filters.completionRange.min > 0 || filters.completionRange.max < 100)) count++

    if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) count++

    if (!filters.searchFields.title || !filters.searchFields.description || !filters.searchFields.category) count++

    setActiveFilterCount(count)
  }, [filters])

  // Apply advanced filters
  const applyFilters = () => {
    if (onAdvancedSearch) {
      onAdvancedSearch(filters)
    }
  }

  // Reset filters to default
  const resetFilters = () => {
    setFilters(defaultFilters)
    if (onAdvancedSearch) {
      onAdvancedSearch(defaultFilters)
    }
  }

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative flex w-full items-center">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search roadmaps..."
          className="w-full rounded-md pl-8 pr-16"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 relative">
                <Filter className="h-4 w-4" />
                {activeFilterCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
                <span className="sr-only">Advanced search</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h4 className="font-medium">Advanced Search</h4>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Search in:</h5>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="search-title"
                        checked={filters.searchFields.title}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            searchFields: {
                              ...prev.searchFields,
                              title: !!checked,
                            },
                          }))
                        }
                      />
                      <Label htmlFor="search-title">Title</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="search-description"
                        checked={filters.searchFields.description}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            searchFields: {
                              ...prev.searchFields,
                              description: !!checked,
                            },
                          }))
                        }
                      />
                      <Label htmlFor="search-description">Description</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="search-category"
                        checked={filters.searchFields.category}
                        onCheckedChange={(checked) =>
                          setFilters((prev) => ({
                            ...prev,
                            searchFields: {
                              ...prev.searchFields,
                              category: !!checked,
                            },
                          }))
                        }
                      />
                      <Label htmlFor="search-category">Category</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Status:</h5>
                  <Select
                    value={filters.status}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="not-started">Not Started</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Completion:</h5>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={filters.completionRange?.min}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          completionRange: {
                            ...prev.completionRange!,
                            min: Number.parseInt(e.target.value) || 0,
                          },
                        }))
                      }
                      className="w-16"
                    />
                    <span>to</span>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={filters.completionRange?.max}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          completionRange: {
                            ...prev.completionRange!,
                            max: Number.parseInt(e.target.value) || 100,
                          },
                        }))
                      }
                      className="w-16"
                    />
                    <span>%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Date Range:</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="start-date" className="text-xs">
                        Start Date
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="start-date"
                          type="date"
                          value={filters.dateRange?.start || ""}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              dateRange: {
                                ...prev.dateRange,
                                start: e.target.value,
                              },
                            }))
                          }
                          className="pl-8"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="end-date" className="text-xs">
                        End Date
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="end-date"
                          type="date"
                          value={filters.dateRange?.end || ""}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              dateRange: {
                                ...prev.dateRange,
                                end: e.target.value,
                              },
                            }))
                          }
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                  <Button size="sm" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
