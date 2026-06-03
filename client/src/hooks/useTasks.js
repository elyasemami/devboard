// src/hooks/useTasks.js
// RESOURCE: https://react.dev/learn/reusing-logic-with-custom-hooks
//
// EXPLANATION: A custom hook is a function starting with "use" that can call
// other hooks. It extracts logic OUT of components so they stay clean.
// Tasks.jsx renders UI. useTasks manages all data operations.
// This is "Separation of Concerns" — a pattern interviewers ask about directly.

import { useState, useEffect, useCallback } from 'react'
import { tasksAPI } from '../services/api'

export function useTasks() {
  const [tasks, setTasks]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // ── FETCH ALL ────────────────────────────────────────────────────────────
  // useCallback prevents this function from being recreated on every render
  // RESOURCE: https://react.dev/reference/react/useCallback
  const fetchTasks = useCallback(async () => {
    // TODO: Fetch all tasks from the API and update state
    // Pattern to follow:
    //   setLoading(true)
    //   setError(null)
    //   try {
    //     const response = await tasksAPI.getAll()
    //     setTasks(response.data.tasks)
    //   } catch (err) {
    //     setError(err.response?.data?.message || 'Failed to fetch tasks')
    //   } finally {
    //     setLoading(false)
    //   }

  }, [])

  // Run fetchTasks once when the hook is first used
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // ── CREATE ───────────────────────────────────────────────────────────────
  const createTask = async (taskData) => {
    // TODO: Call tasksAPI.create(taskData), then add the new task to state
    // HINT: setTasks(prev => [...prev, response.data.task])
    // The spread [...prev] copies existing tasks, then appends the new one
    // Throw the error so TaskForm can catch and display it
  }

  // ── UPDATE ───────────────────────────────────────────────────────────────
  const updateTask = async (id, taskData) => {
    // TODO: Call tasksAPI.update(id, taskData), then replace the old task in state
    // HINT: setTasks(prev => prev.map(t => t.id === id ? response.data.task : t))
    // .map() returns a NEW array — never mutate state directly
  }

  // ── DELETE ───────────────────────────────────────────────────────────────
  const deleteTask = async (id) => {
    // TODO: Call tasksAPI.delete(id), then remove the task from state
    // HINT: setTasks(prev => prev.filter(t => t.id !== id))
    // .filter() returns a new array excluding the deleted item
  }

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }
}
