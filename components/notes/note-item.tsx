"use client"

import { useState } from "react"
import type { Note } from "@/types"
import { updateNote, deleteNote } from "@/app/actions"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Save, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface NoteItemProps {
  note: Note
  roadmapId: string
  onNoteUpdated: (note: Note) => void
  onNoteDeleted: (noteId: number) => void
}

export function NoteItem({ note, roadmapId, onNoteUpdated, onNoteDeleted }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(note.content)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleUpdate = async () => {
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
      const updatedNote = await updateNote(note.id, content)
      onNoteUpdated(updatedNote)
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this note?")) {
      return
    }

    try {
      setIsSubmitting(true)
      await deleteNote(note.id, roadmapId)
      onNoteDeleted(note.id)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "Unknown date"
    }
  }

  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <CardContent className="pt-4">
        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
            placeholder="Enter note content..."
            disabled={isSubmitting}
          />
        ) : (
          <div className="whitespace-pre-wrap">{note.content}</div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-100 dark:border-gray-800 pt-2 text-xs text-muted-foreground">
        <div>
          {note.updated_at !== note.created_at
            ? `Updated ${formatDate(note.updated_at)}`
            : `Created ${formatDate(note.created_at)}`}
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setContent(note.content)
                  setIsEditing(false)
                }}
                disabled={isSubmitting}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleUpdate} disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} disabled={isSubmitting}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isSubmitting}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
