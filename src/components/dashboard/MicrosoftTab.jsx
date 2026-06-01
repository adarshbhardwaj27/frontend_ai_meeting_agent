import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, RefreshCw, Settings2, ExternalLink, Trash2 } from 'lucide-react'
import { api } from '../../api/client'

const JOIN_MODES = [
  { value: 'all',            label: 'All Teams meetings' },
  { value: 'organiser_list', label: 'Specific organisers only' },
  { value: 'title_regex',    label: 'Title matches a pattern' },
  { value: 'min_attendees',  label: 'Minimum attendee count' },
  { value: 'calendar_group', label: 'Calendar category / group' },
  { value: 'opt_in',         label: 'Opt-in (add Alex to invite)' },
]

export default function MicrosoftTab({ flashConnected = false }) {
  const [status, setStatus]       = useState(null)   // null = loading
  const [filters, setFilters]     = useState({ join_mode: 'all' })
  const [saving, setSaving]       = useState(false)
  const [flash, setFlash]         = useState(flashConnected)
  const [disconnecting, setDisc]  = useState(false)
  const [error, setError]         = useState(null)

  useEffect(() => {
    api.microsoftStatus()
      .then(s => {
        setStatus(s)
        if (s.join_filters) setFilters(s.join_filters)
      })
      .catch(() => setStatus({ connected: false }))
  }, [])

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(false), 4000)
    return () => clearTimeout(t)
  }, [flash])

  const handleConnect = () => {
    window.location.href = api.microsoftConnectUrl()
  }

  const handleSaveFilters = async () => {
    setSaving(true)
    setError(null)
    try {
      await api.microsoftFilters(filters)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDisconnect = async () => {
    if (!window.confirm('Disconnect Microsoft 365? Alex will stop auto-joining calendar meetings.')) return
    setDisc(true)
    try {
      await api.microsoftDisconnect()
      setStatus({ connected: false })
    } catch (e) {
      setError(e.message)
    } finally {
      setDisc(false)
    }
  }

  if (status === null) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <RefreshCw size={14} className="animate-spin" /> Checking M365 connection…
      </div>
    )
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Flash banner */}
      {flash && (
        <div className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/30 rounded-xl px-4 py-3 text-sm text-teal-400">
          <CheckCircle size={16} />
          Microsoft 365 connected successfully! Alex will now auto-join calendar meetings.
        </div>
      )}
      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
          <XCircle size={16} /> {error}
        </div>
      )}

      {/* Connection card */}
      <div className="bg-navy-800 border border-white/5 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {/* Microsoft logo placeholder */}
              <div className="w-8 h-8 rounded-lg bg-[#0078d4]/20 flex items-center justify-center text-[#0078d4] text-xs font-bold select-none">
                M
              </div>
              <h2 className="text-base font-bold text-white">Microsoft 365</h2>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Connect your M365 tenant so Alex automatically joins Teams meetings from your calendar.
            </p>
          </div>
          {status.connected ? (
            <span className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1.5 rounded-full">
              <CheckCircle size={12} /> Connected
            </span>
          ) : (
            <span className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <XCircle size={12} /> Not connected
            </span>
          )}
        </div>

        {status.connected && (
          <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-500 space-y-1">
            <p>Tenant ID: <span className="text-gray-400 font-mono">{status.tenant_id}</span></p>
            <p>
              Subscription:{' '}
              {status.subscription_active
                ? <span className="text-teal-400">Active</span>
                : <span className="text-yellow-400">Inactive — reconnect to reactivate</span>}
            </p>
            {status.subscription_expires_at && (
              <p>Renews before: <span className="text-gray-400">{new Date(status.subscription_expires_at).toLocaleString()}</span></p>
            )}
          </div>
        )}

        <div className="mt-5 flex gap-3">
          {status.connected ? (
            <>
              <button
                onClick={handleConnect}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-gray-300 transition-all"
              >
                <ExternalLink size={14} /> Reconnect
              </button>
              <button
                onClick={handleDisconnect}
                disabled={disconnecting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-sm text-red-400 transition-all disabled:opacity-50"
              >
                <Trash2 size={14} /> {disconnecting ? 'Disconnecting…' : 'Disconnect'}
              </button>
            </>
          ) : (
            <button
              onClick={handleConnect}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0078d4] hover:bg-[#106ebe] text-white text-sm font-semibold transition-all shadow-lg shadow-[#0078d4]/20"
            >
              <ExternalLink size={14} /> Connect Microsoft 365
            </button>
          )}
        </div>
      </div>

      {/* Join filters — only show when connected */}
      {status.connected && (
        <div className="bg-navy-800 border border-white/5 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Settings2 size={16} className="text-teal-400" />
            <h3 className="text-sm font-bold text-white">Meeting Join Rules</h3>
          </div>
          <p className="text-xs text-gray-500">Control which Teams meetings Alex joins automatically.</p>

          {/* Join mode selector */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium">Join rule</label>
            <select
              value={filters.join_mode}
              onChange={e => setFilters(f => ({ join_mode: e.target.value }))}
              className="w-full bg-navy-900 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500/50"
            >
              {JOIN_MODES.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* Mode-specific fields */}
          {filters.join_mode === 'organiser_list' && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-medium">Organiser email addresses (one per line)</label>
              <textarea
                rows={3}
                value={(filters.organisers ?? []).join('\n')}
                onChange={e => setFilters(f => ({ ...f, organisers: e.target.value.split('\n').map(s => s.trim()).filter(Boolean) }))}
                placeholder="engineering@company.com"
                className="w-full bg-navy-900 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500/50 resize-none font-mono"
              />
            </div>
          )}
          {filters.join_mode === 'title_regex' && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-medium">Title pattern (regex, case-insensitive)</label>
              <input
                type="text"
                value={filters.title_pattern ?? ''}
                onChange={e => setFilters(f => ({ ...f, title_pattern: e.target.value }))}
                placeholder="(standup|planning|retro)"
                className="w-full bg-navy-900 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500/50 font-mono"
              />
            </div>
          )}
          {filters.join_mode === 'min_attendees' && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-medium">Minimum attendees</label>
              <input
                type="number"
                min={2}
                value={filters.min_attendees ?? 3}
                onChange={e => setFilters(f => ({ ...f, min_attendees: parseInt(e.target.value, 10) }))}
                className="w-full bg-navy-900 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500/50"
              />
            </div>
          )}
          {filters.join_mode === 'calendar_group' && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-medium">Calendar category / group name</label>
              <input
                type="text"
                value={filters.calendar_group ?? ''}
                onChange={e => setFilters(f => ({ ...f, calendar_group: e.target.value }))}
                placeholder="Engineering"
                className="w-full bg-navy-900 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500/50"
              />
            </div>
          )}
          {filters.join_mode === 'opt_in' && (
            <div className="space-y-2">
              <label className="text-xs text-gray-400 font-medium">Alex&apos;s invite address</label>
              <input
                type="email"
                value={filters.opt_in_address ?? 'alex@meetmind.ai'}
                onChange={e => setFilters(f => ({ ...f, opt_in_address: e.target.value }))}
                className="w-full bg-navy-900 border border-white/10 text-white text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-500/50"
              />
              <p className="text-[10px] text-gray-600">Add this address as an attendee to opt a meeting in.</p>
            </div>
          )}

          <button
            onClick={handleSaveFilters}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-900 text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-teal-500/20"
          >
            {saving ? <><RefreshCw size={14} className="animate-spin" /> Saving…</> : 'Save Rules'}
          </button>
        </div>
      )}
    </div>
  )
}
