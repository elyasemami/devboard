// src/components/TaskCard.jsx
// RESOURCE: https://react.dev/learn/passing-props-to-a-component
//
// EXPLANATION: Props are how parent components pass data DOWN to children.
// TaskCard doesn't own the data — it displays what it receives.
// This makes it reusable — the same component renders any task object.

function TaskCard({ task, onDelete, onStatusChange }) {
  // task = { id, title, description, status, priority, createdAt }
  // onDelete = function(id) — provided by parent
  // onStatusChange = function(id, newStatus) — provided by parent

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

  const statusInfo   = statusConfig[task.status]    || statusConfig.todo
  const priorityInfo = priorityConfig[task.priority] || priorityConfig.medium

  const handleStatusChange = (e) => {
    // TODO: Call onStatusChange with the task's id and e.target.value (the new status)
  }

  const handleDelete = () => {
    // TODO: Show a confirm dialog — if user confirms, call onDelete(task.id)
    // HINT: window.confirm('Are you sure?') returns true/false
  }

  return (
    <div className={`task-card priority-border-${task.priority}`}>
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`badge ${priorityInfo.className}`}>
          {priorityInfo.label}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-card-footer">
        {/* TODO: Render a <select> dropdown for status
            - value={task.status}
            - onChange={handleStatusChange}
            - Three <option> elements: todo, in_progress, done
            RESOURCE: https://react.dev/reference/react-dom/components/select
        */}

        <button onClick={handleDelete} className="btn btn-danger btn-sm">
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
