import type { NextConfig } from "next";

// Static export — plain HTML/CSS/JS. On GitHub Pages the site lives under
// /casus, so the workflow sets BASE_PATH=/casus; locally it stays empty.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true, // /granat → granat/index.html (works on GitHub Pages)
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
