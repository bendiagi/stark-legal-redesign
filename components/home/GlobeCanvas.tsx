'use client'

import { useEffect, useRef } from 'react'
import styles from './GlobeCanvas.module.css'

export default function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let stopped = false
    let rotTimer: { stop: () => void } | null = null

    async function init() {
      if (typeof window === 'undefined') return
      const canvas = canvasRef.current
      const wrap = wrapRef.current
      if (!canvas || !wrap) return

      const d3 = await import('d3')
      if (stopped) return

      const ctx = canvas.getContext('2d')!
      if (!ctx) return

      const CW = wrap.clientWidth
      const CH = Math.round(CW * 0.62)
      const dpr = window.devicePixelRatio || 1

      canvas.width = CW * dpr
      canvas.height = CH * dpr
      canvas.style.width = CW + 'px'
      canvas.style.height = CH + 'px'
      ctx.scale(dpr, dpr)

      const BASE_R = Math.min(CW, CH) / 2 * 0.86
      const cx = CW / 2, cy = CH / 2

      const C_OCEAN  = '#091524'
      const C_BORDER = 'rgba(200,169,110,0.8)'
      const C_GRAT   = 'rgba(200,169,110,0.08)'
      const C_LAND   = 'rgba(200,169,110,0.28)'
      const C_DOT    = 'rgba(200,169,110,0.65)'

      const proj = d3.geoOrthographic()
        .scale(BASE_R)
        .translate([cx, cy])
        .clipAngle(90)

      const path = d3.geoPath().projection(proj).context(ctx)
      const graticule = d3.geoGraticule()

      let landFeatures: GeoJSON.FeatureCollection | null = null
      const allDots: [number, number][] = []
      const rotation: [number, number] = [20, -10]
      let autoRotate = true

      function pip(pt: [number, number], ring: [number, number][]): boolean {
        const [px, py] = pt
        let inside = false
        for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
          const [xi, yi] = ring[i], [xj, yj] = ring[j]
          if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside
        }
        return inside
      }

      function pointInFeature(pt: [number, number], feat: GeoJSON.Feature): boolean {
        const g = feat.geometry
        if (g.type === 'Polygon') {
          const coords = g.coordinates as [number, number][][]
          if (!pip(pt, coords[0])) return false
          for (let i = 1; i < coords.length; i++) if (pip(pt, coords[i])) return false
          return true
        }
        if (g.type === 'MultiPolygon') {
          const coords = g.coordinates as [number, number][][][]
          for (const poly of coords) {
            if (pip(pt, poly[0])) {
              let inHole = false
              for (let i = 1; i < poly.length; i++) { if (pip(pt, poly[i])) { inHole = true; break } }
              if (!inHole) return true
            }
          }
        }
        return false
      }

      function genDots(feat: GeoJSON.Feature, spacing: number): [number, number][] {
        const dots: [number, number][] = []
        const bounds = d3.geoBounds(feat)
        const [[minLng, minLat], [maxLng, maxLat]] = bounds
        const step = spacing * 0.08
        for (let lng = minLng; lng <= maxLng; lng += step) {
          for (let lat = minLat; lat <= maxLat; lat += step) {
            if (pointInFeature([lng, lat], feat)) dots.push([lng, lat])
          }
        }
        return dots
      }

      function render() {
        ctx.clearRect(0, 0, CW, CH)
        const sc = proj.scale()
        const sf = sc / BASE_R

        ctx.beginPath()
        ctx.arc(cx, cy, sc, 0, 2 * Math.PI)
        ctx.fillStyle = C_OCEAN
        ctx.fill()
        ctx.strokeStyle = C_BORDER
        ctx.lineWidth = 1.5 * sf
        ctx.stroke()

        if (!landFeatures) return

        ctx.beginPath()
        path(graticule())
        ctx.strokeStyle = C_GRAT
        ctx.lineWidth = 0.7 * sf
        ctx.stroke()

        ctx.beginPath()
        landFeatures.features.forEach(f => path(f as Parameters<typeof path>[0]))
        ctx.strokeStyle = C_LAND
        ctx.lineWidth = 0.75 * sf
        ctx.stroke()

        allDots.forEach(([lng, lat]) => {
          const p = proj([lng, lat])
          if (p && p[0] >= 0 && p[0] <= CW && p[1] >= 0 && p[1] <= CH) {
            ctx.beginPath()
            ctx.arc(p[0], p[1], 1.05 * sf, 0, 2 * Math.PI)
            ctx.fillStyle = C_DOT
            ctx.fill()
          }
        })
      }

      try {
        const resp = await fetch(
          'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json'
        )
        if (!resp.ok) throw new Error('fetch failed')
        landFeatures = await resp.json() as GeoJSON.FeatureCollection
        if (stopped) return
        landFeatures.features.forEach(f => {
          genDots(f, 18).forEach(d => allDots.push(d))
        })
        render()
      } catch {
        render()
      }

      rotTimer = d3.timer(() => {
        if (stopped) { rotTimer?.stop(); return }
        if (autoRotate) {
          rotation[0] += 0.38
          proj.rotate(rotation)
          render()
        }
      })

      canvas.addEventListener('mousedown', e => {
        autoRotate = false
        const sx = e.clientX, sy = e.clientY
        const r0: [number, number] = [...rotation]
        const mm = (ev: MouseEvent) => {
          rotation[0] = r0[0] + (ev.clientX - sx) * 0.45
          rotation[1] = Math.max(-90, Math.min(90, r0[1] - (ev.clientY - sy) * 0.45))
          proj.rotate(rotation)
          render()
        }
        const mu = () => {
          document.removeEventListener('mousemove', mm)
          document.removeEventListener('mouseup', mu)
          setTimeout(() => { autoRotate = true }, 20)
        }
        document.addEventListener('mousemove', mm)
        document.addEventListener('mouseup', mu)
      })

      canvas.addEventListener('touchstart', e => {
        autoRotate = false
        const t0 = e.touches[0]
        const sx = t0.clientX, sy = t0.clientY
        const r0: [number, number] = [...rotation]
        const tm = (ev: TouchEvent) => {
          const t = ev.touches[0]
          rotation[0] = r0[0] + (t.clientX - sx) * 0.45
          rotation[1] = Math.max(-90, Math.min(90, r0[1] - (t.clientY - sy) * 0.45))
          proj.rotate(rotation)
          render()
        }
        const te = () => {
          canvas.removeEventListener('touchmove', tm)
          canvas.removeEventListener('touchend', te)
          setTimeout(() => { autoRotate = true }, 20)
        }
        canvas.addEventListener('touchmove', tm, { passive: true })
        canvas.addEventListener('touchend', te)
      }, { passive: true })

      canvas.addEventListener('wheel', e => {
        e.preventDefault()
        const factor = e.deltaY > 0 ? 0.9 : 1.1
        proj.scale(Math.max(BASE_R * 0.45, Math.min(BASE_R * 3, proj.scale() * factor)))
        render()
      }, { passive: false })
    }

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        obs.disconnect()
        init()
      }
    }, { threshold: 0.05 })

    if (canvasRef.current) obs.observe(canvasRef.current)

    return () => {
      stopped = true
      obs.disconnect()
      rotTimer?.stop()
    }
  }, [])

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <canvas ref={canvasRef} className={styles.canvas} aria-label="Interactive world map showing Stark Legal's reach" />
      <div className={styles.hint} aria-hidden="true">Drag to rotate · Scroll to zoom</div>
    </div>
  )
}
