// src/hooks/useTasks.js
// RESOURCE: https://react.dev/learn/reusing-logic-with-custom-hooks
//
// EXPLANATION: Custom Hooks
// A custom hook is just a JavaScript function that:
//   1. Starts with the word "use" (React convention)
//   2. Can call other hooks (useState, useEffect, etc.)
//
// Why extract logic into a hook?
// Tasks.jsx would get very long if it also contained all the fetch logic,
// loading state, error state, and CRUD operations.
// By moving that into useTasks(), the component stays focused on rendering UI,
// while the hook handles all data management.
//
// This pattern is called "Separation of Concerns" — very common in job interviews!

import { useState, useEffect, useCallback } from 'react'
import { tasksAPI } from '../services/api'

// This hook returns everything a component needs to work with tasks:
// the task data, loading/error states, and functions to modify tasks
export function useTasks() {
  // ── STATE ──────────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState([])       // Array of task objects
  const [loading, setLoading] = useState(true)  // True while fetching
  const [error, setError] = useState(null)      // Error message string or null

  // ── FETCH ALL TASKS ────────────────────────────────────────────────────────
  // useCallback memoizes this function so it doesn't get recreated on every render.
  // This matters because we'll put fetchTasks in useEffect's dependency array.
  // RESOURCE: https://react.dev/reference/react/useCallback
  const fetchTasks = useCallback(async () => {
    // TODO: Implement the fetch logic
    // Pattern:
    //   1. setLoading(true)           ← tell UI we're loading
    //   2. setError(null)             ← clear any previous errors
    //   3. try {
    //        const response = await tasksAPI.getAll()
    //        setTasks(response.data.tasks)  ← update state with fetched data
    //      } catch (err) {
    //        setError(err.response?.data?.message || 'Failed to fetch tasks')
    //      } finally {
    //        setLoading(false)         ← always stop the loading spinner
    //      }
    // HINT: async/await is just cleaner syntax for Promises
    // RESOURCE: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
    
    setLoading(true)
    setError(null)
    try {
      // TODO: Call tasksAPI.getAll() and update tasks state
    } catch (err) {
      // TODO: Set the error state
    } finally {
      setLoading(false)
    }
  }, [])

  // ── AUTO-FETCH ON MOUNT ────────────────────────────────────────────────────
  // useEffect with [fetchTasks] dependency runs:
  //   1. Once when the component first mounts (renders)
  //   2. Again if fetchTasks ever changes (it won't, due to useCallback)
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // ── CREATE TASK ────────────────────────────────────────────────────────────
  const createTask = async (taskData) => {
    // TODO: Implement create
    // 1. Call tasksAPI.create(taskData) and await it
    // 2. The server returns the new task in response.data.task
    // 3. Add it to the tasks array: setTasks(prev => [...prev, newTask])
    //    The spread operator [...prev] copies the existing array, then adds the new item
    // 4. Return the new task (so the form component knows it succeeded)
    // 5. Wrap in try/catch, throw the error so the form can show it
    // HINT: setTasks(prev => [...prev, newTask])  ← functional update pattern
  }

  // ── UPDATE TASK ────────────────────────────────────────────────────────────
  const updateTask = async (id, taskData) => {
    // TODO: Implement update
    // 1. Call tasksAPI.update(id, taskData)
    // 2. The server returns the updated task in response.data.task
    // 3. Replace the old task in state:
    //    setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
    //    .map() returns a new array — never mutate state directly!
    // HINT: The .map() pattern for updates is an interview classic
  }

  // ── DELETE TASK ────────────────────────────────────────────────────────────
  const deleteTask = async (id) => {
    // TODO: Implement delete
    // 1. Call tasksAPI.delete(id)
    // 2. Remove the task from state:
    //    setTasks(prev => prev.filter(t => t.id !== id))
    //    .filter() returns a new array excluding the deleted item
  }

  // Return everything the component needs
  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  }
}
