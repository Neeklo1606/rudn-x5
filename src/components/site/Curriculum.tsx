import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, MessageSquare } from "lucide-react";

const tabs = [
  { title: "1 курс", subtitle: "Фундамент", items: [["Математический анализ","1–2 сем"],["Линейная алгебра","1–2 сем"],["Дискретная математика","1 сем"],["Программирование на Python","1–2 сем"],["Алгоритмы и структуры данных","2 сем"],["Архитектура компьютеров","1 сем"],["Английский язык","1–4 сем"],["Введение в ИИ","2 сем"]] },
  { title: "2 курс", subtitle: "Данные и инструменты", items: [["Теория вероятностей","3–4 сем"],["Математическая статистика","4 сем"],["Базы данных","3 сем"],["Python для анализа данных","3–4 сем"],["Численные методы","4 сем"],["Операционные системы","3 сем"],["Машинное обучение I","4 сем"],["Этика ИИ","3 сем"]] },
  { title: "3 курс", subtitle: "Машинное обучение", items: [["Машинное обучение II","5–6 сем"],["Глубинное обучение","5–6 сем"],["Обработка естественного языка","5 сем"],["Большие данные","6 сем"],["Компьютерное зрение","5–6 сем"],["MLOps","6 сем"],["Проектный практикум","5–6 сем"]] },
  { title: "4 курс", subtitle: "Нейросети и продукт", items: [["Трансформеры и LLM","7 сем"],["Reinforcement Learning","7 сем"],["AI-продукты","7–8 сем"],["AI-инфраструктура","7 сем"],["Дипломное проектирование","8 сем"],["Промышленная стажировка в X5 Tech","8 сем"],["Генеративные модели","7 сем"]] },
];

export default function Curriculum() {
  const [tab, setTab] = useState(0);
  return (
    <section id="program" style={{ background: "#fff" }} className="section">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 100, height: 1, background: "linear-gradient(90deg, transparent, #E0E0E0)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B6E835" }} />
          <div style={{ width: 100, height: 1, background: "linear-gradient(90deg, #E0E0E0, transparent)" }} />
        </div>
      </div>
      <div className="container">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ПРОГРАММА</div>
        <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727", maxWidth: 600, marginBottom: 16 }} className="h2-big">Что ты узнаешь и чему научишься</h2>
        <p style={{ fontSize: 18, color: "#6B6B6B", marginBottom: 56 }}>Курс построен вокруг навыков, которые нужны в индустрии прямо сейчас.</p>

        <div className="tab-row" style={{ display: "flex", borderBottom: "1px solid #E0E0E0", position: "relative", flexWrap: "wrap" }}>
          {tabs.map((t, i) => (
            <button key={t.title} onClick={() => setTab(i)} style={{ padding: "14px 28px", background: "transparent", border: "none", cursor: "pointer", fontSize: 16, fontWeight: 500, color: tab === i ? "#272727" : "#A3A3A3", position: "relative", transition: "color 200ms" }}>{t.title}</button>
          ))}
          <motion.div animate={{ x: tab * 100 + "%" }} transition={{ duration: 0.35, ease: [0.22,1,0.36,1] as const }}
            style={{ position: "absolute", bottom: -1, left: 0, height: 3, background: "#B6E835", width: `${100 / tabs.length}%` }} />
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#6B6B6B", marginTop: 16 }}>{tabs[tab].subtitle}</div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
            style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 16, rowGap: 12 }} className="discipline-grid">
            {tabs[tab].items.map(([name, sem]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, paddingBlock: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#B6E835", flexShrink: 0 }} />
                <span style={{ fontSize: 16, color: "#272727" }}>{name}</span>
                <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "#A3A3A3" }}>{sem}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div style={{ marginTop: 64 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", marginBottom: 24 }}>ТРЕКИ</div>
          <div className="track-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              { Icon: Eye, title: "Компьютерное зрение", desc: "Распознавание образов, детекция объектов, сегментация изображений, autonomous driving perception, генеративные модели изображений" },
              { Icon: MessageSquare, title: "Обработка естественного языка", desc: "Токенизация, эмбеддинги, трансформеры, вопросно-ответные системы, summarization, диалоговые агенты" },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="track-card" style={{ background: "#fff", borderRadius: 20, padding: 32, borderLeft: "4px solid #B6E835", boxShadow: "var(--shadow-card)", transition: "all 300ms ease" }}>
                <Icon size={24} color="#B6E835" />
                <div style={{ fontWeight: 600, fontSize: 20, marginTop: 12, marginBottom: 8, color: "#272727" }}>{title}</div>
                <div style={{ fontSize: 15, color: "#6B6B6B", lineHeight: 1.55 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .track-card:hover { border-left-width: 6px !important; box-shadow: var(--shadow-card-hover); transform: translateX(4px); }
        @media (max-width: 768px) {
          .h2-big { font-size: 32px !important; }
          .discipline-grid { grid-template-columns: 1fr !important; }
          .track-cards { grid-template-columns: 1fr !important; }
          .tab-row button { padding: 12px 16px !important; font-size: 14px !important; }
        }
      `}</style>
    </section>
  );
}