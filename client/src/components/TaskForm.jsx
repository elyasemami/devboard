// src/components/TaskForm.jsx
// RESOURCE: https://react.dev/learn/reacting-to-input-with-state
//
// EXPLANATION: Controlled Components
// React controls the input value — state IS the form value.
// Every keystroke: onChange fires → setFormData updates → React re-renders input.
// This lets you easily validate, reset, and submit form data.

import { useState } from 'react'

function TaskForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
  })
  const [error, setError]         = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    // TODO: Update the matching field in formData
    // HINT: Use the spread operator and computed key syntax:
    //   setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    // [e.target.name] uses the input's "name" attribute as the object key
    // RESOURCE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names
  }

  const handleSubmit = async (e) => {
    // TODO: Prevent the default form submit (page reload)
    // HINT: e.preventDefault()

    // TODO: Validate — title must not be empty
    // HINT: if (!formData.title.trim()) { setError('Title is required'); return }

    setSubmitting(true)
    setError(null)
    try {
      // TODO: Call onSubmit(formData) and await it
      // TODO: Reset formData back to initial state on success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="task-form">
      <h2>New Task</h2>
      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional details..."
            className="form-input"
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="form-input">
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            {/* TODO: Add a <select> for priority with options: low, medium, high
                Follow the same pattern as the Status select above.
                name="priority", value={formData.priority}, onChange={handleChange}
            */}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Task'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm
