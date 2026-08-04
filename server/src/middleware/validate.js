/**
 * Validate request body against a Zod schema.
 * Usage: router.post('/register', validateBody(authSchema.register), controller)
 */
export const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    const errors = result.error.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    }))
    return res.status(422).json({ success: false, message: 'Validation failed', errors })
  }
  req.body = result.data
  next()
}
