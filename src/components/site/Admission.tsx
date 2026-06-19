const examRows: [string, number, number][] = [
  ["Математика (профиль)", 65, 45],
  ["Русский язык", 65, 42],
  ["Информатика", 65, 46],
  ["Физика", 65, 41],
];

const timeline: [string, string][] = [
  ["До 25 июля", "Проверь свои баллы ЕГЭ"],
  ["20 июня – 25 июля", "Подай документы через Госуслуги или лично"],
  ["До 3 августа", "Следи за конкурсными списками на сайте РУДН"],
  ["3 августа", "Подай согласие на зачисление"],
  ["9 августа", "Ты студент РУДН!"],
];

export default function Admission() {
  return (
    <section id="admission" style={{ background: "#fff" }} className="section">
      <div className="container">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ПОСТУПЛЕНИЕ</div>
        <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727", marginBottom: 48 }} className="h2-big">Как поступить</h2>

        <div className="admission-layout" style={{ display: "flex", gap: 64 }}>
          <div style={{ flex: "0 0 calc(55% - 32px)" }}>
            <div className="exam-table">
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 0 14px", borderBottom: "2px solid #E0E0E0", fontFamily: "var(--font-mono)", fontSize: 11, color: "#A3A3A3", letterSpacing: 0.5, textTransform: "uppercase" }}>
                <span style={{ flex: 1 }}>Предмет</span>
                <span style={{ width: 110, textAlign: "right" }}>Бюджет</span>
                <span style={{ width: 110, textAlign: "right" }}>Контракт</span>
              </div>
              {examRows.map(([s, b, c]) => (
                <div key={s} className="exam-row" style={{ display: "flex", justifyContent: "space-between", padding: "18px 0", borderBottom: "1px solid #EBEBEB", transition: "background 200ms" }}>
                  <span style={{ flex: 1, fontWeight: 500, fontSize: 16, color: "#272727" }}>{s}</span>
                  <span style={{ width: 110, textAlign: "right", fontWeight: 700, fontSize: 18, color: "#B6E835" }}>{b}</span>
                  <span style={{ width: 110, textAlign: "right", fontWeight: 700, fontSize: 18, color: "#272727" }}>{c}</span>
                </div>
              ))}
            </div>

            <div className="params-block" style={{ display: "flex", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
              {[
                ["25", "бюджетных мест"],
                ["80", "по договору"],
                ["500 000 ₽", "стоимость в год"],
                ["4 года", "очное обучение"],
              ].map(([n, l]) => (
                <div key={l} className="stat-card" style={{ flex: "1 1 120px", background: "#fff", padding: 20, borderRadius: 16, textAlign: "center", boxShadow: "var(--shadow-card)" }}>
                  <div className="stat-number" style={{ fontWeight: 700, fontSize: 26, color: "#B6E835", lineHeight: 1.1 }}>{n}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#A3A3A3", letterSpacing: 0.5, marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "0 0 calc(45% - 32px)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", marginBottom: 24 }}>ЭТАПЫ</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 2, background: "#E0E0E0" }} />
              {timeline.map(([d, t], i) => (
                <div key={d} className="timeline-step" style={{ display: "flex", alignItems: "flex-start", gap: 20, paddingBottom: 32, position: "relative" }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: i === timeline.length - 1 ? "#B6E835" : "#fff", border: i === timeline.length - 1 ? "none" : "2px solid #E0E0E0", flexShrink: 0, marginTop: 2, zIndex: 1 }} />
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3", marginBottom: 4 }}>{d}</div>
                    <div style={{ fontWeight: 500, fontSize: 16, color: "#272727" }}>{t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .exam-row:hover { background: rgba(182,232,53,0.04); }
        @media (max-width: 1024px) {
          .admission-layout { flex-direction: column !important; gap: 48px !important; }
          .admission-layout > div { flex: 1 1 100% !important; }
        }
      `}</style>
    </section>
  );
}