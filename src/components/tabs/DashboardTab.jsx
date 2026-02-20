import COLORS from '@/data/colors'
import { SKILL_DOMAINS, GAP_ITEMS, AGENDA } from '@/data/resume'
import ScoreRing from '@/components/ScoreRing'
import WeekHeatmap from '@/components/WeekHeatmap'

export default function DashboardTab() {
  const overall = Math.round(SKILL_DOMAINS.reduce((s, d) => s + d.mastery, 0) / SKILL_DOMAINS.length)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>

      {/* Readiness card */}
      <div className="panel-card fade-up" style={{ padding: 24 }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 18 }}>
          Interview Readiness
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <ScoreRing score={overall} size={86} />
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.amber, lineHeight: 1 }}>
              {overall}<span style={{ fontSize: 13, color: COLORS.amberDim }}>/100</span>
            </div>
            <div style={{ fontSize: 12, color: COLORS.textMid, marginTop: 4 }}>New Grad · AI/ML Focus</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <span className="status-dot active" />
              <span style={{ fontSize: 10, color: COLORS.green, fontFamily: "'Space Mono', monospace" }}>CYCLE ACTIVE</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, borderTop: `1px solid ${COLORS.border}`, paddingTop: 14 }}>
          {[['Candidate', 'Sneh Shah'], ['School', "GMU CS '26"], ['Target', 'New Grad AI-SWE'], ['Sessions', '47 completed']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={{ fontSize: 11, color: COLORS.textDim }}>{l}</span>
              <span style={{ fontSize: 11, color: COLORS.textMid, fontFamily: "'Space Mono', monospace" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Domain mastery */}
      <div className="panel-card fade-up-1" style={{ padding: 24, gridColumn: 'span 2' }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 16 }}>
          Domain Mastery
        </div>
        {SKILL_DOMAINS.map(d => (
          <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ width: 160, fontSize: 12, color: COLORS.textMid, flexShrink: 0 }}>{d.label}</div>
            <div className="progress-bar" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ '--tw': `${d.mastery}%`, background: d.mastery > 78 ? COLORS.green : d.mastery > 62 ? COLORS.amber : COLORS.red }} />
            </div>
            <div className="mono" style={{ width: 28, fontSize: 12, textAlign: 'right', color: COLORS.text }}>{d.mastery}</div>
            <div style={{ width: 34, fontSize: 10, fontFamily: "'Space Mono', monospace", color: COLORS.green, textAlign: 'right' }}>{d.trend}</div>
          </div>
        ))}
      </div>

      {/* Activity heatmap */}
      <div className="panel-card fade-up-2" style={{ padding: 24 }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 12 }}>
          Practice Activity
        </div>
        <WeekHeatmap />
      </div>

      {/* Critical gaps */}
      <div className="panel-card fade-up-3" style={{ padding: 24 }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 12 }}>
          Critical Gaps
        </div>
        {GAP_ITEMS.slice(0, 4).map(g => (
          <div key={g.concept} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: COLORS.text }}>{g.concept}</div>
            <span className="tag" style={{
              background: g.severity === 'high' ? '#3a0a00' : g.severity === 'medium' ? COLORS.amberFaint : COLORS.cyanFaint,
              color:      g.severity === 'high' ? COLORS.red  : g.severity === 'medium' ? COLORS.amber     : COLORS.cyan,
              border:     `1px solid ${g.severity === 'high' ? '#5a1000' : g.severity === 'medium' ? COLORS.amberDim : '#005560'}`,
            }}>{g.severity}</span>
          </div>
        ))}
      </div>

      {/* Agenda */}
      <div className="panel-card fade-up-4" style={{ padding: 24 }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 12 }}>
          Autonomous Agenda
        </div>
        {AGENDA.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 9, paddingBottom: 9, borderBottom: i < AGENDA.length - 1 ? `1px solid ${COLORS.border}` : 'none' }}>
            <div style={{ fontSize: 10, color: COLORS.textDim, fontFamily: "'Space Mono', monospace", width: 72, flexShrink: 0, paddingTop: 1 }}>{a.time}</div>
            <div style={{ fontSize: 12, color: COLORS.textMid }}>{a.action}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
