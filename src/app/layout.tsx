import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
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
    <html lang="pl" className={`${geist.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
