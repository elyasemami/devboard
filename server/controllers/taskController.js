// server/controllers/taskController.js
// RESOURCE: https://restfulapi.net/rest-api-design-tutorial-with-example/
//
// EXPLANATION: REST API Design
// REST (Representational State Transfer) is a convention for API URLs:
//
//   GET    /api/tasks         → get all tasks (index)
//   GET    /api/tasks/:id     → get one task (show)
//   POST   /api/tasks         → create a task (create)
//   PUT    /api/tasks/:id     → update a task (update)
//   DELETE /api/tasks/:id     → delete a task (destroy)
//
// This is called "CRUD" — Create, Read, Update, Delete.
// Every web app is mostly CRUD. Master this and you're 80% of the way there.
//
// Each function here handles one of those operations.
// The route file (routes/tasks.js) maps HTTP method + URL → controller function.

const TaskModel = require('../models/taskModel')

// GET /api/tasks
// Return all tasks for the authenticated user
const getAllTasks = (req, res) => {
  // req.user.id is set by the authenticate middleware
  // We use it to only return THIS user's tasks (data isolation)

  // TODO: Get tasks from the model and send them
  // HINT: const tasks = TaskModel.findAll(req.user.id)
  // HINT: res.json({ tasks })
  // Note: wrapping in an object { tasks } (instead of just the array)
  //       makes the response easier to extend later (add pagination, metadata, etc.)

  const tasks = TaskModel.findAll(req.user.id)
  res.json({ tasks })
}

// GET /api/tasks/:id
const getTask = (req, res) => {
  // req.params.id is the :id segment from the URL
  // e.g. GET /api/tasks/42 → req.params.id === '42'

  // TODO: Find the task
  // HINT: const task = TaskModel.findById(req.params.id, req.user.id)
  // TODO: If not found, return 404: res.status(404).json({ message: 'Task not found' })
  // TODO: Otherwise: res.json({ task })

  const task = TaskModel.findById(req.params.id, req.user.id)
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json({ task })
}

// POST /api/tasks
const createTask = (req, res) => {
  // req.body contains the JSON the client sent
  // e.g. { title: "Fix bug", description: "...", status: "todo", priority: "high" }

  // TODO: Validate that title exists in req.body
  // HINT: if (!req.body.title) return res.status(400).json({ message: 'Title is required' })

  // TODO: Create the task using the model
  // HINT: const task = TaskModel.create({ userId: req.user.id, ...req.body })
  //       The spread ...req.body includes title, description, status, priority

  // TODO: Respond with 201 Created (not 200 — 201 means "resource was created")
  // HINT: res.status(201).json({ task })

  try {
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const task = TaskModel.create({ userId: req.user.id, ...req.body })
    res.status(201).json({ message: 'Task created', task })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// PUT /api/tasks/:id
const updateTask = (req, res) => {
  // TODO: Update the task
  // HINT: const task = TaskModel.update(req.params.id, req.user.id, req.body)
  // TODO: If task is null (not found/unauthorized): return 404
  // TODO: Otherwise: res.json({ task })

  const task = TaskModel.update(req.params.id, req.user.id, req.body)
  if (!task) return res.status(404).json({ message: 'Task not found' })
  res.json({ message: 'Task updated', task })
}

// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
  // TODO: Delete the task
  // HINT: const deleted = TaskModel.delete(req.params.id, req.user.id)
  // TODO: If deleted is false (not found): return 404
  // TODO: If deleted: res.json({ message: 'Task deleted' })
  // Note: DELETE responses typically don't return the deleted item

  const deleted = TaskModel.delete(req.params.id, req.user.id)
  if (!deleted) return res.status(404).json({ message: 'Task not found' })
  res.json({ message: 'Task deleted' })
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask }
