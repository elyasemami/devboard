// server/controllers/authController.js
// RESOURCE: https://www.npmjs.com/package/jsonwebtoken#usage
//
// EXPLANATION: Controllers handle the business logic for each route.
// req.body   = JSON the client sent
// req.user   = set by authenticate middleware (protected routes only)
// res.status(201).json({}) = send a response with HTTP status + JSON body
//
// HTTP status codes:
//   200 OK | 201 Created | 400 Bad Request | 401 Unauthorized | 409 Conflict

const jwt       = require('jsonwebtoken')
const UserModel = require('../models/userModel')

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    // TODO: Step 1 — Destructure name, email, password from req.body

    // TODO: Step 2 — Validate all three fields are present
    // HINT: if (!name || !email || !password) return res.status(400).json({...})

    // TODO: Step 3 — Validate password is at least 6 characters

    // TODO: Step 4 — Create the user
    // HINT: const user = await UserModel.create({ name, email, password })
    // UserModel.create throws if the email is already taken — catch it below

    // TODO: Step 5 — Sign a JWT token
    // HINT: const token = jwt.sign(
    //         { userId: user.id },
    //         process.env.JWT_SECRET,
    //         { expiresIn: process.env.JWT_EXPIRES_IN }
    //       )

    // TODO: Step 6 — Respond with 201 Created
    // HINT: res.status(201).json({ message: 'Account created', user, token })

  } catch (error) {
    if (error.message === 'Email already registered') {
      return res.status(409).json({ message: error.message })
    }
    next(error)
  }
}

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    // TODO: Step 1 — Destructure email, password from req.body

    // TODO: Step 2 — Validate both fields are present

    // TODO: Step 3 — Find the user by email
    // HINT: const user = UserModel.findByEmail(email)
    // HINT: If !user → 401: "Invalid email or password"
    //       Don't reveal which field is wrong — security best practice

    // TODO: Step 4 — Verify the password
    // HINT: const match = await UserModel.verifyPassword(password, user.password)
    // HINT: If !match → 401: "Invalid email or password"

    // TODO: Step 5 — Sign a JWT token (same as register)

    // TODO: Step 6 — Build a safe user object (no password field)
    // HINT: const { password: _, ...safeUser } = user
    // This destructures "password" out and collects the rest in safeUser

    // TODO: Step 7 — Respond with 200
    // HINT: res.json({ message: 'Login successful', user: safeUser, token })

  } catch (error) {
    next(error)
  }
}

// GET /api/auth/me  (protected)
const getMe = async (req, res) => {
  // TODO: Return the current user from req.user
  // req.user was set by the authenticate middleware
  // HINT: res.json({ user: req.user })
}

module.exports = { register, login, getMe }
