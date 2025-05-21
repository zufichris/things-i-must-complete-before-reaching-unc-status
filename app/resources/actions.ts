"use server"

import { createServerClient } from "@/lib/supabase"
import type { Resource, ResourceCategory } from "@/types"

// Get all resources
export async function getResources(): Promise<Resource[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("resources").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching resources:", error)
    return []
  }

  return data as Resource[]
}

// Get resources by category
export async function getResourcesByCategory(category: ResourceCategory): Promise<Resource[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching resources by category:", error)
    return []
  }

  return data as Resource[]
}

// Search resources
export async function searchResources(query: string): Promise<Resource[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching resources:", error)
    return []
  }

  return data as Resource[]
}
