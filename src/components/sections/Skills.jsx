import { motion } from 'motion/react'
import { FiArrowUpRight } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import { services, skillGroups } from '../../data/skills'
import SectionTitle from '../ui/SectionTitle'
import Button from '../ui/Button'

// Munculkan elemen pelan-pelan saat masuk layar
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function Skills() {
  const { lang, t } = useLanguage()
  const tr = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v)

  return (
    <section id="skills" className="relative mx-auto max-w-6xl overflow-x-clip px-5 py-28">
      <motion.div {...reveal} transition={{ duration: 0.6 }}>
        <SectionTitle index="02" label={t('nav.skills')} title={t('skills.title')} subtitle={t('skills.subtitle')} />
      </motion.div>

      {/* Kartu layanan bernomor */}
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.article
              key={s.id}
              {...reveal}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-7 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent/70"
            >
              <span className="absolute -top-3 right-5 font-display text-8xl font-extrabold text-ink/[0.05] transition group-hover:text-accent/20">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-ink">
                <Icon size={22} />
              </div>

              <h3 className="mt-6 flex flex-wrap items-center gap-3 font-display text-2xl font-extrabold text-ink">
                {tr(s.title)}
                {s.learning && (
                  <span className="rounded-full border border-hi/60 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-hi uppercase">
                    {t('skills.learningBadge')}
                  </span>
                )}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{tr(s.desc)}</p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          )
        })}
      </div>

      {/* Ajakan bekerja sama */}
      <motion.div
        {...reveal}
        transition={{ duration: 0.5 }}
        className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-surface/70 p-7 backdrop-blur sm:flex-row sm:items-center"
      >
        <p className="max-w-xl font-display text-xl leading-snug font-bold text-ink sm:text-2xl">
          {t('skills.ctaText')}
        </p>
        <Button href="#contact">
          {t('skills.ctaButton')} <FiArrowUpRight />
        </Button>
      </motion.div>

      {/* Teknologi per kelompok */}
      <motion.h3
        {...reveal}
        transition={{ duration: 0.5 }}
        className="mt-20 mb-8 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-muted uppercase"
      >
        <span className="h-px w-8 bg-hi" />
        {t('skills.stackLabel')}
      </motion.h3>

      <div className="divide-y divide-line border-y border-line">
        {skillGroups.map((g) => (
          <motion.div
            key={g.id}
            {...reveal}
            transition={{ duration: 0.5 }}
            className="grid gap-4 py-6 md:grid-cols-[220px_1fr] md:items-center"
          >
            <h4
              className={`flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase ${
                g.learning ? 'text-hi' : 'text-ink'
              }`}
            >
              {g.learning && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hi opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-hi" />
                </span>
              )}
              {tr(g.title)}
            </h4>

            <ul className="flex flex-wrap gap-2.5">
              {g.items.map(({ name, icon: Icon }) => (
                <li
                  key={name}
                  className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm text-ink transition hover:-translate-y-0.5 hover:border-accent ${
                    g.learning ? 'border-dashed border-hi/60' : 'border-line bg-surface/60'
                  }`}
                >
                  <Icon className={g.learning ? 'text-hi' : 'text-accent dark:text-[#8ea2ff]'} size={16} />
                  {name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
