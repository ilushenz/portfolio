import { motion } from 'framer-motion'
import { Play, Award, ExternalLink } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import GlowGrid from '../ui/GlowGrid'
import { about } from '../../data/content'

/* ── Certification metadata ───────────────────────────────── */
// abbr: null → show video icon instead (Video Design cert)
// Order matches about.credlyBadges array (verified via live Credly URLs):
// [0] 1e0cfb4f → Premiere Pro  [1] 6ce888d5 → Video Design
// [2] dd413cfd → Photoshop     [3] 32cf9f27 → After Effects
const CERTS = [
  { name: 'Premiere Pro',  abbr: 'Pr',  },
  { name: 'Video Design',  abbr: null,  },
  { name: 'Photoshop',     abbr: 'Ps',  },
  { name: 'After Effects', abbr: 'Ae',  },
]

/* ── Badge card — styled like Adobe's product tiles ──────── */
function BadgeCard({ name, abbr, badgeId }) {
  return (
    <a
      href={`https://www.credly.com/badges/${badgeId}/public_url`}
      target="_blank"
      rel="noreferrer"
      className="glow-card flex flex-col"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-stroke)',
        borderRadius: 16,
        padding: '28px 24px',
        textDecoration: 'none',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(91,156,196,0.3)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-stroke)' }}
    >
      {/* Adobe-style product icon tile */}
      <div
        style={{
          width: 52, height: 52,
          borderRadius: 10,
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          flexShrink: 0,
        }}
      >
        {abbr === null ? (
          <Play size={20} color="#fff" strokeWidth={2.5} />
        ) : (
          <span style={{
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 15,
            letterSpacing: '-0.04em',
            color: '#fff',
            lineHeight: 1,
          }}>
            {abbr}
          </span>
        )}
      </div>

      <p className="font-body" style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-faint)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
        Adobe
      </p>
      <p className="font-display font-bold" style={{ fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--color-content)', marginBottom: 12, lineHeight: 1.2 }}>
        {name}
      </p>
      <span style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: 3, marginTop: 'auto' }}>
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

        {/* Two-column: photo left, bio right */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start mb-12">

          {/* Left: photo — polaroid toss animation */}
          <motion.div
            initial={{ y: 80, opacity: 0, rotate: -7 }}
            animate={{ y: 0,  opacity: 1, rotate: -2.5 }}
            transition={{
              type: 'spring',
              stiffness: 65,
              damping: 13,
              mass: 1.1,
              delay: 0.15,
            }}
            style={{ transformOrigin: '50% 90%' }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.55), 0 4px 16px rgba(0,0,0,0.4)' }}
            >
              <img
                src="/photos/photo2.webp"
                alt="Ilia Chapchakhov"
                className="w-full h-auto block"
                fetchpriority="high"
              />
            </div>
          </motion.div>

          {/* Right: bio + photo strip + languages */}
          <div>
            <ScrollReveal delay={0.1}>
              <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'var(--color-muted)' }}>
                {about.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
                {about.bio2}
              </p>
            </ScrollReveal>

            {/* Photo strip */}
            <ScrollReveal delay={0.25}>
              <div className="grid grid-cols-3 gap-2 mb-10">
                {[
                  '/photos/photo1.webp',
                  '/photos/photo3.webp',
                  '/photos/photo5.webp',
                ].map((src, i) => (
                  <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
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

        {/* Full-width Adobe certifications block */}
        <ScrollReveal delay={0.15}>
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-stroke)' }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Award size={16} style={{ color: 'var(--accent)' }} />
              <span className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)' }}>
                Adobe Certified Professional
              </span>
            </div>
            <GlowGrid className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {about.credlyBadges.map((badgeId, i) => (
                <BadgeCard
                  key={badgeId}
                  name={CERTS[i]?.name || 'Certified'}
                  abbr={CERTS[i]?.abbr ?? null}
                  badgeId={badgeId}
                />
              ))}
            </GlowGrid>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
