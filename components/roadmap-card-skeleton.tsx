import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RoadmapCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="mt-2 h-6 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-5/6" />
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-2 w-full" />
        </div>
      </CardFooter>
    </Card>
  )
}
