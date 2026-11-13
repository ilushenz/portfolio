import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import { Menu, X, FileText, Home } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import useScrollDirection from '../../hooks/useScrollDirection'
import { hero } from '../../data/content'

const glassStyle = {
  background: 'rgba(22, 22, 22, 0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
}

// Two items per page, in the order the sections appear on the page
const groups = [
  {
    page: '/',
    links: [
      { key: 'portfolio',  label: 'Portfolio',  href: '/#portfolio' },
      { key: 'experience', label: 'Experience', href: '/#experience' },
    ],
  },
  {
    page: '/about',
    links: [
      { key: 'about',   label: 'About',   href: '/about' },
      { key: 'contact', label: 'Contact', href: '/about#contact' },
    ],
  },
]

// Which section feeds which nav item
const SPY = {
  '/':      { hero: null, portfolio: 'portfolio', experience: 'experience', academic: 'experience' },
  '/about': { about: 'about', education: 'about', contact: 'contact' },
}

/* Scroll-spy: the section crossing a band just above the viewport middle wins */
function useSpyKey() {
  const location = useLocation()
  // Spy result is tagged with its page, so a stale value never leaks across routes
  const [spy, setSpy] = useState({ path: null, key: null })

  useEffect(() => {
    const path = location.pathname
    const map = SPY[path] || SPY['/']
    let io
    // Wait for the page transition to mount the new sections
    const t = setTimeout(() => {
      io = new IntersectionObserver((entries) => {
        const hit = entries.find(e => e.isIntersecting)
        if (hit) setSpy({ path, key: map[hit.target.id] })
      }, { rootMargin: '-42% 0px -57% 0px' })
      Object.keys(map).forEach(id => {
        const el = document.getElementById(id)
        if (el) io.observe(el)
      })
    }, 450)
    return () => { clearTimeout(t); io?.disconnect() }
  }, [location.pathname])

  if (spy.path === location.pathname) return spy.key
  return location.pathname === '/about' ? 'about' : null
}

/* A clicked item wins immediately and holds until the smooth scroll it started settles,
   so the highlight never stutters through the sections in between. */
function useActiveKey() {
  const spyKey = useSpyKey()
  const [override, setOverride] = useState(null)
  const cleanup = useRef(() => {})

  const select = useCallback((key) => {
    cleanup.current()
    setOverride({ key })
    let idle = 0
    let started = false
    const onScroll = () => {
      started = true
      clearTimeout(idle)
      idle = setTimeout(release, 450)
    }
    const fallback = setTimeout(() => { if (!started) release() }, 1000)
    function release() {
      cleanup.current()
      setOverride(null)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    cleanup.current = () => {
      clearTimeout(idle)
      clearTimeout(fallback)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => () => cleanup.current(), [])

  return [override ? override.key : spyKey, select]
}

const SLIDE = { type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }

/* Indicator box driven by motion values. Positions come from offsetLeft/offsetTop, which
   ignore the pill's own enter/exit transforms, so the indicator can never fly in from outside. */
function useBox() {
  return { x: useMotionValue(0), y: useMotionValue(0), w: useMotionValue(0), h: useMotionValue(0), o: useMotionValue(0) }
}

function moveBox(box, el, instant) {
  if (!el) { animate(box.o, 0, { duration: 0.2 }); return }
  const t = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight }
  const appearing = box.o.get() < 0.5
  for (const k of ['x', 'y', 'w', 'h']) {
    if (instant || appearing) { box[k].stop(); box[k].set(t[k]) }
    else animate(box[k], t[k], SLIDE)
  }
  if (instant) { box.o.stop(); box.o.set(1) }
  else animate(box.o, 1, { duration: 0.2 })
}

function NavLink({ link, isActive, buttonRef, onSelect, onClick }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    onSelect(link.key)
    if (onClick) onClick()
    const [path, anchor] = link.href.split('#')
    if (path === '' || path === location.pathname) {
      if (anchor) document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate(path || '/')
      if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 380)
    }
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      aria-current={isActive ? 'location' : undefined}
      className="focus-ring relative font-body text-sm font-medium px-3.5 py-1.5 rounded-full"
      style={{
        color: isActive ? 'oklch(86% 0.07 215)' : 'var(--color-muted)',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-content)' }}
      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-muted)' }}
    >
      {link.label}
    </button>
  )
}

