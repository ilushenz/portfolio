import ScrollReveal from '../ui/ScrollReveal'
import SectionLabel from '../ui/SectionLabel'
import XPBar from '../ui/XPBar'
import { skills } from '../../data/content'

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionLabel text="Skills" />
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-primary mb-3">
            Character Stats
          </h2>
          <p className="font-body text-ink-muted max-w-xl mb-12">
            Leveled up through real campaigns, tight deadlines, and a lot of creative iteration.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.category} delay={i * 0.07}>
              <XPBar
                level={skill.level}
                label={skill.category}
                xp={skill.xp}
                rankLabel={skill.rankLabel}
                items={skill.items}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
