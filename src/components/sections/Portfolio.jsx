import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../ui/ScrollReveal'
import SectionLabel from '../ui/SectionLabel'
import { portfolioCategories } from '../../data/content'

const auroraStyle = {
  background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
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
      <div className="rounded-xl shadow-neu-inset p-5 font-body text-sm text-ink-muted whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto">
        {item.copyText}
      </div>
    )
  }
  // Placeholder
  return (
    <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${item.placeholderColor} flex items-center justify-center`}>
      <div className="text-white text-center p-6">
        <div className="text-4xl mb-2">🖼️</div>
        <div className="font-semibold mb-3">Visual content</div>
        {item.driveLink && (
          <a
            href={item.driveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-white/20 hover:bg-white/30 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            Browse files →
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
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-ink-primary/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-neu-lg bg-neu-bg p-6 md:p-8"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full shadow-neu-sm flex items-center justify-center text-ink-muted hover:text-ink-primary transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        {/* Platform + date */}
        <div className="flex gap-2 mb-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
          >
            {item.platform}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full shadow-neu-sm text-ink-muted">
            {item.date}
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl text-ink-primary mb-2">{item.title}</h3>
        <p className="font-body text-ink-muted text-sm leading-relaxed mb-4">{item.description}</p>

        {/* Metrics */}
        {item.metrics && (
          <div className="rounded-xl shadow-neu-inset px-4 py-3 mb-5 text-sm font-semibold font-body" style={auroraStyle}>
            {item.metrics}
          </div>
        )}

        {/* Media */}
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
          <SectionLabel text="Creative Portfolio" />
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink-primary mb-3">
            Work That Moves People
          </h2>
          <p className="font-body text-ink-muted max-w-xl mb-12">
            Click a category to explore — each project opens with full context, media, and real results.
          </p>
        </ScrollReveal>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {portfolioCategories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.08}>
              <motion.button
                className="w-full rounded-2xl shadow-neu p-6 text-left transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openCategory(cat)}
              >
                {/* Top border aurora */}
                <div
                  className="h-0.5 rounded-full mb-5 transition-opacity opacity-40 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)' }}
                />
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="font-display font-bold text-lg text-ink-primary mb-1">{cat.title}</h3>
                <p className="font-body text-xs text-ink-muted leading-relaxed">{cat.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={auroraStyle}>
                  <span>{cat.items.length} project{cat.items.length !== 1 ? 's' : ''}</span>
                  <span>→</span>
                </div>
              </motion.button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Category drill-down modal */}
      <AnimatePresence>
        {activeCategory && !activeItem && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink-primary/40 backdrop-blur-sm"
              onClick={closeCategory}
            />
            <motion.div
              className="relative z-10 w-full max-w-xl rounded-3xl shadow-neu-lg bg-neu-bg p-6 md:p-8 max-h-[85vh] overflow-y-auto"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <button
                onClick={closeCategory}
                className="absolute top-4 right-4 w-8 h-8 rounded-full shadow-neu-sm flex items-center justify-center text-ink-muted"
              >
                ×
              </button>

              <div className="text-4xl mb-2">{activeCategory.emoji}</div>
              <h3 className="font-display font-bold text-2xl text-ink-primary mb-1">{activeCategory.title}</h3>
              <p className="font-body text-sm text-ink-muted mb-6">{activeCategory.description}</p>

              <div className="flex flex-col gap-3">
                {activeCategory.items.map((item) => (
                  <motion.button
                    key={item.id}
                    className="text-left rounded-2xl shadow-neu p-4 hover:scale-[1.01] transition-transform"
                    onClick={() => openItem(item)}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold font-body text-ink-primary text-sm">{item.title}</div>
                        <div className="text-xs text-ink-muted mt-0.5">{item.platform} · {item.date}</div>
                      </div>
                      <span className="text-ink-faint text-lg">→</span>
                    </div>
                    {item.metrics && (
                      <div className="mt-2 text-xs font-semibold" style={auroraStyle}>{item.metrics}</div>
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
