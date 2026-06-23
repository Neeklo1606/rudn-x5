import { useEffect, useRef, useState } from "react";

type PillData = { label: string; accent?: boolean };

const year1Pills: PillData[] = [
  { label: "Математический анализ" },
  { label: "Линейная алгебра" },
  { label: "Python и алгоритмы" },
  { label: "Теория вероятностей" },
  { label: "Введение в ML", accent: true },
  { label: "Дискретная математика" },
];

const year3Pills: PillData[] = [
  { label: "Глубинное обучение" },
  { label: "MLOps" },
  { label: "Big Data" },
  { label: "Reinforcement Learning" },
  { label: "Computer Vision Advanced" },
  { label: "NLP Advanced" },
];

const tracks = [
  {
    accent: "#A79FFF",
    icon: "💬",
    title: "Обработка естественного языка",
    desc: "ChatGPT, переводчики, голосовые ассистенты. Научитесь строить языковые модели.",
    expand: (
      <pre style={{ background: "#1A2035", color: "#B6E835", padding: 16, borderRadius: 12, fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6, overflowX: "auto", margin: 0 }}>
{`from transformers import AutoModel
model = AutoModel.from_pretrained(
  "bert-base-multilingual-cased"
)
embeddings = model(**tokens)`}
      </pre>
    ),
  },
  {
    accent: "#B6E835",
    icon: "👁️",
    title: "Компьютерное зрение",
    desc: "Распознавание объектов, генерация изображений. CV в ритейле с X5.",
    expand: (
      <div style={{ position: "relative", height: 140, borderRadius: 12, background: "linear-gradient(180deg,#2a3142,#1a2035)", overflow: "hidden" }}>
        {[
          { l: "10%", t: "25%", w: 22, h: 55, label: "Молоко 96%" },
          { l: "42%", t: "20%", w: 18, h: 62, label: "Хлеб 93%" },
          { l: "70%", t: "28%", w: 22, h: 52, label: "Сыр 91%" },
        ].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: b.l, top: b.t, width: `${b.w}%`, height: `${b.h}%`, border: "2px dashed #B6E835", borderRadius: 6 }}>
            <span style={{ position: "absolute", top: -20, left: 0, background: "#B6E835", color: "#272727", padding: "2px 6px", fontFamily: "var(--font-mono)", fontSize: 10, borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap" }}>{b.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    accent: "#00BFA5",
    icon: "🔄",
    title: "Рекомендательные системы",
    desc: "Персонализация, A/B тесты, прогнозирование спроса.",
    expand: (
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0" }}>
        {["User", "ML", "★"].map((l, i, arr) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
            <div style={{ flex: 1, padding: "12px 8px", background: "#F7F9F0", border: "1px solid #E0E0E0", borderRadius: 10, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "#272727" }}>{l}</div>
            {i < arr.length - 1 && <span style={{ color: "#00BFA5", fontSize: 18 }}>→</span>}
          </div>
        ))}
      </div>
    ),
  },
];

function Pill({ p }: { p: PillData }) {
  return (
    <span
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
        padding: "8px 16px",
        background: p.accent ? "rgba(182,232,53,0.05)" : "#FFFFFF",
        border: `1px solid ${p.accent ? "#B6E835" : "#E0E0E0"}`,
        borderRadius: 20,
        fontSize: 14,
        color: "#272727",
      }}
    >
      {p.label}
    </span>
  );
}

