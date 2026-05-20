import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { coppaRecipes } from '../data/coppaRecipes'
import BatchDial from './ui/BatchDial'
import SearchBar from './ui/SearchBar'

const calcBatch = (ingredients, servings) =>
  ingredients.map(ing => {
    if (!ing.amount || ['leaves', 'dashes', 'top up', 'splash'].includes(ing.unit)) {
      return { ...ing, note: 'adjust to taste', batchable: false }
    }
    const totalMl = ing.amount * servings
    const bottles = ing.bottleSize ? Math.ceil(totalMl / ing.bottleSize) : null
    const leftover = bottles ? (bottles * ing.bottleSize) - totalMl : null
    return { ...ing, totalMl, bottles, leftover, batchable: true }
  })

export default function BatchCalculator() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(coppaRecipes[0])
  const [servings, setServings] = useState(10)

  const batchableRecipes = coppaRecipes.filter(r => r.batchable)
  const filtered = useMemo(() => {
    if (!query) return batchableRecipes
    return batchableRecipes.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  const batchedIngredients = useMemo(() => selected ? calcBatch(selected.ingredients, servings) : [], [selected, servings])
  const totalVolume = batchedIngredients.filter(i => i.batchable && i.totalMl).reduce((sum, i) => sum + i.totalMl, 0)
  const totalBottles = batchedIngredients.filter(i => i.bottles).reduce((sum, i) => sum + i.bottles, 0)

  return (
    <div className="page">
      <Link to="/dashboard" className="back-link">← Dashboard</Link>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem', color: 'var(--gold)', marginBottom: 4 }}>Batch Calc</h2>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>Scale any batchable recipe for events & prep</p>

      <div style={{ marginBottom: 12 }}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search batchable recipes…" />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {filtered.map(r => (
          <button key={r.id} onClick={() => setSelected(r)} style={{
            padding: '5px 12px', borderRadius: 999, fontSize: '0.78rem', cursor: 'pointer',
            background: selected?.id === r.id ? 'var(--gold)' : 'var(--surface)',
            color: selected?.id === r.id ? '#fff' : 'var(--text-second)',
            border: `1px solid ${selected?.id === r.id ? 'var(--gold)' : 'var(--border)'}`,
            fontWeight: selected?.id === r.id ? 600 : 400, fontFamily: 'DM Sans, sans-serif',
          }}>
            {r.name}
          </button>
        ))}
      </div>

      {selected && (
        <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          {/* Header */}
          <div style={{ background: 'var(--gold)', padding: '16px 18px' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: 3 }}>
              {selected.name}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)' }}>{selected.glassware} · {selected.method}</p>
          </div>

          {/* Servings */}
          <div style={{ background: 'var(--surface)', padding: '14px 18px', borderBottom: '1px solid var(--border)' }}>
            <p className="label" style={{ marginBottom: 10 }}>Servings</p>
            <BatchDial servings={servings} onChange={setServings} />
          </div>

          {/* Stats strip */}
          {totalVolume > 0 && (
            <div style={{ background: 'var(--teal-50)', padding: '10px 18px', borderBottom: '1px solid var(--teal-100)', display: 'flex', gap: 24 }}>
              <div>
                <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 2 }}>Total Volume</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif' }}>{(totalVolume / 1000).toFixed(2)}L</p>
              </div>
              {totalBottles > 0 && (
                <div>
                  <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: 2 }}>Bottles Needed</p>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif' }}>{totalBottles}</p>
                </div>
              )}
            </div>
          )}

          {/* Ingredients */}
          <div style={{ background: 'var(--surface)', padding: '14px 18px' }}>
            <p className="label" style={{ marginBottom: 12 }}>Quantities for {servings} × serves</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {batchedIngredients.map((ing, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ minWidth: 72, flexShrink: 0, fontWeight: 700, fontSize: '0.95rem', color: ing.batchable ? 'var(--gold)' : 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                    {ing.batchable ? (ing.totalMl ? `${ing.totalMl}ml` : '—') : 'taste'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{ing.name}</span>
                    {ing.bottles && (
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 1 }}>
                        {ing.bottles} × {ing.bottleSize}ml bottle{ing.bottles > 1 ? 's' : ''}
                        {ing.leftover > 0 ? ` · ${ing.leftover}ml leftover` : ''}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
