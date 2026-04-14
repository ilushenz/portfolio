import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero } from '../../data/content'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: 'easeOut', delay },
})

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center section-pad">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* Text */}
        <div>
          <motion.p
            {...slideLeft(0.1)}
            className="font-body text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: 'var(--color-faint)' }}
          >
            Social Media & Content Specialist
          </motion.p>

          <motion.h1 {...fade(0.2)} className="heading-xl mb-5" style={{ color: 'var(--color-content)' }}>
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

          <motion.p
            {...slideLeft(0.35)}
            className="font-body text-lg font-light mb-8 max-w-md leading-relaxed"
            style={{ color: 'var(--color-muted)' }}
          >
            {hero.tagline}
          </motion.p>

          <motion.div {...fade(0.5)} className="flex flex-wrap gap-3">
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="font-body font-semibold text-sm px-5 py-2.5 rounded-full text-white"
              style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
            >
              View My Work
            </a>
            <a
              href={hero.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="font-body font-semibold text-sm px-5 py-2.5 rounded-full border"
              style={{ color: 'var(--color-content)', borderColor: 'var(--color-stroke)' }}
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex justify-center md:justify-end"
        >
          <div
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-neu-lg)' }}
          >
            <img
              src="/portfolio/headshot.jpg"
              alt="Ilia Chapchakhov"
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient overlay at bottom */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{ background: 'linear-gradient(to top, rgba(12,12,12,0.4), transparent)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ color: 'var(--color-faint)' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
