import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RoadmapLoading() {
  return (
    <div className="container space-y-8 py-8">
      {/* Roadmap header skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[350px]" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-[100px]" />
        </div>

        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-5/6" />

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-5 w-[80px]" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
        </div>
      </div>

      {/* Tabs skeleton */}
      <Tabs defaultValue="phases">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="phases" className="relative">
            <Skeleton className="h-5 w-[80px]" />
          </TabsTrigger>
          <TabsTrigger value="activity" disabled>
            <Skeleton className="h-5 w-[80px]" />
          </TabsTrigger>
          <TabsTrigger value="team" disabled>
            <Skeleton className="h-5 w-[80px]" />
          </TabsTrigger>
          <TabsTrigger value="files" disabled>
            <Skeleton className="h-5 w-[80px]" />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Phases skeleton */}
      <div className="space-y-6">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-5 w-[100px]" />
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[60px]" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="mt-2 h-5 w-5/6" />

                <div className="mt-6 space-y-3">
                  {Array(4)
                    .fill(null)
                    .map((_, j) => (
                      <div key={j} className="flex items-start space-x-3 rounded-md border p-4">
                        <Skeleton className="h-5 w-5 rounded" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-[250px]" />
                          <Skeleton className="h-4 w-full" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-[80px]" />
                            <Skeleton className="h-4 w-[80px]" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 px-6 py-3">
                <div className="flex w-full items-center justify-between">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
