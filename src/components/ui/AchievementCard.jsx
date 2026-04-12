import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'

export default function AchievementCard({ achievement, index }) {
  const { value, prefix = '', suffix = '', label, sub, icon } = achievement

  return (
    <motion.div
      className="relative rounded-2xl shadow-neu p-6 bg-neu-bg overflow-hidden group"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.07 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Aurora border top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)' }}
      />

      {/* Unlock icon */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span
          className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full text-white"
          style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
        >
          Achievement Unlocked
        </span>
      </div>

      {/* Counter */}
      <div
        className="text-4xl font-black font-body mb-1 text-aurora"
        style={{
          background: 'linear-gradient(135deg, #4158D0, #C850C0, #FFCC70)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} duration={1600} />
      </div>

      <div className="font-semibold text-ink-primary text-sm mb-1">{label}</div>
      <div className="text-xs text-ink-muted">{sub}</div>
    </motion.div>
  )
}
