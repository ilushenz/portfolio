import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import GlowGrid from '../ui/GlowGrid'
import { about } from '../../data/content'

/* Adobe app names matching the credlyBadges array order */
const CERT_NAMES = ['Professional', 'Premiere Pro', 'After Effects', 'Photoshop']
const CERT_ABBR  = ['Ac',           'Pr',           'Ae',            'Ps']

function BadgeCard({ name, abbr, badgeId }) {
  return (
    <a
      href={`https://www.credly.com/badges/${badgeId}/public_url`}
      target="_blank"
      rel="noreferrer"
      className="glow-card flex flex-col items-center gap-3 text-center"
      style={{
        background: 'var(--color-elevated)',
        border: '1px solid var(--color-stroke)',
        borderRadius: 12,
        padding: '20px 12px',
        textDecoration: 'none',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(91,156,196,0.3)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-stroke)' }}
    >
      {/* Adobe product icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontFamily: 'Inter', fontSize: 11, fontWeight: 700,
        letterSpacing: '-0.02em',
        flexShrink: 0,
      }}>
        {abbr}
      </div>
      <span className="font-body" style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-content)', lineHeight: 1.3 }}>
        Adobe<br />{name}
      </span>
      <span style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: 3 }}>
        Verify <ExternalLink size={9} />
      </span>
    </a>
  )
}

export default function About() {
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

            {/* Adobe certifications — horizontal badge row */}
            <ScrollReveal delay={0.1}>
              <div
                className="rounded-2xl p-5"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-stroke)' }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Award size={16} style={{ color: 'var(--accent)' }} />
                  <span className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)' }}>
                    Adobe Certified Professional
                  </span>
                </div>
                <GlowGrid className="grid grid-cols-4 gap-3">
                  {about.credlyBadges.map((badgeId, i) => (
                    <BadgeCard
                      key={badgeId}
                      name={CERT_NAMES[i] || about.certifications[i]}
                      abbr={CERT_ABBR[i] || 'Ac'}
                      badgeId={badgeId}
                    />
                  ))}
                </GlowGrid>
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
