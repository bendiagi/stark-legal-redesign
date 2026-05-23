import styles from './StatsSection.module.css'

const STATS = [
  { n: '11+', label: 'Years of Service' },
  { n: '5',   label: 'Practice Areas' },
  { n: '3',   label: 'Office Cities' },
  { n: '6+',  label: 'Industry Awards' },
]

export default function StatsSection() {
  return (
    <section aria-label="Firm statistics" className={styles.stats}>
      <div className={styles.grid}>
        {STATS.map(s => (
          <div key={s.label} className={styles.stat}>
            <div className={styles.n}>{s.n}</div>
            <div className={styles.l}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
