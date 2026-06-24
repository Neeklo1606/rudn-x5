import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Программа", href: "#program" },
  { label: "Преподаватели", href: "#experts" },
  { label: "Поступление", href: "#admission" },
  { label: "Новости", href: "#news" },
];

function LogoBlock({ text }: { text: string }) {
  return (
    <div
      className="header-logo-block"
      style={{
        width: 100,
        height: 40,
        background: "#272727",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: 0.5,
        borderRadius: 6,
      }}
    >
      {text}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 100;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 72,
        background: scrolled ? "rgba(247,249,240,0.94)" : "rgba(247,249,240,0.6)",
        backdropFilter: "saturate(180%) blur(14px)",
        WebkitBackdropFilter: "saturate(180%) blur(14px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        transition: "background-color 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease",
      }}
    >
      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <LogoBlock text="РУДН" />
          <LogoBlock text="X5 TECH" />
        </Link>

        <nav
          className="desktop-nav"
          style={{
            display: "flex",
            gap: 40,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                letterSpacing: 0.3,
                color: "#6B6B6B",
                textTransform: "none",
                position: "relative",
                paddingBottom: 4,
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="#apply"
            className="cta-pill desktop-cta"
            style={{
              background: "#B6E835",
              color: "#272727",
              fontWeight: 600,
              fontSize: 14,
              padding: "10px 24px",
              height: 44,
              borderRadius: 999,
              display: "inline-flex",
              alignItems: "center",
              transition: "all 200ms ease",
            }}
          >
            Подать заявку
          </a>
          <button
            className="hamburger"
            aria-label="Меню"
            onClick={() => setOpen(true)}
            style={{
              width: 44,
              height: 44,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ width: 24, height: 2, background: "#272727" }} />
            <span style={{ width: 24, height: 2, background: "#272727" }} />
            <span style={{ width: 24, height: 2, background: "#272727" }} />
          </button>
        </div>
      </div>

      {open && (
          <div
            className="mobile-menu-panel"
            style={{
              position: "fixed",
              inset: 0,
              background: "#fff",
              zIndex: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <button
              aria-label="Закрыть"
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 48,
                height: 48,
                background: "transparent",
                border: "none",
                fontSize: 28,
                cursor: "pointer",
              }}
            >
              ×
            </button>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ fontSize: 20, fontWeight: 600, color: "#272727" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0%;
          height: 2px;
          background: #B6E835;
          transition: width 200ms ease;
        }
        .nav-link:hover { color: #272727; }
        .nav-link:hover::after { width: 100%; }
        .cta-pill:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 16px rgba(182,232,53,0.3);
        }
        .mobile-menu-panel { animation: menu-in 180ms ease-out; }
        @keyframes menu-in { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .header-logo-block { width: 78px !important; height: 34px !important; font-size: 12px !important; }
        }
      `}</style>
    </header>
  );
}