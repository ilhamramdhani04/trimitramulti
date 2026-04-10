import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionReveal, StaggerGroup, StaggerItem } from '../components/animation/Reveal'
import LazyImage from '../components/ui/LazyImage'
import AccordionHero from '../components/ui/AccordionHero'
import ServiceShowcaseSection from '../components/ui/ServiceShowcaseSection'
import ValueNarrativeSection from '../components/ui/ValueNarrativeSection'
import { blogPosts } from '../data/blogPosts'
import { getBlogPostsFromWordPress, isWordPressConfigured } from '../data/wordpressBlog'
import {
  getWordPressGalleryMedia,
  getWordPressPageBySlugs,
  isWordPressConfiguredForPages,
} from '../data/wordpressPages'
import { pickLinkField, pickTextField } from '../data/wpUiFields'

const portfolioContainerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
}

const portfolioCardVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    scale: 0.985,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.68,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const LIVE_JOURNAL_REFRESH_INTERVAL_MS = 20000

function PortfolioShowcase({ kicker, title, images }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <SectionReveal className="section">
      <div className="container">
        <p className="kicker">{kicker}</p>
        <h2 className="home-portfolio-title text-shimmer">{title}</h2>
        <motion.div
          className="portfolio-grid"
          variants={portfolioContainerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView={prefersReducedMotion ? undefined : 'show'}
          viewport={{ once: true, amount: 0.22 }}
        >
          <motion.article className="portfolio-main portfolio-card card" variants={portfolioCardVariants}>
            <LazyImage src={images[0]} alt="Proyek booth pameran Trimitra" />
          </motion.article>
          <motion.div className="portfolio-right" variants={portfolioContainerVariants}>
            <motion.article className="portfolio-card card" variants={portfolioCardVariants}>
              <LazyImage src={images[1]} alt="Proyek event activation Trimitra" />
            </motion.article>
            <motion.article className="portfolio-card card" variants={portfolioCardVariants}>
              <LazyImage src={images[2]} alt="Proyek media billboard outdoor Trimitra" />
            </motion.article>
          </motion.div>
        </motion.div>
      </div>
    </SectionReveal>
  )
}

