import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { coppaRecipes } from '../data/coppaRecipes'
import AllergenChip from './ui/AllergenChip'
import FlavorTag from './ui/FlavorTag'
import BatchDial from './ui/BatchDial'
import DiamondDivider from './ui/DiamondDivider'

const calcBatch = (ingredients, servings) =>
  ingredients.map(ing => {
    if (!ing.amount || ['leaves', 'dashes', 'top up', 'splash'].includes(ing.unit)) {
      return { ...ing, note: 'adjust to taste', batchable: false }
    }
    const totalMl = ing.amount * servings
    const bottles = ing.bottleSize ? Math.ceil(totalMl / ing.bottleSize) : null
    return { ...ing, totalMl, bottles, batchable: true }
  })

const DIFFICULTY_LABEL = ['', 'Easy', 'Medium', 'Advanced']
const DIFFICULTY_DOTS = ['', '●○○', '●●○', '●●●']

export default function RecipeDetail({ isFav, onToggleFav }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = coppaRecipes.find(r => r.id === id)
  const [servings, setServings] = useState(1)
  const [tab, setTab] = useState('recipe')

  if (!recipe) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-second)' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.5rem', color: 'var(--gold)', marginBottom: 8 }}>Recipe not found</p>
        <Link to="/house" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Back to House Recipes</Link>
      </div>
    </div>
  )

  const batchedIngredients = calcBatch(recipe.ingredients, servings)
  const variations = recipe.variations?.map(vid => coppaRecipes.find(r => r.id === vid)).filter(Boolean) || []

  return (
    <div style={{ minHeight: '100vh', maxWidth: 512, margin: '0 auto' }}>
      {/* Hero image */}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
        {recipe.image || recipe.imageUrl ? (
          <img
            src={recipe.image || recipe.imageUrl}
            alt={recipe.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(160deg, ${recipe.colour}cc 0%, ${recipe.colour}44 50%, var(--bg) 100%)` }} />
        )}
        {/* Gradient fade to page bg */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)' }} />

        {/* Back button — clean white pill */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: 14, left: 14,
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '7px 14px', borderRadius: 999,
            fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            background: 'rgba(255,255,255,0.92)', color: 'var(--text-second)',
            border: '1px solid var(--border)', backdropFilter: 'blur(8px)',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          ← Back
        </button>

        {/* Fav button */}
        {onToggleFav && (
          <button
            onClick={() => onToggleFav(recipe.id)}
            style={{
              position: 'absolute', top: 14, right: 14,
              fontSize: '1.4rem', lineHeight: 1, cursor: 'pointer',
              background: 'rgba(255,255,255,0.92)', border: '1px solid var(--border)',
              borderRadius: 999, width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              color: isFav ? '#ff6b6b' : 'var(--text-muted)',
            }}
          >
            ♥
          </button>
        )}
      </div>

      <div style={{ padding: '0 16px 48px', marginTop: -32, position: 'relative', zIndex: 10 }}>
        {/* Title block */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 6vw, 2.4rem)', color: 'var(--gold)', lineHeight: 1.1, marginBottom: 4 }}>
            {recipe.name}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-second)' }}>{recipe.category}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: 2 }}>{DIFFICULTY_DOTS[recipe.difficulty]}</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{DIFFICULTY_LABEL[recipe.difficulty]}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
            {recipe.flavour.map(f => <FlavorTag key={f} tag={f} />)}
          </div>
          {recipe.allergens?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
              {recipe.allergens.map(a => <AllergenChip key={a} allergen={a} />)}
            </div>
          )}
        </div>

        {/* Glass · Method · Ice strip */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
          {[
            { label: 'Glass', value: recipe.glassware },
            { label: 'Method', value: recipe.method },
            { label: 'Ice', value: recipe.ice },
          ].map(({ label, value }, i, arr) => (
            <div key={label} style={{ flex: 1, textAlign: 'center', padding: '10px 8px', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 2 }}>{label}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-second)' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', marginBottom: 16, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
          {['recipe', 'training'].map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '10px 0', fontSize: '0.82rem', fontWeight: 600,
                cursor: 'pointer', textTransform: 'capitalize',
                background: tab === t ? 'var(--gold)' : 'var(--surface)',
                color: tab === t ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRight: i === 0 ? '1px solid var(--border)' : 'none',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.15s',
              }}
            >
              {t === 'recipe' ? 'Recipe' : 'Training'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'recipe' && (
            <motion.div
              key="recipe"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Batch calculator */}
              {recipe.batchable && (
                <div style={{ marginBottom: 20, padding: 14, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <p className="label">Batch Calculator</p>
                    {servings > 1 && (
                      <button onClick={() => setServings(1)} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}>Reset</button>
                    )}
                  </div>
                  <BatchDial servings={servings} onChange={setServings} />
                </div>
              )}

              {/* Ingredients */}
              <div style={{ marginBottom: 20 }}>
                <p className="label" style={{ marginBottom: 10 }}>Ingredients</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {batchedIngredients.map((ing, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: ing.batchable !== false ? 'var(--gold)' : 'var(--text-muted)', minWidth: '4rem', flexShrink: 0, fontFamily: 'DM Sans, sans-serif' }}>
                        {ing.batchable !== false && ing.amount
                          ? (ing.totalMl ? `${ing.totalMl}ml` : `${ing.amount} ${ing.unit}`)
                          : (ing.amount ? `${ing.amount} ${ing.unit}` : ing.unit || '—')}
                      </span>
                      <span style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{ing.name}</span>
                      {servings > 1 && ing.bottles && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>×{ing.bottles} btl</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <DiamondDivider style={{ marginBottom: 20 }} />

              {/* Instructions */}
              <div style={{ marginBottom: 20 }}>
                <p className="label" style={{ marginBottom: 10 }}>Method</p>
                <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {recipe.instructions.map((step, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10 }}>
                      <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, background: 'var(--teal-50)', color: 'var(--gold)', border: '1px solid var(--teal-100)' }}>
                        {i + 1}
                      </span>
                      <span style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Garnish */}
              {recipe.garnish && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', borderRadius: 8, marginBottom: 16, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', flexShrink: 0, paddingTop: 1 }}>Garnish</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-second)' }}>{recipe.garnish}</span>
                </div>
              )}

              {/* Selling line */}
              {recipe.sellingLine && (
                <div style={{ padding: '12px 14px', borderRadius: 8, marginBottom: 16, background: 'var(--teal-50)', borderLeft: '3px solid var(--gold)' }}>
                  <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 4 }}>Selling Line</p>
                  <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1.6, margin: 0 }}>
                    "{recipe.sellingLine}"
                  </p>
                </div>
              )}

              {/* Variations */}
              {variations.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <p className="label" style={{ marginBottom: 8 }}>Variations</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {variations.map(v => (
                      <Link
                        key={v.id}
                        to={`/recipe/${v.id}`}
                        style={{ padding: '6px 14px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none', background: 'var(--surface-high)', color: 'var(--text-second)', border: '1px solid var(--border)', fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {v.name} →
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Difford's */}
              {recipe.diffordsLink && (
                <a
                  href={recipe.diffordsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                  View on Difford's Guide ↗
                </a>
              )}
            </motion.div>
          )}

          {tab === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              {recipe.story && (
                <div style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="label" style={{ marginBottom: 6 }}>The Story</p>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-second)', lineHeight: 1.7 }}>{recipe.story}</p>
                </div>
              )}

              {recipe.talkingPoint && (
                <div style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--teal-50)', borderLeft: '3px solid var(--gold)' }}>
                  <p className="label" style={{ marginBottom: 6 }}>Talking Point</p>
                  <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1.6 }}>{recipe.talkingPoint}</p>
                </div>
              )}

              {recipe.sellingLine && (
                <div style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="label" style={{ marginBottom: 6 }}>Selling Line</p>
                  <p style={{ fontSize: '0.88rem', fontStyle: 'italic', color: 'var(--text-second)', lineHeight: 1.6 }}>"{recipe.sellingLine}"</p>
                </div>
              )}

              {recipe.commonMistakes?.length > 0 && (
                <div style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="label" style={{ marginBottom: 8 }}>Common Mistakes</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {recipe.commonMistakes.map((m, i) => (
                      <li key={i} style={{ display: 'flex', gap: 8, fontSize: '0.85rem', color: 'var(--text-second)' }}>
                        <span style={{ color: '#c0392b', flexShrink: 0, fontWeight: 700 }}>✗</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.upsell && (
                <div style={{ padding: '14px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="label" style={{ marginBottom: 6 }}>Upsell</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-second)' }}>{recipe.upsell}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
