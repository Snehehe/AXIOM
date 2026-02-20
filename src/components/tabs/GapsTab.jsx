import COLORS from '@/data/colors'
import { GAP_ITEMS, LEARNING_PLAN } from '@/data/resume'

export default function GapsTab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

      {/* Gap list */}
      <div className="panel-card fade-up" style={{ padding: 22 }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 16 }}>
          Identified Knowledge Gaps
        </div>
        {GAP_ITEMS.map(g => (
          <div key={g.concept} style={{ padding: 14, background: COLORS.surface, borderRadius: 6, border: `1px solid ${COLORS.border}`, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, color: COLORS.text, marginBottom: 5 }}>{g.concept}</div>
              <span className="tag" style={{ background: COLORS.cyanFaint, color: COLORS.cyan, border: '1px solid #005560' }}>{g.domain}</span>
            </div>
            <span className="tag" style={{
              background: g.severity === 'high' ? '#3a0a00' : g.severity === 'medium' ? COLORS.amberFaint : COLORS.cyanFaint,
              color:      g.severity === 'high' ? COLORS.red  : g.severity === 'medium' ? COLORS.amber     : COLORS.cyan,
              border:     `1px solid ${g.severity === 'high' ? '#5a1000' : g.severity === 'medium' ? COLORS.amberDim : '#005560'}`,
            }}>
              {g.severity}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Learning plan */}
        <div className="panel-card fade-up-1" style={{ padding: 22 }}>
          <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 14 }}>
            Adaptive Learning Plan
          </div>
          {LEARNING_PLAN.map((w, wi) => (
            <div key={w.week} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: wi < LEARNING_PLAN.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.amber }}>{w.week}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim }}>{w.focus}</div>
              </div>
              {w.items.map((item, i) => (
                <div key={i} style={{ fontSize: 12, color: COLORS.textMid, padding: '3px 0 3px 10px', borderLeft: `2px solid ${COLORS.border}` }}>
                  → {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Gap propagation */}
        <div className="panel-card fade-up-2" style={{ padding: 22 }}>
          <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>
            Gap Propagation
          </div>
          <div style={{ fontSize: 12, color: COLORS.textMid, lineHeight: 1.8 }}>
            <span style={{ color: COLORS.red }}>Systems Design</span> is the highest-risk gap.
            Fixing it could lift overall readiness ~12 pts.
            <br /><br />
            <span style={{ color: COLORS.amber }}>STAR Quantification</span> is weak across all behavioral answers.
            One focused session could address it — Sneh has strong raw experience to draw from.
          </div>
        </div>
      </div>
    </div>
  )
}
