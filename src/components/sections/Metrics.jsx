import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'
import GlowGrid from '../ui/GlowGrid'
import { achievements } from '../../data/content'

/* ── Context modal ───────────────────────────────────────── */
function MetricModal({ item, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60" style={{ backdropFilter: 'blur(8px)' }} onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl p-6 md:p-8"
        style={{
          background: 'rgba(22,22,22,0.96)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
        }}
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
          <X size={14} />
        </button>

        {/* Big number */}
        <div
          className="font-display font-bold tabular-nums mb-1"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--color-content)' }}
        >
          {item.prefix || ''}{item.value}{item.suffix}
        </div>
        <div className="font-body font-semibold text-base mb-1" style={{ color: 'var(--color-content)' }}>
          {item.label}
        </div>
        <div className="font-body text-xs mb-5" style={{ color: 'var(--accent)' }}>
          {item.sub}
        </div>

        <div style={{ height: 1, background: 'var(--color-stroke)', marginBottom: 20 }} />

        <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          {item.context}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────────────── */
export default function Metrics() {
  const [activeItem, setActiveItem] = useState(null)

  return (
    <section id="metrics" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Results
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            Numbers that matter
          </h2>
        </ScrollReveal>

        <GlowGrid>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
            {achievements.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.05} className="h-full">
                <motion.div
                  className="glow-card rounded-2xl p-5 sm:p-8 h-full flex flex-col"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-stroke)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveItem(item)}
                  whileHover={{ borderColor: 'rgba(91,156,196,0.3)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="font-display font-bold tabular-nums mb-2"
                    style={{
                      fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      color: 'var(--color-content)',
                    }}
                  >
                    {item.prefix || ''}
                    <AnimatedCounter value={item.value} suffix={item.suffix} duration={1400} />
                  </div>
                  <div className="font-body font-semibold text-sm mb-1" style={{ color: 'var(--color-content)' }}>
                    {item.label}
                  </div>
                  <div className="font-body text-xs leading-snug mt-auto pt-2" style={{ color: 'var(--color-faint)' }}>
                    {item.sub}
                  </div>
                  {/* Subtle "tap for context" hint */}
                  <div className="mt-3 text-xs font-body" style={{ color: 'rgba(91,156,196,0.5)', letterSpacing: '0.02em' }}>
                    Tap for context →
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </GlowGrid>
      </div>

      <AnimatePresence>
        {activeItem && <MetricModal item={activeItem} onClose={() => setActiveItem(null)} />}
      </AnimatePresence>
    </section>
  )
}
