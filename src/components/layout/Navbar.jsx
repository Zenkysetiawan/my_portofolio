import { useState } from "react";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import useScrollSpy from "../../hooks/useScrollSpy";

export const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "journey",
  "content",
  "cv",
  "contact",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const active = useScrollSpy(SECTION_IDS);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/70 backdrop-blur dark:bg-slate-950/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#home" className="text-xl font-bold text-blue-500">
          Zenky setiawan
        </a>

        {/* Menu desktop */}
        <ul className="hidden gap-6 Ig:flex">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`text-sm transition-colors ${
                  active === id
                    ? "text-blue-500"
                    : "text-slate-600 hover:text-blue-400 dark:text-slate-300"
                }`}
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "id" ? "en" : "id")}
            className="rounded border border-blue-500/50 px-2 py-1 text-xs font-semibold text-blue-500"
          >
            {lang === "id" ? "ID | en" : "id | EN"}
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-slate-600 dark:text-slate-300"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="Ig:hidden text-slate-600 dark:text-slate-300"
            aria-label="Menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <ul className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 Ig:hidden">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="text-slate-700 dark:text-slate-200"
              >
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
