import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Metrics from './Metrics'
import ScrollReveal from '../ui/ScrollReveal'
import { timeline, portfolioCategories } from '../../data/content'

/* ── Helpers ────────────────────────────────────────────── */
// Flatten all portfolio items into a lookup map by id
const allPortfolioItems = Object.fromEntries(
  portfolioCategories.flatMap(c => c.items).map(item => [item.id, item])
)

function getItemThumbnail(item) {
  if (!item) return null
  if (item.images?.length) return item.images[0]
  return null
}

const ITEM_GRADIENT = {
  'invisalign-reel':    'linear-gradient(135deg, rgba(139,92,246,0.4), rgba(59,130,246,0.4))',
  'envy-carousels':     'linear-gradient(135deg, rgba(56,189,248,0.4), rgba(99,102,241,0.4))',
  'envy-design-series': 'linear-gradient(135deg, rgba(56,189,248,0.3), rgba(245,158,11,0.3))',
  'groundhog-email':    'linear-gradient(135deg, rgba(251,191,36,0.4), rgba(245,158,11,0.4))',
  'valentine-series':   'linear-gradient(135deg, rgba(251,113,133,0.4), rgba(200,40,80,0.4))',
  'usc-carousel':       'linear-gradient(135deg, rgba(255,100,60,0.4), rgba(220,50,50,0.4))',
  'slavic-youtube':     'linear-gradient(135deg, rgba(220,38,38,0.4), rgba(153,27,27,0.4))',
}

/* ── Stacked timeline (modelled on the Isthmus reference) ──── */
const LAYOUT = {
  desktop: { open: 380, shut: 72, gap: 12, height: 430, radius: 14, pad: 24, minSliver: 14, peek: 72, emoji: 128, emojiShut: 36 },
  mobile:  { open: 300, shut: 48, gap: 10, height: 400, radius: 14, pad: 16, minSliver: 6, peek: 28, emoji: 76, emojiShut: 26, compact: true },
}
const PANEL_BG = '#141414'
const RULER = { tick: '#3E3E3C', label: '#6A6A68', marker: '#F1F0EC' }
// All cards share the site accent (the Graduate Assistant card's blue)
const CARD_GRADIENT = 'linear-gradient(155deg, #1f6f86 0%, #0f3440 100%)'
const LIFT = 12          // headroom so the hover scale never touches the clip edge
const RULER_GAP = 22
const RULER_H = 34
const DRAG_STEP = 60     // px of horizontal drag per card
const TOUCH_STEP = 45    // px of horizontal finger travel per card
const WHEEL_STEP = 40    // px of horizontal wheel/trackpad delta per card

const startYear = (period) => (period.match(/\d{4}/) || [''])[0]
const pad2 = (n) => String(n).padStart(2, '0')

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function getSize(width, count) {
  if (width >= 640) return LAYOUT.desktop
  const m = LAYOUT.mobile
  // Leave room for the stacked deck on the left and a peek of the next card on the right
  const open = Math.min(m.open, width - m.pad - (count - 1) * m.minSliver - m.gap - m.peek)
  return { ...m, open }
}

// x position of every card for a given active index
function getPositions(count, active, width, size) {
  const step = size.shut + size.gap
  const reserve = active < count - 1 ? size.gap + size.peek : size.pad
  const sliver = active === 0 ? step
    : Math.min(step, Math.max(size.minSliver, (width - size.pad - size.open - reserve) / active))
  const xActive = size.pad + active * sliver
  const xs = Array.from({ length: count }, (_, i) => {
    if (i <= active) return size.pad + i * sliver
    return xActive + size.open + size.gap + (i - active - 1) * step
  })
  return { xs, sliver }
}

