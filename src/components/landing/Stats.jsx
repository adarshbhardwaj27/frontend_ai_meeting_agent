import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { end: 37,   suffix: 'B',  prefix: '$', label: 'Lost annually to unproductive meetings',  sub: 'Harvard Business Review' },
  { end: 55,   suffix: 'M+', prefix: '',  label: 'Meetings held every day in the US',       sub: 'Doodle Meeting Report' },
  { end: 40,   suffix: '%',  prefix: '',  label: 'Of the knowledge workday spent in meetings', sub: 'Microsoft WorkLab' },
  { end: 600,  suffix: 'M+', prefix: '',  label: 'Teams & Zoom daily active users',          sub: 'Microsoft + Zoom 2025' },
]

function CountUp({ end, duration = 1.8 }) {
  const [count, setCount] = useState(0)
  const ref   = useRef(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          const frames = Math.round(duration * 60)
          let frame = 0
          const tick = () => {
            frame++
            const progress = frame / frames
            const ease = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(ease * end))
            if (frame < frames) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}</span>
}

export default function Stats() {
  return (
    <section className="bg-navy-800 border-y border-white/5 py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl lg:text-5xl font-extrabold text-gradient mb-2 tracking-tight">
              {s.prefix}
              <CountUp end={s.end} />
              {s.suffix}
            </div>
            <p className="text-sm text-gray-300 font-medium leading-snug mb-1">{s.label}</p>
            <p className="text-xs text-gray-600">{s.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
