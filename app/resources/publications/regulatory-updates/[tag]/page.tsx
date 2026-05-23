import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getResourcesByTypeAndTag } from '@/lib/queries'
import ResourceCard from '@/components/resources/ResourceCard'
import styles from '../../../resources.module.css'

export const revalidate = 3600

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

export default async function RegulatoryUpdatesByTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  if (!VALID_TAGS.includes(tag)) notFound()

  const resources = await getResourcesByTypeAndTag('regulatory-update', tag)
  const currentTag = TAGS.find(t => t.slug === tag)!

  return (
    <main className={styles.page}>
      <div className="W">
        <div className={styles.pageHd}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/resources/publications/regulatory-updates">Regulatory Updates</Link>
            <span>/</span>
            <span>{currentTag.label}</span>
          </div>
          <h1 className={styles.pageTitle}><em>{currentTag.label}</em><br />Regulatory Updates</h1>
          <p className={styles.pageIntro}>Regulatory developments affecting the {currentTag.label} sector in Nigeria.</p>
          <nav className={styles.tagNav} aria-label="Filter by practice area">
            {TAGS.map(t => (
              <Link
                key={t.slug ?? 'all'}
                href={t.slug ? `/resources/publications/regulatory-updates/${t.slug}` : '/resources/publications/regulatory-updates'}
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
          <p className={styles.empty}>No {currentTag.label} regulatory updates published yet.</p>
        )}
      </div>
    </main>
  )
}
