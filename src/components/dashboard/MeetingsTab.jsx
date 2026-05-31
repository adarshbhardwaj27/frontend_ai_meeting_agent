import { useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Video, Plus, Loader2 } from 'lucide-react'
import MeetingCard from './MeetingCard'
import { api } from '../../api/client'

const POLL_MS = 2500

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

function fromApi(s) {
  return {
    id:        s.id,
    url:       s.meeting_url,
    status:    s.status,
    startedAt: new Date(s.started_at).getTime(),
    events:    (s.events ?? []).map((e, i) => ({ id: e.id ?? i, ...e })),
  }
}

export default function MeetingsTab() {
  const [url,      setUrl]      = useState('')
  const [urlError, setUrlError] = useState('')
  const [sessions, setSessions] = useState([])
  const [joining,  setJoining]  = useState(false)
  const polls = useRef({})

  // Load existing sessions on mount
  useEffect(() => {
    api.getSessions()
      .then(({ sessions: list }) => {
        const active = list.filter(s => s.status !== 'ENDED')
        setSessions(active.map(fromApi))
        active.forEach(s => startPolling(s.id))
      })
      .catch(console.error)
    return () => Object.values(polls.current).forEach(clearInterval)
  }, [])

  function startPolling(id) {
    if (polls.current[id]) return
    polls.current[id] = setInterval(async () => {
      try {
        const data = await api.getSession(id)
        setSessions(prev => prev.map(s => s.id === id ? fromApi(data) : s))
        if (['ENDED', 'FAILED'].includes(data.status)) {
          clearInterval(polls.current[id])
          delete polls.current[id]
          if (data.status === 'ENDED') {
            setTimeout(() => setSessions(prev => prev.filter(s => s.id !== id)), 3000)
          }
        }
      } catch {
        clearInterval(polls.current[id])
        delete polls.current[id]
      }
    }, POLL_MS)
  }

  const handleJoin = async () => {
    const trimmed = url.trim()
    if (!trimmed) { setUrlError('Paste a meeting URL above.'); return }
    if (!validateUrl(trimmed)) { setUrlError('Must be a valid Teams, Zoom, or Google Meet URL.'); return }
    setUrlError('')
    setUrl('')
    setJoining(true)
    try {
      const { session_id } = await api.createSession(trimmed)
      const data = await api.getSession(session_id)
      setSessions(prev => [...prev, fromApi(data)])
      startPolling(session_id)
    } catch (e) {
      setUrlError(e.message || 'Failed to start session — check your connection.')
    } finally {
      setJoining(false)
    }
  }

  const handleLeave = useCallback(async (id) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, status: 'LEAVING' } : s))
    try {
      await api.deleteSession(id)
    } catch (e) {
      console.error('Leave failed:', e)
    }
  }, [])

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
              onKeyDown={e => e.key === 'Enter' && !joining && handleJoin()}
              placeholder="https://teams.live.com/meet/… or teams.microsoft.com/…"
              className="input-field font-mono text-xs h-11"
              disabled={joining}
            />
            {urlError && <p className="text-xs text-red-400 mt-1.5">{urlError}</p>}
          </div>
          <button
            onClick={handleJoin}
            disabled={joining}
            className="btn-primary h-11 px-6 shrink-0 gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {joining
              ? <><Loader2 size={15} className="animate-spin" /> Joining…</>
              : <><Plus size={15} /> Join Meeting</>}
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
