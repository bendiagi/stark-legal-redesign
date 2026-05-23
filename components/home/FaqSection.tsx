'use client'

import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import styles from './FaqSection.module.css'

const FAQS = [
  {
    q: 'What types of clients does Stark Legal work with?',
    a: 'We work with a broad range of clients including local and international corporations, government agencies, regulatory bodies, non-governmental organisations, and high-net-worth individuals. Our client list spans the energy, transport, financial services, and technology sectors across Nigeria and beyond.',
  },
  {
    q: 'How do I begin an engagement with the firm?',
    a: 'Begin by completing our contact form or reaching us by phone or email. We will arrange a preliminary consultation to understand your matter, confirm there is no conflict of interest, and propose a clear scope and fee arrangement before any formal instruction is given.',
  },
  {
    q: 'Does Stark Legal handle international matters?',
    a: 'Yes. While we are a Nigerian-focused firm, many of our mandates have cross-border dimensions — particularly in energy transactions, international arbitration, and foreign investment into Nigeria. We maintain working relationships with reputable counsel in key jurisdictions to ensure seamless support wherever needed.',
  },
  {
    q: 'What are your offices and hours of operation?',
    a: 'Stark Legal maintains offices in Lagos, Abuja, and Port-Harcourt. Our standard hours are Monday to Friday, 8:30am to 5:30pm WAT. For urgent matters, clients may reach the relevant partner directly via contact details provided at the start of the engagement.',
  },
  {
    q: 'How does Stark Legal structure its fees?',
    a: 'We offer flexible fee arrangements tailored to each matter — including time-based billing, fixed fees for well-defined transactions, and retainer arrangements for ongoing advisory relationships. All fee structures are agreed in writing before the engagement commences, with no surprise charges.',
  },
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq-h">
      <div className="W">
        <div className={styles.inner}>
          <ScrollReveal>
            <div className="eyebrow eyebrow--dim">Common Questions</div>
            <h2 className="H2 H2--lt" id="faq-h">Frequently<br />Asked Questions</h2>
            <p className={styles.intro}>Answers to the questions our new clients most often ask — before, during, and after an engagement.</p>
          </ScrollReveal>

          <div className={styles.list}>
            {FAQS.map((f, i) => (
              <div key={i} className={`${styles.item}${openIdx === i ? ` ${styles.open}` : ''}`}>
                <button
                  className={styles.q}
                  aria-expanded={openIdx === i}
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className={styles.icon} aria-hidden="true">+</span>
                </button>
                <div className={styles.a} role="region">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
