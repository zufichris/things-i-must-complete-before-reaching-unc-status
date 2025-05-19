"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StickyNote, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TaskNotesProps {
  projectId: string
  phaseIndex: number
  taskIndex: number
}

export default function TaskNotes({ projectId, phaseIndex, taskIndex }: TaskNotesProps) {
  const [note, setNote] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const noteKey = `note-${projectId}-${phaseIndex}-${taskIndex}`

  // Load saved note from localStorage
  useEffect(() => {
    const savedNote = localStorage.getItem(noteKey)
    if (savedNote) {
      setNote(savedNote)
    }
  }, [noteKey])

  const handleSaveNote = () => {
    localStorage.setItem(noteKey, note)
    setIsOpen(false)
  }

  const handleClearNote = () => {
    setNote("")
    localStorage.removeItem(noteKey)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className={`h-6 w-6 ${note ? "bg-yellow-100" : ""}`}>
          <StickyNote className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Task Notes</h4>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            placeholder="Add notes about this task..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px]"
          />

          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleClearNote}>
              Clear
            </Button>
            <Button size="sm" onClick={handleSaveNote}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
