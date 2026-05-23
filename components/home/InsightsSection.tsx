'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import styles from './InsightsSection.module.css'

const ARTICLES = [
  {
    tag: 'Energy Law',
    date: 'March 2025',
    title: "Nigeria's Petroleum Industry Act: Two Years On",
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=440&fit=crop&auto=format&q=85',
  },
  {
    tag: 'Transport & Aviation',
    date: 'January 2025',
    title: "NSIB Investigations & Airline Liability: A Practitioner's Guide",
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=440&fit=crop&auto=format&q=85',
  },
  {
    tag: 'Financial Services',
    date: 'October 2024',
    title: "Fintech Regulation in Nigeria: Navigating the SEC's Digital Asset Framework",
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=440&fit=crop&auto=format&q=85',
  },
  {
    tag: 'Dispute Resolution',
    date: 'July 2024',
    title: 'Arbitration in Nigeria: Choosing the Right Forum',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=440&fit=crop&auto=format&q=85',
  },
  {
    tag: 'Corporate & Commercial',
    date: 'April 2024',
    title: 'CAMA 2020: Four Years Later — What Boards Must Know',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=440&fit=crop&auto=format&q=85',
  },
  {
    tag: 'Transport & Aviation',
    date: 'January 2024',
    title: 'Port Operations & Maritime Liability Under Nigerian Law',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=440&fit=crop&auto=format&q=85',
  },
]

function ArticleCard({ tag, date, title, image }: typeof ARTICLES[0]) {
  return (
    <article className={styles.card}>
      <div className={styles.ncImg}>
        <Image src={image} alt={title} width={800} height={440} style={{ objectFit: 'cover', height: 218 }} />
      </div>
      <div className={styles.ncBody}>
        <div className={styles.ncMeta}>
          <span className={styles.ncTag}>{tag}</span>
          <time className={styles.ncDate}>{date}</time>
        </div>
        <h3 className={styles.ncTitle}>{title}</h3>
        <a href="/#contact" className={styles.ncLink}>Read More</a>
      </div>
    </article>
  )
}

export default function InsightsSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section id="news" className={styles.news} aria-labelledby="news-h">
      <div className="W">
        <div className={styles.hd}>
          <ScrollReveal>
            <div className="eyebrow">Insights</div>
            <h2 className="H2" id="news-h">Articles &amp;<br />Publications</h2>
          </ScrollReveal>
          <ScrollReveal delay="d2">
            <p className={styles.hdRight}>
              Our lawyers share thinking on the legal issues shaping Nigeria&rsquo;s economy — from regulatory reform to landmark arbitration.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {ARTICLES.slice(0, 3).map((a, i) => <ArticleCard key={i} {...a} />)}
        </div>

        {expanded && (
          <div className={styles.grid} style={{ marginTop: '3px' }}>
            {ARTICLES.slice(3).map((a, i) => <ArticleCard key={i} {...a} />)}
          </div>
        )}

        <div className={styles.toggleRow}>
          <button
            className="btn btn-outline"
            onClick={() => setExpanded(v => !v)}
          >
            {expanded ? 'Fewer Publications' : 'More Publications'}
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
              style={{ transition: 'transform .3s', transform: expanded ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
            >
              <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Link href="/resources/publications/articles" className="btn btn-outline">
            View All Resources
            <svg className="ico-arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
