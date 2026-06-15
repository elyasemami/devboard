// server/middleware/errorHandler.js
//
// EXPLANATION: Centralized error handling.
// Express recognizes this as an error handler because it has FOUR parameters: (err, req, res, next).
// Any route that calls next(error) skips to this handler.
// Mounted LAST in index.js, after all routes.

const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);

  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Internal Server Error"
      : err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
