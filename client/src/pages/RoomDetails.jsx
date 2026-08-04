import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import { FiStar, FiUsers, FiWifi, FiTv, FiWind, FiCoffee, FiCheck, FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import useFetch from '../hooks/useFetch'
import { formatCurrency, todayISO, nightsBetween } from '../utils/format'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import api from '../utils/axios'

const features = [
  { key: 'wifi', icon: FiWifi, label: 'Free WiFi' },
  { key: 'tv', icon: FiTv, label: 'Smart TV' },
  { key: 'ac', icon: FiWind, label: 'Air Conditioning' },
  { key: 'minibar', icon: FiCoffee, label: 'Mini Bar' },
]

export default function RoomDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data, loading, error } = useFetch(`/rooms/${slug}`, {}, [slug])
  const [thumbs, setThumbs] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const [booking, setBooking] = useState({
    checkIn: todayISO(1),
    checkOut: todayISO(3),
    adults: 2,
    children: 0,
    specialRequest: '',
  })

  if (loading) {
    return (
      <div className="pt-32 pb-20">
        <div className="container-lux">
          <div className="h-[500px] bg-ink-lighter rounded-3xl animate-pulse" />
        </div>
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="font-serif text-3xl text-white mb-4">Room not found</h2>
        <Link to="/rooms" className="btn-primary">Back to Rooms</Link>
      </div>
    )
  }

  const room = data.data
  const images = room.images?.length ? room.images : ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80']
  const nights = nightsBetween(booking.checkIn, booking.checkOut)
  const totalPrice = nights * room.price

  const handleBook = async () => {
    if (!user) {
      toast.error('Please login to book a room')
      navigate('/login', { state: { from: `/rooms/${slug}` } })
      return
    }
    if (nights < 1) {
      toast.error('Check-out must be after check-in')
      return
    }
    try {
      const { data: res } = await api.post('/bookings', {
        roomId: room.id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        adults: Number(booking.adults),
        children: Number(booking.children),
        specialRequest: booking.specialRequest,
      })
      toast.success('Booking created! Check your email for confirmation.')
      navigate('/dashboard/bookings')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    }
  }

  return (
    <>
      {/* Header strip */}
      <section className="pt-32 pb-10">
        <div className="container-lux">
          <Link to="/rooms" className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors mb-6 text-sm">
            <FiArrowLeft /> Back to Rooms
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="section-eyebrow !justify-start mb-3">{room.category}</div>
              <h1 className="font-serif text-4xl md:text-6xl text-white leading-tight">{room.name}</h1>
              <div className="flex items-center gap-4 mt-3 text-white/60 text-sm">
                <span className="flex items-center gap-1"><FiUsers /> {room.guests} Guests</span>
                <span>•</span>
                <span>{room.beds}</span>
                <span>•</span>
                <span>{room.size}</span>
                {room.view && <><span>•</span><span>{room.view}</span></>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/50 text-xs uppercase tracking-wider">From</div>
              <div className="font-serif text-4xl text-gold">{formatCurrency(room.price)}<span className="text-sm text-white/50"> / night</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-16">
        <div className="container-lux">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-4">
            {/* Thumbs */}
            <div className="hidden lg:block">
              <Swiper
                modules={[Thumbs]}
                watchSlidesProgress
                onSwiper={setThumbs}
                direction="vertical"
                spaceBetween={10}
                slidesPerView={4}
                className="!h-[600px]"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <button
                      onClick={() => setLightbox(img)}
                      className="block w-full h-full rounded-xl overflow-hidden"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* Main */}
            <div>
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
                spaceBetween={10}
                className="rounded-3xl overflow-hidden"
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <button onClick={() => setLightbox(img)} className="block w-full aspect-[16/10]">
                      <img src={img} alt={`${room.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Content + booking widget */}
      <section className="pb-28">
        <div className="container-lux grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Left: details */}
          <div>
            <div className="prose prose-invert max-w-none mb-10">
              <h2 className="font-serif text-2xl text-white mb-4">About this room</h2>
              <p className="text-white/70 text-lg leading-relaxed">{room.description}</p>
            </div>

            {/* Features */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-white mb-5">Room Features</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {room.features?.map((f) => (
                  <div key={f} className="flex items-center gap-3 p-3 rounded-xl bg-ink-light/60 border border-white/5">
                    <FiCheck className="text-gold shrink-0" />
                    <span className="text-white/80 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
              {features.map((f) => (
                <div key={f.key} className={`p-4 rounded-xl border text-center ${room[f.key] ? 'border-gold/30 bg-gold/5' : 'border-white/5 opacity-40'}`}>
                  <f.icon className={`mx-auto mb-2 ${room[f.key] ? 'text-gold' : 'text-white/40'}`} size={20} />
                  <div className="text-xs text-white/70">{f.label}</div>
                </div>
              ))}
            </div>

            {/* Specs table */}
            <div className="card-lux p-6">
              <h3 className="font-serif text-xl text-white mb-5">Room Specifications</h3>
              <dl className="grid sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                <Spec label="Category" value={room.category} />
                <Spec label="Bed Type" value={room.bedType || room.beds} />
                <Spec label="Room Size" value={room.size || '—'} />
                <Spec label="Bathroom" value={room.bathroom} />
                <Spec label="Max Guests" value={`${room.guests} Guests`} />
                <Spec label="View" value={room.view || '—'} />
              </dl>
            </div>

            {/* Reviews */}
            {room.reviews?.length > 0 && (
              <div className="mt-10">
                <h3 className="font-serif text-2xl text-white mb-6">
                  Guest Reviews
                  <span className="ml-3 text-gold text-base">({room.reviews.length})</span>
                </h3>
                <div className="space-y-4">
                  {room.reviews.map((r) => (
                    <div key={r.id} className="card-lux p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={r.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.user?.name || 'Guest')}&background=C9A227&color=0E0E0E`}
                          alt={r.user?.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-white font-medium">{r.user?.name || 'Anonymous'}</div>
                            <div className="flex gap-1">
                              {Array.from({ length: r.rating }).map((_, i) => (
                                <FiStar key={i} className="text-gold fill-gold" size={14} />
                              ))}
                            </div>
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed">{r.comment}</p>
                          <div className="text-white/40 text-xs mt-2">{new Date(r.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: booking widget */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="card-lux p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-serif text-xl text-white">Book this room</h3>
                <div className="text-gold font-serif text-2xl">{formatCurrency(room.price)}<span className="text-xs text-white/50">/night</span></div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Check-in</label>
                    <input type="date" min={todayISO()} value={booking.checkIn} onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })} className="input-lux !py-2.5" />
                  </div>
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Check-out</label>
                    <input type="date" min={booking.checkIn} value={booking.checkOut} onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })} className="input-lux !py-2.5" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Adults</label>
                    <select value={booking.adults} onChange={(e) => setBooking({ ...booking, adults: Number(e.target.value) })} className="input-lux !py-2.5">
                      {[1, 2, 3, 4, 5].map((n) => (<option key={n} value={n} className="bg-ink">{n}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Children</label>
                    <select value={booking.children} onChange={(e) => setBooking({ ...booking, children: Number(e.target.value) })} className="input-lux !py-2.5">
                      {[0, 1, 2, 3].map((n) => (<option key={n} value={n} className="bg-ink">{n}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Special Request</label>
                  <textarea
                    rows={3}
                    placeholder="Airport pickup, dietary needs, early check-in..."
                    value={booking.specialRequest}
                    onChange={(e) => setBooking({ ...booking, specialRequest: e.target.value })}
                    className="input-lux resize-none"
                  />
                </div>
              </div>

              <div className="border-t border-white/5 mt-5 pt-5">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/60">{formatCurrency(room.price)} × {nights} nights</span>
                  <span className="text-white">{formatCurrency(room.price * nights)}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/60">Taxes & fees (10%)</span>
                  <span className="text-white">{formatCurrency(room.price * nights * 0.1)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3">
                  <span className="text-white font-medium">Total</span>
                  <span className="font-serif text-2xl text-gold">{formatCurrency(totalPrice * 1.1)}</span>
                </div>
              </div>

              <button onClick={handleBook} className="btn-primary w-full mt-5">
                Book Now <FiArrowRight />
              </button>
              <p className="text-center text-xs text-white/40 mt-3">You won't be charged yet</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-gold hover:border-gold transition-colors" onClick={() => setLightbox(null)}>
              <FiX size={20} />
            </button>
            <motion.img
              src={lightbox} alt="Room"
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              className="max-w-full max-h-[85vh] rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Spec({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-2">
      <dt className="text-white/50">{label}</dt>
      <dd className="text-white font-medium">{value}</dd>
    </div>
  )
}
