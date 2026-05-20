import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { coppaRecipes } from '../data/coppaRecipes'

const MODES = ['Stories', 'Selling Lines', 'Common Mistakes', 'Talking Points', 'Quick Fire']

const pill = (active) => ({
  flexShrink: 0, padding: '6px 14px', borderRadius: 999, fontSize: '0.78rem',
  fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.15s',
  background: active ? 'var(--gold)' : 'var(--surface)',
  color: active ? '#fff' : 'var(--text-second)',
  border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
  fontWeight: active ? 600 : 400,
})

function QuickFire() {
  const quizable = coppaRecipes.filter(r => r.talkingPoint || r.story)
  const [idx, setIdx] = useState(Math.floor(Math.random() * quizable.length))
  const [revealed, setRevealed] = useState(false)
  const recipe = quizable[idx]

  const next = () => { setIdx(Math.floor(Math.random() * quizable.length)); setRevealed(false) }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Question card */}
      <div style={{ background: 'var(--gold)', borderRadius: 14, padding: '20px', color: '#fff' }}>
        <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
          What's the story behind…
        </p>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.8rem', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 4 }}>
          {recipe.name}
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>{recipe.category}</p>
      </div>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.button
            key="reveal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setRevealed(true)}
            style={{ width: '100%', padding: '14px 0', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', background: 'var(--surface)', color: 'var(--gold)', border: '2px solid var(--gold)', fontFamily: 'DM Sans, sans-serif' }}
          >
            Reveal Answer
          </motion.button>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            {recipe.story && (
              <div style={{ background: 'var(--surface)', borderRadius: 12, padding: '14px 16px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Story</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-second)', lineHeight: 1.65 }}>{recipe.story}</p>
              </div>
            )}
            {recipe.talkingPoint && (
              <div style={{ background: 'var(--teal-50)', borderRadius: 12, padding: '14px 16px', borderLeft: '3px solid var(--gold)' }}>
                <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 6 }}>Talking Point</p>
                <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1.6 }}>{recipe.talkingPoint}</p>
              </div>
            )}
            <button
              onClick={next}
              style={{ width: '100%', padding: '14px 0', borderRadius: 10, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', background: 'var(--gold)', color: '#fff', border: 'none', fontFamily: 'DM Sans, sans-serif' }}
            >
              Next cocktail →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TrainingMode() {
  const [mode, setMode] = useState('Stories')

  const renderContent = () => {
    if (mode === 'Quick Fire') return <QuickFire />

    const filtered = coppaRecipes.filter(r => {
      if (mode === 'Stories') return r.story
      if (mode === 'Selling Lines') return r.sellingLine
      if (mode === 'Common Mistakes') return r.commonMistakes?.length > 0
      if (mode === 'Talking Points') return r.talkingPoint
      return true
    })

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            style={{ background: 'var(--surface)', borderRadius: 12, padding: '14px 16px', border: '1px solid var(--border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--gold)', marginBottom: 8 }}>
              {r.name}
            </h4>
            <div style={{ height: 1, background: 'var(--border)', marginBottom: 10 }} />

            {mode === 'Stories' && (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-second)', lineHeight: 1.65 }}>{r.story}</p>
            )}
            {mode === 'Selling Lines' && (
              <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text-second)', lineHeight: 1.6 }}>"{r.sellingLine}"</p>
            )}
            {mode === 'Talking Points' && (
              <div style={{ background: 'var(--teal-50)', borderRadius: 8, padding: '10px 12px', borderLeft: '3px solid var(--gold)' }}>
                <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1.6, margin: 0 }}>{r.talkingPoint}</p>
              </div>
            )}
            {mode === 'Common Mistakes' && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {r.commonMistakes.map((m, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.85rem', color: 'var(--text-second)' }}>
                    <span style={{ color: '#c0392b', flexShrink: 0, fontWeight: 700 }}>✗</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/dashboard" className="back-link">← Dashboard</Link>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem', color: 'var(--gold)', marginBottom: 4 }}>Training Mode</h2>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>Stories, selling lines and quick-fire trivia</p>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 20, scrollbarWidth: 'none' }}>
        {MODES.map(m => <button key={m} onClick={() => setMode(m)} style={pill(mode === m)}>{m}</button>)}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={mode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
