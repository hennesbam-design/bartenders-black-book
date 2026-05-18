export default function DiamondDivider({ className = '' }) {
  return (
    <div className={`diamond-divider ${className}`}>
      <span className="diamond-gem" />
    </div>
  )
}
