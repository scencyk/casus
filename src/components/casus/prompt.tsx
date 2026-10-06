"use client";

import { BorderTrail } from "@/components/ui/border-trail";
import { TextEffect } from "@/components/ui/text-effect";
import { TextLoop } from "@/components/ui/text-loop";

const QUERIES = [
  "pacjentka 83 l., eGFR 38, AF – jaka dawka apiksabanu?",
  "kod ICD-10 na napady rzekomopadaczkowe",
  "refundacja sensora CGM u dziecka z cukrzycą typu 1",
  "LDL 4,2 mmol/l mimo atorwastatyny 40 mg – co dołożyć?",
  "pacjent 83 l. skarży się na ból nosa i krwawienia z jednej strony",
  "czy empagliflozyna jest refundowana w niewydolności serca?",
  "pieluchomajtki po udarze – limit i kto może przepisać?",
];

// Hoisted so TextLoop gets a stable reference.
const LOOP_VARIANTS = {
  initial: { opacity: 0, filter: "blur(4px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(4px)" },
};
const LOOP_TRANSITION = { duration: 0.4 };

export function Prompt() {
  return (
    <div className="prompt relative" aria-hidden="true">
      <BorderTrail
        className="bg-gradient-to-l from-[#ffb48a] via-[#d9572b] to-transparent"
        size={90}
        transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
      />
      <div className="min-w-0 flex-1 overflow-hidden">
        <TextLoop
          interval={5.2}
          variants={LOOP_VARIANTS}
          transition={LOOP_TRANSITION}
          className="block w-full"
        >
          {QUERIES.map((q) => (
            <TextEffect
              key={q}
              per="char"
              preset="fade"
              speedReveal={1.6}
              as="span"
              className="block truncate text-sm leading-5 text-[var(--ink)]"
            >
              {q}
            </TextEffect>
          ))}
        </TextLoop>
      </div>
      <span className="send">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    </div>
  );
}
