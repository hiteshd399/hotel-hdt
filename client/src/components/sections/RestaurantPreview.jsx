import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Reveal from '../ui/Reveal'

export default function RestaurantPreview() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="container-lux grid lg:grid-cols-2 gap-16 items-center">
        {/* Content first on mobile, image first on desktop (visually) */}
        <div className="order-2 lg:order-1">
          <Reveal>
            <div className="section-eyebrow">Rooftop Dining</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title mb-6">
              A Culinary <span className="text-gradient-gold italic">Journey</span> at Altitude
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 text-lg leading-relaxed mb-5">
              Helmed by our Michelin-trained executive chef, the HDT rooftop restaurant is a celebration of Himalayan flavors and global cuisine. Every dish is crafted with locally sourced, seasonal ingredients and paired with rare vintages from our cellar.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Whether it is a candlelit dinner under the stars, a leisurely breakfast with mountain views, or a curated tasting menu paired with sommelier-selected wines, every meal becomes an experience to remember.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { title: 'Breakfast', time: '6:30 — 10:30 AM' },
                { title: 'Lunch', time: '12:00 — 3:00 PM' },
                { title: 'Dinner', time: '6:30 — 11:00 PM' },
              ].map((m) => (
                <div key={m.title} className="text-center p-4 rounded-xl bg-ink-light/60 border border-white/5">
                  <div className="text-gold font-serif text-lg">{m.title}</div>
                  <div className="text-white/50 text-xs mt-1">{m.time}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <Link to="/restaurant" className="btn-primary group">
              Explore the Menu
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>

        {/* Image */}
        <Reveal delay={0.2} className="order-1 lg:order-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80"
              alt="Rooftop restaurant"
              className="rounded-3xl w-full aspect-[4/5] object-cover shadow-card"
              loading="lazy"
            />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-2xl overflow-hidden border-4 border-ink hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80"
                alt="Dish"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 glass-dark px-5 py-3 rounded-2xl">
              <div className="text-gold font-serif text-2xl">★★★★★</div>
              <div className="text-white/60 text-xs mt-1">Michelin Recommended</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
