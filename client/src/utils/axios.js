import axios from 'axios'

// Centralized Axios instance — credentials so cookies are sent with every request
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 20000,
})

// Inject Authorization header from localStorage token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hotel_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Soft clear; let AuthContext pick it up
      localStorage.removeItem('hotel_token')
    }
    return Promise.reject(err)
  }
)

export default api
