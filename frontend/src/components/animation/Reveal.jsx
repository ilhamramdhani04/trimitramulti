import { motion, useReducedMotion } from 'framer-motion'

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 72,
    scale: 0.96,
    filter: 'blur(12px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const groupVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.97,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function SectionReveal({ children, className = '', style }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      className={className}
      style={style}
      variants={sectionVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'show'}
      viewport={{ once: true, amount: 0.18 }}
      data-gsap-section
    >
      {children}
    </motion.section>
  )
}

export function StaggerGroup({ children, className = '', style, once = false, amount = 0.2 }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      style={style}
      variants={groupVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'show'}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', style }) {
  return (
    <motion.div className={className} style={style} variants={itemVariants} data-gsap-float>
      {children}
    </motion.div>
  )
}
