import article from './article.module.css'
import styles from '../resources.module.css'

export default function ArticleLoading() {
  return (
    <main className={article.article} aria-busy="true">
      <span className={styles.srOnly} role="status">Loading…</span>
      <div className="W">
        <div className={article.inner}>
          <div className={`${styles.skel} ${styles.skelCrumb}`} style={{ marginBottom: 32 }} />
          <div className={`${styles.skel} ${article.hero}`} />
          <div className={`${styles.skel} ${styles.skelLine}`} style={{ width: 180, height: 22, marginBottom: 24 }} />
          <div className={`${styles.skel} ${styles.skelTitle}`} style={{ width: '90%' }} />
          <div className={`${styles.skel} ${styles.skelTitle}`} style={{ width: '60%', marginBottom: 32 }} />
          <hr className={article.rule} />
          {[100, 96, 100, 88, 100, 72].map((w, i) => (
            <div key={i} className={`${styles.skel} ${styles.skelLine}`} style={{ width: `${w}%`, height: 14, marginBottom: 16 }} />
          ))}
        </div>
      </div>
    </main>
  )
}
