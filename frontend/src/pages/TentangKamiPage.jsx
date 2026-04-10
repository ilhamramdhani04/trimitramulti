import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SectionReveal, StaggerGroup, StaggerItem } from '../components/animation/Reveal'
import LazyImage from '../components/ui/LazyImage'
import JourneyTimelineSection from '../components/ui/JourneyTimelineSection'
import { getWordPressPageBySlugs, isWordPressConfiguredForPages } from '../data/wordpressPages'
import { pickLinkField, pickTextField } from '../data/wpUiFields'

const ABOUT_VALUES = [
  {
    id: '01',
    title: 'Profesionalisme',
    description: 'Tim kami bekerja dengan ritme terukur, komunikasi jelas, dan eksekusi yang konsisten di setiap fase.',
  },
  {
    id: '02',
    title: 'Kreativitas',
    description: 'Setiap brief diterjemahkan menjadi ide visual yang relevan, segar, dan tetap realistis untuk produksi.',
  },
  {
    id: '03',
    title: 'Kualitas',
    description: 'Detail material, finishing, dan kontrol lapangan kami jaga ketat agar hasil akhir tampil premium.',
  },
]

const STORY_METRICS = [
  { value: 350, suffix: '+', label: 'Proyek Selesai' },
  { value: 12, suffix: '', label: 'Penghargaan Global' },
]

