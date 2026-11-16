import {
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiMic,
  FiUsers,
} from "react-icons/fi";
import { useLanguage } from "../../context/LanguageContext";
import Reveal from "./Reveal";

const icons = {
  education: FiBookOpen,
  organization: FiUsers,
  achievement: FiAward,
  certification: FiCheckCircle,
  activity: FiMic,
};

export default function TimelineItem({ item }) {
  const { lang } = useLanguage();
  const Icon = icons[item.type];

  return (
    <li className="relative pb-10 last:pb-0">
      <Reveal className="relative pl-8">
        {/* Titik bulat dengan ikon, menempel di garis */}
        <span className="absolute left-0 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-blue-600 text-sm text-white ring-4 ring-white dark:ring-slate-950">
          <Icon />
        </span>

        <p className="text-sm font-medium text-purple-500 dark:text-purple-400">
          {item.date[lang]}
        </p>
        <h3 className="mt-1 text-lg font-bold">{item.title[lang]}</h3>
        <p className="text-sm font-medium text-blue-500">{item.place}</p>

        {item.description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {item.description[lang]}
          </p>
        )}
      </Reveal>
    </li>
  );
}
