"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

// Real-world style questions a doctor would type. First one matches the Figma frame.
const QUERIES = [
  "pacjentka 83 l., eGFR 38, AF – jaka dawka apiksabanu?",
  "kod ICD-10 na napady rzekomopadaczkowe?",
  "refundacja sensora CGM u dziecka z cukrzycą typu 1?",
  "LDL 4,2 mmol/l mimo atorwastatyny 40 mg – co dołożyć?",
  "czy empagliflozyna jest refundowana w niewydolności serca?",
  "pieluchomajtki po udarze – limit i kto może przepisać?",
];

const TYPE_MS = 42;
const DELETE_MS = 14;
const HOLD_MS = 2600;
const GAP_MS = 380;

export function QueryTyper() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const full = QUERIES[query];

  useEffect(() => {
    if (reduce) return;
    let delay: number;
    let step: () => void;

    if (!deleting && length < full.length) {
      // a little human jitter on typing
      delay = TYPE_MS + Math.random() * 60;
      step = () => setLength((l) => l + 1);
    } else if (!deleting) {
      delay = HOLD_MS;
      step = () => setDeleting(true);
    } else if (length > 0) {
      delay = DELETE_MS;
      step = () => setLength((l) => l - 1);
    } else {
      delay = GAP_MS;
      step = () => {
        setDeleting(false);
        setQuery((q) => (q + 1) % QUERIES.length);
      };
    }

    const t = setTimeout(step, delay);
    return () => clearTimeout(t);
  }, [reduce, deleting, length, full.length]);

  const text = reduce ? QUERIES[0] : full.slice(0, length);

  return (
    <p className="query" aria-label={QUERIES[0]}>
      <span aria-hidden="true">{text}</span>
      <span className="query-caret" aria-hidden="true" />
    </p>
  );
}
