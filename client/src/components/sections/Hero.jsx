import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { HERO_SLIDES } from '../../data/site'
import BookingBar from './BookingBar'

/**
 * Full-screen hero with rotating background slider, animated heading, booking bar.
 */
export default function Hero() {
  const [active, setActive] = useState(0)

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background slider */}
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        onSlideChange={(s) => setActive(s.realIndex)}
        className="absolute inset-0 w-full h-full"
      >
        {HERO_SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                style={{ transform: `scale(${active === i ? 1.08 : 1})`, transition: 'transform 6s ease-out' }}
              />
              <div className="absolute inset-0 bg-hero-overlay" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center container-lux pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="section-eyebrow !justify-start mb-6"
            >
              Hotel HDT · Kathmandu, Nepal
            </motion.div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-medium leading-[1.05] text-white mb-4">
              {HERO_SLIDES[active].title}
              <span className="block text-gradient-gold italic">{HERO_SLIDES[active].subtitle}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
              {HERO_SLIDES[active].description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/book" className="btn-primary group">
                Book Your Stay
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/rooms" className="btn-outline">
                Explore Rooms
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <FiChevronDown />
          </motion.div>
        </motion.div>
      </div>

      {/* Booking bar */}
      <BookingBar />
    </section>
  )
}
