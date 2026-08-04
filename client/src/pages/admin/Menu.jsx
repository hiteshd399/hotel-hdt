import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatCurrency } from '../../utils/format'

const CATEGORIES = ['breakfast', 'lunch', 'dinner', 'drinks', 'desserts', 'special']

export default function AdminMenu() {
  const { data, loading, refetch } = useFetch('/restaurant', {}, [])
  const items = data?.data || []
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id) => {
    if (!confirm('Delete this menu item?')) return
    try {
      await api.delete(`/restaurant/${id}`)
      toast.success('Item deleted')
      refetch()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <AdminLayout title="Manage Menu">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/60">{items.length} menu items</p>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary"><FiPlus /> Add Item</button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton h-48 !rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="card-lux overflow-hidden">
              {item.image && <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-serif text-lg text-white">{item.name}</h3>
                  <div className="text-gold font-medium">{formatCurrency(item.price)}</div>
                </div>
                <p className="text-white/50 text-xs line-clamp-2 mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">{item.category}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditing(item); setShowForm(true) }} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40">
                      <FiEdit2 size={12} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="w-7 h-7 rounded-lg border border-rose-500/30 flex items-center justify-center text-rose-400 hover:bg-rose-500/10">
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <MenuForm item={editing} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); refetch() }} />
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}

function MenuForm({ item, onClose, onSaved }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: item || { category: 'breakfast', price: 10, available: true },
  })

  const onSubmit = async (data) => {
    const payload = { ...data, price: Number(data.price), available: !!data.available }
    try {
      if (item) {
        await api.put(`/restaurant/${item.id}`, payload)
        toast.success('Item updated')
      } else {
        await api.post('/restaurant', payload)
        toast.success('Item added')
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
        className="bg-ink-light border border-white/10 rounded-3xl p-7 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl text-white">{item ? 'Edit Item' : 'Add Menu Item'}</h2>
          <button type="button" onClick={onClose} className="text-white/60 hover:text-gold"><FiX /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Name</label>
            <input type="text" required className="input-lux" {...register('name', { required: true })} />
          </div>
          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea rows={3} className="input-lux resize-none" {...register('description', { required: true })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Price ($)</label>
              <input type="number" step="0.01" className="input-lux" {...register('price', { required: true })} />
            </div>
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Category</label>
              <select className="input-lux" {...register('category')}>
                {CATEGORIES.map((c) => <option key={c} value={c} className="bg-ink">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Image URL (optional)</label>
            <input type="text" className="input-lux" placeholder="https://..." {...register('image')} />
          </div>
          <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
            <input type="checkbox" className="rounded border-white/20 bg-transparent text-gold focus:ring-gold" {...register('available')} />
            Available
          </label>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-5">
          {isSubmitting ? 'Saving...' : 'Save Item'}
        </button>
      </motion.form>
    </motion.div>
  )
}
