import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import PageLoader from './components/ui/PageLoader'
import ProtectedRoute from './routes/ProtectedRoute'
import PageTransition from './components/layout/PageTransition'

// Pages — lazy load for code splitting
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Rooms = lazy(() => import('./pages/Rooms'))
const RoomDetails = lazy(() => import('./pages/RoomDetails'))
const Restaurant = lazy(() => import('./pages/Restaurant'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Offers = lazy(() => import('./pages/Offers'))
const Events = lazy(() => import('./pages/Events'))
const Contact = lazy(() => import('./pages/Contact'))
const BookNow = lazy(() => import('./pages/BookNow'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Customer dashboard
const CustomerDashboard = lazy(() => import('./pages/customer/Dashboard'))
const MyBookings = lazy(() => import('./pages/customer/MyBookings'))
const Profile = lazy(() => import('./pages/customer/Profile'))

// Admin dashboard
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminRooms = lazy(() => import('./pages/admin/Rooms'))
const AdminBookings = lazy(() => import('./pages/admin/Bookings'))
const AdminUsers = lazy(() => import('./pages/admin/Users'))
const AdminReviews = lazy(() => import('./pages/admin/Reviews'))
const AdminGallery = lazy(() => import('./pages/admin/Gallery'))
const AdminMenu = lazy(() => import('./pages/admin/Menu'))
const AdminOffers = lazy(() => import('./pages/admin/Offers'))
const AdminEvents = lazy(() => import('./pages/admin/Events'))
const AdminContacts = lazy(() => import('./pages/admin/Contacts'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/rooms" element={<PageTransition><Rooms /></PageTransition>} />
            <Route path="/rooms/:slug" element={<PageTransition><RoomDetails /></PageTransition>} />
            <Route path="/restaurant" element={<PageTransition><Restaurant /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
            <Route path="/offers" element={<PageTransition><Offers /></PageTransition>} />
            <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/book" element={<PageTransition><BookNow /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

            {/* Customer routes */}
            <Route path="/dashboard" element={<ProtectedRoute><PageTransition><CustomerDashboard /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/bookings" element={<ProtectedRoute><PageTransition><MyBookings /></PageTransition></ProtectedRoute>} />
            <Route path="/dashboard/profile" element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />

            {/* Admin routes */}
            <Route path="/admin" element={<ProtectedRoute admin><PageTransition><AdminDashboard /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/rooms" element={<ProtectedRoute admin><PageTransition><AdminRooms /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute admin><PageTransition><AdminBookings /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute admin><PageTransition><AdminUsers /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/reviews" element={<ProtectedRoute admin><PageTransition><AdminReviews /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute admin><PageTransition><AdminGallery /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/menu" element={<ProtectedRoute admin><PageTransition><AdminMenu /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/offers" element={<ProtectedRoute admin><PageTransition><AdminOffers /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute admin><PageTransition><AdminEvents /></PageTransition></ProtectedRoute>} />
            <Route path="/admin/contacts" element={<ProtectedRoute admin><PageTransition><AdminContacts /></PageTransition></ProtectedRoute>} />

            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
