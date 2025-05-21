"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ResourceSearchProps {
  onSearch: (query: string) => void
  isSearching: boolean
}

export function ResourceSearch({ onSearch, isSearching }: ResourceSearchProps) {
  const [query, setQuery] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    onSearch(newQuery)
  }

  return (
    <div className="relative w-full sm:w-[300px]">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search resources..."
        className="pl-8 pr-10"
        value={query}
        onChange={handleChange}
      />
      {isSearching && <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />}
    </div>
  )
}
