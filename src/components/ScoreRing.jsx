import COLORS from '@/data/colors'

/**
 * Circular progress ring with a centered score label.
 *
 * @param {{ score: number, size?: number, color?: string }} props
 */
export default function ScoreRing({ score, size = 80, color = COLORS.amber }) {
  const r    = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={COLORS.border} strokeWidth="6" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div
        className="mono"
        style={{ position: 'absolute', fontSize: size < 60 ? 11 : 15, fontWeight: 700, color }}
      >
        {score}
      </div>
    </div>
  )
}
