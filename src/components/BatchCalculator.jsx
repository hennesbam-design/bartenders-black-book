import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { coppaRecipes } from '../data/coppaRecipes'
import BatchDial from './ui/BatchDial'
import SearchBar from './ui/SearchBar'
import DiamondDivider from './ui/DiamondDivider'

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

  const batchedIngredients = useMemo(
    () => selected ? calcBatch(selected.ingredients, servings) : [],
    [selected, servings]
  )

  const totalVolume = batchedIngredients
    .filter(i => i.batchable && i.totalMl)
    .reduce((sum, i) => sum + i.totalMl, 0)

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
      <h2 className="font-head italic mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>
        Batch Calculator
      </h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Scale any batchable recipe</p>

      {/* Recipe picker */}
      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search batchable recipes…" />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {filtered.map(r => (
          <button
            key={r.id}
            onClick={() => setSelected(r)}
            className="px-3 py-1.5 rounded-sm text-xs transition-colors"
            style={{
              background: selected?.id === r.id ? 'var(--gold)' : 'var(--surface)',
              color: selected?.id === r.id ? '#0a0908' : 'var(--text-second)',
              border: `1px solid ${selected?.id === r.id ? 'var(--gold)' : 'var(--border)'}`,
              fontWeight: selected?.id === r.id ? 600 : 400,
            }}
          >
            {r.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="rounded-sm overflow-hidden" style={{ border: '1px solid var(--border-gold)' }}>
          {/* Selected recipe header */}
          <div className="px-4 pt-4 pb-3" style={{ background: 'var(--surface)' }}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-head italic" style={{ color: 'var(--gold-light)', fontSize: '1.3rem' }}>
                  {selected.name}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {selected.glassware} · {selected.method}
                </p>
              </div>
              {!selected.batchable && (
                <span className="text-xs px-2 py-1 rounded-sm" style={{ background: 'rgba(168,80,80,0.2)', color: '#c88080', border: '1px solid rgba(168,80,80,0.3)' }}>
                  Not batchable
                </span>
              )}
            </div>
          </div>

          <DiamondDivider />

          {/* Servings control */}
          <div className="px-4 py-3" style={{ background: 'var(--surface)' }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
              Servings
            </p>
            <BatchDial servings={servings} onChange={setServings} />
          </div>

          <DiamondDivider />

          {/* Batched ingredients */}
          <div className="px-4 py-4" style={{ background: 'var(--surface)' }}>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
              Quantities for {servings} × serves
            </p>
            <div className="space-y-2">
              {batchedIngredients.map((ing, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0" style={{ minWidth: '5rem' }}>
                    {ing.batchable ? (
                      <span className="text-sm font-semibold tabular-nums" style={{ color: 'var(--gold)' }}>
                        {ing.totalMl ? `${ing.totalMl}ml` : '—'}
                      </span>
                    ) : (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>taste</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{ing.name}</span>
                    {ing.bottles && (
                      <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {ing.bottles} × {ing.bottleSize}ml bottle{ing.bottles > 1 ? 's' : ''}
                        {ing.leftover > 0 && ` (${ing.leftover}ml leftover)`}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {totalVolume > 0 && (
              <div
                className="mt-4 pt-3 flex items-center justify-between text-sm"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                <span style={{ color: 'var(--text-muted)' }}>Total volume</span>
                <span className="font-semibold tabular-nums" style={{ color: 'var(--gold-light)' }}>
                  {(totalVolume / 1000).toFixed(2)}L
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
