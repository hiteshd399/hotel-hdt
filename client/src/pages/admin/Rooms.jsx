import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatCurrency } from '../../utils/format'

const CATEGORIES = ['Deluxe', 'Superior', 'Executive', 'Suite', 'Presidential Suite']

export default function AdminRooms() {
  const { data, loading, refetch } = useFetch('/rooms', { limit: 100 }, [])
  const rooms = data?.data || []
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id) => {
    if (!confirm('Delete this room permanently?')) return
    try {
      await api.delete(`/rooms/${id}`)
      toast.success('Room deleted')
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <AdminLayout title="Manage Rooms">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/60">{rooms.length} rooms total</p>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary">
          <FiPlus /> Add Room
        </button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-64 !rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-lux overflow-hidden"
            >
              <div className="relative aspect-[4/3]">
                <img src={room.images?.[0]} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button onClick={() => { setEditing(room); setShowForm(true) }} className="w-8 h-8 rounded-lg bg-ink/80 backdrop-blur flex items-center justify-center text-white hover:text-gold transition-colors">
                    <FiEdit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(room.id)} className="w-8 h-8 rounded-lg bg-ink/80 backdrop-blur flex items-center justify-center text-white hover:text-rose-400 transition-colors">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-gold uppercase tracking-wider mb-1">{room.category}</div>
                <h3 className="font-serif text-lg text-white mb-2">{room.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">{room.guests} Guests · {room.beds}</span>
                  <span className="text-gold font-medium">{formatCurrency(room.price)}/night</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <RoomForm
            room={editing}
            onClose={() => setShowForm(false)}
            onSaved={() => { setShowForm(false); refetch() }}
          />
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}

function RoomForm({ room, onClose, onSaved }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: room ? {
      ...room,
      images: room.images?.join('\n') || '',
      features: room.features?.join('\n') || '',
    } : {
      category: 'Deluxe',
      guests: 2,
      beds: '1 King Bed',
      bathroom: 'Ensuite',
      tv: true,
      wifi: true,
      ac: true,
      minibar: false,
      available: true,
      count: 1,
      price: 100,
    },
  })

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      price: Number(data.price),
      guests: Number(data.guests),
      count: Number(data.count),
      tv: !!data.tv,
      wifi: !!data.wifi,
      ac: !!data.ac,
      minibar: !!data.minibar,
      available: !!data.available,
      images: data.images ? data.images.split('\n').map(s => s.trim()).filter(Boolean) : [],
      features: data.features ? data.features.split('\n').map(s => s.trim()).filter(Boolean) : [],
    }
    try {
      if (room) {
        await api.put(`/rooms/${room.id}`, payload)
        toast.success('Room updated')
      } else {
        await api.post('/rooms', payload)
        toast.success('Room created')
      }
      onSaved()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-ink-light border border-white/10 rounded-3xl p-7 max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-white">{room ? 'Edit Room' : 'Add New Room'}</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-gold">
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Room Name">
              <input type="text" required className="input-lux" {...register('name', { required: true })} />
            </Field>
            <Field label="Category">
              <select className="input-lux" {...register('category')}>
                {CATEGORIES.map((c) => <option key={c} value={c} className="bg-ink">{c}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Description">
            <textarea rows={3} className="input-lux resize-none" {...register('description', { required: true })} />
          </Field>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Price / night ($)">
              <input type="number" step="0.01" className="input-lux" {...register('price', { required: true })} />
            </Field>
            <Field label="Max Guests">
              <input type="number" className="input-lux" {...register('guests', { required: true })} />
            </Field>
            <Field label="Inventory Count">
              <input type="number" className="input-lux" {...register('count')} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Beds">
              <input type="text" className="input-lux" placeholder="1 King Bed" {...register('beds')} />
            </Field>
            <Field label="Size">
              <input type="text" className="input-lux" placeholder="32 sqm" {...register('size')} />
            </Field>
            <Field label="Bathroom">
              <input type="text" className="input-lux" {...register('bathroom')} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Bed Type">
              <input type="text" className="input-lux" placeholder="King" {...register('bedType')} />
            </Field>
            <Field label="View">
              <input type="text" className="input-lux" placeholder="Mountain View" {...register('view')} />
            </Field>
          </div>

          <Field label="Image URLs (one per line)">
            <textarea rows={3} className="input-lux resize-none font-mono text-xs" placeholder="https://..." {...register('images')} />
          </Field>

          <Field label="Features (one per line)">
            <textarea rows={3} className="input-lux resize-none" placeholder="Free WiFi&#10;Smart TV&#10;Mini Bar" {...register('features')} />
          </Field>

          <div className="flex flex-wrap gap-4">
            {['wifi', 'tv', 'ac', 'minibar', 'available'].map((f) => (
              <label key={f} className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-transparent text-gold focus:ring-gold" {...register(f)} />
                <span className="capitalize">{f}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isSubmitting ? 'Saving...' : 'Save Room'}
            </button>
            <button type="button" onClick={onClose} className="btn-dark">Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
