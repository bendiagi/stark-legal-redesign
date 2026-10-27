'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ProgressBar() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const prevPathRef = useRef(pathname)

  useEffect(() => {
    if (pathname === prevPathRef.current) return
    prevPathRef.current = pathname

    // Page arrived — complete the bar, then fully reset so it unmounts
    clearTimeout(timerRef.current)
    setWidth(100)
    timerRef.current = setTimeout(() => {
      setVisible(false)
      setWidth(0)
    }, 400)

    return () => clearTimeout(timerRef.current)
  }, [pathname])

  // On mount, wire up Link clicks to start the bar
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return

      // Only start for a real page change: same-origin and a different pathname.
      // Hash jumps (/#team on /) and same-page links never change pathname, so the
      // bar would never get its completion signal and would stall forever.
      let url: URL
      try { url = new URL(anchor.href, window.location.href) } catch { return }
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return

      clearTimeout(timerRef.current)
      setWidth(0)
      setVisible(true)
      // Animate to ~75% and stall (real completion fires when pathname changes)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWidth(75))
      })
      // Safety net: if the navigation never lands (cancelled, failed), don't leave the bar hanging
      timerRef.current = setTimeout(() => {
        setVisible(false)
        setWidth(0)
      }, 10000)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (!visible && width === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 2,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${width}%`,
          background: '#C8A96E',
          transition: width === 0
            ? 'none'
            : width === 100
            ? 'width 0.25s ease-out'
            : 'width 1.2s cubic-bezier(0.1, 0.05, 0, 1)',
          boxShadow: '0 0 6px rgba(200,169,110,0.6)',
        }}
      />
    </div>
  )
}
