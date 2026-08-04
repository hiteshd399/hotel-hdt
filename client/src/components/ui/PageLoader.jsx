import { motion } from 'framer-motion'

/**
 * Full-page luxury loader shown during lazy page transitions.
 */
export default function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="relative w-16 h-16"
      >
        <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-gold text-xs tracking-[0.4em] uppercase"
      >
        Hotel HDT
      </motion.p>
    </div>
  )
}
