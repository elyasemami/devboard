// server/routes/auth.js
// RESOURCE: https://expressjs.com/en/guide/routing.html#express-router
//
// EXPLANATION: Mounted at '/api/auth' in index.js, so:
//   router.post('/login')    → POST /api/auth/login
//   router.post('/register') → POST /api/auth/register
//   router.get('/me')        → GET  /api/auth/me


const express    = require('express')
const router     = express.Router()
const { register, login, getMe } = require('../controllers/authController')
const authenticate = require('../middleware/authMiddleware')

// Public — no token required
router.post('/register', register)
router.post('/login', login)

// TODO: Add the GET /me route — protected, requires authenticate middleware
// HINT: router.get('/me', authenticate, getMe)
router.get('/me', authenticate, getMe)

module.exports = router
