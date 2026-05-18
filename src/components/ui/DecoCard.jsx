export default function DecoCard({ children, className = '', onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`deco-corner relative rounded-sm border border-[#2e2720] bg-[#141210] ${className}`}
    >
      {children}
    </div>
  )
}
