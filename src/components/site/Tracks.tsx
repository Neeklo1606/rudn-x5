import { motion, AnimatePresence } from "framer-motion";
import { Fragment, useState } from "react";
import { Languages, Eye, Network, ChevronDown } from "lucide-react";

type TrackKey = "nlp" | "cv" | "trans";

const tracks: { key: TrackKey; name: string; subtitle: string; icon: typeof Languages; color: string; watermark: string; wmColor: string }[] = [
  { key: "nlp", name: "Обработка естественного языка", subtitle: "Токенизация, эмбеддинги, трансформеры, вопросно-ответные системы, диалоговые агенты", icon: Languages, color: "#A79FFF", watermark: "NLP", wmColor: "rgba(167,159,255,0.06)" },
  { key: "cv", name: "Компьютерное зрение", subtitle: "Распознавание образов, детекция объектов, сегментация, генеративные модели изображений", icon: Eye, color: "#B6E835", watermark: "CV", wmColor: "rgba(182,232,53,0.06)" },
  { key: "trans", name: "Транзакционные системы", subtitle: "Рекомендательные системы, real-time bidding, A/B-платформы, потоковая обработка данных", icon: Network, color: "#272727", watermark: "TRANS", wmColor: "rgba(39,39,39,0.05)" },
];

const nlpCode = [
  ["from", " transformers ", "import", " AutoTokenizer, AutoModel"],
  ["import", " torch"],
  [""],
  ["# Загрузка предобученной модели"],
  ["tokenizer = AutoTokenizer.from_pretrained("],
  ['    "bert-base-multilingual-cased"'],
  [")"],
  [""],
  ["# Токенизация текста"],
  ['text = "Искусственный интеллект в ритейле"'],
  ["tokens = tokenizer(text, return_tensors=", '"pt"', ")"],
  [""],
  ["with torch.no_grad():"],
  ["    outputs = model(**tokens)"],
  ["    embeddings = outputs.last_hidden_state"],
];

function CodeLine({ line, idx }: { line: string[]; idx: number }) {
  const text = line.join("");
  const highlight = (t: string) => {
    return t
      .replace(/(#.*)/g, '<span style="color:#6B6B6B">$1</span>')
      .replace(/(".*?")/g, '<span style="color:#B6E835">$1</span>')
      .replace(/\b(from|import|def|return|with|as)\b/g, '<span style="color:#C792EA">$1</span>')
      .replace(/\b(\d+)\b/g, '<span style="color:#F78C6C">$1</span>');
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.25 }}
      style={{ minHeight: 20, color: "#E5E7EB" }}
      dangerouslySetInnerHTML={{ __html: highlight(text) || "&nbsp;" }}
    />
  );
}

function NlpDemo() {
  return (
    <div>
      <div style={{ background: "#111827", borderRadius: 16, padding: 24, fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.7, overflowX: "auto" }}>
        {nlpCode.map((line, i) => <CodeLine key={i} line={line} idx={i} />)}
      </div>
      <p style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.6)" }}>
        Ты научишься tokenization, embeddings, fine-tuning — навыки, нужные X5 Tech для чат-ботов, поиска и аналитики отзывов.
      </p>
    </div>
  );
}

const shelfBoxes = [
  { left: "12%", top: "30%", w: 18, h: 38, label: "Молоко · 96%" },
  { left: "42%", top: "22%", w: 16, h: 46, label: "Хлеб · 93%" },
  { left: "70%", top: "34%", w: 20, h: 36, label: "Сыр · 91%" },
];

