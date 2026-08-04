import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'
import CustomerLayout from '../../components/customer/CustomerLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatCurrency, formatDate, statusColor } from '../../utils/format'

export default function MyBookings() {
  const { data, loading, refetch } = useFetch('/bookings', { limit: 50 }, [])
  const bookings = data?.data || []
  const [filter, setFilter] = useState('all')
  const [canceling, setCanceling] = useState(null)

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    setCanceling(id)
    try {
      await api.delete(`/bookings/${id}`)
      toast.success('Booking cancelled')
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel')
    } finally {
      setCanceling(null)
    }
  }

  return (
    <CustomerLayout title="My Bookings">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'approved', 'completed', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
              filter === f ? 'bg-gold text-ink font-medium' : 'border border-white/10 text-white/70 hover:border-gold/40 hover:text-gold'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-32 !rounded-2xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-lux p-12 text-center">
          <div className="text-5xl mb-4">🏨</div>
          <h3 className="font-serif text-2xl text-white mb-2">No bookings found</h3>
          <p className="text-white/50">You have no {filter !== 'all' ? filter : ''} bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-lux p-6"
            >
              <div className="flex flex-wrap gap-5">
                <img src={b.room?.images?.[0]} alt={b.room?.name} className="w-full sm:w-40 h-32 object-cover rounded-xl" />
                <div className="flex-1 min-w-[240px]">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-serif text-xl text-white">{b.room?.name}</h3>
                      <div className="text-white/50 text-xs">{b.room?.category}</div>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusColor(b.status)}`}>{b.status}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-sm">
                    <Info label="Check-in" value={formatDate(b.checkIn)} />
                    <Info label="Check-out" value={formatDate(b.checkOut)} />
                    <Info label="Nights" value={b.nights} />
                    <Info label="Guests" value={`${b.adults}+${b.children}`} />
                  </div>

                  {b.specialRequest && (
                    <div className="mt-3 text-xs text-white/50">
                      <span className="text-gold">Note:</span> {b.specialRequest}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-between items-end gap-3">
                  <div className="text-right">
                    <div className="text-gold font-serif text-2xl">{formatCurrency(b.totalPrice)}</div>
                    <div className="text-white/40 text-xs">{formatCurrency(b.pricePerNight)} × {b.nights}</div>
                  </div>
                  {(b.status === 'pending' || b.status === 'approved') && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      disabled={canceling === b.id}
                      className="text-rose-400 hover:bg-rose-500/10 px-3 py-2 rounded-lg text-xs flex items-center gap-1 transition-colors"
                    >
                      <FiX /> {canceling === b.id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </CustomerLayout>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-white/40 text-xs uppercase tracking-wider">{label}</div>
      <div className="text-white text-sm">{value}</div>
    </div>
  )
}
