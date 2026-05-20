import { useState } from 'react'
import { Link } from 'react-router-dom'
import { coppaRecipes } from '../data/coppaRecipes'
import SearchBar from './ui/SearchBar'
import { useRecipeImage } from '../hooks/useRecipeImage'

/* ── A4 print card ─────────────────────────────────────────── */
function A4Card({ recipe }) {
  const { src: imageSrc } = useRecipeImage(recipe)

  return (
    <div
      className="print-card"
      style={{
        width: '210mm',
        minHeight: '297mm',
        background: '#fff',
        fontFamily: 'DM Sans, sans-serif',
        pageBreakAfter: 'always',
        color: '#0d1f20',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid #dde6e7',
      }}
    >
      {/* Teal header band */}
      <div style={{ background: '#007c75', padding: '14mm 14mm 10mm', color: '#fff' }}>
        <div style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 4, fontWeight: 600 }}>
          {recipe.category}
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 36, fontWeight: 300, lineHeight: 1.05, margin: 0, color: '#fff' }}>
          {recipe.name}
        </h1>
        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.75)', marginTop: 6, marginBottom: 0, letterSpacing: '0.04em' }}>
          {recipe.glassware} &nbsp;·&nbsp; {recipe.method} &nbsp;·&nbsp; {recipe.ice}
        </p>
      </div>

      {/* Body — two columns */}
      <div style={{ display: 'flex', gap: 0, flex: 1, padding: '10mm 14mm 0' }}>

        {/* Left: Ingredients */}
        <div style={{ flex: '0 0 45%', paddingRight: 10, borderRight: '1px solid #dde6e7' }}>
          <p style={{ fontSize: 7.5, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#7a9195', fontWeight: 700, marginBottom: 8 }}>
            Ingredients
          </p>
          {recipe.ingredients.map((ing, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5, alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 700, fontSize: 10, color: '#007c75', minWidth: 40, flexShrink: 0 }}>
                {ing.amount
                  ? `${ing.amount}${ing.unit === 'ml' ? 'ml' : ` ${ing.unit}`}`
                  : ing.unit || '—'}
              </span>
              <span style={{ fontSize: 10, color: '#0d1f20', lineHeight: 1.4 }}>{ing.name}</span>
            </div>
          ))}

          {recipe.garnish && (
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #dde6e7' }}>
              <p style={{ fontSize: 7.5, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#7a9195', fontWeight: 700, marginBottom: 5 }}>Garnish</p>
              <p style={{ fontSize: 10, color: '#3a5258', lineHeight: 1.4 }}>{recipe.garnish}</p>
            </div>
          )}

          {recipe.allergens?.length > 0 && (
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 8, color: '#9a6c00', margin: 0 }}>⚠ {recipe.allergens.join(' · ')}</p>
            </div>
          )}
        </div>

        {/* Right: Method */}
        <div style={{ flex: 1, paddingLeft: 10 }}>
          <p style={{ fontSize: 7.5, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#7a9195', fontWeight: 700, marginBottom: 8 }}>
            Method
          </p>
          {recipe.instructions.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 7 }}>
              <span style={{ fontWeight: 700, color: '#007c75', fontSize: 10, flexShrink: 0, minWidth: 14 }}>{i + 1}.</span>
              <span style={{ fontSize: 10, color: '#0d1f20', lineHeight: 1.55 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Image */}
      {imageSrc && (
        <div style={{ padding: '8mm 14mm 0' }}>
          <div style={{ height: 1, background: '#dde6e7', marginBottom: '8mm' }} />
          <img
            src={imageSrc}
            alt={recipe.name}
            style={{ width: '100%', maxHeight: '72mm', objectFit: 'cover', borderRadius: 6 }}
            onError={e => { e.target.style.display = 'none' }}
          />
        </div>
      )}

      {/* Talking point */}
      {recipe.talkingPoint && (
        <div style={{ padding: '6mm 14mm 0' }}>
          <div style={{ background: '#e6f5f4', borderRadius: 6, padding: '8px 12px', borderLeft: '3px solid #007c75' }}>
            <p style={{ fontSize: 9, color: '#005450', lineHeight: 1.55, margin: 0, fontStyle: 'italic' }}>
              ✦ {recipe.talkingPoint}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: 'auto', padding: '6mm 14mm 8mm',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #dde6e7',
      }}>
        <p style={{ fontSize: 8, color: '#7a9195', margin: 0, fontStyle: 'italic', fontFamily: 'Cormorant Garamond, serif' }}>
          Bartender's Black Book
        </p>
        <p style={{ fontSize: 8, color: '#7a9195', margin: 0 }}>Coppa Club · 2026</p>
      </div>
    </div>
  )
}

