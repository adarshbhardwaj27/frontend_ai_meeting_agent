import { motion } from 'framer-motion'
import {
  Mic, Terminal, GitMerge, AlertTriangle,
  RefreshCw, HelpCircle, BarChart2, MessageCircle,
  Shuffle, Lightbulb, TrendingDown, BookOpen,
} from 'lucide-react'

const TRIGGERS = [
  { icon: Mic,           label: 'Voice Address',         desc: '"Alex, what were the risks?"',           tier: 'P0', color: 'text-teal-400', border: 'border-teal-500/50', bg: 'bg-teal-500/8' },
  { icon: Terminal,      label: 'Explicit Command',       desc: '@Alex summarize in meeting chat',         tier: 'P0', color: 'text-teal-400', border: 'border-teal-500/50', bg: 'bg-teal-500/8' },
  { icon: GitMerge,      label: 'Decision Forming',       desc: 'Key decision language detected',          tier: 'P1', color: 'text-sky-400',  border: 'border-sky-400/40',  bg: 'bg-sky-400/8'  },
  { icon: AlertTriangle, label: 'Conflict Detected',      desc: 'Two positions directly opposed',          tier: 'P1', color: 'text-sky-400',  border: 'border-sky-400/40',  bg: 'bg-sky-400/8'  },
  { icon: RefreshCw,     label: 'Contradiction',          desc: 'Factual flip between speakers',           tier: 'P2', color: 'text-amber-400',border: 'border-amber-400/40',bg: 'bg-amber-400/8'},
  { icon: BarChart2,     label: 'Factual Inconsistency',  desc: 'Numbers or facts don\'t match',           tier: 'P2', color: 'text-amber-400',border: 'border-amber-400/40',bg: 'bg-amber-400/8'},
  { icon: AlertTriangle, label: 'Risk Overlooked',        desc: 'Raised concern left unaddressed',         tier: 'P2', color: 'text-amber-400',border: 'border-amber-400/40',bg: 'bg-amber-400/8'},
  { icon: HelpCircle,    label: 'Repeated Confusion',     desc: 'Multiple confusion signals in window',    tier: 'P3', color: 'text-orange-400',border:'border-orange-400/40',bg:'bg-orange-400/8'},
  { icon: MessageCircle, label: 'Circular Discussion',    desc: 'Same debate loop detected',               tier: 'P3', color: 'text-orange-400',border:'border-orange-400/40',bg:'bg-orange-400/8'},
  { icon: BookOpen,      label: 'Memory Gap',             desc: 'Someone trying to recall earlier',        tier: 'P3', color: 'text-orange-400',border:'border-orange-400/40',bg:'bg-orange-400/8'},
  { icon: TrendingDown,  label: 'Topic Drift',            desc: 'Conversation wanders off-agenda',         tier: 'P4', color: 'text-gray-400', border: 'border-gray-500/30',  bg: 'bg-gray-500/5'  },
  { icon: Lightbulb,     label: 'Collaboration Opp.',     desc: 'Connects current discussion to past',     tier: 'P4', color: 'text-gray-400', border: 'border-gray-500/30',  bg: 'bg-gray-500/5'  },
]

export default function Features() {
  return (
    <section id="features" className="section-pad bg-navy-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs text-teal-400 font-semibold tracking-widest uppercase mb-4 block">
            Intelligence Engine
          </span>
          <h2 className="section-title" id="intelligence">
            12 Types of Meeting Intelligence
          </h2>
          <p className="section-sub mx-auto">
            A multi-layer pipeline: local probabilistic scoring → AI adjudication → response generation.
          </p>
        </motion.div>

        {/* Priority legend */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {[
            { tier: 'P0', label: 'Voice / Command',  color: 'text-teal-400 border-teal-500/40 bg-teal-500/8' },
            { tier: 'P1', label: 'Decision / Conflict', color: 'text-sky-400 border-sky-400/40 bg-sky-400/8' },
            { tier: 'P2', label: 'Contradiction / Risk', color: 'text-amber-400 border-amber-400/40 bg-amber-400/8' },
            { tier: 'P3', label: 'Confusion / Memory', color: 'text-orange-400 border-orange-400/40 bg-orange-400/8' },
            { tier: 'P4', label: 'Drift / Collab',    color: 'text-gray-400 border-gray-500/40 bg-gray-500/8' },
          ].map(({ tier, label, color }) => (
            <span key={tier} className={`text-xs font-semibold px-3 py-1 rounded-full border ${color}`}>
              {tier} · {label}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TRIGGERS.map((t, i) => {
            const Icon = t.icon
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
                className={`card card-hover ${t.bg} border ${t.border} p-4 flex items-start gap-3`}
              >
                <div className={`w-9 h-9 rounded-lg ${t.bg} border ${t.border} flex items-center justify-center shrink-0`}>
                  <Icon size={16} className={t.color} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white truncate">{t.label}</span>
                    <span className={`text-[9px] font-bold ${t.color} shrink-0`}>{t.tier}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Pipeline callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 p-5 rounded-2xl border border-white/8 bg-navy-800/60 text-center"
        >
          <p className="text-sm text-gray-400">
            Every trigger passes through{' '}
            <span className="text-white font-semibold">8 detection layers</span>
            {' '}before reaching the meeting.{' '}
            <span className="text-teal-400 font-semibold">LLM adjudication</span>
            {' '}makes the final SEND / SUPPRESS decision — eliminating spam before it happens.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
