# Resume Bullets — AXIOM Intelligence

Pick the version that fits the space on your resume. Use the **short** version
if you're tight on space; use the **expanded** set if you have a full project
entry.

---

## Single-line version (fits in a project name line)

**AXIOM Intelligence** — Autonomous AI interview prep system with RAG knowledge
base, live Claude-powered mock interviews, and adaptive gap analysis

---

## Standard 3–4 bullet project entry

**AXIOM Intelligence** | Next.js · React · Anthropic Claude API · Node.js
*Personal Project · Feb 2026*

- Architected a full-stack autonomous interview preparation platform using
  Next.js and the Anthropic Claude API, implementing a secure server-side proxy
  so API credentials are never exposed in client-side code

- Built a retrieval-augmented knowledge layer that converts resume bullet points
  into semantic memory units with confidence scores and a concept graph, enabling
  personalized, evidence-grounded question generation and answer evaluation

- Designed a structured evaluation engine that scores answers across 5 dimensions
  (conceptual correctness, depth, clarity, applicability, use of personal
  experience), generates improvement tips, model answers, and follow-up
  questions — all returned as parsed JSON from a single LLM call

- Implemented an adaptive gap analysis system that identifies high-risk knowledge
  gaps, propagates their impact across the skill graph, and auto-generates a
  prioritized 3-week learning plan

---

## Expanded 5-bullet version (if you have the room)

**AXIOM Intelligence** | Next.js · React · Anthropic Claude API · Node.js · CSS
*Personal Project · Feb 2026*

- Designed and built an end-to-end autonomous interview preparation system
  featuring live AI mock interviews, formal answer evaluation, knowledge gap
  identification, and longitudinal skill tracking across 6 technical domains

- Secured API key exposure by routing all Anthropic Claude requests through a
  Next.js serverless API route proxy, ensuring credentials never appear in the
  browser bundle or client-side network requests

- Engineered a RAG-inspired knowledge base that stores resume experience as
  semantic units with confidence weights and concept graph edges, grounding all
  AI-generated questions and evaluations in the user's actual background

- Built a structured JSON evaluation pipeline that returns per-dimension scores,
  gap diagnostics, improvement tips, and a full model answer in a single LLM
  call, parsed reliably using regex-safe JSON extraction

- Architected a clean component-based React codebase with custom hooks
  (useSimulate), separated data/API/UI layers, and hand-rolled SVG charts — zero
  charting library dependencies

---

## What to say if asked about it in an interview

**"What problem does it solve?"**
Most prep tools are static question banks. This one knows your actual background —
your internships, projects, stack — and uses that to generate relevant questions,
evaluate how well you drew on your experience, and tell you specifically what was
missing from your answer versus what an ideal answer would look like.

**"What was the hardest technical decision?"**
The API security setup. Vite bakes any `VITE_` env variable into the client JS
bundle, so your key is visible to anyone who opens DevTools. I switched to Next.js
specifically to get a serverless API route that proxies the Anthropic call
server-side — the browser only ever hits `/api/chat`, never `api.anthropic.com`
directly.

**"Why not use a vector database for the knowledge base?"**
For the scope of a single user's resume, a vector DB would be over-engineered.
The knowledge units are small enough to include directly in the LLM context
window via the system prompt. If I were scaling this to multiple users or large
document ingestion, I'd add a proper vector store (Pinecone or pgvector).

**"What would you add next?"**
Persistent session storage so scores accumulate across visits, streaming the
Claude response for faster perceived latency, and a voice mode using the Web
Speech API so you can practice speaking answers out loud.
