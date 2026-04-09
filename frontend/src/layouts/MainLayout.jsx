import { useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import WhatsAppCTA from '../components/layout/WhatsAppCTA'
import { useGsapEnhance } from '../components/animation/useGsapEnhance'
import { useSexyScroll } from '../components/animation/useSexyScroll'

function MainLayout() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  useGsapEnhance()
  useSexyScroll(location.key, 'balanced')

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.key, location.pathname, location.search])

  useEffect(() => {
    const main = document.getElementById('main-content')
    if (main) main.focus()
  }, [location.key, location.pathname, location.search])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <Navbar />
      <main className="page-main" id="main-content" tabIndex="-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${location.pathname}${location.search}`}
            className="route-transition-shell"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppCTA />
    </div>
  )
}

export default MainLayout
