"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const EASE = [0.22, 1, 0.36, 1] as const;

// timeline after the section scrolls into view (ms)
const MORPH_AT = 1700; // "widzieć" → "wiedzieć"
const LOCKUP_AT = 2500;

const HIDDEN = { opacity: 0, y: 10, filter: "blur(10px)" };
const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" };

/**
 * Second screen — Figma "Naming" → frame 52:163.
 * "By widzieć więcej." → an "e" slides in to make "wiedzieć" (to see → to know),
 * then the eye + casus lockup and "2026." appear over a faint star field.
 * Replays every time the section comes back into view.
 */
export function SeeMore() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0); // 0 line, 1 morphed, 2 lockup

  // Timers only — visibility comes from the viewport events below.
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
    <motion.section
      className="landing-more"
      aria-label="By wiedzieć więcej. casus, 2026."
      viewport={{ amount: 0.6 }}
      onViewportEnter={() => {
        setStep(0);
        setVisible(true);
      }}
      onViewportLeave={() => setVisible(false)}
    >
      <div className="more-space" aria-hidden="true">
        <Image src={`${BASE}/space.png`} alt="" width={655} height={1024} />
      </div>

      <LayoutGroup>
        <motion.p
          className="more-line"
          aria-hidden="true"
          initial={HIDDEN}
          animate={visible ? SHOWN : HIDDEN}
          transition={{ duration: 0.9, ease: EASE }}
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
        <Image className="more-icon" src={`${BASE}/eye-icon-lockup.svg`} alt="" width={24} height={29} />
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
