import { useRef, useEffect, useState } from 'react'
import { Terminal, Trash2, ChevronsDown } from 'lucide-react'
import { api } from '../../api/client'

const LEVELS = ['ALL', 'DEBUG', 'INFO', 'SUCCESS', 'WARNING', 'ERROR']

const LEVEL_CHIP = {
  DEBUG:   'bg-sky-500/20   text-sky-400   border-sky-500/30',
  INFO:    'bg-gray-500/15  text-gray-400  border-gray-500/30',
  SUCCESS: 'bg-teal-500/20  text-teal-400  border-teal-500/30',
  WARNING: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  ERROR:   'bg-red-500/20   text-red-400   border-red-500/30',
}

export default function LogViewer() {
  const [sessions,    setSessions]    = useState([])
  const [selectedId,  setSelectedId]  = useState(null)
  const [logs,        setLogs]        = useState([])
  const [filter,      setFilter]      = useState('ALL')
  const [autoScroll,  setAutoScroll]  = useState(true)
  const bottomRef    = useRef(null)
  const containerRef = useRef(null)

  // Fetch active sessions on mount + every 10s
  useEffect(() => {
    function refresh() {
      api.getSessions()
        .then(({ sessions: list }) => {
          const active = list.filter(s => s.status !== 'ENDED')
          setSessions(active)
          setSelectedId(prev => {
            if (prev && active.find(s => s.id === prev)) return prev
            return active[0]?.id ?? null
          })
        })
        .catch(console.error)
    }
    refresh()
    const iv = setInterval(refresh, 10_000)
    return () => clearInterval(iv)
  }, [])

  // Stream logs whenever selectedId changes
  useEffect(() => {
    if (!selectedId) return
    setLogs([])
    const cancel = api.streamLogs(selectedId, log => {
      setLogs(prev => [...prev.slice(-299), log])
    })
    return cancel
  }, [selectedId])

  const visible = filter === 'ALL' ? logs : logs.filter(l => l.level === filter)

  useEffect(() => {
    if (autoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [visible.length, autoScroll])

  const handleScroll = () => {
    const el = containerRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40
    setAutoScroll(atBottom)
  }

  return (
    <div className="flex flex-col h-full gap-0">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <Terminal size={14} className="text-teal-400" />
          <span className="text-sm font-semibold text-white">Live Debug Logs</span>
          <span className="text-xs text-gray-600">({visible.length} entries)</span>
        </div>

        <div className="flex-1" />

        {/* Session selector */}
        {sessions.length > 0 && (
          <select
            value={selectedId ?? ''}
            onChange={e => setSelectedId(e.target.value)}
            className="bg-navy-800 border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500/50 cursor-pointer max-w-[220px] truncate"
          >
            {sessions.map(s => (
              <option key={s.id} value={s.id}>
                {new URL(s.meeting_url).hostname} ({s.status})
              </option>
            ))}
          </select>
        )}

        {/* Level filter */}
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-navy-800 border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500/50 cursor-pointer"
        >
          {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        {/* Auto-scroll toggle */}
        <button
          onClick={() => setAutoScroll(v => !v)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all duration-200
            ${autoScroll
              ? 'bg-teal-500/15 border-teal-500/30 text-teal-400'
              : 'bg-navy-800 border-white/10 text-gray-500 hover:text-gray-300'
            }`}
        >
          <ChevronsDown size={12} />
          Auto-scroll
        </button>

        {/* Clear */}
        <button
          onClick={() => setLogs([])}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border bg-navy-800 border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/30 transition-all duration-200"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>

      {/* Log pane */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto bg-navy-950 border border-white/5 rounded-2xl font-mono text-xs leading-relaxed"
        style={{ height: 'calc(100vh - 220px)' }}
      >
        {!selectedId ? (
          <div className="flex items-center justify-center h-full text-gray-700 gap-2">
            <Terminal size={16} />
            <span>No active sessions — join a meeting first.</span>
          </div>
        ) : visible.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-700 gap-2">
            <Terminal size={16} />
            <span>Waiting for log entries…</span>
          </div>
        ) : (
          <table className="w-full table-fixed">
            <colgroup>
              <col style={{ width: '80px' }} />
              <col style={{ width: '82px' }} />
              <col />
            </colgroup>
            <tbody>
              {visible.map(log => (
                <tr
                  key={log.id}
                  className="hover:bg-white/2 transition-colors duration-100"
                >
                  <td className="pl-4 pr-2 py-0.5 text-gray-600 whitespace-nowrap select-none">
                    [{log.timestamp}]
                  </td>
                  <td className="pr-2 py-0.5">
                    <span className={`inline-block text-[10px] font-bold px-1.5 py-px rounded border ${LEVEL_CHIP[log.level]}`}>
                      {log.level}
                    </span>
                  </td>
                  <td className="pr-4 py-0.5 text-gray-300 break-words">
                    {log.text}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
