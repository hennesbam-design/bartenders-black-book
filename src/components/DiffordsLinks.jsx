import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { diffordsLinks } from '../data/diffordsLinks'
import { coppaRecipes } from '../data/coppaRecipes'
import SearchBar from './ui/SearchBar'

const ALL_CATEGORIES = ['All', ...new Set(diffordsLinks.map(d => d.category))]
const pill = (active) => ({
  flexShrink: 0, padding: '5px 14px', borderRadius: 999, fontSize: '0.75rem',
  fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.15s',
  background: active ? 'var(--gold)' : 'var(--surface)',
  color: active ? '#fff' : 'var(--text-second)',
  border: `1px solid ${active ? 'var(--gold)' : 'var(--border)'}`,
  fontWeight: active ? 600 : 400,
})

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } }

export default function DiffordsLinks() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => diffordsLinks.filter(d => {
    if (category !== 'All' && d.category !== category) return false
    if (query) { const q = query.toLowerCase(); return d.name.toLowerCase().includes(q) || d.ourNote.toLowerCase().includes(q) }
    return true
  }), [query, category])

  const byCategory = useMemo(() => {
    if (category !== 'All') return { [category]: filtered }
    return filtered.reduce((acc, d) => { (acc[d.category] = acc[d.category] || []).push(d); return acc }, {})
  }, [filtered, category])

  return (
    <div className="page">
      <Link to="/dashboard" className="back-link">← Dashboard</Link>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem', color: 'var(--gold)', marginBottom: 4 }}>Difford's Guide</h2>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 4 }}>{filtered.length} reference{filtered.length !== 1 ? 's' : ''}</p>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 18 }}>Images, recipes and text remain copyright Difford's Guide.</p>

      <div style={{ marginBottom: 12 }}><SearchBar value={query} onChange={setQuery} placeholder="Search references…" /></div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
        {ALL_CATEGORIES.map(c => <button key={c} onClick={() => setCategory(c)} style={pill(category === c)}>{c}</button>)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--gold)', marginBottom: 4 }}>No matches</p>
          <p style={{ fontSize: '0.88rem' }}>Try a different search</p>
        </div>
      )}

      {Object.entries(byCategory).map(([cat, links]) => (
        <div key={cat} style={{ marginBottom: 24 }}>
          {category === 'All' && (
            <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12 }}>{cat}</p>
          )}
          <motion.div variants={container} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {links.map(link => {
              const related = link.relatedInternalId ? coppaRecipes.find(r => r.id === link.relatedInternalId) : null
              return (
                <motion.div key={link.id} variants={item} style={{ background: 'var(--surface)', borderRadius: 12, padding: '14px 16px', border: '1px solid var(--border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 6 }}>{link.name}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-second)', lineHeight: 1.6, marginBottom: 12 }}>{link.ourNote}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    <a href={link.diffordsUrl} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '7px 14px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, background: 'var(--gold)', color: '#fff', textDecoration: 'none', fontFamily: 'DM Sans, sans-serif' }}>
                      Difford's Guide ↗
                    </a>
                    {related && (
                      <Link to={`/recipe/${related.id}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '7px 14px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 500, background: 'var(--teal-50)', color: 'var(--teal-700)', textDecoration: 'none', border: '1px solid var(--teal-100)', fontFamily: 'DM Sans, sans-serif' }}>
                        Our {related.name} →
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
