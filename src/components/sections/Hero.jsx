import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero } from '../../data/content'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center section-pad pt-28 md:pt-24 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none blur-[120px]"
        style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
      />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body font-medium mb-8"
            style={{
              background: 'var(--color-surface)',
              boxShadow: 'var(--shadow-neu-sm)',
              border: '1px solid var(--color-stroke)',
              color: 'var(--color-muted)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {hero.location} · Available for work
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display font-bold leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', letterSpacing: '-0.03em', color: 'var(--color-content)' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ilia<br />
            <span style={{
              background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Chapchakhov
            </span>
          </motion.h1>

          {/* Tagline — no italics, lighter weight for contrast */}
          <motion.p
            className="font-body font-light text-xl md:text-2xl mb-2"
            style={{ color: 'var(--color-muted)', letterSpacing: '-0.01em' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {hero.tagline}
          </motion.p>

          <motion.p
            className="font-body text-sm font-medium mb-10"
            style={{ color: 'var(--color-faint)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {hero.sub}
          </motion.p>

          {/* Language pills */}
          <motion.div
            className="flex gap-2 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            {hero.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-full text-xs font-semibold font-body"
                style={{
                  background: 'var(--color-surface)',
                  boxShadow: 'var(--shadow-neu-sm)',
                  color: 'var(--color-muted)',
                }}
              >
                {lang}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full text-white font-semibold font-body text-sm"
              style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              View My Work
            </button>
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full font-semibold font-body text-sm"
              style={{
                background: 'var(--color-surface)',
                boxShadow: 'var(--shadow-neu)',
                color: 'var(--color-content)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-neu-inset)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-neu)' }}
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right: Headshot */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div
            className="w-72 h-72 md:w-[340px] md:h-[340px] rounded-3xl p-2"
            style={{ boxShadow: 'var(--shadow-neu-lg)', background: 'var(--color-surface)' }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-neu-inset)' }}>
              <img
                src="/portfolio/headshot.jpg"
                alt="Ilia Chapchakhov"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ color: 'var(--color-faint)' }}
        onClick={() => document.querySelector('#metrics')?.scrollIntoView({ behavior: 'smooth' })}
        whileHover={{ color: 'var(--color-muted)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <span className="text-xs font-body font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </motion.button>
    </section>
  )
}
