import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1800 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const isDecimal = String(value).includes('.')

    const step = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * value
      setDisplay(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current))
      if (progress < 1) requestAnimationFrame(step)
      else setDisplay(value)
    }

    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}
