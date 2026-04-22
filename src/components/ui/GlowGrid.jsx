import { useRef } from 'react'

/**
 * Wraps a grid of cards with a cursor-following radial glow that bleeds
 * naturally between adjacent cards. Each child needs className="glow-card".
 *
 * How it works: per-card cursor coordinates are computed by subtracting
 * each card's own bounding rect from the clientX/Y. This means the glow
 * is always centered on the real cursor position in screen space — cards
 * near the cursor show a strong glow, distant cards show none (gradient
 * center is off-screen). Adjacent cards bleed naturally via the 400px radius.
 */
export default function GlowGrid({ children, className = '', style }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    ref.current.querySelectorAll('.glow-card').forEach(card => {
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
      card.style.setProperty('--glow', '1')
    })
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.querySelectorAll('.glow-card').forEach(c => c.style.setProperty('--glow', '0'))
  }

  return (
    <div
      ref={ref}
      className={`glow-container ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
