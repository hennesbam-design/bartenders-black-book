import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { shotsRecipes } from '../data/shotsRecipes'
import AllergenChip from './ui/AllergenChip'
import DiamondDivider from './ui/DiamondDivider'

const CATEGORIES = ['All', ...new Set(shotsRecipes.map(s => s.category))]
const DIFFICULTY = ['', '●○○', '●●○', '●●●']

function ShotCard({ shot }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      layout
      className="rounded-sm overflow-hidden"
      style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
    >
      {/* Header row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        {/* Colour dot */}
        <div
          className="w-8 h-8 rounded-sm flex-shrink-0"
          style={{ background: shot.colour, border: '1px solid var(--border)' }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <h4
              className="font-head italic"
              style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}
            >
              {shot.name}
            </h4>
            <span className="text-xs" style={{ color: 'var(--gold)' }}>
              {DIFFICULTY[shot.difficulty]}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{shot.category}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>·</span>
            {shot.flavour.slice(0, 2).map(f => (
              <span key={f} className="text-xs" style={{ color: 'var(--text-second)' }}>{f}</span>
            ))}
          </div>
        </div>
        <span
          className="text-lg flex-shrink-0 transition-transform duration-200"
          style={{
            color: 'var(--text-muted)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4" style={{ borderTop: '1px solid var(--border)' }}>
              <div className="pt-3 space-y-4">
                {/* Ingredients */}
                <div>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    Ingredients
                  </p>
                  <ul className="space-y-1">
                    {shot.ingredients.map((ing, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span
                          className="flex-shrink-0 font-semibold tabular-nums"
                          style={{ color: 'var(--gold)', minWidth: '3.5rem' }}
                        >
                          {ing.amount ? `${ing.amount}${ing.unit === 'ml' ? 'ml' : ` ${ing.unit}`}` : ing.unit || '—'}
                        </span>
                        <span style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <DiamondDivider />

                {/* Method */}
                <div>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    Method
                  </p>
                  <ol className="space-y-1.5">
                    {shot.instructions.map((step, i) => (
                      <li key={i} className="flex gap-2 text-xs" style={{ color: 'var(--text-primary)' }}>
                        <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{i + 1}.</span>
                        <span style={{ lineHeight: 1.6 }}>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Serving note */}
                {shot.servingNote && (
                  <div
                    className="flex gap-2 p-2.5 rounded-sm text-xs"
                    style={{ background: 'var(--surface-high)', border: '1px solid var(--border)' }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>Note:</span>
                    <span style={{ color: 'var(--text-second)' }}>{shot.servingNote}</span>
                  </div>
                )}

                {/* Fun fact */}
                {shot.talkingPoint && (
                  <div
                    className="p-3 rounded-sm"
                    style={{ background: 'rgba(196,145,61,0.07)', border: '1px solid var(--border-gold)' }}
                  >
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                      Fun Fact
                    </p>
                    <p className="text-xs italic" style={{ color: 'var(--gold-light)', lineHeight: 1.6 }}>
                      {shot.talkingPoint}
                    </p>
                  </div>
                )}

                {/* Story */}
                {shot.story && (
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-second)', lineHeight: 1.7 }}>
                    {shot.story}
                  </p>
                )}

                {/* Allergens */}
                {shot.allergens?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {shot.allergens.map(a => <AllergenChip key={a} allergen={a} />)}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ShotsSection() {
  const [category, setCategory] = useState('All')

  const filtered = category === 'All'
    ? shotsRecipes
    : shotsRecipes.filter(s => s.category === category)

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>
        ← Dashboard
      </Link>

      <h2
        className="font-head italic mb-1"
        style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}
      >
        Shots
      </h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
        {shotsRecipes.length} shots · tap any to expand
      </p>

      {/* Category filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className="flex-shrink-0 px-3 py-1.5 rounded-sm text-xs transition-colors"
            style={{
              background: category === c ? 'var(--gold)' : 'var(--surface)',
              color: category === c ? '#0a0908' : 'var(--text-second)',
              border: `1px solid ${category === c ? 'var(--gold)' : 'var(--border)'}`,
              fontWeight: category === c ? 600 : 400,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="space-y-2"
      >
        {filtered.map(shot => (
          <ShotCard key={shot.id} shot={shot} />
        ))}
      </motion.div>
    </div>
  )
}
