// src/pages/Tasks.jsx
// RESOURCE: https://react.dev/learn/thinking-in-react
//
// EXPLANATION: Pages COMPOSE components + connect data to UI.
// Data flows DOWN via props. Events flow UP via callback functions.

import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

function Tasks() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks()
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter]     = useState('all')

  // Derived state — compute filtered list from existing state, don't duplicate it
  // RESOURCE: https://react.dev/learn/choosing-the-state-structure#avoid-redundant-state
  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter(task => task.status === filter)

  const handleCreate = async (taskData) => {
    // TODO: Call createTask(taskData), then close the form with setShowForm(false)
  }

  const handleStatusChange = async (id, newStatus) => {
    // TODO: Call updateTask(id, { status: newStatus })
  }

  const handleDelete = async (id) => {
    // TODO: Call deleteTask(id)
  }

  return (
    <div className="page tasks-page">
      <div className="page-header">
        <h1>My Tasks</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {showForm && <TaskForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}

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

      {loading && <div className="loading-state">Loading tasks...</div>}
      {error   && <div className="alert alert-error">{error}</div>}

      {!loading && !error && filteredTasks.length === 0 && (
        <div className="empty-state"><p>No tasks yet. Create your first one!</p></div>
      )}

      <div className="tasks-grid">
        {/* TODO: Map over filteredTasks and render a <TaskCard> for each one
            Each TaskCard needs: key, task, onDelete, onStatusChange props
            HINT:
            {!loading && filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
            IMPORTANT: "key" is required when rendering lists — React uses it to
            track which items changed efficiently.
            RESOURCE: https://react.dev/learn/rendering-lists
        */}
      </div>
    </div>
  )
}

export default Tasks
