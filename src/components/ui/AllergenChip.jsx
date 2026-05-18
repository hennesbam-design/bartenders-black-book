const ALLERGEN_COLOURS = {
  'Sulphites': '#7a5200',
  'Egg': '#5a4a00',
  'Nuts': '#6a2a00',
  'Dairy': '#003a5a',
  'Gluten': '#3a2a00',
  default: '#2e2720',
}

export default function AllergenChip({ allergen }) {
  const bg = ALLERGEN_COLOURS[allergen] || ALLERGEN_COLOURS.default
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium tracking-wide"
      style={{ background: bg, color: 'var(--gold-light)', border: '1px solid var(--border-gold)' }}
    >
      ⚠ {allergen}
    </span>
  )
}
