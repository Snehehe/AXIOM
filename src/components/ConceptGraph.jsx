import COLORS from '@/data/colors'

const NODES = [
  { x: 50, y: 36, label: 'AI/ML',     r: 26, color: COLORS.cyan   },
  { x: 80, y: 57, label: 'RAG/LLM',   r: 16, color: COLORS.amber  },
  { x: 20, y: 57, label: 'CV/OpenCV', r: 16, color: COLORS.amber  },
  { x: 50, y: 75, label: 'Backend',   r: 20, color: '#a78bfa'     },
  { x: 78, y: 83, label: 'AWS',       r: 13, color: COLORS.green  },
  { x: 22, y: 83, label: 'Neo4j',     r: 13, color: COLORS.textDim},
]

const EDGES = [[0, 1], [0, 2], [0, 3], [3, 4], [3, 5], [1, 3]]

const W = 260
const H = 180

/** Static SVG concept graph showing Sneh's key skill relationships. */
export default function ConceptGraph() {
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a].x * W / 100} y1={NODES[a].y * H / 100}
          x2={NODES[b].x * W / 100} y2={NODES[b].y * H / 100}
          stroke={COLORS.borderBright} strokeWidth="1.5" strokeDasharray="4 3"
        />
      ))}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x * W / 100} cy={n.y * H / 100} r={n.r}
            fill={n.color + '18'} stroke={n.color} strokeWidth="1.5"
          />
          <text
            x={n.x * W / 100} y={n.y * H / 100 + 3}
            textAnchor="middle" fontSize="7.5"
            fill={n.color} fontFamily="'Space Mono', monospace"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
