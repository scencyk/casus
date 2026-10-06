"use client";

import { useCallback, useState } from "react";
import { EyeLens } from "./eye-lens";
import { QueryTyper } from "./query-typer";
import { SeeMore } from "./see-more";
import { ENTRIES, LANDING_SCHEME } from "./schemes";
import { Tagline } from "./tagline";
import { useScreenPaging } from "./use-screen-paging";

// CSS url() doesn't get basePath for plain string paths — prefix by hand.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Landing built from Figma "Naming" → frames 52:135 (layout) and 55:186 (colours).
// One fixed colour scheme. To bring back a scheme per question,
// use `ENTRIES[index].scheme` instead of `SCHEME`.
const SCHEME = LANDING_SCHEME;

export function Landing() {
  useScreenPaging();
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % ENTRIES.length), []);
  const { query } = ENTRIES[index];
  const scheme = SCHEME;

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
      <section className="landing-hero">
        <EyeLens />

        <header className="landing-top">
          {/* key resets the typer for each question */}
          <QueryTyper key={index} text={query} onDone={next} />
          <span className="landing-icon" aria-hidden="true" />
        </header>

        <footer className="landing-bottom">
          <Tagline />
          <span className="landing-logo" role="img" aria-label="casus" />
        </footer>
      </section>

      <SeeMore />
    </main>
  );
}
