import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiPhone } from 'react-icons/fi'
import Reveal from '../ui/Reveal'
import { HOTEL } from '../../data/site'

export default function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="container-lux">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gold-gradient p-12 md:p-20 text-center"
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative">
            <Reveal>
              <h2 className="font-serif text-4xl md:text-6xl text-ink leading-tight mb-6">
                Your Himalayan Sanctuary <span className="italic">Awaits</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-ink/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Book your stay at Hotel HDT and discover why discerning travelers from around the world choose us as their Kathmandu retreat.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/book" className="btn-dark group !bg-ink !text-white !border-ink hover:!bg-ink-light">
                  Reserve Your Stay
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={`tel:${HOTEL.phone}`} className="btn-dark !bg-transparent !border-ink/30 !text-ink hover:!bg-ink hover:!text-white">
                  <FiPhone /> {HOTEL.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
