const BASE = import.meta.env.VITE_API_URL ?? 'https://api.taskora.in.net'

// All requests send the httpOnly cookie automatically via credentials: 'include'.
// No API key header needed — auth is handled server-side via JWT cookie.
async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...opts.headers },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail ?? `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  // Auth
  login:  (email, password) => req('/auth/login',  { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: ()                => req('/auth/logout', { method: 'POST' }),
  me:     ()                => req('/auth/me'),

  // Sessions
  getSessions:   ()           => req('/api/v1/sessions'),
  getSession:    (id)         => req(`/api/v1/sessions/${id}`),
  createSession: (meetingUrl) => req('/api/v1/sessions', {
    method: 'POST',
    body: JSON.stringify({ meeting_url: meetingUrl }),
  }),
  deleteSession: (id) => req(`/api/v1/sessions/${id}`, { method: 'DELETE' }),

  /**
   * Stream logs for a session via SSE (using fetch so we can send auth headers).
   * Returns a cancel function.
   */
  streamLogs(sessionId, onLog) {
    const ctrl = new AbortController()
    ;(async () => {
      try {
        const res = await fetch(`${BASE}/api/v1/sessions/${sessionId}/logs`, {
          credentials: 'include',
          signal: ctrl.signal,
        })
        const reader = res.body.getReader()
        const dec = new TextDecoder()
        let buf = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buf += dec.decode(value, { stream: true })
          const parts = buf.split('\n')
          buf = parts.pop()
          for (const line of parts) {
            if (line.startsWith('data: ')) {
              try { onLog(JSON.parse(line.slice(6))) } catch {}
            }
          }
        }
      } catch (e) {
        if (e.name !== 'AbortError') console.error('[SSE]', e)
      }
    })()
    return () => ctrl.abort()
  },
}
