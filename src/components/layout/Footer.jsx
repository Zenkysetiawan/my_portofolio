import { FiArrowUp, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import { SECTION_IDS } from "./Navbar";
import { socials } from "../../data/socials";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-900/50">
      {/* Garis gradasi tipis di bagian atas */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/70 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Kolom 1: identitas */}
          <div>
            <a
              href="#home"
              className="bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent"
            >
              Zenky Setiawan
            </a>
            <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">
              Zenky Setiawan
            </p>
            <p className="mt-1 text-sm text-purple-500 dark:text-purple-400">
              {t("hero.roles").join(" · ")}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("footer.about")}
            </p>
          </div>

          {/* Kolom 2: navigasi */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              {t("footer.navigation")}
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-slate-600 transition hover:text-blue-500 dark:text-slate-400"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: terhubung */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              {t("footer.connect")}
            </h4>
            <div className="mt-4 flex gap-3">
              {socials.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg text-slate-600 transition hover:-translate-y-1 hover:border-blue-500 hover:text-blue-500 dark:border-white/20 dark:text-slate-300"
                >
                  <Icon />
                </a>
              ))}
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <FiMapPin className="text-blue-500" /> {t("footer.location")}
            </p>

            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              {t("footer.available")}
            </p>
          </div>
        </div>

        {/* Baris paling bawah */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row dark:border-white/10 dark:text-slate-400">
          <p>
            © {year} Zenky Setiawan. {t("footer.rights")}
          </p>
          <p>{t("footer.builtWith")}</p>
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-blue-500/50 px-4 py-2 font-semibold text-blue-500 transition hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white"
          >
            {t("footer.backToTop")}
            <FiArrowUp className="transition group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
