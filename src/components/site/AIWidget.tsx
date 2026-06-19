import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "ai" | "user"; text: string };

export default function AIWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [val, setVal] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [msgs]);

  const send = () => {
    if (!val.trim()) return;
    const userMsg: Msg = { role: "user", text: val };
    setMsgs((m) => [...m, userMsg]);
    setVal("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: "Спасибо за вопрос! Я пока учусь... Оставь заявку на сайте, и менеджер приёмной комиссии свяжется с тобой и ответит на все вопросы." }]);
    }, 1200);
  };

  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999 }} className="ai-widget">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            style={{
              width: 380,
              height: 520,
              background: "#fff",
              borderRadius: 24,
              boxShadow: "var(--shadow-floating)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              transformOrigin: "bottom right",
              marginBottom: 16,
            }}
            className="chat-panel"
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #EBEBEB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 600, fontSize: 16, color: "#272727" }}>AI-ассистент программы</span>
              <button onClick={() => setOpen(false)} style={{ width: 32, height: 32, border: "none", background: "transparent", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Закрыть">
                <X size={16} color="#A3A3A3" />
              </button>
            </div>
            <div ref={listRef} style={{ flex: 1, overflowY: "auto", padding: 24, background: "#FAFAFA", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#B6E835", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>AI</div>
              </div>
              <div style={{ alignSelf: "flex-start", maxWidth: 260, background: "#fff", padding: "14px 18px", borderRadius: "18px 18px 18px 4px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", fontSize: 14, color: "#6B6B6B", lineHeight: 1.5 }}>
                Привет! Я AI-ассистент программы. Спроси меня о поступлении, программе, преподавателях или партнёрстве с X5 Tech.
              </div>
              {msgs.map((m, i) => (
                <div key={i} style={m.role === "user" ? { alignSelf: "flex-end", maxWidth: 260, background: "#B6E835", color: "#272727", padding: "12px 16px", borderRadius: "18px 18px 4px 18px", fontSize: 14 } : { alignSelf: "flex-start", maxWidth: 260, background: "#fff", color: "#6B6B6B", padding: "14px 18px", borderRadius: "18px 18px 18px 4px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", fontSize: 14, lineHeight: 1.5 }}>
                  {m.text}
                </div>
              ))}
            </div>
            <div style={{ padding: 16, borderTop: "1px solid #EBEBEB", display: "flex", gap: 10 }}>
              <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Напиши сообщение..."
                style={{ flex: 1, height: 48, border: "2px solid #E0E0E0", borderRadius: 14, padding: "0 16px", fontSize: 14, background: "#F1F1F1", outline: "none" }}
              />
              <button onClick={send} style={{ width: 48, height: 48, borderRadius: "50%", background: "#B6E835", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Отправить">
                <Send size={20} color="#fff" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!open && (
        <button
          aria-label="Открыть чат"
          onClick={() => setOpen(true)}
          className="chat-trigger"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#B6E835",
            border: "none",
            cursor: "pointer",
            boxShadow: "var(--shadow-floating)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MessageCircle size={24} color="#fff" />
        </button>
      )}
      <style>{`
        @media (max-width: 768px) {
          .ai-widget { bottom: 20px !important; right: 20px !important; }
          .chat-panel { width: calc(100vw - 40px) !important; height: 480px !important; }
        }
        .chat-trigger:hover { transform: scale(1.04); }
      `}</style>
    </div>
  );
}