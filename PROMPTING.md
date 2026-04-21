### Stage A — get the steps on paper

> I want an autonomous interview-prep cycle. The system should:
> - start from the candidate's current knowledge state and known gaps
> - select what to drill next
> - execute a question/answer/evaluation round
> - update its internal state based on what it learned
> - decide what to do next time
>
> Propose the 6–10 steps that make up this cycle as a numbered list. For each
> step, specify:
> - what it reads from state
> - what it writes to state
> - what would cause it to fail
>
> Do not write code.

### Stage B — pick the state shape

Once the steps were agreed, I asked for the state object:

> Given the cycle steps above, propose a single JSON state object that all
> steps can read from and write to. Keep it flat where possible. Call out any
> field where stale data would cause a bug.

### Stage C — only now, the code

> Implement step 3 (evaluate answer) as an async function that takes the
> current state object and returns an updated state object. Use the evaluator
> system prompt from `prompts.js`. The function must not mutate the input.

Building up in layers like this meant that when something broke, I could tell
which layer owned the bug. Most of my debugging happened in Stage A and B —
fixing the *design* — not in the code itself.

---

## Patterns That Worked

- **Constraints over outcomes.** "Return JSON matching this schema, with
  integers not floats, 2–4 items per array" beat "give me evaluation data."
- **Plan-then-code.** Getting a numbered plan or a data model before any
  implementation caught design errors cheaply.
- **Explicit failure tokens.** `SCHEMA_ERROR` for JSON, `INSUFFICIENT_CONTEXT`
  for retrieval. The model will hallucinate a reasonable-looking answer
  otherwise.
- **Numbered reasoning steps for high-stakes decisions.** Forcing the model to
  walk through the problem before proposing a fix.
- **Structured context, not prose blobs.** JSON with named fields gave the
  model something to reference by name.

## Patterns That Failed

- **"Be creative"** / **"Make it look nice"** — always produced AI-generic
  output. I had to describe the feeling I wanted, concretely.
- **Prompting for the whole feature at once** — more code = more places for
  subtle bugs, and I'd lose track of what I'd actually reviewed.
- **Trusting the first plan the model proposed** — almost always needed one
  round of pushback. "What would go wrong with this? What are the edge cases
  you didn't handle?" usually surfaced a real issue.
- **Regex over model output** — every single time I tried to parse prose, it
  broke within a week. Always cheaper to change the prompt than to harden the
  parser.

---

*Last updated during the Vite → Next.js migration. This file is a running log,
not a polished doc — it's here so I can remember how I got here.*
