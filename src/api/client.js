const BASE = import.meta.env.VITE_API_URL ?? 'https://api.taskora.in.net'
const KEY  = import.meta.env.VITE_API_KEY  ?? ''

function authHeaders() {
  return { 'Content-Type': 'application/json', 'X-API-Key': KEY }
}

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { ...authHeaders(), ...opts.headers },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail ?? `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
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
          headers: authHeaders(),
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
