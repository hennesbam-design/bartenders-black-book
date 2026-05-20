const STYLES = {
  Sulphites: { bg: '#fef9e7', color: '#7a5800', border: '#f0d060' },
  Egg:       { bg: '#fff8f0', color: '#7a4400', border: '#f0b870' },
  Nuts:      { bg: '#fff3ef', color: '#7a2800', border: '#f09878' },
  Dairy:     { bg: '#eff8ff', color: '#1a5080', border: '#90c8f0' },
  Gluten:    { bg: '#f8f5ef', color: '#5a4000', border: '#d0b870' },
  default:   { bg: '#fef9e7', color: '#7a5800', border: '#f0d060' },
}

export default function AllergenChip({ allergen }) {
  const s = STYLES[allergen] || STYLES.default
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 9px', borderRadius: 999,
      fontSize: '0.7rem', fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>
      ⚠ {allergen}
    </span>
  )
}
