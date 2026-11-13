import { Mail } from 'lucide-react'
import { LinkedInIcon, InstagramIcon } from '../ui/SocialIcons'
import { hero } from '../../data/content'

const socials = [
  { label: 'LinkedIn', href: hero.linkedin, Icon: LinkedInIcon },
  { label: 'Instagram', href: hero.instagram, Icon: InstagramIcon },
  { label: 'Email', href: `mailto:${hero.email}`, Icon: Mail },
]

export default function Footer() {
  return (
    <footer
      className="site-footer px-6 border-t"
      style={{ borderColor: 'var(--color-stroke)' }}
    >
      <div className="site-footer-row max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-body text-xs" style={{ color: 'var(--color-faint)' }}>
          © {new Date().getFullYear()} Ilia Chapchakhov
        </span>
        <div className="flex items-center gap-1">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="focus-ring w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200"
              style={{ color: 'var(--accent)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-content)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
