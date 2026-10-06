import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "casus — wkrótce",
  description:
    "Z czym przychodzisz? Leki, refundacja, ICD-10, wyroby medyczne i wytyczne w jednym miejscu. Dla lekarzy.",
};

export const viewport: Viewport = {
  themeColor: "#060827",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
