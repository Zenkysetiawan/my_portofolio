import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

// Garis tipis di paling atas layar yang memanjang sesuai seberapa jauh halaman di-scroll.
export default function ScrollProgress() {
  const reduce = useReducedMotion()
  // scrollYProgress = angka 0 (paling atas) sampai 1 (paling bawah)
  const { scrollYProgress } = useScroll()
  // useSpring membuat garis bergerak halus, tidak patah-patah
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
      // Orang yang mematikan animasi di perangkatnya: garis ikut langsung tanpa pegas
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  )
}
