import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, Palette, Camera, PenLine, X, ArrowRight } from 'lucide-react'
import ScrollReveal from '../ui/ScrollReveal'
import { portfolioCategories } from '../../data/content'

const ICONS = {
  motion: Video,
  visuals: Palette,
  lens: Camera,
  words: PenLine,
}

function VideoEmbed({ item }) {
  if (item.type === 'tiktok') {
    return (
      <div className="w-full flex justify-center">
        <iframe
          src={item.embedUrl}
          className="rounded-xl"
          width="340"
          height="600"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          title={item.title}
        />
      </div>
    )
  }
  if (item.type === 'youtube') {
    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden">
        <iframe
          src={item.embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={item.title}
        />
      </div>
    )
  }
  if (item.type === 'copy') {
    return (
      <div
        className="rounded-xl p-5 font-body text-sm whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto"
        style={{
          background: 'var(--color-elevated)',
          color: 'var(--color-muted)',
          boxShadow: 'var(--shadow-neu-inset)',
        }}
      >
        {item.copyText}
      </div>
    )
  }
  // Placeholder
  return (
    <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${item.placeholderColor} flex items-center justify-center`}>
      <div className="text-white text-center p-6">
        <div className="font-body font-semibold mb-3 text-sm opacity-80">Visual content</div>
        {item.driveLink && (
          <a
            href={item.driveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Browse files
          </a>
        )}
      </div>
    </div>
  )
}

function ProjectModal({ item, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={{
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow-neu-lg)',
          border: '1px solid var(--color-stroke)',
        }}
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ color: 'var(--color-muted)', background: 'var(--color-elevated)' }}
          aria-label="Close"
        >
          <X size={14} />
        </button>

        <div className="flex gap-2 mb-3 flex-wrap">
          <span
            className="text-xs font-semibold font-body px-2.5 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
          >
            {item.platform}
          </span>
          <span
            className="text-xs font-semibold font-body px-2.5 py-1 rounded-full"
            style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}
          >
            {item.date}
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
          {item.title}
        </h3>
        <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
          {item.description}
        </p>

        {item.metrics && (
          <div
            className="rounded-xl px-4 py-3 mb-5 text-sm font-semibold font-body"
            style={{
              background: 'var(--color-elevated)',
              background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {item.metrics}
          </div>
        )}

        <VideoEmbed item={item} />
      </motion.div>
    </motion.div>
  )
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const openCategory = (cat) => {
    setActiveCategory(cat)
    setActiveItem(null)
  }
  const openItem = (item) => setActiveItem(item)
  const closeModal = () => setActiveItem(null)
  const closeCategory = () => setActiveCategory(null)

  return (
    <section id="portfolio" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Portfolio
          </p>
          <h2 className="heading-lg mb-3" style={{ color: 'var(--color-content)' }}>
            Selected work.
          </h2>
          <p className="font-body text-base mb-16 max-w-xl" style={{ color: 'var(--color-muted)' }}>
            Video production, graphic design, photography, and copywriting — click any category to explore.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--color-stroke)' }}>
          {portfolioCategories.map((cat, i) => {
            const Icon = ICONS[cat.id] || Palette
            return (
              <ScrollReveal key={cat.id} delay={i * 0.08}>
                <motion.button
                  className="w-full text-left p-7 group"
                  style={{ background: 'var(--color-canvas)' }}
                  whileHover={{ background: 'var(--color-surface)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openCategory(cat)}
                >
                  <Icon size={20} className="mb-5" style={{ color: 'var(--color-muted)' }} />
                  <h3 className="font-display font-bold text-base mb-1.5" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
                    {cat.title}
                  </h3>
                  <p className="font-body text-xs leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-body font-medium" style={{ color: '#4158D0' }}>
                    <span>{cat.items.length} project{cat.items.length !== 1 ? 's' : ''}</span>
                    <ArrowRight size={11} />
                  </div>
                </motion.button>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      {/* Category modal */}
      <AnimatePresence>
        {activeCategory && !activeItem && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
              onClick={closeCategory}
            />
            <motion.div
              className="relative z-10 w-full max-w-xl rounded-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto"
              style={{
                background: 'var(--color-surface)',
                boxShadow: 'var(--shadow-neu-lg)',
                border: '1px solid var(--color-stroke)',
              }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <button
                onClick={closeCategory}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ color: 'var(--color-muted)', background: 'var(--color-elevated)' }}
              >
                <X size={14} />
              </button>

              {(() => {
                const Icon = ICONS[activeCategory.id] || Palette
                return <Icon size={20} className="mb-3" style={{ color: 'var(--color-muted)' }} />
              })()}
              <h3 className="font-display font-bold text-2xl mb-1" style={{ color: 'var(--color-content)', letterSpacing: '-0.02em' }}>
                {activeCategory.title}
              </h3>
              <p className="font-body text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
                {activeCategory.description}
              </p>

              <div className="flex flex-col gap-px" style={{ background: 'var(--color-stroke)' }}>
                {activeCategory.items.map((item) => (
                  <motion.button
                    key={item.id}
                    className="text-left p-4"
                    style={{ background: 'var(--color-canvas)' }}
                    whileHover={{ background: 'var(--color-surface)', x: 4 }}
                    onClick={() => openItem(item)}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <div className="font-body font-semibold text-sm mb-0.5" style={{ color: 'var(--color-content)' }}>
                          {item.title}
                        </div>
                        <div className="font-body text-xs" style={{ color: 'var(--color-faint)' }}>
                          {item.platform} · {item.date}
                        </div>
                      </div>
                      <ArrowRight size={14} style={{ color: 'var(--color-faint)', flexShrink: 0, marginTop: 2 }} />
                    </div>
                    {item.metrics && (
                      <div
                        className="mt-2 text-xs font-semibold font-body"
                        style={{
                          background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {item.metrics}
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project detail modal */}
      <AnimatePresence>
        {activeItem && <ProjectModal item={activeItem} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  )
}
