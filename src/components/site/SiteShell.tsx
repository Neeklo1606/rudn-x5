import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AIWidget from "./AIWidget";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <AIWidget />
    </>
  );
}