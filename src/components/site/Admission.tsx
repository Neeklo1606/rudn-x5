import { motion } from "framer-motion";
import { CheckCircle2, FileText, ListChecks, CalendarCheck, BadgeCheck } from "lucide-react";

const examRows = [
  { subject: "Математика (профиль)", score: 65, role: "обязательный" },
  { subject: "Русский язык", score: 65, role: "обязательный" },
  { subject: "Информатика", score: 65, role: "по выбору" },
];

const steps = [
  {
    date: "До 25 июля",
    title: "Проверь баллы ЕГЭ",
    desc: "Убедись, что баллы по профильным предметам соответствуют минимальным.",
    icon: CheckCircle2,
  },
  {
    date: "20 июня — 25 июля",
    title: "Подай документы",
    desc: "Через Госуслуги или лично в приёмной комиссии РУДН.",
    icon: FileText,
  },
  {
    date: "До 3 августа",
    title: "Следи за конкурсными списками",
    desc: "Списки обновляются ежедневно на сайте РУДН.",
    icon: ListChecks,
  },
  {
    date: "3 августа",
    title: "Подай согласие на зачисление",
    desc: "Оригинал аттестата + согласие на специальность.",
    icon: CalendarCheck,
  },
  {
    date: "9 августа",
    title: "Ты студент РУДН",
    desc: "Приказ о зачислении. Добро пожаловать в программу!",
    icon: BadgeCheck,
  },
];

const stats = [
  ["25", "бюджетных мест"],
  ["80", "по договору"],
  ["4 года", "очное обучение"],
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

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
                <span>Минимум</span>
                <span>Статус</span>
              </div>
              {examRows.map((row) => (
                <div key={row.subject} className="exam-row">
                  <span className="exam-subject">{row.subject}</span>
                  <span className="exam-score">{row.score}</span>
                  <span className="exam-role">{row.role}</span>
                </div>
              ))}
            </div>

            <div className="price-row">
              <span className="price-label">Стоимость обучения</span>
              <span className="price-value">225 000 ₽ / семестр</span>
            </div>

            <div className="stats-row">
              {stats.map(([n, l]) => (
                <div key={l} className="stat-pill">
                  <span className="stat-number">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="admission-column timeline-column">
            <div className="column-header">
              <h3 className="column-title">Этапы поступления</h3>
              <p className="column-caption">От подачи документов до приказа о зачислении</p>
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
                      <div className="timeline-date">{step.date}</div>
                      <div className="timeline-title">{step.title}</div>
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
          padding: 72px 0 88px;
        }

        .section-header {
          max-width: 720px;
          margin-bottom: 40px;
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
          font-size: 44px;
          color: var(--ink);
          line-height: 1.05;
          margin-bottom: 14px;
        }

        .section-lead {
          font-size: 17px;
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
          padding: 40px 44px;
        }

        .admission-column:first-child {
          border-right: 1px solid var(--line-subtle, #EBEBEB);
        }

        .timeline-column {
          background: #fff;
        }

        .column-header {
          margin-bottom: 28px;
        }

        .column-title {
          font-weight: 600;
          font-size: 22px;
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
          grid-template-columns: 1fr 90px 110px;
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

        .exam-thead span:last-child { text-align: right; }

        .exam-row {
          display: grid;
          grid-template-columns: 1fr 90px 110px;
          gap: 16px;
          align-items: center;
          padding: 18px 22px;
          border-bottom: 1px solid var(--line-subtle, #EBEBEB);
          transition: background 200ms ease;
        }

        .exam-row:last-child { border-bottom: none; }
        .exam-row:hover { background: rgba(182, 232, 53, 0.04); }

        .exam-subject {
          font-weight: 500;
          font-size: 16px;
          color: var(--ink);
        }

        .exam-score {
          font-weight: 700;
          font-size: 18px;
          color: var(--lime, #B6E835);
        }

        .exam-role {
          text-align: right;
          font-size: 13px;
          color: var(--ink-40, #A3A3A3);
          font-family: var(--font-body);
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 24px;
          padding: 18px 22px;
          background: #fff;
          border: 1px solid var(--line-subtle, #EBEBEB);
          border-radius: var(--r-card-sm, 16px);
        }

        .price-label {
          font-size: 14px;
          color: var(--ink-60, #6B6B6B);
        }

        .price-value {
          font-weight: 600;
          font-size: 18px;
          color: var(--ink);
        }

        .stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .stat-pill {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          padding: 10px 16px;
          background: #fff;
          border: 1px solid var(--line-subtle, #EBEBEB);
          border-radius: var(--r-pill, 999px);
        }

        .stat-number {
          font-weight: 700;
          font-size: 18px;
          color: var(--lime, #B6E835);
        }

        .stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: var(--ink-40, #A3A3A3);
        }

        .timeline {
          position: relative;
        }

        .timeline-step {
          display: flex;
          gap: 18px;
          padding-bottom: 28px;
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

        .timeline-date {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--rudn-blue, #0066A1);
          margin-bottom: 4px;
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
          .admission-section { padding: 64px 0 72px; }
          .section-title { font-size: 36px; }
          .admission-card { grid-template-columns: 1fr; }
          .admission-column { padding: 32px; }
          .admission-column:first-child { border-right: none; border-bottom: 1px solid var(--line-subtle, #EBEBEB); }
        }

        @media (max-width: 640px) {
          .section-title { font-size: 30px; }
          .section-lead { font-size: 15px; }
          .admission-column { padding: 24px; }
          .column-title { font-size: 19px; }
          .exam-thead,
          .exam-row { grid-template-columns: 1fr 64px 86px; padding: 14px 16px; gap: 10px; }
          .exam-subject { font-size: 14px; }
          .exam-score { font-size: 16px; }
          .exam-role { font-size: 12px; }
          .price-row { flex-direction: column; align-items: flex-start; gap: 6px; padding: 16px; }
          .price-value { font-size: 17px; }
          .timeline-step { gap: 14px; padding-bottom: 22px; }
        }
      `}</style>
    </section>
  );
}
