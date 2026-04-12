import { motion } from 'framer-motion'
import { hero } from '../../data/content'

const auroraStyle = {
  background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center section-pad pt-32 md:pt-24 relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
      />
      <div
        className="absolute bottom-20 left-0 w-56 h-56 rounded-full opacity-10 pointer-events-none blur-3xl"
        style={{ background: 'linear-gradient(135deg, #C850C0, #FFCC70)' }}
      />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          {/* Location chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full shadow-neu-sm text-xs font-semibold font-body text-ink-muted mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {hero.location} · Open to opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-ink-primary leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ilia
            <br />
            <span style={auroraStyle}>Chapchakhov</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="font-display italic text-xl md:text-2xl text-ink-muted mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            "{hero.tagline}"
          </motion.p>

          <motion.p
            className="font-body text-sm text-ink-faint mb-8 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {hero.sub}
          </motion.p>

          {/* Language pills */}
          <motion.div
            className="flex gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {hero.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 rounded-full shadow-neu-sm text-xs font-semibold font-body text-ink-muted"
              >
                {lang}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-full text-white font-semibold font-body text-sm transition-transform hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
            >
              View My Work
            </button>
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full font-semibold font-body text-sm text-ink-primary shadow-neu transition-transform hover:scale-105 active:scale-95"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right: Headshot card */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative">
            {/* Outer neumorphic frame */}
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl shadow-neu-lg p-2">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-neu-inset">
                <img
                  src="/portfolio/headshot.jpg"
                  alt="Ilia Chapchakhov"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-2xl shadow-neu text-xs font-semibold font-body"
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <span style={auroraStyle}>Adobe Certified Pro ✦</span>
            </motion.div>

            {/* Floating stat bubble */}
            <motion.div
              className="absolute -top-4 -left-4 px-3 py-2 rounded-xl shadow-neu text-xs font-body text-ink-muted"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
            >
              🎬 348K views
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink-faint"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}