function CvDemo() {
  const [active, setActive] = useState<number[]>([]);
  return (
    <div>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>Кликни на товар на полке — AI его обнаружит</p>
      <div style={{ position: "relative", height: 240, borderRadius: 16, overflow: "hidden", background: "linear-gradient(180deg,#2a3142 0%,#1a2035 100%)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "25%", height: 4, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, top: "70%", height: 4, background: "rgba(255,255,255,0.08)" }} />
        {shelfBoxes.map((b, i) => {
          const isActive = active.includes(i);
          return (
            <button
              key={i}
              onClick={() => setActive((a) => a.includes(i) ? a.filter((x) => x !== i) : [...a, i])}
              style={{
                position: "absolute", left: b.left, top: b.top, width: `${b.w}%`, height: `${b.h}%`,
                background: `rgba(${i === 0 ? "139,159,255" : i === 1 ? "232,200,150" : "240,220,180"},0.35)`,
                border: isActive ? "2px dashed #B6E835" : "2px solid transparent",
                borderRadius: 6, cursor: "pointer", padding: 0, transition: "border-color 200ms",
              }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ position: "absolute", top: -26, left: 0, background: "#B6E835", color: "#272727", padding: "3px 8px", fontFamily: "var(--font-mono)", fontSize: 10, borderRadius: 6, whiteSpace: "nowrap", fontWeight: 600 }}
                  >{b.label}</motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
      <p style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.6)" }}>
        В X5 Tech CV-модели контролируют наличие товаров на полках 30 000 магазинов в реальном времени.
      </p>
    </div>
  );
}

function TransDemo() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "center", gap: 14, padding: "20px 8px" }}>
        {["Пользователь", "ML-модель", "Рекомендация"].map((label, i) => (
          <Fragment key={label}>
            <motion.div
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "18px 12px", textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", margin: "0 auto 10px", background: i === 1 ? "#B6E835" : "rgba(167,159,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: i === 1 ? "#272727" : "#A79FFF", fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: 12 }}>
                {i === 0 ? "U" : i === 1 ? "ML" : "★"}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 0.3 }}>{label}</div>
            </motion.div>
            {i < 2 && (
              <div style={{ position: "relative", height: 2, background: "rgba(255,255,255,0.1)" }}>
                <motion.div
                  initial={{ left: "0%" }} animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.4, ease: "linear" }}
                  style={{ position: "absolute", top: -3, width: 8, height: 8, borderRadius: "50%", background: "#B6E835", boxShadow: "0 0 8px #B6E835" }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: 16, background: "rgba(255,255,255,0.04)", borderRadius: 12, fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
        Latency: <span style={{ color: "#B6E835" }}>48ms</span> · Throughput: <span style={{ color: "#B6E835" }}>120k req/s</span> · CTR uplift: <span style={{ color: "#B6E835" }}>+18%</span>
      </div>
      <p style={{ marginTop: 20, fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.6)" }}>
        Ты разберёшься, как работают рекомендательные системы X5: от логов пользователя до персонализированной выдачи за 50 мс.
      </p>
    </div>
  );
}

function Demo({ k }: { k: TrackKey }) {
  if (k === "nlp") return <NlpDemo />;
  if (k === "cv") return <CvDemo />;
  return <TransDemo />;
}

export default function Tracks() {
  const [open, setOpen] = useState<TrackKey | null>(null);
  return (
    <section id="tracks" style={{ background: "#F7F9F0", padding: "96px 0" }} className="section-tracks">
      <div style={{ height: 2, background: "linear-gradient(90deg,#B6E835,#A79FFF)", marginBottom: 120, marginTop: -120 }} />
      <div className="container">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ТРЕКИ</div>
        <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727", maxWidth: 650, marginBottom: 16 }} className="h2-big">Треки второго курса — выбери направление</h2>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: "#6B6B6B", maxWidth: 620, marginBottom: 56 }}>
          На 3 курсе ты выбираешь специализацию. Каждый трек — углублённая практика и реальные проекты.
        </p>

        <div className="tracks-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
          {tracks.map((t) => {
            const Icon = t.icon;
            const isOpen = open === t.key;
            return (
              <motion.div
                key={t.key}
                layout={false}
                onClick={() => setOpen(isOpen ? null : t.key)}
                style={{
                  cursor: "pointer", overflow: "hidden", position: "relative",
                  background: isOpen ? "#1A2035" : "#fff",
                  color: isOpen ? "#fff" : "#272727",
                  borderLeft: `4px solid ${t.color}`,
                  borderRadius: 24,
                  padding: isOpen ? "36px 32px 32px" : "32px 28px",
                  boxShadow: isOpen ? "var(--shadow-dark-card,0 16px 48px rgba(0,0,0,0.25))" : "var(--shadow-card)",
                  gridColumn: isOpen ? "1 / -1" : "auto",
                  transition: "background 350ms ease, color 350ms ease, padding 350ms ease, grid-column 0ms",
                }}
              >
                <span style={{ position: "absolute", top: 8, right: 16, fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 64, color: t.wmColor, pointerEvents: "none", letterSpacing: -2 }}>{t.watermark}</span>
                <Icon size={36} color={isOpen ? "#B6E835" : t.color} strokeWidth={1.7} />
                <h3 style={{ fontWeight: 700, fontSize: 22, marginTop: 18, marginBottom: 8 }}>{t.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: isOpen ? "rgba(255,255,255,0.7)" : "#6B6B6B" }}>{t.subtitle}</p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="demo"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 30 }}
                      style={{ overflow: "hidden" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ paddingTop: 28 }}>
                        <Demo k={t.key} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isOpen && (
                  <div style={{ position: "absolute", right: 18, bottom: 18, color: "#A3A3A3" }}>
                    <ChevronDown size={18} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .tracks-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}