import { motion } from "framer-motion";
import { CheckCircle2, FileText, ListChecks, CalendarCheck, BadgeCheck } from "lucide-react";

const examRows = [
  { subject: "Математика (профиль)", budget: 65, contract: 45, role: "обязательный" },
  { subject: "Русский язык", budget: 65, contract: 42, role: "обязательный" },
  { subject: "Информатика", budget: 65, contract: 46, role: "по выбору" },
];

const budgetSteps = [
  {
    date: "До 25 июля",
    title: "Проверь свои баллы ЕГЭ",
    desc: "Убедись, что баллы по профильным предметам соответствуют минимальным.",
    icon: CheckCircle2,
  },
  {
    date: "20 июня – 25 июля",
    time: "17:00",
    title: "Подай документы",
    desc: "Через Госуслуги или лично в приёмной комиссии РУДН.",
    icon: FileText,
  },
  {
    date: "До 27 июля",
    title: "Следи за конкурсными списками",
    desc: "Обновляются ежедневно на сайте РУДН.",
    icon: ListChecks,
  },
  {
    date: "До 12:00 5 августа",
    title: "Подай согласие на зачисление",
    desc: "Оригинал аттестата и согласие — для бюджетных мест.",
    icon: CalendarCheck,
  },
  {
    date: "7 августа",
    title: "Ты студент РУДН!",
    desc: "Приказ о зачислении. Добро пожаловать в программу!",
    icon: BadgeCheck,
  },
];

