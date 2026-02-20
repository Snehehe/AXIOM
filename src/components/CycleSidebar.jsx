import COLORS from '@/data/colors'
import { CYCLE_STEPS } from '@/data/resume'

/**
 * Shows the 8-step autonomous cycle and the active profile card.
 * @param {{ cycleStep: number }} props
 */
export default function CycleSidebar({ cycleStep }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div className="panel-card" style={{ padding: 18 }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 12 }}>
          Autonomous Cycle
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CYCLE_STEPS.map(s => (
            <div
              key={s.id}
              className={`cycle-step ${cycleStep === s.id ? 'active' : cycleStep > s.id ? 'complete' : ''}`}
            >
              <div style={{ fontSize: 14, width: 20, textAlign: 'center', color: cycleStep > s.id ? COLORS.green : cycleStep === s.id ? COLORS.amber : COLORS.textDim }}>
                {cycleStep > s.id ? '✓' : s.icon}
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: cycleStep >= s.id ? COLORS.text : COLORS.textDim }}>{s.label}</div>
                <div style={{ fontSize: 9, color: COLORS.textDim, marginTop: 1 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-card" style={{ padding: 16 }}>
        <div style={{ fontSize: 9, color: COLORS.textDim, fontFamily: "'Space Mono', monospace", marginBottom: 10, letterSpacing: '.1em' }}>
          ACTIVE PROFILE
        </div>
        <div style={{ fontSize: 12, color: COLORS.text, fontWeight: 700, marginBottom: 4 }}>Sneh Shah</div>
        <div style={{ fontSize: 11, color: COLORS.textMid, marginBottom: 10 }}>GMU CS '26 · Ashburn VA</div>
        {[
          ['Strongest', 'Python · AI/ML'],
          ['Weakest',   'Systems Design'],
          ['Focus',     'New Grad AI-SWE'],
        ].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ fontSize: 10, color: COLORS.textDim }}>{l}</span>
            <span style={{ fontSize: 10, color: COLORS.amber, fontFamily: "'Space Mono', monospace" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
