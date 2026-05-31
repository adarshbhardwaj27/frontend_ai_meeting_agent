import { useState, useEffect, useRef, useCallback } from 'react'

const SPEAKERS = ['Sarah Chen', 'James Park', 'Alex (AI)', 'David Kim', 'System']

const LOG_TEMPLATES = [
  // INFO
  { level: 'INFO',    text: 'Transcript chunk received — speaker: {speaker}, length: {len} chars' },
  { level: 'INFO',    text: 'Context analysis cycle completed ({decisions} decisions pending, {concerns} concerns)' },
  { level: 'INFO',    text: 'Rate limit check passed — last proactive message {secs}s ago' },
  { level: 'INFO',    text: 'Chat message delivered to meeting room' },
  { level: 'INFO',    text: 'Meeting duration: {dur} minutes' },
  { level: 'INFO',    text: 'Participants active: {p}' },
  // DEBUG
  { level: 'DEBUG',   text: 'Local scorer — TOPIC_DRIFT: {s1}, MEMORY_GAP: {s2}, VOICE_ADDRESS: {s3}' },
  { level: 'DEBUG',   text: 'Dispatching trigger to LLM service (priority P{p}, timeout {t}s)' },
  { level: 'DEBUG',   text: 'LLM call started — model: gpt-4-turbo-preview, timeout: {t}s' },
  { level: 'DEBUG',   text: 'LLM response parsed — decision: SUPPRESS, confidence: {conf}' },
  { level: 'DEBUG',   text: 'Queue size: {q} items, active priority: P{p}' },
  { level: 'DEBUG',   text: 'Chunk id: {id} added to buffer (total: {total} chunks in window)' },
  { level: 'DEBUG',   text: 'Context window: {tokens} tokens used of {max}' },
  { level: 'DEBUG',   text: 'Trigger dedup — {type} already queued, skipping' },
  // SUCCESS
  { level: 'SUCCESS', text: 'VOICE_ADDRESS detected — "{name}, what are the trade-offs?" (conf: {conf})' },
  { level: 'SUCCESS', text: 'LLM decision: SEND (confidence: {conf}) — dispatching response' },
  { level: 'SUCCESS', text: 'Voice reply synthesised and delivered in {ms}ms (ElevenLabs)' },
  { level: 'SUCCESS', text: 'Decision CONFIRMED: {topic} — moved to decisions_confirmed' },
  { level: 'SUCCESS', text: 'Transcript streaming active — WebSocket healthy' },
  // WARNING
  { level: 'WARNING', text: 'LLM latency elevated: {lat}s (soft threshold: 6.0s)' },
  { level: 'WARNING', text: 'Backpressure — queue full ({n} items), dropping P{p} trigger' },
  { level: 'WARNING', text: 'Context window at {pct}% capacity — compression scheduled' },
  { level: 'WARNING', text: 'ElevenLabs API slow response: {ms}ms' },
  { level: 'WARNING', text: 'Low-confidence trigger suppressed: {type} (conf: {conf})' },
  // ERROR
  { level: 'ERROR',   text: 'TTS synthesis failed — falling back to chat delivery' },
  { level: 'ERROR',   text: 'LLM call timed out after {t}s — trigger suppressed' },
  { level: 'ERROR',   text: 'Recall.ai API error {code} — retrying ({n}/3)' },
  { level: 'ERROR',   text: 'WebSocket disconnect — reconnecting to transcript stream…' },
]

const TRIGGER_TYPES = [
  'VOICE_ADDRESS', 'CONTRADICTION', 'MEMORY_GAP', 'TOPIC_DRIFT',
  'DECISION_FORMING', 'FACTUAL_INCONSISTENCY', 'RISK_OVERLOOKED',
]

const TOPICS = ['Kafka migration', 'Q3 roadmap', 'vendor lock-in', 'API latency', 'Sprint 8 scope']

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function pick(arr)       { return arr[Math.floor(Math.random() * arr.length)] }
function uid()           { return Math.random().toString(36).slice(2, 10) }

function buildLog(template) {
  return template.text
    .replace('{speaker}', pick(SPEAKERS))
    .replace('{len}',     rand(40, 280))
    .replace('{decisions}',rand(0, 4))
    .replace('{concerns}', rand(0, 3))
    .replace('{secs}',    rand(5, 90))
    .replace('{dur}',     rand(5, 55))
    .replace('{p}',       rand(2, 6))
    .replace('{s1}',      (Math.random() * 0.9).toFixed(2))
    .replace('{s2}',      (Math.random() * 0.9).toFixed(2))
    .replace('{s3}',      (Math.random() * 0.9).toFixed(2))
    .replace('{t}',       pick([8, 10, 15, 20]))
    .replace('{conf}',    (0.6 + Math.random() * 0.38).toFixed(2))
    .replace('{q}',       rand(0, 7))
    .replace('{id}',      uid())
    .replace('{total}',   rand(20, 200))
    .replace('{tokens}',  rand(800, 3800))
    .replace('{max}',     4096)
    .replace('{type}',    pick(TRIGGER_TYPES))
    .replace('{name}',    pick(['Alex', 'Hey Alex']))
    .replace('{ms}',      rand(290, 620))
    .replace('{topic}',   pick(TOPICS))
    .replace('{lat}',     (4 + Math.random() * 3.5).toFixed(1))
    .replace('{n}',       rand(1, 8))
    .replace('{pct}',     rand(60, 95))
    .replace('{code}',    pick([429, 500, 502, 503]))
}

/** Returns `{ logs, clearLogs }` — logs array auto-grows when `active` is true. */
export function useSimulatedLogs(active = true) {
  const [logs, setLogs] = useState([])
  const timerRef = useRef(null)
  const idRef    = useRef(0)

  const pushLog = useCallback(() => {
    const template = pick(LOG_TEMPLATES)
    const entry = {
      id:        ++idRef.current,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      level:     template.level,
      text:      buildLog(template),
    }
    setLogs(prev => [...prev.slice(-299), entry]) // keep last 300
    // schedule next log
    timerRef.current = setTimeout(pushLog, rand(700, 2800))
  }, [])

  useEffect(() => {
    if (active) {
      timerRef.current = setTimeout(pushLog, 400)
    }
    return () => clearTimeout(timerRef.current)
  }, [active, pushLog])

  const clearLogs = useCallback(() => setLogs([]), [])

  return { logs, clearLogs }
}
