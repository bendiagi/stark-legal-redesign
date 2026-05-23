'use client'

import { useState, useEffect, useCallback } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './TestimonialsSection.module.css'

const T = [
  {
    company: 'Meridian Energy Holdings',
    quote: 'Stark Legal provided exceptional counsel on our upstream licensing renewals. Their knowledge of Nigeria\'s regulatory environment is second to none.',
    name: 'Adaeze Okonkwo',
    role: 'CFO, Meridian Energy Holdings',
  },
  {
    company: 'Aviar Nigeria',
    quote: 'When we faced an NSIB investigation, Stark Legal\'s aviation team navigated us through the process with expert precision and kept our operations on track.',
    name: 'Emeka Nwosu',
    role: 'CEO, Aviar Nigeria',
  },
  {
    company: 'Bridgestone Capital',
    quote: 'Their fintech regulatory advisory was invaluable as we scaled. Stark Legal understood both our business objectives and the compliance landscape perfectly.',
    name: 'Fatima Al-Hassan',
    role: 'General Counsel, Bridgestone Capital',
  },
]

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0)
  const [resetKey, setResetKey] = useState(0)
  const current = T[idx]

  const navigate = useCallback((newIdx: number) => {
    setIdx((newIdx + T.length) % T.length)
    setResetKey(k => k + 1)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => navigate(idx + 1), 6200)
    return () => clearInterval(timer)
  }, [idx, navigate, resetKey])

  const words = current.quote.split(' ')
  const fillPct = ((idx + 1) / T.length) * 100

  return (
    <section id="testi" className={styles.testi} aria-labelledby="testi-h">
      <div className={styles.bgNum} aria-hidden="true">{String(idx + 1).padStart(2, '0')}</div>
      <div className="W">
        <div className={styles.inner}>
          <div className={styles.left} aria-hidden="true">
            <span className={styles.vert}>Client Voices</span>
            <div className={styles.prog}>
              <div className={styles.pfill} style={{ height: `${fillPct}%` }} />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.headWrap}>
              <ScrollReveal>
                <div className="eyebrow">Client Voices</div>
                <h2 className="H2" id="testi-h" style={{ marginBottom: 0 }}>What Our Clients<br />Say About Us</h2>
              </ScrollReveal>
            </div>

            <div className={styles.badge}>{current.company}</div>

            <blockquote key={`q-${idx}-${resetKey}`} className={styles.quote}>
              {words.map((w, i) => (
                <span
                  key={i}
                  className={styles.tw}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {w}{' '}
                </span>
              ))}
            </blockquote>

            <div className={styles.foot}>
              <div className={styles.author}>
                <div className={styles.aLine} aria-hidden="true" />
                <div>
                  <div className={styles.aName}>{current.name}</div>
                  <div className={styles.aRole}>{current.role}</div>
                </div>
              </div>
              <div className={styles.nav} role="group" aria-label="Testimonial navigation">
                <button className={styles.btn} onClick={() => navigate(idx - 1)} aria-label="Previous">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className={styles.btn} onClick={() => navigate(idx + 1)} aria-label="Next">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
