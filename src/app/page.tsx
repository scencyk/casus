import { Arc } from "@/components/casus/arc";
import { Hero } from "@/components/casus/hero";

export default function Page() {
  return (
    <main className="stage">
      <div className="grain" aria-hidden="true" />
      <Arc />
      <Hero />
      <footer className="foot rise" style={{ animationDelay: "2.2s" }}>
        casus · 2026
      </footer>
    </main>
  );
}
