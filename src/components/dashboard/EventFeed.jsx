import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Radio, Info } from 'lucide-react'

const EVENT_ICONS = {
  success: CheckCircle,
  error:   XCircle,
  info:    Info,
  active:  Radio,
}
const EVENT_COLORS = {
  success: 'text-teal-400  bg-teal-400/10  border-teal-400/30',
  error:   'text-red-400   bg-red-400/10   border-red-400/30',
  info:    'text-sky-400   bg-sky-400/10   border-sky-400/30',
  active:  'text-amber-400 bg-amber-400/10 border-amber-400/30',
}

export default function EventFeed({ events }) {
  if (!events.length) return null

  return (
    <div className="mt-3 space-y-2">
      <AnimatePresence initial={false}>
        {events.map((evt, i) => {
          const Icon  = EVENT_ICONS[evt.type]  ?? Info
          const color = EVENT_COLORS[evt.type] ?? EVENT_COLORS.info
          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-xs ${color}`}
            >
              <Icon size={13} className="shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="font-medium">{evt.message}</span>
                <span className="ml-2 opacity-50 text-[10px]">{evt.time}</span>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
