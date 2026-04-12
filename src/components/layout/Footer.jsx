import { hero } from '../../data/content'

export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-neu-dark/20">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-body text-ink-faint">
        <span>© {new Date().getFullYear()} Ilia Chapchakhov. Built with React.</span>
        <div className="flex gap-4">
          <a href={hero.linkedin} target="_blank" rel="noreferrer" className="hover:text-ink-primary transition-colors">
            LinkedIn
          </a>
          <a href={hero.instagram} target="_blank" rel="noreferrer" className="hover:text-ink-primary transition-colors">
            Instagram
          </a>
          <a href={`mailto:${hero.email}`} className="hover:text-ink-primary transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
