import { useLanguage } from "../../context/LanguageContext";
import SectionTitle from "../ui/SectionTitle";
import TimelineItem from "../ui/TimelineItem";
import { journey } from "../../data/journey";

export default function Journey() {
  const { t } = useLanguage();

  return (
    <section id="journey" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle>{t("journey.title")}</SectionTitle>

        <ol className="ml-4 max-w-3xl border-l-2 border-blue-500/30">
          {journey.map((item) => (
            <TimelineItem key={item.id} item={item} />
          ))}
        </ol>
      </div>
    </section>
  );
}
