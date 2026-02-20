/**
 * Client-side Claude API wrapper.
 *
 * All requests go to /api/chat (our Next.js proxy) — the Anthropic API key
 * never appears in browser code or network requests from the client.
 */

/**
 * @param {Array<{role: string, content: string}>} messages
 * @param {string} system
 * @param {number} [maxTokens=1500]
 * @returns {Promise<string>}
 */
export async function callClaude(messages, system, maxTokens = 1500) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, system, maxTokens }),
  })

  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
    throw new Error(error ?? `Request failed with status ${res.status}`)
  }

  const { text, error } = await res.json()
  if (error) throw new Error(error)
  return text ?? ''
}

/**
 * Extract a JSON object from a Claude response that may include surrounding prose.
 * @param {string} raw
 * @returns {object}
 */
export function parseJson(raw) {
  const match = raw.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No JSON object found in response')
  return JSON.parse(match[0])
}
