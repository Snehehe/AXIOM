# CLAUDE.md — AXIOM Intelligence

AI-powered interview preparation system built with Next.js 14 + React 18 + Anthropic Claude API.

---

## Setup & Commands

### First-time setup
```bash
npm install                        # install dependencies
cp .env.local.example .env.local   # create env file
# edit .env.local → set ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get an API key at https://console.anthropic.com

### Dev / build
```bash
npm run dev      # start dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

### Vercel deployment
```bash
npm i -g vercel
vercel
# Add ANTHROPIC_API_KEY in Vercel dashboard → Settings → Environment Variables
```

---

## Project Structure

```
pages/
  index.jsx            # Entry point — mounts <AxiomApp />
  _app.jsx             # Global CSS import
  api/chat.js          # Server-side Anthropic API proxy (API key lives here only)

src/
  components/
    AxiomApp.jsx        # Root layout, tab state, sidebar
    CycleSidebar.jsx    # 8-step autonomy cycle visualizer
    ScoreRing.jsx       # SVG circular progress ring
    WeekHeatmap.jsx     # SVG calendar heatmap
    ConceptGraph.jsx    # SVG force-directed skill graph
    tabs/
      DashboardTab.jsx  # Readiness overview, domain mastery
      SimulateTab.jsx   # Live AI interview simulation (main feature)
      KnowledgeTab.jsx  # Knowledge units + confidence scores
      GapsTab.jsx       # Gap analysis + adaptive learning plan
      ProgressTab.jsx   # Performance charts + mastery forecasts

  data/
    resume.js           # Single source of truth for all profile data
    colors.js           # JS mirror of CSS design tokens

  hooks/
    useSimulate.js      # All state + async logic for interview simulation

  lib/
    claude.js           # callClaude() + parseJson() helpers
    prompts.js          # SYSTEM_PROMPT + DOMAIN_LABELS

  styles/
    globals.css         # Design tokens (CSS vars), animations, shared classes
```

Path alias: `@` maps to `src/` (configured in `next.config.js` and `jsconfig.json`).

---

## Architecture & Key Patterns

### API Security — Server-Side Proxy
The browser **never** touches the Anthropic API directly.

```
Client (browser)
  → POST /api/chat  { messages, system, maxTokens }
  → pages/api/chat.js  (reads process.env.ANTHROPIC_API_KEY)
  → https://api.anthropic.com/v1/messages
```

`ANTHROPIC_API_KEY` is only accessible in `pages/api/chat.js`. Never import it in client code.

### Model
`claude-sonnet-4-20250514` — set in `pages/api/chat.js`. Change only here.

### Claude Response Modes
`SYSTEM_PROMPT` in `src/lib/prompts.js` supports two modes passed via user message:

- **QUESTION mode** — returns a single raw question string (no JSON).
- **EVALUATE mode** — returns a strict JSON object (no markdown fences, no prose).

`parseJson()` in `src/lib/claude.js` extracts the JSON object from the raw response using a regex match on `{...}`.

### Resume as Configuration
`src/data/resume.js` is the **single source of truth** for all profile data. Every feature (prompts, charts, gap analysis, knowledge base) reads from it. To personalize the app for a different user, update only this file and `src/lib/prompts.js`.

Exports:
- `PROFILE` — name, school, contact, target role
- `SKILL_DOMAINS` — 6 domains with mastery scores, trends, colors
- `KNOWLEDGE_UNITS` — 8 semantic memory entries with confidence scores
- `GAP_ITEMS` — identified weakness areas with severity
- `AGENDA` + `LEARNING_PLAN` — 3-week prep schedule
- `PERFORMANCE_SERIES` — historical mastery data per domain
- `LONGITUDINAL_METRICS` — velocity, retention, consistency, forecast
- `CYCLE_STEPS` — 8-step autonomy cycle labels/icons/descriptions

### Interview Simulation State (`useSimulate.js`)
Manages a three-phase state machine:
- `setup` → `running` → `eval`

Key functions: `startSession()`, `submitAnswer()`, `reset()`, `doFollowUp()`.

Evaluation JSON schema (returned by Claude in EVALUATE mode):
```json
{
  "overall": 75,
  "scores": {
    "Conceptual Correctness": 80,
    "Depth & Specificity": 70,
    "Communication Clarity": 85,
    "Practical Applicability": 72,
    "Use of Personal Experience": 68
  },
  "strengths": ["..."],
  "gaps": ["..."],
  "improved_tip": "...",
  "follow_up": "...",
  "example_answer": "..."
}
```

### Styling Conventions
- **No Tailwind, no UI component library** — pure CSS custom properties + inline JS styles.
- Design tokens defined in `src/styles/globals.css` under `:root` and mirrored in `src/data/colors.js` for use in inline styles.
- Shared utility classes: `.panel-card`, `.tab-btn`, `.action-btn`, `.tag`, `.mono`, `.fade-up`, `.shimmer-text`, `.spinner`, `.cycle-step`, `.metric-tile`, `.progress-bar`.
- Fonts: **Syne** (UI text) and **Space Mono** (data/code/monospace) via Google Fonts.
- Color palette: dark background (`#0a0c10`), amber accent (`#f0a500`), cyan (`#00c8d4`), green (`#2ecc71`), red (`#e74c3c`).

### Charts & Visualizations
All charts are **hand-rolled SVG** — no Chart.js, D3, or Recharts.
- `ScoreRing.jsx` — animated stroke-dashoffset circle
- `WeekHeatmap.jsx` — grid of colored squares (calendar view)
- `ConceptGraph.jsx` — static force-directed node graph

Do not add charting libraries without strong justification.

---

## Environment Variables

| Variable            | Where used              | Notes                            |
|---------------------|-------------------------|----------------------------------|
| `ANTHROPIC_API_KEY` | `pages/api/chat.js` only | Never reference in client code   |

---

## Do / Don't

**Do:**
- Update `src/data/resume.js` and `src/lib/prompts.js` together when personalizing for a new user.
- Keep all Claude calls going through `callClaude()` in `src/lib/claude.js`.
- Use the `@` path alias for all imports within `src/`.
- Add new tabs as components in `src/components/tabs/` and wire them in `AxiomApp.jsx`.

**Don't:**
- Import or reference `ANTHROPIC_API_KEY` in any file under `src/` or `pages/` except `pages/api/chat.js`.
- Add Tailwind, CSS modules, or UI libraries (shadcn, MUI, etc.) — the design system is self-contained.
- Add charting libraries — extend existing SVG components instead.
- Commit `.env.local` or any file containing the API key.
- Change the Claude model without updating `pages/api/chat.js`.
