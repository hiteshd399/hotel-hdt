import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

// Configure Cloudinary client
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Storage engine that uploads files directly to Cloudinary
export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = req.uploadFolder || 'hotel-hdt'
    return {
      folder,
      resource_type: 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    }
  },
})

// Multer upload middleware — accepts up to N images
export const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpg|jpeg|png|webp|avif/
    const ok = allowed.test(file.mimetype) || allowed.test(file.originalname)
    if (ok) cb(null, true)
    else cb(new Error('Only image files (jpg, jpeg, png, webp, avif) are allowed'))
  },
})

// Upload single image
export const uploadSingle = upload.single('image')

// Upload multiple images (max 10)
export const uploadMultiple = upload.array('images', 10)
