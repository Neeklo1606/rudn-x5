import { createFileRoute } from "@tanstack/react-router";
import SiteShell from "../components/site/SiteShell";
import Hero from "../components/site/Hero";
import ForWhomAndInside from "../components/site/ForWhomAndInside";
import Curriculum from "../components/site/Curriculum";
import Tracks from "../components/site/Tracks";
import PartnerBlock from "../components/site/PartnerBlock";
import X5Touch from "../components/site/X5Touch";
import Experts from "../components/site/Experts";
import Admission from "../components/site/Admission";
import ApplyForm from "../components/site/ApplyForm";
import News from "../components/site/News";
import FinalCTA from "../components/site/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "РУДН × X5 Tech — Бакалавриат по ИИ" },
      { name: "description", content: "Программа бакалавриата по искусственному интеллекту в РУДН в партнёрстве с X5 Tech. Реальные AI-проекты с первого курса." },
      { property: "og:title", content: "РУДН × X5 Tech — Бакалавриат по ИИ" },
      { property: "og:description", content: "Изучай ИИ. Входи в профессию вместе с X5 Tech." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <ForWhomAndInside />
      <Curriculum />
      <Tracks />
      <PartnerBlock />
      <X5Touch />
      <News />
      <Experts />
      <Admission />
      <ApplyForm />
      <FinalCTA />
    </SiteShell>
  );
}
