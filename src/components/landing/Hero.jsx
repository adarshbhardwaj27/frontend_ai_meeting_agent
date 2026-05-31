import { motion } from 'framer-motion'
import { ArrowRight, Play, Mic, MessageSquare, Brain } from 'lucide-react'

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
})

function ChatBubble({ speaker, text, isAI, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isAI ? -10 : 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-start gap-2.5"
    >
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
          isAI ? 'bg-gradient-to-br from-teal-500 to-sky-400 text-navy-900' : 'bg-navy-500 text-gray-300'
        }`}
      >
        {isAI ? 'A' : speaker[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-semibold ${isAI ? 'text-teal-400' : 'text-gray-400'}`}>
            {speaker}
          </span>
          {isAI && (
            <span className="bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wide">
              AI
            </span>
          )}
        </div>
        <p className={`text-sm leading-relaxed ${isAI ? 'text-white' : 'text-gray-400'}`}>{text}</p>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900 pt-16">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 -left-24 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[100px] animate-float" />
        <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-full bg-sky-400/10 blur-[80px] animate-float-delayed" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-teal-500/5 blur-[60px] animate-float-slow" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern opacity-50 pointer-events-none" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-navy-950/80 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">

        {/* ── Left column ── */}
        <div>
          {/* Badge */}
          <motion.div {...FADE_UP(0)}>
            <span className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse-slow" />
              NOW IN BETA — Real-Time AI Meeting Intelligence
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...FADE_UP(0.1)}
            className="text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6"
          >
            The AI That{' '}
            <span className="text-gradient">Doesn't Just Record</span>
            {' '}Your Meetings —{' '}
            <span className="text-gradient">It Understands Them.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...FADE_UP(0.2)}
            className="text-lg text-gray-400 leading-relaxed mb-10 max-w-xl"
          >
            Alex joins your Microsoft Teams or Zoom call, listens to the live conversation,
            and speaks up at exactly the right moment — catching contradictions, surfacing
            forgotten decisions, and answering questions before the moment passes.
          </motion.p>

          {/* Capability pills */}
          <motion.div {...FADE_UP(0.25)} className="flex flex-wrap gap-2 mb-10">
            {[
              { icon: Mic, label: 'Voice Commands' },
              { icon: Brain, label: 'Proactive Intelligence' },
              { icon: MessageSquare, label: 'Decision Tracking' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 bg-navy-700 border border-white/8 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full"
              >
                <Icon size={12} className="text-teal-400" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...FADE_UP(0.3)} className="flex flex-wrap gap-4">
            <a href="#cta" className="btn-primary gap-2">
              Request Demo <ArrowRight size={16} />
            </a>
            <a href="#how-it-works" className="btn-secondary gap-2">
              <Play size={15} /> See How It Works
            </a>
          </motion.div>

          {/* Trust row */}
          <motion.p {...FADE_UP(0.4)} className="mt-8 text-xs text-gray-600">
            Works with{' '}
            <span className="text-gray-400 font-medium">Microsoft Teams</span>
            {' '}·{' '}
            <span className="text-gray-400 font-medium">Zoom</span>
            {' '}·{' '}
            <span className="text-gray-500">Google Meet coming soon</span>
          </motion.p>
        </div>

        {/* ── Right column: chat mockup ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative"
        >
          {/* Main card */}
          <div className="card-glass shadow-2xl shadow-black/40 overflow-hidden">
            {/* Window chrome */}
            <div className="bg-navy-800 px-5 py-3.5 flex items-center gap-4 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/50" />
                <div className="w-3 h-3 rounded-full bg-amber-400/50" />
                <div className="w-3 h-3 rounded-full bg-green-400/50" />
              </div>
              <div className="flex-1 text-center text-xs text-gray-500 font-medium">
                Q3 Roadmap Planning — Microsoft Teams
              </div>
              <div className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Live
              </div>
            </div>

            {/* Chat body */}
            <div className="p-5 space-y-4 bg-navy-900/40">
              <ChatBubble speaker="Sarah Chen"  text="What were the risks we flagged earlier? I can't remember what we decided on the vendor issue…" delay={0.6} />
              <ChatBubble speaker="James Park"  text="I think we said something about Recall.ai lock-in but I lost track of the conclusion." delay={0.9} />

              {/* Trigger indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center gap-2 py-1"
              >
                <div className="flex-1 h-px bg-teal-500/20" />
                <span className="text-[10px] text-teal-500/70 font-medium tracking-wider px-2">
                  ALEX DETECTED A MEMORY GAP
                </span>
                <div className="flex-1 h-px bg-teal-500/20" />
              </motion.div>

              <ChatBubble
                speaker="Alex (AI)"
                isAI
                text="Earlier (23 min ago) Sarah raised 3 risks: ① API latency > 500ms (flagged P1), ② Vendor lock-in with Recall.ai, ③ Cost at scale > 10K meetings/day. Decision: proceed with Sprint 8 latency fix before scaling."
                delay={1.4}
              />

              {/* Input bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7 }}
                className="flex items-center gap-2 pt-1"
              >
                <div className="flex-1 bg-navy-800 rounded-xl px-4 py-2.5 text-xs text-gray-600 border border-white/5">
                  Type a message or say <span className="text-teal-500">"Alex, …"</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center">
                  <Mic size={14} className="text-teal-400" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating stat — latency */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute -bottom-5 -left-5 card-glass px-4 py-2.5 shadow-xl shadow-black/30"
          >
            <p className="text-[10px] text-gray-500 mb-0.5">Response latency</p>
            <p className="text-xl font-bold text-gradient">~450 ms</p>
          </motion.div>

          {/* Floating stat — triggers */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 4, delay: 1, ease: 'easeInOut' }}
            className="absolute -top-5 -right-5 card-glass px-4 py-2.5 shadow-xl shadow-black/30"
          >
            <p className="text-[10px] text-gray-500 mb-0.5">Intelligence triggers</p>
            <p className="text-xl font-bold text-teal-400">12 types</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-navy-900 to-transparent pointer-events-none" />
    </section>
  )
}
