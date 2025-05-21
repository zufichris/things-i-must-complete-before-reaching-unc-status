"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertTriangle, Loader2, Database } from "lucide-react"

export function SeedForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null)

  const handleSeed = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/seed")
      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: data.message })
      } else {
        setResult({ success: false, error: data.error || "An error occurred while seeding the database" })
      }
    } catch (error) {
      setResult({ success: false, error: "Failed to connect to the server" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <CardTitle>Seed Database</CardTitle>
        </div>
        <CardDescription>
          This will populate the database with sample roadmap data including VoteSphere, ChainForge, and WorldCraft
          projects.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert
          variant="warning"
          className="border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-600"
        >
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-semibold">Warning</AlertTitle>
          <AlertDescription>
            This action will reset any existing data in the database. Make sure you want to proceed before continuing.
          </AlertDescription>
        </Alert>

        {result && (
          <Alert variant={result.success ? "default" : "destructive"}>
            {result.success ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
            <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{result.message || result.error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t bg-muted/50 px-6 py-4">
        <Button onClick={handleSeed} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Seeding Database...
            </>
          ) : (
            "Seed Database"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
