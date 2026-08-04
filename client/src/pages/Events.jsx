import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import Skeleton from '../components/ui/Skeleton'
import CTA from '../components/sections/CTA'
import useFetch from '../hooks/useFetch'
import { formatDate } from '../utils/format'

export default function Events() {
  const { data, loading } = useFetch('/events', {}, [])
  const events = data?.data || []

  const fallback = [
    { id: 1, title: 'New Year Gala 2026', description: 'Ring in 2026 with a black-tie gala dinner, live jazz, and champagne toast at midnight on the rooftop.', date: '2026-12-31T19:00:00', location: 'Rooftop Grand Hall', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80', capacity: 200 },
    { id: 2, title: 'Himalayan Wine Tasting', description: 'Sommelier-led tasting of five rare wines paired with Himalayan canapés. Limited to 40 guests.', date: '2026-09-15T18:00:00', location: 'Cellar Lounge', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1200&q=80', capacity: 40 },
    { id: 3, title: 'Corporate Leadership Summit', description: 'A two-day summit for executives featuring keynote speakers, breakout sessions, and networking dinner.', date: '2026-10-10T09:00:00', location: 'Conference Hall A', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80', capacity: 300 },
  ]
  const list = events.length > 0 ? events : fallback

  return (
    <>
      <PageHeader
        subtitle="Signature Events"
        title="Unforgettable Occasions"
        description="From black-tie galas to intimate wine tastings and corporate summits — Hotel HDT is Kathmandu's premier venue for moments that matter."
        image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
        breadcrumb={[{ name: 'Events' }]}
      />

      <section className="py-20 md:py-24">
        <div className="container-lux">
          {loading ? (
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[16/9] md:aspect-[21/9] !rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {list.map((event, i) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="card-lux grid md:grid-cols-2 overflow-hidden group"
                >
                  <div className="relative aspect-[16/9] md:aspect-auto overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent md:bg-gradient-to-r" />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <div className="text-gold text-sm uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <FiCalendar size={14} /> {formatDate(event.date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="font-serif text-3xl text-white mb-4">{event.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-6">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-6">
                      <span className="flex items-center gap-2"><FiMapPin className="text-gold" /> {event.location}</span>
                      <span className="flex items-center gap-2"><FiUsers className="text-gold" /> {event.capacity} Guests</span>
                    </div>
                    <Link to="/contact" className="btn-outline self-start group">
                      Reserve a Spot
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  )
}
