// Colour themes for the whole page (both screens). Figma "Naming":
//   navy  → 55:186 (first screen) + 52:163 (second screen)
//   cream → 55:216 (first screen) + 55:230 (second screen)

export type ThemeName = "cream" | "navy";

type Theme = {
  bg: string; // first screen background, also tints the eye
  ink: string; // the typed question + caret
  accent: string; // tagline
  icon: string; // eye icon, top right
  mark: string; // casus wordmark, bottom right
  eyeBlend: string; // blend mode of the halftone eye
  eyeOpacity: number;
  moreBg: string; // second screen
  moreInk: string;
  moreYear: string;
};

export const THEMES: Record<ThemeName, Theme> = {
  navy: {
    bg: "#060827",
    ink: "#d6d1f0",
    accent: "#d6d1f0",
    icon: "#d6d1f0",
    mark: "#d6d1f0",
    eyeBlend: "color-dodge",
    eyeOpacity: 0.65,
    moreBg: "#000000",
    moreInk: "#ffffff",
    moreYear: "#969696",
  },
  cream: {
    bg: "#f4f8d8",
    ink: "#dd0000",
    accent: "#002cdd",
    icon: "#000000",
    mark: "#000000",
    eyeBlend: "hard-light",
    eyeOpacity: 0.4,
    moreBg: "#000000",
    moreInk: "#f4f8d8",
    moreYear: "#969696",
  },
};

/** CSS custom properties for a theme, applied on the page root. */
export function themeVars(name: ThemeName): React.CSSProperties {
  const t = THEMES[name];
  return {
    "--casus-bg": t.bg,
    "--casus-ink": t.ink,
    "--casus-accent": t.accent,
    "--casus-icon": t.icon,
    "--casus-mark": t.mark,
    "--eye-blend": t.eyeBlend,
    "--eye-opacity": t.eyeOpacity,
    "--more-bg": t.moreBg,
    "--more-ink": t.moreInk,
    "--more-year": t.moreYear,
  } as React.CSSProperties;
}