function TimelineCard({ item, isOpen, size, canHover, onActivate, onOpen, onKeyboardFocus, suppressClick }) {
  const [hovered, setHovered] = useState(false)
  const showHint = isOpen && (hovered || !canHover)
  const metaSize = size.compact ? 13.5 : 15

  return (
    <motion.button
      type="button"
      className="focus-ring"
      onClick={() => {
        if (suppressClick()) return
        isOpen ? onOpen(item) : onActivate()
      }}
      onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) onKeyboardFocus() }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{ scale: isOpen && hovered && canHover ? 1.02 : 1 }}
      transition={{ duration: 0.3 }}
      aria-label={isOpen
        ? `${item.role}, ${item.org}, ${item.period}, ${item.location}. Open details`
        : `Show ${item.org}, ${item.period}`}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: size.height,
        borderRadius: size.radius,
        overflow: 'hidden',
        textAlign: 'left',
        cursor: 'pointer',
        color: '#fff',
        background: CARD_GRADIENT,
        boxShadow: '-10px 0 22px -8px rgba(0,0,0,0.6)',
        filter: isOpen ? 'none' : `brightness(${hovered ? 0.85 : 0.62})`,
        transition: 'filter 0.3s ease',
      }}
    >
      {/* Shut strip: small emoji at the top */}
      <img
        src={item.emojiImg} alt="" aria-hidden="true" draggable="false" loading="lazy"
        width={size.emojiShut} height={size.emojiShut}
        style={{
          position: 'absolute', top: 20, left: (size.shut - size.emojiShut) / 2,
          width: size.emojiShut, height: size.emojiShut,
          opacity: isOpen ? 0 : 1, transition: 'opacity 0.25s ease', pointerEvents: 'none',
        }}
      />

      {/* Shut strip: vertical start year */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', left: size.shut / 2, bottom: 22,
          transform: 'translateX(-50%) rotate(180deg)',
          writingMode: 'vertical-rl',
          fontSize: 12, fontWeight: 500, letterSpacing: '0.04em',
          color: 'rgba(255,255,255,0.8)',
          opacity: isOpen ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      >
        {startYear(item.period)}
      </span>

      {/* Open card: large emoji illustration, service-card style (bottom-right) */}
      <motion.img
        src={item.emojiImg} alt="" aria-hidden="true" draggable="false" loading="lazy"
        width={size.emoji} height={size.emoji}
        animate={showHint && canHover ? { scale: 1.1, rotate: 3, x: 8 } : { scale: 1, rotate: 0, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          position: 'absolute', right: 14, bottom: 14,
          width: size.emoji, height: size.emoji,
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.35))',
        }}
      />

      {/* Open card content (fixed width so text never reflows while the card animates) */}
      <div
        aria-hidden={!isOpen}
        style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: size.open,
          padding: size.compact ? 18 : 24,
          paddingBottom: size.compact ? 104 : 64,  // compact: details sit above the emoji
          display: 'flex', flexDirection: 'column',
          opacity: isOpen ? 1 : 0,
          transition: `opacity ${isOpen ? '0.35s 0.15s' : '0.15s'} ease`,
          pointerEvents: 'none',
        }}
      >
        {item.current && (
          <span style={{
            alignSelf: 'flex-start',
            fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '3px 9px', borderRadius: 999, marginBottom: 14,
            background: 'var(--accent)', color: '#fff',
          }}>Current</span>
        )}
        <span style={{ fontSize: 34, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 12 }}>
          {startYear(item.period)}
        </span>
        <span className="font-display" style={{ fontSize: size.compact ? 19 : 22, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 6, paddingRight: 8 }}>
          {item.role}
        </span>
        <span style={{ fontSize: 14, lineHeight: 1.4, color: 'rgba(255,255,255,0.85)', paddingRight: 8 }}>
          {item.org}
        </span>

        <div style={{ marginTop: 'auto', maxWidth: size.compact ? '100%' : '60%', whiteSpace: 'nowrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: metaSize, fontWeight: 500, color: 'rgba(255,255,255,0.9)', marginBottom: 6 }}>
            <Calendar size={metaSize - 1} />{item.period}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: metaSize, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
            <MapPin size={metaSize - 1} />{item.location}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, whiteSpace: 'nowrap',
            fontSize: size.compact ? 11 : 12.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
            padding: '8px 15px', borderRadius: 999,
            background: 'rgba(10,10,10,0.55)', border: '1px solid rgba(255,255,255,0.14)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            opacity: showHint ? 1 : 0,
            transform: showHint ? 'translateY(0)' : 'translateY(6px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}>
            Click to learn more
            <motion.span
              animate={showHint ? { x: [0, 5] } : { x: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut', repeat: showHint ? Infinity : 0, repeatType: 'reverse' }}
              style={{ display: 'inline-flex' }}
            >
              <ArrowRight size={13} />
            </motion.span>
          </span>
        </div>
      </div>
    </motion.button>
  )
}

function StackedTimeline({ items, onOpen }) {
  const last = items.length - 1
  const panelRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const drag = useRef({ active: false, moved: false, startX: 0, base: 0, id: null })
  const wheel = useRef({ acc: 0, lockUntil: 0 })
  const intro = useRef({ timer: 0, done: false })
  // Before the intro sweep the oldest role (2017) is open; reduced motion starts on "now"
  const [active, setActive] = useState(() => (prefersReducedMotion() ? 0 : last))
  const [sweeping, setSweeping] = useState(false)
  const [width, setWidth] = useState(1000)
  const [canHover, setCanHover] = useState(() => window.matchMedia('(hover: hover)').matches)

  const size = getSize(width, items.length)
  const { xs, sliver } = getPositions(items.length, active, width, size)
  const duration = sweeping ? 0.14 : 0.55
  const ease = sweeping ? 'linear' : 'cubic-bezier(0.22, 1, 0.36, 1)'

  const stopIntro = () => {
    clearInterval(intro.current.timer)
    intro.current.done = true
    setSweeping(false)
  }

  const goTo = (i, focus = false) => {
    if (!intro.current.done) stopIntro()
    const idx = Math.max(0, Math.min(last, i))
    setActive(idx)
    if (focus) cardRefs.current[idx]?.querySelector('button')?.focus({ preventScroll: true })
  }

  useEffect(() => {
    const el = trackRef.current
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    const mq = window.matchMedia('(hover: hover)')
    const onMq = (e) => setCanHover(e.matches)
    mq.addEventListener('change', onMq)
    return () => { ro.disconnect(); mq.removeEventListener('change', onMq) }
  }, [])

  // Intro: the first time the timeline is seen, sweep quickly from 2017 to now
  useEffect(() => {
    const state = intro.current
    if (prefersReducedMotion()) { state.done = true; return }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || intro.current.done) return
      io.disconnect()
      setSweeping(true)
      // Whole sweep takes about one second
      state.timer = setInterval(() => {
        setActive((a) => {
          if (a <= 1) { clearInterval(state.timer); state.done = true; setTimeout(() => setSweeping(false), 160); return 0 }
          return a - 1
        })
      }, Math.round(1000 / last))
    }, { threshold: 0 })
    // Fires the moment the top edge of the cards scrolls into view
    io.observe(trackRef.current)
    return () => { io.disconnect(); clearInterval(state.timer) }
  }, [last])

  // Horizontal wheel / trackpad swipes step through roles; vertical scrolling always goes to the page
  useEffect(() => {
    const el = trackRef.current
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 1) return
      e.preventDefault()
      const now = performance.now()
      const w = wheel.current
      if (now < w.lockUntil) return
      w.acc += e.deltaX
      if (Math.abs(w.acc) >= WHEEL_STEP) {
        const dir = Math.sign(w.acc)
        w.acc = 0
        w.lockUntil = now + 260
        setActive((a) => Math.max(0, Math.min(last, a + dir)))
        if (!intro.current.done) stopIntro()
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [last])

  // Touch swipe. Handled with native listeners so a horizontal swipe can claim the gesture
  // (preventDefault) while vertical swipes keep scrolling the page.
  const activeRef = useRef(active)
  useEffect(() => { activeRef.current = active }, [active])
  useEffect(() => {
    const el = trackRef.current
    const t = { x: 0, y: 0, base: 0, axis: null }
    const onStart = (e) => {
      if (e.touches.length !== 1) { t.axis = 'none'; return }
      t.x = e.touches[0].clientX
      t.y = e.touches[0].clientY
      t.base = activeRef.current
      t.axis = null
    }
    const onMove = (e) => {
      if (t.axis === 'none' || t.axis === 'y') return
      const dx = e.touches[0].clientX - t.x
      const dy = e.touches[0].clientY - t.y
      if (!t.axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return
        t.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
        if (t.axis === 'y') return
        drag.current.moved = true // the tap that ends this swipe must not open a card
        if (!intro.current.done) stopIntro()
      }
      e.preventDefault()
      const target = Math.max(0, Math.min(last, t.base - Math.round(dx / TOUCH_STEP)))
      if (target !== activeRef.current) { activeRef.current = target; setActive(target) }
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
    }
  }, [last])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1, true) }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(active - 1, true) }
  }

  // Drag / swipe (mouse, pen and touch). touch-action: pan-y keeps vertical page scrolling native.
  const onPointerDown = (e) => {
    if (e.pointerType === 'touch') return // touch is handled by the swipe listeners above
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { active: true, moved: false, startX: e.clientX, base: active, id: e.pointerId }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active || e.pointerId !== d.id) return
    const dx = e.clientX - d.startX
    if (!d.moved && Math.abs(dx) > 8) {
      d.moved = true
      trackRef.current.setPointerCapture?.(e.pointerId)
      trackRef.current.style.cursor = 'grabbing'
    }
    if (d.moved) {
      const target = Math.max(0, Math.min(last, d.base - Math.round(dx / DRAG_STEP)))
      if (target !== active) goTo(target)
    }
  }
  const endDrag = (e) => {
    const d = drag.current
    if (!d.active || (e && e.pointerId !== d.id)) return
    d.active = false
    trackRef.current.style.cursor = ''
  }
  const suppressClick = () => {
    if (drag.current.moved) { drag.current.moved = false; return true }
    return false
  }

  const arrowBtn = (dir, disabled) => (
    <button
      type="button"
      className="focus-ring"
      onClick={() => goTo(active + dir)}
      disabled={disabled}
      aria-label={dir < 0 ? 'Previous role' : 'Next role'}
      style={{
        width: 36, height: 36, borderRadius: 999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.04)',
        color: disabled ? RULER.tick : RULER.marker,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'color 0.2s',
      }}
    >
      {dir < 0 ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    </button>
  )

  const trackHeight = LIFT + size.height + LIFT + RULER_GAP + RULER_H

  return (
    <div ref={panelRef} style={{ background: PANEL_BG, borderRadius: 20, paddingTop: 20, paddingBottom: 16, overflow: 'hidden' }}>
      {/* Counter + arrows */}
      <div className="flex items-center justify-between" style={{ padding: `0 20px 8px ${size.pad}px` }}>
        <span className="font-body tabular-nums" aria-live={sweeping ? 'off' : 'polite'} style={{ fontSize: 11, letterSpacing: '0.02em', color: RULER.label }}>
          {pad2(active + 1)} / {pad2(items.length)}
        </span>
        <div className="flex gap-2">
          {arrowBtn(-1, active === 0)}
          {arrowBtn(1, active === last)}
        </div>
      </div>

      {/* Track: earlier roles stay stacked on the left, later roles wait on the right */}
      <div
        ref={trackRef}
        className="timeline-track"
        role="group"
        aria-label="Work history timeline. Use left and right arrow keys to move between roles."
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onDragStart={(e) => e.preventDefault()}
        style={{ position: 'relative', height: trackHeight, overflow: 'hidden', touchAction: 'pan-y' }}
      >
        {/* Continuous year ruler */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, right: 0, top: LIFT * 2 + size.height + RULER_GAP, height: RULER_H,
          borderTop: `1px solid ${RULER.tick}`,
          backgroundImage: `repeating-linear-gradient(to right, ${RULER.tick} 0 1px, transparent 1px 12px)`,
          backgroundSize: '100% 5px', backgroundRepeat: 'no-repeat',
        }} />

        {items.map((item, i) => {
          const isOpen = i === active
          const showLabel = isOpen || i > active || sliver >= 44
          return (
            <div
              key={item.id}
              ref={el => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute', top: LIFT, left: 0,
                width: isOpen ? size.open : size.shut,
                transform: `translateX(${xs[i]}px)`,
                zIndex: isOpen ? 50 : (i < active ? 10 + i : 40 - i),
                transition: `transform ${duration}s ${ease}, width ${duration}s ${ease}`,
              }}
            >
              <TimelineCard
                item={item}
                isOpen={isOpen}
                size={size}
                canHover={canHover}
                onActivate={() => goTo(i)}
                onOpen={onOpen}
                onKeyboardFocus={() => { if (i !== active) goTo(i) }}
                suppressClick={suppressClick}
              />

              {/* Ruler marker + start year under this card */}
              <div aria-hidden="true" style={{ position: 'relative', marginTop: LIFT + RULER_GAP, height: RULER_H }}>
                <span style={{
                  position: 'absolute', left: 0,
                  top: isOpen ? -16 : 0,
                  width: 1, height: isOpen ? 26 : 10,
                  background: isOpen ? RULER.marker : RULER.label,
                  transition: 'all 0.35s ease',
                }} />
                <span className="font-body tabular-nums" style={{
                  position: 'absolute', left: 0, top: 16, transform: 'translateX(-50%)',
                  fontSize: 11, letterSpacing: '0.02em',
                  color: isOpen ? RULER.marker : RULER.label,
                  opacity: showLabel ? 1 : 0,
                  transition: 'color 0.35s ease, opacity 0.25s ease',
                }}>
                  {startYear(item.period)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Detail modal ────────────────────────────────────────── */
function ExperienceModal({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const relatedItems = (item.relatedWork || [])
    .map(id => allPortfolioItems[id])
    .filter(Boolean)

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60" style={{ backdropFilter: 'blur(8px)' }} onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={{
          background: 'rgba(22,22,22,0.96)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
        }}
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <button onClick={onClose} aria-label="Close"
          className="focus-ring absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
          <X size={14} />
        </button>

        {item.current && (
          <span style={{
            display: 'inline-block', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '2px 8px', borderRadius: 999, background: 'var(--accent)', color: '#fff', marginBottom: 12,
          }}>Current role</span>
        )}

        <h3 className="font-display font-bold" style={{ fontSize: '1.5rem', letterSpacing: '-0.02em', color: 'var(--color-content)', marginBottom: 4, paddingRight: 32 }}>
          {item.org}
        </h3>
        <p className="font-body" style={{ color: 'var(--color-muted)', fontSize: 14, marginBottom: 4 }}>{item.role}</p>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--color-faint)', fontFamily: 'Inter', marginBottom: 20 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} />{item.period}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} />{item.location}</span>
        </div>

        <div style={{ height: 1, background: 'var(--color-stroke)', marginBottom: 20 }} />

        {item.showMetrics && (
          <>
            <Metrics />
            <div style={{ height: 1, background: 'var(--color-stroke)', margin: '24px 0 20px' }} />
          </>
        )}

        <p className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)', marginBottom: 12 }}>
          Key highlights
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {item.highlights.map((h, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--color-muted)', lineHeight: 1.55, fontFamily: 'Inter' }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'var(--accent)', flexShrink: 0, marginTop: 8,
              }} />
              {h}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 11, fontFamily: 'Inter', padding: '3px 10px',
              borderRadius: 999, background: 'var(--color-elevated)',
              color: 'var(--color-faint)', border: '1px solid var(--color-stroke)',
            }}>{tag}</span>
          ))}
        </div>

        {/* Skills and tools */}
        {item.skills?.length > 0 && (
          <div style={{ marginBottom: relatedItems.length ? 24 : 0 }}>
            <p className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)', marginBottom: 12 }}>
              Skills and tools
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.skills.map(skill => (
                <span key={skill} className="text-xs font-body px-2.5 py-1 rounded-full"
                  style={{ background: 'var(--color-elevated)', color: 'var(--color-muted)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related work */}
        {relatedItems.length > 0 && (
          <>
            <div style={{ height: 1, background: 'var(--color-stroke)', marginBottom: 20 }} />
            <p className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)', marginBottom: 12 }}>
              Selected work from this role
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedItems.map(workItem => {
                const thumb = getItemThumbnail(workItem)
                const gradient = ITEM_GRADIENT[workItem.id] || 'linear-gradient(135deg, rgba(91,156,196,0.3), rgba(99,102,241,0.3))'
                return (
                  <button
                    key={workItem.id}
                    onClick={() => {
                      onClose()
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('openPortfolioItem', { detail: { itemId: workItem.id } }))
                      }, 320)
                    }}
                    className="text-left group"
                    style={{
                      borderRadius: 12,
                      overflow: 'hidden',
                      border: '1px solid var(--color-stroke)',
                      background: 'var(--color-surface)',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(91,156,196,0.35)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-stroke)'}
                  >
                    {/* Thumbnail */}
                    <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: gradient }}>
                      {thumb && (
                        <img src={thumb} alt="" style={{
                          position: 'absolute', inset: 0, width: '100%', height: '100%',
                          objectFit: 'cover', opacity: 0.85,
                        }} />
                      )}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                      }} />
                      <ArrowRight size={12} style={{
                        position: 'absolute', bottom: 8, right: 8,
                        color: 'rgba(255,255,255,0.6)',
                      }} />
                    </div>
                    {/* Label */}
                    <div style={{ padding: '8px 10px' }}>
                      <p className="font-body font-semibold" style={{ fontSize: 11, color: 'var(--color-content)', lineHeight: 1.3 }}>
                        {workItem.title}
                      </p>
                      <p className="font-body" style={{ fontSize: 10, color: 'var(--color-faint)', marginTop: 2 }}>
                        {workItem.platform}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Main section ────────────────────────────────────────── */
export default function Experience() {
  const [activeItem, setActiveItem] = useState(null)

  return (
    <section id="experience" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Experience
          </p>
          <h2 className="heading-lg mb-12" style={{ color: 'var(--color-content)' }}>
            Work history
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <StackedTimeline items={timeline} onOpen={setActiveItem} />
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {activeItem && (
          <ExperienceModal item={activeItem} onClose={() => setActiveItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
