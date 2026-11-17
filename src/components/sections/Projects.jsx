import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { projects } from '../../data/projects'
import SectionTitle from '../ui/SectionTitle'
import Coverflow from '../ui/Coverflow'
import ProjectCard from '../ui/ProjectCard'
import ProjectModal from '../ui/ProjectModal'

const TABS = ['all', 'web', 'sistem', 'mobile', 'ai']

export default function Projects() {
  const { lang, t } = useLanguage()
  const [tab, setTab] = useState('all')
  const [selected, setSelected] = useState(null)

  // Ambil teks sesuai bahasa: { id, en } -> teks bahasa aktif
  const tr = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v)

  const list = tab === 'all' ? projects : projects.filter((p) => p.category === tab)
  const countOf = (key) => (key === 'all' ? projects.length : projects.filter((p) => p.category === key).length)

  const open = (p) => p.status !== 'soon' && setSelected(p)

  return (
    <section id="projects" className="relative mx-auto max-w-6xl overflow-x-clip px-5 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle index="01" label={t('nav.projects')} title={t('projects.title')} subtitle={t('projects.subtitle')} />

        {/* Tab kategori */}
        <div role="tablist" className="mb-6 flex flex-wrap gap-2">
          {TABS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`rounded-full border px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase transition ${
                tab === key
                  ? 'border-accent bg-accent text-accent-ink'
                  : 'border-line text-muted hover:border-ink/40 hover:text-ink'
              }`}
            >
              {t(`projects.tabs.${key}`)} <span className="ml-1 opacity-60">{countOf(key)}</span>
            </button>
          ))}
        </div>

        {/* key={tab}: ganti tab -> galeri dibuat ulang dan kembali ke kartu pertama */}
        <Coverflow
          key={tab}
          items={list}
          onSelect={open}
          prevLabel={t('projects.prev')}
          nextLabel={t('projects.next')}
          renderItem={(p, i, isActive) => <ProjectCard project={p} index={i} isActive={isActive} tr={tr} t={t} />}
        />
      </motion.div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={() => setSelected(null)} tr={tr} t={t} />}
      </AnimatePresence>
    </section>
  )
}
