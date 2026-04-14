import { motion } from 'framer-motion'
import { MapPin, Award } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { about } from '../../data/content'

const cities = [
  { city: 'Moscow', role: 'Where it started', year: '2000–2023' },
  { city: 'London', role: 'LSE · Global perspective', year: '2023–2024' },
  { city: 'Los Angeles', role: 'USC · West Coast chapter', year: '2024–2025' },
  { city: 'Brooklyn', role: 'Where the work happens', year: '2025–Now', current: true },
]

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            About
          </p>
          <h2 className="heading-lg mb-16" style={{ color: 'var(--color-content)' }}>
            {about.headline}
          </h2>
        </ScrollReveal>

        {/* Two-col layout */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: Photo + certifications */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              {/* Photo */}
              <div
                className="w-full aspect-[4/5] rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--shadow-neu-lg)' }}
              >
                <img
                  src="/portfolio/headshot.jpg"
                  alt="Ilia Chapchakhov"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Adobe certification */}
              <div
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{
                  background: 'var(--color-surface)',
                  boxShadow: 'var(--shadow-neu-sm)',
                }}
              >
                <Award size={18} style={{ color: '#C850C0', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div className="font-body font-semibold text-sm mb-0.5" style={{ color: 'var(--color-content)' }}>
                    Adobe Certified Professional
                  </div>
                  <div className="font-body text-xs" style={{ color: 'var(--color-muted)' }}>
                    Premiere Pro · After Effects · Photoshop
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="flex gap-2 flex-wrap">
                {about.languages.map(({ lang, level }) => (
                  <div
                    key={lang}
                    className="px-3 py-2 rounded-xl text-sm font-body"
                    style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-neu-sm)' }}
                  >
                    <span className="font-semibold" style={{ color: 'var(--color-content)' }}>{lang}</span>
                    <span className="ml-1" style={{ color: 'var(--color-muted)' }}>— {level}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Story */}
          <div className="space-y-10">
            <ScrollReveal delay={0.1}>
              <p className="font-body font-light text-xl leading-relaxed" style={{ color: 'var(--color-content)', letterSpacing: '-0.01em' }}>
                {about.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-base leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {about.bio2}
              </p>
            </ScrollReveal>

            {/* Journey */}
            <ScrollReveal delay={0.3}>
              <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
                The Journey
              </p>
              <div className="space-y-0">
                {cities.map((c, i) => (
                  <motion.div
                    key={c.city}
                    className="flex items-start gap-4 py-4 border-b"
                    style={{ borderColor: 'var(--color-stroke)' }}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <MapPin
                      size={14}
                      style={{ color: c.current ? '#4158D0' : 'var(--color-faint)', marginTop: 3, flexShrink: 0 }}
                    />
                    <div className="flex-1 flex justify-between items-start">
                      <div>
                        <div
                          className="font-body font-semibold text-sm"
                          style={{ color: c.current ? 'var(--color-content)' : 'var(--color-muted)' }}
                        >
                          {c.city}
                          {c.current && (
                            <span
                              className="ml-2 text-xs px-1.5 py-0.5 rounded-full text-white"
                              style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)', fontSize: '0.6rem' }}
                            >
                              Current
                            </span>
                          )}
                        </div>
                        <div className="font-body text-xs mt-0.5" style={{ color: 'var(--color-faint)' }}>
                          {c.role}
                        </div>
                      </div>
                      <div className="font-body text-xs" style={{ color: 'var(--color-faint)' }}>
                        {c.year}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
