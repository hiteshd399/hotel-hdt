import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiTrash2, FiX, FiUpload } from 'react-icons/fi'
import toast from 'react-hot-toast'
import AdminLayout from '../../components/admin/AdminLayout'
import useFetch from '../../hooks/useFetch'
import api from '../../utils/axios'

export default function AdminGallery() {
  const { data, loading, refetch } = useFetch('/gallery', {}, [])
  const items = data?.data || []
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('hotel')
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('Please select an image')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('title', title)
      formData.append('category', category)
      await api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Image uploaded')
      setShowForm(false)
      setTitle('')
      setFile(null)
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    try {
      await api.delete(`/gallery/${id}`)
      toast.success('Image deleted')
      refetch()
    } catch {
      toast.error('Delete failed')
    }
  }

  return (
    <AdminLayout title="Manage Gallery">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/60">{items.length} images</p>
        <button onClick={() => setShowForm(true)} className="btn-primary"><FiPlus /> Add Image</button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton aspect-square !rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <div className="text-white text-sm font-medium">{item.title}</div>
                <div className="text-gold/80 text-[10px] uppercase tracking-wider">{item.category}</div>
              </div>
              <button onClick={() => handleDelete(item.id)} className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-ink/80 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:text-rose-400 transition-all">
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.form
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              onSubmit={handleUpload}
              onClick={(e) => e.stopPropagation()}
              className="bg-ink-light border border-white/10 rounded-3xl p-7 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-2xl text-white">Add Image</h2>
                <button type="button" onClick={() => setShowForm(false)} className="text-white/60 hover:text-gold"><FiX /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Title</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="input-lux" placeholder="Rooftop Pool" />
                </div>
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-lux">
                    {['hotel', 'rooms', 'restaurant', 'events', 'pool'].map((c) => (
                      <option key={c} value={c} className="bg-ink">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Image File</label>
                  <label className="block border-2 border-dashed border-white/10 hover:border-gold/40 rounded-xl p-6 text-center cursor-pointer transition-colors">
                    <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
                    {file ? (
                      <div>
                        <img src={URL.createObjectURL(file)} alt="preview" className="max-h-32 mx-auto rounded-lg" />
                        <div className="text-white/60 text-xs mt-2">{file.name}</div>
                      </div>
                    ) : (
                      <>
                        <FiUpload className="mx-auto text-gold mb-2" size={24} />
                        <div className="text-white/60 text-sm">Click to upload</div>
                        <div className="text-white/40 text-xs">JPG, PNG, WEBP up to 5MB</div>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <button type="submit" disabled={uploading} className="btn-primary w-full mt-5">
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
