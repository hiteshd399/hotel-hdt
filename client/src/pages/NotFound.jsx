import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-xl"
      >
        <div className="font-serif text-[180px] md:text-[240px] leading-none text-gradient-gold mb-4">
          404
        </div>
        <h1 className="font-serif text-3xl md:text-5xl text-white mb-4">Page Not Found</h1>
        <p className="text-white/60 text-lg mb-10 leading-relaxed">
          The page you are looking for seems to have wandered off. Let us guide you back to elegance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="btn-primary group">
            <FiHome /> Back to Home
          </Link>
          <Link to="/rooms" className="btn-outline group">
            <FiArrowLeft /> Browse Rooms
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