function YearBlock({
  index,
  active,
  isLast,
  refCb,
  children,
}: {
  index: number;
  active: boolean;
  isLast: boolean;
  refCb: (el: HTMLDivElement | null) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={refCb}
      data-year-index={index}
      className="year-row"
      style={{
        display: "grid",
        gridTemplateColumns: "var(--rail) 1fr",
        columnGap: 0,
        marginBottom: "var(--year-mb)",
        minHeight: "var(--year-min-h)",
        paddingBottom: isLast ? 0 : 40,
        borderBottom: isLast ? "none" : "1px solid rgba(224,224,224,0.5)",
      }}
    >
      {/* Timeline rail column */}
      <div
        aria-hidden
        style={{
          position: "relative",
          display: "grid",
          justifyItems: "center",
        }}
      >
        {/* line */}
        <div
          style={{
            width: 2,
            height: "100%",
            background: active ? "#B6E835" : "#E0E0E0",
            transition: "background 0.5s ease",
          }}
        />
        {/* dot, centered via grid */}
        <div
          style={{
            gridRow: 1,
            gridColumn: 1,
            alignSelf: "start",
            marginTop: 8,
            width: 16,
            height: 16,
            borderRadius: 8,
            background: active ? "#B6E835" : "transparent",
            border: `2px solid ${active ? "#B6E835" : "#E0E0E0"}`,
            boxShadow: active ? "0 0 12px rgba(182,232,53,0.3)" : "none",
            transition: "all 0.5s ease",
          }}
        />
      </div>

      {/* Content column */}
      <div
        style={{
          minWidth: 0,
          maxWidth: 900,
          opacity: active ? 1 : 0.15,
          transform: active ? "translateY(0)" : "translateY(20px)",
          pointerEvents: active ? "auto" : "none",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Curriculum() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false, false]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setRevealed((prev) => {
                if (prev[i]) return prev;
                const next = [...prev];
                next[i] = true;
                return next;
              });
              obs.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // "Only one active at a time" → the latest revealed block is the active one.
  const active = revealed.lastIndexOf(true);

  const setRef = (i: number) => (el: HTMLDivElement | null) => { refs.current[i] = el; };

  return (
    <section id="program" style={{ background: "#F1F1F1", padding: "100px 40px" }} className="curriculum-section">
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 44, color: "#272727", marginBottom: 16 }} className="curriculum-h2">Программа обучения</h2>
        <p style={{ fontSize: 18, color: "rgba(39,39,39,0.6)" }}>4 года, которые превратят вас в AI-инженера</p>
      </div>

      <div
        className="curriculum-wrap"
        style={{ position: "relative", maxWidth: 1200, margin: "0 auto", overflowX: "hidden" }}
      >
        <YearBlock index={0} active={active === 0} isLast={false} refCb={setRef(0)}>
          <h3 style={{ fontSize: 28, fontWeight: 700, color: "#272727", marginBottom: 8 }} className="year-h3">1 курс: Фундамент</h3>
          <p style={{ fontSize: 16, color: "rgba(39,39,39,0.6)", marginBottom: 24 }}>Математика, программирование, основы AI</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {year1Pills.map((p) => <Pill key={p.label} p={p} />)}
          </div>
        </YearBlock>

        <YearBlock index={1} active={active === 1} isLast={false} refCb={setRef(1)}>
          <h3 style={{ fontSize: 28, fontWeight: 700, color: "#272727", marginBottom: 8 }} className="year-h3">2 курс: Треки</h3>
          <p style={{ fontSize: 16, color: "rgba(39,39,39,0.6)", marginBottom: 24 }}>Выберите своё направление</p>
          <div className="track-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {tracks.map((t, i) => {
              const open = expanded === i;
              return (
                <div key={t.title}
                  onClick={() => setExpanded(open ? null : i)}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 16,
                    padding: 28,
                    borderTop: `3px solid ${t.accent}`,
                    cursor: "pointer",
                    boxShadow: "0 2px 24px rgba(0,0,0,0.04)",
                    minHeight: 44,
                  }}>
                  <div style={{ fontSize: 32, lineHeight: 1, marginBottom: 12 }}>{t.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#272727", marginBottom: 8 }}>{t.title}</div>
                  <div style={{ fontSize: 14, color: "rgba(39,39,39,0.6)", lineHeight: 1.6 }}>{t.desc}</div>
                  {open && <div style={{ marginTop: 20 }}>{t.expand}</div>}
                </div>
              );
            })}
          </div>
        </YearBlock>

        <YearBlock index={2} active={active === 2} isLast={false} refCb={setRef(2)}>
          <h3 style={{ fontSize: 28, fontWeight: 700, color: "#272727", marginBottom: 8 }} className="year-h3">3 курс: Специализация</h3>
          <p style={{ fontSize: 16, color: "rgba(39,39,39,0.6)", marginBottom: 24 }}>Углублённое изучение выбранного трека + реальные проекты X5</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {year3Pills.map((p) => <Pill key={p.label} p={p} />)}
          </div>
          <div style={{
            background: "rgba(182,232,53,0.05)",
            border: "1px solid rgba(182,232,53,0.2)",
            borderRadius: 12,
            padding: 20,
          }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#272727", marginBottom: 4 }}>Проектная работа с реальными данными X5 Tech</div>
            <div style={{ fontSize: 14, color: "rgba(39,39,39,0.5)" }}>Командные проекты, защита перед инженерами X5</div>
          </div>
        </YearBlock>

        <YearBlock index={3} active={active === 3} isLast refCb={setRef(3)}>
          <h3 style={{ fontSize: 28, fontWeight: 700, color: "#272727", marginBottom: 8 }} className="year-h3">4 курс: Практика</h3>
          <p style={{ fontSize: 16, color: "rgba(39,39,39,0.6)", marginBottom: 24 }}>Диплом + стажировка в X5 Tech</p>
          <div className="year4-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }}>
            <div>
              {[
                "Сентябрь–Декабрь: Преддипломная практика в X5",
                "Январь–Май: Дипломный проект",
                "Июнь: Защита диплома",
                "Июль: Оффер в X5 Tech",
              ].map((line) => (
                <div key={line} style={{
                  fontSize: 14,
                  color: "#272727",
                  paddingLeft: 20,
                  borderLeft: "2px solid #B6E835",
                  marginBottom: 16,
                  lineHeight: 1.5,
                }}>{line}</div>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, fontWeight: 800, color: "#B6E835", lineHeight: 1 }}>80%</div>
              <div style={{ fontSize: 16, color: "#272727", marginTop: 12 }}>выпускников получают оффер в X5 Tech</div>
            </div>
          </div>
        </YearBlock>
      </div>

      <style>{`
        .curriculum-section {
          --rail: 120px;
          --year-mb: 120px;
          --year-min-h: 400px;
          overflow-x: hidden;
        }
        @media (max-width: 1023px) {
          .curriculum-section {
            --rail: 72px;
            padding: 80px 24px !important;
          }
          .track-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .curriculum-section {
            --rail: 48px;
            --year-mb: 80px;
            --year-min-h: 300px;
            padding: 60px 20px !important;
          }
          .curriculum-h2 { font-size: 32px !important; }
          .year-h3 { font-size: 24px !important; }
          .track-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .year4-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}