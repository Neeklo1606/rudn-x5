export default function Partners() {
  return (
    <section style={{ background: "#fff" }} className="section">
      <div className="container">
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: 1.5, color: "#A79FFF", textTransform: "uppercase", marginBottom: 16 }}>ПАРТНЁРЫ</div>
        <h2 style={{ fontWeight: 700, fontSize: 40, color: "#272727", marginBottom: 40 }} className="h2">Партнёры</h2>

        <div
          className="partners-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 96,
                borderRadius: 16,
                background: "#F1F1F1",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
              aria-hidden
            />
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .partners-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px)  { .partners-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}