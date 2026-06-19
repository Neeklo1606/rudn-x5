const cols = [
  {
    title: "Навигация",
    items: ["Программа", "Преподаватели", "Поступление", "Новости"],
  },
  {
    title: "Партнёры",
    items: ["X5 Tech", "Минцифры", "Аналитический центр"],
  },
  {
    title: "Контакты",
    items: ["ai@rudn.ru", "+7 495 434-53-00", "Москва, ул. Миклухо-Маклая, 6"],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1A1F2E", color: "rgba(255,255,255,0.6)", padding: "80px 0 32px" }}>
      <div className="container">
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48 }}>
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ height: 28, padding: "0 10px", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", fontWeight: 700, fontSize: 12, borderRadius: 4 }}>РУДН</div>
              <div style={{ height: 28, padding: "0 10px", background: "rgba(255,255,255,0.08)", color: "#fff", display: "flex", alignItems: "center", fontWeight: 700, fontSize: 12, borderRadius: 4 }}>X5 TECH</div>
            </div>
            <p style={{ marginTop: 16, fontSize: 14, color: "rgba(255,255,255,0.45)", maxWidth: 200, lineHeight: 1.5 }}>
              Программа бакалавриата по искусственному интеллекту
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1, color: "rgba(182,232,53,0.7)", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
                {c.title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="ft-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", transition: "color 200ms" }}>{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 64, paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>© 2026 РУДН</span>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#" className="ft-link" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Политика конфиденциальности</a>
            <a href="#" className="ft-link" style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Обработка ПД</a>
          </div>
        </div>
      </div>
      <style>{`
        .ft-link:hover { color: rgba(255,255,255,0.9) !important; }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}