import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type Fields = { first: string; last: string; email: string; phone: string; tg: string; agree: boolean };

export default function ApplyForm() {
  const [f, setF] = useState<Fields>({ first: "", last: "", email: "", phone: "", tg: "", agree: false });
  const [err, setErr] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof Fields, boolean>> = {};
    if (!f.first.trim()) next.first = true;
    if (!f.last.trim()) next.last = true;
    if (!f.email.trim()) next.email = true;
    setErr(next);
    if (Object.keys(next).length) return;
    console.log("application", f);
    setDone(true);
  };

  const fld = (key: keyof Omit<Fields, "agree">, label: string, placeholder: string, type = "text") => (
    <div key={key}>
      <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 11, color: "#A3A3A3", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={f[key]}
        onChange={(e) => setF({ ...f, [key]: e.target.value })}
        className="apply-input"
        style={{ height: 56, width: "100%", border: `2px solid ${err[key] ? "#FF4D4D" : "#E0E0E0"}`, borderRadius: 14, padding: "0 18px", fontSize: 16, color: "#272727", background: "#fff", outline: "none", transition: "all 200ms ease" }}
      />
    </div>
  );

  return (
    <section id="apply" style={{ background: "#F1F1F1", padding: "96px 0" }}>
      <div className="container">
        <div
          style={{ background: "#fff", borderRadius: 32, padding: 56, maxWidth: 640, margin: "0 auto", boxShadow: "var(--shadow-card)", position: "relative" }} className="form-card">
          <span style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 4, background: "#B6E835", borderRadius: "0 0 4px 4px" }} />
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 style={{ fontWeight: 700, fontSize: 30, color: "#272727", textAlign: "center", marginBottom: 12 }}>Оставь заявку — расскажем, как поступить.</h2>
                <p style={{ fontSize: 16, color: "#6B6B6B", textAlign: "center", marginBottom: 40 }}>Менеджер приёмной комиссии свяжется с тобой в течение дня.</p>
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {fld("first", "Имя", "Иван")}
                  {fld("last", "Фамилия", "Иванов")}
                  {fld("email", "Email", "ivan@example.com", "email")}
                  {fld("phone", "Телефон", "+7 999 123-45-67", "tel")}
                  {fld("tg", "Telegram", "@username")}
                  <label style={{ display: "flex", alignItems: "center", cursor: "pointer", marginTop: 8 }}>
                    <span onClick={() => setF({ ...f, agree: !f.agree })} style={{ width: 20, height: 20, border: `2px solid ${f.agree ? "#B6E835" : "#E0E0E0"}`, borderRadius: 4, background: f.agree ? "#B6E835" : "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {f.agree && <Check size={14} color="#fff" strokeWidth={3} />}
                    </span>
                    <input type="checkbox" checked={f.agree} onChange={(e) => setF({ ...f, agree: e.target.checked })} style={{ display: "none" }} />
                    <span style={{ fontSize: 14, color: "#6B6B6B", marginLeft: 12 }}>Согласен на обработку персональных данных</span>
                  </label>
                  <button type="submit" disabled={!f.agree} className="submit-btn" style={{ marginTop: 8, width: "100%", height: 56, background: "#B6E835", color: "#272727", border: "none", borderRadius: 14, fontWeight: 600, fontSize: 16, cursor: f.agree ? "pointer" : "not-allowed", opacity: f.agree ? 1 : 0.5, transition: "all 250ms ease" }}>
                    Отправить заявку
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#B6E835", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={36} color="#fff" strokeWidth={3} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 24, color: "#272727", marginTop: 24 }}>Заявка принята!</h3>
                <p style={{ fontSize: 16, color: "#6B6B6B", marginTop: 8 }}>Мы свяжемся с тобой в ближайшее время.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        .apply-input:focus { border-color: #B6E835 !important; box-shadow: 0 0 0 4px rgba(182,232,53,0.12); }
        .submit-btn:hover:not(:disabled) { background: #D6F360 !important; transform: scale(1.01); box-shadow: var(--shadow-glow-lime); }
        @media (max-width: 768px) {
          .form-card { padding: 32px 24px !important; }
        }
      `}</style>
    </section>
  );
}