import ScrollReveal from '../ui/ScrollReveal'
import SectionLabel from '../ui/SectionLabel'
import { education } from '../../data/content'
import { motion } from 'framer-motion'

export default function Education() {
  return (
    <section id="education" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel text="Education" />
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-primary mb-3">
            Three Cities, Three Degrees
          </h2>
          <p className="font-body text-ink-muted max-w-xl mb-12">
            Moscow → London → Los Angeles. Each stop added a new lens on media, culture, and communication.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <ScrollReveal key={edu.id} delay={i * 0.1}>
              <motion.div
                className="rounded-2xl shadow-neu p-6 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
              >
                {/* Colored top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${edu.color}`}
                />

                {/* Institution monogram */}
                <div
                  className={`w-12 h-12 rounded-xl shadow-neu-sm mb-4 flex items-center justify-center text-white text-xs font-bold font-body bg-gradient-to-br ${edu.color}`}
                >
                  {edu.abbr}
                </div>

                <div className="text-xs font-body font-semibold text-ink-faint tracking-widest uppercase mb-1">
                  {edu.years}
                </div>
                <h3 className="font-display font-bold text-ink-primary text-lg leading-tight mb-1">
                  {edu.institution}
                </h3>
                <p className="font-body text-sm text-ink-muted mb-2">{edu.degree}</p>
                <p className="font-body text-xs text-ink-faint">{edu.location}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
