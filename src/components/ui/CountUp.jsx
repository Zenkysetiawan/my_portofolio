import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

// Angka yang menghitung naik dari 0 saat terlihat di layar
export default function CountUp({ to, prefix = '', duration = 1.6 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return setN(to)
    const controls = animate(0, to, { duration, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {n}
    </span>
  )
}
