import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function XPBar({ level, label, xp, rankLabel, items }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="rounded-2xl shadow-neu p-6 bg-neu-bg">
      <div className="flex justify-between items-start mb-1">
        <span className="font-body font-semibold text-ink-primary text-sm">{label}</span>
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
          style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
        >
          {rankLabel}
        </span>
      </div>
      <div className="text-xs text-ink-muted mb-3">{xp}</div>

      {/* XP bar track */}
      <div className="h-2.5 rounded-full shadow-neu-inset overflow-hidden mb-4">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)' }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="text-xs px-2.5 py-1 rounded-full shadow-neu-sm text-ink-muted font-body"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
