import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionReveal } from '../animation/Reveal'
import LazyImage from './LazyImage'

const SERVICES = [
  {
    tag: 'Design & Planning',
    title: 'Desain Arsitektur',
    description:
      'Perencanaan struktural ikonik dengan pendekatan fungsi, estetika, dan efisiensi ruang yang menyatu.',
    image: 'https://picsum.photos/seed/service-arch/1400/1000',
    cta: '/layanan',
  },
  {
    tag: 'Spatial Experience',
    title: 'Desain Interior',
    description:
      'Kurasi material, pencahayaan, dan komposisi detail untuk menghadirkan atmosfer ruang yang kuat dan berkarakter.',
    image: 'https://picsum.photos/seed/service-interior/1400/1000',
    cta: '/layanan',
  },
  {
    tag: 'Build Execution',
    title: 'Manajemen Konstruksi',
    description:
      'Kontrol kualitas dan manajemen timeline dari groundbreaking hingga handover untuk hasil yang presisi.',
    image: 'https://picsum.photos/seed/service-build/1400/1000',
    cta: '/kontak-kami',
  },
]

const trackVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function ServiceShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  const activate = (index) => setActiveIndex(index)

  return (
    <SectionReveal className="section service-showcase-section">
      <div className="container service-showcase-container">
        <div className="service-showcase-head">
          <p className="kicker">Layanan Kami</p>
          <h2 className="service-showcase-title">Layanan Konstruksi & Kreatif</h2>
          <p className="muted">
            Dari sketsa pertama hingga serah terima kunci, kami mendampingi setiap
            langkah pembangunan impian Anda.
          </p>
        </div>

        <motion.div
          className="service-showcase-track"
          variants={trackVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.2 }}
        >
          {SERVICES.map((service, index) => {
            const isActive = activeIndex === index
            return (
              <motion.article
                key={service.title}
                className={`service-showcase-card ${isActive ? 'is-active' : ''}`}
                variants={cardVariants}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        flex: isActive ? 1.65 : 1,
                      }
                }
                transition={{
                  type: 'spring',
                  stiffness: 170,
                  damping: 24,
                  mass: 0.9,
                }}
                role="button"
                tabIndex={0}
                aria-label={`${service.title} detail layanan`}
                onMouseEnter={() => activate(index)}
                onFocus={() => activate(index)}
                onClick={() => activate(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    activate(index)
                  }
                }}
              >
                <LazyImage
                  src={service.image}
                  alt={service.title}
                  wrapperClassName="service-showcase-image-wrap"
                  className="service-showcase-image"
                />
                <span className="service-showcase-accent" aria-hidden="true" />

                <motion.div
                  className="service-showcase-content"
                  initial={false}
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1, y: 0 }
                      : {
                          opacity: isActive ? 1 : 0.9,
                          y: isActive ? 0 : 8,
                        }
                  }
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="service-showcase-tag">{service.tag}</p>
                  <h3>{service.title}</h3>
                  <p className="service-showcase-description">{service.description}</p>
                  <motion.div
                    className="service-showcase-cta"
                    initial={false}
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : {
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 8,
                          }
                    }
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    style={{ pointerEvents: isActive ? 'auto' : 'none' }}
                  >
                    <Link className="btn" to={service.cta}>Konsultasi Layanan</Link>
                  </motion.div>
                </motion.div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </SectionReveal>
  )
}

export default ServiceShowcaseSection
