import { BookOpen } from "lucide-react"

export function ResourcesHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
        <BookOpen className="h-8 w-8" />
        Resources
      </h1>
      <p className="text-muted-foreground">
        Browse helpful resources for your projects, including articles, documentation, tools, videos, and books.
      </p>
    </div>
  )
}
