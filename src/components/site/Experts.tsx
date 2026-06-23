import { motion } from "framer-motion";

const orgPalette: Record<string, { bg: string; text: string; dot: string }> = {
  РУДН: { bg: "rgba(167,159,255,0.12)", text: "#806FE6", dot: "#A79FFF" },
  "X5 Tech": { bg: "rgba(182,232,53,0.15)", text: "#6FA300", dot: "#B6E835" },
};

type Expert = {
  name: string;
  role: string;
  org: "РУДН" | "X5 Tech";
  exp: string;
  photo: string;
};

const experts: Expert[] = [
  { name: "Иванов Сергей", role: "PhD, CV / NLP", org: "РУДН", exp: "Компьютерное зрение", photo: "https://i.pravatar.cc/300?img=12" },
  { name: "Петрова Анна", role: "PhD, ML", org: "РУДН", exp: "Машинное обучение", photo: "https://i.pravatar.cc/300?img=47" },
  { name: "Сидоров Михаил", role: "Lead ML Engineer", org: "X5 Tech", exp: "ML в ритейле", photo: "https://i.pravatar.cc/300?img=33" },
  { name: "Козлова Елена", role: "PhD, NLP", org: "РУДН", exp: "Обработка языка", photo: "https://i.pravatar.cc/300?img=45" },
  { name: "Морозов Дмитрий", role: "Senior PM", org: "X5 Tech", exp: "AI-продукты", photo: "https://i.pravatar.cc/300?img=60" },
  { name: "Волкова Мария", role: "PhD, математика", org: "РУДН", exp: "Мат. методы", photo: "https://i.pravatar.cc/300?img=44" },
  { name: "Новиков Алексей", role: "Senior Researcher", org: "РУДН", exp: "Алгоритмы", photo: "https://i.pravatar.cc/300?img=15" },
  { name: "Соколова Ольга", role: "CV Engineer", org: "X5 Tech", exp: "Computer Vision", photo: "https://i.pravatar.cc/300?img=48" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
} as const;

export default function Experts() {
  return (
    <section id="experts" className="experts-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="section-header"
        >
          <div className="section-label">Эксперты</div>
          <h2 className="section-title">Преподаватели и эксперты</h2>
          <p className="section-lead">
            Преподаватели РУДН и практикующие эксперты X5 Tech. Лекции, семинары и реальные AI-проекты под руководством тех, кто делает индустрию.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="experts-grid"
        >
          {experts.map((e) => {
            const palette = orgPalette[e.org];
            return (
              <motion.div
                key={e.name}
                variants={itemVariants}
                className="expert-card"
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="expert-photo-wrap">
                  <img src={e.photo} alt={e.name} loading="lazy" className="expert-photo" />
                </div>
                <div className="expert-body">
                  <div className="expert-org" style={{ background: palette.bg, color: palette.text }}>
                    <span className="org-dot" style={{ background: palette.dot }} />
                    {e.org}
                  </div>
                  <h3 className="expert-name">{e.name}</h3>
                  <div className="expert-role">{e.role}</div>
                  <span className="expert-exp">{e.exp}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .experts-section {
          background: var(--bg-warm, #F7F9F0);
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
          color: var(--lavender, #A79FFF);
          margin-bottom: 12px;
        }

        .section-title {
          font-weight: 700;
          font-size: 44px;
          color: var(--ink, #272727);
          line-height: 1.05;
          margin-bottom: 14px;
        }

        .section-lead {
          font-size: 17px;
          line-height: 1.55;
          color: var(--ink-60, #6B6B6B);
        }

        .experts-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .expert-card {
          background: #fff;
          border-radius: var(--r-card, 24px);
          overflow: hidden;
          box-shadow: var(--shadow-card, 0 2px 24px rgba(0,0,0,0.06));
          transition: box-shadow 250ms ease;
          display: flex;
          flex-direction: column;
        }

        .expert-card:hover {
          box-shadow: var(--shadow-card-hover, 0 8px 40px rgba(0,0,0,0.10));
        }

        .expert-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--line-subtle, #EBEBEB);
        }

        .expert-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 500ms ease;
        }

        .expert-card:hover .expert-photo {
          transform: scale(1.04);
        }

        .expert-body {
          padding: 18px 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex: 1;
        }

        .expert-org {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: var(--r-pill, 999px);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .org-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .expert-name {
          font-weight: 600;
          font-size: 17px;
          color: var(--ink, #272727);
          line-height: 1.25;
          margin: 0;
        }

        .expert-role {
          font-size: 14px;
          color: var(--ink-60, #6B6B6B);
          line-height: 1.35;
        }

        .expert-exp {
          align-self: flex-start;
          margin-top: auto;
          padding-top: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
          color: var(--ink-40, #A3A3A3);
        }

        @media (max-width: 1024px) {
          .experts-section { padding: 64px 0 72px; }
          .section-title { font-size: 36px; }
          .experts-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }

        @media (max-width: 640px) {
          .experts-section { padding: 56px 0 64px; }
          .section-title { font-size: 30px; }
          .section-lead { font-size: 15px; }
          .experts-grid { grid-template-columns: 1fr; gap: 16px; }
          .expert-body { padding: 16px 18px 20px; }
          .expert-name { font-size: 16px; }
        }
      `}</style>
    </section>
  );
}
