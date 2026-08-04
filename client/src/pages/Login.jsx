import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPass, setShowPass] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    try {
      const user = await login(data.email, data.password)
      const from = location.state?.from
      navigate(from || (user.role === 'admin' ? '/admin' : '/dashboard'))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80" alt="" className="w-full h-full object-cover" />
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
          <h1 className="font-serif text-4xl text-white mb-2">Welcome Back</h1>
          <p className="text-white/60">Sign in to your Hotel HDT account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-dark rounded-3xl p-8 space-y-5">
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
            <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-lux pl-12 pr-12"
                {...register('password', { required: 'Password is required' })}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-gold">
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-rose-400 text-xs mt-1.5">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/60 cursor-pointer">
              <input type="checkbox" className="rounded border-white/20 bg-transparent text-gold focus:ring-gold" />
              Remember me
            </label>
            <a href="#" className="text-gold hover:underline">Forgot password?</a>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Signing in...' : <>Sign In <FiArrowRight /></>}
          </button>

          <div className="text-center text-sm text-white/60">
            Don't have an account? <Link to="/register" className="text-gold hover:underline">Create one</Link>
          </div>

          {/* Demo credentials */}
          <div className="border-t border-white/5 pt-4 text-xs text-white/40 space-y-1">
            <div className="text-gold/80 uppercase tracking-wider text-[10px]">Demo Credentials</div>
            <div>Admin: admin@hotelhdt.com / admin123</div>
            <div>User: user@hotelhdt.com / user123</div>
          </div>
        </form>
      </motion.div>
    </section>
  )
}
