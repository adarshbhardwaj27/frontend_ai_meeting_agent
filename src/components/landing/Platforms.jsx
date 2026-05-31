import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function Platforms() {
  return (
    <section id="platform" className="section-pad bg-navy-900">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="text-xs text-teal-400 font-semibold tracking-widest uppercase mb-4 block">
            Integrations
          </span>
          <h2 className="section-title">Works Where Your Team Already Meets</h2>
          <p className="section-sub mx-auto">
            No migration, no new tools. Alex joins through the platforms you already use.
          </p>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Teams */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="card card-hover border border-teal-500/20 p-6"
          >
            <div className="w-14 h-14 rounded-xl bg-[#464EB8]/20 border border-[#464EB8]/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-black text-[#7B83EB]">T</span>
            </div>
            <h3 className="font-bold text-white mb-1">Microsoft Teams</h3>
            <p className="text-xs text-gray-500 mb-4">300M+ daily active users</p>
            <div className="flex flex-col gap-1.5 text-left">
              {['Bot joins via Recall.ai', 'Real-time WebSocket transcript', 'Chat message delivery'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle size={12} className="text-teal-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <span className="mt-4 inline-block text-[10px] font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30 px-2 py-1 rounded-full">
              LIVE
            </span>
          </motion.div>

          {/* Zoom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card card-hover border border-teal-500/20 p-6"
          >
            <div className="w-14 h-14 rounded-xl bg-[#2D8CFF]/10 border border-[#2D8CFF]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-black text-[#2D8CFF]">Z</span>
            </div>
            <h3 className="font-bold text-white mb-1">Zoom</h3>
            <p className="text-xs text-gray-500 mb-4">300M+ daily meeting participants</p>
            <div className="flex flex-col gap-1.5 text-left">
              {['Bot joins via Recall.ai', 'Speaker-diarized transcript', 'Chat + voice reply'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle size={12} className="text-teal-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <span className="mt-4 inline-block text-[10px] font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30 px-2 py-1 rounded-full">
              LIVE
            </span>
          </motion.div>

          {/* Meet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card border border-white/5 p-6 opacity-60"
          >
            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-black text-gray-500">M</span>
            </div>
            <h3 className="font-bold text-gray-500 mb-1">Google Meet</h3>
            <p className="text-xs text-gray-600 mb-4">100M+ daily users</p>
            <div className="flex flex-col gap-1.5 text-left">
              {['Full integration planned', 'Chat + voice support', 'Enterprise rollout'].map(f => (
                <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-3 h-3 rounded-full border border-gray-600 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <span className="mt-4 inline-block text-[10px] font-bold bg-gray-700/50 text-gray-500 border border-gray-600/30 px-2 py-1 rounded-full">
              Q1 2027
            </span>
          </motion.div>
        </div>

        {/* Recall.ai attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-gray-600"
        >
          Powered by Recall.ai managed bot infrastructure — no bot account setup required for attendees.
        </motion.p>
      </div>
    </section>
  )
}
