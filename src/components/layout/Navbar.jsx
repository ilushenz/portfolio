import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../../App'
import { navLinks, hero } from '../../data/content'

export default function Navbar() {
  const { dark, setDark } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { threshold: 0.25 }
    )
    sections.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleNav = (href) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        className="fixed top-5 left-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full"
        style={{
          x: '-50%',
          background: scrolled
            ? dark ? 'rgba(22,22,22,0.85)' : 'rgba(245,245,243,0.85)'
            : dark ? 'rgba(22,22,22,0.5)' : 'rgba(245,245,243,0.5)',
          backdropFilter: 'blur(16px)',
          boxShadow: 'var(--shadow-neu-sm)',
          border: '1px solid var(--color-stroke)',
          transition: 'background 0.3s',
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      >
        {/* Monogram */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold font-body mr-1"
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
              className="relative px-3.5 py-1.5 rounded-full text-sm font-body font-medium transition-colors duration-200"
              style={{ color: isActive ? 'var(--color-content)' : 'var(--color-muted)' }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: 'var(--shadow-neu-inset)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          )
        })}

        {/* Theme toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          className="w-8 h-8 rounded-full flex items-center justify-center ml-1 transition-colors"
          style={{ boxShadow: 'var(--shadow-neu-sm)', color: 'var(--color-muted)' }}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>

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

      {/* Mobile FAB */}
      <div className="md:hidden">
        <motion.button
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-neu"
          style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
          onClick={() => setMobileOpen((v) => !v)}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </motion.button>

        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
              />
              <motion.div
                className="fixed bottom-20 right-6 z-50 rounded-2xl p-2 flex flex-col gap-1 min-w-[160px]"
                style={{
                  background: 'var(--color-surface)',
                  boxShadow: 'var(--shadow-neu)',
                  border: '1px solid var(--color-stroke)',
                }}
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              >
                {[...navLinks, { label: 'Resume', href: hero.resumeUrl, external: true }].map((link) => (
                  <button
                    key={link.href}
                    className="px-4 py-2 rounded-xl text-sm font-body font-medium text-left transition-colors"
                    style={{ color: 'var(--color-content)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-elevated)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    onClick={() => {
                      setMobileOpen(false)
                      link.external ? window.open(link.href, '_blank') : handleNav(link.href)
                    }}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="border-t mt-1 pt-1" style={{ borderColor: 'var(--color-stroke)' }}>
                  <button
                    onClick={() => setDark((d) => !d)}
                    className="w-full px-4 py-2 rounded-xl text-sm font-body font-medium text-left flex items-center gap-2"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {dark ? <Sun size={14} /> : <Moon size={14} />}
                    {dark ? 'Light mode' : 'Dark mode'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
