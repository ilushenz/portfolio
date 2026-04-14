import { useState, useEffect, createContext, useContext } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Metrics from './components/sections/Metrics'
import About from './components/sections/About'
import Portfolio from './components/sections/Portfolio'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

export const ThemeContext = createContext(null)
export const useTheme = () => useContext(ThemeContext)

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className="min-h-screen bg-canvas transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Metrics />
          <About />
          <Portfolio />
          <Experience />
          <Education />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}
