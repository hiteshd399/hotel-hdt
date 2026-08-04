import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import api from '../utils/axios'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch current user on mount (if token exists)
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('hotel_token')
    if (!token) {
      setLoading(false)
      return null
    }
    try {
      const { data } = await api.get('/auth/me')
      setUser(data.data)
      return data.data
    } catch {
      localStorage.removeItem('hotel_token')
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    if (data?.token) localStorage.setItem('hotel_token', data.token)
    setUser(data.data)
    toast.success(`Welcome back, ${data.data.name.split(' ')[0]}!`)
    return data.data
  }

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    if (data?.token) localStorage.setItem('hotel_token', data.token)
    setUser(data.data)
    toast.success('Account created successfully')
    return data.data
  }

  const logout = async () => {
    try {
      await api.get('/auth/logout')
    } catch { /* ignore */ }
    localStorage.removeItem('hotel_token')
    setUser(null)
    toast.success('Logged out')
  }

  const updateUser = (newUser) => setUser(newUser)

  const value = {
    user,
    loading,
    isAdmin: user?.role === 'admin',
    isCustomer: user?.role === 'customer',
    login,
    register,
    logout,
    updateUser,
    loadUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
