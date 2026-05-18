import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { coppaRecipes } from '../data/coppaRecipes'
import RecipeCard from './RecipeCard'
import SearchBar from './ui/SearchBar'

const METHODS = ['All', 'Build', 'Shake', 'Stir', 'Build & Muddle', 'Shake + Float', 'Shake + Build']
const FLAVOURS = [...new Set(coppaRecipes.flatMap(r => r.flavour))].sort()
const CATEGORIES = ['All', ...new Set(coppaRecipes.map(r => r.category))]

export default function HouseRecipes({ favourites, onToggleFav }) {
  const [query, setQuery] = useState('')
  const [method, setMethod] = useState('All')
  const [flavour, setFlavour] = useState('All')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return coppaRecipes.filter(r => {
      if (query && !r.name.toLowerCase().includes(query.toLowerCase()) &&
          !r.category.toLowerCase().includes(query.toLowerCase()) &&
          !r.flavour.some(f => f.toLowerCase().includes(query.toLowerCase()))) return false
      if (method !== 'All' && !r.method.includes(method)) return false
      if (flavour !== 'All' && !r.flavour.includes(flavour)) return false
      if (category !== 'All' && r.category !== category) return false
      return true
    })
  }, [query, method, flavour, category])

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
        <h2
          className="font-head italic mb-1"
          style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}
        >
          House Recipes
        </h2>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {filtered.length} of {coppaRecipes.length} cocktails
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {CATEGORIES.slice(0, 6).map(c => (
          <button
            key={c}
            onClick={() => setCategory(c === category ? 'All' : c)}
            className="flex-shrink-0 px-3 py-1 rounded-sm text-xs transition-colors"
            style={{
              background: category === c ? 'var(--gold)' : 'var(--surface-high)',
              color: category === c ? '#0a0908' : 'var(--text-second)',
              border: '1px solid var(--border)',
              fontWeight: category === c ? 600 : 400,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Method filter */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {['All', 'Build', 'Shake', 'Stir'].map(m => (
          <button
            key={m}
            onClick={() => setMethod(m === method ? 'All' : m)}
            className="flex-shrink-0 px-3 py-1 rounded-sm text-xs transition-colors"
            style={{
              background: method === m ? 'rgba(196,145,61,0.2)' : 'var(--surface)',
              color: method === m ? 'var(--gold)' : 'var(--text-muted)',
              border: `1px solid ${method === m ? 'var(--border-gold)' : 'var(--border)'}`,
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <p className="font-head italic text-xl mb-1" style={{ color: 'var(--gold)' }}>No matches</p>
          <p className="text-sm">Try a different search or filter</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
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
