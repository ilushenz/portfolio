import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Metrics from './components/sections/Metrics'
import About from './components/sections/About'
import Portfolio from './components/sections/Portfolio'
import CaseStudies from './components/sections/CaseStudies'
import Timeline from './components/sections/Timeline'
import Education from './components/sections/Education'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-neu-bg">
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Portfolio />
        <CaseStudies />
        <About />
        <Timeline />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
