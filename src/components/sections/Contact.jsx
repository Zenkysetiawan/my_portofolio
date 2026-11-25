import { motion } from 'motion/react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowUpRight, FiMail } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import { contact } from '../../data/contact'
import { socials } from '../../data/socials'
import SectionTitle from '../ui/SectionTitle'
import ContactForm from '../ui/ContactForm'
import Comments from '../ui/Comments'

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

export default function Contact() {
  const { lang, t } = useLanguage()

  const cards = [
    { name: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: FiMail },
    {
      name: 'WhatsApp',
      value: `+${contact.whatsapp}`,
      href: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText[lang])}`,
      icon: FaWhatsapp,
    },
    ...socials.map((s) => ({ name: s.name, value: s.url.replace(/^https?:\/\/(www\.)?/, ''), href: s.url, icon: s.icon })),
  ]

  return (
    <section id="contact" className="relative mx-auto max-w-6xl overflow-x-clip px-5 py-28">
      <motion.div {...reveal} transition={{ duration: 0.6 }}>
        <SectionTitle index="06" label={t('nav.contact')} title={t('contact.title')} subtitle={t('contact.subtitle')} />
      </motion.div>

      {/* Temukan saya */}
      <p className="mb-4 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-muted uppercase">
        <span className="h-px w-8 bg-hi" />
        {t('contact.findMe')}
      </p>
      <ul className="mb-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ name, value, href, icon: Icon }, i) => (
          <motion.li key={name} {...reveal} transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}>
            <a
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-accent/70"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-lg text-accent-ink">
                <Icon />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg leading-tight font-bold text-ink">{name}</span>
                <span className="block truncate font-mono text-[11px] text-muted">{value}</span>
              </span>
              <FiArrowUpRight className="text-muted transition group-hover:text-hi" />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Form pesan + komentar */}
      <div className="grid gap-5 lg:grid-cols-2">
        <motion.div {...reveal} transition={{ duration: 0.5 }}>
          <ContactForm />
        </motion.div>
        <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.08 }}>
          <Comments />
        </motion.div>
      </div>
    </section>
  )
}
