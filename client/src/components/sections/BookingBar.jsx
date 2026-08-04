import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiUsers, FiSearch } from 'react-icons/fi'
import { todayISO } from '../../utils/format'
import useFetch from '../../hooks/useFetch'

/**
 * Floating booking bar — appears at the bottom of the hero on Home page.
 */
export default function BookingBar() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    checkIn: todayISO(1),
    checkOut: todayISO(3),
    adults: 2,
    children: 0,
  })

  const { data: roomsData } = useFetch('/rooms', { limit: 100 }, [])
  const rooms = roomsData?.data || []
  const [roomId, setRoomId] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      adults: form.adults,
      children: form.children,
      ...(roomId && { roomId }),
    })
    navigate(`/book?${params.toString()}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="absolute bottom-0 left-0 right-0 z-20 hidden md:block"
    >
      <div className="container-lux">
        <form
          onSubmit={handleSubmit}
          className="glass-dark rounded-t-2xl border-b-0 px-6 py-5 grid grid-cols-1 md:grid-cols-5 gap-3 items-end shadow-card"
        >
          <Field label="Check-in" icon={FiCalendar}>
            <input
              type="date"
              value={form.checkIn}
              min={todayISO()}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              className="input-lux !py-2.5 !bg-transparent !border-white/10"
            />
          </Field>
          <Field label="Check-out" icon={FiCalendar}>
            <input
              type="date"
              value={form.checkOut}
              min={form.checkIn}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              className="input-lux !py-2.5 !bg-transparent !border-white/10"
            />
          </Field>
          <Field label="Adults" icon={FiUsers}>
            <select
              value={form.adults}
              onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
              className="input-lux !py-2.5 !bg-transparent !border-white/10"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="bg-ink">{n} Adult{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </Field>
          <Field label="Room">
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="input-lux !py-2.5 !bg-transparent !border-white/10"
            >
              <option value="" className="bg-ink">Any Room</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id} className="bg-ink">{r.name}</option>
              ))}
            </select>
          </Field>
          <button type="submit" className="btn-primary w-full !py-3.5">
            <FiSearch /> Check Availability
          </button>
        </form>
      </div>
    </motion.div>
  )
}

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.2em] text-gold/80 mb-1.5 flex items-center gap-1.5">
        {Icon && <Icon size={12} />} {label}
      </label>
      {children}
    </div>
  )
}
