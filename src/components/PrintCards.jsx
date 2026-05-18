import { useState } from 'react'
import { Link } from 'react-router-dom'
import { coppaRecipes } from '../data/coppaRecipes'
import SearchBar from './ui/SearchBar'

// A6 print card — 105mm × 148mm
function PrintCard({ recipe }) {
  return (
    <div
      className="print-card relative overflow-hidden"
      style={{
        width: '105mm',
        minHeight: '148mm',
        background: '#fff',
        border: '1px solid #ddd',
        padding: '8mm',
        fontFamily: 'DM Sans, sans-serif',
        pageBreakAfter: 'always',
        color: '#1a1410',
      }}
    >
      {/* Corner decorations */}
      <div style={{ position: 'absolute', top: 4, left: 4, width: 10, height: 10, borderTop: '1px solid #c4913d', borderLeft: '1px solid #c4913d' }} />
      <div style={{ position: 'absolute', top: 4, right: 4, width: 10, height: 10, borderTop: '1px solid #c4913d', borderRight: '1px solid #c4913d' }} />
      <div style={{ position: 'absolute', bottom: 4, left: 4, width: 10, height: 10, borderBottom: '1px solid #c4913d', borderLeft: '1px solid #c4913d' }} />
      <div style={{ position: 'absolute', bottom: 4, right: 4, width: 10, height: 10, borderBottom: '1px solid #c4913d', borderRight: '1px solid #c4913d' }} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5mm', borderBottom: '0.5px solid #c4913d', paddingBottom: '4mm' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 18, fontWeight: 600, color: '#1a1410' }}>
          {recipe.name}
        </div>
        <div style={{ fontSize: 9, color: '#a89070', marginTop: 2 }}>
          {recipe.glassware} · {recipe.method} · {recipe.ice}
        </div>
      </div>

      {/* Ingredients */}
      <div style={{ marginBottom: '4mm' }}>
        <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5e4f38', marginBottom: 3 }}>Ingredients</div>
        {recipe.ingredients.map((ing, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, fontSize: 9, marginBottom: 2 }}>
            <span style={{ color: '#c4913d', fontWeight: 600, minWidth: 32 }}>
              {ing.amount ? `${ing.amount}${ing.unit === 'ml' ? 'ml' : ` ${ing.unit}`}` : ing.unit}
            </span>
            <span style={{ color: '#1a1410' }}>{ing.name}</span>
          </div>
        ))}
      </div>

      {/* Method */}
      <div style={{ marginBottom: '4mm' }}>
        <div style={{ fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5e4f38', marginBottom: 3 }}>Method</div>
        {recipe.instructions.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, fontSize: 9, marginBottom: 3 }}>
            <span style={{ color: '#c4913d', flexShrink: 0 }}>{i + 1}.</span>
            <span style={{ color: '#1a1410', lineHeight: 1.5 }}>{step}</span>
          </div>
        ))}
      </div>

      {/* Garnish */}
      {recipe.garnish && (
        <div style={{ fontSize: 9, color: '#a89070', borderTop: '0.5px solid #e0d8d0', paddingTop: 3, marginBottom: 3 }}>
          <span style={{ color: '#5e4f38' }}>Garnish: </span>{recipe.garnish}
        </div>
      )}

      {/* Allergens */}
      {recipe.allergens?.length > 0 && (
        <div style={{ fontSize: 8, color: '#8b5a00', marginTop: 3 }}>
          ⚠ {recipe.allergens.join(' · ')}
        </div>
      )}

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 7, color: '#c4913d', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
        Bartender's Black Book
      </div>
    </div>
  )
}

export default function PrintCards() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(new Set())

  const filtered = coppaRecipes.filter(r =>
    !query || r.name.toLowerCase().includes(query.toLowerCase())
  )

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectAll = () => setSelected(new Set(coppaRecipes.map(r => r.id)))
  const clearAll = () => setSelected(new Set())

  const toPrint = coppaRecipes.filter(r => selected.has(r.id))

  return (
    <div className="min-h-screen max-w-lg mx-auto px-4 py-6">
      <Link to="/dashboard" className="text-xs mb-3 block" style={{ color: 'var(--text-muted)' }}>← Dashboard</Link>
      <h2 className="font-head italic mb-1" style={{ color: 'var(--gold-light)', fontSize: '1.8rem' }}>
        Print Cards
      </h2>
      <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
        Select recipes to print as A6 recipe cards
      </p>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Filter recipes…" />
        <button onClick={selectAll} className="text-xs flex-shrink-0 px-3 py-2 rounded-sm" style={{ background: 'var(--surface)', color: 'var(--text-second)', border: '1px solid var(--border)' }}>
          All
        </button>
        <button onClick={clearAll} className="text-xs flex-shrink-0 px-3 py-2 rounded-sm" style={{ background: 'var(--surface)', color: 'var(--text-second)', border: '1px solid var(--border)' }}>
          None
        </button>
      </div>

      {/* Recipe picker */}
      <div className="flex flex-wrap gap-2 mb-5">
        {filtered.map(r => (
          <button
            key={r.id}
            onClick={() => toggleSelect(r.id)}
            className="px-3 py-1.5 rounded-sm text-xs transition-colors"
            style={{
              background: selected.has(r.id) ? 'var(--gold)' : 'var(--surface)',
              color: selected.has(r.id) ? '#0a0908' : 'var(--text-second)',
              border: `1px solid ${selected.has(r.id) ? 'var(--gold)' : 'var(--border)'}`,
              fontWeight: selected.has(r.id) ? 600 : 400,
            }}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Print button */}
      {selected.size > 0 && (
        <div className="mb-6">
          <button
            onClick={() => window.print()}
            className="w-full py-3 rounded-sm text-sm font-semibold"
            style={{ background: 'var(--gold)', color: '#0a0908' }}
          >
            Print {selected.size} card{selected.size !== 1 ? 's' : ''} →
          </button>
          <p className="text-xs mt-2 text-center" style={{ color: 'var(--text-muted)' }}>
            Set your printer to A6 or postcard size for best results
          </p>
        </div>
      )}

      {/* Preview */}
      {toPrint.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '0.12em' }}>
            Preview
          </p>
          <div
            id="print-area"
            className="flex flex-wrap gap-4"
            style={{ transform: 'scale(0.55)', transformOrigin: 'top left', width: '182%' }}
          >
            {toPrint.map(r => <PrintCard key={r.id} recipe={r} />)}
          </div>
        </div>
      )}

      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #print-area, #print-area * { visibility: visible !important; }
          #print-area {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            width: auto !important;
            display: block !important;
          }
          .print-card {
            page-break-after: always !important;
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
