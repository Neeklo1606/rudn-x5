import { ShoppingCart, Sparkle, Code2, Eye } from "lucide-react";

function BigCounter({ to }: { to: number }) {
  return <span>{to.toLocaleString("ru-RU")}+</span>;
}

const directions = [
  { Icon: ShoppingCart, title: "ML в ритейле", desc: "Прогнозирование спроса, персонализация, управление цепочками поставок" },
  { Icon: Sparkle, title: "AI-продукты", desc: "Разработка AI-сервисов для 30 млн покупателей" },
  { Icon: Code2, title: "AI-кодинг", desc: "Copilot-инструменты для разработчиков X5" },
  { Icon: Eye, title: "Computer Vision", desc: "Распознавание товаров, контроль полок, autonomous checkout" },
];

export default function PartnerBlock() {
  return (
    <>
      <div style={{ height: 2, background: "linear-gradient(90deg, #B6E835, #A79FFF)" }} />
      <section style={{ background: "#1A2035", color: "#fff", padding: "120px 0" }}>
        <div className="container">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "rgba(182,232,53,0.8)", textTransform: "uppercase", marginBottom: 16 }}>ПАРТНЁР</div>
          <h2 style={{ fontWeight: 700, fontSize: 44, color: "#fff", maxWidth: 700, marginBottom: 20 }} className="h2-big">X5 Tech — мост в реальную AI-практику.</h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 600, marginBottom: 56 }}>
            X5 Tech — технологическое ядро X5 Group, одного из крупнейших ритейлеров России. Команда строит AI-продукты, которые работают на миллионы покупателей каждый день.
          </p>

          <div
            style={{ background: "#fff", borderRadius: 24, padding: 44, position: "relative", boxShadow: "var(--shadow-dark-card)", maxWidth: 720 }}>
            <span style={{ position: "absolute", top: -20, left: 24, fontWeight: 900, fontSize: 160, color: "rgba(182,232,53,0.08)", userSelect: "none", pointerEvents: "none", lineHeight: 1 }}>«</span>
            <p style={{ fontStyle: "italic", fontSize: 21, lineHeight: 1.6, color: "#272727", position: "relative", zIndex: 1 }}>
              Мы строим крупнейшую AI-компанию в ритейле. Нам нужны не теоретики, а инженеры, которые умеют доводить модели до production.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#B6E835", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>МН</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: "#272727" }}>Михаил Новиков</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3", marginTop: 2 }}>CTO X5 Tech</div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 64 }}>
            <div style={{ fontWeight: 800, fontSize: 72, color: "#B6E835", lineHeight: 1 }} className="big-stat">
              <BigCounter to={30000} />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: 0.5, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>магазинов в экосистеме X5</div>
          </div>

          <div className="direction-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 72 }}>
            {directions.map(({ Icon, title, desc }, i) => (
              <div key={title}
                className="dir-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32, transition: "all 350ms ease" }}>
                <Icon size={36} color="#B6E835" strokeWidth={1.6} />
                <div style={{ fontWeight: 600, fontSize: 18, color: "#fff", marginTop: 16, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .dir-card:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(182,232,53,0.3) !important; box-shadow: 0 0 24px rgba(182,232,53,0.08); }
          @media (max-width: 768px) {
            .h2-big { font-size: 32px !important; }
            .big-stat { font-size: 56px !important; }
            .direction-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}