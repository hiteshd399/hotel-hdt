import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiMapPin, FiUsers } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatDate, todayISO } from '../../utils/format'

export default function AdminEvents() {
  const { data, loading, refetch } = useFetch('/events', {}, [])
  const events = data?.data || []
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return
    try {
      await api.delete(`/events/${id}`)
      toast.success('Event deleted')
      refetch()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <AdminLayout title="Manage Events">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/60">{events.length} events</p>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary"><FiPlus /> Add Event</button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-48 !rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((e) => (
            <div key={e.id} className="card-lux p-5 flex flex-wrap items-center gap-5">
              {e.image && <img src={e.image} alt={e.title} className="w-full sm:w-32 h-32 object-cover rounded-xl" />}
              <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl text-white mb-1">{e.title}</h3>
                <p className="text-white/60 text-sm mb-2 line-clamp-2">{e.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1"><FiMapPin className="text-gold" /> {e.location}</span>
                  <span className="flex items-center gap-1"><FiUsers className="text-gold" /> {e.capacity}</span>
                  <span>{formatDate(e.date, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(e); setShowForm(true) }} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40">
                  <FiEdit2 size={14} />
                </button>
                <button onClick={() => handleDelete(e.id)} className="w-8 h-8 rounded-lg border border-rose-500/30 flex items-center justify-center text-rose-400 hover:bg-rose-500/10">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && <EventForm event={editing} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); refetch() }} />}
      </AnimatePresence>
    </AdminLayout>
  )
}

function EventForm({ event, onClose, onSaved }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: event ? {
      ...event,
      date: event.date?.slice(0, 10),
    } : {
      date: todayISO(7),
      capacity: 100,
      location: 'Rooftop Grand Hall',
    },
  })

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, capacity: Number(data.capacity) }
      if (event) {
        await api.put(`/events/${event.id}`, payload)
        toast.success('Event updated')
      } else {
        await api.post('/events', payload)
        toast.success('Event created')
      }
      onSaved()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.form
        initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="bg-ink-light border border-white/10 rounded-3xl p-7 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl text-white">{event ? 'Edit Event' : 'Add Event'}</h2>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-gold"><FiX /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Title</label>
            <input type="text" required className="input-lux" {...register('title', { required: true })} />
          </div>
          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea rows={3} className="input-lux resize-none" {...register('description', { required: true })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Date</label>
              <input type="date" className="input-lux" {...register('date', { required: true })} />
            </div>
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Capacity</label>
              <input type="number" className="input-lux" {...register('capacity', { required: true })} />
            </div>
          </div>
          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Location</label>
            <input type="text" className="input-lux" {...register('location', { required: true })} />
          </div>
          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Image URL</label>
            <input type="text" className="input-lux" {...register('image')} />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-5">
          {isSubmitting ? 'Saving...' : 'Save Event'}
        </button>
      </motion.form>
    </motion.div>
  )
}
