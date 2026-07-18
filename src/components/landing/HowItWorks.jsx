import { motion } from 'framer-motion'
import { LogIn, Ear, Brain, MessageSquare } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    icon: LogIn,
    color: 'from-teal-500 to-teal-600',
    glow: 'shadow-teal-500/30',
    title: 'Joins',
    sub: 'Zero setup for attendees',
    desc: 'Alex enters your Microsoft Teams or Zoom call as a named bot participant — no downloads, no extensions, no disruption.',
  },
  {
    num: '02',
    icon: Ear,
    color: 'from-sky-400 to-sky-500',
    glow: 'shadow-sky-400/30',
    title: 'Listens',
    sub: 'Real-time, speaker-identified',
    desc: 'Every spoken word is streamed with speaker labels and timestamps. Alex maintains a live, sliding transcript window with full speaker attribution.',
  },
  {
    num: '03',
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/30',
    title: 'Understands',
    sub: 'Structured context in real time',
    desc: 'The Context Engine builds a live model of the meeting: current topic, decisions forming, concerns raised, open questions — updated every 5 seconds.',
  },
  {
    num: '04',
    icon: MessageSquare,
    color: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-400/30',
    title: 'Contributes',
    sub: 'Precisely when it matters',
    desc: 'A multi-layer intelligence pipeline detects the moment to speak up. AI adjudication filters noise before any message enters the meeting.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-pad bg-navy-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs text-teal-400 font-semibold tracking-widest uppercase mb-4 block">
            Four-Step Loop
          </span>
          <h2 className="section-title">How Alex Works</h2>
          <p className="section-sub mx-auto">
            From spoken word to real-time insight — as the conversation happens.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-teal-500/30 via-teal-500/60 to-amber-400/30" />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${step.color} shadow-xl ${step.glow} flex items-center justify-center mb-6 z-10`}>
                  <Icon size={28} className="text-white" strokeWidth={1.8} />
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-navy-900 border-2 border-navy-800 text-xs font-bold text-gray-400 flex items-center justify-center">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                <p className="text-xs text-teal-400 font-semibold mb-3 tracking-wide uppercase">{step.sub}</p>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
