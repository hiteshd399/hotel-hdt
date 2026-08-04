import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiArrowRight, FiStar } from 'react-icons/fi'
import { formatCurrency } from '../../utils/format'

/**
 * Reusable Room Card used in Home & Rooms listing.
 */
export default function RoomCard({ room, index = 0 }) {
  const images = Array.isArray(room.images) ? room.images : []
  const cover = images[0] || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800'

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card-lux group"
    >
      {/* Image */}
      <Link to={`/rooms/${room.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <img
          src={cover}
          alt={room.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase bg-ink/70 backdrop-blur-sm text-gold border border-gold/30">
          {room.category}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="text-white/60 text-xs mb-1">From</div>
            <div className="font-serif text-2xl text-gold">
              {formatCurrency(room.price)}
              <span className="text-xs text-white/50 ml-1">/ night</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link to={`/rooms/${room.slug}`}>
            <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{room.name}</h3>
          </Link>
          {room.rating && (
            <div className="flex items-center gap-1 text-gold text-sm">
              <FiStar className="fill-gold" /> {room.rating}
            </div>
          )}
        </div>

        <p className="text-white/60 text-sm line-clamp-2 mb-5 min-h-[40px]">{room.description}</p>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <FiUsers /> {room.guests} Guests
          </div>
          <Link
            to={`/rooms/${room.slug}`}
            className="inline-flex items-center gap-2 text-gold text-sm hover:gap-3 transition-all"
          >
            View Details <FiArrowRight />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
