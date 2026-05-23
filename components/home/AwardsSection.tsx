import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import styles from './AwardsSection.module.css'

const AWARDS = [
  { yr: '2024', title: 'Law Firm of the Year — Small Practice', org: 'Nigerian Legal Awards' },
  { yr: '2023', title: 'Aviation Team of the Year', org: 'International Legal Awards' },
  { yr: '2022', title: 'Managing Partner of the Year', org: 'Nigerian Legal Awards' },
  { yr: '2021', title: 'Law Firm of the Year — Small Practice', org: 'Nigerian Legal Awards' },
  { yr: '2020', title: 'Aviation Team of the Year (Local)', org: 'Nigerian Legal Awards' },
  { yr: '2019', title: 'Law Firm of the Year — Small Practice', org: 'Nigerian Legal Awards' },
]

export default function AwardsSection() {
  return (
    <section id="awards" className={styles.awards} aria-labelledby="awards-h">
      <div className="W">
        <div className={styles.inner}>
          <ScrollReveal>
            <div className="eyebrow eyebrow--dim">Recognition</div>
            <h2 className="H2 H2--lt" id="awards-h">Award-Winning<br />Practice</h2>
            <p className={styles.body}>
              Our commitment to excellence has been consistently recognised by leading legal industry bodies in Nigeria and internationally, from 2019 through to the present day.
            </p>
            <Link href="/#contact" className="btn btn-gold">
              Work With Us
              <svg className="ico-arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </ScrollReveal>
          <div className={styles.list}>
            {AWARDS.map((a, i) => (
              <div key={a.yr + a.title} className={styles.award}>
                <div className={styles.yr}>{a.yr}</div>
                <div>
                  <div className={styles.aTitle}>{a.title}</div>
                  <div className={styles.aOrg}>{a.org}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
