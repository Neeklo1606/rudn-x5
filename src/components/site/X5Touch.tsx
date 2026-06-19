import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LineChart, Sparkles, Code2, ScanSearch } from "lucide-react";

type Key = "ml" | "prod" | "code" | "cv";

const cards: { key: Key; title: string; desc: string; icon: typeof LineChart; bar: string }[] = [
  { key: "ml", title: "ML в ритейле", desc: "Прогнозирование спроса, персонализация, управление цепочками", icon: LineChart, bar: "#B6E835" },
  { key: "prod", title: "AI-продукты", desc: "Разработка AI-сервисов для миллионов покупателей", icon: Sparkles, bar: "#A79FFF" },
  { key: "code", title: "AI-кодинг", desc: "Copilot-инструменты и автоматизация разработки", icon: Code2, bar: "#B6E835" },
  { key: "cv", title: "Computer Vision", desc: "Распознавание товаров и контроль полок", icon: ScanSearch, bar: "#A79FFF" },
];

function ChartDemo() {
  const points = [60, 72, 68, 84, 92, 110, 105, 124];
  const max = 140;
  const w = 100, h = 100;
  const path = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - (p / max) * h}`).join(" L ");
  const months = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг"];
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Прогноз спроса · Молочные продукты</div>
      <div style={{ position: "relative", height: 180, background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16 }}>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#B6E835" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#B6E835" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={`M ${path} L ${w},${h} L 0,${h} Z`}
            fill="url(#grad)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
          />
          <motion.path
            d={`M ${path}`} fill="none" stroke="#B6E835" strokeWidth="0.8" vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {points.map((p, i) => (
            <motion.circle key={i} cx={(i / (points.length - 1)) * w} cy={h - (p / max) * h} r="1.2" fill="#B6E835"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.08 }} />
          ))}
        </svg>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
        {months.map((m) => <span key={m}>{m}</span>)}
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        {[["Точность", "94%"], ["MAPE", "6.2%"], ["Факторов", "30"]].map(([l, v]) => (
          <div key={l} style={{ flex: 1, minWidth: 90, background: "rgba(182,232,53,0.08)", padding: "10px 14px", borderRadius: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#B6E835" }}>{v}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const quizOpts = [
  { t: "Персонализированные скидки на основе истории покупок", correct: true, color: "#B6E835", expl: "Верно! X5 уже внедряет персонализацию на основе ML — это увеличивает средний чек на 12%." },
  { t: "Генерация музыки для плейлиста в магазине", correct: false, color: "#A79FFF", expl: "Интересно, но не приоритет. X5 фокусируется на персонализации покупок." },
  { t: "Распознавание лиц покупателей для рекламы", correct: false, color: "#FF6B6B", expl: "Этически спорно. X5 не использует биометрию для рекламы." },
];

function QuizDemo() {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Какое AI-решение ты бы предложил для X5?</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {quizOpts.map((o, i) => {
          const isPicked = picked === i;
          return (
            <motion.button
              key={i} whileTap={{ scale: 0.98 }}
              onClick={() => setPicked(i)}
              style={{
                textAlign: "left", padding: "14px 16px", borderRadius: 12,
                background: isPicked ? `${o.color}22` : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${isPicked ? o.color : "rgba(255,255,255,0.1)"}`,
                color: "#fff", fontSize: 14, fontFamily: "var(--font-body)", cursor: "pointer",
              }}
            >{o.t}</motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ marginTop: 16, padding: 14, borderRadius: 12, background: `${quizOpts[picked].color}15`, fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
            {quizOpts[picked].expl}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const codeLines = [
  { t: "interface ProductRecommendation {", tip: "Контракт ответа модели" },
  { t: "  sku: string; confidence: number;", tip: "Поля рекомендации" },
  { t: "}", tip: "" },
  { t: "", tip: "" },
  { t: "async function getRecommendations(userId) {", tip: "Точка входа API" },
  { t: "  const model = await loadModel('x5-recs-v3');", tip: "Загрузка ML-модели" },
  { t: "  const features = extractFeatures(userId);", tip: "Извлечение признаков" },
  { t: "  return model.predict(features);", tip: "Предсказание рекомендаций" },
  { t: "}", tip: "" },
];

function CodeDemo() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>// AI Copilot: генерация API-эндпоинта</div>
      <div style={{ background: "#111827", borderRadius: 12, padding: 16, fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7 }}>
        {codeLines.map((l, i) => (
          <div key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
            style={{ position: "relative", padding: "2px 8px", borderRadius: 4, background: hover === i && l.tip ? "rgba(182,232,53,0.12)" : "transparent", color: "#E5E7EB", cursor: l.tip ? "pointer" : "default", minHeight: 18 }}>
            {l.t || "\u00a0"}
            {hover === i && l.tip && (
              <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                style={{ position: "absolute", right: 8, top: 2, fontSize: 10, color: "#B6E835", fontFamily: "var(--font-mono)" }}>← {l.tip}</motion.span>
            )}
          </div>
        ))}
      </div>
      <p style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Наведи на строку — копилот объяснит её. В X5 Tech такие инструменты ускоряют разработку в 2×.</p>
    </div>
  );
}

