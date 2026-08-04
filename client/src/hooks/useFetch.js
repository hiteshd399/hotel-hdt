import { useEffect, useState } from 'react'
import api from '../utils/axios'

/**
 * Generic data fetcher hook.
 * Usage: const { data, loading, error, refetch } = useFetch('/rooms', { page: 1 })
 */
export default function useFetch(url, params = {}, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data: res } = await api.get(url, { params })
      setData(res)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error, refetch: fetchData, setData }
}
