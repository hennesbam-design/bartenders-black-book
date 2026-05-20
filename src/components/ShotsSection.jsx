import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { shotsRecipes } from '../data/shotsRecipes'
import AllergenChip from './ui/AllergenChip'

const CATEGORIES = ['All', ...new Set(shotsRecipes.map(s => s.category))]
const DIFFICULTY = ['', '●○○', '●●○', '●●●']

const pill = (active) => ({
  flexShrink: 0, padding: '5px 14px', borderRadius: 999, fontSize: '0.75rem',
  fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.15s',
  background: active ? 'var(--gold)' : 'var(--surface)',
  color: active ? '#fff' : 'var(--text-second)',
  border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
  fontWeight: active ? 600 : 400,
})

function ShotCard({ shot }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div layout style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--surface)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        {/* Colour swatch */}
        <div style={{ width: 36, height: 36, borderRadius: 8, background: shot.colour, flexShrink: 0, border: '1px solid rgba(0,0,0,0.06)' }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>
              {shot.name}
            </h4>
            <span style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: 1 }}>{DIFFICULTY[shot.difficulty]}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{shot.category}</span>
            {shot.flavour.slice(0, 2).map(f => (
              <span key={f} style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'var(--teal-50)', padding: '1px 7px', borderRadius: 999, border: '1px solid var(--teal-100)' }}>{f}</span>
            ))}
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ color: 'var(--text-muted)', flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ borderTop: '1px solid var(--border)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Ingredients */}
              <div>
                <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>Ingredients</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {shot.ingredients.map((ing, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, fontSize: '0.88rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--gold)', minWidth: 52, flexShrink: 0 }}>
                        {ing.amount ? `${ing.amount}${ing.unit === 'ml' ? 'ml' : ` ${ing.unit}`}` : ing.unit || '—'}
                      </span>
                      <span style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ height: 1, background: 'var(--border)' }} />

              {/* Method */}
              <div>
                <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>Method</p>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {shot.instructions.map((step, i) => (
                    <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--gold)', flexShrink: 0 }}>{i + 1}.</span>
                      <span style={{ color: 'var(--text-second)', lineHeight: 1.5 }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {shot.servingNote && (
                <div style={{ background: 'var(--surface-high)', borderRadius: 8, padding: '8px 12px', fontSize: '0.8rem', color: 'var(--text-second)', display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0 }}>Note:</span>
                  <span>{shot.servingNote}</span>
                </div>
              )}

              {shot.talkingPoint && (
                <div style={{ background: 'var(--teal-50)', borderRadius: 8, padding: '10px 12px', borderLeft: '3px solid var(--gold)' }}>
                  <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>Fun Fact</p>
                  <p style={{ fontSize: '0.82rem', fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1.5, margin: 0 }}>{shot.talkingPoint}</p>
                </div>
              )}

              {shot.story && (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-second)', lineHeight: 1.65, margin: 0 }}>{shot.story}</p>
              )}

              {shot.allergens?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {shot.allergens.map(a => <AllergenChip key={a} allergen={a} />)}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ShotsSection() {
  const [category, setCategory] = useState('All')
  const filtered = category === 'All' ? shotsRecipes : shotsRecipes.filter(s => s.category === category)

  return (
    <div className="page">
      <Link to="/dashboard" className="back-link">← Dashboard</Link>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem', color: 'var(--gold)', marginBottom: 4 }}>Shots</h2>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>{shotsRecipes.length} shots · tap any to expand</p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} style={pill(category === c)}>{c}</button>)}
      </div>

      <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((shot, i) => (
          <motion.div key={shot.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <ShotCard shot={shot} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
