// src/pages/Tasks.jsx
// RESOURCE: https://react.dev/learn/thinking-in-react
//
// EXPLANATION: Pages vs Components
// This is a PAGE — it's rendered when the URL is '/tasks'.
// Pages are where you COMPOSE components together and connect data to UI.
// Tasks.jsx: uses the useTasks hook → passes data to TaskCard/TaskForm components.
//
// Data flow in React always goes DOWN: parent → child via props.
// Events flow UP: child calls a function the parent provided.

import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

function Tasks() {
  // useTasks hook gives us everything we need — data + CRUD functions
  // This is the payoff of building that custom hook!
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks()

  // Local UI state — only this component needs to know if the form is open
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all') // 'all' | 'todo' | 'in_progress' | 'done'

  // ── DERIVED STATE: filtered tasks ─────────────────────────────────────────
  // Don't create a separate "filteredTasks" state — derive it from existing state.
  // This prevents them from getting out of sync.
  // RESOURCE: https://react.dev/learn/choosing-the-state-structure
  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(task => task.status === filter)

  // ── HANDLERS ──────────────────────────────────────────────────────────────
  const handleCreate = async (taskData) => {
    // TODO: Call createTask from the hook, then close the form
    // HINT: await createTask(taskData)
    // HINT: setShowForm(false)
    // Let any error bubble up to TaskForm's catch block (it handles display)
    await createTask(taskData)
    setShowForm(false)
  }

  const handleStatusChange = async (id, newStatus) => {
    // TODO: Call updateTask to change just the status
    // HINT: updateTask(id, { status: newStatus })
    // This only sends the status field — the server merges it with existing data
  }

  const handleDelete = async (id) => {
    // TODO: Call deleteTask
    // HINT: deleteTask(id)
  }

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="page tasks-page">
      <div className="page-header">
        <h1>My Tasks</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {/* Inline form — shows/hides based on showForm state */}
      {showForm && (
        <TaskForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Filter buttons */}
      <div className="filter-bar">
        {['all', 'todo', 'in_progress', 'done'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Content states: loading / error / empty / list */}
      {loading && <div className="loading-state">Loading tasks...</div>}
      {error   && <div className="alert alert-error">{error}</div>}

      {!loading && !error && filteredTasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet. Create your first one!</p>
        </div>
      )}

      {/* 
        TODO: Render the task list
        Map over filteredTasks and render a <TaskCard> for each one.
        
        HINT:
        {!loading && filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
        
        IMPORTANT: The "key" prop is required when rendering lists.
        React uses it to efficiently track which items changed.
        RESOURCE: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key
      */}

      <div className="tasks-grid">
        {/* TODO: Add the .map() render here */}
      </div>
    </div>
  )
}

export default Tasks
