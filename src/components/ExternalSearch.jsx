import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCocktailDB } from '../hooks/useCocktailDB'
import SearchBar from './ui/SearchBar'

/* ── helpers ─────────────────────────────────── */
const BASE = 'https://www.thecocktaildb.com/api/json/v1/1'

const extractIngredients = (drink) => {
  const out = []
  for (let i = 1; i <= 15; i++) {
    const name = drink[`strIngredient${i}`]
    const measure = drink[`strMeasure${i}`]
    if (name) out.push({ name, amount: measure?.trim() || '' })
  }
  return out
}

/* ── Recipe detail sheet ─────────────────────── */
function RecipeSheet({ drink, onClose }) {
  const [variations, setVariations] = useState([])
  const [loadingVars, setLoadingVars] = useState(false)

  // Fetch cocktails with the same IBA category as a proxy for "related"
  useEffect(() => {
    if (!drink) return
    setVariations([])
    if (!drink.category) return
    setLoadingVars(true)
    fetch(`${BASE}/filter.php?c=${encodeURIComponent(drink.category)}`)
      .then(r => r.json())
      .then(data => {
        const siblings = (data.drinks || [])
          .filter(d => d.strDrink !== drink.name)
          .slice(0, 6)
        setVariations(siblings)
      })
      .catch(() => {})
      .finally(() => setLoadingVars(false))
  }, [drink?.name, drink?.category])

  if (!drink) return null
  const ingredients = extractIngredients(drink._raw || {})

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(6,5,4,0.88)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-t-lg sm:rounded-lg"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-gold)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-start justify-between px-4 py-3 z-10"
          style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <h3 className="font-head italic" style={{ color: 'var(--gold-light)', fontSize: '1.25rem' }}>{drink.name}</h3>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <span className="text-xs" style={{ color: 'var(--text-second)' }}>{drink.category}</span>
              {drink.glassware && <>
                <span style={{ color: 'var(--text-muted)' }}>·</span>
                <span className="text-xs" style={{ color: 'var(--text-second)' }}>{drink.glassware}</span>
              </>}
              <span
                className="text-xs px-1.5 py-0.5 rounded-sm"
                style={{ background: 'rgba(120,144,112,0.2)', color: '#a0c098', border: '1px solid rgba(120,144,112,0.3)' }}
              >
                External
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-xl ml-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }}>✕</button>
        </div>

        <div className="p-4 space-y-5">
          {/* Image */}
          {drink.image && (
            <img src={drink.image} alt={drink.name} className="w-full h-52 object-cover rounded-sm" />
          )}

          {/* Ingredients */}
          {drink.ingredients?.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>Ingredients</p>
              <ul className="space-y-1.5">
                {drink.ingredients.map((ing, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 font-semibold" style={{ color: 'var(--gold)', minWidth: '4rem' }}>{ing.amount || '—'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {drink.instructions?.[0] && (
            <div>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>Method</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-second)', lineHeight: 1.7 }}>
                {drink.instructions[0]}
              </p>
            </div>
          )}

          {/* Related / Variations */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
              More in {drink.category}
            </p>
            {loadingVars ? (
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Loading…</p>
            ) : variations.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {variations.map(v => (
                  <button
                    key={v.idDrink}
                    onClick={() => {
                      fetch(`${BASE}/lookup.php?i=${v.idDrink}`)
                        .then(r => r.json())
                        .then(data => {
                          const d = data.drinks?.[0]
                          if (!d) return
                          onClose()
                          // Small delay then "re-select" — handled by parent
                        })
                    }}
                    className="px-3 py-1 rounded-sm text-xs"
                    style={{ background: 'var(--surface-high)', color: 'var(--text-second)', border: '1px solid var(--border)' }}
                  >
                    {v.strDrink}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No related drinks found</p>
            )}
          </div>

          {/* Difford's-style note box */}
          <div
            className="p-3 rounded-sm"
            style={{ background: 'rgba(196,145,61,0.06)', border: '1px solid var(--border-gold)' }}
          >
            <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
              This is an external recipe from TheCocktailDB. For in-depth history and technique, search this cocktail on Difford's Guide.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main page ───────────────────────────────── */
export default function ExternalSearch() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const { results, loading, error, search, random, fetchRandom } = useCocktailDB()

  useEffect(() => {
    const t = setTimeout(() => { if (query.length >= 2) search(query) }, 400)
    return () => clearTimeout(t)
  }, [query, search])

  useEffect(() => { fetchRandom() }, [fetchRandom])

  // Fetch full drink detail for sheet
  const openDrink = useCallback(async (drink) => {
    if (drink._raw) { setSelected(drink); return }
    // Fetch full detail from id
    const rawId = drink.id?.replace('ext-', '')
    if (rawId) {
      const res = await fetch(`${BASE}/lookup.php?i=${rawId}`)
      const data = await res.json()
      const raw = data.drinks?.[0]
      if (raw) {
        setSelected({ ...drink, _raw: raw, ingredients: extractIngredients(raw) })
        return
      }
    }
    setSelected(drink)
  }, [])

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
      <h2 className="font-head italic mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>Global Search</h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>TheCocktailDB · originals, classics & variations</p>

      <div className="mb-5">
        <SearchBar value={query} onChange={setQuery} placeholder="Search any cocktail…" onClear={() => setQuery('')} />
      </div>

      {error && (
        <div className="p-3 rounded-sm mb-4 text-sm" style={{ background: 'rgba(168,80,80,0.15)', color: '#c88080', border: '1px solid rgba(168,80,80,0.3)' }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 border-2 rounded-full"
            style={{ borderColor: 'var(--border)', borderTopColor: 'var(--gold)' }}
          />
        </div>
      )}

      {/* Random */}
      {!query && random && !loading && (
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
            Discover a random cocktail
          </p>
          <button
            onClick={() => openDrink(random)}
            className="w-full flex gap-3 items-center p-3 rounded-sm text-left"
            style={{ background: 'var(--surface)', border: '1px solid var(--border-gold)' }}
          >
            {random.image && (
              <img src={random.image} alt={random.name} className="w-14 h-14 object-cover rounded-sm flex-shrink-0" />
            )}
            <div>
              <h4 className="font-head italic" style={{ color: 'var(--gold-light)' }}>{random.name}</h4>
              <p className="text-xs" style={{ color: 'var(--text-second)' }}>{random.category} · {random.glassware}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Tap to see recipe + variations</p>
            </div>
          </button>
          <button
            onClick={fetchRandom}
            className="mt-2 text-xs w-full text-center py-1.5 rounded-sm"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            Another random →
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
            {results.length} result{results.length !== 1 ? 's' : ''} — tap for recipe & variations
          </p>
          <div className="space-y-2">
            {results.map(drink => (
              <button
                key={drink.id}
                onClick={() => openDrink(drink)}
                className="w-full flex gap-3 items-center p-3 rounded-sm text-left recipe-card-hover"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                {drink.image && (
                  <img src={drink.image} alt={drink.name} className="w-12 h-12 object-cover rounded-sm flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-head italic truncate" style={{ color: 'var(--text-primary)' }}>{drink.name}</h4>
                  <p className="text-xs" style={{ color: 'var(--text-second)' }}>{drink.category}</p>
                </div>
                <span className="text-xs flex-shrink-0 px-1.5 py-0.5 rounded-sm" style={{ background: 'rgba(120,144,112,0.2)', color: '#a0c098' }}>
                  External
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {query.length >= 2 && !loading && results.length === 0 && (
        <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
          <p className="font-head italic text-xl mb-1" style={{ color: 'var(--gold)' }}>No results</p>
          <p className="text-sm">Try a different cocktail name</p>
        </div>
      )}

      <AnimatePresence>
        {selected && <RecipeSheet drink={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
