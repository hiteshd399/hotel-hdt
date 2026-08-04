import { Link } from 'react-router-dom'
import { FiCalendar, FiClock, FiDollarSign, FiTrendingUp, FiArrowRight } from 'react-icons/fi'
import CustomerLayout from '../../components/customer/CustomerLayout'
import useFetch from '../../hooks/useFetch'
import { formatCurrency, formatDate, statusColor } from '../../utils/format'

export default function CustomerDashboard() {
  const { data, loading } = useFetch('/bookings', { limit: 5 }, [])
  const bookings = data?.data || []

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: FiCalendar },
    { label: 'Upcoming Stays', value: bookings.filter(b => b.status === 'approved' && new Date(b.checkIn) > new Date()).length, icon: FiClock },
    { label: 'Total Spent', value: formatCurrency(bookings.reduce((s, b) => s + (b.totalPrice || 0), 0)), icon: FiDollarSign },
    { label: 'Pending Approval', value: bookings.filter(b => b.status === 'pending').length, icon: FiTrendingUp },
  ]

  return (
    <CustomerLayout title="My Dashboard">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={s.label} className="card-lux p-5">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-3">
              <s.icon size={18} />
            </div>
            <div className="text-2xl font-serif text-white">{s.value}</div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="card-lux p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl text-white">Recent Bookings</h2>
          <Link to="/dashboard/bookings" className="text-sm text-gold hover:underline flex items-center gap-1">
            View All <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-20 !rounded-xl" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-white/40 mb-4">No bookings yet</div>
            <Link to="/rooms" className="btn-primary">Browse Rooms</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-ink-light/60 border border-white/5">
                <img src={b.room?.images?.[0]} alt={b.room?.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-[200px]">
                  <div className="text-white font-medium">{b.room?.name}</div>
                  <div className="text-white/50 text-xs">{formatDate(b.checkIn)} → {formatDate(b.checkOut)}</div>
                </div>
                <div className="text-right">
                  <div className="text-gold font-serif">{formatCurrency(b.totalPrice)}</div>
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${statusColor(b.status)}`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  )
}
