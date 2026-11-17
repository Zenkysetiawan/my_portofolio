import { motion } from "motion/react";
import { FiArrowRight, FiMail, FiDownload } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import Button from "../ui/Button";
import Typewriter from "../effects/Typewriter";
import GlowBackground from "../effects/GlowBackground";
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
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <GlowBackground />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        {/* Kiri: teks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {t("hero.greeting")}
          </p>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Zenky Setiawan <span className="text-blue-500">(Zen)</span>
          </h1>
          <h2 className="mt-4 h-9 text-2xl font-semibold text-purple-500 dark:text-purple-400">
            <Typewriter words={t("hero.roles")} />
          </h2>
          <p className="mt-6 max-w-xl text-slate-600 dark:text-slate-300">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#projects">
              {t("hero.viewProjects")} <FiArrowRight />
            </Button>
            <Button href="#contact" variant="outline">
              <FiMail /> {t("hero.contact")}
            </Button>
            <Button href={cvHref} variant="outline" download>
              <FiDownload /> {t("hero.downloadCV")}
            </Button>
          </div>

          <div className="mt-8 flex gap-5 text-2xl text-slate-500 dark:text-slate-400">
            {socials.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="transition hover:text-blue-500"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Kanan: kartu foto (sementara statis, nanti jadi lanyard 3D) */}
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
