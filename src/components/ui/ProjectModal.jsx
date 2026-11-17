import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { FiArrowUpRight, FiX } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import Button from './Button'

function Block({ label, children }) {
  return (
    <div className="mt-7">
      <h4 className="mb-2.5 font-mono text-[11px] font-semibold tracking-[0.2em] text-hi uppercase">{label}</h4>
      {children}
    </div>
  )
}

// Jendela studi kasus. Tutup: tombol X, tekan Esc, atau klik area gelap.
export default function ProjectModal({ project, onClose, tr, t }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    // Kunci scroll halaman di belakang jendela
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const features = tr(project.features)
  const role = tr(project.role)
  const impact = tr(project.impact)

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-surface shadow-2xl"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t('projects.close')}
          className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-bg/80 text-ink backdrop-blur transition hover:bg-hi hover:text-[#0b1020]"
        >
          <FiX size={18} />
        </button>

        {project.image && (
          <img src={project.image} alt="" className="aspect-16/9 w-full rounded-t-3xl object-cover object-top" />
        )}

        <div className="p-6 sm:p-9">
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-muted uppercase">
            {t(`projects.tabs.${project.category}`)}
          </p>
          <h3 className="mt-2 font-display text-4xl leading-none font-extrabold text-ink sm:text-5xl">
            {project.title}
            <span className="text-hi">.</span>
          </h3>
          <p className="mt-3 text-lg text-muted">{tr(project.tagline)}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo ? (
              <Button href={project.demo} target="_blank" rel="noreferrer">
                {t('projects.demo')} <FiArrowUpRight />
              </Button>
            ) : (
              <span className="rounded-full border border-dashed border-line px-5 py-3 font-mono text-xs tracking-[0.14em] text-muted uppercase">
                {t('projects.noDemo')}
              </span>
            )}
            {project.repo && (
              <Button href={project.repo} variant="outline" target="_blank" rel="noreferrer">
                <FaGithub /> {t('projects.code')}
              </Button>
            )}
          </div>

          <Block label={t('projects.overview')}>
            <p className="leading-relaxed text-ink/90">{tr(project.overview)}</p>
          </Block>

          {features?.length > 0 && (
            <Block label={t('projects.features')}>
              <ul className="grid gap-2">
                {features.map((f) => (
                  <li key={f} className="flex gap-3 text-ink/90">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hi" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {impact && (
            <Block label={t('projects.impact')}>
              <p className="rounded-2xl border border-line bg-bg/60 p-4 leading-relaxed text-ink/90">{impact}</p>
            </Block>
          )}

          <div className="grid gap-x-8 sm:grid-cols-2">
            <Block label={t('projects.stack')}>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full bg-accent/15 px-3 py-1.5 font-mono text-xs text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
            {role && (
              <Block label={t('projects.role')}>
                <p className="text-ink/90">{role}</p>
              </Block>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
