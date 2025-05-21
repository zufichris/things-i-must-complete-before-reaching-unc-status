import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AnalyticsLoading() {
  return (
    <div className="container space-y-8 py-8">
      {/* Analytics header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>

      {/* Overview stats skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardContent className="flex flex-row items-center justify-between p-6">
                <div className="space-y-1">
                  <Skeleton className="h-5 w-[120px]" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
                <Skeleton className="h-12 w-12 rounded-full" />
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Time analytics skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[150px]" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1">
              <Skeleton className="h-[300px] w-full rounded-md" />
            </div>
            <div className="flex-1 space-y-4">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-[150px]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project comparison skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[180px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-[100px]" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-[80px]" />
                <Skeleton className="h-5 w-[80px]" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-5 gap-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="mt-4 grid grid-cols-5 gap-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
