import { motion } from "framer-motion";

const news: { cat: string; date: string; title: string; desc: string; img: string }[] = [
  {
    cat: "События", date: "15 июня 2026",
    title: "День открытых дверей программы ИИ",
    desc: "Более 200 абитуриентов посетили кампус РУДН и лаборатории X5 Tech, чтобы узнать о программе...",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=70&auto=format&fit=crop",
  },
  {
    cat: "Партнёрство", date: "10 июня 2026",
    title: "X5 Tech открывает лабораторию в РУДН",
    desc: "Новая лаборатория оснащена GPU-кластером и интерактивными рабочими станциями для студентов...",
    img: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&q=70&auto=format&fit=crop",
  },
  {
    cat: "Образование", date: "5 июня 2026",
    title: "Первый выпуск программы — результаты",
    desc: "85% выпускников получили офферы в X5 Tech и другие технологические компании ещё до защиты диплома...",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=70&auto=format&fit=crop",
  },
];

export default function News() {
  return (
    <section id="news" style={{ background: "#fff" }} className="section">
      <div className="container">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>НОВОСТИ</div>
        <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727", marginBottom: 48 }} className="h2-big">Новости программы</h2>

        <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {news.map(({ cat, date, title, desc, img }, i) => (
            <motion.article key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: i * 0.08, duration: 0.5 }}
              className="news-card" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-card)", transition: "all 350ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
              <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                <img src={img} alt={title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 500ms ease" }} className="news-img" />
              </div>
              <div style={{ padding: 24 }}>
                <span style={{ display: "inline-block", marginBottom: 12, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, padding: "4px 12px", borderRadius: 999, background: "rgba(167,159,255,0.1)", color: "#A79FFF" }}>{cat}</span>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3", marginBottom: 10 }}>{date}</div>
                <h3 style={{ fontWeight: 600, fontSize: 18, color: "#272727", lineHeight: 1.3, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#6B6B6B", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{desc}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <a href="/news" className="all-news" style={{ border: "2px solid #272727", padding: "14px 32px", borderRadius: 999, fontWeight: 600, fontSize: 15, color: "#272727", transition: "all 250ms ease" }}>
            Все новости
          </a>
        </div>
      </div>
      <style>{`
        .news-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-card-hover); }
        .news-card:hover .news-img { transform: scale(1.05); }
        .all-news:hover { background: #272727; color: #fff !important; }
        @media (max-width: 1024px) {
          .news-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}