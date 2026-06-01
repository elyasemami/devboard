// src/components/TaskForm.jsx
// RESOURCE: https://react.dev/learn/reacting-to-input-with-state
//
// EXPLANATION: Controlled Components / Controlled Forms
// In HTML, form inputs manage their own state internally.
// In React, we take CONTROL of the input — React's state IS the form value.
//
// For every input:
//   1. value={formData.fieldName}   ← React controls what's shown
//   2. onChange={(e) => setFormData(...)}  ← React updates on every keystroke
//
// This makes it easy to validate, reset, and submit forms.
// "Uncontrolled" forms (using refs instead) exist too but are less common.

import { useState } from 'react'

// onSubmit is a function passed in by the parent (Tasks.jsx)
// The parent decides what to DO with the form data
// TaskForm just captures and validates the input
function TaskForm({ onSubmit, onCancel }) {
  // A single state object holds all form field values
  // This is cleaner than one useState per field
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
  })

  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Generic change handler — works for ALL input fields
  // e.target.name matches the "name" attribute on each input
  // e.target.value is what the user typed/selected
  const handleChange = (e) => {
    // TODO: Update formData state for the changed field
    // HINT: Use the spread operator to copy existing fields,
    //       then override just the changed one:
    //   setFormData(prev => ({
    //     ...prev,                        ← keep all existing fields
    //     [e.target.name]: e.target.value ← update just this one (computed key)
    //   }))
    // The [e.target.name] syntax is a "computed property key" — JavaScript lets
    // you use a variable as an object key with bracket notation.
  }

  const handleSubmit = async (e) => {
    // TODO: Prevent the default form submit (which would reload the page)
    // HINT: e.preventDefault()
    // RESOURCE: https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

    // TODO: Validate — title is required
    // HINT: if (!formData.title.trim()) { setError('Title is required'); return; }

    setSubmitting(true)
    setError(null)

    try {
      // TODO: Call onSubmit(formData) and await it
      // onSubmit is the parent's createTask function
      // If it throws, the catch block will handle it
      
      // TODO: After successful submit, reset the form:
      // setFormData({ title: '', description: '', status: 'todo', priority: 'medium' })
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="task-form">
      <h2>New Task</h2>

      {/* Show error message if one exists */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* 
        EXPLANATION: onSubmit on the <form> fires when:
        - User clicks a <button type="submit">
        - User presses Enter inside a text input
        We call e.preventDefault() inside handleSubmit to prevent browser reload.
      */}
      <form onSubmit={handleSubmit}>
        {/* Title field */}
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"       {/* ← matches handleChange's e.target.name */}
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className="form-input"
          />
        </div>

        {/* Description field */}
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

        {/* Status and Priority — side by side */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-input"
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            {/* 
              TODO: Add the Priority <select> with options: low, medium, high
              Copy the pattern from the Status select above.
              name="priority" value={formData.priority} onChange={handleChange}
            */}
          </div>
        </div>

        {/* Action buttons */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Task'}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default TaskForm
