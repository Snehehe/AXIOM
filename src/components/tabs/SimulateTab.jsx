import COLORS from '@/data/colors'
import { DOMAIN_LABELS } from '@/lib/prompts'
import { useSimulate } from '@/hooks/useSimulate'
import ScoreRing from '@/components/ScoreRing'
import CycleSidebar from '@/components/CycleSidebar'

export default function SimulateTab() {
  const {
    phase, domain, difficulty, question, answer,
    evalResult, followUp, loading, loadingMsg,
    cycleStep, error, showExample,
    setDomain, setDifficulty, setAnswer, setShowExample,
    startSession, submitAnswer, reset, doFollowUp,
  } = useSimulate()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* ── Setup ── */}
        {phase === 'setup' && (
          <div className="panel-card fade-up" style={{ padding: 28 }}>
            <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 20 }}>
              Configure Interview Session
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 6 }}>Domain</div>
                <select value={domain} onChange={e => setDomain(e.target.value)}>
                  <option value="ml">AI / Machine Learning</option>
                  <option value="backend">Backend / Java</option>
                  <option value="behavioral">Behavioral / STAR</option>
                  <option value="systems">Systems Design</option>
                  <option value="cloud">Cloud / DevOps</option>
                </select>
              </div>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 6 }}>Difficulty</div>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                  <option value="entry-level">Entry Level / New Grad</option>
                  <option value="mid-level">Mid Level (2–4 yr)</option>
                  <option value="senior">Senior (challenge mode)</option>
                </select>
              </div>
            </div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 16, lineHeight: 1.6 }}>
              The AI interviewer is loaded with Sneh's full profile — CACI internships, ThoughtWeaver, Face-Aware App, Skin Cancer AI, and all technical skills. Questions and evaluations are personalized to this background.
            </div>
            {error && <ErrorBox message={error} />}
            <button className="action-btn" onClick={startSession} disabled={loading}>
              {loading ? <><span className="spinner" style={{ marginRight: 8 }} />{loadingMsg}</> : 'Generate Question →'}
            </button>
          </div>
        )}

        {/* ── Question + Answer ── */}
        {phase === 'running' && (
          <>
            <div className="panel-card fade-up" style={{ padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  Interview Question
                </div>
                <span className="tag" style={{ background: COLORS.cyanFaint, color: COLORS.cyan, border: '1px solid #005560' }}>
                  {DOMAIN_LABELS[domain]}
                </span>
              </div>
              <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.75 }}>{question}</div>
            </div>

            <div className="panel-card fade-up-1" style={{ padding: 22 }}>
              <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                Your Response
              </div>
              <textarea
                rows={9}
                placeholder="Answer here. Be specific — reference your projects and internship experience. The evaluator scores depth, clarity, and use of real examples..."
                value={answer}
                onChange={e => setAnswer(e.target.value)}
              />
              {error && <ErrorBox message={error} style={{ marginTop: 8 }} />}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <button className="action-btn" onClick={submitAnswer} disabled={loading || !answer.trim()}>
                  {loading ? <><span className="spinner" style={{ marginRight: 8 }} />{loadingMsg}</> : 'Submit for Evaluation →'}
                </button>
                <button className="action-btn secondary" onClick={reset}>Cancel</button>
              </div>
            </div>
          </>
        )}

        {/* ── Evaluation report ── */}
        {phase === 'eval' && evalResult && (
          <div className="panel-card fade-up" style={{ padding: 24 }}>
            <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18 }}>
              Evaluation Report
            </div>

            {/* Score ring + dimension bars */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
              <ScoreRing
                score={evalResult.overall ?? 0}
                size={82}
                color={evalResult.overall > 79 ? COLORS.green : evalResult.overall > 59 ? COLORS.amber : COLORS.red}
              />
              <div style={{ flex: 1 }}>
                {Object.entries(evalResult.scores ?? {}).map(([label, score]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 11, color: COLORS.textMid, width: 188, flexShrink: 0 }}>{label}</div>
                    <div className="progress-bar" style={{ flex: 1 }}>
                      <div className="progress-fill" style={{ '--tw': `${score}%`, background: score > 79 ? COLORS.green : score > 59 ? COLORS.amber : COLORS.red }} />
                    </div>
                    <div className="mono" style={{ fontSize: 11, width: 26, textAlign: 'right', color: COLORS.textMid }}>{score}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths / Missing */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, color: COLORS.green, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>Strengths</div>
                {(evalResult.strengths ?? []).map((s, i) => (
                  <div key={i} style={{ fontSize: 12, color: COLORS.textMid, padding: '5px 0', borderBottom: `1px solid ${COLORS.border}` }}>✓ {s}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 10, color: COLORS.red, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>Missing</div>
                {(evalResult.gaps ?? []).map((g, i) => (
                  <div key={i} style={{ fontSize: 12, color: COLORS.textMid, padding: '5px 0', borderBottom: `1px solid ${COLORS.border}` }}>✗ {g}</div>
                ))}
              </div>
            </div>

            {/* Improvement tip */}
            {evalResult.improved_tip && (
              <div style={{ background: COLORS.surface, borderRadius: 6, padding: 14, borderLeft: `3px solid ${COLORS.amber}`, marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: COLORS.amber, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>Improvement Tip</div>
                <div style={{ fontSize: 12, color: COLORS.textMid, lineHeight: 1.7 }}>{evalResult.improved_tip}</div>
              </div>
            )}

            {/* Model answer (collapsible) */}
            {evalResult.example_answer && (
              <div style={{ background: COLORS.greenFaint, borderRadius: 6, border: '1px solid #1a3a28', marginBottom: 12, overflow: 'hidden' }}>
                <button
                  onClick={() => setShowExample(v => !v)}
                  style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14 }}>✦</span>
                    <span style={{ fontSize: 10, color: COLORS.green, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: "'Syne', sans-serif" }}>
                      Model Answer
                    </span>
                    <span style={{ fontSize: 10, color: COLORS.textDim, fontFamily: "'Space Mono', monospace" }}>
                      — what an ideal response looks like
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: COLORS.green, fontFamily: "'Space Mono', monospace", transform: showExample ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform .2s', display: 'inline-block' }}>
                    ▶
                  </span>
                </button>
                {showExample && (
                  <div style={{ padding: '0 14px 14px', borderTop: '1px solid #1a3a28' }}>
                    <div style={{ paddingTop: 12, fontSize: 12, color: COLORS.textMid, lineHeight: 1.85, fontFamily: "'Space Mono', monospace", whiteSpace: 'pre-wrap' }}>
                      {evalResult.example_answer}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Follow-up */}
            {followUp && (
              <div style={{ background: COLORS.cyanFaint, borderRadius: 6, padding: 14, borderLeft: `3px solid ${COLORS.cyan}`, marginBottom: 14 }}>
                <div style={{ fontSize: 10, color: COLORS.cyan, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>Follow-Up Question</div>
                <div style={{ fontSize: 12, color: COLORS.textMid, lineHeight: 1.7 }}>{followUp}</div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              {followUp && <button className="action-btn" onClick={doFollowUp}>Answer Follow-Up →</button>}
              <button className="action-btn secondary" onClick={reset}>New Session</button>
            </div>
          </div>
        )}
      </div>

      <CycleSidebar cycleStep={cycleStep} />
    </div>
  )
}

function ErrorBox({ message }) {
  return (
    <div style={{ color: '#e74c3c', fontSize: 12, fontFamily: "'Space Mono', monospace", background: '#200808', padding: 10, borderRadius: 5, marginBottom: 8 }}>
      {message}
    </div>
  )
}
