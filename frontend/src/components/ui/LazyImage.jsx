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
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const hostRef = useRef(null)

  useEffect(() => {
    setLoaded(false)
  }, [src])

  useEffect(() => {
    const node = hostRef.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

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
  }, [])

  return (
    <div ref={hostRef} className={`lazy-image-wrap ${wrapperClassName}`.trim()}>
      <img
        src={inView ? src : ONE_PIXEL_GIF}
        alt={alt}
        className={`lazy-image ${loaded ? 'is-loaded' : ''} ${className || ''}`.trim()}
        style={style}
        loading="lazy"
        decoding="async"
        onLoad={(event) => {
          if (!inView) return
          setLoaded(true)
          if (onLoad) onLoad(event)
        }}
        {...rest}
      />
    </div>
  )
}

export default LazyImage
