import { createFileRoute } from "@tanstack/react-router";
import SiteShell from "../components/site/SiteShell";

const patterns = [
  "repeating-linear-gradient(45deg, rgba(182,232,53,0.10) 0 2px, transparent 2px 12px), #fff",
  "radial-gradient(circle, rgba(167,159,255,0.18) 1.5px, transparent 1.5px) 0 0 / 16px 16px, #fff",
  "repeating-linear-gradient(45deg, rgba(182,232,53,0.06) 0 2px, transparent 2px 10px), repeating-linear-gradient(-45deg, rgba(167,159,255,0.06) 0 2px, transparent 2px 10px), #fff",
];

const allNews: [string, string, string, string][] = [
  ["События", "15 июня 2026", "День открытых дверей программы ИИ", "Более 200 абитуриентов посетили кампус РУДН и лаборатории X5 Tech."],
  ["Партнёрство", "10 июня 2026", "X5 Tech открывает лабораторию в РУДН", "Новая лаборатория оснащена GPU-кластером и рабочими станциями."],
  ["Образование", "5 июня 2026", "Первый выпуск программы — результаты", "85% выпускников получили офферы в X5 Tech до защиты диплома."],
  ["События", "28 мая 2026", "Хакатон РУДН × X5 Tech", "48 часов на разработку AI-прототипа для реального бизнес-кейса."],
  ["Партнёрство", "20 мая 2026", "Стипендиальная программа X5 Tech", "10 студентов программы получают именные стипендии."],
  ["Образование", "12 мая 2026", "Новые курсы по LLM на 4 курсе", "Программа усилена практикой fine-tuning трансформеров."],
];

function NewsPage() {
  return (
    <SiteShell>
      <section style={{ marginTop: 72, padding: "96px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ width: 80, height: 3, background: "#B6E835", margin: "0 auto 24px" }} />
          <h1 style={{ fontWeight: 700, fontSize: 44, color: "#272727", textAlign: "center", marginBottom: 56 }}>Новости программы</h1>
          <div className="news-page-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {allNews.map(([cat, date, title, desc], i) => (
              <article key={title} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
                <div style={{ height: 180, background: patterns[i % 3] }} />
                <div style={{ padding: 24 }}>
                  <span style={{ display: "inline-block", marginBottom: 12, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, padding: "4px 12px", borderRadius: 999, background: "rgba(167,159,255,0.1)", color: "#A79FFF" }}>{cat}</span>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3", marginBottom: 10 }}>{date}</div>
                  <h3 style={{ fontWeight: 600, fontSize: 18, color: "#272727", lineHeight: 1.3, marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: "#6B6B6B", lineHeight: 1.55 }}>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 1024px) { .news-page-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 700px) { .news-page-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </SiteShell>
  );
}

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "Новости — РУДН × X5 Tech" }] }),
  component: NewsPage,
});