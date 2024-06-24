// src/middleware/errorMiddleware.js

// Middleware to handle not found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware to handle all errors
const errorHandler = (err, req, res, next) => {
  // Determine the status code: Use the existing status code or default to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  // Send a detailed error response
  res.json({
    status: "error",
    statusCode: statusCode,
    message: err.message, // Ensure the error message is passed
    // Include the stack trace in non-production environments for debugging
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = { notFound, errorHandler };
