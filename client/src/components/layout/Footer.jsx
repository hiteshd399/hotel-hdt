import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiFacebook, FiTwitter, FiYoutube } from 'react-icons/fi'

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Rooms & Suites', path: '/rooms' },
  { name: 'Restaurant', path: '/restaurant' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Offers', path: '/offers' },
  { name: 'Events', path: '/events' },
  { name: 'Contact', path: '/contact' },
]

const amenities = ['Free WiFi', 'Airport Pickup', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Parking', 'Conference Hall', 'Swimming Pool']

export default function Footer() {
  return (
    <footer className="bg-ink-light border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-lux relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center bg-ink/60">
                <span className="font-serif text-gold text-2xl font-bold">H</span>
              </div>
              <div className="leading-none">
                <div className="font-serif text-2xl text-white">Hotel HDT</div>
                <div className="text-[10px] text-gold/70 tracking-[0.3em] uppercase mt-1">Kathmandu</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              A premium luxury hotel in Kathmandu offering elegant rooms, rooftop dining, conference halls, airport pickup, and unforgettable hospitality.
            </p>
            <div className="flex gap-3">
              {[FiInstagram, FiFacebook, FiTwitter, FiYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-gold hover:bg-gold hover:text-ink flex items-center justify-center text-white/70 transition-all duration-300"
                  aria-label="social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-serif text-lg mb-5">Explore</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-white/60 hover:text-gold transition-colors link-underline">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-white font-serif text-lg mb-5">Amenities</h4>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2.5">
              {amenities.map((a) => (
                <li key={a} className="text-sm text-white/60 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-serif text-lg mb-5">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-white/60">
                <FiMapPin className="text-gold mt-1 shrink-0" />
                <span>Hotel HDT, Durbar Marg, Kathmandu 44600, Nepal</span>
              </li>
              <li>
                <a href="tel:+9779800000000" className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors">
                  <FiPhone className="text-gold shrink-0" />
                  +977-98XXXXXXXX
                </a>
              </li>
              <li>
                <a href="mailto:info@hotelhdt.com" className="flex items-center gap-3 text-white/60 hover:text-gold transition-colors">
                  <FiMail className="text-gold shrink-0" />
                  info@hotelhdt.com
                </a>
              </li>
            </ul>
            <Link to="/book" className="btn-primary mt-6 w-full">Reserve Your Stay</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Hotel HDT. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
          <p className="text-white/30">Crafted with passion in Kathmandu</p>
        </div>
      </div>
    </footer>
  )
}
