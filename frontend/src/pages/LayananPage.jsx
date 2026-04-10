import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionReveal, StaggerGroup, StaggerItem } from '../components/animation/Reveal'
import LazyImage from '../components/ui/LazyImage'
import { getWordPressPageBySlugs, isWordPressConfiguredForPages } from '../data/wordpressPages'
import { pickLinkField, pickTextField } from '../data/wpUiFields'

const PRIMARY_SERVICE_PACKAGES = [
  {
    id: '01',
    title: 'Booth Exhibition',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80',
    imageAlt: 'Booth exhibition modern dengan pengunjung aktif.',
    shortDescription:
      'Kami merancang booth pameran dari konsep visual, alur interaksi, hingga eksekusi lapangan agar brand tampil menonjol dan mudah diingat.',
    cards: [
      {
        title: 'Concept & 3D Design',
        description: 'Layout booth dirancang berdasarkan target audiens, jalur traffic, dan narasi brand.',
      },
      {
        title: 'Fabrication & Finishing',
        description: 'Produksi material dan finishing detail dilakukan in-house untuk kualitas konsisten.',
      },
      {
        title: 'On-site Setup',
        description: 'Instalasi, pengujian teknis, dan handover dilakukan sebelum event dimulai.',
      },
    ],
  },
  {
    id: '02',
    title: 'Event Organizer',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80',
    imageAlt: 'Suasana event activation dengan panggung dan audiens.',
    shortDescription:
      'Tim event kami menangani creative direction, produksi acara, hingga koordinasi lapangan agar momen brand berjalan rapi dan impactful.',
    cards: [
      {
        title: 'Creative Direction',
        description: 'Menyusun konsep acara, visual tone, dan storyline sesuai objektif campaign.',
      },
      {
        title: 'Run of Show & Crew',
        description: 'Mengatur rundown rinci, technical cue, dan koordinasi seluruh tim produksi.',
      },
      {
        title: 'Audience Experience',
        description: 'Mendesain touchpoint interaktif agar audiens terlibat aktif sepanjang acara.',
      },
    ],
  },
  {
    id: '03',
    title: 'Outdoor Media',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=1800&q=80',
    imageAlt: 'Pemandangan kota sebagai konteks media outdoor billboard.',
    shortDescription:
      'Layanan outdoor media Trimitra mengutamakan penempatan strategis dan desain visual singkat agar pesan brand terbaca cepat di jalur utama.',
    cards: [
      {
        title: 'Spot Strategy',
        description: 'Pemilihan titik berdasarkan pergerakan kendaraan dan profil audiens per area.',
      },
      {
        title: 'Visual Adaptation',
        description: 'Desain materi disesuaikan untuk durasi lihat singkat dengan hierarki pesan jelas.',
      },
      {
        title: 'Installation & Monitoring',
        description: 'Tim memastikan pemasangan rapi dan performa eksposur tetap terjaga selama tayang.',
      },
    ],
  },
]

function CountUpNumber({ value, suffix = '', duration = 1300 }) {
  const prefersReducedMotion = useReducedMotion()
  const anchorRef = useRef(null)
  const rafRef = useRef(0)
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const node = anchorRef.current
    if (!node) return undefined

    let hasStarted = false

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasStarted) return

          hasStarted = true
          const startedAt = performance.now()

          const tick = (now) => {
            const progress = Math.min((now - startedAt) / duration, 1)
            const eased = 1 - (1 - progress) ** 3
            setDisplayValue(Math.round(value * eased))

            if (progress < 1) {
              rafRef.current = requestAnimationFrame(tick)
            }
          }

          rafRef.current = requestAnimationFrame(tick)
          observer.disconnect()
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [duration, prefersReducedMotion, value])

  const shownValue = prefersReducedMotion ? value : displayValue

  return (
    <span ref={anchorRef}>
      {shownValue}
      {suffix}
    </span>
  )
}

