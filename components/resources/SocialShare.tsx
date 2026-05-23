'use client'

import { useState } from 'react'
import styles from './SocialShare.module.css'

export default function SocialShare({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  function getUrl() {
    return typeof window !== 'undefined' ? window.location.href : ''
  }

  function shareLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getUrl())}`, '_blank', 'noopener,noreferrer')
  }

  function shareX() {
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getUrl())}`, '_blank', 'noopener,noreferrer')
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' — ' + getUrl())}`, '_blank', 'noopener,noreferrer')
  }

  async function copyLink() {
    await navigator.clipboard.writeText(getUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Share</span>
      <button className={styles.btn} onClick={shareLinkedIn} aria-label="Share on LinkedIn">
        <svg width="15" height="15" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <path d="M1 1.5h2.5v11H1v-11zm1.25-1.5a1.25 1.25 0 110 2.5A1.25 1.25 0 012.25 0zM5 5.5h2.4v1.5h.04C7.84 5.7 8.9 5 10.3 5 12.5 5 13 6.5 13 8.5v5H10.5V9c0-.8 0-2-1.2-2S7.7 8.2 7.7 9v4.5H5V5.5z"/>
        </svg>
        <span>LinkedIn</span>
      </button>
      <button className={styles.btn} onClick={shareX} aria-label="Share on X">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <path d="M11 1.5h2.5L8.4 7l5.6 6.5H10L6.5 9l-4 4.5H0l5.4-6L.2 1.5H4L7 6l4-4.5z"/>
        </svg>
        <span>X</span>
      </button>
      <button className={styles.btn} onClick={shareWhatsApp} aria-label="Share on WhatsApp">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span>WhatsApp</span>
      </button>
      <button className={`${styles.btn}${copied ? ` ${styles.copied}` : ''}`} onClick={copyLink} aria-label="Copy link">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>
    </div>
  )
}
