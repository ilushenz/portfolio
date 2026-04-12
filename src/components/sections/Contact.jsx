import ScrollReveal from '../ui/ScrollReveal'
import { hero } from '../../data/content'
import { motion } from 'framer-motion'

const auroraStyle = {
  background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const links = [
  { label: 'Email', value: 'i.chapchakhov@gmail.com', href: `mailto:${hero.email}`, icon: '📬' },
  { label: 'LinkedIn', value: 'linkedin.com/in/ilushenz', href: hero.linkedin, icon: '💼' },
  { label: 'Instagram', value: '@ilushenz', href: hero.instagram, icon: '📸' },
]

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <div className="text-5xl mb-6">👋</div>
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary mb-4 leading-tight">
            I Can Make Your Brand{' '}
            <span style={auroraStyle}>Relatable.</span>
          </h2>
          <p className="font-body text-ink-muted text-lg max-w-lg mx-auto mb-12">
            Open to full-time roles, freelance projects, and interesting conversations.
            Available in English, Russian, and French.
          </p>
        </ScrollReveal>

        {/* Contact links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          {links.map((link, i) => (
            <ScrollReveal key={link.label} delay={i * 0.1}>
              <motion.a
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-neu font-body text-sm font-medium text-ink-primary transition-transform"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-xl">{link.icon}</span>
                <div className="text-left">
                  <div className="text-xs text-ink-faint">{link.label}</div>
                  <div className="text-ink-primary font-semibold">{link.value}</div>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <a
            href={hero.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold font-body text-sm transition-transform hover:scale-105 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
          >
            📄 Download Resume
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
