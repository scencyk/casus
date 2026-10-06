"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const EASE = [0.22, 1, 0.36, 1] as const;

// timeline after the section scrolls into view (ms)
const MORPH_AT = 1100; // "widzieć" → "wiedzieć"
const LOCKUP_AT = 1800;

const HIDDEN = { opacity: 0, y: 10, filter: "blur(10px)" };
const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" };

/**
 * Second screen — Figma "Naming" → frame 52:163.
 * "By widzieć więcej." → an "e" slides in to make "wiedzieć" (to see → to know),
 * then the eye + casus lockup and "2026." appear.
 * Revealed from underneath the hero; replays every time it is uncovered again.
 */
export function SeeMore() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0); // 0 line, 1 morphed, 2 lockup

  // The screen sits underneath the hero (sticky), so it is always "in view" —
  // trigger on scroll progress instead: shown once the hero is half pulled away.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const past = y > window.innerHeight * 0.5;
    if (past !== visible) {
      if (past) setStep(0);
      setVisible(past);
    }
  });

  // Timers only — visibility comes from the scroll listener above.
  useEffect(() => {
    if (!visible || reduce) return;
    const morph = setTimeout(() => setStep(1), MORPH_AT);
    const lockup = setTimeout(() => setStep(2), LOCKUP_AT);
    return () => {
      clearTimeout(morph);
      clearTimeout(lockup);
    };
  }, [visible, reduce]);

  const morphed = visible && (reduce || step >= 1);
  const lockupOn = visible && (reduce || step >= 2);

  return (
    <section
      className="landing-more"
      aria-label="By wiedzieć więcej. casus, 2026."
    >
      <LayoutGroup>
        <motion.p
          className="more-line"
          aria-hidden="true"
          initial={HIDDEN}
          animate={visible ? SHOWN : HIDDEN}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <motion.span layout="position" className="more-word">
            By
          </motion.span>{" "}
          <motion.span layout className="more-word" transition={{ layout: { duration: 0.7, ease: EASE } }}>
            <Letter>w</Letter>
            <Letter>i</Letter>
            <AnimatePresence initial={false}>
              {morphed && (
                <motion.span
                  key="e"
                  layout
                  className="more-new"
                  initial={{ opacity: 0, y: "-0.6em", filter: "blur(6px)", width: 0 }}
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
          <motion.span layout="position" className="more-word" transition={{ layout: { duration: 0.7, ease: EASE } }}>
            więcej.
          </motion.span>
        </motion.p>
      </LayoutGroup>

      <motion.div
        className="more-lockup"
        aria-hidden="true"
        initial={HIDDEN}
        animate={lockupOn ? SHOWN : HIDDEN}
        transition={{ duration: 1, ease: EASE }}
      >
        <Image className="more-icon" src={`${BASE}/eye-icon-lockup.svg`} alt="" width={15} height={19} />
        <span className="more-wordmark">casus</span>
      </motion.div>

      <motion.p
        className="more-year"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: lockupOn ? 1 : 0 }}
        transition={{ duration: 1, delay: lockupOn ? 0.5 : 0, ease: EASE }}
      >
        2026.
      </motion.p>
    </section>
  );
}

function Letter({ children }: { children: string }) {
  return (
    <motion.span layout="position" className="more-letter" transition={{ layout: { duration: 0.7, ease: EASE } }}>
      {children}
    </motion.span>
  );
}
