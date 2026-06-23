import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        background: "#272727",
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
        marginTop: 72,
      }}
    >
      <div className="hero-bg-glow" aria-hidden="true" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-grid" style={{ display: "flex", gap: 48, alignItems: "stretch" }}>
          <motion.div
            className="hero-left"
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ flex: "0 0 calc(55% - 24px)", display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}
          >
            <motion.div variants={fadeUp} style={{ fontFamily: "Inter, sans-serif", fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em" }}>
              Образовательная программа
            </motion.div>

            <motion.div variants={fadeUp} style={{ fontFamily: "Inter, sans-serif", fontSize: 20, fontWeight: 400, color: "#B6E835", marginTop: -8 }}>
              Искусственный интеллект и разработка
            </motion.div>

            <motion.div variants={fadeUp} style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>
              x5 • rudn • минцифры • аналитический центр
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="hero-h1"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 56, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#FFFFFF", margin: 0 }}
            >
              Изучай ИИ, входи в профессию
              <br />
              <span style={{ color: "#B6E835" }}>вместе с X5 Tech</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="hero-desc"
              style={{ fontFamily: "Inter, sans-serif", fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 480, marginTop: 8 }}
            >
              Единственная в России программа бакалавриата, где AI-практика начинается на 1 курсе в реальной IT-компании. Не экскурсии — работа с боевыми ML-моделями.
            </motion.p>

            <motion.div variants={fadeUp} style={{ marginTop: 8 }}>
              <a
                href="#apply"
                className="hero-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  minHeight: 44,
                  background: "#B6E835",
                  color: "#272727",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  padding: "16px 36px",
                  borderRadius: 14,
                  transition: "transform 0.2s ease",
                }}
              >
                Отправить заявку
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="hero-stats" style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 8 }}>
              {["25 бюджетных мест", "80 по договору", "4 года — бакалавриат"].map((t) => (
                <span
                  key={t}
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "#FFFFFF",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 14,
                    padding: "12px 20px",
                    borderRadius: 12,
                    minHeight: 44,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-dark-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            style={{
              flex: "0 0 calc(45% - 24px)",
              position: "relative",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(182,232,53,0.15)",
              borderRadius: 24,
              padding: 28,
              backdropFilter: "blur(20px)",
              minWidth: 0,
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#B6E835", borderRadius: "24px 0 0 24px" }} />
            <div style={{ fontSize: 24, lineHeight: 1 }}>🧠</div>
            <h3 style={{ fontFamily: "Inter, sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: "#FFFFFF", marginTop: 16 }}>
              AI-практика начинается на 1 курсе, а не после диплома
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", marginTop: 16 }}>
              С первого семестра работаете с реальными ML-моделями X5 Tech. Никаких «экскурсий раз в год» — полноценная инженерная практика.
            </p>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-bg-glow {
          position: absolute; inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(182,232,53,0.10), transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(167,159,255,0.08), transparent 50%);
          opacity: 0.15;
          mix-blend-mode: screen;
          animation: heroPulse 6s ease-in-out infinite;
        }
        @keyframes heroPulse {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.18; }
        }
        .hero-cta:hover { transform: scale(1.03); }
        @media (max-width: 1024px) {
          .hero-grid { flex-direction: column; gap: 32px; }
          .hero-grid > div { flex: 1 1 auto !important; width: 100%; }
          .hero-section { padding: 60px 0 !important; }
          .hero-h1 { font-size: 44px !important; }
        }
        @media (max-width: 767px) {
          .hero-section { padding: 40px 0 !important; }
          .hero-h1 { font-size: 32px !important; }
          .hero-desc { font-size: 15px !important; }
        }
      `}</style>
    </section>
  );
}