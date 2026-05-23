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

    // Page arrived — complete the bar
    setWidth(100)
    timerRef.current = setTimeout(() => setVisible(false), 400)

    return () => clearTimeout(timerRef.current)
  }, [pathname])

  // On mount, wire up Link clicks to start the bar
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      // Only trigger for internal same-origin navigation
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return

      clearTimeout(timerRef.current)
      setWidth(0)
      setVisible(true)
      // Animate to ~80% and stall (real completion fires when pathname changes)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setWidth(75))
      })
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
