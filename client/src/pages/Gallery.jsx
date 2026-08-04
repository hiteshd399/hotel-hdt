import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiFilter } from 'react-icons/fi'
import PageHeader from '../components/ui/PageHeader'
import Skeleton from '../components/ui/Skeleton'
import CTA from '../components/sections/CTA'
import useFetch from '../hooks/useFetch'

const CATEGORIES = ['all', 'hotel', 'rooms', 'restaurant', 'events', 'pool']

export default function Gallery() {
  const [active, setActive] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const { data, loading } = useFetch('/gallery', active === 'all' ? {} : { category: active }, [active])
  const items = data?.data || []

  const fallback = [
    { imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80', title: 'Hotel Exterior', category: 'hotel' },
    { imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80', title: 'Grand Lobby', category: 'hotel' },
    { imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80', title: 'Deluxe Room', category: 'rooms' },
    { imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80', title: 'Suite', category: 'rooms' },
    { imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80', title: 'Restaurant', category: 'restaurant' },
    { imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', title: 'Rooftop Dining', category: 'restaurant' },
    { imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80', title: 'Pool', category: 'pool' },
    { imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80', title: 'Spa', category: 'hotel' },
    { imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80', title: 'Banquet', category: 'events' },
    { imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80', title: 'Wedding Setup', category: 'events' },
    { imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80', title: 'Lounge', category: 'hotel' },
    { imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80', title: 'Spa Pool', category: 'pool' },
  ]
  const photos = items.length > 0 ? items : fallback
  const filtered = active === 'all' ? photos : photos.filter((p) => p.category === active)

  return (
    <>
      <PageHeader
        subtitle="Visual Journey"
        title="Hotel HDT Gallery"
        description="Step inside our world. Every image tells a story of refined luxury, breathtaking views, and curated moments that await you at Hotel HDT."
        image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80"
        breadcrumb={[{ name: 'Gallery' }]}
      />

      <section className="py-20 md:py-24">
        <div className="container-lux">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  active === c
                    ? 'bg-gold text-ink font-medium shadow-gold'
                    : 'border border-white/10 text-white/70 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {c === 'all' && <FiFilter size={14} />}
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          {/* Masonry grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="!rounded-2xl" />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
            >
              <AnimatePresence>
                {filtered.map((p, i) => {
                  const span = i % 7 === 0 ? 'row-span-2 col-span-2' : i % 5 === 0 ? 'row-span-2' : ''
                  return (
                    <motion.button
                      key={p.id || i}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => setLightbox(p)}
                      className={`group relative overflow-hidden rounded-2xl ${span}`}
                    >
                      <img
                        src={p.imageUrl}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <div className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">{p.title}</div>
                        <div className="text-gold/80 text-[10px] uppercase tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{p.category}</div>
                      </div>
                    </motion.button>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-gold hover:border-gold transition-colors" onClick={() => setLightbox(null)}>
              <FiX size={20} />
            </button>
            <motion.img
              src={lightbox.imageUrl} alt={lightbox.title}
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-full max-h-[85vh] rounded-2xl shadow-card"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <div className="text-white font-serif text-xl">{lightbox.title}</div>
              <div className="text-gold/80 text-xs uppercase tracking-wider mt-1">{lightbox.category}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTA />
    </>
  )
}
