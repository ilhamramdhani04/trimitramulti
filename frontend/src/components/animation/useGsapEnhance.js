import { useLayoutEffect } from 'react'

export function useGsapEnhance() {
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) return undefined

    let isMounted = true
    let cleanup = () => {}

    const init = async () => {
      const gsapModule = await import('gsap')
      const scrollTriggerModule = await import('gsap/ScrollTrigger')
      if (!isMounted) return

      const gsap = gsapModule.default || gsapModule.gsap
      const ScrollTrigger =
        scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default

      gsap.registerPlugin(ScrollTrigger)

      const parallaxTargets = gsap.utils.toArray('[data-gsap-parallax]')
      const floatTargets = gsap.utils.toArray('[data-gsap-float]')

      const tweens = []

      parallaxTargets.forEach((target) => {
        tweens.push(
          gsap.fromTo(
            target,
            { yPercent: -4, scale: 1.03 },
            {
              yPercent: 8,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: target,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          ),
        )
      })

      floatTargets.forEach((target, index) => {
        tweens.push(
          gsap.to(target, {
            y: -8,
            duration: 2 + (index % 3) * 0.25,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          }),
        )
      })

      cleanup = () => {
        tweens.forEach((tween) => tween.kill())
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    init()

    return () => {
      isMounted = false
      cleanup()
    }
  }, [])
}
