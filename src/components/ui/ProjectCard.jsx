import { FiArrowUpRight, FiLock } from 'react-icons/fi'

// Gambar sampul. Kalau tidak ada gambar, pakai ilustrasi sederhana
function Cover({ project }) {
  if (project.image) {
    return <img src={project.image} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
  }
  if (project.status === 'soon') {
    return (
      <div className="grid h-full w-full place-items-center border-b border-dashed border-line bg-surface">
        <FiLock size={34} className="text-muted" />
      </div>
    )
  }
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-accent">
      <span className="font-display text-8xl font-extrabold text-white/90">{project.title[0]}</span>
      <span className="absolute right-4 bottom-4 h-3 w-3 rounded-full bg-hi" />
    </div>
  )
}

// Tampilan satu kartu project (dipakai di dalam Coverflow)
export default function ProjectCard({ project, index, isActive, tr, t }) {
  const soon = project.status === 'soon'
  return (
    <div
      className={`overflow-hidden rounded-3xl border bg-surface/90 backdrop-blur transition-shadow ${
        isActive ? 'border-accent shadow-[0_30px_80px_-30px] shadow-accent/60' : 'border-line'
      } ${soon ? 'border-dashed' : ''}`}
    >
      <div className="relative aspect-4/3">
        <Cover project={project} />
        <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-ink uppercase backdrop-blur">
          {t(`projects.tabs.${project.category}`)}
        </span>
        <span className="absolute top-3 right-3 font-mono text-[11px] font-semibold text-white mix-blend-difference">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-2xl leading-tight font-extrabold text-ink">{project.title}</h3>
        <p className="mt-1.5 text-sm leading-snug text-muted">{tr(project.tagline)}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((s) => (
            <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted">
              {s}
            </li>
          ))}
        </ul>

        <p
          className={`mt-4 flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.14em] uppercase ${
            soon ? 'text-muted' : 'text-hi'
          }`}
        >
          {soon ? (
            t('projects.soon')
          ) : (
            <>
              {t('projects.viewCase')} <FiArrowUpRight />
            </>
          )}
        </p>
      </div>
    </div>
  )
}
