import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your roadmap application data</p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to App</Button>
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
