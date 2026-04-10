import { useEffect, useState } from 'react'

const DEFAULT_THRESHOLD = 80
const DEFAULT_HERO_SELECTOR = '[data-nav-hero]'

export function useNavbarScrollState({ threshold = DEFAULT_THRESHOLD, heroSelector = DEFAULT_HERO_SELECTOR, routeKey = '' } = {}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let disposed = false
    let disposeCurrent = () => {}
    let detectionTimerId = null
    let hasHero = false

    const setFromWindow = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    const evaluateHeroPresence = () => {
      const detected = Boolean(document.querySelector(heroSelector))
      hasHero = detected
      document.body.classList.toggle('nav-over-hero', detected)
      return detected
    }

    const setupFallback = () => {
      const onScroll = () => {
        if (!hasHero) return
        setFromWindow()
      }

      if (!hasHero) {
        setIsScrolled(true)
      } else {
        setFromWindow()
      }

      window.addEventListener('scroll', onScroll, { passive: true })

      disposeCurrent = () => {
        window.removeEventListener('scroll', onScroll)
      }
    }

    const setupForHero = async () => {
      try {
        const gsapModule = await import('gsap')
        const scrollTriggerModule = await import('gsap/ScrollTrigger')
        if (disposed) return

        const gsap = gsapModule.default || gsapModule.gsap
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

        if (!gsap || !ScrollTrigger) {
          setupFallback()
          return
        }

        gsap.registerPlugin(ScrollTrigger)

        setFromWindow()

        const trigger = ScrollTrigger.create({
          id: 'navbar-scroll-state',
          start: `${threshold}px top`,
          onEnter: () => setIsScrolled(true),
          onLeaveBack: () => setIsScrolled(false),
        })

        disposeCurrent = () => {
          trigger.kill()
        }
      } catch {
        if (disposed) return
        setupFallback()
      }
    }

    const setup = () => {
      const maxAttempts = 12
      const stepDelayMs = 50
      let attempt = 0

      const detectThenInit = () => {
        if (disposed) return

        const detected = evaluateHeroPresence()

        if (detected) {
          setupForHero()
          return
        }

        if (attempt >= maxAttempts) {
          hasHero = false
          document.body.classList.remove('nav-over-hero')
          setIsScrolled(true)
          return
        }

        attempt += 1
        detectionTimerId = window.setTimeout(detectThenInit, stepDelayMs)
      }

      detectThenInit()
    }

    const rafId = window.requestAnimationFrame(() => {
      setup()
    })

    return () => {
      disposed = true
      window.cancelAnimationFrame(rafId)
      if (detectionTimerId !== null) {
        window.clearTimeout(detectionTimerId)
      }
      disposeCurrent()
      document.body.classList.remove('nav-over-hero')
    }
  }, [heroSelector, routeKey, threshold])

  return isScrolled
}