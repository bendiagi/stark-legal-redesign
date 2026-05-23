'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './HeroSection.module.css'

const SLIDES = [
  { h: 'Strategic<br /><em>Commercial</em><br />Excellence', sub: '"Pursue Excellence and Success will Follow"' },
  { h: 'Trusted<br />Across <em>Five</em><br />Sectors', sub: 'Energy · Transport · Finance · Corporate · Dispute Resolution' },
  { h: 'Nigerian Law.<br /><em>International</em><br />Standards.', sub: 'Lagos · Abuja · Port-Harcourt' },
]

export default function HeroSection() {
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'idle' | 'out' | 'in'>('intro')

  function handleAnimEnd() {
    if (phase === 'intro' || phase === 'in') setPhase('idle')
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase('out')
      setTimeout(() => {
        setIdx(i => (i + 1) % SLIDES.length)
        setPhase('in')
      }, 500)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[idx]

  return (
    <section id="hero" className={styles.hero} aria-label="Introduction">
      <div className={styles.atm} aria-hidden="true" />

      <div className={styles.geo} aria-hidden="true">
        <svg viewBox="0 0 900 900" fill="none" preserveAspectRatio="xMidYMid slice">
          <circle cx="500" cy="450" r="420" stroke="rgba(200,169,110,0.06)" strokeWidth="1"/>
          <circle cx="500" cy="450" r="340" stroke="rgba(200,169,110,0.07)" strokeWidth="1"/>
          <circle cx="500" cy="450" r="260" stroke="rgba(200,169,110,0.09)" strokeWidth="1"/>
          <circle cx="500" cy="450" r="180" stroke="rgba(200,169,110,0.11)" strokeWidth="1"/>
          <circle cx="500" cy="450" r="100" stroke="rgba(200,169,110,0.13)" strokeWidth="1"/>
          <line x1="80"  y1="450" x2="920" y2="450" stroke="rgba(200,169,110,0.055)" strokeWidth="1"/>
          <line x1="500" y1="20"  x2="500" y2="880" stroke="rgba(200,169,110,0.055)" strokeWidth="1"/>
          <line x1="200" y1="30"  x2="800" y2="870" stroke="rgba(200,169,110,0.035)" strokeWidth="1"/>
          <line x1="800" y1="30"  x2="200" y2="870" stroke="rgba(200,169,110,0.035)" strokeWidth="1"/>
          <line x1="320" y1="330" x2="680" y2="330" stroke="rgba(200,169,110,0.22)" strokeWidth="1.5"/>
          <line x1="500" y1="295" x2="500" y2="365" stroke="rgba(200,169,110,0.22)" strokeWidth="1.5"/>
          <path d="M298 330 A36 36 0 0 0 368 330" stroke="rgba(200,169,110,0.35)" strokeWidth="1.5" fill="none"/>
          <path d="M632 330 A36 36 0 0 0 702 330" stroke="rgba(200,169,110,0.35)" strokeWidth="1.5" fill="none"/>
          <path d="M500 30 A420 420 0 0 1 920 450" stroke="rgba(200,169,110,0.1)" strokeWidth="1.5" fill="none"/>
          <path d="M170 115 A340 340 0 0 0 80 450" stroke="rgba(200,169,110,0.07)" strokeWidth="1" fill="none"/>
          <circle cx="500" cy="30"  r="3.5" fill="rgba(200,169,110,0.28)"/>
          <circle cx="920" cy="450" r="3.5" fill="rgba(200,169,110,0.28)"/>
          <circle cx="500" cy="870" r="3.5" fill="rgba(200,169,110,0.18)"/>
          <circle cx="80"  cy="450" r="3.5" fill="rgba(200,169,110,0.18)"/>
        </svg>
      </div>

      <div className={`W ${styles.body}`}>
        <div className={styles.loc}>Lagos &nbsp;·&nbsp; Abuja &nbsp;·&nbsp; Port-Harcourt</div>
        <div className={styles.headlineWrap}>
          <h1
            className={`${styles.h1}${phase === 'intro' ? ` ${styles.h1Intro}` : ''}${phase === 'out' ? ` ${styles.slideOut}` : phase === 'in' ? ` ${styles.slideIn}` : ''}`}
            onAnimationEnd={handleAnimEnd}
            dangerouslySetInnerHTML={{ __html: slide.h }}
          />
        </div>
        <p className={styles.sub}>{slide.sub}</p>
        <div className={styles.btns}>
          <Link href="/#practice" className="btn btn-gold">
            Our Practice Areas
            <svg className="ico-arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link href="/#contact" className="btn btn-ghost">Book a Consultation</Link>
        </div>
      </div>

      <div className={styles.strip} aria-label="Firm highlights">
        <div className={styles.hs}><div className={styles.hsN}>11<b>+</b></div><div className={styles.hsL}>Years of Excellence</div></div>
        <div className={styles.hs}><div className={styles.hsN}>5</div><div className={styles.hsL}>Practice Areas</div></div>
        <div className={styles.hs}><div className={styles.hsN}>3</div><div className={styles.hsL}>Office Cities</div></div>
        <div className={styles.hs}><div className={styles.hsN}>6<b>+</b></div><div className={styles.hsL}>Industry Awards</div></div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">Scroll</div>
    </section>
  )
}
