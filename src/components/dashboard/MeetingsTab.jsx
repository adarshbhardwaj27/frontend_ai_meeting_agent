import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Video, Plus } from 'lucide-react'
import MeetingCard from './MeetingCard'

let _id = 0
const mkId = () => ++_id

function now() {
  return new Date().toLocaleTimeString('en-GB', { hour12: false })
}

function validateUrl(raw) {
  try {
    const u = new URL(raw.trim())
    const ok = ['teams.microsoft.com', 'teams.live.com', 'zoom.us', 'meet.google.com']
    if (!ok.some(h => u.hostname.endsWith(h))) return false
    return true
  } catch {
    return false
  }
}

export default function MeetingsTab() {
  const [url,      setUrl]      = useState('')
  const [urlError, setUrlError] = useState('')
  const [sessions, setSessions] = useState([])

  const addEvent = useCallback((id, evt) => {
    setSessions(prev => prev.map(s =>
      s.id === id
        ? { ...s, events: [...s.events, { id: mkId(), ...evt }] }
        : s
    ))
  }, [])

  const setStatus = useCallback((id, status) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }, [])

  const handleJoin = () => {
    const trimmed = url.trim()
    if (!trimmed) { setUrlError('Paste a meeting URL above.'); return }
    if (!validateUrl(trimmed)) { setUrlError('Must be a valid Teams, Zoom, or Google Meet URL.'); return }

    setUrlError('')
    setUrl('')

    const id = mkId()
    const session = {
      id,
      url:       trimmed,
      status:    'CONNECTING',
      startedAt: Date.now(),
      events: [
        { id: mkId(), type: 'info',   message: 'Requesting bot from Recall.ai…', time: now() },
      ],
    }
    setSessions(prev => [...prev, session])

    // Simulate join flow
    setTimeout(() => {
      addEvent(id, { type: 'info',    message: 'Bot provisioned — joining meeting room…', time: now() })
    }, 800)
    setTimeout(() => {
      const ok = Math.random() > 0.15 // 85% success rate for demo
      if (ok) {
        setStatus(id, 'JOINED')
        addEvent(id, { type: 'success', message: 'Bot joined successfully — transcript stream active.', time: now() })
        setTimeout(() => {
          addEvent(id, { type: 'active', message: 'Listening for AI triggers…', time: now() })
        }, 1200)
      } else {
        setStatus(id, 'FAILED')
        addEvent(id, { type: 'error',   message: 'Failed to join — meeting may have ended or access denied.', time: now() })
      }
    }, 2200)
  }

  const handleLeave = useCallback((id) => {
    setStatus(id, 'LEAVING')
    addEvent(id, { type: 'info', message: 'Bot leaving meeting…', time: now() })
    setTimeout(() => {
      addEvent(id, { type: 'success', message: 'Bot removed from meeting successfully.', time: now() })
      setTimeout(() => {
        setSessions(prev => prev.filter(s => s.id !== id))
      }, 1200)
    }, 1400)
  }, [setStatus, addEvent])

  return (
    <div className="flex flex-col gap-6">
      {/* Join card */}
      <div className="card border border-teal-500/15 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Video size={16} className="text-teal-400" />
          <h2 className="font-semibold text-white text-sm">Join a Meeting</h2>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-0">
            <input
              type="url"
              value={url}
              onChange={e => { setUrl(e.target.value); setUrlError('') }}
              onKeyDown={e => e.key === 'Enter' && handleJoin()}
              placeholder="https://teams.live.com/meet/… or teams.microsoft.com/…"
              className="input-field font-mono text-xs h-11"
            />
            {urlError && <p className="text-xs text-red-400 mt-1.5">{urlError}</p>}
          </div>
          <button
            onClick={handleJoin}
            className="btn-primary h-11 px-6 shrink-0 gap-2"
          >
            <Plus size={15} /> Join Meeting
          </button>
        </div>
        <p className="mt-3 text-[11px] text-gray-600">
          Supports Microsoft Teams (teams.microsoft.com & teams.live.com), Zoom, and Google Meet links. The bot joins as a silent participant.
        </p>
      </div>

      {/* Active sessions */}
      {sessions.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Active Sessions ({sessions.length})
          </p>
          <div className="flex flex-col gap-3">
            <AnimatePresence>
              {sessions.map(s => (
                <MeetingCard key={s.id} meeting={s} onLeave={handleLeave} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Empty state */}
      {sessions.length === 0 && (
        <div className="card border border-white/5 p-12 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-navy-700 flex items-center justify-center mb-4">
            <Video size={24} className="text-gray-600" />
          </div>
          <p className="text-gray-400 font-medium mb-1">No active sessions</p>
          <p className="text-xs text-gray-600 max-w-xs">
            Paste a meeting URL above and click <strong className="text-gray-500">Join Meeting</strong> to deploy Alex.
          </p>
        </div>
      )}
    </div>
  )
}
