// server/models/taskModel.js
//
// EXPLANATION: Task data model with in-memory CRUD operations.
// Each function maps directly to a future database query:
//   findAll  → SELECT * FROM tasks WHERE userId = ?
//   findById → SELECT * FROM tasks WHERE id = ? AND userId = ?
//   create   → INSERT INTO tasks ...
//   update   → UPDATE tasks SET ... WHERE id = ?
//   delete   → DELETE FROM tasks WHERE id = ?

let tasks = [
  {
    id: '101', userId: '1',
    title: 'Set up the project',
    description: 'Clone the repo, install dependencies, run the dev servers',
    status: 'done', priority: 'high',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '102', userId: '1',
    title: 'Complete the TODO items',
    description: 'Work through each file and fill in the missing code',
    status: 'in_progress', priority: 'high',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '103', userId: '1',
    title: 'Test with Postman',
    description: 'Verify all API endpoints before connecting the frontend',
    status: 'todo', priority: 'medium',
    createdAt: new Date().toISOString(),
  },
]

const TaskModel = {
  findAll: (userId) => {
    // TODO: Return all tasks belonging to userId, newest first
    // HINT: tasks.filter(t => t.userId === userId)
    //             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  findById: (id, userId) => {
    // TODO: Return the task matching both id AND userId
    // The userId check prevents users from accessing each other's tasks
    // HINT: tasks.find(t => t.id === id && t.userId === userId)
  },

  create: ({ userId, title, description, status = 'todo', priority = 'medium' }) => {
    // TODO: Step 1 — Validate title is present
    // HINT: if (!title?.trim()) throw new Error('Title is required')

    // TODO: Step 2 — Build the new task object with a unique id
    // HINT: { id: Date.now().toString(), userId, title: title.trim(), description: description?.trim() || '', status, priority, createdAt: new Date().toISOString() }

    // TODO: Step 3 — Push to tasks array and return the new task
  },

  update: (id, userId, updates) => {
    // TODO: Step 1 — Find the existing task (use findById for security)
    // HINT: const task = TaskModel.findById(id, userId)
    // HINT: if (!task) return null

    // TODO: Step 2 — Only update allowed fields (never let users change userId)
    // HINT: const allowedFields = ['title', 'description', 'status', 'priority']
    //       allowedFields.forEach(field => {
    //         if (updates[field] !== undefined) task[field] = updates[field]
    //       })

    // TODO: Step 3 — Set updatedAt and return the modified task
    // HINT: task.updatedAt = new Date().toISOString()
  },

  delete: (id, userId) => {
    // TODO: Find the index, splice it out, return true/false
    // HINT: const index = tasks.findIndex(t => t.id === id && t.userId === userId)
    // HINT: if (index === -1) return false
    // HINT: tasks.splice(index, 1); return true
  },
}

module.exports = TaskModel
