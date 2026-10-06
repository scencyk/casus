import type { Viewport } from "next";
import { Landing } from "@/components/casus/landing";

// Navy theme — Figma "Naming" → 55:186 + 52:163. Kept for comparison at /granat.
export const viewport: Viewport = { themeColor: "#060827" };

export default function Page() {
  return <Landing theme="navy" />;
}
