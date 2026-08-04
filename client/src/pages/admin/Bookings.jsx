import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiX, FiEye } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatCurrency, formatDate, statusColor } from '../../utils/format'

export default function AdminBookings() {
  const { data, loading, refetch } = useFetch('/bookings', { limit: 100 }, [])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const bookings = data?.data || []
  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}/status`, { status })
      toast.success(`Booking ${status}`)
      refetch()
      if (selected?.id === id) setSelected(null)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  return (
    <AdminLayout title="Manage Bookings">
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'approved', 'cancelled', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all ${
              filter === f ? 'bg-gold text-ink font-medium' : 'border border-white/10 text-white/70 hover:border-gold/40 hover:text-gold'
            }`}
          >
            {f} {f !== 'all' && `(${bookings.filter(b => b.status === f).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton h-20 !rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-lux p-12 text-center text-white/50">No {filter} bookings</div>
      ) : (
        <div className="card-lux overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-light/60">
                <tr className="text-white/40 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3">Guest</th>
                  <th className="text-left px-5 py-3 hidden md:table-cell">Room</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Dates</th>
                  <th className="text-right px-5 py-3">Total</th>
                  <th className="text-center px-5 py-3">Status</th>
                  <th className="text-right px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-5 py-4">
                      <div className="text-white">{b.user?.name}</div>
                      <div className="text-white/40 text-xs">{b.user?.email}</div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <div className="text-white/80">{b.room?.name}</div>
                      <div className="text-white/40 text-xs">{b.room?.category}</div>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-white/60 text-xs">
                      {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                      <div className="text-white/40">{b.nights} nights · {b.guestsTotal} guests</div>
                    </td>
                    <td className="px-5 py-4 text-right text-gold font-medium">{formatCurrency(b.totalPrice)}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${statusColor(b.status)}`}>{b.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setSelected(b)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40" title="View">
                          <FiEye size={14} />
                        </button>
                        {b.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(b.id, 'approved')} className="w-8 h-8 rounded-lg border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10" title="Approve">
                              <FiCheck size={14} />
                            </button>
                            <button onClick={() => updateStatus(b.id, 'cancelled')} className="w-8 h-8 rounded-lg border border-rose-500/30 flex items-center justify-center text-rose-400 hover:bg-rose-500/10" title="Cancel">
                              <FiX size={14} />
                            </button>
                          </>
                        )}
                        {b.status === 'approved' && (
                          <button onClick={() => updateStatus(b.id, 'completed')} className="w-8 h-8 rounded-lg border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10" title="Mark Completed">
                            <FiCheck size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }} animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-ink-light border border-white/10 rounded-3xl p-7 max-w-lg w-full"
          >
            <div className="flex items-start justify-between mb-5">
              <h3 className="font-serif text-2xl text-white">Booking Details</h3>
              <button onClick={() => setSelected(null)} className="text-white/60 hover:text-gold"><FiX /></button>
            </div>
            <div className="space-y-3 text-sm">
              <Row label="Booking ID" value={selected.id} />
              <Row label="Guest" value={selected.user?.name} />
              <Row label="Email" value={selected.user?.email} />
              <Row label="Phone" value={selected.user?.phone || '—'} />
              <Row label="Room" value={selected.room?.name} />
              <Row label="Category" value={selected.room?.category} />
              <Row label="Check-in" value={formatDate(selected.checkIn, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
              <Row label="Check-out" value={formatDate(selected.checkOut, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
              <Row label="Nights" value={selected.nights} />
              <Row label="Guests" value={`${selected.adults} Adults, ${selected.children} Children`} />
              <Row label="Price / night" value={formatCurrency(selected.pricePerNight)} />
              <Row label="Total" value={formatCurrency(selected.totalPrice)} highlight />
              <Row label="Status" value={<span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${statusColor(selected.status)}`}>{selected.status}</span>} />
              {selected.specialRequest && (
                <div className="pt-3 border-t border-white/5">
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-1">Special Request</div>
                  <div className="text-white/80">{selected.specialRequest}</div>
                </div>
              )}
            </div>

            {selected.status === 'pending' && (
              <div className="flex gap-2 mt-6">
                <button onClick={() => updateStatus(selected.id, 'approved')} className="btn-primary flex-1 !bg-emerald-500 !text-white">
                  <FiCheck /> Approve
                </button>
                <button onClick={() => updateStatus(selected.id, 'cancelled')} className="btn-dark flex-1 !border-rose-500/30 !text-rose-400">
                  <FiX /> Cancel
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AdminLayout>
  )
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/50">{label}</span>
      <span className={highlight ? 'text-gold font-serif text-lg' : 'text-white'}>{value}</span>
    </div>
  )
}
