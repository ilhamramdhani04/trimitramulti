import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionReveal, StaggerGroup, StaggerItem } from '../components/animation/Reveal'
import LazyImage from '../components/ui/LazyImage'
import { getWordPressPageBySlugs, isWordPressConfiguredForPages } from '../data/wordpressPages'

function TentangKamiPage() {
  const [wpPage, setWpPage] = useState(null)

  const team = [
    'https://picsum.photos/seed/team-1/600/800',
    'https://picsum.photos/seed/team-2/600/800',
    'https://picsum.photos/seed/team-3/600/800',
    'https://picsum.photos/seed/team-4/600/800',
  ]

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
    return (
      <>
        <SectionReveal className="section cms-page-shell">
          <div className="container">
            <p className="kicker">Tentang Kami</p>
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

  return (
    <>
      <SectionReveal className="about-hero">
        <LazyImage
          className="home-hero-bg"
          src="https://picsum.photos/seed/about-hero/1920/960"
          alt="About hero"
          data-gsap-parallax
        />
        <div className="container about-hero-copy">
          <p className="kicker">Tentang Kami</p>
          <h1 className="section-title">Membentuk Ruang. Mendefinisikan Waktu.</h1>
        </div>
      </SectionReveal>

      <SectionReveal className="section">
        <div className="container story-wrap">
          <div className="story-image card">
            <LazyImage src="https://picsum.photos/seed/blueprint/900/1100" alt="Blueprint" />
          </div>
          <div>
            <h2 style={{ fontSize: 56 }}>Kisah Kami</h2>
            <p className="muted" style={{ marginTop: 16 }}>
              Didirikan di Jakarta, PT Trimitra Multi Kreasi telah menghabiskan lebih dari 15 tahun menjembatani kesenjangan antara konseptualisasi imajinatif dan presisi teknis.
            </p>
            <p className="muted" style={{ marginTop: 14 }}>
              Kami tidak hanya membangun struktur; kami menciptakan lingkungan yang menyentuh jiwa dan relevan dengan kebutuhan masa kini.
            </p>
            <div style={{ display: 'flex', gap: 36, marginTop: 28 }}>
              <div>
                <h3 style={{ fontSize: 34 }}>350+</h3>
                <p className="kicker">Proyek Selesai</p>
              </div>
              <div>
                <h3 style={{ fontSize: 34 }}>12</h3>
                <p className="kicker">Penghargaan Global</p>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="section values-strip">
        <div className="container">
          <div className="journal-row">
            <div>
              <p className="kicker">Prinsip Utama</p>
              <h2 style={{ fontSize: 50 }}>Nilai-Nilai Kami</h2>
            </div>
            <p className="muted" style={{ maxWidth: 340 }}>
              Arsitektur adalah permainan yang dipelajari, benar dan luar biasa, dari bentuk yang dirangkai dalam cahaya.
            </p>
          </div>

          <StaggerGroup className="grid-3">
            <StaggerItem>
              <article className="card" style={{ padding: 26 }}>
                <h3>Profesionalisme</h3>
                <p className="muted">Metodologi ketat kami memastikan eksekusi presisi tanpa cela.</p>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="card" style={{ padding: 26 }}>
                <h3>Kreativitas</h3>
                <p className="muted">Kami menantang status quo, menemukan solusi ruang kompleks.</p>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="card" style={{ padding: 26 }}>
                <h3>Kualitas</h3>
                <p className="muted">Material premium dan penyelesaian terbaik menjadi standar kami.</p>
              </article>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 58, marginBottom: 10 }}>Pikiran di Balik Trimitra</h2>
          <p className="muted" style={{ marginBottom: 24 }}>
            Tim kurasi visioner, insinyur, dan desainer yang berdedikasi.
          </p>

          <StaggerGroup className="grid-4">
            {team.map((img, idx) => (
              <StaggerItem key={img}>
                <article className="team-card">
                  <LazyImage src={img} alt={`Team ${idx + 1}`} />
                  <h3 style={{ marginTop: 10, fontSize: 22 }}>Tim {idx + 1}</h3>
                  <p className="kicker">Lead Specialist</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </SectionReveal>

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
