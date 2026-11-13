import { useState } from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { achievements } from '../../data/content'

const achievementById = Object.fromEntries(achievements.map(a => [a.id, a]))

const formatMetric = (m) => `${m.prefix || ''}${m.value}${m.suffix || ''}`

/* Card body, styled like the former "Tools of the trade" tiles */
function SkillCard({ skill }) {
  const metrics = [
    ...(skill.metrics || []).map(id => {
      const m = achievementById[id]
      return { display: formatMetric(m), label: m.label }
    }),
    ...(skill.stats || []),
  ]

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        width: 300,
        background: 'var(--color-canvas)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 18px 50px rgba(0,0,0,0.55)',
      }}
    >
      <p className="font-body font-semibold text-sm mb-4" style={{ color: 'var(--color-content)' }}>
        {skill.title}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {skill.items.map(item => (
          <span
            key={item}
            className="text-xs font-body px-2.5 py-1 rounded-full"
            style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}
          >
            {item}
          </span>
        ))}
      </div>

      {metrics.length > 0 && (
        <>
          <div style={{ height: 1, background: 'var(--color-stroke)', margin: '18px 0 14px' }} />
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${metrics.length}, 1fr)` }}>
            {metrics.map(m => (
              <div key={m.label}>
                <div
                  className="font-display font-bold tabular-nums"
                  style={{ fontSize: '1.7rem', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--color-content)' }}
                >
                  {m.display}
                </div>
                <div className="font-body text-xs mt-1.5 leading-snug" style={{ color: 'var(--color-faint)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <p className="font-body mt-3" style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.02em' }}>
            Results at Envy Smile Dental Spa
          </p>
        </>
      )}

      {skill.note && (
        <p className="font-body text-xs mt-4" style={{ color: 'var(--color-faint)' }}>{skill.note}</p>
      )}
    </div>
  )
}

/*
 * Behaviour adapted from the Aceternity "Link Preview" reference (Appendix A):
 * same Radix hover card, open/close delays, spring and cursor follow.
 * Additions: tap toggle for touch screens, portal (the hero clips overflow).
 */
export default function StatHoverCard({ skill, children }) {
  const [isOpen, setOpen] = useState(false)

  const springConfig = { stiffness: 100, damping: 15 }
  const x = useMotionValue(0)
  const translateX = useSpring(x, springConfig)

  const handleMouseMove = (event) => {
    const targetRect = event.currentTarget.getBoundingClientRect()
    const eventOffsetX = event.clientX - targetRect.left
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2 // Reduce the effect to make it subtle
    x.set(offsetFromCenter)
  }

  return (
    <HoverCardPrimitive.Root
      open={isOpen}
      openDelay={50}
      closeDelay={100}
      onOpenChange={(open) => { setOpen(open) }}
    >
      <HoverCardPrimitive.Trigger asChild>
        <button
          type="button"
          onMouseMove={handleMouseMove}
          onPointerUp={(e) => { if (e.pointerType !== 'mouse') setOpen(o => !o) }}
          onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false) }}
          className="bio-keyword"
          aria-expanded={isOpen}
        >
          {children}
        </button>
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
          collisionPadding={12}
          style={{ zIndex: 60 }}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="shadow-xl rounded-2xl"
                style={{
                  x: translateX,
                }}
              >
                <SkillCard skill={skill} />
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}
