"use client"

import type React from "react"

import { useState } from "react"
import { createNote } from "@/app/actions"
import type { Note } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface NoteFormProps {
  roadmapId: string
  onNoteAdded: (note: Note) => void
}

export function NoteForm({ roadmapId, onNoteAdded }: NoteFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Note content cannot be empty.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)
      const newNote = await createNote(roadmapId, content)
      onNoteAdded(newNote)
      setContent("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your note here..."
            className="min-h-[100px]"
            disabled={isSubmitting}
          />
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800 pt-2">
          <Button type="submit" disabled={isSubmitting || !content.trim()}>
            {isSubmitting ? "Saving..." : "Save Note"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
