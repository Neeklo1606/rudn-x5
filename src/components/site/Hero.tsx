import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const LIME = "#B6E835";
const LIME_DARK = "#86b11c";
const INK = "#272727";
const RUDN_BLUE = "#004A99";
const CANVAS = "#F7F9F0";

const CHIPS = ["x5", "rudn", "минцифры", "аналитический центр"];
const STATS: Array<{ value: string; suffix?: string; label: string }> = [
  { value: "25", label: "бюджетных мест" },
  { value: "80", label: "по договору" },
  { value: "4", suffix: "года", label: "бакалавриат" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        background: CANVAS,
        padding: "104px 0 64px",
        position: "relative",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-card">
          {/* technical dot grid */}
          <div className="hero-grid-overlay" aria-hidden="true" />

          <div className="hero-inner">
            {/* LEFT */}
            <motion.div
              className="hero-left"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <div>
                {/* Logos */}
                <motion.div variants={fadeUp} className="hero-logos">
                  <div className="hero-logo">
                    <span className="hero-logo-mark hero-logo-mark--x5">X5</span>
                    <span className="hero-logo-text">
                      X5 <span style={{ color: "#9aa0a6", fontWeight: 500 }}>Tech</span>
                    </span>
                  </div>
                  <span className="hero-logo-divider" />
                  <div className="hero-logo">
                    <span className="hero-logo-mark hero-logo-mark--rudn" />
                    <span className="hero-logo-text" style={{ color: RUDN_BLUE }}>
                      RUDN
                    </span>
                  </div>
                </motion.div>

                {/* Program label */}
                <motion.p variants={fadeUp} className="hero-label">
                  Образовательная программа: Искусственный интеллект, разработка
                </motion.p>

                {/* Headline */}
                <motion.h1 variants={fadeUp} className="hero-h1">
                  Изучай ИИ,
                  <br />
                  входи в профессию
                  <br />
                  вместе с{" "}
                  <span className="hero-h1-accent">X5 Tech</span>
                </motion.h1>

                {/* CTAs */}
                <motion.div variants={fadeUp} className="hero-ctas">
                  <a href="#apply" className="hero-cta-primary">
                    Отправить заявку
                    <ArrowRight size={18} strokeWidth={2.5} />
                  </a>
                  <a href="#apply" className="hero-cta-secondary">
                    Проконсультироваться
                  </a>
                </motion.div>

                {/* Chips */}
                <motion.div variants={fadeUp} className="hero-chips">
                  {CHIPS.map((c) => (
                    <span key={c} className="hero-chip">#{c}</span>
                  ))}
                </motion.div>
              </div>

              {/* Stats */}
              <motion.div variants={fadeUp} className="hero-stats">
                {STATS.map((s) => (
                  <div key={s.label} className="hero-stat">
                    <p className="hero-stat-value">
                      {s.value}
                      {s.suffix && <span className="hero-stat-suffix"> {s.suffix}</span>}
                    </p>
                    <p className="hero-stat-label">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT – AI visual */}
            <motion.div
              className="hero-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroVisual />

              <div className="hero-float hero-float--lime">Data Driven</div>
              <div className="hero-float hero-float--glass">
                <p className="hero-float-eyebrow">Architecture</p>
                <p className="hero-float-body">
                  Нейросети для логистики и&nbsp;ритейла X5&nbsp;на&nbsp;реальных данных.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-card {
          position: relative;
          background: #ffffff;
          border: 1px solid #e7e7e2;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 30px 80px -40px rgba(39,39,39,0.25), 0 8px 20px -12px rgba(39,39,39,0.08);
        }
        .hero-grid-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(${INK} 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.04;
        }
        .hero-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 7fr 5fr;
          min-height: 640px;
        }
        .hero-left {
          padding: 56px 56px 48px;
          display: flex; flex-direction: column; justify-content: space-between;
          gap: 48px;
          min-width: 0;
        }
        .hero-logos { display: flex; align-items: center; gap: 24px; margin-bottom: 40px; }
        .hero-logo { display: inline-flex; align-items: center; gap: 10px; }
        .hero-logo-mark {
          width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;
          font-family: Inter, sans-serif; font-weight: 800; font-size: 12px; color: ${INK};
        }
        .hero-logo-mark--x5 { background: ${LIME}; border-radius: 999px; }
        .hero-logo-mark--rudn { background: ${RUDN_BLUE}; border-radius: 6px; }
        .hero-logo-text { font-family: Inter, sans-serif; font-weight: 800; font-size: 18px; letter-spacing: -0.02em; color: ${INK}; }
        .hero-logo-divider { width: 1px; height: 22px; background: #e5e5e0; }

        .hero-label {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic; font-weight: 500;
          font-size: 18px; line-height: 1.5;
          color: #6b6b6b;
          margin: 0 0 20px;
          max-width: 520px;
        }
        .hero-h1 {
          font-family: Inter, sans-serif;
          font-weight: 800;
          font-size: 64px; line-height: 1.05; letter-spacing: -0.025em;
          color: ${INK};
          margin: 0 0 36px;
        }
        .hero-h1-accent {
          background: linear-gradient(90deg, ${LIME}, ${LIME_DARK});
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          white-space: nowrap;
        }

        .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 32px; }
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 52px; padding: 0 28px;
          background: ${INK}; color: #fff;
          font-family: Inter, sans-serif; font-weight: 700; font-size: 15px;
          border-radius: 999px;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 10px 24px -10px rgba(39,39,39,0.4);
        }
        .hero-cta-primary:hover { transform: translateY(-1px); background: #000; }
        .hero-cta-secondary {
          display: inline-flex; align-items: center;
          min-height: 52px; padding: 0 24px;
          color: ${INK};
          font-family: Inter, sans-serif; font-weight: 600; font-size: 15px;
          border: 1.5px solid #e2e2dc; border-radius: 999px;
          background: transparent;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .hero-cta-secondary:hover { background: #fafaf6; border-color: #cfcfc8; }

        .hero-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .hero-chip {
          padding: 6px 10px;
          background: #f3f3ee; color: #8a8a82;
          font-family: 'IBM Plex Mono', ui-monospace, monospace;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          border-radius: 6px;
        }

        .hero-stats {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
          padding-top: 32px; border-top: 1px solid #ececea;
        }
        .hero-stat-value {
          font-family: Inter, sans-serif; font-weight: 800; font-size: 32px; line-height: 1; color: ${INK};
          margin: 0 0 6px;
        }
        .hero-stat-suffix { font-weight: 600; font-size: 18px; color: #555; }
        .hero-stat-label {
          font-family: Inter, sans-serif; font-weight: 600; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          color: #9a9a92; margin: 0;
        }

        .hero-right {
          position: relative;
          background: ${INK};
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }

        .hero-float { position: absolute; z-index: 3; }
        .hero-float--lime {
          top: 32px; right: 32px;
          background: ${LIME}; color: ${INK};
          padding: 12px 16px; border-radius: 10px;
          font-family: Inter, sans-serif; font-weight: 800; font-size: 13px;
          transform: rotate(2deg);
          box-shadow: 0 16px 32px -12px rgba(0,0,0,0.4);
        }
        .hero-float--glass {
          bottom: 32px; left: 32px; right: 32px; max-width: 240px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          padding: 16px 18px; border-radius: 14px;
        }
        .hero-float-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 10px;
          letter-spacing: 0.18em; text-transform: uppercase; color: ${LIME};
          margin: 0 0 6px;
        }
        .hero-float-body { font-family: Inter, sans-serif; font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.85); margin: 0; }

        @media (max-width: 1024px) {
          .hero-section { padding: 96px 0 48px !important; }
          .hero-inner { grid-template-columns: 1fr; min-height: 0; }
          .hero-left { padding: 40px 32px 36px; gap: 36px; }
          .hero-right { min-height: 360px; }
          .hero-h1 { font-size: 48px; }
        }
        @media (max-width: 640px) {
          .hero-section { padding: 88px 0 32px !important; }
          .hero-card { border-radius: 22px; }
          .hero-left { padding: 32px 22px 28px; gap: 28px; }
          .hero-logos { gap: 16px; margin-bottom: 28px; }
          .hero-label { font-size: 15px; margin-bottom: 16px; }
          .hero-h1 { font-size: 36px; margin-bottom: 24px; letter-spacing: -0.02em; }
          .hero-cta-primary, .hero-cta-secondary { min-height: 48px; font-size: 14px; }
          .hero-stats { grid-template-columns: 1fr; gap: 16px; padding-top: 24px; }
          .hero-stat-value { font-size: 28px; }
          .hero-right { min-height: 280px; }
          .hero-float--lime { top: 20px; right: 20px; font-size: 12px; padding: 10px 12px; }
          .hero-float--glass { left: 20px; right: 20px; bottom: 20px; max-width: none; }
        }
      `}</style>
    </section>
  );
}

function HeroVisual() {
  return (
    <div
      style={{
        position: "relative",
        width: "82%",
        aspectRatio: "1 / 1",
      }}
    >
      {/* schematic backdrop */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.22,
        }}
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="150" stroke={LIME} strokeWidth="0.6" />
        <circle cx="200" cy="200" r="100" stroke={LIME} strokeWidth="0.5" strokeDasharray="4 5" />
        <path d="M200 0V400M0 200H400" stroke={LIME} strokeWidth="0.25" />
        <path d="M50 50L350 350M350 50L50 350" stroke={LIME} strokeWidth="0.25" />
      </svg>

      {/* neural network */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        {/* edges */}
        {[
          [80, 110, 200, 140],
          [80, 200, 200, 200],
          [80, 290, 200, 260],
          [80, 110, 200, 200],
          [80, 200, 200, 140],
          [80, 290, 200, 200],
          [200, 140, 320, 170],
          [200, 200, 320, 200],
          [200, 260, 320, 230],
          [200, 140, 320, 230],
          [200, 260, 320, 170],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={LIME}
            strokeOpacity="0.35"
            strokeWidth="0.8"
            style={{
              strokeDasharray: 200,
              strokeDashoffset: 200,
              animation: `heroLineDraw 2.4s ${i * 0.12}s ease-out forwards`,
            }}
          />
        ))}
        {/* nodes */}
        {[
          [80, 110], [80, 200], [80, 290],
          [200, 140], [200, 200], [200, 260],
          [320, 170], [320, 200], [320, 230],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="6" fill={INK} stroke={LIME} strokeWidth="1.5" />
            <circle
              cx={cx} cy={cy} r="6" fill="none" stroke={LIME} strokeWidth="1"
              style={{ transformOrigin: `${cx}px ${cy}px`, animation: `heroNodePulse 3.2s ${i * 0.18}s ease-out infinite` }}
            />
          </g>
        ))}
      </svg>

      {/* center monogram */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          color: LIME, textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 900, fontSize: 72, lineHeight: 1, letterSpacing: "-0.04em" }}>AI</div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: "0.32em", color: "rgba(255,255,255,0.55)", marginTop: 8 }}>
          APPLIED RESEARCH
        </div>
      </div>

      <style>{`
        @keyframes heroLineDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes heroNodePulse {
          0% { transform: scale(1); opacity: 0.9; }
          70% { transform: scale(2.6); opacity: 0; }
          100% { transform: scale(2.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
}