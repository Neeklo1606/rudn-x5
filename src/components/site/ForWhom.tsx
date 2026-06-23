import { Calculator, Briefcase, Zap, Users } from "lucide-react";

const forWhom = [
  { Icon: Calculator, title: "Сильная математика", desc: "Уверенно владеешь алгеброй и математическим анализом" },
  { Icon: Briefcase, title: "Карьера в IT", desc: "Хочешь строить карьеру в технологической компании" },
  { Icon: Zap, title: "Высокий темп", desc: "Готов учиться быстро и много работать" },
  { Icon: Users, title: "Сильная среда", desc: "Ищешь окружение амбициозных людей" },
];

export default function ForWhom() {
  return (
    <section style={{ background: "#F1F1F1" }} className="section">
      <div className="container">
        <div style={{ maxWidth: 960, marginInline: "auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ДЛЯ КОГО</div>
          <h2 style={{ fontWeight: 700, fontSize: 40, lineHeight: 1.15, color: "#272727", marginBottom: 48 }} className="h2">Тебе к нам, если ты:</h2>

          <div
            className="for-whom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {forWhom.map(({ Icon, title, desc }) => (
              <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(182,232,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={24} color="#272727" strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18, color: "#272727", marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.55, color: "#6B6B6B" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .h2 { font-weight: 700; }
        @media (max-width: 768px) {
          .h2 { font-size: 30px !important; }
          .for-whom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}