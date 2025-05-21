import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p className="mb-4">Could not find the requested resource</p>
      <Link href="/" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
        Return Home
      </Link>
    </div>
  )
}
