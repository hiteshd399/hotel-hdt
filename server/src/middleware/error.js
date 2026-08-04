/**
 * Centralized error handler.
 * Place after all routes via: app.use(errorHandler)
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  console.error(`[ERROR ${statusCode}] ${message}`)
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack)
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })
}

/**
 * 404 handler for unknown routes.
 */
export function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` })
}
