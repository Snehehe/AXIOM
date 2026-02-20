'use client'
import { useState } from 'react'
import COLORS from '@/data/colors'
import DashboardTab  from '@/components/tabs/DashboardTab'
import SimulateTab   from '@/components/tabs/SimulateTab'
import KnowledgeTab  from '@/components/tabs/KnowledgeTab'
import GapsTab       from '@/components/tabs/GapsTab'
import ProgressTab   from '@/components/tabs/ProgressTab'

const TABS = [
  { id: 'dashboard', label: 'Overview'       },
  { id: 'simulate',  label: 'Simulate'       },
  { id: 'knowledge', label: 'Knowledge Base' },
  { id: 'gaps',      label: 'Gap Analysis'   },
  { id: 'progress',  label: 'Progress'       },
]

export default function AxiomApp() {
  const [tab, setTab] = useState('dashboard')

  return (
    <div style={{ minHeight: '100vh', background: COLORS.bg }}>

      {/* Scan-line texture */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: 'none', zIndex: 0,
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.007) 2px,rgba(255,255,255,0.007) 4px)',
      }} />

      {/* Header */}
      <header style={{
        borderBottom: `1px solid ${COLORS.border}`, padding: '0 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 54, position: 'sticky', top: 0, zIndex: 100,
        background: COLORS.bg + 'ee', backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="26" height="26" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="13" fill="none" stroke={COLORS.amberDim} strokeWidth="1.5" />
            <circle cx="14" cy="14" r="7"  fill="none" stroke={COLORS.amber}    strokeWidth="1.5" />
            <circle cx="14" cy="14" r="2"  fill={COLORS.amber} />
            {[[14,1,14,7],[14,21,14,27],[1,14,7,14],[21,14,27,14]].map(([x1,y1,x2,y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.amberDim} strokeWidth="1.5" />
            ))}
          </svg>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.05em', color: COLORS.text }}>
              AXIOM <span className="shimmer-text">INTELLIGENCE</span>
            </div>
            <div style={{ fontSize: 9, color: COLORS.textDim, fontFamily: "'Space Mono', monospace", letterSpacing: '.1em' }}>
              SNEH SHAH · GMU CS '26 · AI/ML TRACK
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: 3 }}>
          {TABS.map(t => (
            <button key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="status-dot active" />
          <span style={{ fontSize: 10, color: COLORS.textDim, fontFamily: "'Space Mono', monospace" }}>
            LIVE · AI CONNECTED
          </span>
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: '22px 28px 60px', maxWidth: 1260, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {tab === 'dashboard' && <DashboardTab />}
        {tab === 'simulate'  && <SimulateTab  />}
        {tab === 'knowledge' && <KnowledgeTab />}
        {tab === 'gaps'      && <GapsTab      />}
        {tab === 'progress'  && <ProgressTab  />}
      </main>

      {/* Footer bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: 24,
        borderTop: `1px solid ${COLORS.border}`, background: COLORS.bg + 'dd',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 28px', backdropFilter: 'blur(12px)',
      }}>
        <div className="mono" style={{ fontSize: 9, color: COLORS.textDim }}>
          AXIOM v1.0 // PERCEIVE → REASON → PLAN → ACT → EVALUATE → ADAPT
        </div>
        <div className="mono" style={{ fontSize: 9, color: COLORS.textDim }}>
          KU: 8 // SESSIONS: 47 // PROFILE: SNEH SHAH · GMU CS '26
        </div>
      </div>
    </div>
  )
}
