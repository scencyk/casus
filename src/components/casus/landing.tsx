"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { QueryTyper } from "./query-typer";
import { ENTRIES } from "./schemes";

// Landing built from Figma "Naming" → frame 52:135, with a colour scheme per question.
export function Landing() {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % ENTRIES.length), []);
  const { query, scheme } = ENTRIES[index];

  return (
    <main
      className="landing"
      style={
        {
          "--casus-bg": scheme.bg,
          "--casus-ink": scheme.ink,
          "--casus-accent": scheme.accent,
          "--casus-mark": scheme.mark,
        } as React.CSSProperties
      }
    >
      <div className="landing-eye" aria-hidden="true">
        <Image src="/eye-halftone.png" alt="" width={735} height={701} priority />
      </div>

      <header className="landing-top">
        {/* key resets the typer for each question */}
        <QueryTyper key={index} text={query} onDone={next} />
        <span className="landing-icon" aria-hidden="true" />
      </header>

      <footer className="landing-bottom">
        <p className="landing-tagline">for healthcare professionals</p>
        <span className="landing-logo" role="img" aria-label="casus" />
      </footer>
    </main>
  );
}
