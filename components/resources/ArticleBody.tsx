import { PortableText, PortableTextComponents } from '@portabletext/react'
import styles from './ArticleBody.module.css'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={styles.p}>{children}</p>,
    h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
  },
  marks: {
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
    em: ({ children }) => <em className={styles.em}>{children}</em>,
  },
}

export default function ArticleBody({ body }: { body: unknown[] }) {
  return (
    <div className={styles.body}>
      <PortableText value={body as Parameters<typeof PortableText>[0]['value']} components={components} />
    </div>
  )
}
