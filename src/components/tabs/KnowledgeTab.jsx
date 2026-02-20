import { useState } from 'react'
import COLORS from '@/data/colors'
import { KNOWLEDGE_UNITS } from '@/data/resume'
import ConceptGraph from '@/components/ConceptGraph'

const TOPIC_COLORS = {
  Backend: COLORS.amber,
  Testing: COLORS.green,
  'AI/ML':  COLORS.cyan,
  'CV/AI':  '#a78bfa',
  DevOps:   '#f472b6',
  Cloud:    COLORS.green,
}

export default function KnowledgeTab() {
  const [search, setSearch] = useState('')

  const filtered = KNOWLEDGE_UNITS.filter(k =>
    k.content.toLowerCase().includes(search.toLowerCase()) ||
    k.topic.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: 16 }}>
      <div>
        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="Search knowledge units by content or topic..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="panel-card">
          {/* Header */}
          <div style={{ padding: '10px 16px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', gap: 14 }}>
            {['Content', 'Topic', 'Source', 'Confidence'].map(h => (
              <div key={h} style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', flex: h === 'Content' ? 2 : 1 }}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {filtered.map(k => (
            <div
              key={k.id}
              style={{ padding: '12px 16px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', transition: 'background .15s' }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.surface}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ flex: 2 }}>
                <div style={{ fontSize: 12, color: COLORS.text, marginBottom: 3 }}>{k.content}</div>
                <div className="mono" style={{ fontSize: 9, color: COLORS.textDim }}>{k.id}</div>
              </div>
              <div style={{ flex: 1 }}>
                <span className="tag" style={{ background: 'transparent', border: `1px solid ${TOPIC_COLORS[k.topic] ?? COLORS.border}`, color: TOPIC_COLORS[k.topic] ?? COLORS.textMid }}>
                  {k.topic}
                </span>
              </div>
              <div style={{ flex: 1, fontSize: 11, color: COLORS.textDim }}>{k.source}</div>
              <div style={{ flex: 1 }}>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ '--tw': `${k.confidence * 100}%`, background: k.confidence > 0.85 ? COLORS.green : COLORS.amber }} />
                </div>
                <div className="mono" style={{ fontSize: 9, color: COLORS.textDim, marginTop: 2 }}>{(k.confidence * 100).toFixed(0)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="panel-card" style={{ padding: 16 }}>
          <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>
            Concept Graph
          </div>
          <ConceptGraph />
        </div>

        <div className="panel-card" style={{ padding: 16 }}>
          <div style={{ fontSize: 10, color: COLORS.textDim, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 10 }}>
            Profile Summary
          </div>
          {[
            ['Internships',  '3 (CACI×2, Ojasys)'],
            ['Key Projects', '3 AI/ML builds'],
            ['Certifications', '4'],
            ['Languages',    'Python · Java · C++ · JS'],
            ['AI Stack',     'PyTorch · TF · LangChain · RAG'],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: 11, color: COLORS.textMid }}>{l}</span>
              <span className="mono" style={{ fontSize: 10, color: COLORS.amber, textAlign: 'right', maxWidth: 120 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
