import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { education } from '../../data/content'

export default function Education() {
  return (
    <section id="education" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Education
          </p>
          <h2 className="heading-lg mb-3" style={{ color: 'var(--color-content)' }}>
            Three cities, three degrees.
          </h2>
          <p className="font-body text-base mb-16 max-w-xl" style={{ color: 'var(--color-muted)' }}>
            Moscow → London → Los Angeles. Each stop added a new lens on media, culture, and communication.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-px" style={{ background: 'var(--color-stroke)' }}>
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              className="p-7"
              style={{ background: 'var(--color-canvas)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ background: 'var(--color-surface)' }}
            >
              {/* Colour-coded institution badge */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold font-body mb-5 bg-gradient-to-br ${edu.color}`}
              >
                {edu.abbr}
              </div>

              <div className="text-xs font-body font-medium mb-1" style={{ color: 'var(--color-faint)' }}>
                {edu.years} · {edu.location}
              </div>
              <div className="font-display font-bold text-lg mb-1 leading-tight" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
                {edu.institution}
              </div>
              <div className="font-body text-sm" style={{ color: 'var(--color-muted)' }}>
                {edu.degree}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
