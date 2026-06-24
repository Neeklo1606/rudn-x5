const nav = [
  { label: "Программа", href: "#program" },
  { label: "Треки", href: "#tracks" },
  { label: "Поступление", href: "#admission" },
  { label: "Преподаватели", href: "#experts" },
  { label: "Новости", href: "#news" },
  { label: "Заявка", href: "#apply" },
];

const legal = [
  {
    label: "Политика обработки персональных данных",
    href: "https://www.rudn.ru/personal-data-processing-and-protection-policy",
  },
  {
    label: "Согласие на обработку персональных данных",
    href: "https://www.rudn.ru/personal-data-processing-consent",
  },
  {
    label: "Сведения об образовательной организации",
    href: "https://www.rudn.ru/sveden",
  },
  {
    label: "Лицензия и аккредитация",
    href: "https://www.rudn.ru/sveden/document",
  },
  {
    label: "Локальные нормативные акты",
    href: "https://www.rudn.ru/sveden/document/localacts",
  },
  {
    label: "Правила приёма",
    href: "https://www.rudn.ru/education/admission",
  },
  {
    label: "Стоимость обучения",
    href: "https://www.rudn.ru/education/admission/cost",
  },
  {
    label: "Противодействие коррупции",
    href: "https://www.rudn.ru/anti-corruption",
  },
  {
    label: "Карта сайта РУДН",
    href: "https://www.rudn.ru/sitemap",
  },
];

const accent = "rgba(182,232,53,0.75)";
const muted = "rgba(255,255,255,0.55)";
const dim = "rgba(255,255,255,0.38)";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h4
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: 1.2,
        color: accent,
        textTransform: "uppercase",
        margin: "0 0 18px",
        fontWeight: 500,
      }}
    >
      {children}
    </h4>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#1A1F2E",
        color: muted,
        padding: "72px 0 28px",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1.1fr 1.4fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          {/* Brand + address */}
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  height: 28,
                  padding: "0 10px",
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: 12,
                  borderRadius: 4,
                }}
              >
                РУДН
              </span>
              <span
                style={{
                  height: 28,
                  padding: "0 10px",
                  background: "rgba(182,232,53,0.16)",
                  color: "#B6E835",
                  display: "inline-flex",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: 12,
                  borderRadius: 4,
                }}
              >
                X5 TECH
              </span>
            </div>
            <p
              style={{
                marginTop: 18,
                fontSize: 13.5,
                color: "rgba(255,255,255,0.5)",
                maxWidth: 260,
                lineHeight: 1.55,
              }}
            >
              Бакалавриат «Искусственный интеллект» – совместная программа
              РУДН и X5 Tech.
            </p>
            <address
              style={{
                marginTop: 22,
                fontStyle: "normal",
                fontSize: 13,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              117198, Москва,
              <br />
              ул. Миклухо-Маклая, д. 6
              <br />
              Факультет физико-математических
              <br />
              и естественных наук
            </address>
          </div>

          {/* Nav */}
          <div>
            <Label>Навигация</Label>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, padding: 0, margin: 0 }}>
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="ft-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", transition: "color 200ms" }}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <Label>Приёмная комиссия</Label>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, padding: 0, margin: 0 }}>
              <li>
                <a href="tel:+74954345300" className="ft-link" style={{ fontSize: 15, color: "#fff", fontWeight: 500 }}>
                  +7 (495) 434-53-00
                </a>
                <div style={{ fontSize: 12, color: dim, marginTop: 2 }}>пн–пт, 9:00–18:00 МСК</div>
              </li>
              <li>
                <a href="mailto:priem@rudn.ru" className="ft-link" style={{ fontSize: 15, color: "#fff", fontWeight: 500 }}>
                  priem@rudn.ru
                </a>
                <div style={{ fontSize: 12, color: dim, marginTop: 2 }}>вопросы абитуриентов</div>
              </li>
              <li>
                <a href="mailto:ai@rudn.ru" className="ft-link" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                  ai@rudn.ru
                </a>
                <div style={{ fontSize: 12, color: dim, marginTop: 2 }}>кураторы программы</div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <Label>Документы и правовая информация</Label>
            <ul
              style={{
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 20px",
                padding: 0,
                margin: 0,
              }}
            >
              {legal.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ft-link"
                    style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.45, display: "inline-block" }}
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 12.5, color: dim }}>
            © {new Date().getFullYear()} ФГАОУ ВО «Российский университет дружбы народов имени Патриса Лумумбы». Все права защищены.
          </span>
          <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
            <a
              href="https://www.rudn.ru/personal-data-processing-and-protection-policy"
              target="_blank"
              rel="noreferrer noopener"
              className="ft-link"
              style={{ fontSize: 12.5, color: dim }}
            >
              Политика конфиденциальности
            </a>
            <a
              href="https://www.rudn.ru/personal-data-processing-consent"
              target="_blank"
              rel="noreferrer noopener"
              className="ft-link"
              style={{ fontSize: 12.5, color: dim }}
            >
              Согласие на обработку ПД
            </a>
            <a
              href="https://www.rudn.ru/sveden"
              target="_blank"
              rel="noreferrer noopener"
              className="ft-link"
              style={{ fontSize: 12.5, color: dim }}
            >
              Сведения об организации
            </a>
          </div>
        </div>
      </div>
      <style>{`
        .ft-link { text-decoration: none; }
        .ft-link:hover { color: rgba(255,255,255,0.95) !important; }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}