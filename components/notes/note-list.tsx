"use client"

import { useState, useEffect } from "react"
import { getNotesByRoadmapId } from "@/app/actions"
import type { Note } from "@/types"
import { NoteItem } from "./note-item"
import { NoteForm } from "./note-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NoteListProps {
  roadmapId: string
}

export function NoteList({ roadmapId }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const fetchNotes = async () => {
    try {
      setLoading(true)
      const fetchedNotes = await getNotesByRoadmapId(roadmapId)
      setNotes(fetchedNotes)
      setError(null)
    } catch (err) {
      setError("Failed to load notes. Please try again.")
      toast({
        title: "Error",
        description: "Failed to load notes. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [roadmapId])

  const handleNoteAdded = (newNote: Note) => {
    setNotes([newNote, ...notes])
    setShowForm(false)
    toast({
      title: "Note Added",
      description: "Your note has been added successfully.",
    })
  }

  const handleNoteUpdated = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    toast({
      title: "Note Updated",
      description: "Your note has been updated successfully.",
    })
  }

  const handleNoteDeleted = (noteId: number) => {
    setNotes(notes.filter((note) => note.id !== noteId))
    toast({
      title: "Note Deleted",
      description: "Your note has been deleted successfully.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Notes</CardTitle>
          <CardDescription>Keep track of important information and updates</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchNotes} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Add Note"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showForm && <NoteForm roadmapId={roadmapId} onNoteAdded={handleNoteAdded} />}

        {loading && !notes.length ? (
          <div className="py-8 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2.5"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">{error}</div>
        ) : notes.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            No notes yet. Click "Add Note" to create your first note.
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                roadmapId={roadmapId}
                onNoteUpdated={handleNoteUpdated}
                onNoteDeleted={handleNoteDeleted}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
