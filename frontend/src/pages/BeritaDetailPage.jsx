import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SectionReveal } from '../components/animation/Reveal'
import LazyImage from '../components/ui/LazyImage'
import { prefetchRoute } from '../app/routePrefetch'
import { blogPosts, getBlogPostBySlug } from '../data/blogPosts'
import {
  getBlogPostBySlugFromWordPress,
  getBlogPostsFromWordPress,
  isWordPressConfigured,
  prefetchBlogPostBySlugFromWordPress,
} from '../data/wordpressBlog'

function BeritaDetailPage() {
  const { slug } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState(() => getBlogPostBySlug(slug))
  const [relatedPosts, setRelatedPosts] = useState(() => {
    const currentPost = getBlogPostBySlug(slug)
    if (!currentPost) return []
    const sameCategoryPosts = blogPosts.filter(
      (item) => item.slug !== currentPost.slug && item.category === currentPost.category,
    )
    const fallbackPosts = blogPosts.filter(
      (item) => item.slug !== currentPost.slug && item.category !== currentPost.category,
    )
    return [...sameCategoryPosts, ...fallbackPosts].slice(0, 3)
  })

  useEffect(() => {
    let cancelled = false

    async function loadFromWordPress() {
      if (!isWordPressConfigured()) {
        const localPost = getBlogPostBySlug(slug)
        if (cancelled) return
        setPost(localPost)
        if (!localPost) {
          setIsLoading(false)
          return
        }

        const sameCategoryPosts = blogPosts.filter(
          (item) => item.slug !== localPost.slug && item.category === localPost.category,
        )
        const fallbackPosts = blogPosts.filter(
          (item) => item.slug !== localPost.slug && item.category !== localPost.category,
        )
        setRelatedPosts([...sameCategoryPosts, ...fallbackPosts].slice(0, 3))
        setIsLoading(false)
        return
      }

      try {
        const [wpPost, wpPosts] = await Promise.all([
          getBlogPostBySlugFromWordPress(slug),
          getBlogPostsFromWordPress({ perPage: 20, allPages: false }),
        ])

        if (cancelled) return
        if (!wpPost) {
          setPost(getBlogPostBySlug(slug))
          setIsLoading(false)
          return
        }

        setPost(wpPost)
        const sameCategory = wpPosts.filter(
          (item) => item.slug !== wpPost.slug && item.category === wpPost.category,
        )
        const fallback = wpPosts.filter(
          (item) => item.slug !== wpPost.slug && item.category !== wpPost.category,
        )
        setRelatedPosts([...sameCategory, ...fallback].slice(0, 3))
        setIsLoading(false)
      } catch {
        if (!cancelled) {
          const localPost = getBlogPostBySlug(slug)
          setPost(localPost)
          setIsLoading(false)
        }
      }
    }

    loadFromWordPress()

    return () => {
      cancelled = true
    }
  }, [slug])

  const prefetchRelatedDetail = (targetSlug) => {
    if (!targetSlug) return
    prefetchRoute('/berita-detail')
    prefetchBlogPostBySlugFromWordPress(targetSlug)
  }

  if (isLoading) {
    return (
      <SectionReveal className="section blog-detail-page">
        <div className="route-loader" aria-label="Memuat detail berita" />
      </SectionReveal>
    )
  }
  if (!post) return <Navigate to="/berita" replace />

  return (
    <SectionReveal className="section blog-detail-page">
      <div className="container blog-detail-shell">
        <Link className="blog-detail-back" to="/berita">← Kembali ke Berita</Link>

        <header className="blog-detail-head">
          <p className="kicker">{post.category}</p>
          <h1>{post.title}</h1>
          <div className="blog-detail-meta">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <article className="blog-detail-article">
          <LazyImage
            src={post.image}
            alt={post.title}
            wrapperClassName="blog-detail-image-wrap"
            className="blog-detail-image"
          />

          <p className="blog-detail-lead">{post.excerpt}</p>

          {post.contentHtml ? (
            <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          ) : (
            post.content?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          )}
        </article>

        {relatedPosts.length > 0 && (
          <section className="blog-detail-related" aria-label="Related posts">
            <div className="blog-detail-related-head">
              <h2>Related posts</h2>
            </div>

            <div className="blog-post-grid">
              {relatedPosts.map((item) => (
                <article key={item.slug} className="blog-card">
                  <Link
                    to={`/berita/${item.slug}`}
                    className="blog-card-media-link"
                    aria-label={`Buka detail berita ${item.title}`}
                    onMouseEnter={() => prefetchRelatedDetail(item.slug)}
                    onFocus={() => prefetchRelatedDetail(item.slug)}
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
                        onMouseEnter={() => prefetchRelatedDetail(item.slug)}
                        onFocus={() => prefetchRelatedDetail(item.slug)}
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </SectionReveal>
  )
}

export default BeritaDetailPage
