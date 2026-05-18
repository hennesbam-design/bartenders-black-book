import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { coppaRecipes } from '../data/coppaRecipes'
import DiamondDivider from './ui/DiamondDivider'

const MODES = ['Stories', 'Selling Lines', 'Common Mistakes', 'Talking Points', 'Quick Fire']

function QuickFire() {
  const quizable = coppaRecipes.filter(r => r.talkingPoint || r.story)
  const [idx, setIdx] = useState(Math.floor(Math.random() * quizable.length))
  const [revealed, setRevealed] = useState(false)
  const recipe = quizable[idx]

  const next = () => {
    setIdx(Math.floor(Math.random() * quizable.length))
    setRevealed(false)
  }

  return (
    <div className="space-y-4">
      <div
        className="p-4 rounded-sm min-h-32"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-gold)' }}
      >
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
          What's the story behind this cocktail?
        </p>
        <h3 className="font-head italic text-2xl mb-1" style={{ color: 'var(--gold-light)' }}>{recipe.name}</h3>
        <p className="text-xs" style={{ color: 'var(--text-second)' }}>{recipe.category}</p>
      </div>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full py-3 rounded-sm text-sm"
          style={{ background: 'var(--gold)', color: '#0a0908', fontWeight: 600 }}
        >
          Reveal Answer
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {recipe.story && (
              <div className="p-4 rounded-sm" style={{ background: 'var(--surface-high)', border: '1px solid var(--border)' }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Story</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-second)', lineHeight: 1.7 }}>{recipe.story}</p>
              </div>
            )}
            {recipe.talkingPoint && (
              <div className="p-4 rounded-sm" style={{ background: 'rgba(196,145,61,0.07)', border: '1px solid var(--border-gold)' }}>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>Talking Point</p>
                <p className="text-sm italic" style={{ color: 'var(--gold-light)' }}>{recipe.talkingPoint}</p>
              </div>
            )}
            <button
              onClick={next}
              className="w-full py-3 rounded-sm text-sm"
              style={{ background: 'var(--surface)', color: 'var(--gold)', border: '1px solid var(--border-gold)' }}
            >
              Next cocktail →
            </button>
          </motion.div>
        </AnimatePresence>
      )}
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
      <div className="space-y-3">
        {filtered.map(r => (
          <div
            key={r.id}
            className="p-4 rounded-sm"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h4 className="font-head italic mb-2" style={{ color: 'var(--gold-light)', fontSize: '1rem' }}>
              {r.name}
            </h4>
            <DiamondDivider className="mb-2" />
            {mode === 'Stories' && (
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-second)', lineHeight: 1.7 }}>{r.story}</p>
            )}
            {mode === 'Selling Lines' && (
              <p className="text-sm italic" style={{ color: 'var(--text-second)' }}>"{r.sellingLine}"</p>
            )}
            {mode === 'Talking Points' && (
              <p className="text-sm italic" style={{ color: 'var(--gold)' }}>{r.talkingPoint}</p>
            )}
            {mode === 'Common Mistakes' && (
              <ul className="space-y-1">
                {r.commonMistakes.map((m, i) => (
                  <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-second)' }}>
                    <span style={{ color: '#a85050', flexShrink: 0 }}>✗</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
      <h2 className="font-head italic mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>
        Training Mode
      </h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Stories, selling lines and quick-fire trivia</p>

      {/* Mode tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
        {MODES.map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="flex-shrink-0 px-3 py-1.5 rounded-sm text-xs transition-colors"
            style={{
              background: mode === m ? 'var(--gold)' : 'var(--surface)',
              color: mode === m ? '#0a0908' : 'var(--text-second)',
              border: `1px solid ${mode === m ? 'var(--gold)' : 'var(--border)'}`,
              fontWeight: mode === m ? 600 : 400,
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
