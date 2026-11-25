import { useState } from 'react'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { FiPlay, FiExternalLink } from 'react-icons/fi'

// Dari link -> alamat embed. null kalau link tidak dikenali.
function embedUrl(platform, url) {
  if (platform === 'tiktok') {
    const m = url.match(/video\/(\d+)/)
    return m ? `https://www.tiktok.com/embed/v2/${m[1]}` : null
  }
  const m = url.match(/instagram\.com\/(p|reel|reels)\/([A-Za-z0-9_-]+)/)
  return m ? `https://www.instagram.com/${m[1] === 'reels' ? 'reel' : m[1]}/${m[2]}/embed` : null
}

// Video baru dimuat SETELAH diklik (click-to-load), supaya halaman tetap ringan
export default function ContentCard({ item, title, t }) {
  const [loaded, setLoaded] = useState(false)
  const Icon = item.platform === 'tiktok' ? FaTiktok : FaInstagram
  const src = embedUrl(item.platform, item.url)

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-surface/70 backdrop-blur">
      <div className="relative aspect-9/16 max-h-[520px] w-full bg-accent/20">
        {loaded && src ? (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            allow="encrypted-media; fullscreen"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            {item.thumb && <img src={item.thumb} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
            <button
              type="button"
              onClick={() => (src ? setLoaded(true) : window.open(item.url, '_blank', 'noreferrer'))}
              aria-label={`${t('content.play')}: ${title}`}
              className="absolute inset-0 grid place-items-center bg-black/30 transition hover:bg-black/20"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-hi text-[#0b1020] shadow-xl">
                <FiPlay size={26} className="translate-x-0.5" />
              </span>
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 p-5">
        <p className="flex items-center gap-2 font-display text-lg font-bold text-ink">
          <Icon className="text-hi" /> {title}
        </p>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={t('content.open')}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition hover:border-hi hover:text-hi"
        >
          <FiExternalLink size={15} />
        </a>
      </div>
    </article>
  )
}
