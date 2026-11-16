import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "../ui/SectionTitle";
import Reveal from "../ui/Reveal";
import { skillGroups } from "../../data/skills";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>{t("skills.title")}</SectionTitle>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.key}
              delay={i * 0.1}
              className={`h-full ${group.learning ? "md:col-span-2" : ""}`}
            >
              <div
                className={`h-full rounded-2xl border p-6 ${
                  group.learning
                    ? "border-dashed border-purple-500/50 bg-purple-500/5"
                    : "border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <h3 className="text-lg font-bold">
                  {t(`skills.groups.${group.key}`)}
                </h3>

                {group.learning && (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {t("skills.learningNote")}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-3">
                  {group.items.map(({ name, icon: Icon }) => (
                    <span
                      key={name}
                      className={`inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 dark:bg-slate-900 dark:text-slate-200 ${
                        group.learning
                          ? "border-purple-500/30 hover:border-purple-500"
                          : "border-slate-200 hover:border-blue-500 dark:border-white/10"
                      }`}
                    >
                      <Icon
                        className={
                          group.learning ? "text-purple-500" : "text-blue-500"
                        }
                      />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
