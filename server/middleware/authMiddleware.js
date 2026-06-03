// server/middleware/authMiddleware.js
// RESOURCE: https://www.npmjs.com/package/jsonwebtoken
// RESOURCE: https://jwt.io/introduction
//
// EXPLANATION: This middleware runs before every protected route.
// It reads the JWT from the Authorization header, verifies it,
// and attaches the decoded user to req.user.
// If anything is wrong → 401 Unauthorized, request stops here.
//
// Usage in routes: router.get('/tasks', authenticate, taskController.getAll)
// The request must pass through authenticate before reaching the controller.

const jwt       = require('jsonwebtoken')
const UserModel = require('../models/userModel')

const authenticate = async (req, res, next) => {
  try {
    // TODO: Step 1 — Read the Authorization header
    // HINT: const authHeader = req.headers.authorization
    // The header looks like: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

    // TODO: Step 2 — Check the header exists and starts with 'Bearer '
    // HINT: if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //         return res.status(401).json({ message: 'No token provided' })
    //       }

    // TODO: Step 3 — Extract the token string (everything after "Bearer ")
    // HINT: authHeader.split(' ')[1]  gives you index 1 of ['Bearer', 'eyJ...']

    // TODO: Step 4 — Verify the token
    // HINT: const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // jwt.verify throws an error if the token is invalid or expired
    // RESOURCE: https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback

    // TODO: Step 5 — Find the user by the id inside the decoded token
    // HINT: const user = UserModel.findById(decoded.userId)
    // HINT: if (!user) return res.status(401).json({ message: 'User not found' })

    // TODO: Step 6 — Attach the user to the request (without the password)
    // HINT: req.user = { id: user.id, name: user.name, email: user.email }

    // TODO: Step 7 — Call next() to pass control to the route handler

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please login again' })
    }
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authenticate
