// src/components/TaskCard.jsx
// RESOURCE: https://react.dev/learn/passing-props-to-a-component
//
// EXPLANATION: Props
// Props are how parent components pass data DOWN to child components.
// TaskCard doesn't own the data — it just displays what it receives.
// This makes it "reusable" — you can render 100 different tasks using
// the same TaskCard component with different props each time.
//
// Think of a component as a function: props are the parameters.
// TaskCard({ task, onDelete, onStatusChange }) takes those 3 parameters.

function TaskCard({ task, onDelete, onStatusChange }) {
  // task is an object: { id, title, description, status, priority, createdAt }
  // onDelete is a function the parent passes in: (id) => void
  // onStatusChange is a function: (id, newStatus) => void

  // Map status values to display labels and CSS classes
  const statusConfig = {
    todo:        { label: 'To Do',       className: 'status-todo' },
    in_progress: { label: 'In Progress', className: 'status-progress' },
    done:        { label: 'Done',        className: 'status-done' },
  }

  const priorityConfig = {
    low:    { label: 'Low',    className: 'priority-low' },
    medium: { label: 'Medium', className: 'priority-medium' },
    high:   { label: 'High',   className: 'priority-high' },
  }

  // Look up the config for this task's current status and priority
  const statusInfo   = statusConfig[task.status]   || statusConfig.todo
  const priorityInfo = priorityConfig[task.priority] || priorityConfig.medium

  const handleStatusChange = (e) => {
    // TODO: Call onStatusChange with the task's id and the new status value
    // e.target.value is the value of the selected <option>
    // HINT: onStatusChange(task.id, e.target.value)
  }

  const handleDelete = () => {
    // TODO: Ask the user to confirm before deleting
    // HINT: Use window.confirm('Are you sure?')
    // HINT: If confirmed, call onDelete(task.id)
    // This is a guard against accidental deletions — common UX pattern
    if (window.confirm(`Delete "${task.title}"?`)) {
      // TODO: Call onDelete here
    }
  }

  return (
    <div className={`task-card priority-border-${task.priority}`}>
      {/* Task header */}
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`badge ${priorityInfo.className}`}>
          {priorityInfo.label}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Footer: status selector + delete button */}
      <div className="task-card-footer">
        {/* 
          TODO: Status dropdown
          Render a <select> element with onChange={handleStatusChange}
          and value={task.status}.
          Include 3 <option> elements for: todo, in_progress, done
          HINT: A controlled <select> means value is driven by state/props
          RESOURCE: https://react.dev/reference/react-dom/components/select
        */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          className={`status-select ${statusInfo.className}`}
        >
          {/* TODO: Add the three <option> elements */}
          <option value="todo">To Do</option>
          {/* Add in_progress and done options */}
        </select>

        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </div>

      <div className="task-meta">
        <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
      </div>
    </div>
  )
}

export default TaskCard
