import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getResourcesByTypeAndTag } from '@/lib/queries'
import ResourceCard from '@/components/resources/ResourceCard'
import styles from '../../../resources.module.css'

export const revalidate = 60

const TAGS = [
  { label: 'All', slug: null },
  { label: 'Energy', slug: 'energy' },
  { label: 'Transport', slug: 'transport' },
  { label: 'Financial Services', slug: 'financial-services' },
  { label: 'Corporate & Commercial', slug: 'corporate-commercial' },
  { label: 'Dispute Resolution', slug: 'dispute-resolution' },
]

const VALID_TAGS = TAGS.filter(t => t.slug).map(t => t.slug as string)

export function generateStaticParams() {
  return VALID_TAGS.map(tag => ({ tag }))
}

export default async function ArticlesByTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  if (!VALID_TAGS.includes(tag)) notFound()

  const resources = await getResourcesByTypeAndTag('article', tag)
  const currentTag = TAGS.find(t => t.slug === tag)!

  return (
    <main className={styles.page}>
      <div className="W">
        <div className={styles.pageHd}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/resources/publications/articles">Articles</Link>
            <span>/</span>
            <span>{currentTag.label}</span>
          </div>
          <h1 className={styles.pageTitle}><em>{currentTag.label}</em><br />Articles</h1>
          <p className={styles.pageIntro}>Legal analysis and commentary from our {currentTag.label} practice.</p>
          <nav className={styles.tagNav} aria-label="Filter by practice area">
            {TAGS.map(t => (
              <Link
                key={t.slug ?? 'all'}
                href={t.slug ? `/resources/publications/articles/${t.slug}` : '/resources/publications/articles'}
                className={`${styles.tagLink} ${t.slug === tag ? styles.tagLinkActive : ''}`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>

        {resources.length > 0 ? (
          <div className={styles.grid}>
            {resources.map(r => <ResourceCard key={r._id} resource={r} />)}
          </div>
        ) : (
          <p className={styles.empty}>No {currentTag.label} articles published yet.</p>
        )}
      </div>
    </main>
  )
}
