'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'
import styles from './TeamSection.module.css'

const TEAM = [
  { id: 0, name: 'Mojisola Olugbemi', role: 'Principal Partner', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267105/MO-scaled_t5fdub.jpg', col: 'a' },
  { id: 1, name: 'Ayobamidele Akande', role: 'Managing Partner', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267104/AA-scaled_jjyjcm.jpg', col: 'b' },
  { id: 2, name: 'Victor Abasiodiong', role: 'Senior Associate', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267105/Victor-scaled_luudkh.jpg', col: 'c' },
  { id: 3, name: 'Caleb Aluya', role: 'Senior Associate', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267105/Caleb-scaled_zjwa4e.jpg', col: 'a' },
  { id: 4, name: 'Chisom Okeke', role: 'Senior Associate', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267106/Chisom-scaled_wxiald.jpg', col: 'b' },
  { id: 5, name: 'Emmanuel Olatunde', role: 'Associate', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267367/Emmanuel_ckmzzq.jpg', col: 'c' },
  { id: 6, name: 'Kingsley Chidume', role: 'Associate', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267368/Kingsley_ztoxxm.jpg', col: 'a' },
  { id: 7, name: 'Goodness Okoye-Egbe', role: 'Associate', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267107/Goodness_-scaled_yyvf7n.jpg', col: 'b' },
  { id: 8, name: 'Obianuju Ajagbo', role: 'Associate', src: 'https://res.cloudinary.com/djnkxndun/image/upload/v1779267106/Uju-scaled_bsptvx.jpg', col: 'c' },
]

const colA = TEAM.filter(t => t.col === 'a')
const colB = TEAM.filter(t => t.col === 'b')
const colC = TEAM.filter(t => t.col === 'c')

export default function TeamSection() {
  const [hovId, setHovId] = useState<number | null>(null)

  function photoClass(id: number) {
    if (hovId === null) return styles.tsp
    return hovId === id ? `${styles.tsp} ${styles.hiOn}` : `${styles.tsp} ${styles.hiOff}`
  }
  function nameClass(id: number) {
    if (hovId === null) return styles.tnr
    return hovId === id ? `${styles.tnr} ${styles.hiOn}` : `${styles.tnr} ${styles.hiOff}`
  }

  const liIcon = (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
      <path d="M1 1.5h2.5v11H1v-11zm1.25-1.5a1.25 1.25 0 110 2.5A1.25 1.25 0 012.25 0zM5 5.5h2.4v1.5h.04C7.84 5.7 8.9 5 10.3 5 12.5 5 13 6.5 13 8.5v5H10.5V9c0-.8 0-2-1.2-2S7.7 8.2 7.7 9v4.5H5V5.5z"/>
    </svg>
  )

  function PhotoCol({ members, cls }: { members: typeof TEAM, cls: string }) {
    return (
      <div className={`${styles.tsgCol} ${cls}`}>
        {members.map(m => (
          <div
            key={m.id}
            className={`${photoClass(m.id)} ${styles[`tsp${m.col.toUpperCase()}` as keyof typeof styles]}`}
            onMouseEnter={() => setHovId(m.id)}
            onMouseLeave={() => setHovId(null)}
            data-id={m.id}
          >
            <Image src={m.src} alt={m.name} width={178} height={220} style={{ objectFit: 'cover', objectPosition: 'top center' }} loading="lazy" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <section id="team" className={styles.team} aria-labelledby="team-h">
      <div className="W">
        <div className={styles.hd}>
          <ScrollReveal>
            <div className="eyebrow">Our People</div>
            <h2 className="H2" id="team-h">A Powerhouse<br />of Expertise</h2>
          </ScrollReveal>
          <ScrollReveal delay="d2">
            <p className={styles.intro}>Our exceptional legal professionals bring decades of combined experience across Nigeria&rsquo;s most complex commercial sectors.</p>
          </ScrollReveal>
        </div>

        <div className={styles.layout}>
          <div className={styles.photos} aria-hidden="true">
            <PhotoCol members={colA} cls="" />
            <PhotoCol members={colB} cls={styles.colB} />
            <PhotoCol members={colC} cls={styles.colC} />
          </div>

          <div className={styles.names} role="list">
            {TEAM.map(m => (
              <div
                key={m.id}
                className={nameClass(m.id)}
                role="listitem"
                onMouseEnter={() => setHovId(m.id)}
                onMouseLeave={() => setHovId(null)}
              >
                <div className={styles.tnrTop}>
                  <span className={styles.tnrBar} aria-hidden="true" />
                  <span className={styles.tnrName}>{m.name}</span>
                  <div className={styles.tnrSocials}>
                    <a href="#" className={styles.tnrSocial} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">{liIcon}</a>
                  </div>
                </div>
                <div className={styles.tnrRole}>{m.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
