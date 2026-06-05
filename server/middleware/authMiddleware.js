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

const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    // TODO: Step 1 — Read the Authorization header
    // The header looks like: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

    const authHeader = req.headers["authorization"];

    // TODO: Step 2 — Check the header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized!" });
    }

    // TODO: Step 3 — Extract the token string (everything after "Bearer ")
    const token = authHeader.split(" ")[1];
    // TODO: Step 4 — Verify the token
    // jwt.verify throws an error if the token is invalid or expired
    // RESOURCE: https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    const decoded = req.jwt.verify(token);

    // TODO: Step 5 — Find the user by the id inside the decoded token
    //const user = await UserModel.findById(decoded.id).select("-password");

    //req.user = user;

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
