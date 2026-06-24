import { motion } from "framer-motion";
import { CheckCircle2, FileText, ListChecks, CalendarCheck, BadgeCheck } from "lucide-react";

const examRows = [
  { subject: "Математика (профиль)", budget: 65, contract: 45, role: "обязательный" },
  { subject: "Русский язык", budget: 65, contract: 42, role: "обязательный" },
  { subject: "Информатика", budget: 65, contract: 46, role: "по выбору" },
  { subject: "Физика", budget: 65, contract: 41, role: "по выбору" },
];

type Step = {
  title: string;
  desc: string;
  icon: typeof CheckCircle2;
  budgetMark?: string;
  contractMark?: string;
  wideMark?: string;
};

const steps: Step[] = [
  {
    title: "Проверь свои баллы ЕГЭ",
    desc: "Убедись, что баллы по профильным предметам соответствуют минимальным.",
    budgetMark: "17:00",
    icon: CheckCircle2,
  },
  {
    title: "Подай документы",
    desc: "Через Госуслуги или лично в приёмной комиссии РУДН.",
    budgetMark: "20 июня — 25 июля",
    contractMark: "20 июня — 18 августа",
    icon: FileText,
  },
  {
    title: "Следи за конкурсными списками",
    desc: "Обновляются ежедневно на сайте РУДН.",
    budgetMark: "До 27 июля",
    contractMark: "До 20 августа",
    icon: ListChecks,
  },
  {
    title: "Подай согласие на зачисление",
    desc: "Оригинал аттестата и согласие на зачисление — обязательное условие.",
    budgetMark: "До 12:00 5 августа",
    contractMark: "До 12:00 24 августа",
    wideMark: "или оплати договор",
    icon: CalendarCheck,
  },
  {
    title: "Ты студент РУДН!",
    desc: "Приказ о зачислении. Добро пожаловать в программу!",
    budgetMark: "7 августа",
    contractMark: "28 августа",
    icon: BadgeCheck,
  },
];

const stats = [
  ["50", "бюджетных мест"],
  ["152", "по договору"],
  ["4 года", "очное обучение"],
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
} as const;

