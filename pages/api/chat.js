/**
 * POST /api/chat
 *
 * Server-side proxy for the Anthropic API.
 * The ANTHROPIC_API_KEY environment variable is only accessible here,
 * on the server — it is never included in the client JS bundle.
 *
 * Request body: { messages, system, maxTokens? }
 * Response:     { text } | { error }
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL         = 'claude-sonnet-4-20250514'
const DEFAULT_MAX   = 1500

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured on the server.' })
  }

  const { messages, system, maxTokens = DEFAULT_MAX } = req.body

  if (!messages || !system) {
    return res.status(400).json({ error: 'Request must include messages and system fields.' })
  }

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      MODEL,
        max_tokens: maxTokens,
        system,
        messages,
      }),
    })

    if (!upstream.ok) {
      const errText = await upstream.text()
      console.error('Anthropic API error:', upstream.status, errText)
      return res.status(upstream.status).json({
        error: `Upstream API error ${upstream.status}: ${errText.slice(0, 200)}`,
      })
    }

    const data = await upstream.json()
    const text = data.content?.map(b => b.text ?? '').join('') ?? ''
    return res.status(200).json({ text })

  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ error: err.message })
  }
}
