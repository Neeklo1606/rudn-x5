import { Layers, Building2, MonitorSmartphone, Server, FolderKanban, Network, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Feature = {
  Icon: typeof Layers;
  title: string;
  desc: string;
  details: string[];
  span?: number;
  featured?: boolean;
};

const features: Feature[] = [
  {
    Icon: Layers,
    title: "2 специальности в одной программе",
    desc: "Computer Vision и NLP – выбери трек на 3 курсе и углубись в практику.",
    details: [
      "Общая база первые два года: алгоритмы, ML, инженерия данных",
      "Глубокая специализация и проекты по выбранному треку с 3 курса",
      "Возможность миксовать дисциплины обоих треков",
    ],
    span: 2,
    featured: true,
  },
  {
    Icon: Building2,
    title: "Индустриальный партнёр",
    desc: "X5 Tech – технологическое ядро X5 Group и одна из крупнейших AI-команд в ритейле.",
    details: [
      "ML-инженеры X5 Tech ведут практические курсы",
      "Задачи и кейсы из реального продакшена",
      "Прямой путь к стажировке и офферу",
    ],
  },
  {
    Icon: FolderKanban,
    title: "Проектный формат",
    desc: "С первого курса работаешь над реальными задачами, а не абстрактными упражнениями.",
    details: [
      "Проектные спринты каждый семестр",
      "Менторы из индустрии на каждом этапе",
      "Собственное портфолио к выпуску",
    ],
  },
  {
    Icon: Server,
    title: "Сильная инфраструктура",
    desc: "Доступ к вычислительным кластерам, GPU-серверам и облачным платформам.",
    details: [
      "GPU-кластер для обучения моделей",
      "Облачные среды и MLOps-инструменты",
      "Доступ к корпоративным датасетам X5",
    ],
  },
  {
    Icon: MonitorSmartphone,
    title: "Современный кампус",
    desc: "Технологичные аудитории, AI-лаборатории и пространства для командной работы.",
    details: [
      "Лаборатории Computer Vision и NLP",
      "Коворкинги и переговорные для проектов",
      "Открытые лекции и хакатоны на кампусе",
    ],
  },
  {
    Icon: Network,
    title: "Нетворкинг и карьера",
    desc: "Прямой контакт с ML-инженерами X5 Tech, стажировки и карьерные треки.",
    details: [
      "Карьерные сессии и mock-интервью",
      "Стажировки в X5 Tech с первого курса",
      "Сообщество выпускников программы",
    ],
  },
];

export default function InsideProgram() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ background: "#F1F1F1", padding: "48px 0 72px" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 36, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 2, color: "#A79FFF", textTransform: "uppercase", marginBottom: 10 }}>
              // ЧТО ВНУТРИ
            </div>
            <h2 className="ip-title" style={{ fontWeight: 700, fontSize: 40, lineHeight: 1.1, color: "#272727", letterSpacing: "-0.02em" }}>
              Что внутри программы
            </h2>
          </div>
          <div style={{ fontSize: 14, color: "#6B6B6B", maxWidth: 360 }}>
            Нажми на карточку, чтобы раскрыть подробности – без лишнего текста сразу.
          </div>
        </div>

        <div className="ip-grid">
          {features.map((f, i) => {
            const isOpen = open === i;
            const { Icon } = f;
            return (
              <motion.button
                key={f.title}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
                className={`ip-card${f.featured ? " ip-card--featured" : ""}${isOpen ? " is-open" : ""}`}
                style={{
                  gridColumn: f.span === 2 ? "span 2" : undefined,
                  background: f.featured ? "#272727" : "#FFFFFF",
                  color: f.featured ? "#FFFFFF" : "#272727",
                  borderRadius: 24,
                  padding: "32px 30px",
                  border: `1px solid ${f.featured ? "#272727" : "#ECECEC"}`,
                  textAlign: "left",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                  transition: "box-shadow 250ms ease, transform 250ms ease, border-color 250ms ease",
                  font: "inherit",
                }}
              >
                <span aria-hidden style={{ position: "absolute", top: 18, right: 22, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1, color: f.featured ? "rgba(255,255,255,0.4)" : "#A3A3A3" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: f.featured ? "#B6E835" : "rgba(182,232,53,0.14)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={22} color={f.featured ? "#272727" : "#272727"} strokeWidth={1.9} />
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 30, height: 30, borderRadius: "50%",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      background: f.featured ? "rgba(255,255,255,0.08)" : "#F4F4F4",
                      color: f.featured ? "#FFFFFF" : "#272727",
                      marginRight: 28,
                    }}
                  >
                    <Plus size={16} strokeWidth={2.2} />
                  </motion.span>
                </div>

                <div style={{ fontWeight: 700, fontSize: f.featured ? 24 : 19, lineHeight: 1.2, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 14.5, lineHeight: 1.55, color: f.featured ? "rgba(255,255,255,0.72)" : "#6B6B6B", maxWidth: 520 }}>
                  {f.desc}
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.ul
                      key="details"
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 18 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        overflow: "hidden",
                        listStyle: "none",
                        padding: 0,
                        borderTop: `1px solid ${f.featured ? "rgba(255,255,255,0.12)" : "#EFEFEF"}`,
                      }}
                    >
                      <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                        {f.details.map((d) => (
                          <li key={d} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.5, color: f.featured ? "rgba(255,255,255,0.85)" : "#3F3F3F" }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B6E835", marginTop: 8, flexShrink: 0 }} />
                            <span>{d}</span>
                          </li>
                        ))}
                      </div>
                    </motion.ul>
                  )}
                </AnimatePresence>

                <span className="ip-bar" aria-hidden style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#B6E835",
                  transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                  transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1)",
                }} />
              </motion.button>
            );
          })}
        </div>
      </div>

      <style>{`
        .ip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          align-items: start;
        }
        .ip-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.08); border-color: #DADADA; }
        .ip-card--featured:hover { border-color: #272727; box-shadow: 0 16px 40px rgba(0,0,0,0.16); }
        .ip-card:hover .ip-bar { transform: translateX(0); }
        @media (max-width: 1024px) {
          .ip-grid { grid-template-columns: repeat(2, 1fr); }
          .ip-card[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 768px) {
          .ip-title { font-size: 30px !important; }
          .ip-grid { grid-template-columns: 1fr; }
          .ip-card[style*="span 2"] { grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}