import Image from "next/image";
import { QueryTyper } from "@/components/casus/query-typer";

// Landing built from Figma "Naming" → frame 52:135.
export default function Page() {
  return (
    <main className="landing">
      <div className="landing-eye" aria-hidden="true">
        <Image src="/eye-halftone.png" alt="" width={735} height={701} priority />
      </div>

      <header className="landing-top">
        <QueryTyper />
        <Image className="landing-icon" src="/eye-icon.svg" alt="" width={24} height={29} />
      </header>

      <footer className="landing-bottom">
        <p className="landing-tagline">for healthcare professionals</p>
        <Image className="landing-logo" src="/casus-wordmark.svg" alt="casus" width={98} height={22} />
      </footer>
    </main>
  );
}
