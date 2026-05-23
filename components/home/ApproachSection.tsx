import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import styles from './ApproachSection.module.css'

const STEPS = [
  { n: '01', title: 'Understand Your Objectives', body: 'We begin every engagement by deeply understanding your commercial objectives, constraints, and risk appetite — before any legal strategy is formed.' },
  { n: '02', title: 'Craft a Strategic Framework', body: "Our teams develop tailored legal strategies that align with your goals and the realities of the Nigerian and international regulatory environment." },
  { n: '03', title: 'Execute with Precision', body: 'We deliver with speed, accuracy, and clear communication at every stage — keeping you informed and in control throughout the matter.' },
  { n: '04', title: 'Build a Long-Term Partnership', body: 'We invest in long-term client relationships, providing ongoing strategic counsel as your business evolves.' },
]

export default function ApproachSection() {
  return (
    <section id="approach" className={styles.approach} aria-labelledby="approach-h">
      <div className="W">
        <div className={styles.inner}>
          <div>
            <ScrollReveal><div className="eyebrow">How We Work</div></ScrollReveal>
            <ScrollReveal delay="d1"><h2 className="H2 H2--lt" id="approach-h">Our Client<br />Approach</h2></ScrollReveal>
            <ScrollReveal delay="d2">
              <p className={styles.body}>We combine deep sector knowledge with a commitment to understanding each client&rsquo;s unique position. Every brief is a strategic opportunity to deliver lasting value.</p>
            </ScrollReveal>
            <ScrollReveal delay="d3">
              <Link href="/#contact" className="btn btn-gold">
                Start a Conversation
                <svg className="ico-arr" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </ScrollReveal>
          </div>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={s.n} className={styles.step}>
                <div className={styles.stepN}>{s.n}</div>
                <div>
                  <div className={styles.stepTitle}>{s.title}</div>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
