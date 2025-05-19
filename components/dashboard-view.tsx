"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart2,
  PieChartIcon,
  LineChart,
} from "lucide-react";

interface DashboardProps {
  projects: any[];
  completedTasks: Record<string, string[]>;
  calculateProgress: (projectId: string) => number;
}

export default function DashboardView({
  projects,
  completedTasks,
  calculateProgress,
}: DashboardProps) {
  const [view, setView] = useState<"categories" | "projects" | "timeline">(
    "categories",
  );

  // Calculate category progress
  const categoryProgress = projects.reduce(
    (acc, project) => {
      const category = project.category || "Uncategorized";
      if (!acc[category]) {
        acc[category] = {
          totalProjects: 0,
          completedProjects: 0,
          totalTasks: 0,
          completedTasks: 0,
        };
      }

      const progress = calculateProgress(project.id);
      const projectTasks = project.phases.reduce(
        (sum: number, phase: any) => sum + phase.tasks.length,
        0,
      );
      const completedProjectTasks = completedTasks[project.id]?.length || 0;

      acc[category].totalProjects += 1;
      acc[category].completedProjects += progress === 100 ? 1 : 0;
      acc[category].totalTasks += projectTasks;
      acc[category].completedTasks += completedProjectTasks;

      return acc;
    },
    {} as Record<
      string,
      {
        totalProjects: number;
        completedProjects: number;
        totalTasks: number;
        completedTasks: number;
      }
    >,
  );

  // Prepare data for charts
  const categoryChartData = Object.entries(categoryProgress).map(
    ([name, data]) => ({
      name,
      value:
        data.totalTasks > 0
          ? Math.round((data.completedTasks / data.totalTasks) * 100)
          : 0,
      totalProjects: data.totalProjects,
      completedProjects: data.completedProjects,
      totalTasks: data.totalTasks,
      completedTasks: data.completedTasks,
    }),
  );

  const projectChartData = projects
    .map((project) => ({
      name: project.title,
      value: Math.round(calculateProgress(project.id)),
      category: project.category,
    }))
    .sort((a, b) => b.value - a.value);

  // Timeline data - simulated based on project phases
  const timelineData = projects
    .flatMap((project) => {
      return project.phases.map((phase: any, index: number) => {
        const phaseId = `${project.id}-phase-${index}`;
        const phaseTasks = phase.tasks.length;
        const completedPhaseTasks =
          completedTasks[project.id]?.filter((taskId) =>
            taskId.startsWith(`${index}-`),
          ).length || 0;

        return {
          name: `${project.title} - ${phase.title}`,
          completed: completedPhaseTasks,
          remaining: phaseTasks - completedPhaseTasks,
          project: project.title,
          phase: phase.title,
        };
      });
    })
    .slice(0, 15); // Limit to 15 phases for readability

  // Calculate overall progress
  const totalTasks = projects.reduce(
    (sum, project) =>
      sum +
      project.phases.reduce(
        (phaseSum: number, phase: any) => phaseSum + phase.tasks.length,
        0,
      ),
    0,
  );

  const totalCompletedTasks = Object.values(completedTasks).reduce(
    (sum, projectTasks) => sum + projectTasks.length,
    0,
  );

  const overallProgress =
    totalTasks > 0 ? Math.round((totalCompletedTasks / totalTasks) * 100) : 0;

  // Calculate project status counts
  const projectStatuses = projects.reduce(
    (acc, project) => {
      const progress = calculateProgress(project.id);
      if (progress === 0) acc.notStarted++;
      else if (progress < 100) acc.inProgress++;
      else acc.completed++;
      return acc;
    },
    { notStarted: 0, inProgress: 0, completed: 0 },
  );

  // Colors for charts
  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--chart-6))",
    "hsl(var(--chart-7))",
    "hsl(var(--chart-8))",
  ];

  return (
    <div className="space-y-6 animate-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-1">
              <span className="text-sm">
                {totalCompletedTasks} / {totalTasks} tasks
              </span>
              <span className="text-sm font-medium">{overallProgress}%</span>
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Project Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center">
                <AlertCircle className="h-5 w-5 text-muted-foreground mb-1" />
                <div className="text-2xl font-bold">
                  {projectStatuses.notStarted}
                </div>
                <div className="text-xs text-muted-foreground">Not Started</div>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-5 w-5 text-warning mb-1" />
                <div className="text-2xl font-bold">
                  {projectStatuses.inProgress}
                </div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle className="h-5 w-5 text-success mb-1" />
                <div className="text-2xl font-bold">
                  {projectStatuses.completed}
                </div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-4xl font-bold">{projects.length}</div>
              <div className="ml-4 text-sm text-muted-foreground">
                <div>
                  Across {Object.keys(categoryProgress).length} categories
                </div>
                <div className="mt-1">
                  {Math.round(
                    (projectStatuses.completed / projects.length) * 100,
                  )}
                  % completion rate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Task Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-4xl font-bold">{totalCompletedTasks}</div>
              <div className="ml-4 text-sm text-muted-foreground">
                <div>Out of {totalTasks} total tasks</div>
                <div className="mt-1">
                  {Math.round((totalCompletedTasks / totalTasks) * 100)}%
                  completion rate
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Progress Breakdown</CardTitle>
          <Tabs value={view} onValueChange={(value) => setView(value as any)}>
            <TabsList>
              <TabsTrigger
                value="categories"
                className="flex items-center gap-1"
              >
                <PieChartIcon className="h-4 w-4" />
                By Category
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-1">
                <BarChart2 className="h-4 w-4" />
                By Project
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-1">
                <LineChart className="h-4 w-4" />
                Timeline
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="categories" className="mt-0">
            <div className="h-80">
              <ChartContainer
                config={{
                  value: {
                    label: "Progress",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-6 space-y-4">
              {categoryChartData.map((category, index) => (
                <div
                  key={category.name}
                  className="bg-card border rounded-lg p-3"
                >
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm">{category.value}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="progress-bar-container">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${category.value}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {category.completedProjects}/{category.totalProjects}{" "}
                      projects
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <div className="h-80">
              <ChartContainer
                config={{
                  value: {
                    label: "Progress",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectChartData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip formatter={(value) => [`${value}%`, "Progress"]} />
                    <Bar dataKey="value" fill="#8884d8">
                      {projectChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-0">
            <div className="h-80">
              <ChartContainer
                config={{
                  completed: {
                    label: "Completed",
                    color: "hsl(var(--chart-2))",
                  },
                  remaining: {
                    label: "Remaining",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timelineData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Bar
                      dataKey="completed"
                      stackId="a"
                      fill="hsl(var(--chart-2))"
                    />
                    <Bar
                      dataKey="remaining"
                      stackId="a"
                      fill="hsl(var(--chart-3))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
}
