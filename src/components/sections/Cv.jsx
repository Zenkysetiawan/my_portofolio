import { FiBookOpen, FiDownload, FiFileText } from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import useFileExists from "../../hooks/useFileExists";
import SectionTitle from "../ui/SectionTitle";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { cvFiles } from "../../data/cv";

export default function Cv() {
  const { lang, t } = useLanguage();
  const file = cvFiles[lang];
  const { checking, exists } = useFileExists(file);

  return (
    <section id="cv" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>{t("cv.title")}</SectionTitle>
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">
          {t("cv.subtitle")}
        </p>

        <div className="mt-8">
          {checking ? null : exists ? (
            <Reveal>
              <div className="flex flex-wrap gap-4">
                <Button href={file} target="_blank" rel="noreferrer">
                  <FiBookOpen /> {t("cv.read")}
                </Button>
                <Button href={file} variant="outline" download>
                  <FiDownload /> {t("cv.download")}
                </Button>
              </div>

              {/* Pratinjau PDF: hanya di layar sedang ke atas */}
              <div className="mt-8 hidden overflow-hidden rounded-2xl border border-slate-200 md:block dark:border-white/10">
                <iframe
                  src={`${file}#toolbar=0&view=FitH`}
                  title="CV Zenky Setiawan"
                  className="h-[70vh] min-h-120 w-full bg-white"
                />
              </div>

              {/* Pengganti pratinjau di HP */}
              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center md:hidden dark:border-white/10 dark:bg-white/5">
                <FiFileText className="mx-auto text-4xl text-blue-500" />
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {t("cv.mobileNote")}
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-blue-500/40 px-6 py-16 text-center text-slate-600 dark:text-slate-300">
              <FiFileText className="text-3xl text-blue-500" />
              <p>{t("cv.missing")}</p>
              {lang !== "id" && (
                <a
                  href={cvFiles.id}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-blue-500 hover:text-blue-400"
                >
                  {t("cv.viewOther")}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
