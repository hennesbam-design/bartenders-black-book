const PRESETS = [1, 2, 5, 10, 25, 50]

export default function BatchDial({ servings, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => onChange(Math.max(1, servings - 1))}
        style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', cursor: 'pointer', background: 'var(--surface-high)', color: 'var(--gold)', border: '1px solid var(--border)', fontWeight: 600 }}
      >−</button>
      <span style={{ width: 40, textAlign: 'center', fontSize: '1rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif' }}>
        {servings}
      </span>
      <button
        onClick={() => onChange(servings + 1)}
        style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', cursor: 'pointer', background: 'var(--surface-high)', color: 'var(--gold)', border: '1px solid var(--border)', fontWeight: 600 }}
      >+</button>
      <div style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
        {PRESETS.map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            style={{
              padding: '3px 8px', borderRadius: 6, fontSize: '0.72rem', cursor: 'pointer',
              background: servings === p ? 'var(--gold)' : 'var(--surface-high)',
              color: servings === p ? '#fff' : 'var(--text-second)',
              border: '1px solid var(--border)',
              fontWeight: servings === p ? 700 : 400,
              fontFamily: 'DM Sans, sans-serif',
            }}
          >{p}</button>
        ))}
      </div>
    </div>
  )
}
