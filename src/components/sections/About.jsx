import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { about } from '../../data/content'

const BADGE_HOST = 'https://www.credly.com'

export default function About() {
  // Load Credly embed script once
  useEffect(() => {
    if (document.querySelector('script[src*="credly.com"]')) return
    const script = document.createElement('script')
    script.src = '//cdn.credly.com/assets/utilities/embed.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <section id="about" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            About
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            {about.headline}
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: photo + certifications */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden aspect-[4/5]" style={{ boxShadow: 'var(--shadow-neu-lg)' }}>
                <img
                  src="/portfolio/headshot.jpg"
                  alt="Ilia Chapchakhov"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>

            {/* Adobe certifications */}
            <ScrollReveal delay={0.1}>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-stroke)' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award size={16} style={{ color: '#C850C0' }} />
                  <span className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)' }}>
                    Adobe Certified Professional
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 justify-start">
                  {about.credlyBadges.map((badgeId) => (
                    <div
                      key={badgeId}
                      data-iframe-width="120"
                      data-iframe-height="220"
                      data-share-badge-id={badgeId}
                      data-share-badge-host={BADGE_HOST}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: bio + languages */}
          <div>
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'var(--color-muted)' }}>
                {about.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-base leading-relaxed mb-10" style={{ color: 'var(--color-muted)' }}>
                {about.bio2}
              </p>
            </ScrollReveal>

            {/* Languages */}
            <ScrollReveal delay={0.3}>
              <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
                Languages
              </p>
              <div className="flex flex-col gap-px" style={{ background: 'var(--color-stroke)' }}>
                {about.languages.map(({ lang, level }) => (
                  <div
                    key={lang}
                    className="flex justify-between items-center px-4 py-3"
                    style={{ background: 'var(--color-canvas)' }}
                  >
                    <span className="font-body font-medium text-sm" style={{ color: 'var(--color-content)' }}>
                      {lang}
                    </span>
                    <span className="font-body text-xs" style={{ color: 'var(--color-faint)' }}>
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