function ShelfDemo() {
  const [tick, setTick] = useState(0);
  const items = [
    { left: "8%", w: 18, label: "Молоко · 97%" },
    { left: "30%", w: 14, label: "Хлеб · 95%" },
    { left: "50%", w: 18, label: "Сыр · 92%" },
    { left: "74%", w: 20, label: "Йогурт · 89%" },
  ];
  return (
    <div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>Кликни на полку — AI обнаружит товары</p>
      <div onClick={() => setTick((t) => t + 1)} style={{ position: "relative", height: 200, background: "linear-gradient(180deg,#2a3142,#1a2035)", borderRadius: 12, overflow: "hidden", cursor: "pointer", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 30, height: 4, background: "rgba(255,255,255,0.1)" }} />
        {items.map((it, i) => (
          <div key={i} style={{ position: "absolute", left: it.left, bottom: 34, width: `${it.w}%`, height: 80, background: `rgba(${180 + i * 15},${180 + i * 10},${220 - i * 20},0.4)`, borderRadius: 4 }} />
        ))}
        <AnimatePresence mode="wait">
          <motion.div key={tick} style={{ position: "absolute", inset: 0 }}>
            {items.map((it, i) => (
              <motion.div key={`${tick}-${i}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.12 }}
                style={{ position: "absolute", left: it.left, bottom: 34, width: `${it.w}%`, height: 80, border: "2px dashed #B6E835", borderRadius: 4 }}>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.12 + 0.2 }}
                  style={{ position: "absolute", top: -22, left: 0, background: "#B6E835", color: "#272727", padding: "2px 8px", fontSize: 10, fontFamily: "var(--font-mono)", borderRadius: 4, fontWeight: 600, whiteSpace: "nowrap" }}>{it.label}</motion.span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <p style={{ marginTop: 14, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>CV-модели X5 проверяют наличие товаров на полках в реальном времени.</p>
    </div>
  );
}

function Demo({ k }: { k: Key }) {
  if (k === "ml") return <ChartDemo />;
  if (k === "prod") return <QuizDemo />;
  if (k === "code") return <CodeDemo />;
  return <ShelfDemo />;
}

export default function X5Touch() {
  const [open, setOpen] = useState<Key | null>(null);
  return (
    <section id="x5touch" style={{ background: "#F1F1F1", padding: "120px 0" }}>
      <svg style={{ display: "block", width: "100%", height: 24, marginTop: -120, marginBottom: 96 }} viewBox="0 0 1200 24" preserveAspectRatio="none">
        <path d="M0,12 Q300,0 600,12 T1200,12 L1200,0 L0,0 Z" fill="#1A2035" />
      </svg>
      <div className="container">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>X5 TOUCH</div>
        <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727", marginBottom: 16 }} className="h2-big">Прикоснись к технологиям X5</h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#6B6B6B", maxWidth: 640, marginBottom: 56 }}>
          Четыре направления AI в X5 Tech. Кликни на карточку — увидишь, как это работает изнутри.
        </p>

        <div className="x5touch-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {cards.map((c) => {
            const Icon = c.icon;
            const isOpen = open === c.key;
            return (
              <motion.div
                key={c.key}
                onClick={() => setOpen(isOpen ? null : c.key)}
                style={{
                  cursor: "pointer", overflow: "hidden", position: "relative",
                  background: isOpen ? "#1A2035" : "#fff",
                  color: isOpen ? "#fff" : "#272727",
                  borderRadius: 24, padding: isOpen ? 36 : 30,
                  boxShadow: isOpen ? "0 16px 48px rgba(0,0,0,0.2)" : "var(--shadow-card)",
                  gridColumn: isOpen ? "1 / -1" : "auto",
                  transition: "background 350ms, color 350ms, padding 350ms",
                }}
              >
                <div style={{ position: "absolute", right: 0, top: 24, bottom: 24, width: 4, background: c.bar, borderRadius: "4px 0 0 4px" }} />
                <Icon size={32} color={isOpen ? "#B6E835" : c.bar} strokeWidth={1.7} />
                <h3 style={{ fontWeight: 600, fontSize: 20, marginTop: 14, marginBottom: 6 }}>{c.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: isOpen ? "rgba(255,255,255,0.65)" : "#6B6B6B" }}>{c.desc}</p>
                {!isOpen && <div style={{ position: "absolute", bottom: 14, right: 18, fontFamily: "var(--font-mono)", fontSize: 10, color: "#A3A3A3" }}>Нажми, чтобы узнать →</div>}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", stiffness: 250, damping: 32 }}
                      style={{ overflow: "hidden" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ paddingTop: 24 }}>
                        <Demo k={c.key} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .x5touch-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}