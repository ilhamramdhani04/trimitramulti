import { useEffect, useState } from 'react'
import { useToast } from '../components/ui/ToastProvider'
import { SectionReveal, StaggerGroup, StaggerItem } from '../components/animation/Reveal'
import { getWordPressPageBySlugs, isWordPressConfiguredForPages } from '../data/wordpressPages'

const CONTACT_DRAFT_KEY = 'trimitra-contact-draft-v1'

function KontakKamiPage() {
  const { showToast } = useToast()
  const [wpPage, setWpPage] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    brief: '',
  })

  useEffect(() => {
    let cancelled = false

    async function loadPageFromWordPress() {
      if (!isWordPressConfiguredForPages()) return
      try {
        const page = await getWordPressPageBySlugs(['kontak-kami', 'contact', 'contact-us'])
        if (!cancelled && page) {
          setWpPage(page)
        }
      } catch {
        // Keep fallback static copy.
      }
    }

    loadPageFromWordPress()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const raw = window.localStorage.getItem(CONTACT_DRAFT_KEY)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw)
      setFormData((prev) => ({ ...prev, ...parsed }))
    } catch {
      window.localStorage.removeItem(CONTACT_DRAFT_KEY)
    }
  }, [])

  useEffect(() => {
    const hasValue = Object.values(formData).some((value) => value.trim() !== '')
    if (!hasValue) {
      window.localStorage.removeItem(CONTACT_DRAFT_KEY)
      return
    }

    window.localStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(formData))
  }, [formData])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    showToast('Pesan berhasil dikirim. Tim kami akan menghubungi Anda segera.', 'success')
    setFormData({
      name: '',
      email: '',
      company: '',
      brief: '',
    })
    window.localStorage.removeItem(CONTACT_DRAFT_KEY)
  }

  return (
    <SectionReveal className="section">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 14 }}>
          Mulai <em style={{ color: 'var(--gold-deep)' }}>Dialog.</em>
        </h1>
        <p className="muted" style={{ maxWidth: 760 }}>
          Baik Anda membayangkan hunian pribadi atau ikon komersial, atelier kami
          siap menerjemahkan aspirasi Anda menjadi realitas arsitektur.
        </p>

        {wpPage?.contentHtml && (
          <article
            className="blog-detail-content cms-page-content"
            style={{ marginTop: 18, maxWidth: 860 }}
            dangerouslySetInnerHTML={{ __html: wpPage.contentHtml }}
          />
        )}

        <StaggerGroup className="contact-shell" style={{ marginTop: 32 }}>
          <form className="contact-form card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                <p className="kicker">Nama Lengkap</p>
                <input
                  type="text"
                  placeholder="Johnathan Doe"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <p className="kicker">Alamat Email</p>
                <input
                  type="email"
                  placeholder="j.doe@company.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="full">
                <p className="kicker">Perusahaan / Organisasi</p>
                <input
                  type="text"
                  placeholder="Architectural Ventures Ltd."
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </label>

              <label className="full">
                <p className="kicker">Ringkasan Proyek</p>
                <textarea
                  rows="6"
                  placeholder="Ceritakan visi Anda, lokasi proyek, dan jadwal waktu..."
                  name="brief"
                  value={formData.brief}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <button className="btn" type="submit" style={{ marginTop: 16 }}>
              Kirim Inkuiri
            </button>
          </form>

          <div className="contact-info">
            <article className="contact-box">
              <span className="contact-icon" />
              <div>
                <h3>Kantor Pusat Jakarta</h3>
                <p className="muted">Jl. Kemang Raya No. 10A, Mampang Prapatan, Jakarta Selatan, 12730</p>
              </div>
            </article>

            <article className="contact-box">
              <span className="contact-icon" />
              <div>
                <h3>Atelier Digital</h3>
                <p className="muted"><a href="mailto:inquire@trimitra.id">inquire@trimitra.id</a></p>
                <p className="muted"><a href="mailto:press@trimitra.id">press@trimitra.id</a></p>
              </div>
            </article>

            <article className="contact-box">
              <span className="contact-icon" />
              <div>
                <h3>Hubungi Langsung</h3>
                <p className="muted"><a href="tel:+62215550192">+62 21 555 0192</a></p>
                <p className="kicker"><a href="https://wa.me/62215550192" target="_blank" rel="noreferrer">Obrolan WhatsApp</a></p>
              </div>
            </article>

            <article className="contact-map card">
              <iframe
                title="Peta lokasi Trimitra"
                src="https://www.openstreetmap.org/export/embed.html?bbox=106.8046%2C-6.2688%2C106.8202%2C-6.2544&layer=mapnik&marker=-6.2616%2C106.8124"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-note">
                <p className="kicker">Temukan Kami</p>
                <p className="muted">Atelier kami terletak di jantung distrik kreatif Jakarta, Kemang.</p>
              </div>
            </article>
          </div>
        </StaggerGroup>
      </div>
    </SectionReveal>
  )
}

export default KontakKamiPage
