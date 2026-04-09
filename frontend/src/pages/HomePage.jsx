import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionReveal, StaggerGroup, StaggerItem } from '../components/animation/Reveal'
import LazyImage from '../components/ui/LazyImage'
import AccordionHero from '../components/ui/AccordionHero'
import ServiceShowcaseSection from '../components/ui/ServiceShowcaseSection'
import ValueNarrativeSection from '../components/ui/ValueNarrativeSection'
import { blogPosts } from '../data/blogPosts'
import { getBlogPostsFromWordPress, isWordPressConfigured } from '../data/wordpressBlog'
import { getWordPressGalleryMedia, isWordPressConfiguredForPages } from '../data/wordpressPages'

function HomePage() {
  const [journalPosts, setJournalPosts] = useState(blogPosts.slice(0, 3))
  const [portfolioImages, setPortfolioImages] = useState([
    'https://picsum.photos/seed/portfolio-a/1200/820',
    'https://picsum.photos/seed/portfolio-b/900/550',
    'https://picsum.photos/seed/portfolio-c/900/550',
  ])

  useEffect(() => {
    let cancelled = false

    async function loadFromWordPress() {
      if (!isWordPressConfigured()) return
      try {
        const wpPosts = await getBlogPostsFromWordPress({ perPage: 3 })
        if (!cancelled && wpPosts.length > 0) {
          setJournalPosts(wpPosts)
        }
      } catch {
        // Keep local fallback posts.
      }
    }

    loadFromWordPress()
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
            <Link className="btn outline" to="/berita">Lihat Semua</Link>
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

      <SectionReveal className="section">
        <div className="container">
          <p className="kicker">Portofolio</p>
          <h2 className="home-portfolio-title">Proyek Unggulan</h2>
          <StaggerGroup className="portfolio-grid">
            <StaggerItem className="portfolio-main portfolio-card card">
              <LazyImage src={portfolioImages[0]} alt="Featured project" />
            </StaggerItem>
            <StaggerGroup className="portfolio-right">
              <StaggerItem className="portfolio-card card">
                <LazyImage src={portfolioImages[1]} alt="Interior project" />
              </StaggerItem>
              <StaggerItem className="portfolio-card card">
                <LazyImage src={portfolioImages[2]} alt="Commercial project" />
              </StaggerItem>
            </StaggerGroup>
          </StaggerGroup>
        </div>
      </SectionReveal>

      <ValueNarrativeSection />

      <SectionReveal className="dark-cta">
        <div className="container home-dark-cta-shell">
          <h2 className="home-dark-cta-title">Siap Membangun Karya Ikonik Anda?</h2>
          <p className="muted home-dark-cta-copy">
            Konsultasikan visi Anda dengan tim ahli kami untuk solusi ruang yang melampaui ekspektasi.
          </p>
          <div className="home-dark-cta-actions">
            <Link className="btn" to="/kontak-kami">Hubungi Kami Sekarang</Link>
            <Link className="btn outline" to="/layanan" style={{ color: '#ece8dd', borderColor: '#5e5f57' }}>
              Lihat Proposal Harga
            </Link>
          </div>
        </div>
      </SectionReveal>
    </>
  )
}

export default HomePage
