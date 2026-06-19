import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const controls = animate(mv, to, { duration: 0.8, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return controls.stop;
  }, [to, mv]);
  return <span>{val}{suffix}</span>;
}

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section ref={ref} id="hero" className="hero-section" style={{ background: "#fff", padding: "56px 0 72px", marginTop: 72 }}>
      <div className="container">
        <div className="hero-grid" style={{ display: "flex", gap: 48, alignItems: "stretch" }}>
          <div className="hero-left" style={{ flex: "0 0 calc(55% - 24px)", display: "flex", flexDirection: "column", gap: 24 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              {["РУДН", "X5 TECH", "МИНЦИФРЫ", "АНАЛИТИЧЕСКИЙ ЦЕНТР"].map((t, i) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, color: "#A3A3A3" }}>{t}</span>
                  {i < 3 && <span style={{ width: 2, height: 2, background: "#A3A3A3", borderRadius: "50%" }} />}
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.12 }}>
              <span style={{ display: "inline-flex", background: "var(--lavender-soft)", color: "#A79FFF", padding: "6px 14px", borderRadius: 999, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 0.8 }}>
                Бакалавриат · Очно · 4 года
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.24 }}
              style={{ fontWeight: 800, fontSize: 52, lineHeight: 1.05, letterSpacing: -1, color: "#272727", maxWidth: 620 }} className="hero-h1">
              Изучай <span className="ai-accent" style={{ color: "#B6E835", borderBottom: "2px solid #B6E835", paddingBottom: 2 }}>ИИ</span>. Входи в профессию вместе с X5 Tech.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.36 }}
              style={{ fontSize: 16, lineHeight: 1.6, color: "#6B6B6B", maxWidth: 520 }}>
              Математика, программирование и реальные ИИ-задачи в партнёрстве с X5 Tech — работай с первого курса над проектами, которые приносят бизнесу измеримый результат.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.48 }}
              className="hero-buttons" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#apply" className="btn-primary" style={{ background: "#B6E835", color: "#272727", fontWeight: 600, fontSize: 15, padding: "14px 30px", borderRadius: 999, border: "none", cursor: "pointer", transition: "all 250ms ease", display: "inline-block" }}>
                Подать заявку
              </a>
              <a href="#apply" className="btn-outline" style={{ background: "transparent", border: "2px solid #272727", color: "#272727", fontWeight: 600, fontSize: 15, padding: "12px 28px", borderRadius: 999, cursor: "pointer", transition: "all 250ms ease", display: "inline-block" }}>
                Проконсультироваться
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.6 }}
              className="stats-row" style={{ display: "flex", gap: 40, flexWrap: "wrap", marginTop: 4 }}>
              {[
                { n: 25, s: "", l: "бюджетных мест" },
                { n: 80, s: "", l: "по договору" },
                { n: 4, s: " года", l: "бакалавриат" },
              ].map((st) => (
                <div key={st.l}>
                  <div style={{ fontWeight: 700, fontSize: 30, color: "#B6E835", lineHeight: 1 }}>
                    {inView ? <Counter to={st.n} suffix={st.s} /> : 0}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#A3A3A3", textTransform: "lowercase", letterSpacing: 0.5, marginTop: 6 }}>{st.l}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.3 }}
            style={{ flex: "0 0 calc(45% - 24px)", background: "#272727", borderRadius: 28, padding: "36px 32px", position: "relative", boxShadow: "var(--shadow-dark-card)", overflow: "hidden" }} className="hero-dark-card">
            <div style={{ position: "absolute", top: 32, left: 32, width: 48, height: 3, background: "#B6E835" }} />
            <h3 style={{ fontWeight: 700, fontSize: 22, lineHeight: 1.3, color: "#fff", marginTop: 36 }}>
              AI-практика начинается на 1 курсе, а не после диплома
            </h3>
            <ul style={{ listStyle: "none", marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              {["Реальные проекты X5 Tech с первого семестра", "Оплачиваемая стажировка в X5 Tech со 2 курса", "Кейсы в портфолио вместо абстрактных задач"].map((t) => (
                <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", border: "2px solid #B6E835", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={12} color="#B6E835" strokeWidth={3} />
                  </span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "rgba(255,255,255,0.85)" }}>{t}</span>
                </li>
              ))}
            </ul>
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(90deg, #B6E835, #A79FFF)", borderRadius: "0 0 28px 28px" }} />
          </motion.div>
        </div>
      </div>
      <style>{`
        .btn-primary:hover { background: #D6F360 !important; transform: scale(1.02); box-shadow: var(--shadow-glow-lime); }
        .btn-outline:hover { background: #272727 !important; color: #fff !important; }
        @media (min-height: 720px) and (min-width: 1280px) {
          .hero-section { padding: 64px 0 80px !important; }
        }
        @media (max-width: 1024px) {
          .hero-grid { flex-direction: column; gap: 48px; }
          .hero-grid > div { flex: 1 1 auto !important; width: 100%; }
          .hero-h1 { font-size: 48px !important; }
        }
        @media (max-width: 768px) {
          .hero-h1 { font-size: 38px !important; }
          .hero-dark-card { padding: 32px 24px !important; border-radius: 24px !important; }
          .hero-buttons { flex-direction: column; }
          .hero-buttons a { width: 100%; text-align: center; }
          .stats-row { display: grid !important; grid-template-columns: 1fr 1fr; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .hero-h1 { font-size: 32px !important; letter-spacing: -0.5px !important; }
        }
      `}</style>
    </section>
  );
}