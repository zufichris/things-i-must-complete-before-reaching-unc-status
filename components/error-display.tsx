import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

interface ErrorDisplayProps {
  title: string
  message: string
  actionText?: string
  actionHref?: string
}

export function ErrorDisplay({ title, message, actionText, actionHref }: ErrorDisplayProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/20">
          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="mb-2 text-2xl font-bold">{title}</h3>
        <p className="mb-6 text-muted-foreground">{message}</p>
        {actionText && actionHref && (
          <Button asChild>
            <Link href={actionHref}>{actionText}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
