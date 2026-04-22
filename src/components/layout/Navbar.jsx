import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import useScrollDirection from '../../hooks/useScrollDirection'
import { hero } from '../../data/content'

const glassStyle = {
  background: 'rgba(22, 22, 22, 0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
}

const links = [
  { label: 'Work',    href: '#portfolio',     page: '/' },
  { label: 'Results', href: '#metrics',       page: '/' },
  { label: 'About',   href: '/about',         page: '/about' },
  { label: 'Contact', href: '/about#contact', page: '/about' },
]

function NavLink({ link, onClick }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) onClick()
    const [path, anchor] = link.href.split('#')
    if (path === '' || path === location.pathname || (path === '/' && location.pathname === '/')) {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(path || '/')
      if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 350)
    }
  }

  const isActive = location.pathname === link.page

  return (
    <button
      onClick={handleClick}
      className="font-body text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-150"
      style={{
        color: isActive ? 'var(--color-content)' : 'var(--color-muted)',
        background: isActive ? 'var(--color-elevated)' : 'transparent',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-content)' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? 'var(--color-content)' : 'var(--color-muted)' }}
    >
      {link.label}
    </button>
  )
}

function PillContent({ onLinkClick }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-1 px-2 py-2">
      <button
        onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-display text-white mr-2 flex-shrink-0"
        style={{ background: 'var(--accent)' }}
      >
        IC
      </button>

      {links.map((link) => (
        <NavLink key={link.label} link={link} onClick={onLinkClick} />
      ))}

      <a
        href={hero.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className="ml-2 flex items-center gap-1.5 text-xs font-semibold font-body px-3 py-1.5 rounded-full text-white flex-shrink-0"
        style={{ background: 'var(--accent)' }}
      >
        <FileText size={12} />
        Resume
      </a>
    </div>
  )
}

export default function Navbar() {
  const { direction, atTop } = useScrollDirection(8)
  const [mobileOpen, setMobileOpen] = useState(false)

  const showTop    = atTop || direction === 'up'
  const showBottom = !atTop && direction === 'down'

  return (
    <>
      {/* Desktop top pill */}
      <AnimatePresence>
        {showTop && (
          <motion.nav
            key="top-pill"
            className="fixed top-5 left-1/2 z-50 hidden md:block"
            style={{ x: '-50%' }}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{    y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            <div className="rounded-full" style={glassStyle}>
              <PillContent />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop bottom pill */}
      <AnimatePresence>
        {showBottom && (
          <motion.nav
            key="bottom-pill"
            className="fixed bottom-6 left-1/2 z-50 hidden md:block"
            style={{ x: '-50%' }}
            initial={{ y: 80,  opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{    y: 80,  opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            <div className="rounded-full" style={glassStyle}>
              <PillContent />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile FAB */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="absolute bottom-14 right-0 rounded-2xl p-2 flex flex-col gap-1 min-w-[160px]"
              style={glassStyle}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1,   y: 0 }}
              exit={{    opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            >
              {links.map((link) => (
                <NavLink key={link.label} link={link} onClick={() => setMobileOpen(false)} />
              ))}
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-semibold font-body px-3 py-2 rounded-xl text-white mt-1"
                style={{ background: 'var(--accent)' }}
                onClick={() => setMobileOpen(false)}
              >
                <FileText size={12} />
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setMobileOpen((o) => !o)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ background: 'var(--accent)' }}
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X    size={18} /></motion.span>
              : <motion.span key="men" initial={{ rotate:  90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate:-90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
            }
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
