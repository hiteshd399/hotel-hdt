import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiUser, FiLogOut, FiGrid, FiCalendar } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Restaurant', path: '/restaurant' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Offers', path: '/offers' },
  { name: 'Events', path: '/events' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink/85 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="container-lux flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center bg-ink/60 backdrop-blur-sm group-hover:border-gold transition-all duration-500">
                <span className="font-serif text-gold text-xl font-bold">H</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="hidden sm:block leading-none">
              <div className="font-serif text-xl text-white tracking-wide">Hotel HDT</div>
              <div className="text-[10px] text-gold/70 tracking-[0.3em] uppercase mt-1">Kathmandu</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => {
              const active = location.pathname === l.path
              return (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className={`text-sm tracking-wide transition-colors duration-300 link-underline ${
                      active ? 'text-gold' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {l.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link to="/book" className="hidden md:inline-flex btn-primary !px-6 !py-2.5 !text-xs">
              Book Now
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-10 h-10 rounded-full bg-ink-light border border-white/10 hover:border-gold/40 flex items-center justify-center transition-all"
                  aria-label="Account menu"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <FiUser className="text-gold" />
                  )}
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 glass-dark rounded-xl p-2 shadow-card"
                    >
                      <div className="px-3 py-2 border-b border-white/5">
                        <div className="text-white text-sm font-medium truncate">{user.name}</div>
                        <div className="text-white/50 text-xs truncate">{user.email}</div>
                      </div>
                      <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/80 hover:text-gold hover:bg-white/5 rounded-lg transition-colors">
                        <FiGrid /> Dashboard
                      </Link>
                      {!isAdmin && (
                        <Link to="/dashboard/bookings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/80 hover:text-gold hover:bg-white/5 rounded-lg transition-colors">
                          <FiCalendar /> My Bookings
                        </Link>
                      )}
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                        <FiLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden md:inline-flex btn-ghost">
                Login
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-gold/40 transition-all"
              aria-label="Toggle menu"
            >
              {open ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-ink-light border-l border-white/5 p-6 pt-24 overflow-y-auto"
            >
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={l.path}
                      className={`block py-3 px-4 rounded-lg text-lg font-serif transition-colors ${
                        location.pathname === l.path ? 'text-gold bg-white/5' : 'text-white/80 hover:text-gold'
                      }`}
                    >
                      {l.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 space-y-3">
                <Link to="/book" className="btn-primary w-full">Book Now</Link>
                {!user && (
                  <Link to="/login" className="btn-outline w-full">Login</Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
