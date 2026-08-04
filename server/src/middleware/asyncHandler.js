/**
 * Tiny async wrapper to avoid try/catch boilerplate in controllers.
 * Usage: router.get('/', asyncHandler(controller))
 */
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)
