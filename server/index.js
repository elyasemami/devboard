// server/index.js
// RESOURCE: https://expressjs.com/en/starter/hello-world.html
//
// EXPLANATION: This is the entry point for your backend.
// It creates the Express app, registers middleware, mounts routes, starts listening.
//
// Middleware = functions that run on EVERY request before reaching the route handler.
// Order matters — they execute top to bottom.

const express    = require('express')
const cors       = require('cors')
require('dotenv').config()

const authRoutes   = require('./routes/auth')
const taskRoutes   = require('./routes/tasks')
const errorHandler = require('./middleware/errorHandler')

const app  = express()
const PORT = process.env.PORT || 3001

// ── MIDDLEWARE ────────────────────────────────────────────────────────────────

// TODO: Enable CORS so the frontend (localhost:5173) can talk to this server
// HINT: app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
// RESOURCE: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS


// TODO: Enable JSON body parsing so req.body is available in controllers
// HINT: app.use(express.json())


// Request logger — already done, study how it works
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// ── ROUTES ────────────────────────────────────────────────────────────────────

// TODO: Mount the auth router at '/api/auth'
// HINT: app.use('/api/auth', authRoutes)


// TODO: Mount the tasks router at '/api/tasks'
// HINT: app.use('/api/tasks', taskRoutes)


// Health check — test this first: GET http://localhost:3001/api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Error handler — must be LAST, after all routes
app.use(errorHandler)

// ── START ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ✅ DevBoard API running
  ➜  Local:  http://localhost:${PORT}
  ➜  Health: http://localhost:${PORT}/api/health
  `)
})

module.exports = app
