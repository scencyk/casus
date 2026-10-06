// One colour scheme per query. The halftone eye is grayscale and sits in
// `color-dodge`, so its tint comes from `bg` — keep backgrounds dark and
// saturated in the hue you want the eye to glow in.
//
// First entry = the Figma frame (Naming → 52:135).

export type Scheme = {
  bg: string; // page background, also tints the eye
  ink: string; // the typed question + caret
  accent: string; // tagline + eye icon
  mark: string; // casus wordmark
};

export type Entry = { query: string; scheme: Scheme };

export const ENTRIES: Entry[] = [
  {
    query: "pacjentka 83 l., eGFR 38, AF – jaka dawka apiksabanu?",
    scheme: { bg: "#270608", ink: "#dd0000", accent: "#bffc16", mark: "#d6d1f0" },
  },
  {
    query: "kod ICD-10 na napady rzekomopadaczkowe?",
    scheme: { bg: "#06102e", ink: "#3d6bff", accent: "#ffb703", mark: "#e9e2d0" },
  },
  {
    query: "refundacja sensora CGM u dziecka z cukrzycą typu 1?",
    scheme: { bg: "#03221a", ink: "#19d68c", accent: "#ff7ad9", mark: "#dff3ea" },
  },
  {
    query: "LDL 4,2 mmol/l mimo atorwastatyny 40 mg – co dołożyć?",
    scheme: { bg: "#2a1a02", ink: "#ff9f0a", accent: "#7cd4ff", mark: "#f4ead4" },
  },
  {
    query: "czy empagliflozyna jest refundowana w niewydolności serca?",
    scheme: { bg: "#1c0730", ink: "#b45cff", accent: "#d8ff3d", mark: "#efe4ff" },
  },
  {
    query: "pieluchomajtki po udarze – limit i kto może przepisać?",
    scheme: { bg: "#002428", ink: "#00c2c7", accent: "#ff5c39", mark: "#dcefee" },
  },
];

