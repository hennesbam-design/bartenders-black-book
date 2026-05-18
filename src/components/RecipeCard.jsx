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
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── FRONT ───────────────────────────────── */}
        <div
          className="absolute inset-0 backface-hidden rounded-sm overflow-hidden cursor-pointer"
          style={{ border: '1px solid var(--border-gold)' }}
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
              style={{ background: `linear-gradient(160deg, ${recipe.colour}cc 0%, ${recipe.colour}44 50%, #0a0908 100%)` }}
            />
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.96) 0%, rgba(10,9,8,0.35) 55%, transparent 100%)' }}
          />

          {/* Deco corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l" style={{ borderColor: 'var(--gold)', opacity: 0.5 }} />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r" style={{ borderColor: 'var(--gold)', opacity: 0.5 }} />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l" style={{ borderColor: 'var(--gold)', opacity: 0.5 }} />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r" style={{ borderColor: 'var(--gold)', opacity: 0.5 }} />

          {/* Source badge */}
          <div className="absolute top-3 left-3">
            <span
              className="px-1.5 py-0.5 text-xs rounded-sm"
              style={{
                background: recipe.source === 'house' ? 'rgba(196,145,61,0.3)' : 'rgba(120,144,112,0.3)',
                color: recipe.source === 'house' ? 'var(--gold-light)' : '#a0c098',
                border: `1px solid ${recipe.source === 'house' ? 'var(--border-gold)' : 'rgba(120,144,112,0.3)'}`,
              }}
            >
              {recipe.source === 'house' ? 'House' : 'External'}
            </span>
          </div>

          {/* Fav */}
          {onToggleFav && (
            <button
              onClick={e => { e.stopPropagation(); onToggleFav(recipe.id) }}
              className="absolute top-3 right-3 text-lg transition-transform active:scale-90"
              style={{ color: isFav ? 'var(--gold)' : 'rgba(196,145,61,0.3)' }}
            >
              ♦
            </button>
          )}

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            {/* Fun fact chip — always visible */}
            {recipe.talkingPoint && (
              <div
                className="flex items-start gap-1.5 px-2 py-1.5 rounded-sm mb-2"
                style={{ background: 'rgba(196,145,61,0.18)', border: '1px solid rgba(196,145,61,0.25)' }}
              >
                <span style={{ color: 'var(--gold)', fontSize: '0.65rem', flexShrink: 0, marginTop: 1 }}>✦</span>
                <p className="text-xs italic leading-tight" style={{ color: 'var(--gold-light)' }}>
                  {recipe.talkingPoint}
                </p>
              </div>
            )}

            <h3
              className="font-head italic leading-tight mb-1"
              style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.1rem, 3vw, 1.4rem)' }}
            >
              {recipe.name}
            </h3>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs" style={{ color: 'var(--text-second)' }}>{recipe.category}</span>
              {recipe.difficulty > 0 && (
                <span className="text-xs" style={{ color: 'var(--gold)' }}>{DIFFICULTY[recipe.difficulty]}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {recipe.flavour.slice(0, 3).map(f => <FlavorTag key={f} tag={f} />)}
            </div>
            <p className="text-xs mt-1.5 opacity-50" style={{ color: 'var(--text-muted)' }}>
              Tap to flip ↩
            </p>
          </div>
        </div>

        {/* ── BACK ────────────────────────────────── */}
        <div
          className="absolute inset-0 backface-hidden rounded-sm overflow-y-auto"
          style={{ transform: 'rotateY(180deg)', background: 'var(--surface)', border: '1px solid var(--border-gold)' }}
          onClick={e => {
            const tag = e.target.tagName.toLowerCase()
            if (!['button', 'a', 'input', 'select', 'textarea'].includes(tag) && !e.target.closest('button, a')) {
              setFlipped(false)
            }
          }}
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-head italic" style={{ color: 'var(--gold-light)', fontSize: '1.1rem' }}>
                  {recipe.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-second)' }}>
                  {recipe.glassware} · {recipe.method} · {recipe.ice}
                </p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setFlipped(false) }}
                className="text-xs px-2 py-1 rounded-sm flex-shrink-0"
                style={{ color: 'var(--text-muted)', border: '1px solid var(--border)', background: 'var(--surface-high)' }}
              >
                ↩ Flip
              </button>
            </div>

            {/* Batch dial */}
            {recipe.batchable && (
              <div className="mb-3">
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Servings</p>
                <BatchDial servings={servings} onChange={setServings} />
              </div>
            )}

            {/* Ingredients */}
            <div className="mb-3">
              <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                Ingredients
              </p>
              <ul className="space-y-1">
                {batchedIngredients.map((ing, i) => (
                  <li key={i} className="flex items-baseline gap-2 text-sm">
                    <span
                      className="font-semibold tabular-nums flex-shrink-0"
                      style={{ color: ing.batchable !== false ? 'var(--gold)' : 'var(--text-muted)', minWidth: '3.2rem' }}
                    >
                      {ing.batchable !== false && ing.amount
                        ? (ing.totalMl ? `${ing.totalMl}ml` : `${ing.amount} ${ing.unit}`)
                        : (ing.amount ? `${ing.amount} ${ing.unit}` : ing.unit || '—')}
                    </span>
                    <span style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
                    {servings > 1 && ing.bottles && (
                      <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>×{ing.bottles}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Method */}
            <div className="mb-3">
              <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                Method
              </p>
              <ol className="space-y-1">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-2 text-xs" style={{ color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Garnish */}
            <div
              className="flex gap-3 text-xs mb-3 p-2 rounded-sm"
              style={{ background: 'var(--surface-high)', border: '1px solid var(--border)' }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Garnish:</span>
              <span style={{ color: 'var(--text-second)' }}>{recipe.garnish || '—'}</span>
            </div>

            {/* Allergens */}
            {recipe.allergens?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.allergens.map(a => <AllergenChip key={a} allergen={a} />)}
              </div>
            )}

            {/* Story drawer */}
            {recipe.story && (
              <div className="mb-2">
                <button
                  onClick={() => setStoryOpen(o => !o)}
                  className="flex items-center gap-2 text-xs w-full text-left py-1"
                  style={{ color: 'var(--text-second)' }}
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
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs mt-1 pb-1" style={{ color: 'var(--text-second)', lineHeight: 1.6 }}>
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
                className="flex items-center gap-1 text-xs mb-2"
                style={{ color: 'var(--text-muted)' }}
                onClick={e => e.stopPropagation()}
              >
                Difford's Guide →
              </a>
            )}

            <button
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="mt-2 w-full py-2 text-xs rounded-sm"
              style={{ background: 'transparent', border: '1px solid var(--border-gold)', color: 'var(--gold)' }}
            >
              Full Recipe →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
