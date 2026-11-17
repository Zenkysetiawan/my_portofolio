import { motion } from "motion/react";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import Button from "../ui/Button";
import Typewriter from "../effects/Typewriter";
import { socials } from "../../data/socials";
import useFileExists from "../../hooks/useFileExists";
import { cvFiles } from "../../data/cv";
import ProfileCard from "../effects/ProfileCard";

export default function Hero() {
  const { lang, t } = useLanguage();
  const { exists } = useFileExists(cvFiles[lang]);
  const cvHref = exists ? cvFiles[lang] : cvFiles.id;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-10"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:gap-6">
        {/* Kiri: teks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] text-muted uppercase">
            <span className="h-px w-8 bg-hi" />
            {t("hero.greeting")}
          </p>

          <h1 className="mt-5 font-display text-6xl leading-[0.92] font-extrabold text-ink sm:text-7xl lg:text-8xl">
            Zenky
            <br />
            Setiawan<span className="text-hi">.</span>
          </h1>

          <p className="mt-6 h-8 font-mono text-lg font-medium text-accent sm:text-xl dark:text-[#8ea2ff]">
            <span className="mr-2 text-hi">&gt;</span>
            <Typewriter words={t("hero.roles")} />
          </p>

          <p className="mt-6 max-w-lg leading-relaxed text-muted">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">
              {t("hero.viewProjects")}{" "}
              <FiArrowRight className="transition group-hover:translate-x-0.5" />
            </Button>
            <Button href={cvHref} variant="outline" download>
              <FiDownload /> {t("hero.downloadCV")}
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2">
            {socials.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-lg text-muted transition hover:border-hi hover:text-hi"
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Baris info kecil */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            <li>{t("hero.location")}</li>
            <li className="hidden sm:block">3.79° S — 102.26° E</li>
            <li className="flex items-center gap-2 text-ink">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hi opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-hi" />
              </span>
              {t("hero.status")}
            </li>
          </ul>
        </motion.div>

        {/* Kanan: lanyard 3D */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  );
}
