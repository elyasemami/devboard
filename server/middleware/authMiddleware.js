// server/middleware/authMiddleware.js
// RESOURCE: https://www.npmjs.com/package/jsonwebtoken
// RESOURCE: https://jwt.io/introduction
//
// EXPLANATION: JWT Authentication Middleware
// When a client makes a request to a protected route, it sends the JWT in
// the Authorization header: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//
// This middleware:
//   1. Reads that header
//   2. Extracts the token
//   3. Verifies it with jwt.verify() (checks signature + expiry)
//   4. Attaches the decoded user data to req.user
//   5. Calls next() to continue to the route handler
//
// If anything fails, it sends 401 Unauthorized and STOPS the request.
//
// Middleware signature: (req, res, next)
//   req  = the incoming request
//   res  = the outgoing response
//   next = function to call to pass to the next handler
//
// Protected routes "plug in" this middleware like:
//   router.get('/tasks', authenticate, taskController.getAll)
//   The request must pass through authenticate before reaching taskController.getAll

const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const authenticate = async (req, res, next) => {
  try {
    // TODO: Step 1 — Read the Authorization header
    // HINT: const authHeader = req.headers.authorization
    // The header looks like: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const authHeader = req.headers.authorization

    // TODO: Step 2 — Validate the header format
    // HINT: If !authHeader or !authHeader.startsWith('Bearer '), send 401
    // Use: return res.status(401).json({ message: 'No token provided' })
    // The "return" stops execution so next() isn't called
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    // TODO: Step 3 — Extract the token (everything after "Bearer ")
    // HINT: const token = authHeader.split(' ')[1]
    // split(' ') creates ['Bearer', 'eyJ...'] — we want index [1]
    const token = authHeader.split(' ')[1]

    // TODO: Step 4 — Verify the token
    // HINT: const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // jwt.verify throws an error if the token is invalid or expired
    // That's why we're inside a try/catch
    // RESOURCE: https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // TODO: Step 5 — Find the user in the database
    // HINT: const user = UserModel.findById(decoded.userId)
    // Even if the token is valid, the user might have been deleted
    const user = UserModel.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    // TODO: Step 6 — Attach the user to the request object
    // HINT: req.user = { id: user.id, name: user.name, email: user.email }
    // NEVER attach the password — controllers will access req.user
    req.user = { id: user.id, name: user.name, email: user.email }

    // TODO: Step 7 — Call next() to continue to the route handler
    next()

  } catch (error) {
    // jwt.verify throws these specific errors:
    //   JsonWebTokenError  — invalid token
    //   TokenExpiredError  — token has expired
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please login again' })
    }
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authenticate
