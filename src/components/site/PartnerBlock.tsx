import { ShoppingCart, Sparkle, Code2, Eye } from "lucide-react";

function BigCounter({ to }: { to: number }) {
  return <span>{to.toLocaleString("ru-RU")}+</span>;
}

const directions = [
  { Icon: ShoppingCart, title: "ML в ритейле", desc: "Прогнозирование спроса, персонализация, управление цепочками поставок" },
  { Icon: Sparkle, title: "ИИ-продукты", desc: "Сервисы для 30 млн покупателей" },
  { Icon: Code2, title: "ИИ-кодинг", desc: "Помощники разработчика для команд X5" },
  { Icon: Eye, title: "Компьютерное зрение", desc: "Распознавание товаров и контроль полок" },
];

export default function PartnerBlock() {
  return (
    <>
      <div style={{ height: 2, background: "linear-gradient(90deg, #B6E835, #A79FFF)" }} />
      <section style={{ background: "#1A2035", color: "#fff", padding: "80px 0" }} className="partner-section">
        <div className="container">
          <div className="partner-top">
            <div className="partner-copy">
              <div className="partner-eyebrow">ПАРТНЁР</div>
              <h2 className="partner-h2">X5 Tech — мост в реальную ИИ-практику</h2>
              <p className="partner-lead">
                X5 Tech – технологическое ядро X5 Group, одного из крупнейших ритейлеров России. Команда строит AI-продукты, которые работают на миллионы покупателей каждый день.
              </p>
              <div className="partner-quote">
                <span className="partner-quote-mark" aria-hidden>«</span>
                <p className="partner-quote-text">
                  Нам нужны не теоретики, а инженеры, которые умеют доводить модели до production.
                </p>
                <div className="partner-author">
                  <div className="partner-author-avatar">МН</div>
                  <div>
                    <div className="partner-author-name">Михаил Новиков</div>
                    <div className="partner-author-role">CTO X5 Tech</div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="partner-visual" aria-label="X5 Tech">
              <div className="partner-logo">
                <span className="partner-logo-mark">X5</span>
                <span className="partner-logo-text">Tech</span>
              </div>
              <div className="partner-stat">
                <div className="partner-stat-value">
                  <BigCounter to={30000} />
                </div>
                <div className="partner-stat-label">магазинов в экосистеме X5</div>
              </div>
              <div className="partner-grid-bg" aria-hidden />
            </aside>
          </div>

          <div className="direction-grid">
            {directions.map(({ Icon, title, desc }, i) => (
              <div key={title} className="dir-card" data-i={i}>
                <Icon size={28} color="#B6E835" strokeWidth={1.6} />
                <div className="dir-title">{title}</div>
                <div className="dir-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .partner-top {
            display: grid;
            grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
            gap: 40px;
            align-items: stretch;
            margin-bottom: 48px;
          }
          .partner-copy { min-width: 0; }
          .partner-eyebrow {
            font-family: var(--font-mono); font-size: 11px; letter-spacing: 1.5px;
            color: rgba(182,232,53,0.85); text-transform: uppercase; margin-bottom: 14px;
          }
          .partner-h2 { max-width: 620px; }
          .partner-lead {
            font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.68);
            max-width: 560px; margin: 0 0 28px;
          }
          .partner-quote {
            position: relative;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-left: 3px solid #B6E835;
            border-radius: 16px;
            padding: 22px 24px;
            max-width: 560px;
          }
          .partner-quote-mark {
            position: absolute; top: -18px; left: 16px;
            font-weight: 900; font-size: 90px; line-height: 1;
            color: rgba(182,232,53,0.18); pointer-events: none; user-select: none;
          }
          .partner-quote-text {
            font-style: italic; font-size: 16.5px; line-height: 1.55;
            color: rgba(255,255,255,0.92); margin: 0 0 16px; position: relative;
          }
          .partner-author { display: flex; align-items: center; gap: 12px; }
          .partner-author-avatar {
            width: 40px; height: 40px; border-radius: 50%;
            background: #B6E835; color: #272727; font-weight: 700; font-size: 13px;
            display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          }
          .partner-author-name { font-weight: 600; font-size: 14px; color: #fff; }
          .partner-author-role {
            font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.4px;
            color: rgba(255,255,255,0.5); margin-top: 2px;
          }

          .partner-visual {
            position: relative;
            background: linear-gradient(155deg, #232a45 0%, #14182a 100%);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 22px;
            padding: 32px 28px;
            display: flex; flex-direction: column; justify-content: space-between;
            gap: 28px;
            overflow: hidden;
            min-height: 280px;
          }
          .partner-grid-bg {
            position: absolute; inset: 0; pointer-events: none;
            background-image: radial-gradient(rgba(182,232,53,0.18) 1px, transparent 1px);
            background-size: 22px 22px;
            opacity: 0.4;
            mask-image: radial-gradient(ellipse at top right, #000 0%, transparent 70%);
            -webkit-mask-image: radial-gradient(ellipse at top right, #000 0%, transparent 70%);
          }
          .partner-logo {
            position: relative; z-index: 1;
            display: inline-flex; align-items: center; gap: 12px;
          }
          .partner-logo-mark {
            display: inline-flex; align-items: center; justify-content: center;
            width: 56px; height: 56px; border-radius: 14px;
            background: #B6E835; color: #1A2035;
            font-family: Inter, sans-serif; font-weight: 900; font-size: 22px;
            box-shadow: 0 12px 32px -10px rgba(182,232,53,0.5);
          }
          .partner-logo-text {
            font-family: Inter, sans-serif; font-weight: 800; font-size: 28px;
            letter-spacing: -0.02em; color: #fff;
          }
          .partner-stat { position: relative; z-index: 1; }
          .partner-stat-value {
            font-weight: 800; font-size: 56px; line-height: 1; color: #B6E835;
            letter-spacing: -0.02em;
          }
          .partner-stat-label {
            font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.5px;
            color: rgba(255,255,255,0.55); margin-top: 8px;
          }

          .direction-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
          }
          .dir-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 14px;
            padding: 18px 16px;
            transition: all 300ms ease;
          }
          .dir-title {
            font-weight: 600; font-size: 14.5px; color: #fff;
            margin-top: 12px; margin-bottom: 4px; letter-spacing: -0.01em;
          }
          .dir-desc {
            font-size: 12.5px; line-height: 1.45; color: rgba(255,255,255,0.55);
          }
          .dir-card:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(182,232,53,0.3) !important; box-shadow: 0 0 24px rgba(182,232,53,0.08); }

          @media (max-width: 1024px) {
            .partner-top { grid-template-columns: 1fr; gap: 28px; margin-bottom: 36px; }
            .partner-visual { min-height: 220px; flex-direction: row; align-items: center; justify-content: space-between; }
            .direction-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 768px) {
            .partner-section { padding: 56px 0 !important; }
            .partner-lead { font-size: 15px !important; margin-bottom: 22px !important; }
            .partner-quote { padding: 18px 18px; }
            .partner-quote-text { font-size: 15px !important; }
            .partner-visual { padding: 24px 22px; min-height: 0; flex-direction: column; align-items: flex-start; gap: 20px; }
            .partner-stat-value { font-size: 44px !important; }
            .direction-grid { grid-template-columns: 1fr 1fr !important; gap: 8px; }
            .dir-card { padding: 14px 12px; border-radius: 12px; }
            .dir-title { font-size: 13.5px; margin-top: 10px; }
            .dir-desc { font-size: 12px; }
          }
        `}</style>
      </section>
    </>
  );
}