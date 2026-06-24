import { createFileRoute } from "@tanstack/react-router";
import SiteShell from "../components/site/SiteShell";

export const Route = createFileRoute("/admission")({
  head: () => ({ meta: [{ title: "Поступление – РУДН × X5 Tech" }] }),
  component: () => (
    <SiteShell>
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 72, padding: "120px 0" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 80, height: 3, background: "#B6E835", margin: "0 auto 24px" }} />
          <h1 style={{ fontWeight: 700, fontSize: 32, color: "#272727" }}>Поступление</h1>
          <p style={{ marginTop: 12, color: "#6B6B6B" }}>Раздел находится в разработке.</p>
        </div>
      </section>
    </SiteShell>
  ),
});