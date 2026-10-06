"use client";

import { TextEffect } from "@/components/ui/text-effect";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { CasusLogo } from "./logo";
import { Prompt } from "./prompt";

export function Hero() {
  return (
    <section className="hero">
      <CasusLogo className="hero-logo" />

      <h1 className="hero-title">
        <TextEffect as="span" per="word" preset="fade-in-blur" delay={0.35}>
          Z czym
        </TextEffect>{" "}
        <TextEffect as="span" per="char" preset="fade-in-blur" delay={0.6} className="italic text-[#ffd9c2]">
          przychodzisz?
        </TextEffect>
      </h1>

      <TextEffect as="p" per="word" preset="fade" delay={1.1} speedReveal={2.4} className="hero-lede">
        Leki, refundacja, kody ICD-10, wyroby medyczne i wytyczne w jednym miejscu. Każda odpowiedź ze źródłem. Decyzja zostaje przy Tobie.
      </TextEffect>

      <div className="rise" style={{ animationDelay: "1.6s" }}>
        <Prompt />
      </div>

      <span className="soon rise" style={{ animationDelay: "1.9s" }}>
        <span className="soon-dot" />
        <TextShimmer
          as="span"
          duration={2.6}
          className="[--base-color:#1a0d08] [--base-gradient-color:#d9572b] text-[13px] font-medium"
        >
          Wkrótce dla lekarzy
        </TextShimmer>
      </span>
    </section>
  );
}
