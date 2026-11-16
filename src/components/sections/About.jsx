import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "../ui/SectionTitle";
import Reveal from "../ui/Reveal";

export default function About() {
  const { t } = useLanguage();
  const paragraphs = t("about.paragraphs");
  const stats = t("about.stats");

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>{t("about.title")}</SectionTitle>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Kiri: cerita */}
          <Reveal className="space-y-5 lg:col-span-3">
            <span className="inline-block rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-500">
              {t("about.status")}
            </span>
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {text}
              </p>
            ))}
          </Reveal>

          {/* Kanan: kartu angka */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {stats.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1} className="h-full">
                <div className="h-full rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                  <p className="text-2xl font-bold text-blue-500">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
