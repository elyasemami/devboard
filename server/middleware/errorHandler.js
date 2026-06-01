// server/middleware/errorHandler.js
//
// EXPLANATION: Centralized Error Handling
// Instead of writing try/catch in every controller and sending error responses
// everywhere, Express lets you define ONE error handler for the whole app.
//
// Express knows this is an error handler because it has FOUR parameters:
//   (err, req, res, next)
// Normal middleware has three: (req, res, next)
//
// When any middleware or route calls next(err), Express skips all regular
// middleware and jumps straight to this handler.
//
// The errorHandler is mounted LAST in index.js, after all routes.

const errorHandler = (err, req, res, next) => {
  // Log the error server-side (use a proper logger like Winston in production)
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)

  // Determine the appropriate HTTP status code
  // If the error has a statusCode set, use it; otherwise default to 500
  const statusCode = err.statusCode || err.status || 500

  // Determine the message to send
  // In production, don't expose internal error details to clients
  const message = process.env.NODE_ENV === 'production' && statusCode === 500
    ? 'Internal Server Error'
    : err.message || 'Something went wrong'

  res.status(statusCode).json({
    success: false,
    message,
    // Only include stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

module.exports = errorHandler
