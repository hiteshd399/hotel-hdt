import { FiCheck, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatDate } from '../../utils/format'

export default function AdminReviews() {
  const { data, loading, refetch } = useFetch('/reviews', { approved: 'false' }, [])

  const reviews = data?.data || []

  const approve = async (id) => {
    try {
      await api.put(`/reviews/${id}/approve`)
      toast.success('Review approved')
      refetch()
    } catch (err) {
      toast.error('Approve failed')
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this review?')) return
    try {
      await api.delete(`/reviews/${id}`)
      toast.success('Review deleted')
      refetch()
    } catch (err) {
      toast.error('Delete failed')
    }
  }

  return (
    <AdminLayout title="Manage Reviews">
      <p className="text-white/60 mb-6">{reviews.length} reviews pending approval</p>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-32 !rounded-2xl" />)}
        </div>
      ) : reviews.length === 0 ? (
        <div className="card-lux p-12 text-center text-white/50">No pending reviews 🎉</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="card-lux p-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif">
                  {r.user?.name?.[0] || 'G'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="text-white font-medium">{r.user?.name || 'Anonymous'}</div>
                      <div className="text-white/40 text-xs">on {r.room?.name} · {formatDate(r.createdAt)}</div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <span key={i} className="text-gold">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mt-2">{r.comment}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                <button onClick={() => approve(r.id)} className="btn-primary !bg-emerald-500 !text-white !py-2 !text-xs">
                  <FiCheck /> Approve
                </button>
                <button onClick={() => remove(r.id)} className="btn-dark !border-rose-500/30 !text-rose-400 !py-2 !text-xs">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
