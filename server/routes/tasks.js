// server/routes/tasks.js
// RESOURCE: https://expressjs.com/en/guide/routing.html
//
// EXPLANATION: Express Router maps HTTP method + URL to a controller function.
// All routes here are mounted at /api/tasks in index.js, so:
//   router.get('/')     → GET  /api/tasks
//   router.post('/')    → POST /api/tasks
//   router.put('/:id')  → PUT  /api/tasks/:id  (req.params.id = the id)

const express      = require('express')
const router       = express.Router()
const authenticate = require('../middleware/authMiddleware')
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController')

// All task routes require a valid JWT token
router.get('/',    authenticate, getAllTasks)
router.get('/:id', authenticate, getTask)
router.post('/',   authenticate, createTask)

// TODO: Add the PUT route for updating a task

// TODO: Add the DELETE route for deleting a task



module.exports = router