const contractSteps = [
  {
    date: "20 июня – 18 августа",
    time: "до 18 августа",
    title: "Подай документы",
    desc: "Через Госуслуги или лично в приёмной комиссии РУДН.",
    icon: FileText,
  },
  {
    date: "До 20 августа",
    title: "Следи за конкурсными списками",
    desc: "Обновляются ежедневно на сайте РУДН.",
    icon: ListChecks,
  },
  {
    date: "До 20 августа",
    title: "Оплати договор",
    desc: "Подпиши согласие и внеси оплату за первый семестр.",
    icon: CalendarCheck,
  },
  {
    date: "После 20 августа",
    title: "Ты студент РУДН!",
    desc: "Приказ о зачислении. Добро пожаловать в программу!",
    icon: BadgeCheck,
  },
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
            Проверь минимальные баллы ЕГЭ, выбери бюджет или договор и следи за дедлайнами — мы
            сопровождаем абитуриентов на каждом этапе.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="admission-card"
        >
          <motion.div variants={itemVariants} className="admission-summary">
            <div className="summary-tile summary-tile--accent">
              <span className="summary-label">Стоимость</span>
              <span className="summary-value">225 000 ₽ / семестр</span>
            </div>
            <div className="summary-tile">
              <span className="summary-label">Бюджетных мест</span>
              <span className="summary-value">50</span>
            </div>
            <div className="summary-tile">
              <span className="summary-label">По договору</span>
              <span className="summary-value">152</span>
            </div>
            <div className="summary-tile">
              <span className="summary-label">Срок обучения</span>
              <span className="summary-value">4 года</span>
              <span className="summary-sub">очное, бакалавриат</span>
            </div>
          </motion.div>

          <div className="admission-columns">
            <motion.div variants={itemVariants} className="admission-column">
              <div className="column-header">
                <h3 className="column-title">Бюджет</h3>
                <p className="column-caption">Этапы и дедлайны для поступления на бюджет</p>
              </div>

              <div className="timeline">
                {budgetSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === budgetSteps.length - 1;
                  return (
                    <div key={step.title} className="timeline-step">
                      <div className="timeline-marker">
                        <div className="timeline-icon">
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        {!isLast && <div className="timeline-line" />}
                      </div>
                      <div className="timeline-body">
                        <div className="timeline-meta">
                          <span className="timeline-date">{step.date}</span>
                          {step.time && <span className="timeline-time">{step.time}</span>}
                        </div>
                        <div className="timeline-title">{step.title}</div>
                        <div className="timeline-desc">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="admission-column">
              <div className="column-header">
                <h3 className="column-title">Контракт</h3>
                <p className="column-caption">Этапы и дедлайны для поступления по договору</p>
              </div>

              <div className="timeline">
                {contractSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === contractSteps.length - 1;
                  return (
                    <div key={step.title} className="timeline-step">
                      <div className="timeline-marker">
                        <div className="timeline-icon">
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        {!isLast && <div className="timeline-line" />}
                      </div>
                      <div className="timeline-body">
                        <div className="timeline-meta">
                          <span className="timeline-date">{step.date}</span>
                          {step.time && <span className="timeline-time">{step.time}</span>}
                        </div>
                        <div className="timeline-title">{step.title}</div>
                        <div className="timeline-desc">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="admission-exam">
            <div className="exam-header">
              <h4 className="exam-title">Вступительные испытания</h4>
              <p className="exam-caption">Минимальные баллы ЕГЭ для участия в конкурсе</p>
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
          /* global styles unify the eyebrow */
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
          color: var(--ink-60, #6B6B6B);
          max-width: 640px;
        }

        .admission-card {
          background: var(--bg-warm, #F7F9F0);
          border-radius: var(--r-card-lg, 32px);
          overflow: hidden;
          border: 1px solid var(--line-subtle, #EBEBEB);
        }

        .admission-summary {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          padding: 28px 36px;
          border-bottom: 1px solid var(--line-subtle, #EBEBEB);
        }

        .summary-tile {
          background: #fff;
          border: 1px solid var(--line-subtle, #EBEBEB);
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .summary-tile--accent {
          background: linear-gradient(135deg, rgba(182, 232, 53, 0.18), rgba(182, 232, 53, 0.04));
          border-color: rgba(182, 232, 53, 0.35);
        }
        .summary-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--ink-40, #A3A3A3);
        }
        .summary-value {
          font-weight: 700;
          font-size: 18px;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .summary-sub {
          font-size: 11px;
          color: var(--ink-40, #A3A3A3);
          line-height: 1.4;
        }

        .admission-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .admission-column {
          padding: 28px 36px;
        }
        .admission-column:first-child {
          border-right: 1px solid var(--line-subtle, #EBEBEB);
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

        .timeline {
          position: relative;
        }
        .timeline-step {
          display: flex;
          gap: 18px;
          padding-bottom: 20px;
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
        .timeline-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px 10px;
          margin-bottom: 6px;
        }
        .timeline-date {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--rudn-blue, #0066A1);
          font-weight: 600;
        }
        .timeline-time {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: var(--ink-40, #A3A3A3);
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(0,0,0,0.04);
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

        .admission-exam {
          padding: 28px 36px;
          background: #fff;
          border-top: 1px solid var(--line-subtle, #EBEBEB);
        }
        .exam-header {
          margin-bottom: 16px;
        }
        .exam-title {
          font-weight: 600;
          font-size: 18px;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .exam-caption {
          font-size: 14px;
          color: var(--ink-40, #A3A3A3);
          line-height: 1.45;
        }
        .exam-table {
          width: 100%;
          border-radius: var(--r-card, 24px);
          overflow: hidden;
          border: 1px solid var(--line-subtle, #EBEBEB);
          background: var(--bg-warm, #F7F9F0);
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

        @media (max-width: 1024px) {
          .admission-section { padding: 48px 0 56px; }
          .section-title { font-size: 32px; }
          .admission-summary { padding: 22px 28px; }
          .admission-columns { grid-template-columns: 1fr; }
          .admission-column { padding: 26px 28px; }
          .admission-column:first-child { border-right: none; border-bottom: 1px solid var(--line-subtle, #EBEBEB); }
          .admission-exam { padding: 26px 28px; }
        }

        @media (max-width: 640px) {
          .section-title { font-size: 26px; }
          .section-lead { font-size: 15px; }
          .admission-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); padding: 18px 20px; gap: 8px; }
          .summary-value { font-size: 16px; }
          .admission-column { padding: 22px 20px; }
          .column-title { font-size: 18px; }
          .timeline-step { gap: 12px; padding-bottom: 18px; }
          .timeline-icon { width: 34px; height: 34px; }
          .exam-thead,
          .exam-row { grid-template-columns: 1fr 52px 56px; padding: 12px 14px; gap: 8px; }
          .exam-subject { font-size: 14px; }
          .exam-score { font-size: 16px; }
          .admission-exam { padding: 22px 20px; }
        }
      `}</style>
    </section>
  );
}
