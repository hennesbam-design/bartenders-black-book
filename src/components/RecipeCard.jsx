import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AllergenChip from './ui/AllergenChip'
import FlavorTag from './ui/FlavorTag'
import BatchDial from './ui/BatchDial'
import { useRecipeImage } from '../hooks/useRecipeImage'

const calcBatch = (ingredients, servings) =>
  ingredients.map(ing => {
    if (!ing.amount || ['leaves', 'dashes', 'top up', 'splash'].includes(ing.unit)) {
      return { ...ing, note: 'adjust to taste', batchable: false }
    }
    const totalMl = ing.amount * servings
    const bottles = ing.bottleSize ? Math.ceil(totalMl / ing.bottleSize) : null
    return { ...ing, totalMl, bottles, batchable: true }
  })

const DIFFICULTY = ['', '●○○', '●●○', '●●●']

export default function RecipeCard({ recipe, isFav, onToggleFav }) {
  const [flipped, setFlipped] = useState(false)
  const [servings, setServings] = useState(1)
  const [storyOpen, setStoryOpen] = useState(false)
  const navigate = useNavigate()
  const { src: imageSrc, onError: onImageError } = useRecipeImage(recipe)
  const batchedIngredients = calcBatch(recipe.ingredients, servings)

  return (
    <div className="perspective w-full h-96 md:h-[420px] recipe-card-hover">
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── FRONT ─────────────────────────────────── */}
        <div
          className="absolute inset-0 backface-hidden overflow-hidden cursor-pointer"
          style={{ borderRadius: 16, border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
          onClick={() => setFlipped(true)}
        >
          {/* Image / colour bg */}
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={recipe.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={onImageError}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${recipe.colour}cc 0%, ${recipe.colour}66 50%, ${recipe.colour}22 100%)` }}
            />
          )}

          {/* Gradient overlay — lighter for light theme */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(10,20,20,0.88) 0%, rgba(10,20,20,0.2) 55%, transparent 100%)' }}
          />

          {/* Source badge */}
          <div className="absolute top-3 left-3">
            <span style={{
              background: recipe.source === 'house' ? 'rgba(0,116,110,0.85)' : 'rgba(40,60,60,0.7)',
              color: '#fff',
              fontSize: '0.67rem',
              padding: '3px 8px',
              borderRadius: 999,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.04em',
            }}>
              {recipe.source === 'house' ? 'House' : 'External'}
            </span>
          </div>

          {/* Fav */}
          {onToggleFav && (
            <button
              onClick={e => { e.stopPropagation(); onToggleFav(recipe.id) }}
              className="absolute top-3 right-3 text-lg transition-transform active:scale-90"
              style={{ color: isFav ? '#ff6b6b' : 'rgba(255,255,255,0.4)' }}
            >
              ♥
            </button>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            {/* Talking point */}
            {recipe.talkingPoint && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 6,
                padding: '7px 10px',
                background: 'rgba(0,116,110,0.75)',
                borderRadius: 8,
                marginBottom: 8,
                backdropFilter: 'blur(4px)',
              }}>
                <span style={{ color: '#b3e2df', fontSize: '0.6rem', flexShrink: 0, marginTop: 1 }}>✦</span>
                <p style={{ fontSize: '0.72rem', color: '#e0f5f4', lineHeight: 1.4, fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic' }}>
                  {recipe.talkingPoint}
                </p>
              </div>
            )}

            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: 4,
            }}>
              {recipe.name}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'DM Sans, sans-serif' }}>
                {recipe.category}
              </span>
              {recipe.difficulty > 0 && (
                <span style={{ fontSize: '0.65rem', color: '#b3e2df', letterSpacing: 1 }}>{DIFFICULTY[recipe.difficulty]}</span>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
              {recipe.flavour.slice(0, 3).map(f => <FlavorTag key={f} tag={f} />)}
            </div>
            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif', marginTop: 2 }}>
              Tap to flip ↩
            </p>
          </div>
        </div>

        {/* ── BACK ───────────────────────────────────── */}
        <div
          className="absolute inset-0 backface-hidden overflow-y-auto"
          style={{
            transform: 'rotateY(180deg)',
            background: 'var(--surface)',
            borderRadius: 16,
            border: '1px solid var(--border)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          }}
          onClick={e => {
            const tag = e.target.tagName.toLowerCase()
            if (!['button', 'a', 'input', 'select', 'textarea'].includes(tag) && !e.target.closest('button, a')) {
              setFlipped(false)
            }
          }}
        >
          <div className="p-4">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--gold)',
                  lineHeight: 1.2,
                }}>
                  {recipe.name}
                </h3>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2, fontFamily: 'DM Sans, sans-serif' }}>
                  {recipe.glassware} · {recipe.method} · {recipe.ice}
                </p>
              </div>
              <button
                onClick={() => setFlipped(false)}
                style={{
                  fontSize: '0.72rem', padding: '4px 10px', borderRadius: 8,
                  color: 'var(--text-muted)', border: '1px solid var(--border)',
                  background: 'var(--surface-high)', flexShrink: 0, fontFamily: 'DM Sans, sans-serif',
                  cursor: 'pointer',
                }}
              >
                ↩ Flip
              </button>
            </div>

            <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />

            {/* Batch dial */}
            {recipe.batchable && (
              <div style={{ marginBottom: 12 }}>
                <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Servings</p>
                <BatchDial servings={servings} onChange={setServings} />
              </div>
            )}

            {/* Ingredients */}
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>
                Ingredients
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {batchedIngredients.map((ing, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: '0.88rem' }}>
                    <span style={{
                      fontWeight: 700,
                      color: ing.batchable !== false ? 'var(--gold)' : 'var(--text-muted)',
                      minWidth: '3.2rem',
                      flexShrink: 0,
                      fontFamily: 'DM Sans, sans-serif',
                    }}>
                      {ing.batchable !== false && ing.amount
                        ? (ing.totalMl ? `${ing.totalMl}ml` : `${ing.amount} ${ing.unit}`)
                        : (ing.amount ? `${ing.amount} ${ing.unit}` : ing.unit || '—')}
                    </span>
                    <span style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
                    {servings > 1 && ing.bottles && (
                      <span style={{ fontSize: '0.72rem', marginLeft: 'auto', color: 'var(--text-muted)' }}>×{ing.bottles}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />

            {/* Method */}
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8 }}>
                Method
              </p>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {recipe.instructions.map((step, i) => (
                  <li key={i} style={{ display: 'flex', gap: 6, fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                    <span style={{ color: 'var(--text-second)', lineHeight: 1.5 }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Garnish */}
            <div style={{
              display: 'flex', gap: 8, fontSize: '0.8rem', marginBottom: 10, padding: '8px 10px',
              background: 'var(--surface-high)', borderRadius: 8, border: '1px solid var(--border)',
            }}>
              <span style={{ color: 'var(--text-muted)', flexShrink: 0, fontWeight: 600 }}>Garnish:</span>
              <span style={{ color: 'var(--text-second)' }}>{recipe.garnish || '—'}</span>
            </div>

            {/* Allergens */}
            {recipe.allergens?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {recipe.allergens.map(a => <AllergenChip key={a} allergen={a} />)}
              </div>
            )}

            {/* Story drawer */}
            {recipe.story && (
              <div style={{ marginBottom: 8 }}>
                <button
                  onClick={() => setStoryOpen(o => !o)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: '0.78rem', color: 'var(--text-muted)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '4px 0', fontFamily: 'DM Sans, sans-serif',
                    width: '100%', textAlign: 'left',
                  }}
                >
                  <span>{storyOpen ? '▾' : '▸'}</span>
                  <span>The Story</span>
                </button>
                <AnimatePresence>
                  {storyOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: '0.78rem', marginTop: 6, lineHeight: 1.6, color: 'var(--text-second)', fontStyle: 'italic' }}>
                        {recipe.story}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {recipe.diffordsLink && (
              <a
                href={recipe.diffordsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8, textDecoration: 'none' }}
                onClick={e => e.stopPropagation()}
              >
                Difford's Guide ↗
              </a>
            )}

            <button
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              style={{
                marginTop: 4, width: '100%', padding: '10px 0',
                fontSize: '0.82rem', borderRadius: 8, cursor: 'pointer',
                background: 'var(--gold)', color: '#fff',
                border: 'none', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
              }}
            >
              Full Recipe →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
