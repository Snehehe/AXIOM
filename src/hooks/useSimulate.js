import { useState } from 'react'
import { callClaude, parseJson } from '../lib/claude.js'
import { SYSTEM_PROMPT, DOMAIN_LABELS } from '../lib/prompts.js'

export function useSimulate() {
  const [phase,       setPhase]       = useState('setup')
  const [domain,      setDomain]      = useState('ml')
  const [difficulty,  setDifficulty]  = useState('entry-level')
  const [question,    setQuestion]    = useState('')
  const [answer,      setAnswer]      = useState('')
  const [evalResult,  setEvalResult]  = useState(null)
  const [followUp,    setFollowUp]    = useState('')
  const [loading,     setLoading]     = useState(false)
  const [loadingMsg,  setLoadingMsg]  = useState('')
  const [cycleStep,   setCycleStep]   = useState(0)
  const [error,       setError]       = useState('')
  const [showExample, setShowExample] = useState(false)

  function animateCycle(maxStep, intervalMs = 500) {
    let step = 0
    const iv = setInterval(() => {
      step = Math.min(step + 1, maxStep)
      setCycleStep(step)
      if (step >= maxStep) clearInterval(iv)
    }, intervalMs)
    return iv
  }

  async function startSession() {
    setLoading(true)
    setError('')
    setLoadingMsg('Generating question...')
    const iv = animateCycle(4)
    try {
      const q = await callClaude(
        [{ role: 'user', content: `Generate a ${difficulty} ${DOMAIN_LABELS[domain]} interview question. Mode: QUESTION` }],
        SYSTEM_PROMPT,
      )
      setQuestion(q.trim())
      setPhase('running')
      setCycleStep(5)
    } catch (e) {
      setError(e.message)
    } finally {
      clearInterval(iv)
      setLoading(false)
      setLoadingMsg('')
    }
  }

  async function submitAnswer() {
    if (!answer.trim()) return
    setLoading(true)
    setError('')
    setLoadingMsg('Evaluating...')
    setCycleStep(6)
    try {
      const raw = await callClaude(
        [{ role: 'user', content: `Question: "${question}"\n\nCandidate answer: "${answer}"\n\nMode: EVALUATE` }],
        SYSTEM_PROMPT,
      )
      const result = parseJson(raw)
      setEvalResult(result)
      setFollowUp(result.follow_up ?? '')
      setPhase('eval')
      setCycleStep(8)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
      setLoadingMsg('')
    }
  }

  function reset() {
    setPhase('setup'); setCycleStep(0); setError('')
    setQuestion(''); setAnswer(''); setEvalResult(null); setFollowUp(''); setShowExample(false)
  }

  function doFollowUp() {
    setPhase('running'); setQuestion(followUp)
    setAnswer(''); setEvalResult(null); setCycleStep(5); setShowExample(false)
  }

  return {
    phase, domain, difficulty, question, answer,
    evalResult, followUp, loading, loadingMsg,
    cycleStep, error, showExample,
    setDomain, setDifficulty, setAnswer, setShowExample,
    startSession, submitAnswer, reset, doFollowUp,
  }
}
