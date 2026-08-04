import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiUsers, FiCheck, FiArrowRight, FiCreditCard } from 'react-icons/fi'
import toast from 'react-hot-toast'
import PageHeader from '../components/ui/PageHeader'
import useFetch from '../hooks/useFetch'
import api from '../utils/axios'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, todayISO, nightsBetween } from '../utils/format'

export default function BookNow() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: roomsData, loading: roomsLoading } = useFetch('/rooms', { limit: 100 }, [])
  const rooms = roomsData?.data || []

  const [form, setForm] = useState({
    roomId: params.get('roomId') || '',
    checkIn: params.get('checkIn') || todayISO(1),
    checkOut: params.get('checkOut') || todayISO(3),
    adults: Number(params.get('adults')) || 2,
    children: Number(params.get('children')) || 0,
    specialRequest: '',
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      setForm((f) => ({ ...f, guestName: user.name, guestEmail: user.email, guestPhone: user.phone || '' }))
    }
  }, [user])

  const selectedRoom = rooms.find((r) => r.id === form.roomId)
  const nights = nightsBetween(form.checkIn, form.checkOut)
  const subtotal = selectedRoom ? selectedRoom.price * nights : 0
  const taxes = subtotal * 0.1
  const total = subtotal + taxes

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login to book')
      navigate('/login', { state: { from: '/book' } })
      return
    }
    if (!form.roomId) {
      toast.error('Please select a room')
      return
    }
    if (nights < 1) {
      toast.error('Check-out must be after check-in')
      return
    }
    setSubmitting(true)
    try {
      await api.post('/bookings', {
        roomId: form.roomId,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        adults: form.adults,
        children: form.children,
        specialRequest: form.specialRequest,
      })
      toast.success('Booking created! A confirmation email is on its way.')
      navigate('/dashboard/bookings')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        subtitle="Reserve Your Stay"
        title="Book Your Sanctuary"
        description="Select your dates and room — we'll handle the rest. Your Himalayan escape awaits."
        image="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
        breadcrumb={[{ name: 'Book Now' }]}
      />

      <section className="py-20 md:py-24">
        <div className="container-lux grid lg:grid-cols-[1fr_400px] gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest info */}
            <div className="card-lux p-7">
              <h3 className="font-serif text-2xl text-white mb-5">Guest Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name">
                  <input type="text" required value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} className="input-lux" placeholder="John Doe" />
                </Field>
                <Field label="Email">
                  <input type="email" required value={form.guestEmail} onChange={(e) => setForm({ ...form, guestEmail: e.target.value })} className="input-lux" placeholder="you@example.com" />
                </Field>
                <Field label="Phone">
                  <input type="text" value={form.guestPhone} onChange={(e) => setForm({ ...form, guestPhone: e.target.value })} className="input-lux" placeholder="+977-98XXXXXXXX" />
                </Field>
              </div>
            </div>

            {/* Dates & guests */}
            <div className="card-lux p-7">
              <h3 className="font-serif text-2xl text-white mb-5">Stay Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Check-in">
                  <input type="date" min={todayISO()} value={form.checkIn} onChange={(e) => setForm({ ...form, checkIn: e.target.value })} className="input-lux" />
                </Field>
                <Field label="Check-out">
                  <input type="date" min={form.checkIn} value={form.checkOut} onChange={(e) => setForm({ ...form, checkOut: e.target.value })} className="input-lux" />
                </Field>
                <Field label="Adults">
                  <select value={form.adults} onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })} className="input-lux">
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n} className="bg-ink">{n} Adult{n > 1 ? 's' : ''}</option>)}
                  </select>
                </Field>
                <Field label="Children">
                  <select value={form.children} onChange={(e) => setForm({ ...form, children: Number(e.target.value) })} className="input-lux">
                    {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n} className="bg-ink">{n} Children</option>)}
                  </select>
                </Field>
              </div>
            </div>

            {/* Room selection */}
            <div className="card-lux p-7">
              <h3 className="font-serif text-2xl text-white mb-5">Select Your Room</h3>
              {roomsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="skeleton h-20 !rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {rooms.map((room) => (
                    <label
                      key={room.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        form.roomId === room.id
                          ? 'border-gold bg-gold/5'
                          : 'border-white/10 hover:border-gold/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="room"
                        value={room.id}
                        checked={form.roomId === room.id}
                        onChange={(e) => setForm({ ...form, roomId: e.target.value })}
                        className="text-gold focus:ring-gold"
                      />
                      <img src={room.images?.[0]} alt={room.name} className="w-20 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="text-white font-medium">{room.name}</div>
                        <div className="text-white/50 text-xs">{room.category} · {room.guests} Guests · {room.beds}</div>
                      </div>
                      <div className="text-gold font-serif text-lg">{formatCurrency(room.price)}<span className="text-xs text-white/40">/night</span></div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Special request */}
            <div className="card-lux p-7">
              <h3 className="font-serif text-2xl text-white mb-5">Special Requests</h3>
              <textarea
                rows={4}
                value={form.specialRequest}
                onChange={(e) => setForm({ ...form, specialRequest: e.target.value })}
                placeholder="Airport pickup, early check-in, dietary preferences, anniversary surprise..."
                className="input-lux resize-none"
              />
              <p className="text-xs text-white/40 mt-2">We'll do our best to accommodate your requests.</p>
            </div>
          </form>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="card-lux p-6">
              <h3 className="font-serif text-xl text-white mb-5">Booking Summary</h3>

              {selectedRoom ? (
                <div className="space-y-4">
                  <div className="flex gap-3 pb-4 border-b border-white/5">
                    <img src={selectedRoom.images?.[0]} alt={selectedRoom.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div>
                      <div className="text-white font-medium">{selectedRoom.name}</div>
                      <div className="text-white/50 text-xs">{selectedRoom.category}</div>
                      <div className="text-gold text-sm mt-1">{formatCurrency(selectedRoom.price)} / night</div>
                    </div>
                  </div>

                  <Row label="Check-in" value={new Date(form.checkIn).toLocaleDateString()} />
                  <Row label="Check-out" value={new Date(form.checkOut).toLocaleDateString()} />
                  <Row label="Nights" value={nights} />
                  <Row label="Guests" value={`${form.adults} Adults, ${form.children} Children`} />

                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <Row label={`Room × ${nights} nights`} value={formatCurrency(subtotal)} />
                    <Row label="Taxes & fees (10%)" value={formatCurrency(taxes)} />
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-white font-medium">Total</span>
                      <span className="font-serif text-3xl text-gold">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <button onClick={handleSubmit} disabled={submitting} className="btn-primary w-full mt-4">
                    {submitting ? 'Processing...' : <>Confirm Booking <FiArrowRight /></>}
                  </button>

                  <div className="text-xs text-white/40 text-center space-y-1">
                    <div className="flex items-center justify-center gap-1.5"><FiCheck className="text-gold" /> Free cancellation up to 48 hours</div>
                    <div className="flex items-center justify-center gap-1.5"><FiCreditCard className="text-gold" /> Pay at hotel</div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-white/50 text-sm">
                  Select a room to see booking summary
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/60">{label}</span>
      <span className="text-white">{value}</span>
    </div>
  )
}
