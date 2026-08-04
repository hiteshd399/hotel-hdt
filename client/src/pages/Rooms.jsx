import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiSliders, FiX, FiChevronDown } from 'react-icons/fi'
import PageHeader from '../components/ui/PageHeader'
import RoomCard from '../components/ui/RoomCard'
import Skeleton from '../components/ui/Skeleton'
import useFetch from '../hooks/useFetch'
import api from '../utils/axios'

const CATEGORIES = ['Deluxe', 'Superior', 'Executive', 'Suite', 'Presidential Suite']
const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function Rooms() {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState({
    search: params.get('search') || '',
    category: params.get('category') || '',
    minPrice: params.get('minPrice') || '',
    maxPrice: params.get('maxPrice') || '',
    guests: params.get('guests') || '',
    sort: params.get('sort') || 'newest',
    page: Number(params.get('page')) || 1,
  })
  const [rooms, setRooms] = useState([])
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true)
      try {
        const { data } = await api.get('/rooms', {
          params: { ...filters, limit: 9 },
        })
        setRooms(data.data)
        setPagination(data.pagination)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRooms()
    // Sync URL
    const p = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => { if (v) p.set(k, v) })
    setParams(p, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const update = (k, v) => setFilters((f) => ({ ...f, [k]: v, page: k !== 'page' ? 1 : f.page }))
  const reset = () => setFilters({ search: '', category: '', minPrice: '', maxPrice: '', guests: '', sort: 'newest', page: 1 })

  return (
    <>
      <PageHeader
        subtitle="Accommodations"
        title="Rooms & Suites"
        description="Discover our collection of meticulously designed rooms and suites — each a private sanctuary of comfort, elegance, and Himalayan inspiration."
        image="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80"
        breadcrumb={[{ name: 'Rooms' }]}
      />

      <section className="py-20 md:py-24">
        <div className="container-lux">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search rooms..."
                value={filters.search}
                onChange={(e) => update('search', e.target.value)}
                className="input-lux pl-12"
              />
            </div>
            <select
              value={filters.sort}
              onChange={(e) => update('sort', e.target.value)}
              className="input-lux md:w-56"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value} className="bg-ink">{s.label}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-dark md:w-auto"
            >
              <FiSliders /> Filters
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card-lux p-6 mb-10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg">Refine Your Search</h3>
                <button onClick={reset} className="text-sm text-gold hover:underline flex items-center gap-1">
                  <FiX size={14} /> Reset
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-2 block">Category</label>
                  <select value={filters.category} onChange={(e) => update('category', e.target.value)} className="input-lux">
                    <option value="" className="bg-ink">All Categories</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="bg-ink">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-2 block">Min Price</label>
                  <input type="number" placeholder="0" value={filters.minPrice} onChange={(e) => update('minPrice', e.target.value)} className="input-lux" />
                </div>
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-2 block">Max Price</label>
                  <input type="number" placeholder="1000" value={filters.maxPrice} onChange={(e) => update('maxPrice', e.target.value)} className="input-lux" />
                </div>
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-2 block">Guests</label>
                  <select value={filters.guests} onChange={(e) => update('guests', e.target.value)} className="input-lux">
                    <option value="" className="bg-ink">Any</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-ink">{n}+ Guests</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[4/3] !rounded-2xl" />
                  <Skeleton className="h-6 mt-4 w-3/4" />
                  <Skeleton className="h-4 mt-2 w-full" />
                  <Skeleton className="h-4 mt-2 w-1/2" />
                </div>
              ))}
            </div>
          ) : rooms.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-serif text-2xl text-white mb-2">No rooms found</h3>
              <p className="text-white/50 mb-6">Try adjusting your search or filters</p>
              <button onClick={reset} className="btn-primary">Reset Filters</button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room, i) => (
                  <RoomCard key={room.id} room={room} index={i} />
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-14">
                  {Array.from({ length: pagination.pages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => update('page', i + 1)}
                      className={`w-10 h-10 rounded-full text-sm transition-all ${
                        filters.page === i + 1
                          ? 'bg-gold text-ink font-medium'
                          : 'border border-white/10 text-white/60 hover:border-gold/40 hover:text-gold'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
