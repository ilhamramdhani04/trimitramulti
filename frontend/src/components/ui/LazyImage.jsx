import { useEffect, useRef, useState } from 'react'

const ONE_PIXEL_GIF =
  'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='

function LazyImage({
  src,
  alt,
  className,
  wrapperClassName = '',
  style,
  onLoad,
  ...rest
}) {
  const [inView, setInView] = useState(() => {
    if (typeof window === 'undefined') return false
    return !('IntersectionObserver' in window)
  })
  const [loadedSrc, setLoadedSrc] = useState('')
  const hostRef = useRef(null)

  useEffect(() => {
    if (inView) return undefined

    const node = hostRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '180px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView])

  return (
    <div ref={hostRef} className={`lazy-image-wrap ${wrapperClassName}`.trim()}>
      <img
        src={inView ? src : ONE_PIXEL_GIF}
        alt={alt}
        className={`lazy-image ${loadedSrc === src ? 'is-loaded' : ''} ${className || ''}`.trim()}
        style={style}
        loading="lazy"
        decoding="async"
        onLoad={(event) => {
          if (!inView) return
          setLoadedSrc(src)
          if (onLoad) onLoad(event)
        }}
        {...rest}
      />
    </div>
  )
}

export default LazyImage
