export default function FlavorTag({ tag }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs tracking-wide"
      style={{
        background: 'var(--surface-high)',
        color: 'var(--text-second)',
        border: '1px solid var(--border)',
      }}
    >
      {tag}
    </span>
  )
}
