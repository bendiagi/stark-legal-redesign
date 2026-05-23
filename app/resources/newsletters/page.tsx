import Link from 'next/link'
import { getResourcesByType } from '@/lib/queries'
import ResourceCard from '@/components/resources/ResourceCard'
import styles from '../resources.module.css'

export const revalidate = 60

export default async function NewslettersPage() {
  const resources = await getResourcesByType('newsletter')

  return (
    <main className={styles.page}>
      <div className="W">
        <div className={styles.pageHd}>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/resources">Resources</Link>
            <span>/</span>
            <span>Newsletters</span>
          </div>
          <h1 className={styles.pageTitle}>Stark Legal<br /><em>Newsletters</em></h1>
          <p className={styles.pageIntro}>Periodic dispatches covering key legal and regulatory developments across Nigeria&rsquo;s commercial sectors.</p>
        </div>

        {resources.length > 0 ? (
          <div className={styles.grid}>
            {resources.map(r => <ResourceCard key={r._id} resource={r} />)}
          </div>
        ) : (
          <p className={styles.empty}>Newsletters coming soon. <Link href="/#contact">Subscribe</Link> to be notified.</p>
        )}
      </div>
    </main>
  )
}
