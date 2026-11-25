import { useEffect, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import { socials } from '../../data/socials'
import { SECTION_IDS } from './Navbar'

// Jam Bengkulu (WIB), diperbarui tiap 30 detik
function useBengkuluTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta' })
      .format(new Date())
      .replace('.', ':')
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Footer() {
  const { t } = useLanguage()
  const time = useBengkuluTime()
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="relative border-t border-line bg-bg/60 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Merek */}
        <div>
          <p className="font-display text-3xl font-extrabold text-ink">
            Zenky Setiawan<span className="text-hi">.</span>
          </p>
          <p className="mt-3 max-w-sm leading-relaxed text-muted">{t('footer.tagline')}</p>
          <p className="mt-5 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hi opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-hi" />
            </span>
            {t('footer.status')}
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            Bengkulu · {time} WIB
          </p>
        </div>

        {/* Navigasi */}
        <nav aria-label="Footer">
          <p className="mb-4 font-mono text-[11px] font-semibold tracking-[0.2em] text-hi uppercase">{t('footer.navigate')}</p>
          <ul className="grid gap-2.5">
            {SECTION_IDS.map((id) => (
              <li key={id}>
                <button type="button" onClick={() => go(id)} className="text-muted transition hover:text-ink">
                  {t(`nav.${id}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sosial */}
        <div>
          <p className="mb-4 font-mono text-[11px] font-semibold tracking-[0.2em] text-hi uppercase">{t('footer.connect')}</p>
          <ul className="grid gap-2.5">
            {socials.map(({ name, url, icon: Icon }) => (
              <li key={name}>
                <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 text-muted transition hover:text-ink">
                  <Icon /> {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
          <p>© {new Date().getFullYear()} Zenky Setiawan · {t('footer.rights')}</p>
          <p className="hidden sm:block">{t('footer.built')}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 uppercase transition hover:border-hi hover:text-hi"
          >
            {t('footer.top')} <FiArrowUp />
          </button>
        </div>
      </div>
    </footer>
  )
}