/* ── Main page ──────────────────────────────────────────────── */
export default function PrintCards() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(new Set())

  const filtered = coppaRecipes.filter(r =>
    !query || r.name.toLowerCase().includes(query.toLowerCase())
  )
  const toggleSelect = (id) => {
    setSelected(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  }
  const toPrint = coppaRecipes.filter(r => selected.has(r.id))

  return (
    <div className="page">
      <Link to="/dashboard" className="back-link">← Dashboard</Link>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '2rem', color: 'var(--gold)', marginBottom: 4 }}>
        Print Cards
      </h2>
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20 }}>
        A4 recipe sheets — image, ingredients, method &amp; talking point
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
        <SearchBar value={query} onChange={setQuery} placeholder="Filter recipes…" />
        <button onClick={() => setSelected(new Set(coppaRecipes.map(r => r.id)))} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 8, fontSize: '0.78rem', background: 'var(--surface)', color: 'var(--text-second)', border: '1px solid var(--border)', cursor: 'pointer' }}>All</button>
        <button onClick={() => setSelected(new Set())} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 8, fontSize: '0.78rem', background: 'var(--surface)', color: 'var(--text-second)', border: '1px solid var(--border)', cursor: 'pointer' }}>None</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
        {filtered.map(r => (
          <button key={r.id} onClick={() => toggleSelect(r.id)} style={{
            padding: '5px 12px', borderRadius: 999, fontSize: '0.78rem', cursor: 'pointer',
            background: selected.has(r.id) ? 'var(--gold)' : 'var(--surface)',
            color: selected.has(r.id) ? '#fff' : 'var(--text-second)',
            border: `1px solid ${selected.has(r.id) ? 'var(--gold)' : 'var(--border)'}`,
            fontWeight: selected.has(r.id) ? 600 : 400, fontFamily: 'DM Sans, sans-serif',
          }}>
            {r.name}
          </button>
        ))}
      </div>

      {selected.size > 0 && (
        <div style={{ marginBottom: 28 }}>
          <button onClick={() => window.print()} style={{
            width: '100%', padding: '14px 0', borderRadius: 10,
            fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
            background: 'var(--gold)', color: '#fff', border: 'none', fontFamily: 'DM Sans, sans-serif',
          }}>
            Print {selected.size} A4 sheet{selected.size !== 1 ? 's' : ''} →
          </button>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>
            Set paper size to A4 in your printer settings
          </p>
        </div>
      )}

      {toPrint.length > 0 && (
        <div>
          <p className="label" style={{ marginBottom: 12 }}>Preview</p>
          <div id="print-area" style={{ transform: 'scale(0.38)', transformOrigin: 'top left', width: '263%', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {toPrint.map(r => <A4Card key={r.id} recipe={r} />)}
          </div>
        </div>
      )}

      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #print-area, #print-area * { visibility: visible !important; }
          #print-area {
            position: fixed !important; top: 0 !important; left: 0 !important;
            transform: none !important; width: auto !important;
            display: flex !important; flex-direction: column !important;
          }
          .print-card { page-break-after: always !important; display: flex !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  )
}
