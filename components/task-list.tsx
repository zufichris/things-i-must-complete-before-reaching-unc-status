"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import type { Task } from "@/types"
import { toggleTaskCompletion } from "@/app/actions"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

export function TaskList({
  tasks: initialTasks,
  phaseId,
  roadmapId,
  isLocked,
}: {
  tasks: Task[]
  phaseId: number
  roadmapId: string
  isLocked: boolean
}) {
  // Keep a local copy of tasks that we can update optimistically
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [pendingTaskIds, setPendingTaskIds] = useState<Set<number>>(new Set())
  const { toast } = useToast()

  const handleToggleTask = async (taskId: number, isCompleted: boolean) => {
    if (isLocked) return

    // Find the task index
    const taskIndex = tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1) return

    // Update the local state immediately (optimistic update)
    const updatedTasks = [...tasks]
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      is_completed: isCompleted,
    }
    setTasks(updatedTasks)

    // Mark this task as pending
    setPendingTaskIds((prev) => {
      const newSet = new Set(prev)
      newSet.add(taskId)
      return newSet
    })

    try {
      // Update the database in the background
      await toggleTaskCompletion(taskId, isCompleted)
    } catch (error) {
      // If the database update fails, revert the optimistic update
      const revertedTasks = [...tasks]
      revertedTasks[taskIndex] = {
        ...revertedTasks[taskIndex],
        is_completed: !isCompleted,
      }
      setTasks(revertedTasks)

      // Show an error toast
      toast({
        title: "Failed to update task",
        description: "There was an error updating the task. Please try again.",
        variant: "destructive",
      })
    } finally {
      // Remove this task from pending state
      setPendingTaskIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(taskId)
        return newSet
      })
    }
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          className={`task-item flex items-start space-x-3 rounded-md border p-3 ${isLocked ? "opacity-60" : ""}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: isLocked ? 1 : 1.01 }}
        >
          <Checkbox
            id={task.id.toString()}
            checked={task.is_completed}
            disabled={pendingTaskIds.has(task.id) || isLocked}
            onCheckedChange={(checked) => {
              handleToggleTask(task.id, checked as boolean)
            }}
            className="mt-0.5"
          />
          <label
            htmlFor={task.id.toString()}
            className={`flex-1 cursor-pointer text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              task.is_completed ? "text-muted-foreground line-through" : ""
            }`}
          >
            {task.description}
          </label>
        </motion.div>
      ))}
    </div>
  )
}
