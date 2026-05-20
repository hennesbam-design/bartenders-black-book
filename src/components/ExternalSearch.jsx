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
      style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', background: 'rgba(13,31,32,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        exit={{ y: 60 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        style={{ width: '100%', maxWidth: 512, maxHeight: '88vh', overflowY: 'auto', borderRadius: '18px 18px 0 0', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 -8px 40px rgba(0,0,0,0.12)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 4 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border)' }} />
        </div>

        {/* Header */}
        <div style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '10px 18px 12px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', zIndex: 10 }}>
          <div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--gold)', marginBottom: 3 }}>{drink.name}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-second)' }}>{drink.category}</span>
              {drink.glassware && <>
                <span style={{ color: 'var(--text-muted)' }}>·</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-second)' }}>{drink.glassware}</span>
              </>}
              <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 999, background: 'var(--teal-50)', color: 'var(--teal-700)', border: '1px solid var(--teal-100)' }}>
                External
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ fontSize: '1.2rem', color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', marginLeft: 12, flexShrink: 0, padding: 4 }}>✕</button>
        </div>

        <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Image */}
          {drink.image && (
            <img src={drink.image} alt={drink.name} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 10 }} />
          )}

          {/* Ingredients */}
          {(drink.ingredients?.length > 0 || ingredients.length > 0) && (
            <div>
              <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>Ingredients</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {(drink.ingredients || ingredients).map((ing, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: '0.88rem' }}>
                    <span style={{ flexShrink: 0, fontWeight: 700, color: 'var(--gold)', minWidth: '4rem' }}>{ing.amount || '—'}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {drink.instructions?.[0] && (
            <div>
              <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>Method</p>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-second)', lineHeight: 1.7 }}>{drink.instructions[0]}</p>
            </div>
          )}

          {/* Related */}
          <div>
            <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
              More in {drink.category}
            </p>
            {loadingVars ? (
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Loading…</p>
            ) : variations.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {variations.map(v => (
                  <button
                    key={v.idDrink}
                    style={{ padding: '5px 12px', borderRadius: 999, fontSize: '0.75rem', cursor: 'pointer', background: 'var(--surface-high)', color: 'var(--text-second)', border: '1px solid var(--border)', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {v.strDrink}
                  </button>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No related drinks found</p>
            )}
          </div>

          {/* External note */}
          <div style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--teal-50)', border: '1px solid var(--teal-100)' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
              External recipe from TheCocktailDB. For in-depth history and technique, search this cocktail on Difford's Guide.
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

  const openDrink = useCallback(async (drink) => {
    if (drink._raw) { setSelected(drink); return }
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
    <div className="page">
      <Link to="/dashboard" className="back-link">← Dashboard</Link>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem', color: 'var(--gold)', marginBottom: 4 }}>Global Search</h2>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>TheCocktailDB · originals, classics & variations</p>

      <div style={{ marginBottom: 20 }}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search any cocktail…" onClear={() => setQuery('')} />
      </div>

      {error && (
        <div style={{ padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.85rem', background: 'rgba(168,80,80,0.1)', color: '#c0392b', border: '1px solid rgba(168,80,80,0.25)' }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{ width: 24, height: 24, border: '2px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%' }}
          />
        </div>
      )}

      {/* Random */}
      {!query && random && !loading && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10 }}>
            Discover a random cocktail
          </p>
          <button
            onClick={() => openDrink(random)}
            style={{ width: '100%', display: 'flex', gap: 12, alignItems: 'center', padding: 14, borderRadius: 12, textAlign: 'left', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
          >
            {random.image && (
              <img src={random.image} alt={random.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
            )}
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--gold)', marginBottom: 3 }}>{random.name}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-second)', marginBottom: 2 }}>{random.category} · {random.glassware}</p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tap to see recipe</p>
            </div>
          </button>
          <button
            onClick={fetchRandom}
            style={{ marginTop: 6, fontSize: '0.75rem', width: '100%', textAlign: 'center', padding: '8px 0', borderRadius: 8, cursor: 'pointer', color: 'var(--text-muted)', border: '1px solid var(--border)', background: 'none', fontFamily: 'DM Sans, sans-serif' }}
          >
            Another random →
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10 }}>
            {results.length} result{results.length !== 1 ? 's' : ''} — tap for recipe
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {results.map((drink, i) => (
              <motion.button
                key={drink.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => openDrink(drink)}
                style={{ width: '100%', display: 'flex', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 12, textAlign: 'left', cursor: 'pointer', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                {drink.image && (
                  <img src={drink.image} alt={drink.name} style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{drink.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-second)' }}>{drink.category}</p>
                </div>
                <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 999, background: 'var(--teal-50)', color: 'var(--teal-700)', border: '1px solid var(--teal-100)', flexShrink: 0 }}>
                  External
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {query.length >= 2 && !loading && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: 4 }}>No results</p>
          <p style={{ fontSize: '0.88rem' }}>Try a different cocktail name</p>
        </div>
      )}

      <AnimatePresence>
        {selected && <RecipeSheet drink={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}
