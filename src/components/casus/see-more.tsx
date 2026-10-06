"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// timeline after the section scrolls into view (ms)
const MORPH_AT = 1900; // "widzieć" → "wiedzieć"
const LOGO_AT = 3000;

const WORD_IN = {
  hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.12 * i, ease: EASE },
  }),
};

/**
 * Second screen: "By widzieć więcej." — an "e" slides into "widzieć" to make
 * "wiedzieć" (to see → to know), then the casus wordmark appears.
 * Replays every time the section comes back into view.
 */
export function SeeMore() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0); // 0 text, 1 morphed, 2 logo

  // Timers only — visibility comes from the viewport events below.
  useEffect(() => {
    if (!visible || reduce) return;
    const morph = setTimeout(() => setStep(1), MORPH_AT);
    const logo = setTimeout(() => setStep(2), LOGO_AT);
    return () => {
      clearTimeout(morph);
      clearTimeout(logo);
    };
  }, [visible, reduce]);

  const shown = visible;
  const morphed = visible && (reduce || step >= 1);
  const logoOn = visible && (reduce || step >= 2);

  return (
    <motion.section
      className="landing-more"
      aria-label="By wiedzieć więcej."
      viewport={{ amount: 0.6 }}
      onViewportEnter={() => {
        setStep(0);
        setVisible(true);
      }}
      onViewportLeave={() => setVisible(false)}
    >
      <LayoutGroup>
        <p className="more-line" aria-hidden="true">
          <motion.span className="more-word" custom={0} variants={WORD_IN} initial="hidden" animate={shown ? "shown" : "hidden"}>
            By
          </motion.span>{" "}
          <motion.span
            layout
            className="more-word more-accent"
            custom={1}
            variants={WORD_IN}
            initial="hidden"
            animate={shown ? "shown" : "hidden"}
            transition={{ layout: { duration: 0.7, ease: EASE } }}
          >
            <Letter>w</Letter>
            <Letter>i</Letter>
            <AnimatePresence initial={false}>
              {morphed && (
                <motion.span
                  key="e"
                  layout
                  className="more-new"
                  initial={{ opacity: 0, y: "-0.6em", filter: "blur(8px)", width: 0 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  e
                </motion.span>
              )}
            </AnimatePresence>
            {[..."dzieć"].map((ch, i) => (
              <Letter key={i}>{ch}</Letter>
            ))}
          </motion.span>{" "}
          <motion.span layout className="more-word" custom={2} variants={WORD_IN} initial="hidden" animate={shown ? "shown" : "hidden"}>
            więcej.
          </motion.span>
        </p>
      </LayoutGroup>

      <motion.span
        className="more-logo"
        role="img"
        aria-label="casus"
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={logoOn ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 10, filter: "blur(10px)" }}
        transition={{ duration: 1, ease: EASE }}
      />
    </motion.section>
  );
}

function Letter({ children }: { children: string }) {
  return (
    <motion.span layout="position" className="more-letter" transition={{ layout: { duration: 0.7, ease: EASE } }}>
      {children}
    </motion.span>
  );
}