export default function Admission() {
  return (
    <section id="admission" className="admission-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="section-header"
        >
          <div className="section-label">Поступление</div>
          <h2 className="section-title">Как поступить</h2>
          <p className="section-lead">
            Всё просто: три предмета, пять шагов, один дедлайн. Мы сопровождаем абитуриентов на каждом этапе.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="admission-card"
        >
          <motion.div variants={itemVariants} className="admission-column">
            <div className="column-header">
              <h3 className="column-title">Вступительные испытания</h3>
              <p className="column-caption">Минимальные баллы ЕГЭ для участия в конкурсе</p>
            </div>

            <div className="exam-table">
              <div className="exam-thead">
                <span>Предмет</span>
                <span>Бюджет</span>
                <span>Контракт</span>
              </div>
              {examRows.map((row) => (
                <div key={row.subject} className="exam-row">
                  <span className="exam-subject">
                    {row.subject}
                    <span className="exam-tag">{row.role}</span>
                  </span>
                  <span className="exam-score exam-score--budget">{row.budget}</span>
                  <span className="exam-score exam-score--contract">{row.contract}</span>
                </div>
              ))}
            </div>
            <p className="exam-note">Минимальные баллы ЕГЭ для участия в конкурсе на бюджет и по договору.</p>

            <div className="facts-grid">
              <div className="fact-tile fact-tile--accent">
                <span className="fact-label">Стоимость</span>
                <span className="fact-value">500 000 ₽ / год</span>
                <span className="fact-sub">фиксированная стоимость обучения</span>
              </div>
              {stats.map(([n, l]) => (
                <div key={l} className="fact-tile">
                  <span className="fact-label">{l}</span>
                  <span className="fact-value fact-value--lime">{n}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="admission-column timeline-column">
            <div className="column-header">
              <h3 className="column-title">Этапы поступления</h3>
              <p className="column-caption">Ключевые даты и дедлайны приёмной кампании 2026</p>
            </div>

            <div className="track-legend">
              <div className="track-legend__item">
                <span className="track-legend__label">Бюджет</span>
                <span className="track-legend__date">До 25 июля</span>
              </div>
              <div className="track-legend__item">
                <span className="track-legend__label">Контракт</span>
                <span className="track-legend__date">До 18 августа</span>
              </div>
            </div>

            <div className="timeline">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === steps.length - 1;
                return (
                  <div key={step.title} className="timeline-step">
                    <div className="timeline-marker">
                      <div className="timeline-icon">
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      {!isLast && <div className="timeline-line" />}
                    </div>
                    <div className="timeline-body">
                      <div className="timeline-title">{step.title}</div>
                      <div className="timeline-marks">
                        {step.budgetMark && (
                          <span className="mark-box">
                            <span className="mark-box__caption">Бюджет</span>
                            {step.budgetMark}
                          </span>
                        )}
                        {step.contractMark && (
                          <span className="mark-box">
                            <span className="mark-box__caption">Контракт</span>
                            {step.contractMark}
                          </span>
                        )}
                      </div>
                      {step.wideMark && (
                        <div className="mark-box mark-box--wide">{step.wideMark}</div>
                      )}
                      <div className="timeline-desc">{step.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .admission-section {
          background: #fff;
          padding: 56px 0 64px;
        }

        .section-header {
          max-width: 720px;
          margin-bottom: 28px;
        }

        .section-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          color: var(--rudn-blue, #0066A1);
          margin-bottom: 12px;
        }

        .section-title {
          font-weight: 700;
          font-size: 38px;
          color: var(--ink);
          line-height: 1.05;
          margin-bottom: 10px;
        }

        .section-lead {
          font-size: 16px;
          line-height: 1.55;
          color: var(--ink-60);
          max-width: 560px;
        }

        .admission-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          background: var(--bg-warm, #F7F9F0);
          border-radius: var(--r-card-lg, 32px);
          overflow: hidden;
          border: 1px solid var(--line-subtle, #EBEBEB);
        }

        .admission-column {
          padding: 32px 36px;
        }

        .admission-column:first-child {
          border-right: 1px solid var(--line-subtle, #EBEBEB);
        }

        .timeline-column {
          background: #fff;
        }

        .column-header {
          margin-bottom: 20px;
        }

        .column-title {
          font-weight: 600;
          font-size: 20px;
          color: var(--ink);
          margin-bottom: 6px;
        }

        .column-caption {
          font-size: 14px;
          color: var(--ink-40, #A3A3A3);
          line-height: 1.45;
        }

        .exam-table {
          width: 100%;
          border-radius: var(--r-card, 24px);
          overflow: hidden;
          border: 1px solid var(--line-subtle, #EBEBEB);
          background: #fff;
        }

        .exam-thead {
          display: grid;
          grid-template-columns: 1fr 90px 90px;
          gap: 16px;
          padding: 14px 22px;
          background: rgba(0, 102, 161, 0.06);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: var(--rudn-blue, #0066A1);
          border-bottom: 1px solid var(--line-subtle, #EBEBEB);
        }

        .exam-thead span:not(:first-child) { text-align: right; }

        .exam-row {
          display: grid;
          grid-template-columns: 1fr 90px 90px;
          gap: 16px;
          align-items: center;
          padding: 14px 22px;
          border-bottom: 1px solid var(--line-subtle, #EBEBEB);
          transition: background 200ms ease;
        }

        .exam-row:last-child { border-bottom: none; }
        .exam-row:hover { background: rgba(182, 232, 53, 0.04); }

        .exam-subject {
          font-weight: 500;
          font-size: 16px;
          color: var(--ink);
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .exam-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: var(--ink-40, #A3A3A3);
        }

        .exam-score {
          font-weight: 700;
          font-size: 18px;
          text-align: right;
        }
        .exam-score--budget { color: #5e8a08; }
        .exam-score--contract { color: var(--ink-60, #6B6B6B); }

        .exam-note {
          margin-top: 10px;
          font-size: 12px;
          color: var(--ink-40, #A3A3A3);
          line-height: 1.5;
        }

        .facts-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 18px;
        }
        .fact-tile {
          background: #fff;
          border: 1px solid var(--line-subtle, #EBEBEB);
          border-radius: 14px;
          padding: 14px 16px;
          display: flex; flex-direction: column; gap: 4px;
          min-width: 0;
        }
        .fact-tile--accent { background: linear-gradient(135deg, rgba(182,232,53,0.18), rgba(182,232,53,0.04)); border-color: rgba(182,232,53,0.35); }
        .fact-label {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.5px;
          text-transform: uppercase; color: var(--ink-40, #A3A3A3);
        }
        .fact-value {
          font-weight: 700; font-size: 18px; color: var(--ink); letter-spacing: -0.01em;
        }
        .fact-value--lime { color: #5e8a08; }
        .fact-sub {
          font-size: 11px;
          color: var(--ink-40, #A3A3A3);
          line-height: 1.4;
        }

        .timeline {
          position: relative;
        }

        .timeline-step {
          display: flex;
          gap: 18px;
          padding-bottom: 22px;
          position: relative;
        }

        .timeline-step:last-child { padding-bottom: 0; }

        .timeline-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 36px;
        }

        .timeline-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(0, 102, 161, 0.08);
          color: var(--rudn-blue, #0066A1);
        }

        .timeline-line {
          flex: 1;
          width: 2px;
          min-height: 24px;
          margin-top: 8px;
          background: linear-gradient(180deg, rgba(0, 102, 161, 0.18), rgba(0, 102, 161, 0.04));
        }

        .timeline-body {
          flex: 1;
          padding-top: 2px;
        }

        .track-legend {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 20px;
        }
        .track-legend__item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 14px;
          border: 1.5px solid #E33B3B;
          border-radius: 12px;
          background: rgba(227, 59, 59, 0.04);
        }
        .track-legend__label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #E33B3B;
          font-weight: 700;
        }
        .track-legend__date {
          font-weight: 600;
          font-size: 14px;
          color: var(--ink);
        }
        .timeline-marks {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 8px 0 6px;
        }
        .mark-box {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          padding: 6px 10px;
          border: 1.5px solid #E33B3B;
          border-radius: 10px;
          background: rgba(227, 59, 59, 0.04);
          color: var(--ink);
          font-weight: 600;
          font-size: 13px;
          line-height: 1.2;
        }
        .mark-box__caption {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #E33B3B;
          font-weight: 700;
        }
        .mark-box--wide {
          display: block;
          margin: 4px 0 8px;
          text-align: center;
          font-size: 13px;
        }

        .timeline-title {
          font-weight: 600;
          font-size: 16px;
          color: var(--ink);
          margin-bottom: 4px;
        }

        .timeline-desc {
          font-size: 13px;
          line-height: 1.5;
          color: var(--ink-60, #6B6B6B);
        }

        @media (max-width: 1024px) {
          .admission-section { padding: 48px 0 56px; }
          .section-title { font-size: 32px; }
          .admission-card { grid-template-columns: 1fr; }
          .admission-column { padding: 26px 28px; }
          .admission-column:first-child { border-right: none; border-bottom: 1px solid var(--line-subtle, #EBEBEB); }
        }

        @media (max-width: 640px) {
          .section-title { font-size: 26px; }
          .section-lead { font-size: 15px; }
          .admission-column { padding: 22px 20px; }
          .column-title { font-size: 18px; }
          .exam-thead,
          .exam-row { grid-template-columns: 1fr 52px 56px; padding: 12px 14px; gap: 8px; }
          .exam-subject { font-size: 14px; }
          .exam-score { font-size: 16px; }
          .facts-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .fact-value { font-size: 16px; }
          .timeline-step { gap: 12px; padding-bottom: 18px; }
          .track-legend { gap: 8px; }
          .mark-box { font-size: 12px; padding: 6px 8px; }
        }
      `}</style>
    </section>
  );
}
