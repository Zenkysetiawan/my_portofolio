import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import useScrollSpy from "../../hooks/useScrollSpy";

// Urutan section di halaman (juga dipakai Footer, App, dan ScrollArrows)
export const SECTION_IDS = [
  "home",
  "projects",
  "skills",
  "about",
  "journey",
  "content",
  "contact",
];

// Section yang muncul sebagai menu (Beranda cukup lewat logo)
const LINKS = SECTION_IDS.filter((id) => id !== "home");

const iconBtn =
  "grid h-9 w-9 place-items-center rounded-full text-muted transition hover:bg-ink/10 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const toggleLang = () => setLang(lang === "id" ? "en" : "id");
  const { theme, toggleTheme } = useTheme();
  const active = useScrollSpy(SECTION_IDS);
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const themeLabel =
    theme === "dark" ? t("nav.themeToLight") : t("nav.themeToDark");

  const controls = (
    <>
      <button
        type="button"
        onClick={toggleLang}
        className={`${iconBtn} font-mono text-[11px] font-semibold uppercase`}
        aria-label="Language"
      >
        {lang}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className={iconBtn}
        aria-label={themeLabel}
        title={themeLabel}
      >
        {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
      </button>
    </>
  );

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      <nav
        aria-label="Main"
        className="relative flex w-full max-w-fit items-center gap-1 rounded-full border border-line bg-bg/70 p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl max-lg:max-w-md max-lg:justify-between"
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => go("home")}
          className="flex items-center gap-2 rounded-full py-1 pr-3 pl-1 focus-visible:outline-2 focus-visible:outline-accent"
          aria-label="Zen — home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent font-display text-sm font-extrabold text-accent-ink">
            Z
          </span>
          <span className="font-mono text-xs font-semibold tracking-[0.2em] text-ink">
            ZEN
          </span>
        </button>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map((id) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => go(id)}
                aria-current={active === id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors ${
                  active === id
                    ? "text-accent-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{t(`nav.${id}`)}</span>
              </button>
            </li>
          ))}
        </ul>

        <span className="mx-1 hidden h-5 w-px bg-line lg:block" />
        <div className="hidden items-center lg:flex">{controls}</div>

        <button
          type="button"
          onClick={() => go("contact")}
          className="ml-1 hidden rounded-full bg-hi px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b1020] transition hover:brightness-110 lg:block"
        >
          {t("hire me")}
        </button>

        {/* Kontrol mobile */}
        <div className="flex items-center lg:hidden">
          {controls}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={iconBtn}
            aria-label={t("nav.menu")}
            aria-expanded={open}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>

        {/* Panel menu mobile */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-3xl border border-line bg-surface/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <ul className="grid gap-1">
                {LINKS.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => go(id)}
                      className={`w-full rounded-2xl px-4 py-3 text-left font-mono text-xs font-medium uppercase tracking-[0.14em] ${
                        active === id
                          ? "bg-accent text-accent-ink"
                          : "text-ink hover:bg-ink/10"
                      }`}
                    >
                      {t(`nav.${id}`)}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => go("contact")}
                className="mt-2 w-full rounded-2xl bg-hi px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#0b1020]"
              >
                {t("nav.hire")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
