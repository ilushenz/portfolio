import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, Palette, Camera, PenLine, Code2, X, ArrowRight, ExternalLink, Lock } from 'lucide-react'
import { GithubIcon } from '../ui/SocialIcons'
import ScrollReveal from '../ui/ScrollReveal'
import GlowGrid from '../ui/GlowGrid'
import { portfolioCategories } from '../../data/content'

const ICONS = { motion: Video, visuals: Palette, lens: Camera, words: PenLine, code: Code2 }

const accentText = { color: 'var(--accent)' }

const glassModal = {
  background: 'rgba(22,22,22,0.92)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.08)',
}

/* ── Media renderers ─────────────────────────────────────── */
function MediaEmbed({ item }) {
  if (item.type === 'tiktok') return (
    <div className="w-full flex justify-center">
      <iframe src={item.embedUrl} className="rounded-xl" width="320" height="580"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" allowFullScreen title={item.title} />
    </div>
  )
  if (item.type === 'youtube') return (
    <div className="w-full aspect-video rounded-xl overflow-hidden">
      <iframe src={item.embedUrl} className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen title={item.title} />
    </div>
  )
  if (item.type === 'vimeo') return (
    <div style={{ padding: '177.59% 0 0 0', position: 'relative' }}>
      <iframe
        src={item.embedUrl}
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        frameBorder="0"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '12px' }}
        title={item.title}
      />
    </div>
  )
  if (item.type === 'copy') return (
    <div className="rounded-xl p-5 font-body text-sm whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto"
      style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
      {item.copyText}
    </div>
  )
  if (item.type === 'link') return (
    <div className="flex flex-wrap gap-3">
      {item.url && (
        <a href={item.url} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 text-sm font-semibold font-body px-4 py-2 rounded-full text-white"
          style={{ background: 'var(--accent)' }}>
          <ExternalLink size={13} /> Visit Live
        </a>
      )}
      {item.github && (
        <a href={item.github} target="_blank" rel="noreferrer"
          className="flex items-center gap-2 text-sm font-semibold font-body px-4 py-2 rounded-full border"
          style={{ color: 'var(--color-content)', borderColor: 'var(--color-stroke)' }}>
          <GithubIcon size={13} /> GitHub
        </a>
      )}
    </div>
  )
  if (item.type === 'coming-soon') return (
    <div className="flex items-center gap-2 text-sm font-body" style={{ color: 'var(--color-faint)' }}>
      <Lock size={14} /> Under wraps. Stay tuned.
    </div>
  )
  if (item.type === 'placeholder') return (
    <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${item.placeholderColor} flex items-center justify-center`}>
      {item.driveLink && (
        <a href={item.driveLink} target="_blank" rel="noreferrer"
          className="text-white text-sm font-semibold px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          onClick={(e) => e.stopPropagation()}>
          Browse files
        </a>
      )}
    </div>
  )
  return null
}

/* ── Project detail modal ────────────────────────────────── */
function ProjectModal({ item, onClose }) {
  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60" style={{ backdropFilter: 'blur(8px)' }} onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={glassModal}
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
        <div className="flex gap-2 mb-3 flex-wrap">
          <span className="text-xs font-semibold font-body px-2.5 py-1 rounded-full text-white"
            style={{ background: 'var(--accent)' }}>{item.platform}</span>
          <span className="text-xs font-semibold font-body px-2.5 py-1 rounded-full"
            style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>{item.date}</span>
        </div>
        <h3 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
          {item.title}
        </h3>
        <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>{item.description}</p>
        {item.metrics && (
          <div className="font-body text-sm font-semibold mb-5" style={accentText}>{item.metrics}</div>
        )}
        <MediaEmbed item={item} />
      </motion.div>
    </motion.div>
  )
}

/* ── Category modal ──────────────────────────────────────── */
function CategoryModal({ cat, onSelectItem, onClose }) {
  const Icon = ICONS[cat.id] || Palette
  return (
    <motion.div className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60" style={{ backdropFilter: 'blur(8px)' }} onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-xl rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto"
        style={glassModal}
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
          <X size={14} />
        </button>
        <Icon size={18} className="mb-3" style={{ color: 'var(--color-muted)' }} />
        <h3 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
          {cat.title}
        </h3>
        <p className="font-body text-sm mb-6" style={{ color: 'var(--color-muted)' }}>{cat.description}</p>

        <div className="flex flex-col gap-px" style={{ background: 'var(--color-stroke)' }}>
          {cat.items.map((item) => (
            <motion.button key={item.id} className="text-left p-4"
              style={{ background: 'var(--color-canvas)' }}
              whileHover={{ background: 'var(--color-surface)', x: 4 }}
              onClick={() => onSelectItem(item)}>
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="font-body font-semibold text-sm mb-0.5" style={{ color: 'var(--color-content)' }}>
                    {item.title}
                  </div>
                  <div className="font-body text-xs" style={{ color: 'var(--color-faint)' }}>
                    {item.platform} · {item.date}
                  </div>
                </div>
                <ArrowRight size={13} style={{ color: 'var(--color-faint)', flexShrink: 0, marginTop: 2 }} />
              </div>
              {item.metrics && (
                <div className="mt-1.5 text-xs font-semibold font-body" style={accentText}>{item.metrics}</div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────────────── */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  return (
    <section id="portfolio" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Portfolio
          </p>
          <h2 className="heading-lg mb-3" style={{ color: 'var(--color-content)' }}>
            Selected work
          </h2>
          <p className="font-body text-base mb-16 max-w-xl" style={{ color: 'var(--color-muted)' }}>
            Video production, graphic design, photography, copywriting, and vibe-coded projects. Click any category to explore.
          </p>
        </ScrollReveal>

        <GlowGrid className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px" style={{ background: 'var(--color-stroke)' }}>
          {portfolioCategories.map((cat, i) => {
            const Icon = ICONS[cat.id] || Palette
            return (
              <ScrollReveal key={cat.id} delay={i * 0.07}>
                <motion.button
                  className="glow-card w-full text-left p-6 group"
                  style={{ background: 'var(--color-canvas)' }}
                  whileHover={{ background: 'var(--color-surface)' }}
                  transition={{ duration: 0 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat)}
                >
                  <Icon size={18} className="mb-4" style={{ color: 'var(--color-muted)' }} />
                  <h3 className="font-display font-bold text-sm mb-1.5" style={{ color: 'var(--color-content)', letterSpacing: '-0.01em' }}>
                    {cat.title}
                  </h3>
                  <p className="font-body text-xs leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-body font-medium" style={{ color: 'var(--accent)' }}>
                    <span>{cat.items.length} project{cat.items.length !== 1 ? 's' : ''}</span>
                    <ArrowRight size={10} />
                  </div>
                </motion.button>
              </ScrollReveal>
            )
          })}
        </GlowGrid>
      </div>

      <AnimatePresence>
        {activeCategory && !activeItem && (
          <CategoryModal
            cat={activeCategory}
            onSelectItem={setActiveItem}
            onClose={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeItem && <ProjectModal item={activeItem} onClose={() => setActiveItem(null)} />}
      </AnimatePresence>
    </section>
  )
}
