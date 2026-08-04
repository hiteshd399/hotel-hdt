import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatDate, todayISO } from '../../utils/format'

export default function AdminOffers() {
  const { data, loading, refetch } = useFetch('/offers', {}, [])
  const offers = data?.data || []
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id) => {
    if (!confirm('Delete this offer?')) return
    try {
      await api.delete(`/offers/${id}`)
      toast.success('Offer deleted')
      refetch()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <AdminLayout title="Manage Offers">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/60">{offers.length} offers</p>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="btn-primary"><FiPlus /> Add Offer</button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-64 !rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {offers.map((o) => (
            <div key={o.id} className="card-lux overflow-hidden">
              {o.image && <img src={o.image} alt={o.title} className="w-full h-40 object-cover" />}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-serif text-lg text-white">{o.title}</h3>
                  <span className="text-gold font-bold text-lg">{o.discount}</span>
                </div>
                <p className="text-white/50 text-xs line-clamp-2 mb-3">{o.description}</p>
                <div className="text-white/40 text-xs mb-3">{formatDate(o.validFrom)} → {formatDate(o.validTo)}</div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${o.active ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-white/50 border border-white/10'}`}>
                    {o.active ? 'Active' : 'Inactive'}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditing(o); setShowForm(true) }} className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40">
                      <FiEdit2 size={12} />
                    </button>
                    <button onClick={() => handleDelete(o.id)} className="w-7 h-7 rounded-lg border border-rose-500/30 flex items-center justify-center text-rose-400 hover:bg-rose-500/10">
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
        {showForm && <OfferForm offer={editing} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); refetch() }} />}
      </AnimatePresence>
    </AdminLayout>
  )
}

function OfferForm({ offer, onClose, onSaved }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: offer ? {
      ...offer,
      validFrom: offer.validFrom?.slice(0, 10),
      validTo: offer.validTo?.slice(0, 10),
    } : {
      validFrom: todayISO(),
      validTo: todayISO(30),
      active: true,
      discount: '20%',
    },
  })

  const onSubmit = async (data) => {
    try {
      if (offer) {
        await api.put(`/offers/${offer.id}`, data)
        toast.success('Offer updated')
      } else {
        await api.post('/offers', data)
        toast.success('Offer created')
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
          <h2 className="font-serif text-2xl text-white">{offer ? 'Edit Offer' : 'Add Offer'}</h2>
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
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Discount</label>
              <input type="text" placeholder="25%" className="input-lux" {...register('discount', { required: true })} />
            </div>
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Image URL</label>
              <input type="text" className="input-lux" {...register('image')} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Valid From</label>
              <input type="date" className="input-lux" {...register('validFrom', { required: true })} />
            </div>
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Valid To</label>
              <input type="date" className="input-lux" {...register('validTo', { required: true })} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
            <input type="checkbox" className="rounded border-white/20 bg-transparent text-gold focus:ring-gold" {...register('active')} /> Active
          </label>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-5">
          {isSubmitting ? 'Saving...' : 'Save Offer'}
        </button>
      </motion.form>
    </motion.div>
  )
}
