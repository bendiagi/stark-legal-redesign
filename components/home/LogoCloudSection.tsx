import styles from './LogoCloudSection.module.css'

const LOGOS = [
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450838/starklegal/logos/mtn-logo.svg', alt: 'MTN Nigeria' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450841/starklegal/logos/gtco-logo.png', alt: 'GTCO' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450844/starklegal/logos/zenith-bank-logo.png', alt: 'Zenith Bank' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450846/starklegal/logos/airtel-logo.png', alt: 'Airtel Nigeria' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450847/starklegal/logos/uba-logo.svg', alt: 'UBA' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450850/starklegal/logos/access-logo.png', alt: 'Access Bank' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450852/starklegal/logos/dangote-logo.svg', alt: 'Dangote Group' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450857/starklegal/logos/shell-logo.png', alt: 'Shell' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450858/starklegal/logos/nnpc-logo.png', alt: 'NNPC Limited' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450861/starklegal/logos/stanbic-ibtc-logo.png', alt: 'Stanbic IBTC' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450863/starklegal/logos/transcorp-logo.png', alt: 'Transcorp Hotels' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450865/starklegal/logos/cbn-logo.png', alt: 'Central Bank of Nigeria' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450871/starklegal/logos/sec-logo.svg', alt: 'SEC Nigeria' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450875/starklegal/logos/ncaa-logo.png', alt: 'NCAA Nigeria' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450878/starklegal/logos/nmdpra-logo.png', alt: 'NMDPRA' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450880/starklegal/logos/npa-logo.webp', alt: 'Nigerian Ports Authority' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450882/starklegal/logos/nsib-logo.jpg', alt: 'NSIB' },
  { src: 'https://res.cloudinary.com/daglfnssf/image/upload/v1777450883/starklegal/logos/sterling-bank-logo.png', alt: 'Sterling Bank' },
]

export default function LogoCloudSection() {
  const doubled = [...LOGOS, ...LOGOS]
  return (
    <section id="logo-cloud" className={styles.cloud} aria-label="Client organisations">
      <div className={styles.label}>Trusted by leading institutions across Nigeria</div>
      <div className={styles.trackWrap}>
        <div className={styles.track} aria-hidden="true">
          {doubled.map((l, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={i} className={styles.logo} src={l.src} alt={l.alt} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}
