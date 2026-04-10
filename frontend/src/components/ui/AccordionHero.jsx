import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SectionReveal } from '../animation/Reveal'

const HERO_CAMPAIGN_MODES = [
  {
    id: 'booth',
    label: 'Booth Mode',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=80',
    imageAlt: 'Booth pameran modern dengan keramaian pengunjung.',
    imagePosition: 'center center',
    headline: 'Booth Exhibition yang Menjadi Magnet Keramaian',
    pitch:
      'Kami desain alur booth yang membuat orang berhenti, masuk, dan berdialog dengan tim sales tanpa terasa dipaksa.',
    accent: '#f0cf8f',
    accentSoft: 'rgba(240, 207, 143, 0.24)',
    ctaPrimary: 'Rancang Booth Saya',
    ctaSecondary: 'Lihat Showcase Booth',
    pillars: ['Spatial Storytelling', 'Interactive Display', 'High-Intent Flow'],
    stats: [
      { value: '41%', label: 'Avg Dwell Lift' },
      { value: '3.2x', label: 'Touchpoint Depth' },
      { value: '72h', label: 'Final Build Lock' },
    ],
    bestFor: 'Cocok untuk brand yang ingin traffic tinggi dan percakapan sales berkualitas di area pameran.',
    deliverables: [
      'Konsep 3D booth + alur pergerakan pengunjung',
      'Produksi material booth dengan quality control terukur',
      'Setup on-site dan pendampingan teknis saat event berjalan',
    ],
    deck: {
      metric: '+41%',
      metricLabel: 'Potential Dwell Lift',
      summary: 'Layout memandu pengunjung dari glance ke trial lalu conversation.',
      scenes: [
        {
          title: 'Entry Magnet',
          value: '5s First Stop',
          note: 'Hook visual diletakkan di first-sight axis.',
        },
        {
          title: 'Demo Arc',
          value: '3 Zone Flow',
          note: 'Route produk mengikuti ritme kepadatan pengunjung.',
        },
        {
          title: 'Close Loop',
          value: 'Lead Capture',
          note: 'Area negosiasi ditutup dengan CTA yang jelas.',
        },
      ],
    },
  },
  {
    id: 'event',
    label: 'Event Mode',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=80',
    imageAlt: 'Panggung event dengan audiens antusias dan lighting dramatis.',
    imagePosition: 'center 42%',
    headline: 'Aktivasi Event yang Menggerakkan Audiens ke Aksi',
    pitch:
      'Dari pre-hype sampai on-ground execution, kami bentuk momentum event agar brand Anda terasa hidup sepanjang hari acara.',
    accent: '#d9c6ff',
    accentSoft: 'rgba(217, 198, 255, 0.24)',
    ctaPrimary: 'Bangun Aktivasi Event',
    ctaSecondary: 'Jelajahi Event Works',
    pillars: ['Audience Choreography', 'Stage Narrative', 'Real-Time Ops'],
    stats: [
      { value: '2.8x', label: 'Engagement Pulse' },
      { value: '94%', label: 'On-Run Stability' },
      { value: '0 Lag', label: 'Scene Transition' },
    ],
    bestFor: 'Ideal untuk peluncuran produk, brand activation, dan event yang butuh ritme audiens konsisten.',
    deliverables: [
      'Creative direction acara dari pre-event sampai aftermovie',
      'Skenario acara, rundown, dan cue panggung real-time',
      'Eksekusi teknis lapangan bersama event operations team',
    ],
    deck: {
      metric: '2.8x',
      metricLabel: 'Engagement Pulse',
      summary: 'Kami sinkronkan panggung, aktivitas, dan timing untuk membangun puncak antusiasme.',
      scenes: [
        {
          title: 'Pre-Hype',
          value: 'Audience Warm-up',
          note: 'Teaser ritual sebelum main stage dimulai.',
        },
        {
          title: 'Peak Moment',
          value: 'Hero Sequence',
          note: 'Momen utama dikunci dengan visual + host cues.',
        },
        {
          title: 'Afterglow',
          value: 'Post Event Pull',
          note: 'Konten recap untuk menjaga ingatan brand.',
        },
      ],
    },
  },
  {
    id: 'outdoor',
    label: 'Outdoor Mode',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&w=2200&q=80',
    imageAlt: 'Koridor jalan kota sebagai konteks media outdoor brand.',
    imagePosition: 'center center',
    headline: 'Media Outdoor yang Sulit Diabaikan di Jalan Utama',
    pitch:
      'Kami olah komposisi visual luar ruang agar pesan brand tetap terbaca tajam dalam waktu pandang yang singkat.',
    accent: '#9be3d2',
    accentSoft: 'rgba(155, 227, 210, 0.24)',
    ctaPrimary: 'Aktifkan Outdoor Saya',
    ctaSecondary: 'Lihat Outdoor Portfolio',
    pillars: ['Impact Contrast', 'Short-Read Messaging', 'Location Intelligence'],
    stats: [
      { value: '1.9s', label: 'Read Window' },
      { value: 'Top 5', label: 'Priority Corridors' },
      { value: '24/7', label: 'Brand Presence' },
    ],
    bestFor: 'Tepat untuk brand yang ingin visibilitas kuat di koridor utama dengan pesan super ringkas.',
    deliverables: [
      'Analisis titik strategis sesuai arus kendaraan dan audiens',
      'Desain visual outdoor dengan hierarki pesan cepat tangkap',
      'Produksi, instalasi, dan monitoring performa penempatan media',
    ],
    deck: {
      metric: '1.9s',
      metricLabel: 'Read Window',
      summary: 'Message hierarchy disusun agar inti pesan tetap nempel meski glance sangat cepat.',
      scenes: [
        {
          title: 'Visual Hook',
          value: 'High Contrast',
          note: 'Elemen utama ditarik ke zona fokus pengemudi.',
        },
        {
          title: 'Message Snap',
          value: '3-Word Core',
          note: 'Salinan pendek untuk recall yang cepat.',
        },
        {
          title: 'Route Echo',
          value: 'Frequency Loop',
          note: 'Paparan berulang di koridor prioritas.',
        },
      ],
    },
  },
]

