# AXIOM Intelligence

**An autonomous, AI-powered interview preparation system** that builds a personalized knowledge base from your resume, runs live mock interviews using the Claude API, evaluates your answers against a formal rubric, identifies knowledge gaps, and generates an adaptive learning plan — all in a single web app.

> Built by Sneh Shah · GMU CS '26 · [linkedin.com/in/snehsshah](https://linkedin.com/in/snehsshah/) · [github.com/snehehe](https://github.com/snehehe)

---

## What It Does

Most interview prep tools give you a static question bank. AXIOM is different — it's a goal-driven system that reasons about your specific background and adapts over time.

**Live AI simulation** — generates domain-specific questions tailored to your actual resume (projects, internships, stack), then evaluates your answer across 5 dimensions: conceptual correctness, depth, clarity, practical applicability, and use of personal experience.

**Formal evaluation rubric** — every answer gets a numeric score per dimension, a list of strengths, missing components, a concrete improvement tip, a model answer showing what ideal looks like, and a follow-up question to go deeper.

**Knowledge base** — your resume is parsed into semantic knowledge units with confidence scores, linked in a concept graph that shows prerequisite and similarity relationships between skills.

**Gap analysis + adaptive plan** — the system identifies your highest-risk gaps (with propagation analysis: fixing X lifts overall score by Y pts) and generates a prioritized 3-week learning plan.

**Longitudinal tracking** — performance trajectory charts, mastery forecasts, improvement velocity, and session heatmaps track progress over time.

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Browser (React)                  │
│                                                     │
│  AxiomApp → tabs: Dashboard / Simulate / Knowledge  │
│             Gaps / Progress                         │
│                                                     │
│  useSimulate hook → POST /api/chat                  │
└──────────────────────┬──────────────────────────────┘
                       │  (API key never in browser)
┌──────────────────────▼──────────────────────────────┐
│            Next.js API Route: /api/chat             │
│        (server-side proxy — key stays here)         │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│           Anthropic Claude API                      │
│       claude-sonnet-4-20250514                      │
└─────────────────────────────────────────────────────┘
```

The key security decision: the Anthropic API key lives **only on the server** in a Next.js API route. The browser never sees it — it calls `/api/chat`, not `api.anthropic.com` directly.

---

## Project Structure

```
axiom-intelligence/
├── pages/
│   ├── index.jsx          # Entry page
│   ├── _app.jsx           # Global CSS injection
│   └── api/
│       └── chat.js        # ✅ Secure server-side API proxy
│
└── src/
    ├── components/
    │   ├── AxiomApp.jsx       # Root layout + tab routing
    │   ├── ScoreRing.jsx      # SVG circular progress ring
    │   ├── WeekHeatmap.jsx    # Practice activity heatmap
    │   ├── ConceptGraph.jsx   # Skill relationship graph (SVG)
    │   ├── CycleSidebar.jsx   # 8-step autonomous cycle tracker
    │   └── tabs/
    │       ├── DashboardTab.jsx   # Readiness overview
    │       ├── SimulateTab.jsx    # Live AI interview simulation
    │       ├── KnowledgeTab.jsx   # Searchable knowledge units
    │       ├── GapsTab.jsx        # Gap analysis + learning plan
    │       └── ProgressTab.jsx    # Charts + mastery forecast
    │
    ├── data/
    │   ├── colors.js    # Single color palette (JS + CSS in sync)
    │   └── resume.js    # All profile data — edit this to customize
    │
    ├── hooks/
    │   └── useSimulate.js   # All simulate state + async logic
    │
    ├── lib/
    │   ├── claude.js    # callClaude() — hits /api/chat proxy
    │   └── prompts.js   # System prompt + domain labels
    │
    └── styles/
        └── globals.css  # Design tokens, animations, all shared classes
```

---

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 14 (React 18) |
| **AI** | Anthropic Claude (`claude-sonnet-4-20250514`) |
| **Styling** | CSS custom properties + inline JS styles |
| **Fonts** | Syne (UI) · Space Mono (data/code) |
| **Charts** | Hand-rolled SVG — no chart library dependencies |
| **State** | React hooks only — no Redux or Zustand |
| **Deployment** | Vercel (recommended) |

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/snehehe/axiom-intelligence.git
cd axiom-intelligence
npm install
```

### 2. Add your API key

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get a key at [console.anthropic.com](https://console.anthropic.com). The key is **only read server-side** in `pages/api/chat.js` — it never touches the browser bundle.

### 3. Run

```bash
npm run dev
# → http://localhost:3000
```

---

## Deploy to Vercel (free)

```bash
npm i -g vercel
vercel
```

In the Vercel dashboard → Settings → Environment Variables, add:
```
ANTHROPIC_API_KEY = sk-ant-...
```

The `/api/chat` route runs as a serverless function, so the key stays server-side in production too.

---

## Customizing for Your Own Profile

All profile data is in **`src/data/resume.js`**. Update the exports:

- `PROFILE` — name, school, graduation date, target role
- `SKILL_DOMAINS` — domains and current mastery scores
- `KNOWLEDGE_UNITS` — resume bullet points as semantic memory entries
- `GAP_ITEMS` — your identified weak areas
- `AGENDA`, `LEARNING_PLAN` — prep schedule

Then update the AI system prompt in **`src/lib/prompts.js`** with your background so the interviewer and evaluator reference your actual experience.

---

## How the Evaluation Works

When you submit an answer in the Simulate tab, the system sends your answer alongside the original question and your full profile to Claude with a structured prompt that returns JSON:

```json
{
  "overall": 74,
  "scores": {
    "Conceptual Correctness": 80,
    "Depth & Specificity": 70,
    "Communication Clarity": 85,
    "Practical Applicability": 72,
    "Use of Personal Experience": 65
  },
  "strengths": ["..."],
  "gaps": ["..."],
  "improved_tip": "...",
  "follow_up": "...",
  "example_answer": "..."
}
```

The model answer is written as if *you* gave the ideal response — referencing your actual projects and internships — so it's immediately actionable rather than generic.

---

## License

MIT — feel free to fork and adapt for your own interview prep.
