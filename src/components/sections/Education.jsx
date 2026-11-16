import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, BookOpen, Users, Lightbulb, Presentation, Download, Briefcase } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import GlowGrid from '../ui/GlowGrid'
import { education } from '../../data/content'

/* ── Academic role block (e.g. research assistantship) ─────── */
function AcademicRole({ role }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Briefcase size={13} style={{ color: 'var(--color-faint)' }} />
        <span className="text-xs font-body font-semibold tracking-wider uppercase" style={{ color: 'var(--color-faint)' }}>
          Academic role
        </span>
      </div>
      <p className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)' }}>{role.title}</p>
      <p className="font-body text-xs mt-0.5 mb-2.5" style={{ color: 'var(--color-faint)' }}>{role.meta}</p>
      <ul className="flex flex-col gap-1.5">
        {role.points.map((pt) => (
          <li key={pt} className="font-body text-sm flex gap-2" style={{ color: 'var(--color-muted)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 8 }} />{pt}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Full vertical card (About page) ─────────────────────── */
function EducationCardFull({ item, index, context }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <ScrollReveal delay={index * 0.1}>
      <div
        className="glow-card focus-ring rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-stroke)' }}
        onClick={() => setExpanded((e) => !e)}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded((x) => !x) } }}
      >
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-5">
            {/* Logo */}
            <div
              className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-1"
              style={{ background: 'var(--color-elevated)' }}
            >
{item.logo ? (
                <img
                  src={item.logo}
                  alt={item.school}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              ) : (
                <span className="font-display font-bold" style={{ fontSize: 15, letterSpacing: '-0.02em', color: 'var(--accent)' }}>
                  {item.monogram}
                </span>
              )}
            </div>

            {/* Header info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-xl leading-tight" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
                    {item.institution}
                  </h3>
                  <p className="font-body text-sm mt-0.5" style={{ color: 'var(--color-muted)' }}>{item.degree}</p>
                  <p className="font-body text-xs mt-1" style={{ color: 'var(--color-faint)' }}>
                    {item.years} · {item.location}
                  </p>
                </div>
                <div style={{ color: 'var(--color-faint)', flexShrink: 0 }}>
                  {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Highlights pills (always visible) */}
              {item.highlights && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.highlights.map((h) => (
                    <span key={h} className="text-xs font-body px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expandable: courses + activities */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="detail"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div className={`px-6 md:px-8 pb-6 grid gap-6 ${item.photo ? 'md:grid-cols-[3fr_2fr]' : 'md:grid-cols-2'}`}
                style={{ borderTop: '1px solid var(--color-stroke)', paddingTop: 20 }}>
                {/* PhD: research interests (both pages), teaching (About page only) */}
                {item.research && (
                  <div className={context === 'about' && item.teaching ? '' : 'md:col-span-2'}>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb size={13} style={{ color: 'var(--color-faint)' }} />
                      <span className="text-xs font-body font-semibold tracking-wider uppercase" style={{ color: 'var(--color-faint)' }}>
                        Research interests
                      </span>
                    </div>
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.research}</p>
                    {item.researchTags && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.researchTags.map((t) => (
                          <span key={t} className="text-xs font-body px-2.5 py-1 rounded-full"
                            style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {context === 'about' && item.teaching && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Presentation size={13} style={{ color: 'var(--color-faint)' }} />
                      <span className="text-xs font-body font-semibold tracking-wider uppercase" style={{ color: 'var(--color-faint)' }}>
                        Teaching
                      </span>
                    </div>
                    <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{item.teaching}</p>
                    {item.syllabus && (
                      <a
                        href={item.syllabus}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="focus-ring inline-flex items-center gap-2 mt-4 font-body font-semibold text-sm px-4 py-2 rounded-full text-white"
                        style={{ background: 'var(--accent)' }}
                      >
                        <Download size={14} />
                        Download syllabus
                      </a>
                    )}
                  </div>
                )}

                {/* Courses, with any academic roles right underneath */}
                {item.courses && (
                  <div className="flex flex-col gap-7">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={13} style={{ color: 'var(--color-faint)' }} />
                      <span className="text-xs font-body font-semibold tracking-wider uppercase" style={{ color: 'var(--color-faint)' }}>
                        Courses
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {item.courses.map((c) => (
                        <li key={c} className="font-body text-sm flex gap-2" style={{ color: 'var(--color-muted)' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 8 }} />{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {item.roles?.map((r) => <AcademicRole key={r.title} role={r} />)}
                  </div>
                )}

                {/* Activities or photo */}
                {item.photo ? (
                  <div className="rounded-xl overflow-hidden md:self-start" style={{ aspectRatio: '4/3' }}>
                    <img
                      src={item.photo}
                      alt={item.institution}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : item.activities ? (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users size={13} style={{ color: 'var(--color-faint)' }} />
                      <span className="text-xs font-body font-semibold tracking-wider uppercase" style={{ color: 'var(--color-faint)' }}>
                        Activities
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {item.activities.map((a) => (
                        <li key={a} className="font-body text-sm flex gap-2" style={{ color: 'var(--color-muted)' }}>
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 8, opacity: 0.7 }} />{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  )
}

/* ── Compact card (front page: bachelor's and master's, not clickable) ── */
function EducationCompactCard({ item }) {
  return (
    <div
      className="glow-card h-full"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-stroke)',
        borderRadius: 16,
        padding: '32px',
      }}
    >
      <div
        className="flex items-center justify-center p-2 mb-5"
        style={{ width: 52, height: 52, borderRadius: 12, background: 'var(--color-elevated)' }}
      >
        <img
          src={item.logo}
          alt={item.school}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
      </div>
      <h3 className="font-display font-bold" style={{ fontSize: '1.05rem', letterSpacing: '-0.02em', color: 'var(--color-content)', marginBottom: 6 }}>
        {item.institution}
      </h3>
      <p className="font-body" style={{ fontSize: 13, color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: 8 }}>
        {item.degree}
      </p>
      <p className="font-body" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 500 }}>
        {item.years} · {item.location}
      </p>
    </div>
  )
}

/* ── Section: About page lists every degree as an expandable card;
      the front page shows the PhD card (expandable) above a row of the other three ── */
export default function Education({ context = 'about' }) {
  const isFront = context === 'front'
  const phd = education.filter((e) => e.research)
  const others = education.filter((e) => !e.research)

  return (
    <section id={isFront ? 'academic' : 'education'} className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Education
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            Academic background
          </h2>
        </ScrollReveal>

        {isFront ? (
          <GlowGrid className="flex flex-col gap-4">
            {phd.map((item) => (
              <EducationCardFull key={item.id} item={item} index={0} context={context} />
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {others.map((item, i) => (
                <ScrollReveal key={item.id} delay={i * 0.08}>
                  <EducationCompactCard item={item} />
                </ScrollReveal>
              ))}
            </div>
          </GlowGrid>
        ) : (
          <GlowGrid className="flex flex-col gap-4">
            {education.map((item, i) => (
              <EducationCardFull key={item.id} item={item} index={i} context={context} />
            ))}
          </GlowGrid>
        )}
      </div>
    </section>
  )
}
