import { motion } from 'motion/react'
import { useLanguage } from '../../context/LanguageContext'
import { about } from '../../data/about'
import SectionTitle from '../ui/SectionTitle'
import CountUp from '../ui/CountUp'

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function About() {
  const { lang, t } = useLanguage()
  const tr = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] : v)

  return (
    <section id="about" className="relative mx-auto max-w-6xl overflow-x-clip px-5 py-28">
      <motion.div {...reveal} transition={{ duration: 0.6 }}>
        <SectionTitle index="03" label={t('nav.about')} title={t('about.title')} />
      </motion.div>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Kiri: headline + cerita */}
        <motion.div {...reveal} transition={{ duration: 0.6 }}>
          <p className="font-display text-3xl leading-[1.1] font-extrabold text-ink sm:text-4xl lg:text-5xl">
            {tr(about.headline)}
          </p>
          <div className="mt-8 grid gap-4 leading-relaxed text-muted">
            {tr(about.story).map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* Kanan: angka + currently */}
        <div className="grid content-start gap-4">
          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((s, i) => (
              <motion.div
                key={s.value + tr(s.label)}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur"
              >
                <p className="font-display text-5xl leading-none font-extrabold text-ink">
                  <CountUp to={s.value} prefix={s.prefix} />
                  <span className="text-hi">{s.prefix ? '' : '+'}</span>
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{tr(s.label)}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...reveal}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-accent/50 bg-surface/70 p-6 backdrop-blur"
          >
            <p className="flex items-center gap-2.5 font-mono text-[11px] font-semibold tracking-[0.2em] text-hi uppercase">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hi opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-hi" />
              </span>
              {t('about.currently')}
            </p>
            <ul className="mt-4 grid gap-3">
              {about.currently.map((c) => (
                <li key={c.id} className="flex gap-3 text-ink">
                  <span className="font-mono text-hi">&gt;</span>
                  {tr(c)}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
