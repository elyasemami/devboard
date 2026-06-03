// server/controllers/taskController.js
// RESOURCE: https://restfulapi.net
//
// EXPLANATION: REST CRUD pattern:
//   GET    /api/tasks      → getAllTasks
//   GET    /api/tasks/:id  → getTask
//   POST   /api/tasks      → createTask
//   PUT    /api/tasks/:id  → updateTask
//   DELETE /api/tasks/:id  → deleteTask
//
// req.user.id  → the logged-in user (set by authenticate middleware)
// req.params.id → the :id from the URL
// req.body      → the JSON payload from the client

const TaskModel = require('../models/taskModel')

// GET /api/tasks
const getAllTasks = (req, res) => {
  // TODO: Get all tasks for req.user.id and respond with { tasks }
  // HINT: const tasks = TaskModel.findAll(req.user.id)
  // HINT: res.json({ tasks })
}

// GET /api/tasks/:id
const getTask = (req, res) => {
  // TODO: Find the task by req.params.id and req.user.id
  // HINT: const task = TaskModel.findById(req.params.id, req.user.id)
  // HINT: If !task → res.status(404).json({ message: 'Task not found' })
  // HINT: Otherwise → res.json({ task })
}

// POST /api/tasks
const createTask = (req, res) => {
  // TODO: Validate that req.body.title exists
  // HINT: if (!req.body.title) return res.status(400).json({ message: 'Title is required' })

  // TODO: Create the task and respond with 201
  // HINT: const task = TaskModel.create({ userId: req.user.id, ...req.body })
  // HINT: res.status(201).json({ message: 'Task created', task })
  try {

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// PUT /api/tasks/:id
const updateTask = (req, res) => {
  // TODO: Update the task and respond
  // HINT: const task = TaskModel.update(req.params.id, req.user.id, req.body)
  // HINT: If !task → 404
  // HINT: Otherwise → res.json({ message: 'Task updated', task })
}

// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
  // TODO: Delete the task and respond
  // HINT: const deleted = TaskModel.delete(req.params.id, req.user.id)
  // HINT: If !deleted → 404
  // HINT: Otherwise → res.json({ message: 'Task deleted' })
}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask }
