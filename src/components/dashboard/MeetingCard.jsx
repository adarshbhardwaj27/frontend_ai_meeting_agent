import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Link2, Clock, ChevronDown, ChevronUp, UserX } from 'lucide-react'
import EventFeed from './EventFeed'

const STATUS_CFG = {
  CONNECTING: { label: 'Connecting…',  dot: 'bg-amber-400 animate-pulse', text: 'text-amber-400', badge: 'bg-amber-400/10 border-amber-400/30' },
  JOINED:     { label: 'Live',          dot: 'bg-teal-400 animate-pulse',  text: 'text-teal-400',  badge: 'bg-teal-400/10 border-teal-400/30'  },
  FAILED:     { label: 'Failed',        dot: 'bg-red-400',                 text: 'text-red-400',   badge: 'bg-red-400/10 border-red-400/30'    },
  LEAVING:    { label: 'Leaving…',      dot: 'bg-gray-400 animate-pulse',  text: 'text-gray-400',  badge: 'bg-gray-400/10 border-gray-400/30'  },
  ENDED:      { label: 'Ended',         dot: 'bg-gray-600',                text: 'text-gray-500',  badge: 'bg-gray-500/10 border-gray-500/30'  },
  IN_CALL_NOT_RECORDING: { label: 'In Call', dot: 'bg-teal-400 animate-pulse', text: 'text-teal-400', badge: 'bg-teal-400/10 border-teal-400/30' },
}

function elapsed(startedAt) {
  const secs = Math.floor((Date.now() - startedAt) / 1000)
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function MeetingCard({ meeting, onLeave }) {
  const [expanded, setExpanded] = useState(true)
  const cfg = STATUS_CFG[meeting.status] ?? { label: meeting.status, dot: 'bg-gray-600', text: 'text-gray-500', badge: 'bg-gray-500/10 border-gray-500/30' }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="card border border-white/8 overflow-hidden"
    >
      {/* Card header */}
      <div className="px-4 py-3 flex items-center gap-3">
        {/* Status dot */}
        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />

        {/* URL */}
        <Link2 size={13} className="text-gray-600 shrink-0" />
        <span className="text-sm text-gray-300 truncate flex-1 font-mono text-xs">
          {meeting.url}
        </span>

        {/* Status badge */}
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badge} ${cfg.text} shrink-0`}>
          {cfg.label}
        </span>

        {/* Elapsed */}
        <div className="flex items-center gap-1 text-xs text-gray-600 shrink-0">
          <Clock size={11} />
          <span>{elapsed(meeting.startedAt)}</span>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="text-gray-600 hover:text-gray-300 transition-colors"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Leave button */}
        {meeting.status === 'JOINED' && (
          <button
            onClick={() => onLeave(meeting.id)}
            className="btn-danger gap-1.5 shrink-0"
          >
            <UserX size={13} /> Leave Bot
          </button>
        )}
      </div>

      {/* Event feed */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/5">
          <EventFeed events={meeting.events} />
        </div>
      )}
    </motion.div>
  )
}
