import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, BookOpen, Users } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import GlowGrid from '../ui/GlowGrid'
import { education } from '../../data/content'

/* ── Full vertical card (About page) ─────────────────────── */
function EducationCardFull({ item, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="glow-card rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-stroke)' }}
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-5">
            {/* Logo */}
            <div
              className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-1"
              style={{ background: 'var(--color-elevated)' }}
            >
              <img
                src={item.logo}
                alt={item.school}
                className="w-full h-full object-contain"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>

            {/* Header info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-xl leading-tight" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
                    {item.institution}
                  </h3>
                  <p className="font-body text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{item.degree}</p>
                  <p className="font-body text-xs mt-1" style={{ color: 'var(--color-faint)' }}>
                    {item.years} · {item.location}
                  </p>
                </div>
                <div style={{ color: 'var(--color-faint)', flexShrink: 0 }}>
                  {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Highlights pills (always visible) */}
              {item.highlights && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.highlights.map((h) => (
                    <span key={h} className="text-xs font-body px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expandable: courses + activities */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 md:px-8 pb-6 grid md:grid-cols-2 gap-6"
                style={{ borderTop: '1px solid var(--color-stroke)', paddingTop: 20 }}>
                {/* Courses */}
                {item.courses && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={13} style={{ color: 'var(--color-faint)' }} />
                      <span className="text-xs font-body font-semibold tracking-wider uppercase" style={{ color: 'var(--color-faint)' }}>
                        Courses
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {item.courses.map((c) => (
                        <li key={c} className="font-body text-sm flex gap-2" style={{ color: 'var(--color-muted)' }}>
                          <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Activities or photo */}
                {item.photo ? (
                  <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={item.photo}
                      alt={item.institution}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : item.activities ? (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={13} style={{ color: 'var(--color-faint)' }} />
                      <span className="text-xs font-body font-semibold tracking-wider uppercase" style={{ color: 'var(--color-faint)' }}>
                        Activities
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {item.activities.map((a) => (
                        <li key={a} className="font-body text-sm flex gap-2" style={{ color: 'var(--color-muted)' }}>
                          <span style={{ color: 'var(--accent)', flexShrink: 0, opacity: 0.7 }}>—</span> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

/* ── Compact strip (Professional page) — styled like WorkCards ── */
export function EducationCompact() {
  return (
    <section id="education-compact" className="section-pad pt-0">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Education
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            Academic background
          </h2>
        </ScrollReveal>
        <GlowGrid className="grid grid-cols-3 gap-4">
          {education.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.08}>
              <div
                className="glow-card"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-stroke)',
                  borderRadius: 16,
                  padding: '32px',
                }}
              >
                {/* University logo */}
                <div
                  className="flex items-center justify-center p-2 mb-5"
                  style={{
                    width: 52, height: 52,
                    borderRadius: 12,
                    background: 'var(--color-elevated)',
                  }}
                >
                  <img
                    src={item.logo}
                    alt={item.school}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                </div>

                <h3 className="font-display font-bold" style={{ fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--color-content)', marginBottom: 6 }}>
                  {item.institution}
                </h3>
                <p className="font-body" style={{ fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: 8 }}>
                  {item.degree}
                </p>
                <p className="font-body" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>
                  {item.years} · {item.location}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </GlowGrid>
      </div>
    </section>
  )
}

/* ── Full section (About page) ───────────────────────────── */
export default function Education() {
  return (
    <section id="education" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Education
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            Academic background
          </h2>
        </ScrollReveal>

        <GlowGrid className="flex flex-col gap-4">
          {education.map((item, i) => (
            <EducationCardFull key={item.id} item={item} index={i} />
          ))}
        </GlowGrid>
      </div>
    </section>
  )
}
