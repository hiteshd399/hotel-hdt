import { useState } from 'react'
import { FiTrash2, FiShield, FiUser } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'
import { formatDate } from '../../utils/format'

export default function AdminUsers() {
  const { data, loading, refetch } = useFetch('/users', { limit: 100 }, [])
  const users = data?.data || []

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try {
      await api.delete(`/users/${id}`)
      toast.success('User deleted')
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed')
    }
  }

  const toggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'customer' : 'admin'
    try {
      await api.put(`/users/${user.id}/role`, { role: newRole })
      toast.success(`User is now ${newRole}`)
      refetch()
    } catch (err) {
      toast.error('Failed to update role')
    }
  }

  return (
    <AdminLayout title="Manage Users">
      <p className="text-white/60 mb-6">{users.length} users registered</p>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-16 !rounded-xl" />)}
        </div>
      ) : (
        <div className="card-lux overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-light/60">
                <tr className="text-white/40 text-xs uppercase tracking-wider">
                  <th className="text-left px-5 py-3">User</th>
                  <th className="text-left px-5 py-3 hidden md:table-cell">Phone</th>
                  <th className="text-center px-5 py-3">Role</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Joined</th>
                  <th className="text-right px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-white/5 hover:bg-white/5">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-sm ${u.role === 'admin' ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-ink-lighter text-white/60'}`}>
                          {u.name?.[0]}
                        </div>
                        <div>
                          <div className="text-white">{u.name}</div>
                          <div className="text-white/40 text-xs">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell text-white/60">{u.phone || '—'}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${u.role === 'admin' ? 'bg-gold/15 text-gold border-gold/30' : 'bg-white/5 text-white/60 border-white/10'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell text-white/60 text-xs">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => toggleRole(u)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold/40" title="Toggle role">
                          {u.role === 'admin' ? <FiUser size={14} /> : <FiShield size={14} />}
                        </button>
                        {u.role !== 'admin' && (
                          <button onClick={() => handleDelete(u.id)} className="w-8 h-8 rounded-lg border border-rose-500/30 flex items-center justify-center text-rose-400 hover:bg-rose-500/10" title="Delete">
                            <FiTrash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
