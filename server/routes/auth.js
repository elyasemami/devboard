// server/routes/auth.js
// RESOURCE: https://expressjs.com/en/guide/routing.html#express-router
//
// EXPLANATION: Express Router
// express.Router() creates a mini-app that handles its own routes.
// In index.js we mount this at '/api/auth', so:
//   router.post('/login')    → handles POST /api/auth/login
//   router.post('/register') → handles POST /api/auth/register
//   router.get('/me')        → handles GET  /api/auth/me
//
// This separation keeps route files focused on ONE resource.
// auth.js handles auth. tasks.js handles tasks. Clean.

const express    = require('express')
const router     = express.Router()
const { register, login, getMe } = require('../controllers/authController')
const authenticate = require('../middleware/authMiddleware')

// Public routes — no token required
// POST /api/auth/register
router.post('/register', register)

// POST /api/auth/login
router.post('/login', login)

// Protected route — authenticate middleware runs first
// GET /api/auth/me → returns the current logged-in user
// TODO: Add the authenticate middleware before getMe
// HINT: router.get('/me', authenticate, getMe)
// The authenticate middleware runs first — if it fails, getMe never runs
router.get('/me', authenticate, getMe)

module.exports = router
