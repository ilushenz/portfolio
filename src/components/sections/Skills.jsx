import { motion } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import { skills } from '../../data/content'

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Skills
          </p>
          <h2 className="heading-lg mb-3" style={{ color: 'var(--color-content)' }}>
            Tools of the trade.
          </h2>
          <p className="font-body text-base mb-16 max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Built across real campaigns, tight deadlines, and a lot of creative iteration.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--color-stroke)' }}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              className="p-7"
              style={{ background: 'var(--color-canvas)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ background: 'var(--color-surface)' }}
            >
              {/* Bar */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)' }}>
                    {skill.category}
                  </span>
                  <span className="font-body text-xs" style={{ color: 'var(--color-faint)' }}>
                    {skill.level}%
                  </span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: 'var(--color-elevated)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--accent)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: 'easeOut', delay: i * 0.06 + 0.2 }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-body px-2.5 py-1 rounded-full"
                    style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
