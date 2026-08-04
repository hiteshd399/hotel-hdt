import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiHome, FiCalendar, FiDollarSign, FiStar, FiMail, FiArrowRight, FiTrendingUp } from 'react-icons/fi'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import { formatCurrency, formatDate, statusColor } from '../../utils/format'

export default function AdminDashboard() {
  const { data, loading } = useFetch('/stats', {}, [])
  const stats = data?.data

  const cards = [
    { label: 'Total Revenue', value: formatCurrency(stats?.totalRevenue || 0), icon: FiDollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: FiCalendar, color: 'text-gold', bg: 'bg-gold/10 border-gold/20' },
    { label: 'Pending Approvals', value: stats?.pendingBookings || 0, icon: FiTrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: FiUsers, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
    { label: 'Total Rooms', value: stats?.totalRooms || 0, icon: FiHome, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
    { label: 'Pending Reviews', value: stats?.pendingReviews || 0, icon: FiStar, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20' },
    { label: 'Unread Contacts', value: stats?.unresolvedContacts || 0, icon: FiMail, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
    { label: 'Menu Items', value: stats?.totalMenuItems || 0, icon: FiHome, color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
  ]

  return (
    <AdminLayout title="Admin Dashboard">
      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-32 !rounded-2xl" />
          ))
        ) : (
          cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-lux p-5"
            >
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${card.bg} ${card.color}`}>
                <card.icon size={18} />
              </div>
              <div className="text-2xl font-serif text-white">{card.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{card.label}</div>
            </motion.div>
          ))
        )}
      </div>

      {/* Chart */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="card-lux p-6">
          <h3 className="font-serif text-xl text-white mb-5">Bookings — Last 7 Days</h3>
          <div className="flex items-end gap-2 h-48">
            {stats?.chart?.map((d) => {
              const max = Math.max(...(stats?.chart?.map(c => c.bookings) || [1]), 1)
              const h = (d.bookings / max) * 100
              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gold/10 rounded-t-lg relative overflow-hidden" style={{ height: `${h}%`, minHeight: '4px' }}>
                    <div className="absolute inset-0 bg-gold-gradient opacity-80" />
                  </div>
                  <div className="text-[10px] text-white/40">{new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="text-xs text-white font-medium">{d.bookings}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card-lux p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Room', path: '/admin/rooms', icon: FiHome },
              { label: 'View Bookings', path: '/admin/bookings', icon: FiCalendar },
              { label: 'Manage Menu', path: '/admin/menu', icon: FiStar },
              { label: 'Add Offer', path: '/admin/offers', icon: FiTrendingUp },
            ].map((a) => (
              <Link key={a.path} to={a.path} className="p-4 rounded-xl bg-ink-light/60 border border-white/5 hover:border-gold/30 transition-colors group">
                <a.icon className="text-gold mb-2" size={18} />
                <div className="text-white text-sm">{a.label}</div>
                <FiArrowRight className="text-white/40 group-hover:text-gold transition-colors mt-1" size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent bookings */}
      <RecentBookings />
    </AdminLayout>
  )
}

function RecentBookings() {
  const { data, loading } = useFetch('/bookings', { limit: 5 }, [])
  const bookings = data?.data || []

  return (
    <div className="card-lux p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif text-xl text-white">Recent Bookings</h3>
        <Link to="/admin/bookings" className="text-sm text-gold hover:underline flex items-center gap-1">
          View All <FiArrowRight />
        </Link>
      </div>
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-16 !rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="text-left py-3">Guest</th>
                <th className="text-left py-3">Room</th>
                <th className="text-left py-3 hidden md:table-cell">Dates</th>
                <th className="text-right py-3">Total</th>
                <th className="text-right py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3">
                    <div className="text-white">{b.user?.name}</div>
                    <div className="text-white/40 text-xs">{b.user?.email}</div>
                  </td>
                  <td className="py-3 text-white/80">{b.room?.name}</td>
                  <td className="py-3 text-white/60 hidden md:table-cell text-xs">
                    {formatDate(b.checkIn)} → {formatDate(b.checkOut)}
                  </td>
                  <td className="py-3 text-right text-gold font-medium">{formatCurrency(b.totalPrice)}</td>
                  <td className="py-3 text-right">
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${statusColor(b.status)}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
