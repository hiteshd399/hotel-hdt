import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageLoader from '../components/ui/PageLoader'

/**
 * ProtectedRoute — guards routes that require auth (and optionally admin role).
 */
export default function ProtectedRoute({ children, admin = false }) {
  const { user, loading, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (admin && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
