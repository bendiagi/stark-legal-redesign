import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getResourcesByTypeAndTag } from '@/lib/queries'
import ResourceCard from '@/components/resources/ResourceCard'
import styles from '../../../resources.module.css'

export const revalidate = 60

const TAGS = [
  { label: 'All', slug: null },
  { label: 'People & Appointments', slug: 'people-appointments' },
  { label: 'Careers & Graduates', slug: 'careers-graduates' },
  { label: 'Awards & Recognition', slug: 'awards-recognition' },
  { label: 'Milestones & Anniversaries', slug: 'milestones-anniversaries' },
  { label: 'Deals & Mandates', slug: 'deals-mandates' },
  { label: 'Partnerships & Alliances', slug: 'partnerships-alliances' },
  { label: 'Events & Webinars', slug: 'events-webinars' },
  { label: 'Community & CSR', slug: 'community-csr' },
  { label: 'Firm News', slug: 'firm-news' },
]

const VALID_TAGS = TAGS.filter(t => t.slug).map(t => t.slug as string)

export function generateStaticParams() {
  return VALID_TAGS.map(tag => ({ tag }))
}

export default async function CompanyUpdatesByTagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params
  if (!VALID_TAGS.includes(tag)) notFound()

  const resources = await getResourcesByTypeAndTag('company-update', tag)
  const currentTag = TAGS.find(t => t.slug === tag)!

  return (
    <main className={styles.page}>
      <div className="W">
        <div className={styles.pageHd}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/resources/publications/company-updates">Company Updates</Link>
            <span>/</span>
            <span>{currentTag.label}</span>
          </div>
          <h1 className={styles.pageTitle}><em>{currentTag.label}</em><br />Company Updates</h1>
          <p className={styles.pageIntro}>Company announcements and updates relevant to the {currentTag.label} sector.</p>
          <nav className={styles.tagNav} aria-label="Filter by practice area">
            {TAGS.map(t => (
              <Link
                key={t.slug ?? 'all'}
                href={t.slug ? `/resources/publications/company-updates/${t.slug}` : '/resources/publications/company-updates'}
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
          <p className={styles.empty}>No {currentTag.label} company updates published yet.</p>
        )}
      </div>
    </main>
  )
}
