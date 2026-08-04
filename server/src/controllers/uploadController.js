import { asyncHandler } from '../middleware/asyncHandler.js'

/**
 * POST /api/upload — single image (admin only)
 * Returns: { success, data: { url, publicId } }
 */
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' })
  }
  res.json({
    success: true,
    data: {
      url: req.file.path,
      publicId: req.file.filename,
    },
  })
})

/**
 * POST /api/upload/multiple — multiple images (admin only, max 10)
 * Returns: { success, data: [{ url, publicId }] }
 */
export const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No files uploaded' })
  }
  const data = req.files.map((f) => ({ url: f.path, publicId: f.filename }))
  res.json({ success: true, data })
})
