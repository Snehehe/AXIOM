import COLORS from '@/data/colors'
import { SKILL_DOMAINS, PERFORMANCE_SERIES, LONGITUDINAL_METRICS } from '@/data/resume'

const SERIES_COLORS = { 'AI/ML': COLORS.cyan, Python: COLORS.green, Behavioral: COLORS.amber }
const WEEKS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']
const W = 480, H = 150, PAD = 28

function toY(v) { return PAD + (H - PAD) * (1 - (v - 30) / 70) }
function toX(i) { return PAD + (W - PAD * 2) * i / (WEEKS.length - 1) }

export default function ProgressTab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

      {/* Trajectory chart */}
      <div className="panel-card fade-up" style={{ padding: 24, gridColumn: 'span 2' }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 14 }}>
          Performance Trajectory — 8 Week View
        </div>
        <svg width="100%" viewBox={`0 0 ${W} ${H + PAD}`} style={{ overflow: 'visible' }}>
          {[40, 60, 80].map(y => (
            <line key={y} x1={PAD} y1={toY(y)} x2={W - PAD} y2={toY(y)} stroke={COLORS.border} strokeWidth="1" strokeDasharray="4 4" />
          ))}
          {WEEKS.map((w, i) => (
            <text key={w} x={toX(i)} y={H + PAD - 4} textAnchor="middle" fontSize="9" fill={COLORS.textDim} fontFamily="'Space Mono', monospace">
              {w}
            </text>
          ))}
          {Object.entries(PERFORMANCE_SERIES).map(([name, data]) => {
            const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')
            const color = SERIES_COLORS[name]
            return (
              <g key={name}>
                <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {data.map((v, i) => <circle key={i} cx={toX(i)} cy={toY(v)} r="3.5" fill={color} />)}
              </g>
            )
          })}
        </svg>
        <div style={{ display: 'flex', gap: 20, marginTop: 6 }}>
          {Object.entries(SERIES_COLORS).map(([name, color]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 18, height: 2.5, background: color, borderRadius: 2 }} />
              <span style={{ fontSize: 11, color: COLORS.textMid }}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Longitudinal metrics */}
      <div className="panel-card fade-up-1" style={{ padding: 24 }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 14 }}>
          Longitudinal Metrics
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {LONGITUDINAL_METRICS.map(m => (
            <div key={m.label} className="metric-tile">
              <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 8 }}>{m.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: m.color, fontFamily: "'Space Mono', monospace" }}>{m.value}</div>
              <div style={{ fontSize: 10, color: COLORS.textDim, marginTop: 2 }}>{m.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mastery forecast */}
      <div className="panel-card fade-up-2" style={{ padding: 24 }}>
        <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 14 }}>
          Mastery Forecast · May 2026
        </div>
        {SKILL_DOMAINS.map(d => (
          <div key={d.id} style={{ marginBottom: 11 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: COLORS.textMid }}>{d.label}</span>
              <span className="mono" style={{ fontSize: 11, color: COLORS.textDim }}>
                <span style={{ color: COLORS.text }}>{d.mastery}</span>
                <span style={{ color: COLORS.amber }}> → {Math.min(100, d.mastery + 14)}</span>
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ '--tw': `${d.mastery}%`, background: COLORS.borderBright }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
