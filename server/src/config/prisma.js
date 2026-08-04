import { PrismaClient } from '@prisma/client'

// Single Prisma client instance to avoid exhausting connections in dev hot reload.
const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
