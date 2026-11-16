import { FiExternalLink, FiGithub, FiImage } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";

export default function ProjectCard({ project }) {
  const { lang, t } = useLanguage();
  const { title, image, tech, demo, github, description } = project;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/20 dark:border-white/10 dark:bg-white/5">
      {image ? (
        <img
          src={image}
          alt={title}
          className="aspect-video w-full object-cover object-top"
        />
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-linear-to-br from-blue-600/30 to-purple-600/30 text-4xl text-blue-400">
          <FiImage />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {description[lang]}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500"
            >
              {item}
            </span>
          ))}
        </div>

        {(demo || github) && (
          <div className="mt-5 flex gap-5 text-sm font-semibold">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400"
              >
                <FiExternalLink /> {t("projects.demo")}
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-500 dark:text-slate-300"
              >
                <FiGithub /> {t("projects.github")}
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
