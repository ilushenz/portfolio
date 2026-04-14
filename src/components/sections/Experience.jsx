import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { timeline } from '../../data/content'

/* ── Expandable card ─────────────────────────────────────── */
function ExperienceCard({ item, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      className="flex-shrink-0 w-80 md:w-96 relative"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      {/* Timeline dot */}
      <div className="absolute -top-[21px] left-6 w-3 h-3 rounded-full z-10 flex items-center justify-center"
        style={{
          background: item.current
            ? 'linear-gradient(135deg, #4158D0, #C850C0)'
            : 'var(--color-elevated)',
          border: '2px solid var(--color-stroke)',
          boxShadow: item.current ? '0 0 12px rgba(65,88,208,0.6)' : 'none',
        }}
      />

      {/* Card body */}
      <div
        className="rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-stroke)',
        }}
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex-1 min-w-0">
              {item.current && (
                <span
                  className="inline-block text-xs font-bold font-body px-2 py-0.5 rounded-full text-white mb-2"
                  style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
                >
                  Current
                </span>
              )}
              <h3 className="font-display font-bold text-lg leading-tight" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
                {item.org}
              </h3>
              <p className="font-body text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{item.role}</p>
            </div>
            <div style={{ color: 'var(--color-faint)', flexShrink: 0 }}>
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-body" style={{ color: 'var(--color-faint)' }}>
            <span className="flex items-center gap-1"><Calendar size={11} />{item.period}</span>
            <span className="flex items-center gap-1"><MapPin size={11} />{item.location}</span>
          </div>
        </div>

        {/* Expandable highlights */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="highlights"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-6 pb-6 pt-0" style={{ borderTop: '1px solid var(--color-stroke)' }}>
                <ul className="mt-4 flex flex-col gap-2">
                  {item.highlights?.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm font-body leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)', minWidth: 4, minHeight: 4 }} />
                      {h}
                    </li>
                  ))}
                </ul>
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs font-body px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--color-elevated)', color: 'var(--color-faint)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const pinned     = useRef(false)
  const scrollStart = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return

    const onWheel = (e) => {
      const rect = section.getBoundingClientRect()
      const inView = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.5
      if (!inView) return

      const maxScroll = track.scrollWidth - track.clientWidth
      const atStart   = track.scrollLeft <= 0
      const atEnd     = track.scrollLeft >= maxScroll - 2

      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atStart)) {
        e.preventDefault()
        track.scrollLeft += e.deltaY * 1.2
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section-pad">
      <div className="max-w-6xl mx-auto mb-10">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Experience
          </p>
          <h2 className="heading-lg" style={{ color: 'var(--color-content)' }}>
            Career journey.
          </h2>
        </ScrollReveal>
        <p className="font-body text-sm mt-2" style={{ color: 'var(--color-faint)' }}>
          Scroll horizontally or use your mouse wheel to browse — click any card to expand.
        </p>
      </div>

      {/* Horizontal track */}
      <div className="relative">
        {/* Shimmer timeline line */}
        <div className="mx-6 md:mx-12 lg:mx-20 mb-0">
          <div className="h-px w-full shimmer-line opacity-60" />
        </div>

        {/* Scrollable cards */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto px-6 md:px-12 lg:px-20 pt-8 pb-6 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {timeline.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} />
          ))}
          {/* End padding */}
          <div className="flex-shrink-0 w-6" />
        </div>

        {/* Right fade */}
        <div
          className="absolute top-0 right-0 bottom-0 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-canvas), transparent)' }}
        />
      </div>
    </section>
  )
}
