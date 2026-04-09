import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SectionReveal } from '../animation/Reveal'

const HERO_ITEMS = [
  {
    label: 'Residensial Eksklusif',
    title: 'Signature Living Pavilion',
    description: 'Komposisi batu alam, pencahayaan dramatis, dan layout adaptif untuk gaya hidup modern premium.',
    image: 'https://picsum.photos/seed/accordion-hero-a/1800/1200',
  },
  {
    label: 'Hospitality & Komersial',
    title: 'Atelier Business Sanctuary',
    description: 'Ruang kerja dan lobby dengan atmosfer hangat, efisien, dan berkarakter kuat untuk pengalaman brand.',
    image: 'https://picsum.photos/seed/accordion-hero-b/1800/1200',
  },
  {
    label: 'Renovasi Bernilai Tinggi',
    title: 'Crafted Heritage Renewal',
    description: 'Transformasi properti lama menjadi ruang kontemporer tanpa kehilangan nilai historis dan emosional.',
    image: 'https://picsum.photos/seed/accordion-hero-c/1800/1200',
  },
]

function AccordionHero() {
  const [activeIndex, setActiveIndex] = useState(1)

  const activatePanel = (index) => {
    setActiveIndex(index)
  }

  const onPanelKeyDown = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      activatePanel(index)
      return
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      activatePanel((index + 1) % HERO_ITEMS.length)
      return
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      activatePanel((index - 1 + HERO_ITEMS.length) % HERO_ITEMS.length)
    }
  }

  const onPanelClick = (event, index) => {
    if (event.target instanceof HTMLElement && event.target.closest('a')) return
    activatePanel(index)
  }

  return (
    <SectionReveal className="accordion-hero">
      <div className="accordion-hero-shell">
        <p className="kicker accordion-kicker">Featured Work</p>
        <div className="accordion-track" role="list" aria-label="Showcase project slider">
          {HERO_ITEMS.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <article
                key={item.title}
                className={`accordion-panel ${isActive ? 'is-active' : ''}`}
                style={{ '--panel-bg': `url(${item.image})` }}
                role="listitem"
                tabIndex={0}
                aria-label={`${item.label} - ${item.title}`}
                onMouseEnter={() => activatePanel(index)}
                onFocus={() => activatePanel(index)}
                onClick={(event) => onPanelClick(event, index)}
                onKeyDown={(event) => onPanelKeyDown(event, index)}
              >
                <div className="accordion-panel-glow" />
                <p className="accordion-index">0{index + 1}</p>
                <div className="accordion-copy">
                  <p className="accordion-label">{item.label}</p>
                  <h1 className="accordion-title">{item.title}</h1>
                  <p className="accordion-description">{item.description}</p>
                </div>
                <div className="accordion-actions">
                  <Link className="btn" to="/galeri">Jelajahi Projek</Link>
                  <Link className="btn outline" to="/kontak-kami">Konsultasi Gratis</Link>
                </div>
              </article>
            )
          })}
        </div>

        <div className="accordion-mobile-nav" aria-label="Navigasi hero mobile">
          {HERO_ITEMS.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={`mobile-dot-${item.title}`}
                type="button"
                className={`accordion-mobile-dot ${isActive ? 'is-active' : ''}`}
                aria-label={`Tampilkan ${item.title}`}
                aria-pressed={isActive}
                onClick={() => activatePanel(index)}
              />
            )
          })}
        </div>
      </div>
    </SectionReveal>
  )
}

export default AccordionHero
