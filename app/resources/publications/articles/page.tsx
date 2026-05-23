import Link from 'next/link'
import { getResourcesByType } from '@/lib/queries'
import ResourceCard from '@/components/resources/ResourceCard'
import styles from '../../resources.module.css'

export const revalidate = 60

const TAGS = [
  { label: 'All', slug: null },
  { label: 'Energy', slug: 'energy' },
  { label: 'Transport', slug: 'transport' },
  { label: 'Financial Services', slug: 'financial-services' },
  { label: 'Corporate & Commercial', slug: 'corporate-commercial' },
  { label: 'Dispute Resolution', slug: 'dispute-resolution' },
]

export default async function ArticlesPage() {
  const resources = await getResourcesByType('article')

  return (
    <main className={styles.page}>
      <div className="W">
        <div className={styles.pageHd}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/resources">Resources</Link>
            <span>/</span>
            <span>Articles</span>
          </div>
          <h1 className={styles.pageTitle}>Articles &amp;<br /><em>Publications</em></h1>
          <p className={styles.pageIntro}>Legal analysis, sector commentary, and thought leadership from the Stark Legal team.</p>
          <nav className={styles.tagNav} aria-label="Filter by practice area">
            {TAGS.map(t => (
              <Link
                key={t.slug ?? 'all'}
                href={t.slug ? `/resources/publications/articles/${t.slug}` : '/resources/publications/articles'}
                className={`${styles.tagLink} ${!t.slug ? styles.tagLinkActive : ''}`}
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
          <p className={styles.empty}>Articles and publications coming soon.</p>
        )}
      </div>
    </main>
  )
}
