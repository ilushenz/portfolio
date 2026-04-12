import { motion } from 'framer-motion'

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
