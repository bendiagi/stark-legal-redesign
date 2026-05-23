import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="footer" className={styles.footer} aria-label="Footer">
      <div className="W">
        <div className={styles.footerTop}>
          {/* Brand */}
          <div>
            <div className={styles.footerLogo}>
              <Image
                src="https://res.cloudinary.com/djnkxndun/image/upload/v1779269638/Stark_Legal_NG_Logo_styqvp.png"
                alt=""
                width={38}
                height={38}
                className={styles.footerIcon}
                aria-hidden="true"
              />
              <Image
                src="https://res.cloudinary.com/daglfnssf/image/upload/v1777450729/starklegal/brand/starklegal-wordmark.png"
                alt="Stark Legal"
                width={120}
                height={13}
                className="footer-wordmark-img"
              />
            </div>
            <p className={styles.footerTag}>&ldquo;Pursue Excellence<br />and Success will Follow&rdquo;</p>
            <div className={styles.footerSocials}>
              <a href="https://x.com/StarkLegal" className={styles.fsoc} aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M11 1.5h2.5L8.4 7l5.6 6.5H10L6.5 9l-4 4.5H0l5.4-6L.2 1.5H4L7 6l4-4.5z"/></svg>
              </a>
              <a href="https://www.instagram.com/starklegallp/" className={styles.fsoc} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><rect x=".75" y=".75" width="12.5" height="12.5" rx="3"/><circle cx="7" cy="7" r="3"/><circle cx="10.5" cy="3.5" r=".5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/starklegal/" className={styles.fsoc} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M1 1.5h2.5v11H1v-11zm1.25-1.5a1.25 1.25 0 110 2.5A1.25 1.25 0 012.25 0zM5 5.5h2.4v1.5h.04C7.84 5.7 8.9 5 10.3 5 12.5 5 13 6.5 13 8.5v5H10.5V9c0-.8 0-2-1.2-2S7.7 8.2 7.7 9v4.5H5V5.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <div className={styles.fcTitle}>Practice Areas</div>
            <ul className={styles.fcLinks}>
              <li><Link href="/#practice">Energy</Link></li>
              <li><Link href="/#practice">Transport &amp; Aviation</Link></li>
              <li><Link href="/#practice">Financial Services</Link></li>
              <li><Link href="/#practice">Corporate &amp; Commercial</Link></li>
              <li><Link href="/#practice">Dispute Resolution</Link></li>
            </ul>
          </div>

          {/* The Firm */}
          <div>
            <div className={styles.fcTitle}>The Firm</div>
            <ul className={styles.fcLinks}>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#team">Our People</Link></li>
              <li><Link href="/#awards">Recognition</Link></li>
              <li><Link href="/#testi">Client Voices</Link></li>
              <li><Link href="/resources/publications/articles">Resources</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className={styles.fcTitle}>Contact</div>
            <ul className={styles.fcLinks}>
              <li><a href="tel:+2349096851318">+234 909 685 1318</a></li>
              <li><a href="tel:+2348038427202">+234 803 842 7202</a></li>
              <li><a href="mailto:info@starklegalng.com">info@starklegalng.com</a></li>
              <li><a href="mailto:admin@starklegalng.com">admin@starklegalng.com</a></li>
              <li className={styles.offices}>Lagos · Abuja · Port-Harcourt</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.footerCopy}>&copy; {year} Stark Legal. All rights reserved.</div>
          <div className={styles.footerDisc}>
            The information on this site does not constitute legal advice and should not be relied upon as such. Stark Legal is regulated by the Nigerian Bar Association.
          </div>
        </div>
      </div>
    </footer>
  )
}
