export default function FlavorTag({ tag }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: 999,
      fontSize: '0.7rem', fontWeight: 500,
      background: 'var(--teal-50)', color: 'var(--teal-700)',
      border: '1px solid var(--teal-100)',
      fontFamily: 'DM Sans, sans-serif',
    }}>
      {tag}
    </span>
  )
}
