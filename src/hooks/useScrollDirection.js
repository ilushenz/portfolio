import { useState, useEffect, useRef } from 'react'

export default function useScrollDirection(threshold = 10) {
  const [state, setState] = useState({ direction: 'up', atTop: true })
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const atTop = y < 60
      const direction = y > lastY.current + threshold ? 'down'
        : y < lastY.current - threshold ? 'up'
        : state.direction

      if (direction !== state.direction || atTop !== state.atTop) {
        setState({ direction, atTop })
      }
      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [state, threshold])

  return state
}
