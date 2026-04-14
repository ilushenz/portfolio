import { useRef } from 'react'

/**
 * Wraps a grid of cards with a cursor-following radial glow.
 * Each child should have className="glow-card" (defined in index.css).
 * The glow bleeds naturally across adjacent cards.
 */
export default function GlowGrid({ children, className = '' }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.setProperty('--mouse-x', '-999px')
    ref.current.style.setProperty('--mouse-y', '-999px')
  }

  return (
    <div
      ref={ref}
      className={`glow-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
