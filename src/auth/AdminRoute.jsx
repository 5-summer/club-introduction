import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth.js'

function AdminRoute({ children }) {
  const { isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return null
  }

  if (!isAdmin) {
    return <Navigate to="/admin" replace state={{ from: location.pathname }} />
  }

  return children
}

export default AdminRoute
