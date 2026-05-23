'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'
import styles from './PhotoGallerySection.module.css'

const PHOTOS = [
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450805/starklegal/gallery/NSIB-9.jpg',   alt: 'NSIB Safety Summit networking', cap: 'NSIB Safety Summit · Lagos, 2025', extra: false, tall: false, wide: false },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450810/starklegal/gallery/NSIB-199.jpg', alt: 'NSIB Safety Summit speakers', cap: 'Aviation Safety Forum · Stark Legal', extra: false, tall: true, wide: false },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450813/starklegal/gallery/NSIB-122.jpg', alt: 'NSIB stakeholder engagement', cap: 'Stakeholder Engagement · 2025', extra: false, tall: false, wide: false },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450817/starklegal/gallery/NSIB-87.jpg',  alt: 'NSIB conference session', cap: 'Conference Session · Abuja', extra: false, tall: false, wide: false },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450820/starklegal/gallery/NSIB-132.jpg', alt: 'NSIB panel discussion', cap: 'Panel Discussion · NSIB Forum', extra: false, tall: false, wide: false },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450824/starklegal/gallery/NSIB-55.jpg',  alt: 'NSIB keynote event', cap: 'Keynote Address · Safety Summit 2025', extra: true, tall: false, wide: true },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450829/starklegal/gallery/NSIB-149.jpg', alt: 'NSIB briefing session', cap: 'Media Briefing · Lagos', extra: true, tall: false, wide: false },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450832/starklegal/gallery/NSIB-133.jpg', alt: 'NSIB delegates networking', cap: 'Delegate Networking · 2025', extra: true, tall: false, wide: false },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450836/starklegal/gallery/NSIB-326.jpg', alt: 'NSIB Safety Summit closing', cap: 'Safety Summit Closing · Stark Legal', extra: true, tall: false, wide: true },
]

export default function PhotoGallerySection() {
  const [open, setOpen] = useState(false)
  const [lbIdx, setLbIdx] = useState<number | null>(null)
  const [switching, setSwitching] = useState(false)

  const openLb = useCallback((idx: number) => {
    setLbIdx(idx)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLb = useCallback(() => {
    setLbIdx(null)
    document.body.style.overflow = ''
  }, [])

  const nav = useCallback((dir: number) => {
    setLbIdx(prev => {
      if (prev === null) return null
      setSwitching(true)
      setTimeout(() => setSwitching(false), 160)
      return (prev + dir + PHOTOS.length) % PHOTOS.length
    })
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lbIdx === null) return
      if (e.key === 'Escape') closeLb()
      if (e.key === 'ArrowLeft') nav(-1)
      if (e.key === 'ArrowRight') nav(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lbIdx, closeLb, nav])

  return (
    <section id="photo-gallery" className={styles.pg} aria-labelledby="pg-h">
      <div className="W">
        <div className={styles.hd}>
          <ScrollReveal>
            <div className="eyebrow eyebrow--dim">Gallery</div>
            <h2 className="H2 H2--lt" id="pg-h">Stark Legal<br />in Focus</h2>
          </ScrollReveal>
          <ScrollReveal delay="d2">
            <p className={styles.hdRight}>
              From boardroom negotiations to landmark safety briefings — a glimpse into the firm at work across Nigeria&rsquo;s most consequential sectors.
            </p>
          </ScrollReveal>
        </div>

        <div className={`${styles.grid}${open ? ` ${styles.gridOpen}` : ''}`}>
          {PHOTOS.map((p, i) => {
            if (p.extra && !open) return null
            return (
              <figure
                key={i}
                className={`${styles.item}${p.tall ? ` ${styles.tall}` : ''}${p.wide ? ` ${styles.wide}` : ''}`}
                onClick={() => openLb(i)}
                role="button"
                tabIndex={0}
                aria-label={`View: ${p.cap}`}
                onKeyDown={e => e.key === 'Enter' && openLb(i)}
              >
                <Image src={p.src} alt={p.alt} fill style={{ objectFit: 'cover', objectPosition: 'top' }} loading="lazy" />
                <figcaption className={styles.cap}>{p.cap}</figcaption>
              </figure>
            )
          })}
        </div>

        <div className={styles.toggleRow}>
          <button
            className={`${styles.toggle}${open ? ` ${styles.toggleOpen}` : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
          >
            <span>{open ? 'Show Fewer Photos' : 'Show More Photos'}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 4.5l5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {lbIdx !== null && (
        <div
          className={styles.lb}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={e => { if (e.target === e.currentTarget) closeLb() }}
        >
          <button className={`${styles.lbBtn} ${styles.lbPrev}`} onClick={e => { e.stopPropagation(); nav(-1) }} aria-label="Previous image">&#8592;</button>
          <img
            className={`${styles.lbImg}${switching ? ` ${styles.lbSwitching}` : ''}`}
            src={PHOTOS[lbIdx].src}
            alt={PHOTOS[lbIdx].alt}
          />
          <button className={`${styles.lbBtn} ${styles.lbNext}`} onClick={e => { e.stopPropagation(); nav(1) }} aria-label="Next image">&#8594;</button>
          <button className={styles.lbClose} onClick={closeLb} aria-label="Close viewer">&#215;</button>
          <span className={styles.lbCount}>{lbIdx + 1} / {PHOTOS.length}</span>
        </div>
      )}
    </section>
  )
}
