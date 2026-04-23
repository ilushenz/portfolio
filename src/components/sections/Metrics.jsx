import AnimatedCounter from '../ui/AnimatedCounter'
import ScrollReveal from '../ui/ScrollReveal'
import GlowGrid from '../ui/GlowGrid'
import { achievements } from '../../data/content'

export default function Metrics() {
  return (
    <section id="metrics" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Results
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            Numbers that matter
          </h2>
        </ScrollReveal>

        <GlowGrid className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.05}>
              <div
                className="glow-card rounded-2xl p-5 sm:p-10"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-stroke)',
                }}
              >
                <div
                  className="font-display font-bold tabular-nums mb-2"
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 3.6rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: 'var(--color-content)',
                  }}
                >
                  {item.prefix || ''}
                  <AnimatedCounter value={item.value} suffix={item.suffix} duration={1400} />
                </div>
                <div className="font-body font-semibold text-sm mb-1" style={{ color: 'var(--color-content)' }}>
                  {item.label}
                </div>
                <div className="font-body text-xs leading-relaxed" style={{ color: 'var(--color-faint)' }}>
                  {item.sub}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </GlowGrid>
      </div>
    </section>
  )
}
