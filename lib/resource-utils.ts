import type { ResourceCategory } from "@/types"
import { BookOpen, FileText, Film, PenToolIcon as Tool, FileQuestion, BookMarked } from "lucide-react"

export function getCategoryIcon(category: ResourceCategory) {
  switch (category) {
    case "article":
      return FileText
    case "documentation":
      return BookOpen
    case "tool":
      return Tool
    case "video":
      return Film
    case "book":
      return BookMarked
    case "other":
    default:
      return FileQuestion
  }
}
