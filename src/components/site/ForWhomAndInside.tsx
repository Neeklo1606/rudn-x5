import { motion } from "framer-motion";
import { Calculator, Briefcase, Zap, Users, Layers, Building2, MonitorSmartphone, Server, FolderKanban, Network } from "lucide-react";

const forWhom = [
  { Icon: Calculator, title: "Сильная математика", desc: "Уверенно владеешь алгеброй и математическим анализом" },
  { Icon: Briefcase, title: "Карьера в IT", desc: "Хочешь строить карьеру в технологической компании" },
  { Icon: Zap, title: "Высокий темп", desc: "Готов учиться быстро и много работать" },
  { Icon: Users, title: "Сильная среда", desc: "Ищешь окружение амбициозных людей" },
];

const features = [
  { Icon: Layers, title: "2 специальности в одной программе", desc: "Computer Vision и NLP — выбери трек на 3 курсе и углубись в практику" },
  { Icon: Building2, title: "Уникальный индустриальный партнёр", desc: "X5 Tech — технологическое ядро X5 Group, строит крупнейшую AI-компанию в ритейле" },
  { Icon: MonitorSmartphone, title: "Современный кампус", desc: "Комфортная среда в логике технологичного пространства с оборудованными лабораториями" },
  { Icon: Server, title: "Топовая техническая инфраструктура", desc: "Доступ к вычислительным кластерам, GPU-серверам и облачным платформам" },
  { Icon: FolderKanban, title: "Проектный формат обучения", desc: "С первого курса работаешь над реальными задачами, а не абстрактными упражнениями" },
  { Icon: Network, title: "Профессиональный нетворкинг", desc: "Прямой контакт с ML-инженерами X5 Tech, стажировки и карьерные треки" },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
const cont = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

export default function ForWhomAndInside() {
  return (
    <section style={{ background: "#F1F1F1" }} className="section">
      <div className="container">
        <div style={{ maxWidth: 960, marginInline: "auto" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ДЛЯ КОГО</div>
          <h2 style={{ fontWeight: 700, fontSize: 40, lineHeight: 1.15, color: "#272727", marginBottom: 48 }} className="h2">Тебе к нам, если ты:</h2>

          <motion.div variants={cont} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="for-whom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {forWhom.map(({ Icon, title, desc }) => (
              <motion.div key={title} variants={item} style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(182,232,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={24} color="#272727" strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 18, color: "#272727", marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.55, color: "#6B6B6B" }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div style={{ marginTop: 96 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ЧТО ВНУТРИ</div>
          <h2 style={{ fontWeight: 700, fontSize: 40, color: "#272727", marginBottom: 56 }} className="h2">Что внутри программы?</h2>

          <motion.div variants={cont} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {features.map(({ Icon, title, desc }, i) => (
              <motion.div key={title} variants={item} className="feature-card" style={{ background: "#fff", borderRadius: 24, padding: "36px 32px", boxShadow: "var(--shadow-card)", position: "relative", overflow: "hidden", transition: "all 350ms cubic-bezier(0.22, 1, 0.36, 1)" }}>
                <span style={{ position: "absolute", top: 16, right: 24, fontWeight: 800, fontSize: 72, color: "rgba(182,232,53,0.18)", userSelect: "none", pointerEvents: "none", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon size={28} color="#B6E835" strokeWidth={1.8} />
                <div style={{ fontWeight: 600, fontSize: 20, color: "#272727", lineHeight: 1.25, marginTop: 20, marginBottom: 10 }}>{title}</div>
                <div style={{ fontSize: 15, color: "#6B6B6B", lineHeight: 1.55, maxWidth: 280 }}>{desc}</div>
                <span className="hover-bar" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#B6E835", transform: "translateX(-100%)", transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`
        .feature-card:hover { box-shadow: var(--shadow-card-hover); transform: translateY(-4px); }
        .feature-card:hover .hover-bar { transform: translateX(0); }
        .h2 { font-weight: 700; }
        @media (max-width: 1024px) {
          .feature-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .h2 { font-size: 30px !important; }
          .feature-grid, .for-whom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}