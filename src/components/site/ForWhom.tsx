import { Sigma, Briefcase, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { Icon: Sigma, title: "Дружишь с логикой", desc: "Математика здесь не барьер, а понятный инструмент для создания алгоритмов будущего." },
  { Icon: Briefcase, title: "Мечтаешь об IT", desc: "Получай реальный опыт в X5 Tech и строй карьеру в крупнейшем ритейле с первого курса." },
  { Icon: Zap, title: "Любишь драйв", desc: "Интенсивная программа для тех, кто готов расти быстро и осваивать топовые технологии." },
  { Icon: Users, title: "Ищешь своих", desc: "Попадай в комьюнити амбициозных студентов и опытных менторов из индустрии." },
];

export default function ForWhom() {
  return (
    <section style={{ background: "#F1F1F1", padding: "48px 0 32px" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            maxWidth: 1024,
            marginInline: "auto",
            background: "#FFFFFF",
            border: "1px solid #F0F0F0",
            borderRadius: 28,
            padding: "28px 36px 32px",
            boxShadow: "0 2px 24px rgba(0,0,0,0.04)",
          }}
          className="fw-card"
        >
          <div className="fw-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 2, color: "#A79FFF", textTransform: "uppercase" }}>
              // ДЛЯ КОГО
            </div>
            <div className="fw-ticker" style={{ background: "#B6E835", borderRadius: 999, padding: "6px 14px", overflow: "hidden", flexShrink: 0 }}>
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700, color: "#272727", letterSpacing: 0.5, whiteSpace: "nowrap" }}
              >
                RUDN × X5 TECH • AI BACHELOR
              </motion.div>
            </div>
          </div>

          <div className="fw-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {items.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
                whileHover={{ y: -2 }}
                className="fw-item"
                style={{
                  background: "rgba(241,241,241,0.55)",
                  border: "1px solid transparent",
                  borderRadius: 18,
                  padding: 20,
                  transition: "background 240ms ease, border-color 240ms ease, box-shadow 240ms ease",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#B6E835", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon size={20} color="#272727" strokeWidth={2} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, color: "#272727", marginBottom: 6 }}>{title}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#6B6B6B" }}>{desc}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B6E835" }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#A79FFF", opacity: 0.4 }} />
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6B6B6B", opacity: 0.2 }} />
          </div>
        </motion.div>
      </div>
      <style>{`
        .fw-item:hover { background: #FFFFFF !important; border-color: #B6E835 !important; box-shadow: 0 10px 30px rgba(182,232,53,0.08); }
        @media (max-width: 768px) {
          .fw-card { padding: 20px 18px 22px !important; border-radius: 22px !important; }
          .fw-header { flex-direction: column; align-items: flex-start !important; }
          .fw-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .fw-ticker { display: none !important; }
        }
      `}</style>
    </section>
  );
}