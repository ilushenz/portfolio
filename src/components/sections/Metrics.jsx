import { motion } from 'framer-motion'
import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'
import GlowGrid from '../ui/GlowGrid'
import { achievements } from '../../data/content'

const aurora = {
  background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function Metrics() {
  return (
    <section id="metrics" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Results
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            Numbers that matter.
          </h2>
        </ScrollReveal>

        <GlowGrid className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--color-stroke)' }}>
          {achievements.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <motion.div
                className="glow-card p-6 md:p-8"
                style={{ background: 'var(--color-canvas)' }}
                whileHover={{ background: 'var(--color-surface)' }}
                transition={{ duration: 0 }}
              >
                <div className="font-display font-bold text-3xl md:text-4xl mb-2 tabular-nums" style={aurora}>
                  {item.prefix || ''}
                  <AnimatedCounter value={item.value} suffix={item.suffix} duration={1400} />
                </div>
                <div className="font-body font-semibold text-sm mb-1" style={{ color: 'var(--color-content)' }}>
                  {item.label}
                </div>
                <div className="font-body text-xs leading-relaxed" style={{ color: 'var(--color-faint)' }}>
                  {item.sub}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </GlowGrid>
      </div>
    </section>
  )
}
