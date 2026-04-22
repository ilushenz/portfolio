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
      className="py-8 px-6 border-t"
      style={{ borderColor: 'var(--color-stroke)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="font-body text-xs" style={{ color: 'var(--color-faint)' }}>
          © {new Date().getFullYear()} Ilia Chapchakhov
        </span>
        <div className="flex items-center gap-5">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="transition-colors duration-200"
              style={{ color: 'var(--accent)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-content)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--accent)' }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
