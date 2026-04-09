import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../../data/navLinks'
import { prefetchRoute } from '../../app/routePrefetch'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef(null)

  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu()
    }

    const handleOutsideClick = (event) => {
      if (!headerRef.current) return
      if (!headerRef.current.contains(event.target)) closeMenu()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleOutsideClick)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (typeof window === 'undefined' || !headerRef.current) return
    if (!('IntersectionObserver' in window)) return

    const observer = new window.IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const route = entry.target.getAttribute('data-prefetch-route')
          if (route) {
            prefetchRoute(route)
          }
          currentObserver.unobserve(entry.target)
        })
      },
      { rootMargin: '180px 0px' },
    )

    const targets = Array.from(headerRef.current.querySelectorAll('[data-prefetch-route]'))
    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <header className="site-header" ref={headerRef}>
      <div className="container nav-wrap">
        <NavLink
          className="brand"
          to="/"
          aria-label="Trimitra Home"
          onClick={closeMenu}
          data-prefetch-route="/"
        >
          <img className="brand-logo" src="/logo-trimitra.webp" alt="Logo Trimitra" />
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              onMouseEnter={() => prefetchRoute(item.to)}
              onFocus={() => prefetchRoute(item.to)}
              data-prefetch-route={item.to}
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <NavLink
            className="chat-button"
            to="/kontak-kami"
            aria-label="Chat"
            onMouseEnter={() => prefetchRoute('/kontak-kami')}
            onFocus={() => prefetchRoute('/kontak-kami')}
            data-prefetch-route="/kontak-kami"
          >
            <span className="chat-bubble" />
          </NavLink>

          <NavLink
            className="cta-button"
            to="/kontak-kami"
            onClick={closeMenu}
            onMouseEnter={() => prefetchRoute('/kontak-kami')}
            onFocus={() => prefetchRoute('/kontak-kami')}
            data-prefetch-route="/kontak-kami"
          >
            <span className="cta-label">Konsultasi Gratis</span>
            <span className="cta-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" role="presentation">
                <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M13 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </NavLink>

          <button
            className="mobile-menu"
            aria-label="Menu navigasi"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-panel ${isMenuOpen ? 'open' : ''}`}>
        <div className="container mobile-panel-inner">
          {navLinks.map((item) => (
            <NavLink
              key={`mobile-${item.to}`}
              to={item.to}
              onClick={closeMenu}
              onMouseEnter={() => prefetchRoute(item.to)}
              onFocus={() => prefetchRoute(item.to)}
              data-prefetch-route={item.to}
              className={({ isActive }) =>
                isActive ? 'mobile-nav-link nav-link-active' : 'mobile-nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            className="btn"
            to="/kontak-kami"
            onClick={closeMenu}
            onMouseEnter={() => prefetchRoute('/kontak-kami')}
            onFocus={() => prefetchRoute('/kontak-kami')}
            data-prefetch-route="/kontak-kami"
          >
            Konsultasi Gratis
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Navbar
