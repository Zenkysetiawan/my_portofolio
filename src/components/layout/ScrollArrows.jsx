import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useLanguage } from '../../context/LanguageContext'
import useScrollSpy from '../../hooks/useScrollSpy'
import { SECTION_IDS } from './Navbar'

// Dua tombol panah melayang: loncat ke section sebelumnya / berikutnya
export default function ScrollArrows() {
  const { t } = useLanguage()
  const active = useScrollSpy(SECTION_IDS)
  const index = SECTION_IDS.indexOf(active)

  const goTo = (i) => {
    const id = SECTION_IDS[i]
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const btn =
    'grid h-10 w-10 place-items-center rounded-full border border-line bg-bg/70 text-ink backdrop-blur-xl transition hover:bg-accent hover:text-accent-ink disabled:pointer-events-none disabled:opacity-30'

  return (
    <div className="fixed right-3 bottom-4 z-40 flex flex-col gap-2 sm:right-5 sm:bottom-6">
      <button type="button" className={btn} onClick={() => goTo(index - 1)} disabled={index <= 0} aria-label={t('nav.prev')}>
        <FiChevronUp size={18} />
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => goTo(index + 1)}
        disabled={index >= SECTION_IDS.length - 1}
        aria-label={t('nav.next')}
      >
        <FiChevronDown size={18} />
      </button>
    </div>
  )
}
