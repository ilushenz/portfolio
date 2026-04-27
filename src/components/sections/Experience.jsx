import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, ArrowRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { timeline, portfolioCategories } from '../../data/content'

/* ── Helpers ────────────────────────────────────────────── */
// Flatten all portfolio items into a lookup map by id
const allPortfolioItems = Object.fromEntries(
  portfolioCategories.flatMap(c => c.items).map(item => [item.id, item])
)

function getItemThumbnail(item) {
  if (!item) return null
  if (item.images?.length) return item.images[0]
  return null
}

const ITEM_GRADIENT = {
  'invisalign-reel':    'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4))',
  'envy-carousels':     'linear-gradient(135deg, rgba(56,189,248,0.4), rgba(99,102,241,0.4))',
  'envy-design-series': 'linear-gradient(135deg, rgba(56,189,248,0.3), rgba(245,158,11,0.3))',
  'groundhog-email':    'linear-gradient(135deg, rgba(251,191,36,0.4), rgba(245,158,11,0.4))',
  'valentine-series':   'linear-gradient(135deg, rgba(251,113,133,0.4), rgba(200,40,80,0.4))',
  'usc-carousel':       'linear-gradient(135deg, rgba(255,100,60,0.4), rgba(220,50,50,0.4))',
  'slavic-youtube':     'linear-gradient(135deg, rgba(220,38,38,0.4), rgba(153,27,27,0.4))',
}

/* ── Per-org gradient accents ─────────────────────────────── */
const CARD_GRADIENTS = {
  envy:         'linear-gradient(135deg, rgba(56,189,248,0.12) 0%, rgba(99,102,241,0.18) 100%)',
  usc:          'linear-gradient(135deg, rgba(255,100,60,0.12) 0%, rgba(220,50,50,0.18) 100%)',
  red:          'linear-gradient(135deg, rgba(251,113,133,0.12) 0%, rgba(200,40,80,0.18) 100%)',
  'mgimo-smm':  'linear-gradient(135deg, rgba(45,212,191,0.12) 0%, rgba(16,185,129,0.18) 100%)',
  mimun:        'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.18) 100%)',
  'mgimo-coord':'linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(245,158,11,0.18) 100%)',
  gallery:      'linear-gradient(135deg, rgba(180,140,100,0.12) 0%, rgba(100,80,50,0.18) 100%)',
}

