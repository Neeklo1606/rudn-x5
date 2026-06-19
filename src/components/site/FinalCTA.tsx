export default function FinalCTA() {
  return (
    <div style={{ background: "linear-gradient(180deg, #fff 0, #272727 100px)", paddingTop: 100 }}>
      <section style={{ background: "#272727", color: "#fff", padding: "120px 0 140px", position: "relative", overflow: "hidden" }}>
        <div
          style={{ position: "absolute", top: "50%", left: "50%", marginTop: -100, marginLeft: -100, width: 200, height: 200, borderRadius: "50%", border: "2px solid rgba(182,232,53,0.15)", opacity: 0.4, pointerEvents: "none" }}
        />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <h2
            style={{ fontWeight: 700, fontSize: 52, lineHeight: 1.1, color: "#fff", marginBottom: 24 }} className="cta-h2">
            ИИ начинается не после диплома. ИИ начинается здесь.
          </h2>
          <p
            style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: 44 }}>
            Приём документов с 20 июня 2026. 25 бюджетных мест. Начни карьеру в AI с программой РУДН × X5 Tech.
          </p>
          <div
            className="final-cta-buttons" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#apply" className="cta-lime" style={{ background: "#B6E835", color: "#272727", fontWeight: 600, fontSize: 17, padding: "18px 40px", borderRadius: 999, transition: "all 250ms ease", display: "inline-block" }}>Подать заявку</a>
            <a href="#apply" className="cta-ghost" style={{ background: "transparent", border: "2px solid rgba(255,255,255,0.4)", color: "#fff", fontWeight: 600, fontSize: 17, padding: "16px 38px", borderRadius: 999, transition: "all 250ms ease", display: "inline-block" }}>Задать вопрос</a>
          </div>
        </div>
      </section>
      <style>{`
        .cta-lime:hover { background: #D6F360 !important; transform: scale(1.03); box-shadow: var(--shadow-glow-lime); }
        .cta-ghost:hover { border-color: #fff !important; background: rgba(255,255,255,0.08) !important; }
        @media (max-width: 768px) {
          .cta-h2 { font-size: 36px !important; }
        }
        @media (max-width: 480px) {
          .final-cta-buttons { flex-direction: column; }
          .final-cta-buttons a { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}