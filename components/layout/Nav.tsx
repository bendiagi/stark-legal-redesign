'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Nav.module.css'

export default function Nav() {
  const pathname = usePathname()
  const [stuck, setStuck] = useState(pathname !== '/')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileVisible, setMobileVisible] = useState(false)

  // Desktop dropdown state
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [pubsOpen, setPubsOpen] = useState(false)

  const resourcesCloseRef = useRef<ReturnType<typeof setTimeout>>()
  const pubsCloseRef = useRef<ReturnType<typeof setTimeout>>()

  // Sticky nav on scroll — only animate on home page
  useEffect(() => {
    if (pathname !== '/') return
    const onScroll = () => setStuck(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Mobile menu body lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function openMobile() {
    setMobileOpen(true)
    setTimeout(() => setMobileVisible(true), 10)
  }
  function closeMobile() {
    setMobileVisible(false)
    setTimeout(() => setMobileOpen(false), 400)
  }

  // Resources dropdown handlers
  function onResourcesEnter() {
    clearTimeout(resourcesCloseRef.current)
    setResourcesOpen(true)
  }
  function onResourcesLeave() {
    resourcesCloseRef.current = setTimeout(() => {
      setResourcesOpen(false)
      setPubsOpen(false)
    }, 120)
  }
  function onPubsEnter() {
    clearTimeout(resourcesCloseRef.current)
    clearTimeout(pubsCloseRef.current)
    setPubsOpen(true)
  }
  function onPubsLeave() {
    pubsCloseRef.current = setTimeout(() => setPubsOpen(false), 120)
  }

  // Mobile accordion state
  const [mobResourcesOpen, setMobResourcesOpen] = useState(false)
  const [mobPubsOpen, setMobPubsOpen] = useState(false)

  return (
    <>
      <nav className={`${styles.nav}${stuck ? ` ${styles.stuck}` : ''}`} aria-label="Main navigation">
        <div className={`W ${styles.navRow}`}>
          {/* Logo */}
          <Link href="/#hero" className={styles.navLogo} aria-label="Stark Legal home">
            <Image
              src="https://res.cloudinary.com/djnkxndun/image/upload/v1779269638/Stark_Legal_NG_Logo_styqvp.png"
              alt="Stark Legal shield"
              width={42}
              height={42}
              className={styles.navIcon}
            />
            <Image
              src="https://res.cloudinary.com/daglfnssf/image/upload/v1777450729/starklegal/brand/starklegal-wordmark.png"
              alt="Stark Legal"
              width={120}
              height={15}
              className="nav-wordmark-img"
            />
          </Link>

          {/* Desktop nav */}
          <ul className={styles.navLinks} role="list">
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#practice">Practice</Link></li>
            <li><Link href="/#photo-gallery">Gallery</Link></li>
            <li><Link href="/#team">People</Link></li>

            {/* Resources dropdown */}
            <li onMouseEnter={onResourcesEnter} onMouseLeave={onResourcesLeave}>
              <button
                className={`trigger ${styles.trigger}${resourcesOpen ? ` ${styles.active}` : ''}`}
                aria-haspopup="true"
                aria-expanded={resourcesOpen}
              >
                Resources
                <svg className={styles.chevron} viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={`${styles.dropdown} ${styles.dropdownResources}${resourcesOpen ? ` ${styles.open}` : ''}`}>
                {/* Publications — has fly-out */}
                <div
                  className={`${styles.dropdownItem}${pubsOpen ? ` ${styles.active}` : ''}`}
                  onMouseEnter={onPubsEnter}
                  onMouseLeave={onPubsLeave}
                >
                  Publications
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true" style={{opacity:.4}}>
                    <path d="M2.5 1.5l3 2.5-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  {/* Publications flyout */}
                  <div
                    className={`${styles.flyout}${pubsOpen ? ` ${styles.open}` : ''}`}
                    onMouseEnter={onPubsEnter}
                    onMouseLeave={onPubsLeave}
                  >
                    <Link
                      href="/resources/publications/articles"
                      className={styles.flyoutLink}
                      onClick={() => { setResourcesOpen(false); setPubsOpen(false) }}
                    >
                      Articles
                    </Link>
                    <div className={styles.dropdownDivider} />
                    <Link
                      href="/resources/publications/regulatory-updates"
                      className={styles.flyoutLink}
                      onClick={() => { setResourcesOpen(false); setPubsOpen(false) }}
                    >
                      Regulatory Updates
                    </Link>
                  </div>
                </div>

                <div className={styles.dropdownDivider} />

                {/* Newsletters */}
                <div className={styles.dropdownItem}>
                  <Link
                    href="/resources/newsletters"
                    onClick={() => setResourcesOpen(false)}
                  >
                    Newsletters
                  </Link>
                </div>
              </div>
            </li>

            <li><Link href="/#faq">FAQ</Link></li>
            <li>
              <Link href="/#contact" className={styles.navCta}>Book Consultation</Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className={`${styles.burger}${mobileOpen ? ` ${styles.open}` : ''}`}
            onClick={mobileOpen ? closeMobile : openMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`${styles.mobMenu}${mobileOpen ? ` ${styles.open}` : ''}${mobileVisible ? ` ${styles.visible}` : ''}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <Link href="/#about" className={styles.mobLink} onClick={closeMobile}>About</Link>
        <Link href="/#practice" className={styles.mobLink} onClick={closeMobile}>Practice</Link>
        <Link href="/#photo-gallery" className={styles.mobLink} onClick={closeMobile}>Gallery</Link>
        <Link href="/#team" className={styles.mobLink} onClick={closeMobile}>People</Link>

        {/* Resources accordion */}
        <button
          className={`${styles.mobAccordionTrigger}${mobResourcesOpen ? ` ${styles.open}` : ''}`}
          onClick={() => setMobResourcesOpen(v => !v)}
        >
          Resources
          <svg className={styles.mobChevron} viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={`${styles.mobAccordionContent}${mobResourcesOpen ? ` ${styles.open}` : ''}`}>
          {/* Publications sub-accordion */}
          <button
            className={`${styles.mobAccordionTrigger}${mobPubsOpen ? ` ${styles.open}` : ''}`}
            style={{ borderTop: 'none', padding: '9px 20px', fontSize: '.82rem' }}
            onClick={() => setMobPubsOpen(v => !v)}
          >
            Publications
            <svg className={styles.mobChevron} viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className={`${styles.mobAccordionContent}${mobPubsOpen ? ` ${styles.open}` : ''}`}>
            <Link href="/resources/publications/articles" className={styles.mobSubLink} onClick={closeMobile}>Articles</Link>
            <Link href="/resources/publications/regulatory-updates" className={styles.mobSubLink} onClick={closeMobile}>Regulatory Updates</Link>
          </div>

          <Link href="/resources/newsletters" className={styles.mobSubLink} style={{ fontWeight: 500 }} onClick={closeMobile}>
            Newsletters
          </Link>
        </div>

        <Link href="/#faq" className={styles.mobLink} onClick={closeMobile}>FAQ</Link>
        <Link href="/#contact" className={styles.mobCta} onClick={closeMobile}>Book Consultation</Link>

        <div className={styles.mobBrand} aria-hidden="true">
          <Image
            src="https://res.cloudinary.com/djnkxndun/image/upload/v1779269638/Stark_Legal_NG_Logo_styqvp.png"
            alt=""
            width={28}
            height={28}
            className={styles.mobBrandIcon}
          />
        </div>
      </div>
    </>
  )
}
