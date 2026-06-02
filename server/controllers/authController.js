// server/controllers/authController.js
// RESOURCE: https://www.npmjs.com/package/jsonwebtoken#usage
//
// EXPLANATION: Controllers
// Controllers hold the BUSINESS LOGIC for each route.
// They receive the request, interact with the model, and send a response.
// Keeping logic here (not in route files) keeps code organized and testable.
//
// Controller function signature: async (req, res) => {}
//   req.body   = JSON data sent by the client (login form data, etc.)
//   req.params = URL parameters (/tasks/:id — id is a param)
//   req.query  = Query string (/tasks?status=done — status is a query param)
//   req.user   = Set by authenticate middleware (only on protected routes)
//
// Response methods:
//   res.status(200).json({...})  ← Send JSON with HTTP status code
//   res.json({...})              ← Implicitly 200
//   Standard codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized,
//                   404 Not Found, 409 Conflict, 500 Internal Server Error

const jwt      = require('jsonwebtoken')
const UserModel = require('../models/userModel')

// ── REGISTER ────────────────────────────────────────────────────────────────
const register = async (req, res) => {
  // TODO: Implement user registration
  //
  // Steps:
  // 1. Destructure from req.body: const { name, email, password } = req.body
  //
  // 2. Validate inputs — all three are required:
  //    if (!name || !email || !password) {
  //      return res.status(400).json({ message: 'Name, email, and password are required' })
  //    }
  //
  // 3. Validate password length:
  //    if (password.length < 6) {
  //      return res.status(400).json({ message: 'Password must be at least 6 characters' })
  //    }
  //
  // 4. Try creating the user: const user = await UserModel.create({ name, email, password })
  //    UserModel.create throws if email already exists — catch it!
  //
  // 5. Create a JWT token:
  //    const token = jwt.sign(
  //      { userId: user.id },           ← payload (data encoded in the token)
  //      process.env.JWT_SECRET,         ← secret key for signing
  //      { expiresIn: process.env.JWT_EXPIRES_IN }  ← expiry
  //    )
  //
  // 6. Respond with 201 Created:
  //    res.status(201).json({ message: 'Account created', user, token })

  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    // TODO: Validate password length
    if (password.length() < 8) {
      res.status(400).json({message: 'password must be more than 8 characters!'})
    }
    // TODO: Create user (wrap in try/catch for duplicate email error)
    const user = await UserModel.create({ name, email, password })

    // TODO: Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.status(201).json({ message: 'Account created successfully', user, token })

  } catch (error) {
    // Handle specific errors
    if (error.message === 'Email already registered') {
      return res.status(409).json({ message: error.message }) // 409 Conflict
    }
    // Pass unexpected errors to the error handler middleware
    next(error)
  }
}

// ── LOGIN ────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  // TODO: Implement login
  //
  // Steps:
  // 1. Destructure: const { email, password } = req.body
  //
  // 2. Validate that both are provided
  //
  // 3. Find the user: const user = UserModel.findByEmail(email)
  //    If !user → 401 Unauthorized: "Invalid email or password"
  //    (Don't say "email not found" — tells attackers which emails exist)
  //
  // 4. Verify the password: const match = await UserModel.verifyPassword(password, user.password)
  //    If !match → 401: "Invalid email or password"
  //
  // 5. Create JWT token (same as in register)
  //
  // 6. Build a safe user object (no password):
  //    const { password: _, ...safeUser } = user
  //
  // 7. Respond 200: { message: 'Login successful', user: safeUser, token }

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // TODO: Find user and verify password

    const user = UserModel.findByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const match = await UserModel.verifyPassword(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // TODO: Generate token and send response
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    const { password: _, ...safeUser } = user

    res.json({ message: 'Login successful', user: safeUser, token })

  } catch (error) {
    next(error)
  }
}

// ── GET CURRENT USER ─────────────────────────────────────────────────────────
// Protected route — req.user is set by authenticate middleware
const getMe = async (req, res) => {
  // TODO: Return the currently logged-in user
  // HINT: req.user is set by the authenticate middleware
  // HINT: res.json({ user: req.user })
  res.json({ user: req.user })
}

module.exports = { register, login, getMe }
