import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { X, MapPin, Calendar, ExternalLink } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { caseStudies, timeline } from '../../data/content'

// Merge timeline + case studies data into unified experience entries
const experiences = timeline.map((entry) => {
  const cs = caseStudies.find((c) => c.id === entry.id || c.brand.toLowerCase().includes(entry.org.split(' ')[0].toLowerCase()))
  return { ...entry, caseStudy: cs || null }
})

function CaseStudyPanel({ exp, onClose }) {
  const cs = exp.caseStudy
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl p-7 max-h-[85vh] overflow-y-auto"
        style={{
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow-neu-lg)',
          border: '1px solid var(--color-stroke)',
        }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ color: 'var(--color-muted)', background: 'var(--color-elevated)' }}
          aria-label="Close"
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <span
            className="text-xs font-semibold font-body px-2.5 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
          >
            {exp.period}
          </span>
          {exp.current && (
            <span className="text-xs font-semibold font-body px-2.5 py-1 rounded-full"
              style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
              Current
            </span>
          )}
        </div>

        <h3 className="font-display font-bold text-2xl mt-3 mb-0.5" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
          {exp.org}
        </h3>
        <p className="font-body text-sm mb-1" style={{ color: 'var(--color-muted)' }}>{exp.role}</p>
        <div className="flex items-center gap-1 mb-5" style={{ color: 'var(--color-faint)' }}>
          <MapPin size={11} />
          <span className="font-body text-xs">{exp.location}</span>
        </div>

        {cs ? (
          <>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
              {cs.summary}
            </p>
            <div className="mb-5">
              <p className="text-xs font-body font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--color-faint)' }}>
                Key Highlights
              </p>
              <ul className="space-y-2.5">
                {cs.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2.5 font-body text-sm" style={{ color: 'var(--color-muted)' }}>
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)', minWidth: 4, minHeight: 4 }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cs.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-body px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        ) : (
          <p className="font-body text-sm" style={{ color: 'var(--color-muted)' }}>
            {exp.role} at {exp.org}. {exp.location} · {exp.period}
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  const [active, setActive] = useState(null)
  const trackRef = useRef(null)

  return (
    <section id="experience" className="section-pad overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Career
          </p>
          <h2 className="heading-lg mb-3" style={{ color: 'var(--color-content)' }}>
            Experience
          </h2>
          <p className="font-body text-base mb-12" style={{ color: 'var(--color-muted)' }}>
            Scroll right or drag to explore — click any role to see highlights.
          </p>
        </ScrollReveal>

        {/* Horizontal scrollable track */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--color-canvas), transparent)' }} />

          <motion.div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            drag="x"
            dragConstraints={trackRef}
            whileTap={{ cursor: 'grabbing' }}
          >
            {/* Timeline line */}
            <div className="absolute top-[52px] left-0 right-0 h-px" style={{ background: 'var(--color-stroke)', zIndex: 0 }} />

            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="flex-shrink-0 w-64 relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                {/* Timeline dot */}
                <div className="flex items-center mb-5">
                  <div
                    className="w-3 h-3 rounded-full border-2 flex-shrink-0"
                    style={{
                      background: exp.current ? '#4158D0' : 'var(--color-canvas)',
                      borderColor: exp.current ? '#4158D0' : 'var(--color-stroke)',
                      boxShadow: exp.current ? '0 0 10px rgba(65,88,208,0.4)' : 'none',
                    }}
                  />
                  <div className="ml-3 text-xs font-body" style={{ color: 'var(--color-faint)' }}>
                    {exp.period}
                  </div>
                </div>

                {/* Card */}
                <motion.button
                  className="w-full text-left rounded-2xl p-5"
                  style={{
                    background: 'var(--color-surface)',
                    boxShadow: 'var(--shadow-neu-sm)',
                    border: '1px solid var(--color-stroke)',
                  }}
                  whileHover={{ y: -3, boxShadow: 'var(--shadow-neu)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActive(exp)}
                >
                  {exp.current && (
                    <div
                      className="h-0.5 rounded-full mb-3"
                      style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)' }}
                    />
                  )}
                  <div className="font-display font-bold text-base mb-1" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
                    {exp.org}
                  </div>
                  <div className="font-body text-xs mb-2" style={{ color: 'var(--color-muted)' }}>
                    {exp.role}
                  </div>
                  <div className="flex items-center gap-1" style={{ color: 'var(--color-faint)' }}>
                    <MapPin size={10} />
                    <span className="font-body text-xs">{exp.location}</span>
                  </div>

                  {exp.caseStudy && (
                    <div
                      className="mt-3 pt-3 border-t text-xs font-body font-medium flex items-center gap-1"
                      style={{ borderColor: 'var(--color-stroke)', color: '#4158D0' }}
                    >
                      View highlights <ExternalLink size={10} />
                    </div>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {active && <CaseStudyPanel exp={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
