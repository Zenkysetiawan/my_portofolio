import { useState } from 'react'
import { motion } from 'motion/react'
import { FiAward, FiBookOpen, FiUsers, FiCheckCircle, FiHeart, FiUserCheck } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import { journey } from '../../data/journey'
import SectionTitle from '../ui/SectionTitle'

const ICONS = {
  education: FiBookOpen,
  organization: FiUsers,
  mentoring: FiUserCheck,
  achievement: FiAward,
  certification: FiCheckCircle,
  community: FiHeart,
}

// Tab filter -> jenis item mana yang ikut
const FILTERS = {
  all: null,
  experience: ['organization', 'mentoring', 'community'],
  achievement: ['achievement'],
  certification: ['certification'],
  education: ['education'],
}

export default function Journey() {
  const { lang, t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const tr = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v)

  const matches = (item, key) => !FILTERS[key] || FILTERS[key].includes(item.type)
  const list = journey.filter((item) => matches(item, filter))
  const countOf = (key) => journey.filter((item) => matches(item, key)).length

  return (
    <section id="journey" className="relative mx-auto max-w-6xl overflow-x-clip px-5 py-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle index="04" label={t('nav.journey')} title={t('journey.title')} subtitle={t('journey.subtitle')} />

        {/* Tab filter */}
        <div role="tablist" className="mb-5 flex flex-wrap gap-2">
          {Object.keys(FILTERS)
            .filter((key) => countOf(key) > 0)
            .map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={filter === key}
                onClick={() => setFilter(key)}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] font-semibold tracking-[0.12em] uppercase transition ${
                  filter === key
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line text-muted hover:border-ink/40 hover:text-ink'
                }`}
              >
                {t(`journey.filters.${key}`)} <span className="ml-1 opacity-60">{countOf(key)}</span>
              </button>
            ))}
        </div>

        {/* Kotak scroll: tinggi tetap, isi bisa banyak */}
        <div
          className="thin-scroll fade-y max-h-[480px] overflow-y-auto rounded-3xl border border-line bg-surface/40 py-7 pr-3 pl-4 backdrop-blur sm:max-h-[560px] sm:pr-5 sm:pl-6 md:pl-8"
          tabIndex={0}
          role="region"
          aria-label={t('journey.title')}
        >
          {/* key={filter}: ganti tab -> daftar dianimasikan ulang dari awal */}
          <ol key={filter} className="relative">
            <span className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[157px]" aria-hidden="true" />

            {list.map((item, i) => {
              const Icon = ICONS[item.type]
              const compact = item.type === 'certification' && !item.desc
              return (
                <motion.li
                  key={tr(item.title) + tr(item.when) + i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
                  className={`relative grid gap-2 pl-9 last:pb-0 md:grid-cols-[130px_1fr] md:gap-10 md:pl-0 ${
                    compact ? 'pb-4' : 'pb-8'
                  }`}
                >
                  <p
                    className={`font-mono text-xs font-semibold tracking-[0.14em] text-muted uppercase md:text-right ${
                      compact ? 'md:pt-3' : 'md:pt-6'
                    }`}
                  >
                    {tr(item.when)}
                  </p>

                  <span
                    className={`absolute left-0 h-[15px] w-[15px] rounded-full border-2 border-bg md:left-[150px] ${
                      compact ? 'top-1.5 md:top-[17px]' : 'top-1.5 md:top-[26px]'
                    } ${i === 0 && filter === 'all' ? 'bg-hi' : 'bg-accent'}`}
                  />

                  {compact ? (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-line px-5 py-3 transition hover:border-accent/60 md:ml-8">
                      <Icon size={14} className="text-hi" />
                      <h3 className="font-display text-base font-bold text-ink">{tr(item.title)}</h3>
                      <span className="text-sm text-muted">{item.place}</span>
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-line bg-surface/70 p-6 transition hover:border-accent/60 md:ml-8">
                      <p className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] text-hi uppercase">
                        <Icon size={14} /> {t(`journey.types.${item.type}`)}
                      </p>
                      <h3 className="mt-2 font-display text-xl leading-snug font-extrabold text-ink sm:text-2xl">
                        {tr(item.title)}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{item.place}</p>
                      {item.desc && <p className="mt-3 leading-relaxed text-ink/85">{tr(item.desc)}</p>}
                    </div>
                  )}
                </motion.li>
              )
            })}
          </ol>
        </div>

        <p className="mt-3 text-center font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          {list.length} {t('journey.items')} · {t('journey.scrollHint')}
        </p>
      </motion.div>
    </section>
  )
}
