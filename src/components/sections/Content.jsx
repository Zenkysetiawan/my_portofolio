import { FiVideo } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "../ui/SectionTitle";
import Reveal from "../ui/Reveal";
import ContentCard from "../ui/ContentCard";
import { contents } from "../../data/contents";
import { socials } from "../../data/socials";

const platformSocials = socials.filter((social) => social.name !== "GitHub");

export default function Content() {
  const { t } = useLanguage();

  return (
    <section id="content" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>{t("content.title")}</SectionTitle>

        <Reveal>
          <p className="max-w-2xl text-slate-600 dark:text-slate-300">
            {t("content.subtitle")}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            {platformSocials.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:-translate-y-0.5 hover:border-blue-500 dark:border-white/10 dark:bg-white/5"
              >
                <Icon className="text-2xl text-blue-500" />
                <span className="font-semibold">
                  {t("content.followOn")} {name}
                </span>
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-12">
          {contents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {contents.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.1}>
                  <ContentCard item={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-blue-500/40 px-6 py-16 text-center text-slate-600 dark:text-slate-300">
              <FiVideo className="text-3xl text-blue-500" />
              <p>{t("content.empty")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
