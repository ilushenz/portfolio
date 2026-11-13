import { useState } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'
import { achievements } from '../../data/content'

/* One metric: number counts up when shown; context pops up on hover / tap / focus,
   styled like the "Click to learn more" hint on the work cards. */
function MetricItem({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <HoverCardPrimitive.Root open={open} onOpenChange={setOpen} openDelay={80} closeDelay={100}>
      <HoverCardPrimitive.Trigger asChild>
        <button
          type="button"
          className="focus-ring text-left rounded-xl px-3 py-2.5 h-full flex flex-col"
          style={{
            background: 'var(--color-surface)',
            border: `1px solid ${open ? 'rgba(91,156,196,0.3)' : 'var(--color-stroke)'}`,
            transition: 'border-color 0.2s',
            cursor: 'help',
          }}
          aria-expanded={open}
          onPointerUp={(e) => { if (e.pointerType !== 'mouse') setOpen(o => !o) }}
          onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false) } }}
        >
          <span
            className="font-display font-bold tabular-nums mb-1 block"
            style={{ fontSize: '1.3rem', letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--color-content)' }}
          >
            <AnimatedCounter value={item.value} prefix={item.prefix || ''} suffix={item.suffix} duration={1400} />
          </span>
          <span className="font-body font-semibold block" style={{ fontSize: 11.5, lineHeight: 1.3, color: 'var(--color-content)' }}>
            {item.label}
          </span>
          <span className="font-body leading-snug mt-auto pt-1 block" style={{ fontSize: 10.5, color: 'var(--color-faint)' }}>
            {item.sub}
          </span>
        </button>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content side="top" align="center" sideOffset={8} collisionPadding={12} style={{ zIndex: 130 }}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="font-body"
                style={{
                  maxWidth: 320,
                  fontSize: 12.5,
                  lineHeight: 1.55,
                  color: 'var(--color-content)',
                  padding: '12px 16px',
                  borderRadius: 16,
                  background: 'rgba(10,10,10,0.85)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                {item.context}
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}

/* Results block shown inside the Envy Smile pop-up, above "Key highlights" */
export default function Metrics() {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <p className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)' }}>
          Results
        </p>
        <p className="font-body text-xs" style={{ color: 'rgba(91,156,196,0.6)' }}>
          Hover or tap a number for context
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 items-stretch">
        {achievements.map(item => <MetricItem key={item.id} item={item} />)}
      </div>
    </div>
  )
}
