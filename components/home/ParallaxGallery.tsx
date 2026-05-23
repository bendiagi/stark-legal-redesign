'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './ParallaxGallery.module.css'

const LAYERS = [
  { id: 'gl0', src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450737/starklegal/parallax/cytonn-photography.jpg', alt: 'Business handshake — Stark Legal client engagement', w: '28vw', h: '32vh', tx: '0', ty: '0', max: 4, zIndex: 2 },
  { id: 'gl1', src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450746/starklegal/parallax/nupo-deyon-daniel.jpg', alt: 'Lagos Victoria Island skyline', w: '32vw', h: '28vh', tx: '18vw', ty: '-24vh', max: 5, zIndex: 1 },
  { id: 'gl2', src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450753/starklegal/parallax/david-veksler.jpg', alt: 'Courtroom interior', w: '26vw', h: '24vh', tx: '-22vw', ty: '20vh', max: 6, zIndex: 1 },
  { id: 'gl3', src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450760/starklegal/parallax/amina-atar.jpg', alt: 'Legal document consultation', w: '30vw', h: '26vh', tx: '20vw', ty: '22vh', max: 5, zIndex: 1 },
  { id: 'gl4', src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450764/starklegal/parallax/david-rotimi.jpg', alt: 'Nigeria welcome arch', w: '24vw', h: '28vh', tx: '-20vw', ty: '-22vh', max: 6, zIndex: 1 },
  { id: 'gl5', src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450781/starklegal/parallax/opeyemi-adisa.jpg', alt: 'Lagos commercial street aerial view', w: '22vw', h: '22vh', tx: '36vw', ty: '-6vh', max: 8, zIndex: 1 },
  { id: 'gl6', src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450801/starklegal/parallax/chris-leipelt.jpg', alt: 'Airplane in flight — Transport & Aviation practice', w: '20vw', h: '18vh', tx: '-36vw', ty: '4vh', max: 9, zIndex: 1 },
]

export default function ParallaxGallery() {
  const zoneRef = useRef<HTMLDivElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    function update() {
      const zone = zoneRef.current
      if (!zone) return
      const rect = zone.getBoundingClientRect()
      const total = zone.offsetHeight - window.innerHeight
      if (total <= 0) return
      const prog = Math.max(0, Math.min(1, -rect.top / total))
      layerRefs.current.forEach((layer, i) => {
        if (!layer) return
        const scale = 1 + (LAYERS[i].max - 1) * prog
        layer.style.transform = `scale(${scale.toFixed(4)})`
      })
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section id="gallery" className={styles.gallery} aria-label="The firm in images">
      <div className="W">
        <div className={styles.header}>
          <div>
            <div className="eyebrow eyebrow--dim">The Firm in Frame</div>
            <span className={styles.tagline}>Eleven years. Three cities. One commitment to excellence.</span>
          </div>
        </div>
      </div>

      <div className={styles.zone} ref={zoneRef}>
        <div className={styles.sticky}>
          <div className={styles.label} aria-hidden="true">Stark Legal</div>
          <div className={styles.cue} aria-hidden="true">Scroll</div>

          {LAYERS.map((layer, i) => (
            <div
              key={layer.id}
              ref={el => { layerRefs.current[i] = el }}
              className={styles.layer}
              style={{ zIndex: layer.zIndex }}
            >
              <div
                className={styles.box}
                style={{
                  width: layer.w,
                  height: layer.h,
                  transform: layer.tx !== '0' || layer.ty !== '0'
                    ? `translate(${layer.tx}, ${layer.ty})`
                    : undefined,
                }}
              >
                <Image
                  src={layer.src}
                  alt={layer.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="W">
        <div className={styles.footer}>
          <span className={styles.footItem}>Full-Service Commercial Law</span>
          <span className={styles.footSep} aria-hidden="true" />
          <span className={styles.footItem}>Lagos</span>
          <span className={styles.footSep} aria-hidden="true" />
          <span className={styles.footItem}>Abuja</span>
          <span className={styles.footSep} aria-hidden="true" />
          <span className={styles.footItem}>Port-Harcourt</span>
          <span className={styles.footSep} aria-hidden="true" />
          <span className={styles.footItem}>Est. 2013</span>
        </div>
      </div>
    </section>
  )
}
