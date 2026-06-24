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

const STATS: Array<{ value: string; suffix?: string; label: string }> = [
  { value: "50", label: "бюджетных мест" },
  { value: "152", label: "по договору" },
  { value: "4", suffix: "года", label: "бакалавриат" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        background: CANVAS,
        padding: "84px 0 36px",
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
                {/* Program label */}
                <motion.div variants={fadeUp} className="hero-label">
                  <span className="hero-label-eyebrow">Образовательная программа</span>
                  <span className="hero-label-title">
                    «Искусственный интеллект: разработка и обучение интеллектуальных систем»
                  </span>
                </motion.div>

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

              <div className="hero-float hero-float--lime">На реальных данных</div>
              <div className="hero-float hero-float--glass">
                <p className="hero-float-eyebrow">Архитектура</p>
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
          box-shadow: 0 30px 80px -40px rgba(39,39,39,0.22), 0 8px 20px -12px rgba(39,39,39,0.06);
          transition: box-shadow 0.45s ease, transform 0.45s ease;
        }
        .hero-card:hover {
          box-shadow: 0 40px 100px -40px rgba(39,39,39,0.28), 0 12px 28px -12px rgba(39,39,39,0.10);
        }
        .hero-grid-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(${INK} 1px, transparent 1px);
          background-size: 32px 32px;
          background-position: 44px 36px;
          opacity: 0.035;
          -webkit-mask-image: radial-gradient(ellipse at 35% 45%, black 20%, transparent 70%);
          mask-image: radial-gradient(ellipse at 35% 45%, black 20%, transparent 70%);
        }
        .hero-inner {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 7fr 5fr;
          min-height: 0;
          align-items: stretch;
        }
        .hero-left {
          padding: 38px 44px 32px;
          display: flex; flex-direction: column; justify-content: space-between;
          gap: 22px;
          min-width: 0;
        }
        .hero-label { display: flex; flex-direction: column; gap: 14px; margin: 0 0 12px; max-width: 560px; }
        .hero-label-eyebrow {
          display: inline-flex; align-self: flex-start;
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-60);
          padding: 6px 10px;
          background: var(--bg-warm);
          border: 1px solid #e7e7e2;
          border-radius: 999px;
        }
        .hero-label-title { font-family: var(--font-body); font-weight: 500; font-size: 14.5px; line-height: 1.45; color: var(--ink-60); letter-spacing: -0.005em; }
        .hero-h1 {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: clamp(36px, 4.8vw, 56px); line-height: 1.02; letter-spacing: -0.03em;
          color: ${INK};
          margin: 0 0 22px;
        }
        .hero-h1-accent {
          background: linear-gradient(90deg, ${LIME}, ${LIME_DARK});
          -webkit-background-clip: text; background-clip: text;
          color: transparent;
          white-space: nowrap;
          display: inline-block;
        }

        .hero-ctas { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
        .hero-cta-primary {
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 48px; padding: 0 24px;
          background: ${INK}; color: #fff;
          font-family: var(--font-body); font-weight: 600; font-size: 14px;
          border-radius: 999px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 10px 24px -10px rgba(39,39,39,0.4);
        }
        .hero-cta-primary:hover { transform: translateY(-2px); background: #000; box-shadow: 0 16px 36px -12px rgba(39,39,39,0.5); }
        .hero-cta-primary:hover svg { transform: translateX(4px); }
        .hero-cta-primary svg { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .hero-cta-primary:active { transform: translateY(0) scale(0.98); }

        .hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding-top: 18px; border-top: 1px solid #ececea; }
        .hero-stat { transition: transform 0.3s ease, color 0.3s ease; }
        .hero-stat:hover { transform: translateY(-2px); }
        .hero-stat-value {
          font-family: var(--font-mono); font-weight: 500; font-size: 28px; line-height: 1; color: ${INK};
          margin: 0 0 6px;
          transition: color 0.3s ease;
        }
        .hero-stat:hover .hero-stat-value { color: ${LIME_DARK}; }
        .hero-stat-suffix { font-family: var(--font-body); font-weight: 600; font-size: 15px; color: #555; }
        .hero-stat-label {
          font-family: var(--font-body); font-weight: 500; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          color: #9a9a92; margin: 0;
        }

        .hero-right {
          position: relative;
          background: ${INK};
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }

        .hero-float { position: absolute; z-index: 3; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .hero-card:hover .hero-float--lime { transform: rotate(2deg) translateY(-3px); }
        .hero-card:hover .hero-float--glass { transform: translateY(-3px); }
        .hero-float--lime {
          top: 32px; right: 32px;
          background: ${LIME}; color: ${INK};
          padding: 12px 16px; border-radius: 10px;
          font-family: var(--font-body); font-weight: 700; font-size: 13px;
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
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.18em; text-transform: uppercase; color: ${LIME};
          margin: 0 0 6px;
        }
        .hero-float-body { font-family: var(--font-body); font-size: 13px; line-height: 1.5; color: rgba(255,255,255,0.85); margin: 0; }

        @media (min-width: 1280px) {
          .hero-h1 { font-size: 56px; }
        }
        /* Compact fit on ~13" laptops */
        @media (min-width: 1024px) and (max-height: 820px) {
          .hero-section { padding: 72px 0 24px !important; }
          .hero-left { padding: 28px 36px 22px; gap: 16px; }
          .hero-h1 { font-size: 42px; margin-bottom: 16px; }
          .hero-stat-value { font-size: 24px; }
          .hero-right { min-height: 0; }
        }
        @media (max-width: 1024px) {
          .hero-section { padding: 72px 0 28px !important; }
          .hero-inner { grid-template-columns: 1fr; min-height: 0; }
          .hero-left { padding: 32px 28px 28px; gap: 24px; }
          .hero-right { min-height: 260px; }
          .hero-h1 { font-size: 40px; margin-bottom: 18px; }
        }
        @media (max-width: 640px) {
          .hero-section { padding: 76px 0 24px !important; }
          .hero-card { border-radius: 22px; }
          .hero-left { padding: 24px 18px 22px; gap: 18px; }
          .hero-label { gap: 10px; margin-bottom: 12px; }
          .hero-label-eyebrow { font-size: 9px; padding: 5px 8px; }
          .hero-label-title { font-size: 13.5px; line-height: 1.4; }
          .hero-h1 { font-size: 30px; line-height: 1.05; margin-bottom: 18px; letter-spacing: -0.02em; }
          .hero-cta-primary { min-height: 48px; font-size: 14px; padding: 0 22px; }
          .hero-stats { grid-template-columns: repeat(3, 1fr); gap: 10px; padding-top: 18px; }
          .hero-stat-value { font-size: 22px; }
          .hero-stat-suffix { font-size: 13px; }
          .hero-stat-label { font-size: 10px; letter-spacing: 0.08em; }
          .hero-right { min-height: 220px; padding: 20px 0; }
          .hero-float--lime { top: 16px; right: 16px; font-size: 11px; padding: 8px 11px; }
          .hero-float--glass { display: none; }
        }
        @media (max-width: 380px) {
          .hero-h1 { font-size: 27px; }
          .hero-stat-value { font-size: 20px; }
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
        <div style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: 72, lineHeight: 1, letterSpacing: "-0.04em" }}>AI</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.32em", color: "rgba(255,255,255,0.55)", marginTop: 8 }}>
          ПРИКЛАДНЫЕ ИССЛЕДОВАНИЯ
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