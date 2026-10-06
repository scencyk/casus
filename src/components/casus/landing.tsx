"use client";

import { useCallback, useState } from "react";
import { EyeLens } from "./eye-lens";
import { QueryTyper } from "./query-typer";
import { SeeMore } from "./see-more";
import { ENTRIES } from "./schemes";
import { Tagline } from "./tagline";
import { themeVars, type ThemeName } from "./themes";
import { useScreenPaging } from "./use-screen-paging";

// CSS url() doesn't get basePath for plain string paths — prefix by hand.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ASSET_VARS = {
  "--icon-url": `url("${BASE}/eye-icon.svg")`,
  "--wordmark-url": `url("${BASE}/casus-wordmark.svg")`,
  "--lockup-icon-url": `url("${BASE}/eye-icon-lockup.svg")`,
} as React.CSSProperties;

// Landing built from Figma "Naming" → frame 52:135 (layout); colours per theme (themes.ts).
export function Landing({ theme }: { theme: ThemeName }) {
  useScreenPaging();
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % ENTRIES.length), []);
  const { query } = ENTRIES[index];

  return (
    <main className="landing" data-theme={theme} style={{ ...themeVars(theme), ...ASSET_VARS }}>
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
