import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import Reveal from '../ui/Reveal'

export default function AboutPreview() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute -left-40 top-20 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container-lux grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Images */}
        <Reveal>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80"
                alt="Hotel HDT exterior"
                className="rounded-2xl w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
                alt="Hotel lobby"
                className="rounded-2xl w-full aspect-[3/4] object-cover mt-10"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-dark px-6 py-4 rounded-2xl text-center min-w-[200px]">
              <div className="font-serif text-3xl text-gold">15+</div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/60 mt-1">Years of Excellence</div>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div>
          <Reveal>
            <div className="section-eyebrow">Welcome to Hotel HDT</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title mb-6">
              A Sanctuary of <span className="text-gradient-gold italic">Refined Luxury</span> in Kathmandu
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/60 text-lg leading-relaxed mb-5">
              Nestled in the heart of Kathmandu, Hotel HDT is a destination where timeless elegance meets modern sophistication. For over fifteen years, we have curated unforgettable experiences for travelers from around the globe — blending authentic Nepali hospitality with the standards of world-class luxury.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              From our panoramic rooftop dining to our serene spa and meticulously appointed rooms, every detail is designed to offer a sanctuary of comfort and inspiration against the breathtaking backdrop of the Himalayas.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { title: 'Curated Experiences', desc: 'Personalized to every guest' },
                { title: 'Himalayan Views', desc: 'From every premium suite' },
                { title: 'Michelin-Trained Chef', desc: 'Leading our culinary team' },
                { title: '24/7 Butler Service', desc: 'For suite & presidential guests' },
              ].map((item) => (
                <div key={item.title} className="border-l-2 border-gold/40 pl-4">
                  <div className="text-white text-sm font-medium mb-1">{item.title}</div>
                  <div className="text-white/50 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <Link to="/about" className="btn-outline group">
              Discover Our Story
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
