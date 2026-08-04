import { z } from 'zod'

export const authSchema = {
  register: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(80),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
  }),
  login: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
}

export const roomSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  category: z.enum(['Deluxe', 'Superior', 'Executive', 'Suite', 'Presidential Suite']),
  description: z.string().min(10),
  price: z.number().positive(),
  guests: z.number().int().positive(),
  beds: z.string(),
  bedType: z.string().optional(),
  size: z.string().optional(),
  bathroom: z.string(),
  tv: z.boolean().default(true),
  wifi: z.boolean().default(true),
  ac: z.boolean().default(true),
  minibar: z.boolean().default(false),
  view: z.string().optional(),
  images: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  available: z.boolean().default(true),
  count: z.number().int().positive().default(1),
})

export const bookingSchema = z.object({
  roomId: z.string().min(1),
  checkIn: z.string().or(z.coerce.date()),
  checkOut: z.string().or(z.coerce.date()),
  adults: z.number().int().min(1).max(10).default(1),
  children: z.number().int().min(0).max(10).default(0),
  specialRequest: z.string().optional(),
})

export const reviewSchema = z.object({
  roomId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3).max(2000),
})

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(5).max(5000),
})

export const menuItemSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  price: z.number().positive(),
  category: z.enum(['breakfast', 'lunch', 'dinner', 'drinks', 'desserts', 'special']),
  image: z.string().optional(),
  available: z.boolean().default(true),
})

export const offerSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  discount: z.string().min(1),
  image: z.string().optional(),
  validFrom: z.string().or(z.coerce.date()),
  validTo: z.string().or(z.coerce.date()),
  active: z.boolean().default(true),
})

export const eventSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  date: z.string().or(z.coerce.date()),
  location: z.string().min(2),
  image: z.string().optional(),
  capacity: z.number().int().positive().default(100),
})

export const gallerySchema = z.object({
  title: z.string().min(2),
  category: z.string().min(2),
  imageUrl: z.string().optional(),
})

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  avatar: z.string().optional(),
})

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
})
