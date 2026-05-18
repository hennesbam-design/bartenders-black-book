const PRESETS = [1, 2, 5, 10, 25, 50]

export default function BatchDial({ servings, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, servings - 1))}
        className="w-7 h-7 rounded-sm flex items-center justify-center text-sm transition-colors"
        style={{ background: 'var(--surface-high)', color: 'var(--gold)', border: '1px solid var(--border)' }}
      >
        −
      </button>
      <span
        className="w-10 text-center text-sm font-semibold tabular-nums"
        style={{ color: 'var(--gold-light)' }}
      >
        {servings}
      </span>
      <button
        onClick={() => onChange(servings + 1)}
        className="w-7 h-7 rounded-sm flex items-center justify-center text-sm transition-colors"
        style={{ background: 'var(--surface-high)', color: 'var(--gold)', border: '1px solid var(--border)' }}
      >
        +
      </button>
      <div className="flex gap-1 ml-2">
        {PRESETS.map(p => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className="px-1.5 py-0.5 rounded-sm text-xs transition-colors"
            style={{
              background: servings === p ? 'var(--gold)' : 'var(--surface-high)',
              color: servings === p ? '#0a0908' : 'var(--text-second)',
              border: '1px solid var(--border)',
              fontWeight: servings === p ? 600 : 400,
            }}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}
