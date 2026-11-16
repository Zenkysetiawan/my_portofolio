import { createContext, useContext, useEffect, useState } from "react";
import id from "../locales/id.json";
import en from "../locales/en.json";

const dictionaries = { id, en };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "id");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // t('nav.home') -> baca dictionaries[lang].nav.home
  const t = (key) =>
    key.split(".").reduce((obj, k) => obj?.[k], dictionaries[lang]) ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
