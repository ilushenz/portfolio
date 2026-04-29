import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { hero } from '../../data/content'

/* ── Particle mesh canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let W, H

    const PARTICLE_COUNT = 72
    const MAX_DIST = 130
    const particles = []

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)
    resize()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.2 + 0.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Move + wrap
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
      }

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(91,156,196,${(1 - d / MAX_DIST) * 0.13})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(91,156,196,0.35)'
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.55,
        pointerEvents: 'none',
      }}
    />
  )
}

/* ── Hero ── */
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
  const textRef = useRef()

  // Scroll parallax — text block drifts slightly right as user scrolls (desktop only)
  useEffect(() => {
    const onScroll = () => {
      if (textRef.current && window.innerWidth >= 768) {
        textRef.current.style.transform = `translateX(${window.scrollY * 0.055}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center section-pad"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Radial vignette over canvas */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 60% 50%, transparent 30%, var(--color-canvas) 100%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center" style={{ position: 'relative' }}>

        {/* Text with parallax */}
        <div ref={textRef} style={{ willChange: 'transform' }}>
          <motion.p
            {...slideLeft(0.1)}
            className="font-body text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ color: 'var(--accent)' }}
          >
            Social Media &amp; Content Specialist
          </motion.p>

          <motion.h1 {...fade(0.2)} className="heading-xl mb-6" style={{ color: 'var(--color-content)' }}>
            <span style={{ display: 'block', fontWeight: 800 }}>Ilia</span>
            <span style={{ display: 'block', fontWeight: 800 }}>Chapchakhov</span>
          </motion.h1>

          <motion.p
            {...slideLeft(0.35)}
            className="font-body font-light mb-8 max-w-md leading-relaxed"
            style={{ color: 'var(--color-muted)', fontSize: 'clamp(1.1rem, 2.2vw, 1.55rem)' }}
          >
            {hero.tagline}
          </motion.p>

          <motion.div {...fade(0.5)} className="flex flex-wrap gap-3">
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="font-body font-semibold text-sm px-5 py-2.5 rounded-full text-white"
              style={{ background: 'var(--accent)' }}
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
            className="w-full sm:w-auto"
            style={{
              width: 'clamp(180px, 22vw, 360px)',
              maxWidth: '80vw',
              aspectRatio: '3/4',
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid var(--color-stroke)',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <img
              src="/headshot.webp"
              alt="Ilia Chapchakhov"
              draggable="false"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12,12,12,0.35) 0%, transparent 50%)',
            }} />
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          style={{
            width: 1,
            height: 48,
            background: 'linear-gradient(to bottom, transparent, var(--color-muted))',
          }}
          animate={{ scaleY: [0.7, 1, 0.7], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
