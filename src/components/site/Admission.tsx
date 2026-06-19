const examRows: [string, number, number][] = [
  ["Математика (профиль)", 65, 45],
  ["Русский язык", 65, 42],
  ["Информатика", 65, 46],
  ["Физика", 65, 41],
];

const timeline: [string, string, string][] = [
  ["До 25 июля", "Проверь свои баллы ЕГЭ", "Убедись, что баллы по профильным предметам соответствуют минимальным"],
  ["20 июня – 25 июля", "Подай документы", "Через Госуслуги или лично в приёмной комиссии РУДН"],
  ["До 3 августа", "Следи за конкурсными списками", "Обновляются ежедневно на сайте РУДН"],
  ["3 августа", "Подай согласие на зачисление", "Оригинал аттестата + согласие на специальность"],
  ["9 августа", "Ты студент РУДН!", "Приказ о зачислении. Добро пожаловать в программу!"],
];

export default function Admission() {
  return (
    <section id="admission" style={{ background: "#fff" }} className="section">
      <div className="container">
        <div style={{ width: 200, height: 1, margin: "0 auto 64px", background: "linear-gradient(90deg, transparent, #E0E0E0, transparent)", position: "relative" }}>
          <span style={{ position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: "#B6E835" }} />
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ПОСТУПЛЕНИЕ</div>
        <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727", marginBottom: 40 }} className="h2-big">Как поступить</h2>

        <div className="admission-layout" style={{ display: "flex", gap: 64 }}>
          <div style={{ flex: "0 0 calc(55% - 32px)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "#F7F9F0", padding: "24px 32px", borderRadius: 20, marginBottom: 40 }}>
              <div style={{ fontWeight: 700, fontSize: 36, color: "#B6E835", lineHeight: 1 }}>500 000 ₽</div>
              <div style={{ fontSize: 16, color: "#6B6B6B" }}>стоимость в год</div>
            </div>
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
                ["4 года", "очное обучение"],
              ].map(([n, l]) => (
                <div key={l} className="stat-card" style={{ flex: "1 1 120px", background: "#fff", padding: 20, borderRadius: 16, textAlign: "center", boxShadow: "var(--shadow-card)" }}>
                  <div className="stat-number" style={{ fontWeight: 700, fontSize: 32, color: "#B6E835", lineHeight: 1.1 }}>{n}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#A3A3A3", letterSpacing: 0.5, marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: "0 0 calc(45% - 32px)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", marginBottom: 24 }}>ЭТАПЫ</div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 2, background: "#E0E0E0" }} />
              <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 2, background: "#B6E835" }} />
              {timeline.map(([d, t, det], i) => (
                <div key={d} className="timeline-step" style={{ display: "flex", alignItems: "flex-start", gap: 20, paddingBottom: 32, position: "relative" }}>
                  <span
                    style={{ width: 18, height: 18, borderRadius: "50%", background: "#B6E835", border: "2px solid #B6E835", flexShrink: 0, marginTop: 2, zIndex: 1, display: "block" }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3", marginBottom: 4 }}>{d}</div>
                    <div style={{ fontWeight: 500, fontSize: 16, color: "#272727" }}>{t}</div>
                    {det && <div style={{ fontSize: 13, color: "#6B6B6B", marginTop: 4, lineHeight: 1.5 }}>{det}</div>}
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