const HERO_MARQUEE_TEXT =
  'BOOTH EXHIBITION ● EVENT ACTIVATION ● OUTDOOR MEDIA ● TRIMITRA SERVICE EXPLORER ● ' +
  'BOOTH EXHIBITION ● EVENT ACTIVATION ● OUTDOOR MEDIA ● TRIMITRA SERVICE EXPLORER ● ' +
  'BOOTH EXHIBITION ● EVENT ACTIVATION ● OUTDOOR MEDIA ● TRIMITRA SERVICE EXPLORER ● '

const heroFadeContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.11,
    },
  },
}

const heroFadeItem = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function AccordionHero() {
  const prefersReducedMotion = useReducedMotion()
  const [activeModeIndex, setActiveModeIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const autoRotateId = window.setInterval(() => {
      setActiveModeIndex((prev) => (prev + 1) % HERO_CAMPAIGN_MODES.length)
    }, 4600)

    return () => {
      window.clearInterval(autoRotateId)
    }
  }, [prefersReducedMotion])

  const activeMode = HERO_CAMPAIGN_MODES[activeModeIndex]

  const heroModeStyle = {
    '--hero-mode-accent': activeMode.accent,
    '--hero-mode-accent-soft': activeMode.accentSoft,
  }

  return (
    <>
      <SectionReveal className="hero-single" style={heroModeStyle} data-nav-hero>
        <div className="hero-single-media" data-gsap-parallax-layer="background">
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={activeMode.id}
              src={activeMode.image}
              alt={activeMode.imageAlt}
              className="hero-single-image"
              style={{ objectPosition: activeMode.imagePosition }}
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      scale: 1.055,
                      filter: 'saturate(0.72) contrast(1) blur(2px)',
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'saturate(0.9) contrast(1.05) blur(0px)',
              }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      scale: 0.99,
                      filter: 'saturate(0.78) contrast(1) blur(1.2px)',
                    }
              }
              transition={{ duration: prefersReducedMotion ? 0.2 : 1.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>
        <div className="hero-single-overlay" data-gsap-parallax-layer="middle" />
        <div className="hero-single-glow" data-gsap-parallax-layer="foreground" aria-hidden="true" />

        <div className="container hero-single-shell">
          <div className="hero-single-grid" data-gsap-parallax-layer="content">
            <motion.div
              className="hero-single-content"
              variants={heroFadeContainer}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'show'}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p className="kicker hero-single-kicker" variants={heroFadeItem}>
                Trimitra Campaign Selector
              </motion.p>
              <motion.h1 className="hero-single-title" variants={heroFadeItem}>
                <span className="hero-headline-stage">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeMode.headline}
                      className={`hero-mode-headline-line is-${activeMode.id}`}
                      initial={
                        prefersReducedMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 20,
                              scale: 0.96,
                              rotateX: 20,
                              filter: 'blur(10px)',
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                        filter: 'blur(0px)',
                      }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              y: -12,
                              scale: 1.03,
                              rotateX: -16,
                              filter: 'blur(10px)',
                            }
                      }
                      transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {activeMode.headline}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>
              <motion.p className="hero-single-description" variants={heroFadeItem}>
                {activeMode.pitch}
              </motion.p>
              <motion.div className="hero-single-services" variants={heroFadeItem}>
                {activeMode.pillars.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </motion.div>
              <motion.div className="hero-single-actions" variants={heroFadeItem}>
                <Link className="btn" to="/kontak-kami" data-magnetic>
                  {activeMode.ctaPrimary}
                </Link>
                <Link className="btn outline" to="/galeri" data-magnetic>
                  {activeMode.ctaSecondary}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </SectionReveal>

      <div className="hero-marquee-band" aria-hidden="true">
        <div className="hero-marquee-band-scroller">
          <div className="hero-marquee-band-track">{HERO_MARQUEE_TEXT}</div>
          <div className="hero-marquee-band-track">{HERO_MARQUEE_TEXT}</div>
        </div>
      </div>
    </>
  )
}

export default AccordionHero
