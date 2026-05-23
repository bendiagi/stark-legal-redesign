import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-h">
      <div className="W">
        <div className={styles.grid}>
          <ScrollReveal>
            <div className="eyebrow">About the Firm</div>
            <h2 className="H2" id="about-h">A 21st Century<br />Full-Service Firm</h2>
            <p className={styles.body}>
              Stark Legal is a full-service commercial law firm in Nigeria, consistently delivering excellent legal support to local and international corporate bodies, government agencies, non-governmental organisations, and individuals — across 11 years of distinguished service.
            </p>
            <p className={styles.body}>
              We understand market dynamics, client objectives, and the strategic importance of decisive legal counsel. Our approach combines deep sector expertise, innovation, and an unwavering dedication to delivering lasting value.
            </p>
            <ScrollReveal delay="d2" className={styles.pills}>
              <span className={styles.pill}>Energy</span>
              <span className={styles.pill}>Transport</span>
              <span className={styles.pill}>Finance</span>
              <span className={styles.pill}>Corporate</span>
              <span className={styles.pill}>Dispute Resolution</span>
            </ScrollReveal>
            <ScrollReveal delay="d3">
              <Link href="/#contact" className="btn btn-outline">
                Get in Touch
                <svg className="ico-arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </ScrollReveal>
          </ScrollReveal>

          <ScrollReveal delay="d2">
            <div className={styles.quoteCard}>
              <div className={styles.qcIn}>
                <span className={styles.qcMark} aria-hidden="true">&ldquo;</span>
                <p className={styles.qcText}>Pursue Excellence and<br />Success will Follow</p>
                <div className={styles.qcAttr}>— Stark Legal, Firm Ethos</div>
              </div>
              <div className={styles.qcDeco} aria-hidden="true" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
