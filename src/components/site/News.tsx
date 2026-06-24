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
    <section id="news" style={{ background: "#fff" }} className="section news-section">
      <div className="container">
        <div className="news-header">
          <div className="news-header-text">
            <div className="news-eyebrow">НОВОСТИ</div>
            <h2 className="h2-big news-h2">Новости программы</h2>
          </div>
          <div className="news-controls">
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
                scrollSnapAlign: "start",
                textAlign: "left",
                background: "#fff",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(39,39,39,0.06)",
                boxShadow: "var(--shadow-card)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <div className="news-img-wrap">
                <img src={item.img} alt={item.title} loading="lazy" className="news-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 600ms ease" }} />
                <span style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,0.92)", color: "#272727", backdropFilter: "blur(6px)" }}>{item.cat}</span>
              </div>
              <div className="news-body">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3", marginBottom: 10 }}>{item.date}</div>
                <h3 className="news-title">{item.title}</h3>
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
            className="news-modal-bg"
            style={{ position: "fixed", inset: 0, background: "rgba(20,20,28,0.55)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
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
              className="news-modal"
              style={{ background: "#fff", borderRadius: 22, maxWidth: 760, width: "100%", maxHeight: "92vh", overflow: "auto", boxShadow: "0 30px 80px rgba(0,0,0,0.25)", position: "relative" }}
            >
              <button aria-label="Закрыть" onClick={() => setActive(null)} style={{ position: "absolute", top: 16, right: 16, width: 40, height: 40, borderRadius: 999, background: "rgba(255,255,255,0.92)", border: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}>
                <X size={18} />
              </button>
              <div className="news-modal-img">
                <img src={active.img} alt={active.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div className="news-modal-body">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: 0.5, padding: "5px 11px", borderRadius: 999, background: "rgba(167,159,255,0.14)", color: "#7A6FFF" }}>{active.cat}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#A3A3A3" }}>{active.date}</span>
                </div>
                <h3 className="news-modal-title">{active.title}</h3>
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
        .news-header { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 28px; flex-wrap: wrap; }
        .news-header-text { min-width: 0; }
        .news-eyebrow { font-family: var(--font-mono); font-size: 11px; letter-spacing: 1.5px; color: #A79FFF; text-transform: uppercase; margin-bottom: 10px; }
        .news-h2 { font-weight: 700; font-size: 40px; color: #272727; margin: 0; letter-spacing: -0.02em; }
        .news-controls { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .news-card { flex: 0 0 340px; }
        .news-img-wrap { position: relative; height: 200px; overflow: hidden; }
        .news-body { padding: 18px 20px 22px; }
        .news-title { font-weight: 600; font-size: 17px; color: #272727; line-height: 1.35; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .news-modal-img { height: 280px; overflow: hidden; }
        .news-modal-body { padding: 28px 36px 36px; }
        .news-modal-title { font-weight: 700; font-size: 28px; color: #272727; line-height: 1.2; margin: 0 0 18px; letter-spacing: -0.01em; }
        .news-track::-webkit-scrollbar { height: 6px; }
        .news-track::-webkit-scrollbar-thumb { background: rgba(39,39,39,0.12); border-radius: 99px; }
        .news-track { scrollbar-width: thin; }
        .news-card:hover { box-shadow: var(--shadow-card-hover); border-color: rgba(39,39,39,0.12) !important; }
        .news-card:hover .news-img { transform: scale(1.06); }
        .news-nav-btn { width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(39,39,39,0.14); background: #fff; color: #272727; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; transition: all 200ms ease; }
        .news-nav-btn:hover { background: #272727; color: #fff; border-color: #272727; }
        .all-news-link { margin-left: 8px; font-weight: 600; font-size: 14px; color: #272727; border-bottom: 1px solid rgba(39,39,39,0.25); padding-bottom: 2px; }
        .all-news-link:hover { color: #7A6FFF; border-color: #7A6FFF; }
        @media (max-width: 1024px) {
          .news-modal-img { height: 240px; }
          .news-modal-body { padding: 24px 28px 28px; }
        }
        @media (max-width: 700px) {
          .news-card { flex: 0 0 82vw !important; }
          .news-img-wrap { height: 180px; }
          .news-modal-img { height: 200px; }
          .news-modal-body { padding: 22px 20px 26px; }
          .news-modal-title { font-size: 22px; }
          .news-controls { width: 100%; justify-content: flex-end; }
        }
      `}</style>
    </section>
  );
}