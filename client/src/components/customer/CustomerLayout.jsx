import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGrid, FiCalendar, FiUser, FiLogOut, FiHome } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const customerNav = [
  { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
  { name: 'My Bookings', path: '/dashboard/bookings', icon: FiCalendar },
  { name: 'Profile', path: '/dashboard/profile', icon: FiUser },
]

export default function CustomerLayout({ children, title }) {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-lux grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="card-lux p-6">
            <div className="flex items-center gap-3 pb-5 mb-5 border-b border-white/5">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif text-lg">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-white font-medium truncate">{user?.name}</div>
                <div className="text-white/50 text-xs truncate">{user?.email}</div>
              </div>
            </div>

            <nav className="space-y-1">
              {customerNav.map((item) => {
                const active = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                      active ? 'bg-gold/10 text-gold border border-gold/30' : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon size={16} /> {item.name}
                  </Link>
                )
              })}
              <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white">
                <FiHome size={16} /> Back to Site
              </Link>
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10">
                <FiLogOut size={16} /> Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-6">{title}</h1>
          {children}
        </motion.div>
      </div>
    </div>
  )
}
