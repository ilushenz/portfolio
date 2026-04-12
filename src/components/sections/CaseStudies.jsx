import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import SectionLabel from '../ui/SectionLabel'
import { caseStudies } from '../../data/content'

const auroraStyle = {
  background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function CaseStudyModal({ cs, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-ink-primary/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl shadow-neu-lg bg-neu-bg p-6 md:p-8"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full shadow-neu-sm flex items-center justify-center text-ink-muted"
        >
          ×
        </button>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
          >
            {cs.period}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full shadow-neu-sm text-ink-muted">
            {cs.location}
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl text-ink-primary mb-1">{cs.brand}</h3>
        <p className="font-body text-sm text-ink-muted mb-4">{cs.role}</p>
        <p className="font-body text-ink-muted leading-relaxed mb-6 italic">"{cs.summary}"</p>

        <div className="mb-6">
          <div className="text-xs font-semibold tracking-widest uppercase text-ink-faint mb-3">Key Achievements</div>
          <ul className="flex flex-col gap-2">
            {cs.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-sm font-body text-ink-muted">
                <span className="mt-0.5 text-base" style={auroraStyle}>✦</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full shadow-neu-sm text-ink-muted font-body"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function CaseStudies() {
  const [active, setActive] = useState(null)

  return (
    <section id="casestudies" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel text="Case Studies" />
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-primary mb-3">
            Work That Moved the Needle
          </h2>
          <p className="font-body text-ink-muted max-w-xl mb-12">
            Click any card to see the full breakdown — strategy, execution, and results.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.id} delay={i * 0.07} direction={i % 2 === 0 ? 'left' : 'right'}>
              <motion.button
                className={`w-full text-left rounded-2xl shadow-neu p-6 relative overflow-hidden group ${cs.featured ? 'sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-6' : ''}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setActive(cs)}
              >
                {/* Aurora top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-40 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)' }}
                />

                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                      style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
                    >
                      {cs.period}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full shadow-neu-sm text-ink-muted font-body">
                      {cs.location}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-ink-primary mb-0.5">{cs.brand}</h3>
                  <p className="font-body text-xs text-ink-muted mb-3">{cs.role}</p>
                  <p className="font-body text-sm text-ink-muted leading-relaxed mb-4 line-clamp-2">{cs.summary}</p>

                  <div className="flex flex-wrap gap-1">
                    {cs.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full shadow-neu-sm text-ink-muted">
                        {tag}
                      </span>
                    ))}
                    {cs.tags.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full shadow-neu-sm text-ink-muted">
                        +{cs.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {cs.featured && (
                  <div className="mt-6 sm:mt-0 flex flex-col justify-center gap-3">
                    {cs.bullets.slice(0, 3).map((b, bi) => (
                      <div key={bi} className="flex gap-2 text-xs font-body text-ink-muted">
                        <span style={auroraStyle} className="flex-shrink-0">✦</span>
                        {b}
                      </div>
                    ))}
                    <div className="text-xs font-semibold mt-1" style={auroraStyle}>
                      View full breakdown →
                    </div>
                  </div>
                )}
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <CaseStudyModal cs={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
