import { Suspense } from "react"
import RoadmapTracker from "@/components/roadmap-tracker"
import RoadmapLoading from "@/components/roadmap-loading"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <Suspense fallback={<RoadmapLoading />}>
          <RoadmapTracker />
        </Suspense>
      </div>
    </main>
  )
}
