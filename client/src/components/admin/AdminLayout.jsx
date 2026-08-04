import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiGrid, FiHome, FiCalendar, FiUsers, FiStar,
  FiImage, FiCoffee, FiTag, FiCalendar as FiEvent, FiMail, FiLogOut
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const nav = [
  { name: 'Dashboard', path: '/admin', icon: FiGrid },
  { name: 'Rooms', path: '/admin/rooms', icon: FiHome },
  { name: 'Bookings', path: '/admin/bookings', icon: FiCalendar },
  { name: 'Users', path: '/admin/users', icon: FiUsers },
  { name: 'Reviews', path: '/admin/reviews', icon: FiStar },
  { name: 'Gallery', path: '/admin/gallery', icon: FiImage },
  { name: 'Menu', path: '/admin/menu', icon: FiCoffee },
  { name: 'Offers', path: '/admin/offers', icon: FiTag },
  { name: 'Events', path: '/admin/events', icon: FiEvent },
  { name: 'Contacts', path: '/admin/contacts', icon: FiMail },
]

export default function AdminLayout({ children, title }) {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container-lux grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 self-start">
          <div className="card-lux p-5">
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/5">
              <div className="w-11 h-11 rounded-full bg-gold-gradient flex items-center justify-center text-ink font-serif text-lg font-bold">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="min-w-0">
                <div className="text-white text-sm font-medium truncate">{user?.name}</div>
                <div className="text-gold text-[10px] uppercase tracking-wider">Administrator</div>
              </div>
            </div>

            <nav className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar">
              {nav.map((item) => {
                const active = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      active ? 'bg-gold/10 text-gold border border-gold/30' : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon size={16} /> {item.name}
                  </Link>
                )
              })}
              <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/5 hover:text-white">
                <FiHome size={16} /> View Site
              </Link>
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10">
                <FiLogOut size={16} /> Logout
              </button>
            </nav>
          </div>
        </aside>

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
