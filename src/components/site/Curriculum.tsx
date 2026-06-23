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
        paddingBottom: isLast ? 0 : "var(--year-pb)",
        borderBottom: isLast ? "none" : "1px solid rgba(224,224,224,0.5)",
      }}
    >
      {/* Rail column reserved — actual line/dot drawn at section level */}
      <div aria-hidden style={{ position: "relative" }}>
        <div
          data-year-dot
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 16,
            height: 16,
            borderRadius: 8,
            background: active ? "#B6E835" : "#FFFFFF",
            border: `2px solid ${active ? "#B6E835" : "#E0E0E0"}`,
            boxShadow: active ? "0 0 12px rgba(182,232,53,0.35)" : "none",
            zIndex: 2,
          }}
        />
      </div>

      {/* Content column */}
      <div
        style={{
          minWidth: 0,
          maxWidth: 900,
          opacity: active ? 1 : 0.74,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Curriculum() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const targetY = window.innerHeight / 2;

      const wr = wrap.getBoundingClientRect();

      // Rail fill is normalized between the first and last dot, so it is a
      // pure function of geometry + scroll position and reverses perfectly.
      const dotCenters = refs.current
        .filter((el): el is HTMLDivElement => Boolean(el))
        .map((el) => {
          const dot = el.querySelector("[data-year-dot]") as HTMLElement | null;
          const r = dot?.getBoundingClientRect();
          return r ? r.top + r.height / 2 : el.getBoundingClientRect().top;
        });
      const firstDot = dotCenters[0] ?? wr.top;
      const lastDot = dotCenters[dotCenters.length - 1] ?? wr.bottom;
      const railLength = Math.max(lastDot - firstDot, 1);
      const progress = Math.min(Math.max((targetY - firstDot) / railLength, 0), 1);
      if (railRef.current) {
        railRef.current.style.top = `${firstDot - wr.top}px`;
        railRef.current.style.height = `${railLength}px`;
      }
      if (fillRef.current) {
        fillRef.current.style.height = `${progress * 100}%`;
      }

      // Active = block whose center is closest to the viewport target zone.
      let bestIdx = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - targetY);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      setActive((prev) => (prev === bestIdx ? prev : bestIdx));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [expanded]);

  const setRef = (i: number) => (el: HTMLDivElement | null) => { refs.current[i] = el; };

  return (
    <section id="program" style={{ background: "#F1F1F1", padding: "76px 40px" }} className="curriculum-section">
      <div style={{ textAlign: "center", marginBottom: 46 }}>
        <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 44, color: "#272727", marginBottom: 16 }} className="curriculum-h2">Программа обучения</h2>
        <p style={{ fontSize: 18, color: "rgba(39,39,39,0.6)" }}>4 года, которые превратят вас в AI-инженера</p>
      </div>

      <div
        ref={wrapRef}
        className="curriculum-wrap"
        style={{ position: "relative", maxWidth: 1200, margin: "0 auto", overflowX: "hidden" }}
      >
        {/* Continuous rail: grey base + lime progress fill */}
        <div
          ref={railRef}
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            left: "calc(var(--rail) / 2 - 1px)",
            width: 2,
            background: "#E0E0E0",
            borderRadius: 1,
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <div
            ref={fillRef}
            style={{
              width: "100%",
              height: "0%",
              background: "linear-gradient(180deg, #B6E835 0%, #D6F360 100%)",
              boxShadow: "0 0 12px rgba(182,232,53,0.4)",
              borderRadius: 1,
              willChange: "height",
            }}
          />
        </div>

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
          --rail: 100px;
          --year-mb: 46px;
          --year-pb: 30px;
          overflow-x: hidden;
        }
        @media (max-width: 1023px) {
          .curriculum-section {
            --rail: 64px;
            --year-mb: 36px;
            --year-pb: 26px;
            padding: 64px 24px !important;
          }
          .track-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .curriculum-section {
            --rail: 48px;
            --year-mb: 30px;
            --year-pb: 22px;
            padding: 48px 20px !important;
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