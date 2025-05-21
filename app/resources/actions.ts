"use server"

import { createServerClient } from "@/lib/supabase"
import type { Resource, ResourceCategory } from "@/types"
import { revalidatePath } from "next/cache"

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

// Create a new resource
export async function createResource(resource: Omit<Resource, "id" | "created_at">): Promise<Resource | null> {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("resources").insert(resource).select().single()

    if (error) {
      throw error
    }

    revalidatePath("/resources")
    return data as Resource
  } catch (error) {
    console.error("Error creating resource:", error)
    return null
  }
}

// Update a resource
export async function updateResource(id: number, resource: Partial<Resource>): Promise<Resource | null> {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.from("resources").update(resource).eq("id", id).select().single()

    if (error) {
      throw error
    }

    revalidatePath("/resources")
    return data as Resource
  } catch (error) {
    console.error("Error updating resource:", error)
    return null
  }
}

// Delete a resource
export async function deleteResource(id: number): Promise<boolean> {
  const supabase = createServerClient()

  try {
    const { error } = await supabase.from("resources").delete().eq("id", id)

    if (error) {
      throw error
    }

    revalidatePath("/resources")
    return true
  } catch (error) {
    console.error("Error deleting resource:", error)
    return false
  }
}
