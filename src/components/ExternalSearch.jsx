import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCocktailDB } from '../hooks/useCocktailDB'
import SearchBar from './ui/SearchBar'

const RecipeSheet = ({ drink, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
    style={{ background: 'rgba(10,9,8,0.85)' }}
    onClick={onClose}
  >
    <div
      className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-t-lg sm:rounded-lg"
      style={{ background: 'var(--surface)', border: '1px solid var(--border-gold)' }}
      onClick={e => e.stopPropagation()}
    >
      <div className="sticky top-0 flex items-center justify-between px-4 py-3" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div>
          <h3 className="font-head italic" style={{ color: 'var(--gold-light)', fontSize: '1.2rem' }}>{drink.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs" style={{ color: 'var(--text-second)' }}>{drink.category}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-sm" style={{ background: 'rgba(120,144,112,0.2)', color: '#a0c098', border: '1px solid rgba(120,144,112,0.3)' }}>External</span>
          </div>
        </div>
        <button onClick={onClose} className="text-lg" style={{ color: 'var(--text-muted)' }}>✕</button>
      </div>

      <div className="p-4">
        {drink.image && (
          <img src={drink.image} alt={drink.name} className="w-full h-48 object-cover rounded-sm mb-4" />
        )}

        <div
          className="flex gap-4 text-xs mb-4 p-3 rounded-sm"
          style={{ background: 'var(--surface-high)', border: '1px solid var(--border)' }}
        >
          <div className="text-center flex-1">
            <div style={{ color: 'var(--text-muted)' }}>Glass</div>
            <div className="mt-0.5" style={{ color: 'var(--text-second)' }}>{drink.glassware || '—'}</div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>Ingredients</p>
          <ul className="space-y-1.5">
            {drink.ingredients.map((ing, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 font-semibold" style={{ color: 'var(--gold)', minWidth: '4rem' }}>{ing.amount}</span>
                <span style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {drink.instructions?.[0] && (
          <div>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>Instructions</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-second)', lineHeight: 1.7 }}>{drink.instructions[0]}</p>
          </div>
        )}
      </div>
    </div>
  </motion.div>
)

export default function ExternalSearch({ favourites, onToggleFav }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const { results, loading, error, search, random, fetchRandom } = useCocktailDB()

  useEffect(() => {
    const t = setTimeout(() => { if (query.length >= 2) search(query) }, 400)
    return () => clearTimeout(t)
  }, [query, search])

  useEffect(() => { fetchRandom() }, [fetchRandom])

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
      <h2 className="font-head italic mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>Global Search</h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Powered by TheCocktailDB</p>

      <div className="mb-5">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search any cocktail…"
          onClear={() => { setQuery('') }}
        />
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

      {/* Random cocktail */}
      {!query && random && !loading && (
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
            Random Cocktail
          </p>
          <button
            onClick={() => setSelected(random)}
            className="w-full flex gap-3 items-center p-3 rounded-sm text-left transition-colors"
            style={{ background: 'var(--surface)', border: '1px solid var(--border-gold)' }}
          >
            {random.image && (
              <img src={random.image} alt={random.name} className="w-14 h-14 object-cover rounded-sm flex-shrink-0" />
            )}
            <div>
              <h4 className="font-head italic" style={{ color: 'var(--gold-light)' }}>{random.name}</h4>
              <p className="text-xs" style={{ color: 'var(--text-second)' }}>{random.category} · {random.glassware}</p>
            </div>
          </button>
          <button
            onClick={fetchRandom}
            className="mt-2 text-xs w-full text-center py-1.5 rounded-sm"
            style={{ color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            Another random cocktail →
          </button>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
            {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
          <div className="space-y-2">
            {results.map(drink => (
              <button
                key={drink.id}
                onClick={() => setSelected(drink)}
                className="w-full flex gap-3 items-center p-3 rounded-sm text-left transition-colors recipe-card-hover"
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

      {/* Recipe sheet modal */}
      {selected && <RecipeSheet drink={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
