"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { QueryTyper } from "./query-typer";
import { ENTRIES } from "./schemes";

// next/image and CSS url() don't get basePath for plain string paths — prefix by hand.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
          "--icon-url": `url("${BASE}/eye-icon.svg")`,
          "--wordmark-url": `url("${BASE}/casus-wordmark.svg")`,
        } as React.CSSProperties
      }
    >
      <div className="landing-eye" aria-hidden="true">
        <Image src={`${BASE}/eye-halftone.png`} alt="" width={735} height={701} priority />
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
