'use client'

import { useState } from 'react'
import Image from 'next/image'
import ScrollReveal from './ScrollReveal'
import styles from './TeamSection.module.css'

const CLOUDINARY = 'https://res.cloudinary.com/impxv2hw/image/upload/v1792750'
const TEAM = [
  {
    id: 0, name: 'Dr. Mojisola Olugbemi', role: 'Principal Partner', src: `${CLOUDINARY}590/Dr._Mojisola_Olugbemi_-_Principal_Partner.jpg`,
    bio: 'Dr. Mojisola Olugbemi is the Founding and Principal Partner of Stark Legal, with expertise spanning energy, oil and gas, aviation, maritime law, and alternative dispute resolution. An award-winning legal practitioner, she contributed to the development of Nigeria’s Petroleum Industry Act and has received several honours, including the ESQ 40 Under 40 Award and Managing Partner of the Year (Small Practice). She holds an LL.M from Swansea University and a Doctorate in Business Management from EIMT, Switzerland. Beyond her legal practice, she champions corporate governance, children’s rights, and youth entrepreneurship.',
  },
  {
    id: 1, name: 'Ayobamidele Akande, SAN', role: 'Managing Partner', src: `${CLOUDINARY}591/Ayobamidele_Akande_SAN_Managing_Partner.jpg`,
    bio: 'Ayobamidele Akande, SAN is the Managing Partner at Stark Legal, leading the firm’s Finance, Telecommunications and Dispute Resolution practice groups. Following his elevation to the rank of Senior Advocate of Nigeria (SAN) he continues to advise local and international clients on financial regulation, telecommunications, fintech, project finance, private equity and commercial disputes. He also serves on corporate boards and is the Centre Director of the Centre for African Economics, Law and Policy (CAELP). He is licensed to practise in Nigeria and New York and is a member of the Chartered Institute of Arbitrators, UK.',
  },
  { id: 2, name: 'Emmanuel Olatunde', role: 'Senior Associate', src: `${CLOUDINARY}624/Emmanuel_Olatunde_-_Senior_Associate.png` },
  { id: 3, name: 'Joy Haruna', role: 'Senior Associate', src: `${CLOUDINARY}610/joy_Haruna-Senior_Associate.png` },
  { id: 4, name: 'Damilola Oke', role: 'Human Resources Officer / Chief Visibility Officer', src: `${CLOUDINARY}617/Damilola_Oke_-_Human_Resource_Officer_and_Chief_Visibility_Officer.png` },
  { id: 5, name: 'Goodness Okoye', role: 'Associate', src: `${CLOUDINARY}617/Goodness_Okoye-Associate.jpg` },
  { id: 6, name: 'Nicholas Nwosu', role: 'Associate', src: `${CLOUDINARY}611/Nicholas_Nwosu_-_Associate.jpg` },
  { id: 7, name: 'Abdulbaqi Adebiyi', role: 'Associate', src: `${CLOUDINARY}610/Abdulbaqi_Adebiyi_-_Associate.png` },
  { id: 8, name: 'Obianujunwa Ajagbo', role: 'Associate', src: `${CLOUDINARY}611/Obianujunwa_Ajagbo_-_Associate.jpg` },
  { id: 9, name: 'Khalid Badru', role: 'Associate', src: `${CLOUDINARY}586/Khalid_Badru_-_Associate.jpg` },
  { id: 10, name: 'Margaret Emmanuel', role: 'Associate', src: `${CLOUDINARY}586/Margaret_Emmanuel_-_Associate.jpg` },
  { id: 11, name: 'Esther Sangobiyi', role: 'Admin and Facility Manager', src: `${CLOUDINARY}618/ESTHER_Sangobiyi-Admin_Facility_Manager.png` },
  { id: 12, name: 'Margaret Wonah', role: 'Facility Officer', src: `${CLOUDINARY}618/Margaret_Wonah_-_Facility_Officer.png` },
  { id: 13, name: 'Yusuf Adebowale', role: 'Accountant', src: `${CLOUDINARY}667/Yusuf_Adebowale-Accountant.png` },
  { id: 14, name: 'Osbourne Ivwurie', role: 'Librarian', src: `${CLOUDINARY}614/Osbourne_Ivwurie_-Librarian.jpg` },
  { id: 15, name: 'Abdulhakeem Akinola', role: 'Tech Support / Graphic Designer', src: `${CLOUDINARY}587/Abdulhakeem_Akinola-Tech_Support_Graphic_Designer.jpg` },
  { id: 16, name: 'Adebayo Olamide', role: 'Office Driver', src: `${CLOUDINARY}612/Adebayo_Olamide_-Office_Driver.png` },
  { id: 17, name: 'Taiwo Ogunshaki', role: 'Office Assistant', src: `${CLOUDINARY}633/Taiwo_Onipede-Office_Assistant.jpg` },
]

