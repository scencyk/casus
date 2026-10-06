"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const LINES = ["for healthcare professionals", "soon available"];
const INTERVAL_MS = 3800;

const VARIANTS = {
  initial: { opacity: 0, y: 6, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, filter: "blur(6px)" },
};
const TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

export function Tagline() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % LINES.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <p className="landing-tagline" aria-label={LINES.join(" — ")}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          aria-hidden="true"
          className="block"
          variants={VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={TRANSITION}
        >
          {LINES[index]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
