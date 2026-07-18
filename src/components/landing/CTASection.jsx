import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function CTASection() {
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) { setError('Please enter a valid email address.'); return }
    setError('')
    setSubmitted(true)
  }

  return (
    <section id="cta" className="section-pad bg-navy-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/8 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-xs text-teal-400 font-semibold tracking-widest uppercase mb-6 block">
            Early Access
          </span>

          <h2 className="section-title mb-6">
            Every Meeting,{' '}
            <span className="text-gradient">Made Smarter.</span>
          </h2>

          <p className="section-sub mx-auto mb-10">
            Join the waitlist and be among the first companies to deploy Alex across your organisation.
            Early access includes onboarding support.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['Dedicated onboarding', 'Cancel any time'].map(b => (
              <div key={b} className="flex items-center gap-1.5 text-sm text-gray-400">
                <CheckCircle size={14} className="text-teal-400" />
                {b}
              </div>
            ))}
          </div>

          {/* Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card border border-teal-500/30 bg-teal-500/5 p-8"
            >
              <CheckCircle size={40} className="text-teal-400 mx-auto mb-4" />
              <p className="text-xl font-bold text-white mb-2">You're on the list!</p>
              <p className="text-sm text-gray-400">
                We'll be in touch at <span className="text-teal-400">{email}</span> within 48 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="you@company.com"
                  className="input-field h-12 text-base"
                  required
                />
                {error && <p className="text-xs text-red-400 mt-1.5 text-left">{error}</p>}
              </div>
              <button type="submit" className="btn-primary h-12 px-7 shrink-0 gap-2 whitespace-nowrap">
                Request Demo <ArrowRight size={16} />
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-gray-600">
            No spam. No credit card. Your data is never shared.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
