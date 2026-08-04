import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiArrowRight } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      })
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center bg-ink/60">
              <span className="font-serif text-gold text-2xl font-bold">H</span>
            </div>
          </Link>
          <h1 className="font-serif text-4xl text-white mb-2">Create Account</h1>
          <p className="text-white/60">Join the Hotel HDT family</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-dark rounded-3xl p-8 space-y-5">
          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="John Doe"
                className="input-lux pl-12"
                {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
              />
            </div>
            {errors.name && <p className="text-rose-400 text-xs mt-1.5">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="email"
                placeholder="you@example.com"
                className="input-lux pl-12"
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
              />
            </div>
            {errors.email && <p className="text-rose-400 text-xs mt-1.5">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Phone (Optional)</label>
            <div className="relative">
              <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="+977-98XXXXXXXX"
                className="input-lux pl-12"
                {...register('phone')}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="At least 6 characters"
                className="input-lux pl-12 pr-12"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold">
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-rose-400 text-xs mt-1.5">{errors.password.message}</p>}
          </div>

          <div>
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Confirm Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Re-enter password"
                className="input-lux pl-12"
                {...register('confirmPassword', { required: 'Please confirm password', validate: (v) => v === password || 'Passwords do not match' })}
              />
            </div>
            {errors.confirmPassword && <p className="text-rose-400 text-xs mt-1.5">{errors.confirmPassword.message}</p>}
          </div>

          <label className="flex items-start gap-2 text-xs text-white/60 cursor-pointer">
            <input type="checkbox" className="rounded border-white/20 bg-transparent text-gold focus:ring-gold mt-0.5" {...register('terms', { required: 'Please accept terms' })} />
            <span>I agree to the <a href="#" className="text-gold hover:underline">Terms of Service</a> and <a href="#" className="text-gold hover:underline">Privacy Policy</a></span>
          </label>
          {errors.terms && <p className="text-rose-400 text-xs">{errors.terms.message}</p>}

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Creating account...' : <>Create Account <FiArrowRight /></>}
          </button>

          <div className="text-center text-sm text-white/60">
            Already have an account? <Link to="/login" className="text-gold hover:underline">Sign in</Link>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
