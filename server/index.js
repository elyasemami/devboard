// server/index.js
// RESOURCE: https://expressjs.com/en/starter/hello-world.html
// RESOURCE: https://expressjs.com/en/guide/routing.html
//
// EXPLANATION: What is Express?
// Express is a minimal web framework for Node.js.
// It makes it easy to define routes (URL + HTTP method → function)
// and apply middleware (functions that run on every request).
//
// This file is the ENTRY POINT for your backend. It:
//   1. Loads environment variables (.env)
//   2. Creates the Express app
//   3. Registers middleware (cors, json parser)
//   4. Mounts route handlers
//   5. Starts listening on a port
//
// EXPLANATION: Middleware
// Middleware = functions that run BETWEEN receiving a request and sending a response.
// Each middleware calls next() to pass the request to the next one.
// Order matters — middleware runs in the order you call app.use().

const express = require('express')
const cors    = require('cors')
require('dotenv').config() // Load .env variables into process.env

// Import route modules
const authRoutes  = require('./routes/auth')
const taskRoutes  = require('./routes/tasks')
const errorHandler = require('./middleware/errorHandler')

const app  = express()
const PORT = process.env.PORT || 3001

// ── MIDDLEWARE STACK ──────────────────────────────────────────────────────
// These run on EVERY request, in order.

// TODO: Enable CORS
// CORS (Cross-Origin Resource Sharing) allows the frontend (localhost:5173)
// to make requests to the backend (localhost:3001).
// Without this, the browser would block the requests.
// HINT: app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
// RESOURCE: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// TODO: Enable JSON body parsing
// Without this, req.body is undefined when the client sends JSON.
// This middleware parses the JSON string into a JavaScript object.
// HINT: app.use(express.json())
app.use(express.json())

// Request logger — helpful during development
// TODO: Understand this middleware — it logs every incoming request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next() // Call next() to continue to the next middleware/route
})

// ── ROUTES ────────────────────────────────────────────────────────────────
// app.use(prefix, router) mounts a router at a path prefix.
// All routes in authRoutes will be at /api/auth/...
// All routes in taskRoutes will be at /api/tasks/...

// TODO: Mount the auth router at '/api/auth'
// HINT: app.use('/api/auth', authRoutes)
app.use('/api/auth', authRoutes)

// TODO: Mount the tasks router at '/api/tasks'
app.use('/api/tasks', taskRoutes)

// Health check endpoint — useful to verify the server is running
// Try: GET http://localhost:3001/api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── ERROR HANDLER ─────────────────────────────────────────────────────────
// Must be LAST — after all routes.
// Express knows it's an error handler because it has 4 params: (err, req, res, next)
app.use(errorHandler)

// ── START SERVER ──────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ✅ DevBoard API running
  ➜  Local:  http://localhost:${PORT}
  ➜  Health: http://localhost:${PORT}/api/health
  `)
})

module.exports = app // Exported for potential testing
