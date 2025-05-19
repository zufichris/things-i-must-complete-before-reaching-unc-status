"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Search, Download, Upload, BarChart2, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "./theme-toggle"
import ProjectSidebar from "./project-sidebar"
import DashboardView from "./dashboard-view"
import DependencyGraph from "./dependency-graph"
import TimeTracker from "./time-tracker"
import TaskNotes from "./task-notes"
import { roadmapData } from "@/lib/roadmap-data"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function RoadmapTracker() {
  const [activeProject, setActiveProject] = useState("")
  const [completedTasks, setCompletedTasks] = useState<Record<string, string[]>>({})
  const [taskTimes, setTaskTimes] = useState<Record<string, Record<string, number>>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState<"projects" | "dashboard" | "dependencies">("projects")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "not-started" | "in-progress" | "completed">("all")
  const [filteredProjects, setFilteredProjects] = useState(roadmapData)

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("roadmapProgress")
    if (savedProgress) {
      setCompletedTasks(JSON.parse(savedProgress))
    }

    const savedTimes = localStorage.getItem("roadmapTimes")
    if (savedTimes) {
      setTaskTimes(JSON.parse(savedTimes))
    }

    // Set default active project if none is selected
    if (!activeProject && roadmapData.length > 0) {
      setActiveProject(roadmapData[0].id)
    }
  }, [activeProject])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("roadmapProgress", JSON.stringify(completedTasks))
  }, [completedTasks])

  // Save times to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("roadmapTimes", JSON.stringify(taskTimes))
  }, [taskTimes])

  // Filter projects based on search query and filters
  useEffect(() => {
    let filtered = [...roadmapData]

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.phases.some(
            (phase) =>
              phase.title.toLowerCase().includes(query) ||
              phase.tasks.some((task) => task.toLowerCase().includes(query)),
          ),
      )
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((project) => project.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => {
        const progress = calculateProgress(project.id)
        if (statusFilter === "not-started") return progress === 0
        if (statusFilter === "in-progress") return progress > 0 && progress < 100
        if (statusFilter === "completed") return progress === 100
        return true
      })
    }

    setFilteredProjects(filtered)
  }, [searchQuery, categoryFilter, statusFilter])

  // Toggle task completion
  const toggleTask = (projectId: string, phaseIndex: number, taskIndex: number, task: string) => {
    setCompletedTasks((prev) => {
      const projectTasks = prev[projectId] || []
      const taskId = `${phaseIndex}-${taskIndex}`

      if (projectTasks.includes(taskId)) {
        return {
          ...prev,
          [projectId]: projectTasks.filter((id) => id !== taskId),
        }
      } else {
        return {
          ...prev,
          [projectId]: [...projectTasks, taskId],
        }
      }
    })
  }

  // Update task time
  const updateTaskTime = (projectId: string, phaseIndex: number, taskIndex: number, time: number) => {
    setTaskTimes((prev) => {
      const projectTimes = prev[projectId] || {}
      const taskId = `${phaseIndex}-${taskIndex}`

      return {
        ...prev,
        [projectId]: {
          ...projectTimes,
          [taskId]: time,
        },
      }
    })
  }

  // Calculate project progress
  const calculateProgress = (projectId: string) => {
    const project = roadmapData.find((p) => p.id === projectId)
    if (!project) return 0

    const projectTasks = completedTasks[projectId] || []
    const totalTasks = project.phases.reduce((sum, phase) => sum + phase.tasks.length, 0)

    return totalTasks > 0 ? (projectTasks.length / totalTasks) * 100 : 0
  }

  // Get current project
  const currentProject = roadmapData.find((project) => project.id === activeProject)

  // Get unique categories
  const categories = Array.from(new Set(roadmapData.map((project) => project.category)))

  // Export progress data
  const exportData = () => {
    const data = {
      progress: completedTasks,
      times: taskTimes,
      lastExport: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    const exportFileName = `roadmap-data-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileName)
    linkElement.click()
  }

  // Import progress data
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        if (data.progress) {
          setCompletedTasks(data.progress)
        }

        if (data.times) {
          setTaskTimes(data.times)
        }

        alert("Data imported successfully!")
      } catch (error) {
        console.error("Failed to parse imported data:", error)
        alert("Failed to import data. The file might be corrupted.")
      }
    }
    reader.readAsText(file)
  }

  // Get status class based on progress
  const getStatusClass = (progress: number) => {
    if (progress === 0) return "status-not-started"
    if (progress < 100) return "status-in-progress"
    return "status-completed"
  }

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card rounded-lg border p-4 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <h2 className="text-xl font-bold">Projects I must Complete Before Reaching Unc Status</h2>
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)} className="w-full md:w-auto">
            <TabsList className="grid w-full md:w-auto grid-cols-3">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportData} className="h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <label>
              <Button variant="outline" size="sm" asChild className="h-9">
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </span>
              </Button>
              <input type="file" accept=".json" className="hidden" onChange={importData} />
            </label>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
        <TabsContent value="dashboard" className="mt-6 animate-in">
          <DashboardView projects={roadmapData} completedTasks={completedTasks} calculateProgress={calculateProgress} />
        </TabsContent>

        <TabsContent value="dependencies" className="mt-6 animate-in">
          <DependencyGraph
            projects={roadmapData}
            activeProject={activeProject}
            setActiveProject={setActiveProject}
            calculateProgress={calculateProgress}
          />
        </TabsContent>

        <TabsContent value="projects" className="mt-6 animate-in">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="space-y-4 bg-card rounded-lg border p-4 shadow-sm">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                      {(categoryFilter !== "all" || statusFilter !== "all") && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {(categoryFilter !== "all" ? 1 : 0) + (statusFilter !== "all" ? 1 : 0)}
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Category</h4>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Categories" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Status</h4>
                        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
                          <SelectTrigger>
                            <SelectValue placeholder="All Statuses" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCategoryFilter("all")
                            setStatusFilter("all")
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="mt-4">
                <ProjectSidebar
                  projects={filteredProjects}
                  activeProject={activeProject}
                  setActiveProject={setActiveProject}
                  completedTasks={completedTasks}
                  calculateProgress={calculateProgress}
                />
              </div>
            </div>

            <div className="flex-1">
              {currentProject ? (
                <Card className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{currentProject.title}</CardTitle>
                        <CardDescription className="mt-2">{currentProject.description}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setActiveView("dashboard")}>
                        <BarChart2 className="mr-2 h-4 w-4" />
                        View Stats
                      </Button>
                    </div>

                    {currentProject.prerequisites && currentProject.prerequisites.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">Prerequisites:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {currentProject.prerequisites.map((prereqId) => {
                            const prereq = roadmapData.find((p) => p.id === prereqId)
                            if (!prereq) return null

                            const progress = calculateProgress(prereqId)
                            const statusClass = getStatusClass(progress)

                            return (
                              <Button
                                key={prereqId}
                                variant="outline"
                                size="sm"
                                className={`text-xs ${statusClass}`}
                                onClick={() => setActiveProject(prereqId)}
                              >
                                {prereq.title} ({Math.round(progress)}%)
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{Math.round(calculateProgress(currentProject.id))}%</span>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${calculateProgress(currentProject.id)}%` }} />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Tabs defaultValue="0" className="w-full">
                      <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-6">
                        {currentProject.phases.map((phase, index) => (
                          <TabsTrigger key={index} value={index.toString()}>
                            {phase.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {currentProject.phases.map((phase, phaseIndex) => (
                        <TabsContent key={phaseIndex} value={phaseIndex.toString()} className="animate-in">
                          <div className="space-y-6">
                            <div className="phase-header">
                              <h3 className="text-xl font-medium">{phase.title}</h3>
                              <div className="text-xs px-2 py-1 rounded-full bg-secondary">
                                Phase {phaseIndex + 1} of {currentProject.phases.length}
                              </div>
                            </div>
                            <p className="text-muted-foreground">{phase.description}</p>

                            <div className="space-y-1 mt-4">
                              {phase.tasks.map((task, taskIndex) => {
                                const taskId = `${phaseIndex}-${taskIndex}`
                                const isCompleted = (completedTasks[currentProject.id] || []).includes(taskId)
                                const taskTime = taskTimes[currentProject.id]?.[taskId] || 0

                                return (
                                  <div
                                    key={taskIndex}
                                    className={`task-item flex items-start space-x-3 ${isCompleted ? "bg-success/10" : ""}`}
                                  >
                                    <Checkbox
                                      id={`${currentProject.id}-${taskId}`}
                                      checked={isCompleted}
                                      onCheckedChange={() => toggleTask(currentProject.id, phaseIndex, taskIndex, task)}
                                      className="mt-1"
                                    />
                                    <div className="flex-1">
                                      <label
                                        htmlFor={`${currentProject.id}-${taskId}`}
                                        className={`text-sm ${isCompleted ? "line-through text-muted-foreground" : ""}`}
                                      >
                                        {task}
                                      </label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <TimeTracker
                                        projectId={currentProject.id}
                                        phaseIndex={phaseIndex}
                                        taskIndex={taskIndex}
                                        taskText={task}
                                        initialTime={taskTime}
                                        onTimeUpdate={(time) =>
                                          updateTaskTime(currentProject.id, phaseIndex, taskIndex, time)
                                        }
                                      />
                                      <TaskNotes
                                        projectId={currentProject.id}
                                        phaseIndex={phaseIndex}
                                        taskIndex={taskIndex}
                                      />
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card className="card-hover">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="rounded-full bg-primary/10 p-6 mb-4">
                        <Search className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-medium mb-2">No Project Selected</h3>
                      <p className="text-muted-foreground max-w-md">
                        Select a project from the sidebar to view its roadmap and track your progress.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
