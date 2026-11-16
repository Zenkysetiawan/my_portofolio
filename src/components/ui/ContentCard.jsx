import { useState } from "react";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { FiPlay, FiExternalLink } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import { getEmbedUrl } from "../../utils/embed";

const platforms = {
  tiktok: { label: "TikTok", icon: FaTiktok },
  instagram: { label: "Instagram", icon: FaInstagram },
};

export default function ContentCard({ item }) {
  const { lang, t } = useLanguage();
  const [playing, setPlaying] = useState(false);

  const { label, icon: Icon } = platforms[item.platform];
  const embedUrl = getEmbedUrl(item.platform, item.url);
  const title = item.title[lang];

  const handlePlay = () => {
    if (embedUrl) setPlaying(true);
    else window.open(item.url, "_blank", "noreferrer");
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
      <div className="relative h-150 w-full bg-slate-900">
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={t("content.play")}
            className="group absolute inset-0 flex items-center justify-center bg-cover bg-center"
            style={
              item.thumbnail
                ? { backgroundImage: `url(${item.thumbnail})` }
                : undefined
            }
          >
            <span className="absolute inset-0 bg-linear-to-br from-blue-600/40 to-purple-600/40" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-blue-600 transition group-hover:scale-110">
              <FiPlay />
            </span>
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-semibold">{title}</h3>
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-400"
        >
          <Icon /> {t("content.watchOn")} {label} <FiExternalLink />
        </a>
      </div>
    </article>
  );
}
