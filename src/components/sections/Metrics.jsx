import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'
import { achievements } from '../../data/content'

export default function Metrics() {
  return (
    <section id="metrics" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Results
          </p>
          <h2 className="heading-lg mb-3" style={{ color: 'var(--color-content)' }}>
            Numbers don't lie.
          </h2>
          <p className="font-body text-base mb-16 max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Every figure below is documented, verifiable, and achieved through strategy — not coincidence.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--color-stroke)' }}>
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              className="p-8 transition-colors duration-200"
              style={{ background: 'var(--color-canvas)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ backgroundColor: 'var(--color-surface)' }}
            >
              <div
                className="text-4xl md:text-5xl font-display font-bold tabular-nums mb-2 leading-none"
                style={{
                  background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.03em',
                }}
              >
                <AnimatedCounter value={a.value} prefix={a.prefix || ''} suffix={a.suffix} duration={1600} />
              </div>
              <div className="font-body font-semibold text-sm mb-1" style={{ color: 'var(--color-content)' }}>
                {a.label}
              </div>
              <div className="font-body text-xs" style={{ color: 'var(--color-faint)' }}>
                {a.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