function PillContent({ activeKey, onSelect, onLinkClick, vertical = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const onHero = location.pathname === '/' && activeKey === null
  const currentPage = SPY[location.pathname] ? location.pathname : '/'

  const linkRefs = useRef({})
  const groupRefs = useRef({})
  const groupBox = useBox()
  const linkBox = useBox()
  const mounted = useRef(false)

  // Slide both indicators together whenever the active item or page changes
  useLayoutEffect(() => {
    const instant = !mounted.current
    mounted.current = true
    moveBox(groupBox, groupRefs.current[currentPage], instant)
    moveBox(linkBox, activeKey ? linkRefs.current[activeKey] : null, instant)
  }, [activeKey, currentPage, groupBox, linkBox])

  // Re-measure without animating only when the pill itself resizes (fonts loading, viewport).
  // Current targets live in a ref so this observer is created once and never snaps a slide.
  const containerRef = useRef(null)
  const targets = useRef({ activeKey, currentPage })
  useLayoutEffect(() => { targets.current = { activeKey, currentPage } })
  useEffect(() => {
    let lastW = null
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      if (lastW === null || w === lastW) { lastW = w; return }
      lastW = w
      const { activeKey: k, currentPage: page } = targets.current
      moveBox(groupBox, groupRefs.current[page], true)
      if (k) moveBox(linkBox, linkRefs.current[k], true)
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [groupBox, linkBox])

  const boxStyle = (box) => ({
    position: 'absolute', left: 0, top: 0,
    x: box.x, y: box.y, width: box.w, height: box.h, opacity: box.o,
    pointerEvents: 'none',
  })

  return (
    <div ref={containerRef} className={vertical ? 'relative flex flex-col gap-1' : 'relative flex items-center gap-1 px-2 py-2'}>
      {/* Page capsule (behind the current page's pair) */}
      <motion.span aria-hidden="true" className={vertical ? 'rounded-2xl' : 'rounded-full'}
        style={{ ...boxStyle(groupBox), background: 'rgba(255,255,255,0.06)' }} />
      {/* Active item highlight */}
      <motion.span aria-hidden="true" className="rounded-full"
        style={{ ...boxStyle(linkBox), background: 'oklch(67% 0.12 215 / 0.26)', boxShadow: 'inset 0 0 0 1px oklch(67% 0.12 215 / 0.18)' }} />

      {!vertical && (
        <button
          onClick={() => { onSelect(null); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="focus-ring relative w-8 h-8 rounded-full flex items-center justify-center text-white mr-1 flex-shrink-0"
          style={{
            background: 'var(--accent)',
            boxShadow: onHero ? '0 0 0 3px oklch(67% 0.12 215 / 0.28)' : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
          aria-label="Home"
          aria-current={onHero ? 'location' : undefined}
        >
          <Home size={14} />
        </button>
      )}

      {groups.map((group) => (
        <div
          key={group.page}
          ref={el => { groupRefs.current[group.page] = el }}
          className={vertical ? 'flex flex-col gap-1 p-1' : 'flex items-center gap-0.5 p-1'}
        >
          {group.links.map((link) => (
            <NavLink
              key={link.key}
              link={link}
              isActive={activeKey === link.key}
              buttonRef={el => { linkRefs.current[link.key] = el }}
              onSelect={onSelect}
              onClick={onLinkClick}
            />
          ))}
        </div>
      ))}

      <a
        href={hero.resumeUrl}
        target="_blank"
        rel="noreferrer"
        className={vertical
          ? 'focus-ring relative flex items-center gap-2 text-xs font-semibold font-body px-3 py-2 rounded-xl text-white mt-1'
          : 'focus-ring relative ml-1 flex items-center gap-1.5 text-xs font-semibold font-body px-3 py-1.5 rounded-full text-white flex-shrink-0'}
        style={{ background: 'var(--accent)' }}
        onClick={onLinkClick}
      >
        <FileText size={12} />
        Resume
      </a>
    </div>
  )
}

export default function Navbar() {
  const { atTop } = useScrollDirection(8)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeKey, selectKey] = useActiveKey()

  // Top pill only visible at very top; bottom pill always visible when scrolled away
  const showTop    = atTop
  const showBottom = !atTop

  return (
    <>
      {/* Desktop top pill — only at page top */}
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
              <PillContent activeKey={activeKey} onSelect={selectKey} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Desktop bottom pill — stays at bottom whenever scrolled */}
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
              <PillContent activeKey={activeKey} onSelect={selectKey} />
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
              <PillContent activeKey={activeKey} onSelect={selectKey} vertical onLinkClick={() => setMobileOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="focus-ring w-12 h-12 rounded-full flex items-center justify-center text-white"
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
