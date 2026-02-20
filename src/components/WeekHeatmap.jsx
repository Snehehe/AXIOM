import COLORS from '@/data/colors'

/** Deterministic pseudo-random heatmap of 8 weeks × 7 days practice activity. */
export default function WeekHeatmap() {
  const data = Array.from({ length: 56 }, (_, i) => {
    const seed = (i * 1103515245 + 12345) & 0x7fffffff
    return (seed % 100) / 100
  })

  function cellColor(v) {
    if (v < 0.20) return COLORS.border
    if (v < 0.45) return '#1a3010'
    if (v < 0.70) return '#2a5020'
    return '#3a7030'
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 3, marginBottom: 5 }}>
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((l, i) => (
          <div key={i} style={{ width: 24, textAlign: 'center', fontSize: 9, color: COLORS.textDim, fontFamily: "'Space Mono', monospace" }}>
            {l}
          </div>
        ))}
      </div>
      {Array.from({ length: 8 }).map((_, wi) => (
        <div key={wi} style={{ display: 'flex', gap: 3, marginBottom: 3 }}>
          {Array.from({ length: 7 }).map((_, di) => (
            <div
              key={di}
              style={{ width: 24, height: 24, borderRadius: 3, background: cellColor(data[wi * 7 + di]) }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
