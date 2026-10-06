import type { NextConfig } from "next";

// Static export — the teaser is plain HTML/CSS/JS, deployable to GitHub Pages or Vercel.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
