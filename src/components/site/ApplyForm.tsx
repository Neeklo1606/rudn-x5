import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type Fields = {
  first: string;
  last: string;
  email: string;
  phone: string;
  comment: string;
  agree: boolean;
};

type FieldErrors = Partial<Record<keyof Omit<Fields, "agree">, string>> & { agree?: string };

const RUDN_PRIVACY_URL = "https://www.rudn.ru/personal-data-processing-and-protection-policy";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

export default function ApplyForm() {
  const [f, setF] = useState<Fields>({
    first: "",
    last: "",
    email: "",
    phone: "",
    comment: "",
    agree: false,
  });
  const [err, setErr] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [done, setDone] = useState(false);

  const markTouched = (key: keyof Fields) => setTouched((t) => ({ ...t, [key]: true }));

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!f.first.trim()) next.first = "Укажите имя";
    if (!f.last.trim()) next.last = "Укажите фамилию";
    if (!f.email.trim()) {
      next.email = "Укажите почту";
    } else if (!emailRe.test(f.email.trim())) {
      next.email = "Проверьте формат почты";
    }
    if (!f.phone.trim()) {
      next.phone = "Укажите телефон";
    } else if (!validatePhone(f.phone)) {
      next.phone = "Проверьте номер телефона";
    }
    if (!f.agree) next.agree = "Необходимо согласие на обработку персональных данных";
    return next;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErr(next);
    setTouched({
      first: true,
      last: true,
      email: true,
      phone: true,
      comment: true,
      agree: true,
    });
    if (Object.keys(next).length) return;
    console.log("application", f);
    setDone(true);
  };

  const inputBase = {
    width: "100%",
    border: "2px solid #E0E0E0",
    borderRadius: 12,
    padding: "0 16px",
    fontSize: 15,
    color: "#272727",
    background: "#fff",
    outline: "none",
    transition: "all 200ms ease",
  } as const;

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    color: "#6B6B6B",
    letterSpacing: 0.5,
    textTransform: "uppercase" as const,
    marginBottom: 6,
  };

  const errorStyle = {
    fontSize: 12,
    color: "#E9423A",
    marginTop: 4,
    minHeight: 14,
  } as const;

  const renderTextInput = (
    key: keyof Omit<Fields, "agree" | "comment">,
    label: string,
    placeholder: string,
    type = "text",
  ) => {
    const hasError = !!(touched[key] && err[key]);
    return (
      <div key={key}>
        <label style={labelStyle}>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={f[key]}
          onChange={(e) => {
            setF((s) => ({ ...s, [key]: e.target.value }));
            if (err[key]) setErr((ePrev) => ({ ...ePrev, [key]: undefined }));
          }}
          onBlur={() => markTouched(key)}
          className="apply-input"
          style={{
            ...inputBase,
            height: 50,
            borderColor: hasError ? "#E9423A" : "#E0E0E0",
          }}
        />
        <div style={errorStyle}>{hasError ? err[key] : ""}</div>
      </div>
    );
  };

  const commentError = !!(touched.comment && err.comment);

  return (
    <section id="apply" style={{ background: "#F1F1F1", padding: "64px 0 72px" }}>
      <div className="container">
        <div
          style={{
            background: "#fff",
            borderRadius: 26,
            padding: "40px 44px",
            maxWidth: 600,
            margin: "0 auto",
            boxShadow: "var(--shadow-card)",
            position: "relative",
          }}
          className="form-card"
        >
          <span
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 4,
              background: "#B6E835",
              borderRadius: "0 0 4px 4px",
            }}
          />
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2
                  style={{
                    fontWeight: 700,
                    fontSize: 26,
                    color: "#272727",
                    textAlign: "center",
                    marginBottom: 8,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Оставь заявку – расскажем, как поступить.
                </h2>
                <p
                  style={{
                    fontSize: 14.5,
                    color: "#6B6B6B",
                    textAlign: "center",
                    marginBottom: 26,
                  }}
                >
                  Менеджер приёмной комиссии свяжется с тобой в течение дня.
                </p>
                <form
                  onSubmit={submit}
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 14,
                    }}
                    className="form-name-grid"
                  >
                    {renderTextInput("first", "Имя", "Иван")}
                    {renderTextInput("last", "Фамилия", "Иванов")}
                  </div>
                  {renderTextInput("email", "Почта", "ivan@example.com", "email")}
                  {renderTextInput("phone", "Телефон", "+7 (999) 123-45-67", "tel")}

                  <div>
                    <label style={labelStyle}>Комментарий / вопрос</label>
                    <textarea
                      placeholder="Расскажите, что важно узнать (необязательно)"
                      value={f.comment}
                      onChange={(e) => setF((s) => ({ ...s, comment: e.target.value }))}
                      onBlur={() => markTouched("comment")}
                      rows={3}
                      className="apply-input"
                      style={{
                        ...inputBase,
                        padding: "12px 16px",
                        resize: "vertical",
                        minHeight: 88,
                        borderColor: commentError ? "#E9423A" : "#E0E0E0",
                      }}
                    />
                  </div>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      cursor: "pointer",
                      marginTop: 4,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        border: `2px solid ${f.agree ? "#B6E835" : "#E0E0E0"}`,
                        borderRadius: 6,
                        background: f.agree ? "#B6E835" : "#fff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {f.agree && <Check size={14} color="#fff" strokeWidth={3} />}
                    </span>
                    <input
                      type="checkbox"
                      checked={f.agree}
                      onChange={(e) => {
                        setF((s) => ({ ...s, agree: e.target.checked }));
                        if (err.agree) setErr((ePrev) => ({ ...ePrev, agree: undefined }));
                      }}
                      style={{ display: "none" }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        color: touched.agree && err.agree ? "#E9423A" : "#6B6B6B",
                        marginLeft: 12,
                        lineHeight: 1.5,
                      }}
                    >
                      Я согласен(-на) на{" "}
                      <a
                        href={RUDN_PRIVACY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#0066A1", textDecoration: "underline" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        обработку персональных данных
                      </a>
                      {" "}в соответствии с политикой РУДН
                    </span>
                  </label>
                  {touched.agree && err.agree && (
                    <div style={{ ...errorStyle, marginTop: -12, marginLeft: 34 }}>{err.agree}</div>
                  )}

                  <button
                    type="submit"
                    className="submit-btn"
                    style={{
                      marginTop: 6,
                      width: "100%",
                      height: 52,
                      background: "#B6E835",
                      color: "#272727",
                      border: "none",
                      borderRadius: 12,
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: "pointer",
                      transition: "all 250ms ease",
                    }}
                  >
                    Отправить заявку
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                style={{ textAlign: "center", padding: "32px 0" }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "#B6E835",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={36} color="#fff" strokeWidth={3} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 24, color: "#272727", marginTop: 24 }}>
                  Заявка принята!
                </h3>
                <p style={{ fontSize: 16, color: "#6B6B6B", marginTop: 8 }}>
                  Мы свяжемся с тобой в ближайшее время.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        .apply-input:focus { border-color: #B6E835 !important; box-shadow: 0 0 0 4px rgba(182,232,53,0.12); }
        .submit-btn:hover { background: #D6F360 !important; transform: scale(1.01); box-shadow: var(--shadow-glow-lime); }
        @media (max-width: 768px) {
          .form-card { padding: 26px 20px !important; border-radius: 22px !important; }
          .form-name-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
