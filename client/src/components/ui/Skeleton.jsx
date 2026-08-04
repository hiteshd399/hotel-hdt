/**
 * Skeleton placeholder used while content loads.
 */
export default function Skeleton({ className = '', count = 1 }) {
  const items = Array.from({ length: count })
  return (
    <>
      {items.map((_, i) => (
        <div key={i} className={`skeleton ${className}`} />
      ))}
    </>
  )
}
