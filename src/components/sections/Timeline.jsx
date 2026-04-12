import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import SectionLabel from '../ui/SectionLabel'
import { timeline } from '../../data/content'

const auroraStyle = {
  background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

function QuestEntry({ entry, index }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className={`flex items-start gap-4 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.07 }}
    >
      {/* Content box */}
      <div className={`flex-1 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
        <div className="rounded-2xl shadow-neu p-5 relative">
          {/* Aurora top border */}
          <div
            className={`absolute top-0 h-0.5 rounded-t-2xl ${isEven ? 'left-0 right-0' : 'left-0 right-0'}`}
            style={{ background: entry.current ? 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)' : 'transparent', opacity: entry.current ? 1 : 0 }}
          />

          <div className="flex items-center gap-2 flex-wrap mb-1">
            {entry.current && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
              >
                Current
              </span>
            )}
            <span className="text-xs text-ink-faint font-body">{entry.period}</span>
          </div>

          <h3 className="font-display font-bold text-ink-primary mb-0.5">{entry.org}</h3>
          <p className="font-body text-sm text-ink-muted">{entry.role}</p>
          <p className="font-body text-xs text-ink-faint mt-0.5">{entry.location}</p>

          {/* Quest completed badge */}
          {!entry.current && (
            <div className="mt-2 text-xs font-semibold" style={auroraStyle}>
              ✓ Quest Completed
            </div>
          )}
        </div>
      </div>

      {/* Center dot — hidden on mobile, shown on md+ */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 w-5 relative">
        <motion.div
          className="w-4 h-4 rounded-full border-2 flex-shrink-0 z-10"
          style={{
            background: entry.current ? 'linear-gradient(135deg, #4158D0, #C850C0)' : '#E8ECF1',
            borderColor: entry.current ? '#4158D0' : '#A3B1C6',
            boxShadow: entry.current ? '0 0 12px rgba(65,88,208,0.4)' : '3px 3px 6px #A3B1C6, -3px -3px 6px #FFFFFF',
          }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.07 + 0.3 }}
        />
      </div>

      {/* Mobile left dot */}
      <div className="md:hidden flex-shrink-0 mt-4">
        <div
          className="w-3 h-3 rounded-full border-2"
          style={{
            background: entry.current ? 'linear-gradient(135deg, #4158D0, #C850C0)' : '#E8ECF1',
            borderColor: entry.current ? '#4158D0' : '#A3B1C6',
          }}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  )
}

export default function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.8', 'end 0.2'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline" className="section-pad">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <SectionLabel text="Career Journey" />
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-primary mb-3">
            The Quest Log
          </h2>
          <p className="font-body text-ink-muted mb-16">
            Every role a completed quest. Every city a new chapter.
          </p>
        </ScrollReveal>

        {/* Timeline container */}
        <div ref={containerRef} className="relative">
          {/* Animated center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neu-dark/30 -translate-x-1/2">
            <motion.div
              className="w-full rounded-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #4158D0, #C850C0, #FFCC70)',
              }}
            />
          </div>

          {/* Mobile left line */}
          <div className="md:hidden absolute left-3 top-0 bottom-0 w-px bg-neu-dark/30">
            <motion.div
              className="w-full rounded-full origin-top"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, #4158D0, #C850C0, #FFCC70)',
              }}
            />
          </div>

          <div className="flex flex-col gap-8 md:gap-12 pl-8 md:pl-0">
            {timeline.map((entry, i) => (
              <QuestEntry key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
