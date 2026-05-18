import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { diffordsLinks } from '../data/diffordsLinks'
import { coppaRecipes } from '../data/coppaRecipes'
import SearchBar from './ui/SearchBar'

const ALL_CATEGORIES = ['All', ...new Set(diffordsLinks.map(d => d.category))]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function DiffordsLinks() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    return diffordsLinks.filter(d => {
      if (category !== 'All' && d.category !== category) return false
      if (query) {
        const q = query.toLowerCase()
        return d.name.toLowerCase().includes(q) || d.ourNote.toLowerCase().includes(q)
      }
      return true
    })
  }, [query, category])

  const byCategory = useMemo(() => {
    if (category !== 'All') return { [category]: filtered }
    return filtered.reduce((acc, d) => {
      ;(acc[d.category] = acc[d.category] || []).push(d)
      return acc
    }, {})
  }, [filtered, category])

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
      <h2 className="font-head italic mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>
        Difford's Guide
      </h2>
      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
        {filtered.length} reference{filtered.length !== 1 ? 's' : ''}
      </p>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
        Images, recipes and text remain copyright Difford's Guide.
      </p>

      {/* Search */}
      <div className="mb-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Search references…" />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {ALL_CATEGORIES.map(c => (
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

      {filtered.length === 0 && (
        <div className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
          <p className="font-head italic text-xl mb-1" style={{ color: 'var(--gold)' }}>No matches</p>
          <p className="text-sm">Try a different search</p>
        </div>
      )}

      {Object.entries(byCategory).map(([cat, links]) => (
        <div key={cat} className="mb-6">
          {category === 'All' && (
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
              {cat}
            </p>
          )}
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
            {links.map(link => {
              const related = link.relatedInternalId
                ? coppaRecipes.find(r => r.id === link.relatedInternalId)
                : null
              return (
                <motion.div
                  key={link.id}
                  variants={item}
                  className="deco-corner p-4 rounded-sm"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <h4
                    className="font-head italic mb-1"
                    style={{ color: 'var(--text-primary)', fontSize: '1.05rem' }}
                  >
                    {link.name}
                  </h4>
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{ color: 'var(--text-second)', lineHeight: 1.6 }}
                  >
                    {link.ourNote}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={link.diffordsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs"
                      style={{ background: 'rgba(196,145,61,0.1)', color: 'var(--gold)', border: '1px solid var(--border-gold)' }}
                    >
                      Open on Difford's Guide →
                    </a>
                    {related && (
                      <Link
                        to={`/recipe/${related.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs"
                        style={{ background: 'var(--surface-high)', color: 'var(--text-second)', border: '1px solid var(--border)' }}
                      >
                        Our {related.name}
                      </Link>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
