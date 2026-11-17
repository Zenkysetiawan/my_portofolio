import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Layar kecil -> kartu lebih sempit
function useCompact() {
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = (e) => setCompact(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return compact
}

// Galeri coverflow 3D: satu kartu di tengah, sisanya miring di kiri-kanan.
// items: daftar data. renderItem(item, index, isActive) -> isi kartu.
export default function Coverflow({ items, renderItem, onSelect, prevLabel, nextLabel }) {
  const [active, setActive] = useState(0)
  const compact = useCompact()
  const didDrag = useRef(false)

  const cardW = compact ? 264 : 320
  const step = compact ? 150 : 230
  const go = (i) => setActive(Math.max(0, Math.min(items.length - 1, i)))

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(active - 1)
    if (e.key === 'ArrowRight') go(active + 1)
  }

  return (
    <div>
      <motion.div
        className="relative flex h-[470px] items-center justify-center outline-none sm:h-[530px]"
        style={{ perspective: 1400 }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onPointerDown={() => (didDrag.current = false)}
        onDrag={(_, info) => {
          if (Math.abs(info.offset.x) > 6) didDrag.current = true
        }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) go(active + 1)
          else if (info.offset.x > 50) go(active - 1)
        }}
      >
        {items.map((item, i) => {
          const offset = i - active
          const abs = Math.abs(offset)
          const isActive = offset === 0
          return (
            <motion.button
              key={item.id}
              type="button"
              tabIndex={isActive ? 0 : -1}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => {
                if (didDrag.current) return
                if (isActive) onSelect(item)
                else go(i)
              }}
              className="absolute cursor-pointer text-left"
              style={{ width: cardW, zIndex: 10 - abs, pointerEvents: abs > 2 ? 'none' : 'auto' }}
              initial={false}
              animate={{
                x: offset * step,
                z: -abs * 140,
                rotateY: Math.max(-55, Math.min(55, -offset * 42)),
                scale: 1 - Math.min(abs, 3) * 0.06,
                opacity: abs > 2 ? 0 : 1 - abs * 0.22,
              }}
              transition={{ type: 'spring', stiffness: 240, damping: 30 }}
            >
              {renderItem(item, i, isActive)}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Kontrol: panah + titik + penghitung */}
      <div className="mt-2 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(active - 1)}
          disabled={active === 0}
          aria-label={prevLabel}
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:bg-accent hover:text-accent-ink disabled:pointer-events-none disabled:opacity-30"
        >
          <FiChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${i + 1} / ${items.length}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-hi' : 'w-1.5 bg-line hover:bg-muted'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(active + 1)}
          disabled={active === items.length - 1}
          aria-label={nextLabel}
          className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition hover:bg-accent hover:text-accent-ink disabled:pointer-events-none disabled:opacity-30"
        >
          <FiChevronRight size={18} />
        </button>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] tracking-[0.2em] text-muted">
        {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </p>
    </div>
  )
}