function HomePage() {
  const [wpHomePage, setWpHomePage] = useState(null)
  const [journalPosts, setJournalPosts] = useState(blogPosts.slice(0, 3))
  const [portfolioImages, setPortfolioImages] = useState([
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80',
  ])
  const journalRefreshInProgressRef = useRef(false)

  useEffect(() => {
    let cancelled = false

    async function loadFromWordPress({ forceFresh = false } = {}) {
      if (!isWordPressConfigured()) return
      if (journalRefreshInProgressRef.current) return

      journalRefreshInProgressRef.current = true
      try {
        const wpPosts = await getBlogPostsFromWordPress({
          perPage: 3,
          allPages: false,
          skipCache: forceFresh,
          staleWhileRevalidate: !forceFresh,
          ttlMs: 60 * 1000,
        })
        if (!cancelled && wpPosts.length > 0) {
          setJournalPosts(wpPosts)
        }
      } catch {
        // Keep local fallback posts.
      } finally {
        journalRefreshInProgressRef.current = false
      }
    }

    loadFromWordPress({ forceFresh: true })

    const onFocus = () => loadFromWordPress({ forceFresh: true })
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadFromWordPress({ forceFresh: true })
      }
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        loadFromWordPress({ forceFresh: true })
      }
    }, LIVE_JOURNAL_REFRESH_INTERVAL_MS)

    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadHomePageFromWordPress() {
      if (!isWordPressConfiguredForPages()) return
      try {
        const page = await getWordPressPageBySlugs(['home', 'beranda'])
        if (!cancelled && page) {
          setWpHomePage(page)
        }
      } catch {
        // Keep fallback home layout.
      }
    }

    loadHomePageFromWordPress()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadPortfolioFromWordPress() {
      if (!isWordPressConfiguredForPages()) return
      try {
        const media = await getWordPressGalleryMedia({ perPage: 9, allPages: false })
        const firstThree = media.slice(0, 3).map((item) => item.src)
        if (!cancelled && firstThree.length === 3) {
          setPortfolioImages(firstThree)
        }
      } catch {
        // Keep fallback portfolio images.
      }
    }

    loadPortfolioFromWordPress()
    return () => {
      cancelled = true
    }
  }, [])

  const journals = journalPosts.slice(0, 3).map((post) => ({
    tag: post.category,
    title: post.title,
    image: post.image,
    slug: post.slug,
  }))

  if (wpHomePage) {
    const uiFields = { ...(wpHomePage.meta || {}), ...(wpHomePage.acf || {}) }
    const homeKicker = pickTextField(uiFields, ['home_kicker', 'hero_kicker'], 'Home')
    const journalKicker = pickTextField(uiFields, ['journal_kicker'], 'Eksplorasi')
    const journalTitle = pickTextField(uiFields, ['journal_title'], 'Jurnal Atelier')
    const journalButtonLabel = pickTextField(uiFields, ['journal_button_label'], 'Lihat Semua')
    const portfolioKicker = pickTextField(uiFields, ['portfolio_kicker'], 'Portofolio')
    const portfolioTitle = pickTextField(uiFields, ['portfolio_title'], 'Proyek Unggulan')
    const ctaTitle = pickTextField(uiFields, ['cta_title', 'home_cta_title'], 'Siap Membangun Karya Ikonik Anda?')
    const ctaCopy = pickTextField(uiFields, ['cta_copy', 'home_cta_copy'], 'Konsultasikan visi Anda dengan tim ahli kami untuk solusi ruang yang melampaui ekspektasi.')
    const ctaPrimaryLabel = pickTextField(uiFields, ['cta_primary_label'], 'Hubungi Kami Sekarang')
    const ctaPrimaryLink = pickLinkField(uiFields, ['cta_primary_link'], '/kontak-kami')
    const ctaSecondaryLabel = pickTextField(uiFields, ['cta_secondary_label'], 'Lihat Proposal Harga')
    const ctaSecondaryLink = pickLinkField(uiFields, ['cta_secondary_link'], '/layanan')

    return (
      <>
        <SectionReveal className="section cms-page-shell">
          <div className="container">
            <p className="kicker">{homeKicker}</p>
            <h1 className="section-title">{wpHomePage.title}</h1>
            {wpHomePage.excerpt && (
              <p className="muted" style={{ marginTop: 12, maxWidth: 860 }}>
                {wpHomePage.excerpt}
              </p>
            )}
            {wpHomePage.image && (
              <div className="blog-detail-image-wrap" style={{ marginTop: 18, marginBottom: 22 }}>
                <LazyImage
                  src={wpHomePage.image}
                  alt={wpHomePage.title}
                  className="blog-detail-image"
                />
              </div>
            )}
            <article className="blog-detail-content cms-page-content" dangerouslySetInnerHTML={{ __html: wpHomePage.contentHtml }} />
          </div>
        </SectionReveal>

        <SectionReveal className="section">
          <div className="container">
            <div className="journal-row">
              <div>
                <p className="kicker">{journalKicker}</p>
                <h2 className="home-journal-title">{journalTitle}</h2>
              </div>
              <Link className="btn outline" to="/berita" data-magnetic>{journalButtonLabel}</Link>
            </div>

            <StaggerGroup className="grid-3">
              {journals.map((item) => (
                <StaggerItem key={item.title}>
                  <Link className="journal-card-link" to={`/berita/${item.slug}`}>
                    <article className="journal-card card">
                      <LazyImage src={item.image} alt={item.title} />
                      <div className="journal-overlay">
                        <p className="kicker" style={{ color: '#f4dfab' }}>
                          {item.tag}
                        </p>
                        <h3 className="home-journal-card-title">{item.title}</h3>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </SectionReveal>

        <PortfolioShowcase kicker={portfolioKicker} title={portfolioTitle} images={portfolioImages} />

        <SectionReveal className="dark-cta">
          <div className="container home-dark-cta-shell">
            <h2 className="home-dark-cta-title">{ctaTitle}</h2>
            <p className="muted home-dark-cta-copy">
              {ctaCopy}
            </p>
            <div className="home-dark-cta-actions">
              <Link className="btn" to={ctaPrimaryLink} data-magnetic>{ctaPrimaryLabel}</Link>
              <Link className="btn outline" to={ctaSecondaryLink} style={{ color: '#ece8dd', borderColor: '#5e5f57' }} data-magnetic>
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
      <AccordionHero />

      <SectionReveal className="section">
        <div className="container">
          <div className="journal-row">
            <div>
              <p className="kicker">Eksplorasi</p>
              <h2 className="home-journal-title">Jurnal Atelier</h2>
            </div>
            <Link className="btn outline" to="/berita" data-magnetic>Lihat Semua</Link>
          </div>

          <StaggerGroup className="grid-3">
            {journals.map((item) => (
              <StaggerItem key={item.title}>
                <Link className="journal-card-link" to={`/berita/${item.slug}`}>
                  <article className="journal-card card">
                    <LazyImage src={item.image} alt={item.title} />
                    <div className="journal-overlay">
                      <p className="kicker" style={{ color: '#f4dfab' }}>
                        {item.tag}
                      </p>
                      <h3 className="home-journal-card-title">{item.title}</h3>
                    </div>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

      <ServiceShowcaseSection />

      <PortfolioShowcase kicker="Portofolio" title="Proyek Unggulan" images={portfolioImages} />

      <ValueNarrativeSection />

      <SectionReveal className="dark-cta">
        <div className="container home-dark-cta-shell">
          <h2 className="home-dark-cta-title">Siap Membangun Karya Ikonik Anda?</h2>
          <p className="muted home-dark-cta-copy">
            Konsultasikan visi Anda dengan tim ahli kami untuk solusi ruang yang melampaui ekspektasi.
          </p>
          <div className="home-dark-cta-actions">
            <Link className="btn" to="/kontak-kami" data-magnetic>Hubungi Kami Sekarang</Link>
            <Link className="btn outline" to="/layanan" style={{ color: '#ece8dd', borderColor: '#5e5f57' }} data-magnetic>
              Lihat Proposal Harga
            </Link>
          </div>
        </div>
      </SectionReveal>
    </>
  )
}

export default HomePage
