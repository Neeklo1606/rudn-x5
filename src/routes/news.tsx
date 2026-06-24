import { createFileRoute } from "@tanstack/react-router";
import SiteShell from "../components/site/SiteShell";
import { newsItems } from "../data/news";

function NewsPage() {
  return (
    <SiteShell>
      <section style={{ marginTop: 72, padding: "96px 0", background: "#fff" }}>
        <div className="container">
          <div style={{ width: 80, height: 3, background: "#B6E835", margin: "0 auto 24px" }} />
          <h1 style={{ fontWeight: 700, fontSize: 44, color: "#272727", textAlign: "center", marginBottom: 56 }}>Новости программы</h1>
          <div className="news-page-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {newsItems.map(({ id, cat, date, title, desc, img }) => (
              <article key={id} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
                <div style={{ height: 180, overflow: "hidden" }}>
                  <img src={img} alt={title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
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
  head: () => ({ meta: [{ title: "Новости – РУДН × X5 Tech" }] }),
  component: NewsPage,
});