/* ── Experience card block ───────────────────────────────── */
function ExperienceBlock({ item, index, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const gradient = CARD_GRADIENTS[item.id] || 'linear-gradient(135deg, rgba(91,156,196,0.10), rgba(91,156,196,0.06))'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col sm:flex-row"
      style={{
        position: 'relative',
        minHeight: 160,
        cursor: 'pointer',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'rgba(91,156,196,0.25)' : 'var(--color-stroke)'}`,
        transition: 'border-color 0.25s ease',
      }}
    >
      {/* Timeline dot on the line */}
      <div style={{
        position: 'absolute',
        left: -25,
        top: 32,
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: item.current ? 'var(--accent)' : 'var(--color-elevated)',
        border: `2px solid ${item.current ? 'var(--accent)' : 'var(--color-stroke)'}`,
        boxShadow: item.current ? '0 0 10px rgba(91,156,196,0.6)' : 'none',
        zIndex: 10,
      }} />

      {/* LEFT: text info */}
      <div style={{ flex: '0 0 45%', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        className="w-full sm:w-auto"
      >
        {item.current && (
          <span style={{
            display: 'inline-block',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 999,
            background: 'var(--accent)', color: '#fff',
            marginBottom: 10, alignSelf: 'flex-start',
          }}>Current</span>
        )}
        <h3 className="font-display font-bold" style={{ fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--color-content)', marginBottom: 4, lineHeight: 1.3 }}>
          {item.org}
        </h3>
        <p className="font-body" style={{ fontSize: 13, color: 'var(--color-muted)', marginBottom: 6, lineHeight: 1.4 }}>
          {item.role}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 11, color: 'var(--color-faint)', fontFamily: 'Inter', marginBottom: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Calendar size={10} />{item.period}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <MapPin size={10} />{item.location}
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 10, fontFamily: 'Inter', padding: '2px 8px',
              borderRadius: 999, background: 'var(--color-elevated)',
              color: 'var(--color-faint)',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* RIGHT: image or gradient panel — hidden on mobile */}
      <div className="hidden sm:block" style={{ flex: '1 1 55%', position: 'relative', overflow: 'hidden' }}>
        {/* Background: real photo (if provided) or per-org colour gradient */}
        {item.image ? (
          <img
            src={item.image}
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: hovered ? 'blur(3px) brightness(0.6)' : 'blur(0px) brightness(0.82)',
              transform: 'scale(1.08)',
              transition: 'filter 0.35s ease',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: gradient,
            filter: hovered ? 'blur(3px) brightness(0.75)' : 'blur(0px) brightness(1)',
            transform: 'scale(1.08)',
            transition: 'filter 0.35s ease',
          }} />
        )}

        {/* Subtle noise/texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }} />

        {/* "Click to learn more" — appears on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: 'Inter', fontWeight: 500, fontSize: 13,
            color: 'var(--color-content)',
            padding: '8px 20px', borderRadius: 999,
            background: 'rgba(10,10,10,0.65)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
          }}>
            Click to learn more
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Detail modal ────────────────────────────────────────── */
function ExperienceModal({ item, onClose }) {
  const relatedItems = (item.relatedWork || [])
    .map(id => allPortfolioItems[id])
    .filter(Boolean)

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60" style={{ backdropFilter: 'blur(8px)' }} onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={{
          background: 'rgba(22,22,22,0.96)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
        }}
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
          <X size={14} />
        </button>

        {item.current && (
          <span style={{
            display: 'inline-block', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 999, background: 'var(--accent)', color: '#fff', marginBottom: 12,
          }}>Current role</span>
        )}

        <h3 className="font-display font-bold" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'var(--color-content)', marginBottom: 4, paddingRight: 32 }}>
          {item.org}
        </h3>
        <p className="font-body" style={{ color: 'var(--color-muted)', fontSize: 14, marginBottom: 4 }}>{item.role}</p>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--color-faint)', fontFamily: 'Inter', marginBottom: 20 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} />{item.period}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{item.location}</span>
        </div>

        <div style={{ height: 1, background: 'var(--color-stroke)', marginBottom: 20 }} />

        <p className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)', marginBottom: 12 }}>
          Key highlights
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {item.highlights.map((h, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--color-muted)', lineHeight: 1.55, fontFamily: 'Inter' }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'var(--accent)', flexShrink: 0, marginTop: 8,
              }} />
              {h}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: relatedItems.length ? 24 : 0 }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 11, fontFamily: 'Inter', padding: '3px 10px',
              borderRadius: 999, background: 'var(--color-elevated)',
              color: 'var(--color-faint)', border: '1px solid var(--color-stroke)',
            }}>{tag}</span>
          ))}
        </div>

        {/* Related work */}
        {relatedItems.length > 0 && (
          <>
            <div style={{ height: 1, background: 'var(--color-stroke)', marginBottom: 20 }} />
            <p className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)', marginBottom: 12 }}>
              Selected work from this role
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedItems.map(workItem => {
                const thumb = getItemThumbnail(workItem)
                const gradient = ITEM_GRADIENT[workItem.id] || 'linear-gradient(135deg, rgba(91,156,196,0.3), rgba(99,102,241,0.3))'
                return (
                  <button
                    key={workItem.id}
                    onClick={() => {
                      onClose()
                      setTimeout(() => {
                        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                      }, 200)
                    }}
                    className="text-left group"
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid var(--color-stroke)',
                      background: 'var(--color-surface)',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,156,196,0.35)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-stroke)'}
                  >
                    {/* Thumbnail */}
                    <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: gradient }}>
                      {thumb && (
                        <img src={thumb} alt="" style={{
                          position: 'absolute', inset: 0, width: '100%', height: '100%',
                          objectFit: 'cover', opacity: 0.85,
                        }} />
                      )}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                      }} />
                      <ArrowRight size={12} style={{
                        position: 'absolute', bottom: 8, right: 8,
                        color: 'rgba(255,255,255,0.6)',
                      }} />
                    </div>
                    {/* Label */}
                    <div style={{ padding: '8px 10px' }}>
                      <p className="font-body font-semibold" style={{ fontSize: 11, color: 'var(--color-content)', lineHeight: 1.3 }}>
                        {workItem.title}
                      </p>
                      <p className="font-body" style={{ fontSize: 10, color: 'var(--color-faint)', marginTop: 2 }}>
                        {workItem.platform}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────────────── */
export default function Experience() {
  const sectionRef = useRef()
  const lineRef    = useRef()
  const [activeItem, setActiveItem] = useState(null)

  /* Scroll-driven glowing line growth */
  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current
      const line    = lineRef.current
      if (!section || !line) return
      const rect = section.getBoundingClientRect()
      const sectionH = section.offsetHeight
      const viewH    = window.innerHeight
      // 0 when section top reaches viewport bottom → 1 when section bottom reaches viewport top
      const progress = Math.min(1, Math.max(0,
        (viewH - rect.top) / (sectionH + viewH * 0.5)
      ))
      line.style.height = `${progress * 100}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Experience
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            Work history
          </h2>
        </ScrollReveal>

        {/* Content area with glowing line on the left */}
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Line track (full height) */}
          <div style={{
            position: 'absolute',
            left: 4, top: 0, bottom: 0,
            width: 2,
            background: 'var(--color-elevated)',
            borderRadius: 999,
          }}>
            {/* Growing glowing line */}
            <div ref={lineRef} style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%',
              height: '0%',
              background: 'linear-gradient(to bottom, var(--accent) 0%, rgba(91,156,196,0.25) 100%)',
              boxShadow: '0 0 8px rgba(91,156,196,0.5), 0 0 16px rgba(91,156,196,0.25)',
              borderRadius: 999,
              transition: 'height 0.08s linear',
            }} />
          </div>

          {/* Experience cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {timeline.map((item, i) => (
              <ExperienceBlock
                key={item.id}
                item={item}
                index={i}
                onOpen={setActiveItem}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeItem && (
          <ExperienceModal item={activeItem} onClose={() => setActiveItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
