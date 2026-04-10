import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionReveal } from '../animation/Reveal'

const SERVICE_SPLIT_ITEMS = [
  {
    id: '01',
    service: 'Booth Exhibition',
    kicker: 'Spatial Experience Service',
    title: 'Booth yang Mencuri Perhatian Audiens Sejak First Glance',
    copy:
      'Layanan booth Trimitra dirancang untuk menghadirkan alur interaksi yang kuat dari area depan hingga titik closing, sehingga brand tampil premium dan conversion-ready.',
    image:
      'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1300&q=80',
    imageAlt: 'Tim sedang menyiapkan booth pameran modern dengan pencahayaan hangat.',
    benefits: [
      {
        title: 'Custom 3D Concept',
        copy: 'Visual konsep dipersiapkan detail sebelum produksi sehingga revisi lebih cepat dan terukur.',
      },
      {
        title: 'Fabrication In-House',
        copy: 'Konstruksi booth dikerjakan tim internal agar kualitas dan timeline tetap konsisten.',
      },
    ],
    cta: '/kontak-kami',
  },
  {
    id: '02',
    service: 'Event Organizer',
    kicker: 'Activation Service',
    title: 'Event Activation yang Terkurasi untuk Momen Brand Impact',
    copy:
      'Kami orkestrasi event dari creative direction sampai eksekusi hari-H agar ritme acara hidup, transisi antar segmen mulus, dan audiens tetap engaged.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1300&q=80',
    imageAlt: 'Suasana event perusahaan dengan stage utama dan audiens.',
    benefits: [
      {
        title: 'Creative Runbook',
        copy: 'Skenario event disusun detail mulai dari opening sequence hingga closing momentum.',
      },
      {
        title: 'Showflow Control',
        copy: 'Koordinasi talent, stage, operator, dan teknis dijaga real-time selama acara berjalan.',
      },
    ],
    cta: '/kontak-kami',
  },
  {
    id: '03',
    service: 'Outdoor Media',
    kicker: 'Visibility Service',
    title: 'Penempatan Outdoor yang Tepat untuk Recall Lebih Kuat',
    copy:
      'Layanan media outdoor Trimitra menitikberatkan pada strategi titik, kejelasan visual, dan konsistensi eksposur agar pesan brand terbaca dalam waktu singkat.',
    image:
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1300&q=80',
    imageAlt: 'Billboard outdoor di area kota dengan traffic padat.',
    benefits: [
      {
        title: 'Location Mapping',
        copy: 'Pemilihan lokasi berbasis arus traffic dan profil audiens area target.',
      },
      {
        title: 'Visual Adaptation',
        copy: 'Materi kreatif dioptimalkan untuk format outdoor dengan hirarki pesan cepat tangkap.',
      },
    ],
    cta: '/layanan',
  },
]

function ServiceShowcaseSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <SectionReveal className="section service-showcase-section">
      <div className="container service-showcase-container">
        <div className="service-showcase-head">
          <p className="kicker">Layanan Kami</p>
          <h2 className="service-showcase-title text-shimmer">Split Cards Alternating</h2>
          <p className="muted">
            Tiga layanan utama Trimitra disusun zig-zag agar mudah dipindai, rapi dipahami,
            dan tetap conversion-friendly untuk pengunjung baru.
          </p>
        </div>

        <div className="service-split-list">
          {SERVICE_SPLIT_ITEMS.map((service, index) => (
            <motion.article
              key={service.id}
              className={`service-split-block ${index % 2 === 1 ? 'is-reverse' : ''}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={
                prefersReducedMotion
                  ? undefined
                  : { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 } }
              }
              viewport={{ once: true, amount: 0.24 }}
            >
              <div className="service-split-visual-wrap">
                <img className="service-split-visual" src={service.image} alt={service.imageAlt} loading="lazy" />
              </div>

              <div className="service-split-content">
                <div className="service-split-eyebrow">
                  <span className="service-split-index">{service.id}</span>
                  <p className="service-split-kicker">{service.kicker}</p>
                </div>

                <p className="service-split-service">{service.service}</p>
                <h3>{service.title}</h3>
                <p className="service-split-copy">{service.copy}</p>

                <div className="service-split-benefits">
                  {service.benefits.map((benefit) => (
                    <article key={benefit.title} className="service-split-benefit-card">
                      <h4>{benefit.title}</h4>
                      <p>{benefit.copy}</p>
                    </article>
                  ))}
                </div>

                <div className="service-split-cta">
                  <Link className="btn" to={service.cta}>Diskusikan Layanan Ini</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

export default ServiceShowcaseSection
