import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Metrics from './components/sections/Metrics'
import Portfolio from './components/sections/Portfolio'
import Experience from './components/sections/Experience'
import Education, { EducationCompact } from './components/sections/Education'
import Skills from './components/sections/Skills'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

/* ── Page transition wrapper ─────────────────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0,        transition: { duration: 0.2, ease: 'easeIn'  } },
}

function PageWrapper({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

/* ── Scroll to top on route change ───────────────────────── */
function ScrollReset() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return null
}

/* ── Pages ───────────────────────────────────────────────── */
function ProfessionalPage() {
  return (
    <PageWrapper>
      <Hero />
      <Metrics />
      <Portfolio />
      <Experience />
      <EducationCompact />
      <Skills />
    </PageWrapper>
  )
}

function AboutPage() {
  return (
    <PageWrapper>
      <About />
      <Education />
      <Contact />
    </PageWrapper>
  )
}

/* ── Animated routes ─────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"      element={<ProfessionalPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*"      element={<ProfessionalPage />} />
      </Routes>
    </AnimatePresence>
  )
}

/* ── Root app ────────────────────────────────────────────── */
export default function App() {
  return (
    <HashRouter>
      <ScrollReset />
      <div className="min-h-screen" style={{ background: 'var(--color-canvas)' }}>
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
