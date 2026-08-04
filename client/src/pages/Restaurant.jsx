import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiClock } from 'react-icons/fi'
import PageHeader from '../components/ui/PageHeader'
import SectionHeader from '../components/ui/SectionHeader'
import Skeleton from '../components/ui/Skeleton'
import Reveal from '../components/ui/Reveal'
import CTA from '../components/sections/CTA'
import useFetch from '../hooks/useFetch'
import { formatCurrency } from '../utils/format'
import { MENU_CATEGORIES } from '../data/site'

export default function Restaurant() {
  const [active, setActive] = useState('breakfast')
  const { data, loading } = useFetch('/restaurant', { category: active }, [active])
  const items = data?.data || []

  return (
    <>
      <PageHeader
        subtitle="Culinary Excellence"
        title="The HDT Rooftop Restaurant"
        description="A culinary journey curated by our Michelin-trained executive chef, blending Himalayan flavors with global cuisine — served 1,300 meters above the Kathmandu Valley."
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
        breadcrumb={[{ name: 'Restaurant' }]}
      />

      {/* Intro */}
      <section className="py-24 md:py-28 relative overflow-hidden">
        <div className="container-lux grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
              alt="Restaurant interior"
              className="rounded-3xl w-full aspect-[4/3] object-cover shadow-card"
              loading="lazy"
            />
          </Reveal>
          <div>
            <Reveal><div className="section-eyebrow">Dining at HDT</div></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title mb-6">
                A <span className="text-gradient-gold italic">Symphony</span> of Flavor & View
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/60 text-lg leading-relaxed mb-5">
                Perched on the rooftop of Hotel HDT, our restaurant offers an unrivaled dining experience where every meal is framed by panoramic views of the Himalayan horizon and the Kathmandu Valley below.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Our culinary team, led by a Michelin-trained executive chef, sources the finest local and seasonal ingredients to craft menus that celebrate both Nepali heritage and global gastronomy. From traditional dal bhat to seven-course tasting journeys, every plate tells a story.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: 'Breakfast', time: '6:30 — 10:30' },
                  { title: 'Lunch', time: '12:00 — 15:00' },
                  { title: 'Dinner', time: '18:30 — 23:00' },
                ].map((m) => (
                  <div key={m.title} className="p-4 rounded-xl bg-ink-light/60 border border-white/5 text-center">
                    <div className="text-gold font-serif text-lg">{m.title}</div>
                    <div className="text-white/50 text-xs mt-1 flex items-center justify-center gap-1"><FiClock size={10} /> {m.time}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-24 md:py-28 bg-ink-light/40 relative overflow-hidden">
        <div className="container-lux">
          <SectionHeader
            eyebrow="Our Menu"
            title="Crafted with Passion"
            description="Explore our curated selection of dishes, from breakfast favorites to seven-course tasting menus."
          />

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {MENU_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`px-6 py-2.5 rounded-full text-sm uppercase tracking-wider transition-all duration-300 ${
                  active === c.id
                    ? 'bg-gold text-ink font-medium shadow-gold'
                    : 'border border-white/10 text-white/70 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] !rounded-2xl" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {items.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-white/50">No items in this category.</div>
                ) : (
                  items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="card-lux overflow-hidden group"
                    >
                      {item.image && (
                        <div className="aspect-[4/3] overflow-hidden">
                          <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{item.name}</h3>
                          <div className="text-gold font-serif text-xl shrink-0">{formatCurrency(item.price)}</div>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
