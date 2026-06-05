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

}

// GET /api/tasks/:id
const getTask = (req, res) => {
  // TODO: Find the task by req.params.id and req.user.id

}

// POST /api/tasks
const createTask = (req, res) => {
  // TODO: Validate that req.body.title exists

  // TODO: Create the task and respond with 201
  
  try {

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// PUT /api/tasks/:id
const updateTask = (req, res) => {
  // TODO: Update the task and respond

}

// DELETE /api/tasks/:id
const deleteTask = (req, res) => {
  // TODO: Delete the task and respond

}

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask }
