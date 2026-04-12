import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, hero } from '../../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active section on scroll
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop floating pill */}
      <motion.nav
        className="fixed top-6 left-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full"
        style={{
          x: '-50%',
          background: scrolled ? 'rgba(232,236,241,0.88)' : 'rgba(232,236,241,0.6)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled
            ? '8px 8px 15px #A3B1C6, -8px -8px 15px #FFFFFF'
            : '4px 4px 8px #A3B1C6, -4px -4px 8px #FFFFFF',
          transition: 'box-shadow 0.3s, background 0.3s',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      >
        {/* Logo monogram */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold font-body mr-1 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
          aria-label="Back to top"
        >
          IC
        </button>

        {navLinks.map((link) => {
          const isActive = active === link.href.replace('#', '')
          return (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="relative px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors duration-200"
              style={{ color: isActive ? '#2D3748' : '#718096' }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: 'inset 3px 3px 6px #A3B1C6, inset -3px -3px 6px #FFFFFF' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          )
        })}

        <a
          href={hero.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-1 px-4 py-1.5 rounded-full text-sm font-semibold font-body text-white"
          style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
        >
          Resume
        </a>
      </motion.nav>

      {/* Mobile: floating action button + radial menu */}
      <div className="md:hidden">
        {/* FAB */}
        <motion.button
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-neu-lg"
          style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
          onClick={() => setMobileOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          aria-label="Open navigation"
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 22, lineHeight: 1 }}
          >
            {mobileOpen ? '×' : '☰'}
          </motion.span>
        </motion.button>

        {/* Radial bubbles */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              {/* Nav bubbles arc upward from FAB */}
              {[...navLinks, { label: 'Resume', href: hero.resumeUrl, external: true }].map((link, i) => {
                const total = navLinks.length + 1
                // Arc from bottom-right, spread upward-left
                const angle = 90 + (i / (total - 1)) * 110
                const rad = (angle * Math.PI) / 180
                const dist = 80
                const x = -Math.cos(rad) * dist
                const y = -Math.sin(rad) * dist

                return (
                  <motion.button
                    key={link.href}
                    className="fixed z-50 px-3 py-2 rounded-full text-sm font-semibold font-body shadow-neu text-ink-primary bg-neu-bg"
                    style={{
                      bottom: `calc(1.5rem + 28px)`,
                      right: `calc(1.5rem + 28px)`,
                      transformOrigin: 'center',
                    }}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: 1, x, y, scale: 1 }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                    onClick={() => {
                      setMobileOpen(false)
                      if (link.external) {
                        window.open(link.href, '_blank')
                      } else {
                        handleNav(link.href)
                      }
                    }}
                  >
                    {link.label}
                  </motion.button>
                )
              })}
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
