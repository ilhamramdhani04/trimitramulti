import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionReveal, StaggerGroup, StaggerItem } from '../components/animation/Reveal'
import LazyImage from '../components/ui/LazyImage'
import { getWordPressPageBySlugs, isWordPressConfiguredForPages } from '../data/wordpressPages'

function LayananPage() {
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

  if (wpPage) {
    return (
      <>
        <SectionReveal className="section cms-page-shell">
          <div className="container">
            <p className="kicker">Layanan Kami</p>
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

        <SectionReveal className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: 60, lineHeight: 1.02 }}>Siap membangun visi Anda berikutnya?</h2>
            <p className="muted" style={{ marginTop: 16 }}>
              Tim arsitek, desainer, dan strategis kami siap menghidupkan proyek Anda.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
              <Link className="btn" to="/berita">Unduh Kredensial</Link>
              <Link className="btn outline" to="/kontak-kami">Hubungi Studio Kami</Link>
            </div>
          </div>
        </SectionReveal>
      </>
    )
  }

  return (
    <>
      <SectionReveal className="section service-hero">
        <div className="container service-hero-grid">
          <div>
            <p className="kicker">Layanan Kami</p>
            <h1 className="section-title">Membangun Pengalaman.</h1>
          </div>
          <p className="muted" style={{ alignSelf: 'end' }}>
            Kami mengubah konsep menjadi landmark fisik dan digital. Pendekatan
            terpadu kami memastikan presisi mulai dari cetak biru pertama hingga
            interaksi akhir.
          </p>
        </div>
      </SectionReveal>

      <SectionReveal className="section" style={{ background: '#f2efe9' }}>
        <div className="container service-row">
          <StaggerItem className="service-image card">
            <LazyImage src="https://picsum.photos/seed/service-1/1300/780" alt="Pemasaran billboard" />
          </StaggerItem>
          <StaggerGroup className="service-copy">
            <p className="kicker">01</p>
            <h2 style={{ fontSize: 54 }}>Jasa Pemasaran Billboard</h2>
            <p className="muted" style={{ marginTop: 12 }}>
              Solusi pemasaran billboard kami memperkuat visibilitas merek di
              titik lalu lintas tinggi dengan strategi placement yang terukur.
            </p>
            <ul className="muted" style={{ marginTop: 12, paddingLeft: 16 }}>
              <li>Perencanaan lokasi billboard strategis</li>
              <li>Analisis jangkauan dan frekuensi tayang</li>
              <li>Optimasi pesan untuk dampak kampanye</li>
            </ul>
            <Link className="btn" to="/kontak-kami" style={{ marginTop: 16 }}>
              Minta Penawaran
            </Link>
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal className="section">
        <div className="container value-3 card">
          <div>
            <h3 style={{ color: 'var(--danger)', fontSize: 56 }}>Presisi</h3>
            <p className="muted">Setiap milimeter diukur untuk ketepatan eksekusi.</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--danger)', fontSize: 56 }}>Taktilitas</h3>
            <p className="muted">Kami percaya pada bobot material yang nyata.</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--danger)', fontSize: 56 }}>Visi</h3>
            <p className="muted">Dirancang untuk warisan jangka panjang.</p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="section">
        <div className="container service-row reverse">
          <StaggerItem className="service-image card">
            <LazyImage src="https://picsum.photos/seed/service-2/1300/780" alt="Event organizer" />
          </StaggerItem>
          <StaggerGroup className="service-copy">
            <p className="kicker">02</p>
            <h2 style={{ fontSize: 54 }}>Jasa Event Organizer</h2>
            <p className="muted" style={{ marginTop: 12 }}>
              Kami merancang alur acara yang memandu peserta melalui perjalanan
              naratif, menggabungkan logistik dengan konsep spasial.
            </p>
            <ul className="muted" style={{ marginTop: 12, paddingLeft: 16 }}>
              <li>Desain narasi spasial</li>
              <li>Rekayasa logistik mulus</li>
              <li>Kurasi multi-sensori</li>
            </ul>
            <Link className="btn" to="/kontak-kami" style={{ marginTop: 16, background: '#c74625', color: '#fff' }}>
              Rencanakan Acara Anda
            </Link>
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal className="section" style={{ background: '#e9e5df' }}>
        <div className="container service-row">
          <StaggerItem className="service-image card">
            <LazyImage src="https://picsum.photos/seed/service-3/1300/780" alt="Booth contractor" />
          </StaggerItem>
          <StaggerGroup className="service-copy">
            <p className="kicker">03</p>
            <h2 style={{ fontSize: 54 }}>Jasa Kontraktor Booth Pameran</h2>
            <p className="muted" style={{ marginTop: 12 }}>
              Booth pameran kami dirancang untuk integritas struktural dan
              dominasi estetika di lingkungan dengan lalu lintas tinggi.
            </p>
            <div className="grid-2" style={{ marginTop: 14 }}>
              <div className="card" style={{ padding: 14 }}>
                <strong>Kualitas Bangun</strong>
                <p className="muted">Material premium dan pengerjaan halus.</p>
              </div>
              <div className="card" style={{ padding: 14 }}>
                <strong>Inovasi</strong>
                <p className="muted">Solusi teknologi terintegrasi.</p>
              </div>
            </div>
            <Link className="btn dark" to="/kontak-kami" style={{ marginTop: 16 }}>
              Minta Penawaran
            </Link>
          </StaggerGroup>
        </div>
      </SectionReveal>

      <SectionReveal className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 60, lineHeight: 1.02 }}>Siap membangun visi Anda berikutnya?</h2>
          <p className="muted" style={{ marginTop: 16 }}>
            Tim arsitek, desainer, dan strategis kami siap menghidupkan proyek Anda.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            <Link className="btn" to="/berita">Unduh Kredensial</Link>
            <Link className="btn outline" to="/kontak-kami">Hubungi Studio Kami</Link>
          </div>
        </div>
      </SectionReveal>
    </>
  )
}

export default LayananPage
