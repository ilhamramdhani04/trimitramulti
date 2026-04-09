import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SectionReveal, StaggerGroup, StaggerItem } from '../components/animation/Reveal'
import LazyImage from '../components/ui/LazyImage'
import { blogPosts } from '../data/blogPosts'
import {
  getBlogPostsFromWordPress,
  isWordPressConfigured,
  prefetchBlogPostBySlugFromWordPress,
} from '../data/wordpressBlog'
import { prefetchRoute } from '../app/routePrefetch'

const postCategories = ['Semua', 'Berita', 'Artikel']
const ITEMS_PER_PAGE = 9
const MAX_PAGINATION_NUMBERS = 10

function normalizeCategoryForFilter(category) {
  const source = (category || '').toLowerCase()
  if (source.includes('artikel') || source.includes('article') || source.includes('blog')) {
    return 'Artikel'
  }
  return 'Berita'
}

function buildPageItems(currentPage, totalPages) {
  if (totalPages <= MAX_PAGINATION_NUMBERS) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 5) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 'ellipsis-right', totalPages]
  }

  if (currentPage >= totalPages - 4) {
    return [
      1,
      'ellipsis-left',
      totalPages - 8,
      totalPages - 7,
      totalPages - 6,
      totalPages - 5,
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]
  }

  return [
    1,
    'ellipsis-left',
    currentPage - 3,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    currentPage + 3,
    currentPage + 4,
    'ellipsis-right',
    totalPages,
  ]
}

function BeritaPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [posts, setPosts] = useState(blogPosts)
  const [isLoadingWp, setIsLoadingWp] = useState(isWordPressConfigured())
  const prefetchedImagesRef = useRef(new Set())
  const prefetchedDetailRef = useRef(new Set())

  useEffect(() => {
    const rawPage = Number(searchParams.get('page') ?? '1')
    const parsedPage = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1
    setCurrentPage(parsedPage)
  }, [searchParams])

  useEffect(() => {
    let cancelled = false

    async function loadFromWordPress() {
      if (!isWordPressConfigured()) return
      try {
        const wpPosts = await getBlogPostsFromWordPress()
        if (!cancelled && wpPosts.length > 0) {
          setPosts(wpPosts)
        }
      } catch {
        // Keep local fallback posts when WordPress is unreachable.
      } finally {
        if (!cancelled) {
          setIsLoadingWp(false)
        }
      }
    }

    loadFromWordPress()
    return () => {
      cancelled = true
    }
  }, [])

  const filteredPosts = useMemo(
    () =>
      activeCategory === 'Semua'
        ? posts
        : posts.filter((post) => normalizeCategoryForFilter(post.category) === activeCategory),
    [activeCategory, posts],
  )

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE))
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE
  const pagedPosts = useMemo(
    () => filteredPosts.slice(pageStart, pageStart + ITEMS_PER_PAGE),
    [filteredPosts, pageStart],
  )

  useEffect(() => {
    if (currentPage <= totalPages) return
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(totalPages))
      return next
    })
  }, [currentPage, setSearchParams, totalPages])

  const featuredPost = posts[0] || blogPosts[0]

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', '1')
      return next
    })
  }

  const handlePageChange = (nextPage) => {
    const clampedPage = Math.min(totalPages, Math.max(1, nextPage))
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(clampedPage))
      return next
    })
  }

  const prefetchDetail = (slug, imageUrl) => {
    if (!slug) return

    prefetchRoute('/berita-detail')

    if (!prefetchedDetailRef.current.has(slug)) {
      prefetchBlogPostBySlugFromWordPress(slug)
      prefetchedDetailRef.current.add(slug)
    }

    if (typeof window !== 'undefined' && imageUrl && !prefetchedImagesRef.current.has(imageUrl)) {
      const image = new window.Image()
      image.decoding = 'async'
      image.src = imageUrl
      prefetchedImagesRef.current.add(imageUrl)
    }
  }

  const pageItems = useMemo(
    () => buildPageItems(currentPage, totalPages),
    [currentPage, totalPages],
  )

  useEffect(() => {
    if (typeof window === 'undefined' || currentPage >= totalPages) return

    const nextPageStart = currentPage * ITEMS_PER_PAGE
    const nextPagePosts = filteredPosts.slice(nextPageStart, nextPageStart + ITEMS_PER_PAGE)

    nextPagePosts.forEach((post) => {
      if (!post?.image || prefetchedImagesRef.current.has(post.image)) return
      const image = new window.Image()
      image.decoding = 'async'
      image.src = post.image
      prefetchedImagesRef.current.add(post.image)
    })
  }, [currentPage, filteredPosts, totalPages])

  return (
    <SectionReveal className="section blog-news-page">
      <div className="container blog-shell">
        <article className="blog-featured-card">
          <LazyImage
            src={featuredPost.image}
            alt={featuredPost.title}
            wrapperClassName="blog-feature-media"
            className="blog-feature-image"
          />
          <div className="blog-feature-overlay" />
          <div className="blog-feature-copy">
            <p className="blog-feature-kicker">Featured</p>
            <h1>{featuredPost.title}</h1>
            <p>{featuredPost.excerpt}</p>
          </div>
          <Link
            className="blog-feature-arrow"
            to={`/berita/${featuredPost.slug}`}
            aria-label="Open featured article"
            onMouseEnter={() => prefetchDetail(featuredPost.slug, featuredPost.image)}
            onFocus={() => prefetchDetail(featuredPost.slug, featuredPost.image)}
          >
            <svg viewBox="0 0 24 24" fill="none" role="presentation">
              <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </article>

        <div className="blog-recent-head">
          <h2>Recent blog posts</h2>
        </div>

        <div className="blog-category-tabs" role="tablist" aria-label="Filter kategori berita">
          {postCategories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={isActive ? 'active' : ''}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            )
          })}
        </div>

        {isLoadingWp ? (
          <div className="blog-post-grid" aria-label="Memuat daftar berita">
            {Array.from({ length: ITEMS_PER_PAGE }, (_, index) => (
              <article key={`blog-skeleton-${index}`} className="blog-card blog-skeleton-card" aria-hidden="true">
                <div className="blog-card-media blog-skeleton-block blog-skeleton-image" />
                <div className="blog-card-body">
                  <div className="blog-skeleton-block blog-skeleton-title" />
                  <div className="blog-skeleton-block blog-skeleton-kicker" />
                  <div className="blog-skeleton-block blog-skeleton-text" />
                  <div className="blog-skeleton-block blog-skeleton-text short" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          <StaggerGroup className="blog-post-grid" once={true} amount={0.08}>
            {pagedPosts.map((item) => (
              <StaggerItem key={item.slug || item.title}>
                <article className="blog-card">
                  <Link
                    to={`/berita/${item.slug}`}
                    className="blog-card-media-link"
                    aria-label={`Buka detail berita ${item.title}`}
                    onMouseEnter={() => prefetchDetail(item.slug, item.image)}
                    onFocus={() => prefetchDetail(item.slug, item.image)}
                  >
                    <LazyImage
                      src={item.image}
                      alt={item.title}
                      wrapperClassName="blog-card-media"
                      className="blog-card-image"
                    />
                  </Link>
                  <div className="blog-card-body">
                    <h3>{item.title}</h3>
                    <p className="blog-card-category">{item.category}</p>
                    <p>{item.excerpt}</p>
                    <div className="blog-card-meta">
                      <span className="blog-card-date">{item.date}</span>
                      <Link
                        className="blog-read-more-btn"
                        to={`/berita/${item.slug}`}
                        onMouseEnter={() => prefetchDetail(item.slug, item.image)}
                        onFocus={() => prefetchDetail(item.slug, item.image)}
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}

        {totalPages > 1 && (
          <div className="gallery-pagination blog-pagination" aria-label="Navigasi halaman berita">
            <button
              type="button"
              className="gallery-page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <div className="gallery-page-number-wrap">
              {pageItems.map((item, index) => {
                if (typeof item === 'string') {
                  return (
                    <span key={`${item}-${index}`} className="gallery-page-ellipsis" aria-hidden="true">
                      ...
                    </span>
                  )
                }

                return (
                  <button
                    key={item}
                    type="button"
                    className={`gallery-page-btn ${item === currentPage ? 'is-active' : ''}`}
                    onClick={() => handlePageChange(item)}
                    aria-current={item === currentPage ? 'page' : undefined}
                  >
                    {item}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              className="gallery-page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </SectionReveal>
  )
}

export default BeritaPage
