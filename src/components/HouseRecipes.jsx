import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { coppaRecipes } from '../data/coppaRecipes'
import RecipeCard from './RecipeCard'
import PrepCard from './PrepCard'
import SearchBar from './ui/SearchBar'
import { useBarPrep } from '../hooks/useBarPrep'

const CATEGORIES = ['All', ...new Set(coppaRecipes.map(r => r.category))]

export default function HouseRecipes({ favourites, onToggleFav }) {
  const [query, setQuery] = useState('')
  const [method, setMethod] = useState('All')
  const [category, setCategory] = useState('All')
  const { barPrep, toggleBarPrep } = useBarPrep()

  const filtered = useMemo(() => {
    return coppaRecipes.filter(r => {
      if (query && !r.name.toLowerCase().includes(query.toLowerCase()) &&
          !r.category.toLowerCase().includes(query.toLowerCase()) &&
          !r.flavour.some(f => f.toLowerCase().includes(query.toLowerCase()))) return false
      if (method !== 'All' && !r.method.includes(method)) return false
      if (category !== 'All' && r.category !== category) return false
      return true
    })
  }, [query, method, category])

  return (
    <div className="page">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <Link to="/dashboard" className="back-link">← Dashboard</Link>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem', color: 'var(--gold)', lineHeight: 1.1, marginBottom: 4 }}>
            House Recipes
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {filtered.length} of {coppaRecipes.length} cocktails
          </p>
        </div>

        {/* Bar Prep toggle */}
        <button
          onClick={toggleBarPrep}
          title={barPrep ? 'Exit Bar Prep mode' : 'Enter Bar Prep mode'}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '8px 12px', borderRadius: 10, cursor: 'pointer',
            background: barPrep ? 'var(--gold)' : 'var(--surface)',
            border: `1px solid ${barPrep ? 'var(--gold)' : 'var(--border)'}`,
            color: barPrep ? '#fff' : 'var(--text-muted)',
            transition: 'all 0.2s',
            flexShrink: 0,
            marginTop: 22,
          }}
        >
          {/* Eye / reading icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span style={{ fontSize: '0.6rem', fontWeight: 600, fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {barPrep ? 'Prep On' : 'Bar Prep'}
          </span>
        </button>
      </div>

      {/* Bar prep banner */}
      {barPrep && (
        <div style={{
          background: 'var(--teal-50)', border: '1px solid var(--teal-100)',
          borderRadius: 10, padding: '10px 14px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <p style={{ fontSize: '0.78rem', color: 'var(--teal-700)', fontFamily: 'DM Sans, sans-serif' }}>
            <strong>Bar Prep mode</strong> — clean view for service. Tap the eye icon to switch back.
          </p>
        </div>
      )}

      {/* Search */}
      <div style={{ marginBottom: 12 }}>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 10, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c === category ? 'All' : c)}
            style={{
              flexShrink: 0, padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem',
              fontFamily: 'DM Sans, sans-serif', fontWeight: category === c ? 600 : 400,
              cursor: 'pointer', transition: 'all 0.15s',
              background: category === c ? 'var(--gold)' : 'var(--surface)',
              color: category === c ? '#fff' : 'var(--text-second)',
              border: `1px solid ${category === c ? 'var(--gold)' : 'var(--border)'}`,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Method pills */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {['All', 'Build', 'Shake', 'Stir'].map(m => (
          <button
            key={m}
            onClick={() => setMethod(m === method ? 'All' : m)}
            style={{
              flexShrink: 0, padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem',
              fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.15s',
              background: method === m ? 'var(--teal-50)' : 'transparent',
              color: method === m ? 'var(--gold)' : 'var(--text-muted)',
              border: `1px solid ${method === m ? 'var(--teal-100)' : 'var(--border)'}`,
              fontWeight: method === m ? 600 : 400,
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Grid / List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: 4 }}>No matches</p>
          <p style={{ fontSize: '0.88rem' }}>Try a different search or filter</p>
        </div>
      ) : barPrep ? (
        /* Bar Prep: single-column clean list */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {filtered.map(recipe => (
            <PrepCard key={recipe.id} recipe={recipe} />
          ))}
        </motion.div>
      ) : (
        /* Normal: 2-column flip cards */
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFav={favourites?.includes(recipe.id)}
              onToggleFav={onToggleFav}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
