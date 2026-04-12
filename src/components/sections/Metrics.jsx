import SectionLabel from '../ui/SectionLabel'
import AchievementCard from '../ui/AchievementCard'
import ScrollReveal from '../ui/ScrollReveal'
import { achievements } from '../../data/content'

export default function Metrics() {
  return (
    <section id="metrics" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel text="Results" />
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-primary mb-3">
            Numbers That Speak
          </h2>
          <p className="font-body text-ink-muted max-w-xl mb-12">
            Every metric below is real, documented, and achieved through strategy — not luck.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((a, i) => (
            <AchievementCard key={a.id} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
