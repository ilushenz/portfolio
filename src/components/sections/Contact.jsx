import { motion } from 'framer-motion'
import { Mail, FileText } from 'lucide-react'
import { LinkedInIcon, InstagramIcon } from '../ui/SocialIcons'
import ScrollReveal from '../ui/ScrollReveal'
import { hero } from '../../data/content'

const links = [
  { label: 'Email', value: 'i.chapchakhov@gmail.com', href: `mailto:${hero.email}`, Icon: Mail },
  { label: 'LinkedIn', value: 'linkedin.com/in/ilushenz', href: hero.linkedin, Icon: LinkedInIcon },
  { label: 'Instagram', value: '@ilushenz', href: hero.instagram, Icon: InstagramIcon },
]

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Contact
          </p>
          <h2 className="heading-xl mb-4" style={{ color: 'var(--color-content)' }}>
            I can make your brand{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              relatable.
            </span>
          </h2>
          <p className="font-body font-light text-lg mb-16 max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Open to full-time roles, freelance projects, and interesting conversations.
            Available in English, Russian, and French.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-px mb-12" style={{ background: 'var(--color-stroke)' }}>
          {links.map(({ label, value, href, Icon }, i) => (
            <ScrollReveal key={label} delay={i * 0.08}>
              <motion.a
                href={href}
                target={label !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                className="flex flex-col gap-2 p-6 transition-colors duration-200"
                style={{ background: 'var(--color-canvas)', color: 'var(--color-content)' }}
                whileHover={{ background: 'var(--color-surface)' }}
              >
                <Icon size={18} style={{ color: 'var(--color-muted)' }} />
                <div>
                  <div className="font-body text-xs mb-0.5" style={{ color: 'var(--color-faint)' }}>{label}</div>
                  <div className="font-body font-semibold text-sm" style={{ color: 'var(--color-content)' }}>{value}</div>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.25}>
          <a
            href={hero.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold font-body text-sm"
            style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            <FileText size={15} />
            Download Resume
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
