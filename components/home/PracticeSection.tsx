import ScrollReveal from './ScrollReveal'
import styles from './PracticeSection.module.css'

const PRACTICES = [
  {
    num: '01', wide: false,
    icon: <path d="M28 4L8 28h18L22 48 44 20H26L28 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>,
    title: 'Energy',
    body: "Advising on oil & gas transactions, upstream and downstream operations, power sector regulation, and renewable energy projects across Nigeria's dynamic energy landscape.",
  },
  {
    num: '02', wide: false,
    icon: <>
      <path d="M6 38h40M10 26h32l4 12H6l4-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M17 26V16h18v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="17" cy="43" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="35" cy="43" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
    </>,
    title: 'Transport & Aviation',
    body: 'Comprehensive legal services across aviation, maritime, and road transport — from regulatory compliance and aircraft financing to cargo disputes and liability.',
  },
  {
    num: '03', wide: true,
    icon: <>
      <rect x="5" y="11" width="42" height="30" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 19h42" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13 30h6M24 30h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </>,
    title: 'Financial Services',
    body: "Deep expertise in banking regulation, capital markets, insurance law, fintech compliance, and structured finance. We guide financial institutions through Nigeria's evolving regulatory landscape with precision and commercial foresight — advising on landmark transactions and staying at the forefront of the sector.",
  },
  {
    num: '04', wide: false,
    icon: <>
      <rect x="16" y="5" width="20" height="18" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 47V27h42v20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M21 47V33h10v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5 27h42" stroke="currentColor" strokeWidth="1.5"/>
    </>,
    title: 'Corporate & Commercial',
    body: "M&A, joint ventures, corporate restructuring, contract drafting, and commercial advisory for businesses operating in and across Nigeria's evolving market.",
  },
  {
    num: '05', wide: false,
    icon: <>
      <circle cx="26" cy="26" r="20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 26l6 6 10-12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 6v4M26 42v4M6 26h4M42 26h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </>,
    title: 'Dispute Resolution',
    body: 'Litigation, arbitration, and mediation services. We represent clients in Nigerian courts and before international arbitral tribunals with strategic, results-driven advocacy.',
  },
]

export default function PracticeSection() {
  return (
    <section id="practice" className={styles.practice} aria-labelledby="practice-h">
      <div className="W">
        <div className={styles.hd}>
          <ScrollReveal>
            <div className="eyebrow">What We Do</div>
            <h2 className="H2" id="practice-h">Practice Areas</h2>
          </ScrollReveal>
          <ScrollReveal delay="d2">
            <p className={styles.intro}>
              From complex energy transactions to high-stakes dispute resolution, our practice spans the full spectrum of commercial law in Nigeria and internationally.
            </p>
          </ScrollReveal>
        </div>
        <div className={styles.grid}>
          {PRACTICES.map((p, i) => (
            <div
              key={p.num}
              className={`${styles.pc}${p.wide ? ` ${styles.pcWide}` : ''}`}
            >
              <div className={styles.pcIn}>
                <span className={styles.pcNum}>{p.num}</span>
                <svg className={styles.pcIco} viewBox="0 0 52 52" fill="none" aria-hidden="true">
                  {p.icon}
                </svg>
                <h3 className={styles.pcTitle}>{p.title}</h3>
                <p className={styles.pcBody}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
