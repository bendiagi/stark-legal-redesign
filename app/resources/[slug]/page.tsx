import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getResourceBySlug, getAllResourceSlugs } from '@/lib/queries'
import { resolveResourceImage } from '@/lib/sanity.image'
import ArticleBody from '@/components/resources/ArticleBody'
import SocialShare from '@/components/resources/SocialShare'
import styles from './article.module.css'

export const revalidate = 3600

const TAG_LABELS: Record<string, string> = {
  'energy': 'Energy',
  'transport': 'Transport & Aviation',
  'financial-services': 'Financial Services',
  'corporate-commercial': 'Corporate & Commercial',
  'dispute-resolution': 'Dispute Resolution',
}

const TYPE_LABELS: Record<string, string> = {
  'article': 'Article',
  'regulatory-update': 'Regulatory Update',
  'newsletter': 'Newsletter',
}

const TYPE_BASE: Record<string, string> = {
  'article': '/resources/publications/articles',
  'regulatory-update': '/resources/publications/regulatory-updates',
  'newsletter': '/resources/newsletters',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function generateStaticParams() {
  const slugs = await getAllResourceSlugs()
  return slugs.map(s => ({ slug: s.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = await getResourceBySlug(slug)
  if (!resource) return {}
  return { title: `${resource.title} — Stark Legal`, description: resource.excerpt }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = await getResourceBySlug(slug)
  if (!resource) notFound()

  const imgUrl = resolveResourceImage(resource.image ?? {})
  const typeLabel = TYPE_LABELS[resource.resourceType]
  const tagLabel = resource.tag ? TAG_LABELS[resource.tag] : null
  const backHref = resource.tag
    ? `${TYPE_BASE[resource.resourceType]}/${resource.tag}`
    : TYPE_BASE[resource.resourceType]

  return (
    <main className={styles.article}>
      <div className="W">
        <div className={styles.inner}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={TYPE_BASE[resource.resourceType]}>{typeLabel}s</Link>
            {tagLabel && (
              <>
                <span>/</span>
                <Link href={backHref}>{tagLabel}</Link>
              </>
            )}
          </div>

          {imgUrl && (
            <div className={styles.hero}>
              <Image
                src={imgUrl}
                alt={resource.image?.alt ?? resource.title}
                width={1200}
                height={560}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
          )}

          <div className={styles.meta}>
            <span className={styles.typeTag}>{typeLabel}</span>
            {tagLabel && <span className={styles.tagPill}>{tagLabel}</span>}
            <time className={styles.date} dateTime={resource.date}>{formatDate(resource.date)}</time>
          </div>

          <h1 className={styles.title}>{resource.title}</h1>

          {resource.excerpt && <p className={styles.lede}>{resource.excerpt}</p>}

          <hr className={styles.rule} />

          {Array.isArray(resource.body) && resource.body.length > 0 && (
            <ArticleBody body={resource.body} />
          )}

          <SocialShare title={resource.title} />

          <div className={styles.back}>
            <Link href={backHref} className="btn btn-outline">
              <svg viewBox="0 0 16 16" fill="none" className="ico-arr" aria-hidden="true" style={{ transform: 'rotate(180deg)' }}>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to {tagLabel ?? typeLabel + 's'}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
