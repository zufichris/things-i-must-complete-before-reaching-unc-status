"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, Circle, Clock } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  description: string
  phases: any[]
  prerequisites?: string[]
}

interface ProjectSidebarProps {
  projects: Project[]
  activeProject: string
  setActiveProject: (id: string) => void
  completedTasks: Record<string, string[]>
  calculateProgress: (projectId: string) => number
}

export default function ProjectSidebar({
  projects,
  activeProject,
  setActiveProject,
  completedTasks,
  calculateProgress,
}: ProjectSidebarProps) {
  // Group projects by category
  const groupedProjects = projects.reduce(
    (acc, project) => {
      const category = project.category || "Uncategorized"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(project)
      return acc
    },
    {} as Record<string, Project[]>,
  )

  // Sort categories
  const sortedCategories = Object.keys(groupedProjects).sort()

  // Get status icon based on progress
  const getStatusIcon = (progress: number) => {
    if (progress === 0) return <Circle className="h-4 w-4 text-muted-foreground" />
    if (progress < 100) return <Clock className="h-4 w-4 text-warning" />
    return <CheckCircle className="h-4 w-4 text-success" />
  }

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-6 pr-4">
        {sortedCategories.map((category) => (
          <div key={category} className="space-y-2">
            <h3 className="font-medium text-sm px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
              {category}
            </h3>
            <div className="space-y-1">
              {groupedProjects[category].map((project) => {
                const progress = calculateProgress(project.id)
                const isActive = activeProject === project.id

                return (
                  <div key={project.id} className="mb-2">
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start text-left h-auto py-3 ${isActive ? "" : "hover:bg-secondary/50"}`}
                      onClick={() => setActiveProject(project.id)}
                    >
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(progress)}
                            <span className="truncate font-medium">{project.title}</span>
                          </div>
                          <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">{Math.round(progress)}%</span>
                        </div>
                        <div className="mt-2">
                          <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }} />
                          </div>
                        </div>
                      </div>
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
