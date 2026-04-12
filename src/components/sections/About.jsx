import ScrollReveal from '../ui/ScrollReveal'
import SectionLabel from '../ui/SectionLabel'
import { about, hero } from '../../data/content'

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: photo card */}
        <ScrollReveal direction="left">
          <div className="relative max-w-sm mx-auto md:mx-0">
            <div className="rounded-3xl shadow-neu-lg p-2">
              <div className="rounded-2xl overflow-hidden shadow-neu-inset aspect-[4/5]">
                <img
                  src="/portfolio/headshot.jpg"
                  alt="Ilia Chapchakhov"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            {/* Floating cert badge */}
            <div className="absolute -bottom-5 -right-5 rounded-2xl shadow-neu p-3 text-xs font-body">
              <div className="font-semibold text-ink-primary mb-0.5">Adobe Certified</div>
              <div className="text-ink-muted">Premiere · AE · PS</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: text */}
        <div>
          <ScrollReveal delay={0.1}>
            <SectionLabel text="About Me" />
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-primary mb-6">
              {about.headline}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-body text-ink-muted leading-relaxed mb-4">{about.bio}</p>
            <p className="font-body text-ink-muted leading-relaxed mb-8">{about.bio2}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            {/* Languages */}
            <div className="mb-6">
              <div className="text-xs font-semibold font-body tracking-widest uppercase text-ink-faint mb-3">
                Languages
              </div>
              <div className="flex gap-3 flex-wrap">
                {about.languages.map(({ lang, level }) => (
                  <div key={lang} className="rounded-xl shadow-neu-sm px-4 py-2 text-sm font-body">
                    <span className="font-semibold text-ink-primary">{lang}</span>
                    <span className="text-ink-muted ml-1">— {level}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {about.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold font-body text-white"
                  style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
