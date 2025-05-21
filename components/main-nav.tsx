"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { BarChart3, BookOpen, Home, ListTodo } from "lucide-react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Home className="mr-2 h-4 w-4" />
        Home
      </Link>
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <ListTodo className="mr-2 h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/analytics"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/analytics" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <BarChart3 className="mr-2 h-4 w-4" />
        Analytics
      </Link>
      <Link
        href="/resources"
        className={cn(
          "flex items-center text-sm font-medium transition-colors hover:text-primary",
          pathname === "/resources" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Resources
      </Link>
    </nav>
  )
}
