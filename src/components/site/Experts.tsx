import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const colors = ["#B6E835", "#A79FFF", "#272727"];

type Expert = { name: string; role: string; org: string; exp: string; photo: string };
const experts: Expert[] = [
  { name: "Иванов Сергей", role: "PhD, CV/NLP", org: "РУДН", exp: "Компьютерное зрение", photo: "https://i.pravatar.cc/300?img=12" },
  { name: "Петрова Анна", role: "PhD, ML", org: "РУДН", exp: "Машинное обучение", photo: "https://i.pravatar.cc/300?img=47" },
  { name: "Сидоров Михаил", role: "Lead ML Engineer", org: "X5 Tech", exp: "ML в ритейле", photo: "https://i.pravatar.cc/300?img=33" },
  { name: "Козлова Елена", role: "PhD, NLP", org: "РУДН", exp: "Обработка языка", photo: "https://i.pravatar.cc/300?img=45" },
  { name: "Морозов Дмитрий", role: "Senior PM", org: "X5 Tech", exp: "AI-продукты", photo: "https://i.pravatar.cc/300?img=60" },
  { name: "Волкова Мария", role: "PhD, Математика", org: "РУДН", exp: "Мат. методы", photo: "https://i.pravatar.cc/300?img=44" },
  { name: "Новиков Алексей", role: "Senior Researcher", org: "РУДН", exp: "Алгоритмы", photo: "https://i.pravatar.cc/300?img=15" },
  { name: "Соколова Ольга", role: "CV Engineer", org: "X5 Tech", exp: "Computer Vision", photo: "https://i.pravatar.cc/300?img=48" },
];

export default function Experts() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".expert-card");
    const step = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return (
    <section id="experts" style={{ background: "#F7F9F0" }} className="section">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: 300 }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, #E0E0E0)" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#B6E835" }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #E0E0E0, transparent)" }} />
        </div>
      </div>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ЭКСПЕРТЫ</div>
            <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727" }} className="h2-big">Эксперты и преподаватели</h2>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button aria-label="Назад" onClick={() => scrollBy(-1)} className="exp-nav" style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid #272727", background: "#fff", cursor: "pointer", display: "grid", placeItems: "center", transition: "all 200ms" }}>
              <ChevronLeft size={20} color="#272727" />
            </button>
            <button aria-label="Вперёд" onClick={() => scrollBy(1)} className="exp-nav" style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid #272727", background: "#fff", cursor: "pointer", display: "grid", placeItems: "center", transition: "all 200ms" }}>
              <ChevronRight size={20} color="#272727" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="expert-slider"
          style={{
            display: "grid", gridAutoFlow: "column", gridAutoColumns: "minmax(260px, 1fr)",
            gap: 24, overflowX: "auto", scrollSnapType: "x mandatory",
            paddingBottom: 16, scrollbarWidth: "none",
          }}
        >
          {experts.map((e, i) => (
            <div
              key={e.name}
              className="expert-card"
              style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "var(--shadow-card)", position: "relative", transition: "box-shadow 250ms ease", scrollSnapAlign: "start", display: "flex", flexDirection: "column" }}
            >
              <span className="top-border" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: colors[i % 3], borderRadius: "20px 20px 0 0", zIndex: 2 }} />
              <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1", overflow: "hidden", background: "#F0F0F0" }}>
                <img src={e.photo} alt={e.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 500ms ease" }} className="expert-photo" />
              </div>
              <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontWeight: 600, fontSize: 17, color: "#272727", lineHeight: 1.25 }}>{e.name}</div>
                <div style={{ fontSize: 13.5, color: "#6B6B6B" }}>{e.role}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#A3A3A3", marginTop: 2 }}>{e.org}</div>
                <span style={{ alignSelf: "flex-start", marginTop: 12, padding: "4px 12px", background: "rgba(167,159,255,0.12)", color: "#A79FFF", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, borderRadius: 999 }}>{e.exp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .expert-slider::-webkit-scrollbar { display: none; }
        .expert-card:hover { box-shadow: var(--shadow-card-hover); }
        .expert-card:hover .expert-photo { transform: scale(1.04); }
        .exp-nav:hover { background: #272727 !important; }
        .exp-nav:hover svg { stroke: #fff; }
        .expert-slider { grid-auto-columns: minmax(260px, calc((100% - 72px) / 4)) !important; }
        @media (max-width: 1024px) {
          .expert-slider { grid-auto-columns: minmax(240px, calc((100% - 24px) / 2)) !important; }
        }
        @media (max-width: 600px) {
          .expert-slider { grid-auto-columns: 78% !important; }
        }
      `}</style>
    </section>
  );
}