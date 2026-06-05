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
   
  },

  findById: (id, userId) => {
    // TODO: Return the task matching both id AND userId
    // The userId check prevents users from accessing each other's tasks
    
  },

  create: ({ userId, title, description, status = 'todo', priority = 'medium' }) => {
    // TODO: Step 1 — Validate title is present
   

    // TODO: Step 2 — Build the new task object with a unique id
   
    // TODO: Step 3 — Push to tasks array and return the new task
  },

  update: (id, userId, updates) => {
    // TODO: Step 1 — Find the existing task (use findById for security)
  
    // TODO: Step 2 — Only update allowed fields (never let users change userId)


    // TODO: Step 3 — Set updatedAt and return the modified task
    
  },

  delete: (id, userId) => {
    // TODO: Find the index, splice it out, return true/false

  },
}

module.exports = TaskModel
