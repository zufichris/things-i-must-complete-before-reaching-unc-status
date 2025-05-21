"use client"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}: {
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
}) {
  const [open, setOpen] = useState(false)

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  const selectAll = () => {
    onCategoryChange([...categories])
  }

  const clearAll = () => {
    onCategoryChange([])
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="flex min-w-[180px] justify-between">
            {selectedCategories.length > 0 ? `${selectedCategories.length} categories selected` : "Filter by category"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search categories..." />
            <CommandList>
              <CommandEmpty>No categories found.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem key={category} onSelect={() => toggleCategory(category)}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedCategories.includes(category)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{category}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem onSelect={selectAll}>
                  <span>Select all</span>
                </CommandItem>
                <CommandItem onSelect={clearAll}>
                  <span>Clear all</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedCategories.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => toggleCategory(category)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {category}</span>
              </button>
            </Badge>
          ))}
          {selectedCategories.length > 1 && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={clearAll}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
