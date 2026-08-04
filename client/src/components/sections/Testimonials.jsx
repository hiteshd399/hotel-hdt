import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { FiStar } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/pagination'
import { TESTIMONIALS } from '../../data/site'
import SectionHeader from '../ui/SectionHeader'

export default function Testimonials() {
  return (
    <section className="py-28 md:py-32 relative overflow-hidden">
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-lux relative">
        <SectionHeader
          eyebrow="Guest Stories"
          title="Whispers of Our Guests"
          description="The true measure of luxury is the experience we leave in the hearts of those who stay with us."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-14"
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="card-lux p-7 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <FiStar key={idx} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <span className="text-gold/40 font-serif text-5xl leading-none">"</span>
                </div>
                <p className="text-white/70 leading-relaxed flex-1 text-pretty">"{t.quote}"</p>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/5">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold/40"
                    loading="lazy"
                  />
                  <div>
                    <div className="text-white font-medium">{t.name}</div>
                    <div className="text-white/50 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
