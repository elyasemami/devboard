// server/models/taskModel.js
//
// EXPLANATION: Task data model
// Defines the shape of a task and CRUD operations on the data store.
// Each function maps to a database operation:
//   findAll      → SELECT * FROM tasks WHERE userId = ?
//   findById     → SELECT * FROM tasks WHERE id = ? AND userId = ?
//   create       → INSERT INTO tasks ...
//   update       → UPDATE tasks SET ... WHERE id = ?
//   delete       → DELETE FROM tasks WHERE id = ?

// In-memory store — an array of task objects
// Seeded with sample tasks for the demo user (userId: '1')
let tasks = [
  {
    id: '101',
    userId: '1',
    title: 'Set up the project',
    description: 'Clone the repo, install dependencies, run the dev servers',
    status: 'done',
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    id: '102',
    userId: '1',
    title: 'Complete the TODO items',
    description: 'Work through each file and fill in the missing code',
    status: 'in_progress',
    priority: 'high',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '103',
    userId: '1',
    title: 'Test with Postman',
    description: 'Verify all API endpoints work before connecting the frontend',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
]

const TaskModel = {
  // Get all tasks belonging to a user
  findAll: (userId) => {
    // TODO: Filter tasks array to only return tasks where task.userId === userId
    // HINT: tasks.filter(t => t.userId === userId)
    // Return newest first: .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return tasks
      .filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  // Get a single task — must also verify it belongs to the requesting user
  findById: (id, userId) => {
    // TODO: Find the task by id AND userId (security check!)
    // HINT: tasks.find(t => t.id === id && t.userId === userId)
    // The userId check prevents users from accessing each other's tasks
    return tasks.find(t => t.id === id && t.userId === userId)
  },

  // Create a new task
  create: ({ userId, title, description, status = 'todo', priority = 'medium' }) => {
    // TODO: Validate that title is provided
    // HINT: if (!title?.trim()) throw new Error('Title is required')

    const newTask = {
      id: Date.now().toString(),
      userId,
      title: title.trim(),
      description: description?.trim() || '',
      status,    // 'todo' | 'in_progress' | 'done'
      priority,  // 'low' | 'medium' | 'high'
      createdAt: new Date().toISOString(),
    }

    // TODO: Push newTask into the tasks array
    // HINT: tasks.push(newTask)
    tasks.push(newTask)

    return newTask
  },

  // Update an existing task (partial update — only update provided fields)
  update: (id, userId, updates) => {
    // TODO: Find the task (use findById for the userId security check)
    // TODO: If not found, return null (the controller will send a 404)
    // TODO: Merge the updates into the existing task:
    //   Object.assign(existingTask, updates)
    //   This mutates the task in-place (fine for in-memory; with a DB you'd use UPDATE)
    // TODO: Return the updated task

    const task = TaskModel.findById(id, userId)
    if (!task) return null

    // Only allow updating these specific fields (security: don't let users change userId)
    const allowedFields = ['title', 'description', 'status', 'priority']
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        task[field] = updates[field]
      }
    })

    task.updatedAt = new Date().toISOString()
    return task
  },

  // Delete a task
  delete: (id, userId) => {
    // TODO: Find the index of the task: tasks.findIndex(t => t.id === id && t.userId === userId)
    // TODO: If index is -1, return false (not found)
    // TODO: Remove the item: tasks.splice(index, 1)
    // TODO: Return true (success)

    const index = tasks.findIndex(t => t.id === id && t.userId === userId)
    if (index === -1) return false
    tasks.splice(index, 1)
    return true
  },
}

module.exports = TaskModel
