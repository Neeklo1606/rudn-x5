import { motion } from "framer-motion";

const colors = ["#B6E835", "#A79FFF", "#272727"];

const experts: [string,string,string,string,string][] = [
  ["Иванов Сергей", "PhD, CV/NLP", "РУДН", "Компьютерное зрение", "ИС"],
  ["Петрова Анна", "PhD, ML", "РУДН", "Машинное обучение", "ПА"],
  ["Сидоров Михаил", "Lead ML Engineer", "X5 Tech", "ML в ритейле", "СМ"],
  ["Козлова Елена", "PhD, NLP", "РУДН", "Обработка языка", "КЕ"],
  ["Морозов Дмитрий", "Senior PM", "X5 Tech", "AI-продукты", "МД"],
  ["Волкова Мария", "PhD, Математика", "РУДН", "Мат. методы", "ВМ"],
  ["Новиков Алексей", "Senior Researcher", "РУДН", "Алгоритмы", "НА"],
  ["Соколова Ольга", "CV Engineer", "X5 Tech", "Computer Vision", "СО"],
];

export default function Experts() {
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
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ЭКСПЕРТЫ</div>
        <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727", marginBottom: 56 }} className="h2-big">Эксперты и преподаватели</h2>

        <div className="expert-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {experts.map(([name, role, org, exp, ini], i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.08, duration: 0.5 }}
              className="expert-card" style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", boxShadow: "var(--shadow-card)", position: "relative", transition: "all 350ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
              <span className="top-border" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "transparent", borderRadius: "20px 20px 0 0", transition: "background 300ms" }} />
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: colors[i % 3], color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22, marginBottom: 16 }}>{ini}</div>
              <div style={{ fontWeight: 600, fontSize: 18, color: "#272727", lineHeight: 1.2 }}>{name}</div>
              <div style={{ fontSize: 14, color: "#6B6B6B", marginTop: 4 }}>{role}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3", marginTop: 4 }}>{org}</div>
              <span style={{ display: "inline-block", marginTop: 12, padding: "4px 12px", background: "rgba(167,159,255,0.1)", color: "#A79FFF", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, borderRadius: 999 }}>{exp}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .expert-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); }
        .expert-card:hover .top-border { background: #B6E835 !important; }
        @media (max-width: 1024px) {
          .expert-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .expert-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}