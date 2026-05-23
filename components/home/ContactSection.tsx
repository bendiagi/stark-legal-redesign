'use client'

import { useState, FormEvent } from 'react'
import dynamic from 'next/dynamic'
import ScrollReveal from './ScrollReveal'
import styles from './ContactSection.module.css'

const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), { ssr: false })

type FormState = 'idle' | 'sending' | 'ok' | 'error'

export default function ContactSection() {
  const [cState, setCState] = useState<FormState>('idle')
  const [nlState, setNlState] = useState<FormState>('idle')

  async function handleContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (cState === 'sending') return
    setCState('sending')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName:    data.firstName as string,
          lastName:     data.lastName as string,
          email:        data.email as string,
          organisation: data.organisation as string,
          area:         data.area as string,
          message:      data.message as string,
        }),
      })
      if (res.ok) {
        setCState('ok')
        form.reset()
        setTimeout(() => setCState('idle'), 3500)
      } else throw new Error()
    } catch {
      setCState('error')
      setTimeout(() => setCState('idle'), 3500)
    }
  }

  async function handleNewsletter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (nlState === 'sending') return
    setNlState('sending')
    const form = e.currentTarget
    const email = (new FormData(form).get('nlEmail') as string).trim()
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setNlState('ok')
        form.reset()
        setTimeout(() => setNlState('idle'), 3500)
      } else throw new Error()
    } catch {
      setNlState('error')
      setTimeout(() => setNlState('idle'), 3500)
    }
  }

  const submitLabel = cState === 'sending' ? 'Sending…' : cState === 'ok' ? 'Message Sent ✓' : cState === 'error' ? 'Failed — Please Try Again' : 'Send Message'
  const nlLabel = nlState === 'sending' ? 'Subscribing…' : nlState === 'ok' ? 'Subscribed ✓' : nlState === 'error' ? 'Failed — Try Again' : 'Subscribe'

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-h">
      <div className="W">
        <div className={styles.grid}>
          <ScrollReveal>
            <div className="eyebrow">Get In Touch</div>
            <h2 className="H2" id="contact-h">Begin a<br />Conversation</h2>
            <p className={styles.body}>
              Whether you need strategic legal counsel, transaction support, or dispute resolution, our team is ready to understand your situation and provide the right guidance.
            </p>

            <GlobeCanvas />

            <div className={styles.details}>
              <div className={styles.cd}>
                <div className={styles.cdIcon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3.5 3h3.5l1.5 4-2 1.5a9 9 0 004 4L12 10.5l4 1.5v3.5a1.5 1.5 0 01-1.5 1.5A14.5 14.5 0 012 4.5 1.5 1.5 0 013.5 3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div className={styles.cdLbl}>Phone</div>
                  <div className={styles.cdVal}>
                    <a href="tel:+2349096851318">+234 909 685 1318</a><br />
                    <a href="tel:+2348038427202">+234 803 842 7202</a>
                  </div>
                </div>
              </div>
              <div className={styles.cd}>
                <div className={styles.cdIcon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="1.5" y="3.5" width="15" height="11" rx="1" stroke="currentColor" strokeWidth="1.3"/><path d="M1.5 5.5l7 5 7-5" stroke="currentColor" strokeWidth="1.3"/></svg>
                </div>
                <div>
                  <div className={styles.cdLbl}>Email</div>
                  <div className={styles.cdVal}>
                    <a href="mailto:info@starklegalng.com">info@starklegalng.com</a><br />
                    <a href="mailto:admin@starklegalng.com">admin@starklegalng.com</a>
                  </div>
                </div>
              </div>
              <div className={styles.cd}>
                <div className={styles.cdIcon} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1.5C6.5 1.5 4 3.6 4 6.7 4 11.3 9 16.5 9 16.5s5-5.2 5-9.8C14 3.6 11.5 1.5 9 1.5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="9" cy="6.8" r="2" stroke="currentColor" strokeWidth="1.3"/></svg>
                </div>
                <div>
                  <div className={styles.cdLbl}>Offices</div>
                  <div className={styles.officeTags}>
                    <span className={styles.officeTag}>Lagos</span>
                    <span className={styles.officeTag}>Abuja</span>
                    <span className={styles.officeTag}>Port-Harcourt</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay="d2">
            <div className={styles.rightCol}>
              <form onSubmit={handleContact} noValidate>
                <div className={styles.fRow}>
                  <div className={styles.fg}>
                    <label htmlFor="fn">First Name</label>
                    <input id="fn" name="firstName" type="text" placeholder="John" autoComplete="given-name" required />
                  </div>
                  <div className={styles.fg}>
                    <label htmlFor="ln">Last Name</label>
                    <input id="ln" name="lastName" type="text" placeholder="Doe" autoComplete="family-name" />
                  </div>
                </div>
                <div className={styles.fg}>
                  <label htmlFor="em">Email Address</label>
                  <input id="em" name="email" type="email" placeholder="john@company.com" autoComplete="email" required />
                </div>
                <div className={styles.fg}>
                  <label htmlFor="org">Organisation</label>
                  <input id="org" name="organisation" type="text" placeholder="Your company or organisation" autoComplete="organization" />
                </div>
                <div className={styles.fg}>
                  <label htmlFor="area">Practice Area</label>
                  <select id="area" name="area">
                    <option value="">Select a Practice Area</option>
                    <option>Energy</option>
                    <option>Transport &amp; Aviation</option>
                    <option>Financial Services</option>
                    <option>Corporate &amp; Commercial</option>
                    <option>Dispute Resolution</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.fg}>
                  <label htmlFor="msg">Message</label>
                  <textarea id="msg" name="message" placeholder="Briefly describe your legal matter…" required />
                </div>
                <button
                  type="submit"
                  className={`${styles.submit}${cState === 'ok' ? ` ${styles.submitOk}` : cState === 'error' ? ` ${styles.submitErr}` : ''}`}
                  disabled={cState === 'sending'}
                >
                  {submitLabel}
                </button>
              </form>

              <div className={styles.nlWrap}>
                <div className={styles.nlLabel}>Stay informed</div>
                <p className={styles.nlIntro}>Legal insights, sector updates, and firm news — delivered to your inbox.</p>
                <form className={styles.nlForm} onSubmit={handleNewsletter} noValidate>
                  <input
                    type="email"
                    name="nlEmail"
                    className={styles.nlInput}
                    placeholder="Your email address"
                    autoComplete="email"
                    required
                  />
                  <button
                    type="submit"
                    className={`${styles.nlBtn}${nlState === 'ok' ? ` ${styles.nlBtnOk}` : nlState === 'error' ? ` ${styles.nlBtnErr}` : ''}`}
                    disabled={nlState === 'sending'}
                  >
                    {nlLabel}
                  </button>
                </form>
                <p className={styles.nlNote}>No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
