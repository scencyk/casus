import type { Metadata, Viewport } from "next";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "casus — wkrótce",
  description:
    "Z czym przychodzisz? Leki, refundacja, ICD-10, wyroby medyczne i wytyczne w jednym miejscu. Dla lekarzy.",
};

export const viewport: Viewport = {
  themeColor: "#f3f2ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${geist.variable} ${serif.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
