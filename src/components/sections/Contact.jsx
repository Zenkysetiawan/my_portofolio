import { FiMail, FiArrowUpRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "../ui/SectionTitle";
import Reveal from "../ui/Reveal";
import { contact } from "../../data/contact";
import { socials } from "../../data/socials";

const github = socials.find((social) => social.name === "GitHub");
const otherSocials = socials.filter((social) => social.name !== "GitHub");

export default function Contact() {
  const { lang, t } = useLanguage();

  const cards = [
    {
      key: "email",
      icon: FiMail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
    },
    {
      key: "whatsapp",
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: t("contact.whatsappCta"),
      href: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
        contact.whatsappMessage[lang],
      )}`,
      external: true,
    },
    {
      key: "github",
      icon: github.icon,
      label: "GitHub",
      value: github.url.replace("https://", ""),
      href: github.url,
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>{t("contact.title")}</SectionTitle>

        <Reveal>
          <h3 className="max-w-2xl text-2xl font-bold sm:text-3xl">
            {t("contact.heading")}
          </h3>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            {t("contact.subtitle")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map(({ key, icon: Icon, label, value, href, external }, i) => (
            <Reveal key={key} delay={i * 0.1} className="h-full">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-600/20 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl text-blue-500 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 break-all font-semibold">{value}</p>
                </div>
                <FiArrowUpRight className="mt-auto self-end text-xl text-slate-400 transition group-hover:text-blue-500" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("contact.orFollow")}
          </p>
          <div className="mt-3 flex gap-4">
            {otherSocials.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-xl text-slate-600 transition hover:-translate-y-1 hover:border-blue-500 hover:text-blue-500 dark:border-white/20 dark:text-slate-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
