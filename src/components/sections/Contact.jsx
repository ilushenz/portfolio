import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { LinkedInIcon, InstagramIcon } from '../ui/SocialIcons'
import ScrollReveal from '../ui/ScrollReveal'
import { hero } from '../../data/content'

// ─────────────────────────────────────────────────────────────
// Replace this URL with your deployed Google Apps Script Web App URL.
// Deploy instructions are in gas-contact.js (root of the project).
// ─────────────────────────────────────────────────────────────
const GAS_URL = import.meta.env.VITE_GAS_URL || 'https://script.google.com/macros/s/AKfycbzesd8zH1lj4NLFpq5W2of1sIUqA6f_IblpyfjfMDyzjo9Dl9wyo-u3yRQ6jBfYujmo/exec'

const socials = [
  { label: 'LinkedIn',  href: hero.linkedin,           Icon: LinkedInIcon },
  { label: 'Instagram', href: hero.instagram,           Icon: InstagramIcon },
  { label: 'Email',     href: `mailto:${hero.email}`,  Icon: Mail },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!GAS_URL) {
      // No GAS URL configured — open mailto as fallback
      window.location.href = `mailto:${hero.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`
      return
    }
    setStatus('sending')
    try {
      await fetch(GAS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    background: 'var(--color-elevated)',
    border: '1px solid var(--color-stroke)',
    color: 'var(--color-content)',
    borderRadius: 12,
    padding: '12px 14px',
    width: '100%',
    fontSize: 14,
    fontFamily: 'Inter, system-ui, sans-serif',
    outline: 'none',
    transition: 'border-color 0.15s',
  }

  return (
    <section id="contact" className="section-pad">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <p className="text-xs font-body font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-faint)' }}>
            Contact
          </p>
          <h2 className="heading-lg mb-4" style={{ color: 'var(--color-content)' }}>
            Let's work together.
          </h2>
          <p className="font-body text-base mb-12 max-w-lg" style={{ color: 'var(--color-muted)' }}>
            Open to full-time roles, freelance projects, and creative collaborations.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Form */}
          <ScrollReveal className="md:col-span-2">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center gap-4 py-20 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle size={40} style={{ color: 'var(--accent)' }} />
                  <h3 className="font-display font-bold text-xl" style={{ color: 'var(--color-content)' }}>
                    Message sent!
                  </h3>
                  <p className="font-body text-sm" style={{ color: 'var(--color-muted)' }}>
                    I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="font-body text-sm mt-2 underline underline-offset-4"
                    style={{ color: 'var(--color-faint)' }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs mb-1.5" style={{ color: 'var(--color-faint)' }}>Name</label>
                      <input
                        name="name" value={form.name} onChange={handleChange} required
                        placeholder="Your name"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--color-stroke)' }}
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs mb-1.5" style={{ color: 'var(--color-faint)' }}>Email</label>
                      <input
                        name="email" type="email" value={form.email} onChange={handleChange} required
                        placeholder="your@email.com"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--color-stroke)' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-xs mb-1.5" style={{ color: 'var(--color-faint)' }}>Subject</label>
                    <input
                      name="subject" value={form.subject} onChange={handleChange} required
                      placeholder="What's this about?"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--color-stroke)' }}
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs mb-1.5" style={{ color: 'var(--color-faint)' }}>Message</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required
                      rows={5} placeholder="Tell me about the opportunity..."
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--color-stroke)' }}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-sm font-body" style={{ color: '#ff6b6b' }}>
                      <AlertCircle size={14} /> Something went wrong. Try emailing directly.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center justify-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-xl text-white"
                    style={{ background: 'var(--accent)', opacity: status === 'sending' ? 0.7 : 1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={14} />
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-px" style={{ background: 'var(--color-stroke)' }}>
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== 'Email' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 transition-colors"
                  style={{ background: 'var(--color-canvas)', color: 'var(--color-muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-content)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-canvas)'; e.currentTarget.style.color = 'var(--color-muted)' }}
                >
                  <Icon size={15} />
                  <span className="font-body text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>

            <div className="mt-6">
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 font-body font-semibold text-sm px-5 py-2.5 rounded-xl border w-full"
                style={{ color: 'var(--color-content)', borderColor: 'var(--color-stroke)' }}
              >
                Download Resume
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
