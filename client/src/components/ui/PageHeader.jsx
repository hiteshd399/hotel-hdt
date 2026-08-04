import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'

/**
 * Inner-page hero header with background image + breadcrumb.
 */
export default function PageHeader({ title, subtitle, description, image, breadcrumb = [] }) {
  return (
    <section className="relative pt-40 pb-20 md:pt-48 md:pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 to-transparent" />
      </div>

      <div className="container-lux relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="section-eyebrow !justify-start mb-5">{subtitle}</div>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-5 leading-[1.05]">{title}</h1>
          {description && (
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{description}</p>
          )}

          {breadcrumb.length > 0 && (
            <nav className="flex items-center gap-2 mt-8 text-sm">
              <Link to="/" className="text-white/50 hover:text-gold transition-colors">Home</Link>
              {breadcrumb.map((b, i) => (
                <span key={i} className="flex items-center gap-2">
                  <FiChevronRight className="text-gold/50" />
                  {b.path ? (
                    <Link to={b.path} className="text-white/50 hover:text-gold transition-colors">{b.name}</Link>
                  ) : (
                    <span className="text-gold">{b.name}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </motion.div>
      </div>
    </section>
  )
}
