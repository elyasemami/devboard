// server/routes/tasks.js
// RESOURCE: https://expressjs.com/en/guide/routing.html
//
// EXPLANATION: Route Structure
// ALL task routes require authentication — you must be logged in to manage tasks.
// The authenticate middleware is applied to each route individually here.
//
// Route parameter :id captures the task ID from the URL:
//   GET /api/tasks/42 → req.params.id === '42'
//
// HTTP Methods and what they mean:
//   GET    → safe, read-only, can be bookmarked
//   POST   → creates a new resource (not idempotent)
//   PUT    → replaces a resource (idempotent — same result if called multiple times)
//   DELETE → removes a resource

const express    = require('express')
const router     = express.Router()
const authenticate = require('../middleware/authMiddleware')
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')

// All routes below require authentication
// Option A: Apply authenticate to each route individually (shown below)
// Option B: router.use(authenticate) — applies to ALL routes in this file
//
// TODO: Uncomment the line below for Option B (cleaner for all-protected resources)
// router.use(authenticate)

// GET /api/tasks — list all tasks for the logged-in user
router.get('/', authenticate, getAllTasks)

// GET /api/tasks/:id — get a single task
router.get('/:id', authenticate, getTask)

// POST /api/tasks — create a new task
router.post('/', authenticate, createTask)

// PUT /api/tasks/:id — update a task
// TODO: Wire up the PUT route for /:id using the updateTask controller
// HINT: router.put('/:id', authenticate, updateTask)
router.put('/:id', authenticate, updateTask)

// DELETE /api/tasks/:id — delete a task
// TODO: Wire up the DELETE route for /:id
// HINT: router.delete('/:id', authenticate, deleteTask)
router.delete('/:id', authenticate, deleteTask)

module.exports = router
