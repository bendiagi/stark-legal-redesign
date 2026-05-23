import Link from 'next/link'
import { getResourcesByType } from '@/lib/queries'
import ResourceCard from '@/components/resources/ResourceCard'
import styles from '../../resources.module.css'

export const revalidate = 3600

const TAGS = [
  { label: 'All', slug: null },
  { label: 'Energy', slug: 'energy' },
  { label: 'Transport', slug: 'transport' },
  { label: 'Financial Services', slug: 'financial-services' },
  { label: 'Corporate & Commercial', slug: 'corporate-commercial' },
  { label: 'Dispute Resolution', slug: 'dispute-resolution' },
]

export default async function RegulatoryUpdatesPage() {
  const resources = await getResourcesByType('regulatory-update')

  return (
    <main className={styles.page}>
      <div className="W">
        <div className={styles.pageHd}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/resources">Resources</Link>
            <span>/</span>
            <span>Regulatory Updates</span>
          </div>
          <h1 className={styles.pageTitle}>Regulatory<br /><em>Updates</em></h1>
          <p className={styles.pageIntro}>Timely analysis of regulatory developments shaping Nigeria&rsquo;s commercial and legal landscape.</p>
          <nav className={styles.tagNav} aria-label="Filter by practice area">
            {TAGS.map(t => (
              <Link
                key={t.slug ?? 'all'}
                href={t.slug ? `/resources/publications/regulatory-updates/${t.slug}` : '/resources/publications/regulatory-updates'}
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
          <p className={styles.empty}>Regulatory updates coming soon.</p>
        )}
      </div>
    </main>
  )
}
