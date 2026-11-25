import { motion } from 'motion/react'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { FiArrowUpRight } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import { contents } from '../../data/contents'
import { socials } from '../../data/socials'
import SectionTitle from '../ui/SectionTitle'
import ContentCard from '../ui/ContentCard'
import Button from '../ui/Button'

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function Content() {
  const { lang, t } = useLanguage()
  const tr = (v) => (v && typeof v === 'object' ? v[lang] : v)
  const follow = socials.filter((s) => s.name === 'TikTok' || s.name === 'Instagram')

  return (
    <section id="content" className="relative mx-auto max-w-6xl overflow-x-clip px-5 py-28">
      <motion.div {...reveal} transition={{ duration: 0.6 }}>
        <SectionTitle index="05" label={t('nav.content')} title={t('content.title')} subtitle={t('content.subtitle')} />
      </motion.div>

      {contents.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contents.map((item, i) => (
            <motion.div key={item.id} {...reveal} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}>
              <ContentCard item={item} title={tr(item.title)} t={t} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          {...reveal}
          transition={{ duration: 0.5 }}
          className="grid place-items-center rounded-3xl border border-dashed border-line bg-surface/40 px-6 py-16 text-center backdrop-blur"
        >
          <div className="flex gap-3 text-3xl text-hi">
            <FaTiktok />
            <FaInstagram />
          </div>
          <p className="mt-5 font-display text-2xl font-extrabold text-ink">{t('content.emptyTitle')}</p>
          <p className="mt-2 max-w-md text-muted">{t('content.emptyText')}</p>
        </motion.div>
      )}

      {/* Ajakan follow */}
      <motion.div {...reveal} transition={{ duration: 0.5 }} className="mt-8 flex flex-wrap items-center gap-3">
        <p className="mr-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{t('content.follow')}</p>
        {follow.map(({ name, url, icon: Icon }) => (
          <Button key={name} href={url} variant="outline" target="_blank" rel="noreferrer">
            <Icon /> {name} <FiArrowUpRight />
          </Button>
        ))}
      </motion.div>
    </section>
  )
}
