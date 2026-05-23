import Link from 'next/link'
import Image from 'next/image'
import { Resource } from '@/lib/queries'
import { resolveResourceImage } from '@/lib/sanity.image'
import styles from './ResourceCard.module.css'

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

export default function ResourceCard({ resource }: { resource: Resource }) {
  const imgUrl = resolveResourceImage(resource.image ?? {})
  const label = resource.tag ? TAG_LABELS[resource.tag] : TYPE_LABELS[resource.resourceType]

  return (
    <Link href={`/resources/${resource.slug.current}`} className={styles.card}>
      {imgUrl && (
        <div className={styles.img}>
          <Image src={imgUrl} alt={resource.image?.alt ?? resource.title} width={800} height={440} style={{ objectFit: 'cover', height: 218 }} />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.tag}>{label}</span>
          <time className={styles.date} dateTime={resource.date}>{formatDate(resource.date)}</time>
        </div>
        <h3 className={styles.title}>{resource.title}</h3>
        {resource.excerpt && <p className={styles.excerpt}>{resource.excerpt}</p>}
        <span className={styles.link} aria-hidden="true">Read More</span>
      </div>
    </Link>
  )
}