function LayananPage() {
  const prefersReducedMotion = useReducedMotion()
  const [wpPage, setWpPage] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadPageFromWordPress() {
      if (!isWordPressConfiguredForPages()) return
      try {
        const page = await getWordPressPageBySlugs(['produk-jasa', 'layanan', 'services'])
        if (!cancelled && page) {
          setWpPage(page)
        }
      } catch {
        // Keep existing fallback layout.
      }
    }

    loadPageFromWordPress()
    return () => {
      cancelled = true
    }
  }, [])

  const uiFields = wpPage ? { ...(wpPage.meta || {}), ...(wpPage.acf || {}) } : {}

  const pageKicker = pickTextField(uiFields, ['page_kicker', 'services_kicker'], 'Produk & Jasa')
  const pageTitle = pickTextField(uiFields, ['hero_title', 'services_title'], wpPage?.title || 'Solusi Produk & Jasa Trimitra')
  const pageCopy = pickTextField(
    uiFields,
    ['hero_copy', 'services_copy'],
    'Kami merancang, memproduksi, dan mengeksekusi pengalaman brand dari billboard, event, hingga booth pameran dengan standar premium.',
  )
  const ctaTitle = pickTextField(uiFields, ['cta_title', 'services_cta_title'], 'Siap scale-up campaign brand Anda?')
  const ctaCopy = pickTextField(
    uiFields,
    ['cta_copy', 'services_cta_copy'],
    'Tim Trimitra siap membantu dari konsep awal sampai eksekusi akhir dengan ritme kerja yang cepat dan presisi.',
  )
  const ctaPrimaryLabel = pickTextField(uiFields, ['cta_primary_label'], 'Mulai Konsultasi')
  const ctaPrimaryLink = pickLinkField(uiFields, ['cta_primary_link'], '/kontak-kami')
  const ctaSecondaryLabel = pickTextField(uiFields, ['cta_secondary_label'], 'Lihat Portofolio')
  const ctaSecondaryLink = pickLinkField(uiFields, ['cta_secondary_link'], '/galeri')

  return (
    <>
      <SectionReveal className="section services-redesign-hero">
        <div className="services-redesign-hero-ambient" aria-hidden="true">
          <span className="services-redesign-orb orb-a" />
          <span className="services-redesign-orb orb-b" />
          <span className="services-redesign-orb orb-c" />
        </div>
        <div className="container services-redesign-hero-grid">
          <div className="services-redesign-hero-copy">
            <p className="kicker">{pageKicker}</p>
            <h1 className="services-redesign-title">{pageTitle}</h1>
            <p className="muted services-redesign-description">{pageCopy}</p>

            <div className="services-redesign-tags">
              <span>Billboard</span>
              <span>Event Organizer</span>
              <span>Booth Pameran</span>
            </div>
          </div>

          <StaggerGroup className="services-redesign-metrics" once amount={0.35}>
            <StaggerItem>
              <article className="services-redesign-metric-card">
                <h3>
                  <CountUpNumber value={420} suffix="+" />
                </h3>
                <p>Titik Aktivasi Outdoor</p>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="services-redesign-metric-card">
                <h3>
                  <CountUpNumber value={17} />
                </h3>
                <p>Kota Cakupan Proyek</p>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="services-redesign-metric-card">
                <h3>
                  <CountUpNumber value={96} suffix="%" />
                </h3>
                <p>On-Time Delivery Rate</p>
              </article>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal className="section services-redesign-catalog">
        <div className="container services-spotlight-shell">
          <div className="services-redesign-head">
            <p className="kicker">Paket Produk & Jasa</p>
            <h2 className="services-redesign-head-title">
              <span>3 layanan utama</span>
              <img
                src="/logo-trimitra.webp"
                alt="Logo Trimitra"
                className="services-redesign-head-logo"
                loading="lazy"
                decoding="async"
              />
            </h2>
            <p className="muted services-spotlight-copy">
              Setiap layanan disusun dengan alur kerja yang jelas, mulai dari strategi, produksi, sampai eksekusi lapangan.
            </p>
          </div>

          <div className="services-main-flow" aria-label="Tiga layanan utama Trimitra">
            {PRIMARY_SERVICE_PACKAGES.map((service, index) => {
              const isReversed = index % 2 === 1

              return (
                <motion.article
                  key={service.id}
                  className={`services-main-item ${isReversed ? 'is-reversed' : ''}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 34 }}
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } }
                  }
                  viewport={{ once: true, amount: 0.22 }}
                >
                  <figure className="services-main-media">
                    <LazyImage src={service.image} alt={service.imageAlt} className="services-main-media-image" />
                    <span className="services-main-media-glow" aria-hidden="true" />
                  </figure>

                  <div className="services-main-content">
                    <p className="services-main-id">Layanan {service.id}</p>
                    <h3>{service.title}</h3>
                    <p className="muted services-main-description">{service.shortDescription}</p>

                    <div className="services-main-card-grid">
                      {service.cards.map((card) => (
                        <article key={card.title} className="services-main-card">
                          <h4>{card.title}</h4>
                          <p>{card.description}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="section services-redesign-cta">
        <div className="container services-redesign-cta-shell">
          <p className="kicker">Start Your Project</p>
          <h2>{ctaTitle}</h2>
          <p className="muted services-redesign-cta-copy">{ctaCopy}</p>
          <div className="services-redesign-cta-actions">
            <Link className="btn" to={ctaPrimaryLink}>{ctaPrimaryLabel}</Link>
            <Link className="btn outline" to={ctaSecondaryLink}>{ctaSecondaryLabel}</Link>
          </div>
        </div>
      </SectionReveal>

      {wpPage?.contentHtml ? (
        <SectionReveal className="section cms-page-shell">
          <div className="container">
            <article className="blog-detail-content cms-page-content" dangerouslySetInnerHTML={{ __html: wpPage.contentHtml }} />
          </div>
        </SectionReveal>
      ) : null}
    </>
  )
}

export default LayananPage
