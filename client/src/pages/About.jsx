import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiAward, FiHeart, FiShield, FiZap } from 'react-icons/fi'
import PageHeader from '../components/ui/PageHeader'
import SectionHeader from '../components/ui/SectionHeader'
import Reveal from '../components/ui/Reveal'
import Statistics from '../components/sections/Statistics'
import CTA from '../components/sections/CTA'
import { HOTEL } from '../data/site'

const values = [
  { icon: FiAward, title: 'Excellence', desc: 'We pursue the highest standards in every detail, from room design to guest service, never compromising on quality.' },
  { icon: FiHeart, title: 'Hospitality', desc: 'Genuine Nepali warmth guides every interaction, making each guest feel welcomed, valued, and cared for.' },
  { icon: FiShield, title: 'Integrity', desc: 'We operate with transparency and respect — for our guests, our team, and the cultural heritage of Kathmandu.' },
  { icon: FiZap, title: 'Innovation', desc: 'We continuously evolve, blending timeless elegance with modern amenities and curated experiences.' },
]

const milestones = [
  { year: '2010', title: 'The Beginning', desc: 'Hotel HDT opens its doors with 12 rooms and a vision to redefine luxury hospitality in Kathmandu.' },
  { year: '2014', title: 'Rooftop Restaurant', desc: 'Our iconic rooftop dining venue launches, quickly becoming a destination for culinary enthusiasts.' },
  { year: '2018', title: 'Spa & Wellness', desc: 'A 500 sqm spa sanctuary is added, featuring Himalayan-inspired treatments and a heated infinity pool.' },
  { year: '2021', title: 'Conference Center', desc: 'A state-of-the-art conference wing is unveiled, hosting global summits and corporate retreats.' },
  { year: '2024', title: 'Presidential Suite', desc: 'Our crown jewel — a 120 sqm two-bedroom residence — debuts, redefining luxury in South Asia.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        subtitle="About Hotel HDT"
        title="A Legacy of Refined Hospitality"
        description="For over fifteen years, Hotel HDT has been a sanctuary for the discerning traveler — a place where Nepali warmth meets world-class luxury in the heart of Kathmandu."
        image="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&q=80"
        breadcrumb={[{ name: 'About' }]}
      />

      {/* Story */}
      <section className="py-28 md:py-32 relative overflow-hidden">
        <div className="container-lux grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80"
                alt="Hotel lobby"
                className="rounded-3xl w-full aspect-[4/5] object-cover shadow-card"
                loading="lazy"
              />
              <div className="absolute -bottom-8 -right-8 glass-dark p-6 rounded-2xl max-w-[240px]">
                <div className="font-serif text-4xl text-gold mb-2">15+</div>
                <div className="text-white/70 text-sm">Years of crafting unforgettable guest experiences in Kathmandu</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal><div className="section-eyebrow">Our Story</div></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title mb-6">
                Where <span className="text-gradient-gold italic">Himalayan Heritage</span> Meets Modern Luxury
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/60 text-lg leading-relaxed mb-5">
                Hotel HDT was born from a simple yet powerful vision: to create a sanctuary in Kathmandu where travelers from around the world could experience the warmth of Nepali hospitality without compromising on the standards of world-class luxury.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-white/60 text-lg leading-relaxed mb-5">
                What began in 2010 as a boutique hotel with twelve rooms has grown into one of Kathmandu's most celebrated addresses. Today, our property spans thirty luxurious rooms and suites, a Michelin-recommended rooftop restaurant, a holistic spa, and a state-of-the-art conference center — yet our founding philosophy remains unchanged.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Every corner of Hotel HDT is a tribute to Nepali craftsmanship, with bespoke teak furnishings, handwoven textiles, and curated art that tells the story of our heritage. We invite you to become part of that story.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <Link to="/contact" className="btn-primary group">
                Plan Your Visit
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 md:py-32 bg-ink-light/40 relative overflow-hidden">
        <div className="container-lux">
          <SectionHeader
            eyebrow="Our Values"
            title="The Principles That Guide Us"
            description="Four core values shape every decision we make and every experience we curate for our guests."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="card-lux p-7 h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-5">
                    <v.icon size={22} />
                  </div>
                  <h3 className="font-serif text-xl text-white mb-3">{v.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 md:py-32 relative overflow-hidden">
        <div className="container-lux">
          <SectionHeader
            eyebrow="Our Journey"
            title="Milestones Through the Years"
            description="A chronicle of the moments that have shaped Hotel HDT into the destination it is today."
          />
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent -translate-x-1/2" />

            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.05}>
                <div className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gold -translate-x-1/2 border-4 border-ink shadow-gold" />
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <div className="card-lux p-6">
                      <div className="text-gold font-serif text-2xl mb-2">{m.year}</div>
                      <h3 className="font-serif text-xl text-white mb-2">{m.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Statistics />
      <CTA />
    </>
  )
}
