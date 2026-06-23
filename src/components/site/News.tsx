import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { newsItems, type NewsItem } from "../../data/news";

export default function News() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<NewsItem | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-news-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  return (
    <section id="news" style={{ background: "#fff" }} className="section">
      <div className="container">
        <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, marginBottom: 36, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>НОВОСТИ</div>
            <h2 style={{ fontWeight: 700, fontSize: 44, color: "#272727", margin: 0 }} className="h2-big">Новости программы</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button aria-label="Назад" onClick={() => scrollBy(-1)} className="news-nav-btn"><ChevronLeft size={20} /></button>
            <button aria-label="Вперёд" onClick={() => scrollBy(1)} className="news-nav-btn"><ChevronRight size={20} /></button>
            <Link to="/news" className="all-news-link">Все новости →</Link>
          </div>
        </div>

        <div ref={trackRef} className="news-track" style={{ display: "flex", gap: 24, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 12, scrollPaddingLeft: 4 }}>
          {newsItems.map((item, i) => (
            <motion.button
              type="button"
              data-news-card
              key={item.id}
              onClick={() => setActive(item)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="news-card"
              style={{
                flex: "0 0 360px",
                scrollSnapAlign: "start",
                textAlign: "left",
                background: "#fff",
                borderRadius: 22,
                overflow: "hidden",
                border: "1px solid rgba(39,39,39,0.06)",
                boxShadow: "var(--shadow-card)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                <img src={item.img} alt={item.title} loading="lazy" className="news-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 600ms ease" }} />
                <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,0.92)", color: "#272727", backdropFilter: "blur(6px)" }}>{item.cat}</span>
              </div>
              <div style={{ padding: "22px 24px 26px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3", marginBottom: 10 }}>{item.date}</div>
                <h3 style={{ fontWeight: 600, fontSize: 19, color: "#272727", lineHeight: 1.3, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(20,20,28,0.55)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          >
            <motion.article
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              style={{ background: "#fff", borderRadius: 24, maxWidth: 760, width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.25)", position: "relative" }}
            >
              <button aria-label="Закрыть" onClick={() => setActive(null)} style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.92)", border: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}>
                <X size={18} />
              </button>
              <div style={{ height: 320, overflow: "hidden" }}>
                <img src={active.img} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "32px 40px 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, padding: "5px 11px", borderRadius: 999, background: "rgba(167,159,255,0.14)", color: "#7A6FFF" }}>{active.cat}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3" }}>{active.date}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 30, color: "#272727", lineHeight: 1.2, margin: "0 0 20px" }}>{active.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {active.body.map((p, i) => (
                    <p key={i} style={{ fontSize: 16, lineHeight: 1.65, color: "#3A3A3A", margin: 0, fontFamily: "var(--font-serif, Georgia, serif)" }}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .news-track::-webkit-scrollbar { height: 6px; }
        .news-track::-webkit-scrollbar-thumb { background: rgba(39,39,39,0.12); border-radius: 99px; }
        .news-track { scrollbar-width: thin; }
        .news-card:hover { box-shadow: var(--shadow-card-hover); border-color: rgba(39,39,39,0.12) !important; }
        .news-card:hover .news-img { transform: scale(1.06); }
        .news-nav-btn { width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(39,39,39,0.14); background: #fff; color: #272727; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all 200ms ease; }
        .news-nav-btn:hover { background: #272727; color: #fff; border-color: #272727; }
        .all-news-link { margin-left: 8px; font-weight: 600; font-size: 14px; color: #272727; border-bottom: 1px solid rgba(39,39,39,0.25); padding-bottom: 2px; }
        .all-news-link:hover { color: #7A6FFF; border-color: #7A6FFF; }
        @media (max-width: 700px) {
          .news-card { flex-basis: 82vw !important; }
        }
      `}</style>
    </section>
  );
}