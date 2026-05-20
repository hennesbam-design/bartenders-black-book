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
    <div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-second)' }}>
      <div className="text-center">
        <p className="font-head italic text-2xl mb-2" style={{ color: 'var(--gold)' }}>Recipe not found</p>
        <Link to="/house" style={{ color: 'var(--text-muted)' }}>← Back to House Recipes</Link>
      </div>
    </div>
  )

  const batchedIngredients = calcBatch(recipe.ingredients, servings)
  const variations = recipe.variations?.map(vid => coppaRecipes.find(r => r.id === vid)).filter(Boolean) || []

  return (
    <div className="min-h-screen max-w-lg mx-auto">
      {/* Hero image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {recipe.image || recipe.imageUrl ? (
          <img
            src={recipe.image || recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: `linear-gradient(160deg, ${recipe.colour}cc 0%, ${recipe.colour}44 50%, #e8f0f0 100%)` }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' }}
        />
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 flex items-center gap-1 text-sm px-3 py-1.5 rounded-sm"
          style={{ background: 'rgba(10,9,8,0.7)', color: 'var(--text-second)', border: '1px solid var(--border)' }}
        >
          ← Back
        </button>
        {/* Fav button */}
        {onToggleFav && (
          <button
            onClick={() => onToggleFav(recipe.id)}
            className="absolute top-4 right-4 text-2xl"
            style={{ color: isFav ? 'var(--gold)' : 'rgba(196,145,61,0.3)' }}
          >
            ♦
          </button>
        )}
      </div>

      <div className="px-4 pb-12 -mt-8 relative z-10">
        {/* Title block */}
        <div className="mb-4">
          <h1
            className="font-head italic leading-none mb-1"
            style={{ color: 'var(--gold-light)', fontSize: 'clamp(1.8rem, 6vw, 2.4rem)' }}
          >
            {recipe.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-sm" style={{ color: 'var(--text-second)' }}>{recipe.category}</span>
            <span style={{ color: 'var(--text-muted)' }}>·</span>
            <span className="text-sm" style={{ color: 'var(--gold)' }}>{DIFFICULTY_DOTS[recipe.difficulty]}</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{DIFFICULTY_LABEL[recipe.difficulty]}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.flavour.map(f => <FlavorTag key={f} tag={f} />)}
          </div>
          {recipe.allergens?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {recipe.allergens.map(a => <AllergenChip key={a} allergen={a} />)}
            </div>
          )}
        </div>

        {/* Glass · Method · Ice strip */}
        <div
          className="flex gap-4 text-xs mb-4 p-3 rounded-sm"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          {[
            { label: 'Glass', value: recipe.glassware },
            { label: 'Method', value: recipe.method },
            { label: 'Ice', value: recipe.ice },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 text-center">
              <div style={{ color: 'var(--text-muted)' }}>{label}</div>
              <div className="mt-0.5 font-medium" style={{ color: 'var(--text-second)' }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          className="flex mb-4 rounded-sm overflow-hidden"
          style={{ border: '1px solid var(--border)' }}
        >
          {['recipe', 'training'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex-1 py-2 text-xs font-medium capitalize transition-colors"
              style={{
                background: tab === t ? 'var(--surface-high)' : 'var(--surface)',
                color: tab === t ? 'var(--gold)' : 'var(--text-muted)',
                borderRight: t === 'recipe' ? '1px solid var(--border)' : 'none',
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
                <div className="mb-5 p-3 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                      Batch Calculator
                    </p>
                    {servings > 1 && (
                      <button onClick={() => setServings(1)} className="text-xs" style={{ color: 'var(--text-muted)' }}>Reset</button>
                    )}
                  </div>
                  <BatchDial servings={servings} onChange={setServings} />
                </div>
              )}

              {/* Ingredients */}
              <div className="mb-5">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                  Ingredients
                </p>
                <ul className="space-y-2">
                  {batchedIngredients.map((ing, i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span
                        className="text-sm font-semibold tabular-nums flex-shrink-0"
                        style={{ color: ing.batchable !== false ? 'var(--gold)' : 'var(--text-muted)', minWidth: '4rem' }}
                      >
                        {ing.batchable !== false && ing.amount
                          ? (ing.totalMl ? `${ing.totalMl}ml` : `${ing.amount} ${ing.unit}`)
                          : (ing.amount ? `${ing.amount} ${ing.unit}` : ing.unit || '—')}
                      </span>
                      <span className="flex-1 text-sm" style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
                      {servings > 1 && ing.bottles && (
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>×{ing.bottles} bottles</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <DiamondDivider className="mb-5" />

              {/* Instructions */}
              <div className="mb-5">
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                  Method
                </p>
                <ol className="space-y-2">
                  {recipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                        style={{ background: 'var(--surface-high)', color: 'var(--gold)', border: '1px solid var(--border)' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Garnish */}
              {recipe.garnish && (
                <div
                  className="flex items-start gap-3 p-3 rounded-sm mb-5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Garnish</span>
                  <span className="text-xs" style={{ color: 'var(--text-second)' }}>{recipe.garnish}</span>
                </div>
              )}

              {/* Selling line */}
              {recipe.sellingLine && (
                <div
                  className="p-3 rounded-sm mb-5"
                  style={{ background: 'rgba(196,145,61,0.06)', border: '1px solid var(--border-gold)' }}
                >
                  <p className="text-xs italic" style={{ color: 'var(--gold-light)', lineHeight: 1.6 }}>
                    "{recipe.sellingLine}"
                  </p>
                </div>
              )}

              {/* Variations */}
              {variations.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    Variations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variations.map(v => (
                      <Link
                        key={v.id}
                        to={`/recipe/${v.id}`}
                        className="px-3 py-1.5 rounded-sm text-xs"
                        style={{ background: 'var(--surface-high)', color: 'var(--text-second)', border: '1px solid var(--border)' }}
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
                  className="flex items-center gap-2 text-sm"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <span>View on Difford's Guide →</span>
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
              className="space-y-4"
            >
              {recipe.story && (
                <div className="p-4 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    The Story
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-second)', lineHeight: 1.7 }}>{recipe.story}</p>
                </div>
              )}

              {recipe.talkingPoint && (
                <div
                  className="p-4 rounded-sm"
                  style={{ background: 'rgba(196,145,61,0.06)', border: '1px solid var(--border-gold)' }}
                >
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    Talking Point
                  </p>
                  <p className="text-sm italic" style={{ color: 'var(--gold-light)', lineHeight: 1.6 }}>{recipe.talkingPoint}</p>
                </div>
              )}

              {recipe.sellingLine && (
                <div className="p-4 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    Selling Line
                  </p>
                  <p className="text-sm italic" style={{ color: 'var(--text-second)', lineHeight: 1.6 }}>"{recipe.sellingLine}"</p>
                </div>
              )}

              {recipe.commonMistakes?.length > 0 && (
                <div className="p-4 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    Common Mistakes
                  </p>
                  <ul className="space-y-1.5">
                    {recipe.commonMistakes.map((m, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-second)' }}>
                        <span style={{ color: '#a85050', flexShrink: 0 }}>✗</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recipe.upsell && (
                <div className="p-4 rounded-sm" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
                    Upsell
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-second)' }}>{recipe.upsell}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
