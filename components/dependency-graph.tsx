"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import * as d3 from "d3"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

interface Project {
  id: string
  title: string
  prerequisites?: string[]
}

interface DependencyGraphProps {
  projects: Project[]
  activeProject: string
  setActiveProject: (id: string) => void
  calculateProgress: (projectId: string) => number
}

export default function DependencyGraph({
  projects,
  activeProject,
  setActiveProject,
  calculateProgress,
}: DependencyGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove()

    // Create nodes and links
    const nodes = projects.map((project) => ({
      id: project.id,
      title: project.title,
      progress: calculateProgress(project.id),
      isActive: project.id === activeProject,
    }))

    const links = projects.flatMap((project) =>
      (project.prerequisites || []).map((prereqId) => ({
        source: prereqId,
        target: project.id,
      })),
    )

    // Set up the SVG
    const width = svgRef.current.clientWidth
    const height = 500
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])

    // Create a simulation
    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(120),
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(70))

    // Create a group for the graph
    const graph = svg.append("g")

    // Add zoom behavior
    svg.call(
      d3.zoom().on("zoom", (event) => {
        graph.attr("transform", event.transform)
      }) as any,
    )

    // Create links
    const link = graph
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "var(--border)")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)")

    // Define arrow marker
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "var(--border)")
      .attr("d", "M0,-5L10,0L0,5")

    // Create nodes
    const node = graph
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        setActiveProject(d.id)
      })
      .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add node background
    node
      .append("circle")
      .attr("r", 35)
      .attr("fill", (d: any) => {
        if (d.isActive) return "hsl(var(--primary))"
        if (d.progress === 100) return "hsl(var(--success))"
        if (d.progress > 0) return "hsl(var(--warning))"
        return "hsl(var(--muted))"
      })
      .attr("stroke", (d: any) => (d.isActive ? "hsl(var(--ring))" : "hsl(var(--border))"))
      .attr("stroke-width", (d: any) => (d.isActive ? 3 : 1))
      .attr("class", "transition-all duration-300")

    // Add progress arcs
    node
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "hsl(var(--background))")
      .attr("stroke-width", 4)
      .attr("d", (d: any) => {
        const progress = d.progress / 100
        const radius = 35
        const arc = d3
          .arc()
          .innerRadius(radius - 4)
          .outerRadius(radius + 4)
          .startAngle(0)
          .endAngle(progress * 2 * Math.PI)
        return arc({ innerRadius: radius - 4, outerRadius: radius + 4 } as any)
      })

    // Add status icons
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("fill", (d: any) => {
        if (d.isActive) return "hsl(var(--primary-foreground))"
        if (d.progress === 100) return "hsl(var(--success-foreground))"
        if (d.progress > 0) return "hsl(var(--warning-foreground))"
        return "hsl(var(--muted-foreground))"
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "16px")
      .html((d: any) => {
        if (d.progress === 100) return "✓"
        if (d.progress > 0) return "⟳"
        return "○"
      })

    // Add text labels with background
    const labels = node.append("g").attr("transform", "translate(0, 50)")

    // Add label background
    labels
      .append("rect")
      .attr("x", -60)
      .attr("y", -10)
      .attr("width", 120)
      .attr("height", 20)
      .attr("rx", 4)
      .attr("fill", "hsl(var(--background))")
      .attr("stroke", "hsl(var(--border))")
      .attr("stroke-width", 1)
      .attr("opacity", 0.9)

    // Add text
    labels
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .attr("fill", "hsl(var(--foreground))")
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .attr("font-weight", (d: any) => (d.isActive ? "bold" : "normal"))
      .text((d: any) => d.title)
      .each(function (this: SVGTextElement, d: any) {
        const text = d3.select(this)
        const textLength = (this as SVGTextElement).getComputedTextLength()

        if (textLength > 110) {
          text.text(d.title.substring(0, 15) + "...")
        }
      })

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event: any) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [projects, activeProject, setActiveProject, calculateProgress])

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>Project Dependencies</CardTitle>
        <CardDescription>
          Visualize relationships between projects. Drag nodes to rearrange and zoom to explore.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-2 bg-card/50 overflow-hidden">
          <svg ref={svgRef} width="100%" height="500" className="touch-none" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span>Not Started</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