function CountUpNumber({ value, suffix = '', duration = 1250 }) {
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

function TentangKamiPage() {
  const [wpPage, setWpPage] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadPageFromWordPress() {
      if (!isWordPressConfiguredForPages()) return
      try {
        const page = await getWordPressPageBySlugs(['tentang-kami', 'about-us', 'about'])
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

  if (wpPage) {
    const uiFields = { ...(wpPage.meta || {}), ...(wpPage.acf || {}) }
    const pageKicker = pickTextField(uiFields, ['page_kicker', 'about_kicker'], 'Tentang Kami')
    const ctaTitle = pickTextField(uiFields, ['cta_title', 'about_cta_title'], 'Mulai Proyek Anda')
    const ctaCopy = pickTextField(uiFields, ['cta_copy', 'about_cta_copy'], 'Rasakan perpaduan antara arsitektur dan emosi.')
    const ctaPrimaryLabel = pickTextField(uiFields, ['cta_primary_label'], 'Pesan Konsultasi')
    const ctaPrimaryLink = pickLinkField(uiFields, ['cta_primary_link'], '/kontak-kami')
    const ctaSecondaryLabel = pickTextField(uiFields, ['cta_secondary_label'], 'Lihat Portofolio')
    const ctaSecondaryLink = pickLinkField(uiFields, ['cta_secondary_link'], '/galeri')

    return (
      <>
        <SectionReveal className="section cms-page-shell">
          <div className="container">
            <p className="kicker">{pageKicker}</p>
            <h1 className="section-title">{wpPage.title}</h1>
            {wpPage.image && (
              <div className="blog-detail-image-wrap" style={{ marginTop: 18, marginBottom: 22 }}>
                <LazyImage
                  src={wpPage.image}
                  alt={wpPage.title}
                  className="blog-detail-image"
                />
              </div>
            )}
            <article className="blog-detail-content cms-page-content" dangerouslySetInnerHTML={{ __html: wpPage.contentHtml }} />
          </div>
        </SectionReveal>

        <JourneyTimelineSection />

        <SectionReveal className="dark-cta">
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontSize: 54, lineHeight: 1 }}>{ctaTitle}</h2>
              <p className="muted" style={{ color: '#cbc7b8' }}>{ctaCopy}</p>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link className="btn" to={ctaPrimaryLink}>{ctaPrimaryLabel}</Link>
              <Link className="btn outline" to={ctaSecondaryLink} style={{ color: '#f3f1e9', borderColor: '#66665d' }}>
                {ctaSecondaryLabel}
              </Link>
            </div>
          </div>
        </SectionReveal>
      </>
    )
  }

  return (
    <>
      <SectionReveal className="about-hero">
        <LazyImage
          className="home-hero-bg"
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"
          alt="Tim Trimitra menyiapkan area exhibition untuk peluncuran brand"
          data-gsap-parallax
        />
        <div className="container about-hero-copy">
          <p className="kicker">Tentang Kami</p>
          <h1 className="section-title">Membentuk Ruang. Mendefinisikan Waktu.</h1>
        </div>
      </SectionReveal>

      <SectionReveal className="section about-story-section">
        <div className="container story-wrap">
          <div className="story-visual">
            <LazyImage
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80"
              alt="Sesi perencanaan proyek Trimitra dengan dokumen dan perangkat kerja"
              className="story-visual-image"
            />
            <div className="story-visual-overlay" aria-hidden="true" />
            <div className="story-visual-badge" aria-hidden="true">
              <span>Since</span>
              <strong>2009</strong>
            </div>
          </div>

          <div className="story-content">
            <p className="kicker">Perjalanan Kami</p>
            <h2 className="story-title">Kisah Kami</h2>
            <p className="muted story-copy">
              Didirikan di Jakarta, PT Trimitra Multi Kreasi telah menghabiskan lebih dari 15 tahun menjembatani ide kreatif
              dengan presisi teknis di lapangan.
            </p>
            <p className="muted story-copy">
              Kami tidak hanya membangun struktur, tetapi merancang pengalaman brand yang relevan, terukur, dan siap tumbuh
              bersama bisnis klien.
            </p>

            <StaggerGroup className="story-metrics" once amount={0.34}>
              {STORY_METRICS.map((metric) => (
                <StaggerItem key={metric.label}>
                  <article className="story-metric-card">
                    <h3>
                      <CountUpNumber value={metric.value} suffix={metric.suffix} />
                    </h3>
                    <p>{metric.label}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="section values-strip">
        <div className="container">
          <div className="values-simple-head">
            <p className="kicker">Prinsip Utama</p>
            <h2 className="values-simple-title">Nilai-Nilai Kami</h2>
            <p className="muted values-simple-copy">
              Tiga prinsip inti yang menjaga standar kerja Trimitra tetap presisi, kreatif, dan dapat diandalkan.
            </p>
          </div>

          <div className="values-simple-ribbon" aria-hidden="true">
            <svg className="values-simple-ribbon-svg" viewBox="0 0 1000 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="valuesRibbonBase" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--svg-ribbon-base-start)" />
                  <stop offset="55%" stopColor="var(--svg-ribbon-base-mid)" />
                  <stop offset="100%" stopColor="var(--svg-ribbon-base-end)" />
                </linearGradient>
                <linearGradient id="valuesRibbonGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--svg-ribbon-glow-start)" />
                  <stop offset="40%" stopColor="var(--svg-ribbon-glow-mid)" />
                  <stop offset="100%" stopColor="var(--svg-ribbon-glow-end)" />
                </linearGradient>
              </defs>
              <path
                className="values-simple-ribbon-back"
                d="M 52 116 C 210 30, 334 164, 502 94 C 650 34, 782 150, 948 78"
              />
              <path
                className="values-simple-ribbon-front"
                d="M 52 116 C 210 30, 334 164, 502 94 C 650 34, 782 150, 948 78"
              />
            </svg>
            <span className="values-simple-point values-simple-point-1" />
            <span className="values-simple-point values-simple-point-2" />
            <span className="values-simple-point values-simple-point-3" />
          </div>

          <StaggerGroup className="values-simple-grid">
            {ABOUT_VALUES.map((item) => (
              <StaggerItem key={item.id}>
                <article className="values-simple-card">
                  <p className="values-simple-id">{item.id}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <JourneyTimelineSection />

      <SectionReveal className="dark-cta">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: 54, lineHeight: 1 }}>Mulai Proyek Anda</h2>
            <p className="muted" style={{ color: '#cbc7b8' }}>Rasakan perpaduan antara arsitektur dan emosi.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn" to="/kontak-kami">Pesan Konsultasi</Link>
            <Link className="btn outline" to="/galeri" style={{ color: '#f3f1e9', borderColor: '#66665d' }}>
              Lihat Portofolio
            </Link>
          </div>
        </div>
      </SectionReveal>
    </>
  )
}

export default TentangKamiPage
