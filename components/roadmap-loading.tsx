export default function RoadmapLoading() {
  return (
    <div className="w-full p-8 text-center">
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto"></div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-2">
              {[...Array(5)].map((_, j) => (
                <div key={j} className="h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
