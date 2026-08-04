import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiSend, FiClock, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi'
import toast from 'react-hot-toast'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import SectionHeader from '../components/ui/SectionHeader'
import api from '../utils/axios'
import { HOTEL } from '../data/site'

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', data)
      toast.success('Message sent! We will get back to you shortly.')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message')
    }
  }

  return (
    <>
      <PageHeader
        subtitle="Get in Touch"
        title="Contact Hotel HDT"
        description="Whether you are planning a stay, an event, or simply have a question — our team is here to help craft your perfect Kathmandu experience."
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80"
        breadcrumb={[{ name: 'Contact' }]}
      />

      <section className="py-20 md:py-24">
        <div className="container-lux grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <Reveal><div className="section-eyebrow">Hotel Information</div></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title mb-8">We Look Forward to Welcoming You</h2>
            </Reveal>

            <div className="space-y-6 mb-10">
              {[
                { icon: FiMapPin, label: 'Address', value: HOTEL.address, link: `https://maps.google.com/?q=${encodeURIComponent(HOTEL.address)}` },
                { icon: FiPhone, label: 'Phone', value: HOTEL.phone, link: `tel:${HOTEL.phone}` },
                { icon: FiMail, label: 'Email', value: HOTEL.email, link: `mailto:${HOTEL.email}` },
                { icon: FiClock, label: 'Reception', value: 'Open 24 hours, 7 days a week' },
              ].map((item, i) => (
                <Reveal key={item.label} delay={0.15 + i * 0.05}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-ink-light/60 border border-white/5 hover:border-gold/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                      {item.link ? (
                        <a href={item.link} className="text-white hover:text-gold transition-colors">{item.value}</a>
                      ) : (
                        <div className="text-white">{item.value}</div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wider mb-3">Follow Us</div>
                <div className="flex gap-3">
                  {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-12 h-12 rounded-full border border-white/10 hover:border-gold hover:bg-gold hover:text-ink flex items-center justify-center text-white/70 transition-all duration-300"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.2}>
            <form onSubmit={handleSubmit(onSubmit)} className="card-lux p-8">
              <h3 className="font-serif text-2xl text-white mb-6">Send Us a Message</h3>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" error={errors.name?.message}>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input-lux"
                      {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Too short' } })}
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input-lux"
                      {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                    />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone (Optional)">
                    <input type="text" placeholder="+977-98XXXXXXXX" className="input-lux" {...register('phone')} />
                  </Field>
                  <Field label="Subject" error={errors.subject?.message}>
                    <input
                      type="text"
                      placeholder="Booking inquiry"
                      className="input-lux"
                      {...register('subject', { required: 'Subject is required' })}
                    />
                  </Field>
                </div>
                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="input-lux resize-none"
                    {...register('message', { required: 'Message is required', minLength: { value: 5, message: 'Message too short' } })}
                  />
                </Field>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-6">
                {isSubmitting ? 'Sending...' : <>Send Message <FiSend /></>}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20 md:pb-24">
        <div className="container-lux">
          <div className="rounded-3xl overflow-hidden border border-white/5 h-[450px]">
            <iframe
              title="Hotel HDT Location"
              src={HOTEL.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(0.92) hue-rotate(180deg) brightness(0.85) contrast(0.95)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="text-xs text-white/60 uppercase tracking-wider mb-1.5 block">{label}</label>
      {children}
      {error && <p className="text-rose-400 text-xs mt-1.5">{error}</p>}
    </div>
  )
}
