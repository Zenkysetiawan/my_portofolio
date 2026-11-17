import { useEffect, useRef } from 'react'

// Latar belakang tetap (fixed) di belakang semua section.
// Lapisan dari bawah ke atas: cahaya sudut, titik-titik, titik yang menyala
// mengikuti kursor, garis kolom tipis, dan butiran halus (grain).
export default function Background() {
  const lit = useRef(null)

  useEffect(() => {
    // Di layar sentuh tidak ada kursor, jadi efek sorot dilewati
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = lit.current
    let frame = 0
    let x = 0
    let y = 0

    const apply = () => {
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
      frame = 0
    }
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      el.style.setProperty('--spot', '1')
      // requestAnimationFrame: update paling banyak sekali per frame, jadi ringan
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => el.style.setProperty('--spot', '0')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-glow absolute inset-0" />
      <div className="dot-grid-base absolute inset-0" />
      <div ref={lit} className="dot-grid-lit absolute inset-0" />
      <div className="rules absolute inset-0 mx-auto max-w-7xl" />
      <div className="grain absolute inset-0" />
    </div>
  )
}
