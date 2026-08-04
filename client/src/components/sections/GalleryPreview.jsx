import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiArrowRight } from 'react-icons/fi'
import useFetch from '../../hooks/useFetch'
import SectionHeader from '../ui/SectionHeader'
import Skeleton from '../ui/Skeleton'

export default function GalleryPreview() {
  const { data, loading } = useFetch('/gallery', { limit: 8 }, [])
  const items = data?.data || []
  const [active, setActive] = useState(null)

  // Fallback static images if API empty
  const fallback = [
    { imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', title: 'Hotel Exterior' },
    { imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', title: 'Grand Lobby' },
    { imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80', title: 'Restaurant' },
    { imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', title: 'Deluxe Room' },
    { imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', title: 'Suite' },
    { imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', title: 'Pool' },
    { imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', title: 'Spa' },
    { imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', title: 'Banquet' },
  ]
  const photos = items.length > 0 ? items : fallback

  return (
    <section className="py-28 md:py-32 bg-ink-light/40 relative overflow-hidden">
      <div className="container-lux">
        <SectionHeader
          eyebrow="Visual Journey"
          title="Moments at Hotel HDT"
          description="Step into a world of curated elegance through our lens — every frame a glimpse of the experiences that await you."
        />

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square !rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[220px]">
            {photos.map((p, i) => {
              // Masonry: make some items taller
              const span = i % 5 === 0 ? 'row-span-2' : ''
              return (
                <motion.button
                  key={p.id || i}
                  onClick={() => setActive(p)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={`group relative overflow-hidden rounded-2xl ${span}`}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      {p.title}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/gallery" className="btn-outline group">
            View Full Gallery
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-gold hover:border-gold transition-colors"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              <FiX size={20} />
            </button>
            <motion.img
              src={active.imageUrl}
              alt={active.title}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-card"
              onClick={(e) => e.stopPropagation()}
            />
            {active.title && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-serif text-xl">
                {active.title}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
