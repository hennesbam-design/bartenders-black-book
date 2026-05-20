/**
 * PrepCard — bar prep / reading mode view of a recipe.
 * Clean, high-contrast, zero decoration — just what you need mid-service.
 */
export default function PrepCard({ recipe }) {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '16px 18px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Name + meta */}
      <div style={{ marginBottom: 12 }}>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '1.35rem',
          fontWeight: 600,
          color: 'var(--gold)',
          lineHeight: 1.15,
          marginBottom: 3,
        }}>
          {recipe.name}
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
          {recipe.glassware} · {recipe.method} · {recipe.ice}
        </p>
      </div>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />

      {/* Ingredients */}
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
          Ingredients
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {recipe.ingredients.map((ing, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: '0.92rem',
                color: 'var(--gold)',
                minWidth: 52,
                flexShrink: 0,
              }}>
                {ing.amount
                  ? `${ing.amount}${ing.unit === 'ml' ? 'ml' : ` ${ing.unit}`}`
                  : ing.unit || '—'}
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.35 }}>
                {ing.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 12 }} />

      {/* Method */}
      <div style={{ marginBottom: recipe.garnish ? 12 : 0 }}>
        <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
          Method
        </p>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {recipe.instructions.map((step, i) => (
            <li key={i} style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.88rem', flexShrink: 0, minWidth: 18, fontFamily: 'DM Sans, sans-serif' }}>
                {i + 1}.
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-second)', lineHeight: 1.5, fontFamily: 'DM Sans, sans-serif' }}>
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Garnish */}
      {recipe.garnish && (
        <div style={{
          marginTop: 10,
          paddingTop: 10,
          borderTop: '1px solid var(--border)',
          display: 'flex', gap: 6, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0, paddingTop: 1 }}>Garnish</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-second)' }}>{recipe.garnish}</span>
        </div>
      )}

      {/* Allergens */}
      {recipe.allergens?.length > 0 && (
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {recipe.allergens.map(a => (
            <span key={a} style={{
              fontSize: '0.68rem', padding: '2px 8px', borderRadius: 999,
              background: '#fef3cd', color: '#7a5c00',
              border: '1px solid #f0e0a0',
              fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
            }}>
              ⚠ {a}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