// Round-robin into three staggered photo columns so adding people never needs manual balancing
const colA = TEAM.filter((_, i) => i % 3 === 0)
const colB = TEAM.filter((_, i) => i % 3 === 1)
const colC = TEAM.filter((_, i) => i % 3 === 2)

const liIcon = (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
    <path d="M1 1.5h2.5v11H1v-11zm1.25-1.5a1.25 1.25 0 110 2.5A1.25 1.25 0 012.25 0zM5 5.5h2.4v1.5h.04C7.84 5.7 8.9 5 10.3 5 12.5 5 13 6.5 13 8.5v5H10.5V9c0-.8 0-2-1.2-2S7.7 8.2 7.7 9v4.5H5V5.5z"/>
  </svg>
)

function hiClass(base: string, id: number, hovId: number | null) {
  if (hovId === null) return base
  return hovId === id ? `${base} ${styles.hiOn}` : `${base} ${styles.hiOff}`
}

// Module scope on purpose: declared inside TeamSection it would be a new component type on every
// hover, remounting every photo and killing the CSS transitions.
function PhotoCol({ members, cls, col, hovId, onHover }: {
  members: typeof TEAM
  cls: string
  col: 'A' | 'B' | 'C'
  hovId: number | null
  onHover: (id: number | null) => void
}) {
  return (
    <div className={`${styles.tsgCol} ${cls}`}>
      {members.map(m => (
        <div
          key={m.id}
          className={`${hiClass(styles.tsp, m.id, hovId)} ${styles[`tsp${col}` as keyof typeof styles]}`}
          onMouseEnter={() => onHover(m.id)}
          onMouseLeave={() => onHover(null)}
          data-id={m.id}
        >
          <Image src={m.src} alt={m.name} width={178} height={220} style={{ objectFit: 'cover', objectPosition: 'top center' }} loading="eager" />
        </div>
      ))}
    </div>
  )
}

export default function TeamSection() {
  const [hovId, setHovId] = useState<number | null>(null)
  const [openId, setOpenId] = useState<number | null>(null)

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
            <PhotoCol members={colA} cls="" col="A" hovId={hovId} onHover={setHovId} />
            <PhotoCol members={colB} cls={styles.colB} col="B" hovId={hovId} onHover={setHovId} />
            <PhotoCol members={colC} cls={styles.colC} col="C" hovId={hovId} onHover={setHovId} />
          </div>

          <div className={styles.names} role="list">
            {TEAM.map(m => {
              const isOpen = m.bio !== undefined && openId === m.id
              const rowClass = [
                hiClass(styles.tnr, m.id, hovId),
                m.bio ? styles.canOpen : '',
                isOpen ? styles.isOpen : '',
              ].filter(Boolean).join(' ')
              return (
                <div
                  key={m.id}
                  className={rowClass}
                  role="listitem"
                  onMouseEnter={() => setHovId(m.id)}
                  onMouseLeave={() => setHovId(null)}
                  onClick={m.bio ? () => setOpenId(isOpen ? null : m.id) : undefined}
                >
                  <div className={styles.tnrTop}>
                    <span className={styles.tnrBar} aria-hidden="true" />
                    {m.bio ? (
                      <button
                        type="button"
                        className={`${styles.tnrName} ${styles.tnrToggle}`}
                        aria-expanded={isOpen}
                        aria-controls={`team-bio-${m.id}`}
                      >
                        {m.name}
                        <svg className={styles.chev} width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ) : (
                      <span className={styles.tnrName}>{m.name}</span>
                    )}
                    <div className={styles.tnrSocials}>
                      <a href="#" className={styles.tnrSocial} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{liIcon}</a>
                    </div>
                  </div>
                  <div className={styles.tnrRole}>{m.role}</div>
                  {m.bio && (
                    <div id={`team-bio-${m.id}`} className={styles.bio} role="region" aria-label={`About ${m.name}`}>
                      <div className={styles.bioInner}>
                        <p className={styles.bioText}>{m.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
