import { FiCheck, FiTrash2, FiMail, FiPhone } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatDate } from '../../utils/format'

export default function AdminContacts() {
  const { data, loading, refetch } = useFetch('/contact', {}, [])
  const contacts = data?.data || []

  const resolve = async (id) => {
    try {
      await api.put(`/contact/${id}/resolve`)
      toast.success('Marked as resolved')
      refetch()
    } catch {
      toast.error('Update failed')
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this contact message?')) return
    try {
      await api.delete(`/contact/${id}`)
      toast.success('Contact deleted')
      refetch()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <AdminLayout title="Contact Messages">
      <p className="text-white/60 mb-6">{contacts.length} messages · {contacts.filter(c => !c.resolved).length} unresolved</p>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32 !rounded-2xl" />)}
        </div>
      ) : contacts.length === 0 ? (
        <div className="card-lux p-12 text-center text-white/50">No messages yet</div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.id} className={`card-lux p-6 ${c.resolved ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-lg text-white">{c.name}</h3>
                    {c.resolved && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Resolved</span>
                    )}
                  </div>
                  <div className="text-white/50 text-xs flex flex-wrap gap-4">
                    <span className="flex items-center gap-1"><FiMail className="text-gold" /> {c.email}</span>
                    {c.phone && <span className="flex items-center gap-1"><FiPhone className="text-gold" /> {c.phone}</span>}
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {!c.resolved && (
                    <button onClick={() => resolve(c.id)} className="w-8 h-8 rounded-lg border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/10" title="Mark resolved">
                      <FiCheck size={14} />
                    </button>
                  )}
                  <button onClick={() => remove(c.id)} className="w-8 h-8 rounded-lg border border-rose-500/30 flex items-center justify-center text-rose-400 hover:bg-rose-500/10" title="Delete">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="text-gold text-sm uppercase tracking-wider text-xs mb-2">{c.subject}</div>
              <p className="text-white/70 text-sm leading-relaxed">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}
