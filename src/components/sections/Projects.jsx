import { useState } from "react";
import { motion } from "motion/react";
import { FiTool } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data/projects";

const FILTERS = ["all", "web", "system", "mobile", "ai"];

export default function Projects() {
  const { t } = useLanguage();
  const [active, setActive] = useState("all");

  const visible =
    active === "all"
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>{t("projects.title")}</SectionTitle>

        {/* Tombol tab kategori */}
        <div className="mb-10 flex flex-wrap gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active === filter
                  ? "bg-blue-600 text-white"
                  : "border border-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-500 dark:border-white/20 dark:text-slate-300"
              }`}
            >
              {t(`projects.filters.${filter}`)}
            </button>
          ))}
        </div>

        {/* Isi: kartu project, atau pesan "sedang dikerjakan" */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {visible.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-blue-500/40 px-6 py-16 text-center text-slate-600 dark:text-slate-300">
              <FiTool className="text-3xl text-blue-500" />
              <p>{t(`projects.empty.${active}`)}</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
