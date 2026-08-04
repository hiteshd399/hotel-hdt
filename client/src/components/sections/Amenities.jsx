import { motion } from 'framer-motion'
import { FiWifi, FiTruck, FiHeart, FiActivity, FiCoffee, FiSun, FiGrid, FiBriefcase, FiDroplet } from 'react-icons/fi'
import { AMENITIES } from '../../data/site'
import SectionHeader from '../ui/SectionHeader'
import Reveal from '../ui/Reveal'

const ICONS = { FiWifi, FiTruck, FiHeart, FiActivity, FiCoffee, FiSun, FiGrid, FiBriefcase, FiDroplet }

export default function Amenities() {
  return (
    <section className="py-28 md:py-32 bg-ink-light/40 relative overflow-hidden">
      <div className="container-lux">
        <SectionHeader
          eyebrow="World-Class Amenities"
          title="Everything You Need, Effortlessly Curated"
          description="From the moment you arrive to the moment you depart, every amenity is designed to anticipate and exceed your expectations."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {AMENITIES.map((a, i) => {
            const Icon = ICONS[a.icon] || FiWifi
            return (
              <Reveal key={a.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative p-7 rounded-2xl bg-ink-card border border-white/5 hover:border-gold/30 transition-colors duration-500 overflow-hidden h-full"
                >
                  <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-5 group-hover:bg-gold group-hover:text-ink transition-all duration-500">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-serif text-lg text-white mb-2">{a.name}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
