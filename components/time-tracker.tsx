"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Play, Pause, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface TimeTrackerProps {
  projectId: string
  phaseIndex: number
  taskIndex: number
  taskText: string
  onTimeUpdate: (time: number) => void
  initialTime?: number
}

export default function TimeTracker({
  projectId,
  phaseIndex,
  taskIndex,
  taskText,
  onTimeUpdate,
  initialTime = 0,
}: TimeTrackerProps) {
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(initialTime)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [manualTime, setManualTime] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Load saved time from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem(`time-${projectId}-${phaseIndex}-${taskIndex}`)
    if (savedTime) {
      setElapsedTime(Number.parseInt(savedTime, 10))
    }
  }, [projectId, phaseIndex, taskIndex])

  // Handle timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTracking && startTime) {
      interval = setInterval(() => {
        const now = Date.now()
        const newElapsedTime = elapsedTime + (now - startTime)
        setElapsedTime(newElapsedTime)
        setStartTime(now)

        // Save to localStorage every 5 seconds
        if (now % 5000 < 100) {
          localStorage.setItem(`time-${projectId}-${phaseIndex}-${taskIndex}`, newElapsedTime.toString())
          onTimeUpdate(newElapsedTime)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, startTime, elapsedTime, projectId, phaseIndex, taskIndex, onTimeUpdate])

  // Format time as HH:MM:SS
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000) % 60
    const minutes = Math.floor(ms / (1000 * 60)) % 60
    const hours = Math.floor(ms / (1000 * 60 * 60))

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  // Parse manual time input (HH:MM:SS)
  const parseManualTime = (timeString: string) => {
    const parts = timeString.split(":")
    if (parts.length !== 3) return null

    try {
      const hours = Number.parseInt(parts[0], 10)
      const minutes = Number.parseInt(parts[1], 10)
      const seconds = Number.parseInt(parts[2], 10)

      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return null
      if (minutes >= 60 || seconds >= 60) return null

      return (hours * 60 * 60 + minutes * 60 + seconds) * 1000
    } catch (e) {
      return null
    }
  }

  const handleStartStop = () => {
    if (isTracking) {
      // Stop tracking
      setIsTracking(false)
      localStorage.setItem(`time-${projectId}-${phaseIndex}-${taskIndex}`, elapsedTime.toString())
      onTimeUpdate(elapsedTime)
    } else {
      // Start tracking
      setIsTracking(true)
      setStartTime(Date.now())
    }
  }

  const handleManualSave = () => {
    const parsedTime = parseManualTime(manualTime)
    if (parsedTime !== null) {
      setElapsedTime(parsedTime)
      localStorage.setItem(`time-${projectId}-${phaseIndex}-${taskIndex}`, parsedTime.toString())
      onTimeUpdate(parsedTime)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">{formatTime(elapsedTime)}</span>

      <Button variant="outline" size="icon" className="h-6 w-6" onClick={handleStartStop}>
        {isTracking ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="h-6 w-6">
            <Clock className="h-3 w-3" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Time</DialogTitle>
            <DialogDescription>
              Manually set the time spent on this task.
              <div className="mt-2 text-sm font-medium">{taskText}</div>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="time">Time (HH:MM:SS)</Label>
              <Input
                id="time"
                placeholder="00:00:00"
                value={manualTime}
                onChange={(e) => setManualTime(e.target.value)}
                defaultValue={formatTime(elapsedTime)}
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Current tracked time: {formatTime(elapsedTime)}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleManualSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
