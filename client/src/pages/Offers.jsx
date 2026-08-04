import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiTag, FiClock } from 'react-icons/fi'
import PageHeader from '../components/ui/PageHeader'
import Skeleton from '../components/ui/Skeleton'
import CTA from '../components/sections/CTA'
import useFetch from '../hooks/useFetch'
import { formatDate } from '../utils/format'

export default function Offers() {
  const { data, loading } = useFetch('/offers', {}, [])
  const offers = data?.data || []

  const fallback = [
    { id: 1, title: 'Stay 3, Pay 2', description: 'Book three nights and enjoy the third night complimentary. Includes daily breakfast and airport pickup.', discount: '33%', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80', validFrom: new Date(), validTo: new Date(Date.now() + 90 * 86400000) },
    { id: 2, title: 'Honeymoon Escape', description: 'Romantic suite, candle-lit dinner, couples spa, and a bottle of champagne. Curated for unforgettable moments.', discount: '25%', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80', validFrom: new Date(), validTo: new Date(Date.now() + 60 * 86400000) },
    { id: 3, title: 'Business Traveler', description: 'Executive room, lounge access, complimentary airport transfer, and 24/7 business center.', discount: '20%', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80', validFrom: new Date(), validTo: new Date(Date.now() + 120 * 86400000) },
  ]
  const list = offers.length > 0 ? offers : fallback

  return (
    <>
      <PageHeader
        subtitle="Exclusive Offers"
        title="Curated Packages & Promotions"
        description="Discover our selection of thoughtfully crafted offers — from romantic escapes to extended stays — each designed to elevate your Hotel HDT experience."
        image="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
        breadcrumb={[{ name: 'Offers' }]}
      />

      <section className="py-20 md:py-24">
        <div className="container-lux">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/5] !rounded-3xl" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {list.map((offer, i) => (
                <motion.article
                  key={offer.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="card-lux group relative overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] ease-lux group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                    <div className="absolute top-4 right-4 bg-gold-gradient text-ink font-bold rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-gold">
                      <FiTag size={14} />
                      <span className="text-sm font-serif">{offer.discount}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-2xl text-white mb-2">{offer.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">{offer.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-white/60 text-xs flex items-center gap-1">
                          <FiClock size={12} /> Until {formatDate(offer.validTo)}
                        </div>
                        <Link to="/book" className="text-gold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                          Book <FiArrowRight />
                        </Link>
                      </div>
                    </div>
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
