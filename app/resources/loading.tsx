import styles from './resources.module.css'

export default function ResourcesLoading() {
  return (
    <main className={styles.page} aria-busy="true">
      <span className={styles.srOnly} role="status">Loading…</span>
      <div className="W">
        <div className={styles.pageHd}>
          <div className={`${styles.skel} ${styles.skelCrumb}`} />
          <div className={`${styles.skel} ${styles.skelTitle}`} />
          <div className={`${styles.skel} ${styles.skelTitle}`} style={{ width: 'min(340px,60%)' }} />
          <div className={`${styles.skel} ${styles.skelLine}`} style={{ maxWidth: 520, marginTop: 24 }} />
          <div className={`${styles.skel} ${styles.skelLine}`} style={{ maxWidth: 400 }} />
        </div>
        <div className={styles.grid}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={styles.skelCard}>
              <div className={`${styles.skel} ${styles.skelCardImg}`} />
              <div className={styles.skelCardBody}>
                <div className={`${styles.skel} ${styles.skelLine}`} style={{ width: '35%' }} />
                <div className={`${styles.skel} ${styles.skelLine}`} style={{ height: 20 }} />
                <div className={`${styles.skel} ${styles.skelLine}`} style={{ height: 20, width: '75%' }} />
                <div className={`${styles.skel} ${styles.skelLine}`} style={{ marginTop: 16 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
