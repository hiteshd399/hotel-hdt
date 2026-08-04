import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUser, FiMail, FiPhone, FiMapPin, FiLock, FiSave } from 'react-icons/fi'
import toast from 'react-hot-toast'
import CustomerLayout from '../../components/customer/CustomerLayout'
import { useAuth } from '../../context/AuthContext'
import api from '../../utils/axios'

export default function Profile() {
  const { user, updateUser } = useAuth()
  const [tab, setTab] = useState('profile')

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      country: user?.country || '',
    },
  })

  const passForm = useForm({
    defaultValues: { currentPassword: '', newPassword: '' },
  })

  const onProfile = async (data) => {
    try {
      const { data: res } = await api.put('/users/profile', data)
      updateUser(res.data)
      toast.success('Profile updated')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    }
  }

  const onPassword = async (data) => {
    try {
      await api.put('/users/password', data)
      passForm.reset()
      toast.success('Password changed')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed')
    }
  }

  return (
    <CustomerLayout title="My Profile">
      <div className="flex gap-2 mb-6">
        {['profile', 'password'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-full text-sm capitalize transition-all ${
              tab === t ? 'bg-gold text-ink font-medium' : 'border border-white/10 text-white/70 hover:border-gold/40 hover:text-gold'
            }`}
          >
            {t === 'profile' ? 'Profile Info' : 'Change Password'}
          </button>
        ))}
      </div>

      {tab === 'profile' ? (
        <form onSubmit={handleSubmit(onProfile)} className="card-lux p-7 max-w-2xl">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" icon={FiUser}>
              <input type="text" className="input-lux pl-12" {...register('name')} />
            </Field>
            <Field label="Email (read-only)" icon={FiMail}>
              <input type="email" readOnly value={user?.email || ''} className="input-lux pl-12 opacity-50 cursor-not-allowed" />
            </Field>
            <Field label="Phone" icon={FiPhone}>
              <input type="text" className="input-lux pl-12" {...register('phone')} />
            </Field>
            <Field label="Address" icon={FiMapPin}>
              <input type="text" className="input-lux pl-12" {...register('address')} />
            </Field>
            <Field label="City">
              <input type="text" className="input-lux" {...register('city')} />
            </Field>
            <Field label="Country">
              <input type="text" className="input-lux" {...register('country')} />
            </Field>
          </div>
          <button type="submit" disabled={isSubmitting} className="btn-primary mt-6">
            {isSubmitting ? 'Saving...' : <><FiSave /> Save Changes</>}
          </button>
        </form>
      ) : (
        <form onSubmit={passForm.handleSubmit(onPassword)} className="card-lux p-7 max-w-md">
          <Field label="Current Password" icon={FiLock}>
            <input type="password" className="input-lux pl-12" {...passForm.register('currentPassword', { required: true })} />
          </Field>
          <div className="mt-4">
            <Field label="New Password" icon={FiLock}>
              <input type="password" className="input-lux pl-12" {...passForm.register('newPassword', { required: true, minLength: 6 })} />
            </Field>
          </div>
          <button type="submit" disabled={passForm.formState.isSubmitting} className="btn-primary mt-6">
            {passForm.formState.isSubmitting ? 'Updating...' : <><FiSave /> Update Password</>}
          </button>
        </form>
      )}
    </CustomerLayout>
  )
}

function Field({ label, icon: Icon, children }) {
  return (
    <div>
      <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />}
        {children}
      </div>
    </div>
  )
}
