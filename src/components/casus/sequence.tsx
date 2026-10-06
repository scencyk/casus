"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useState } from "react";
import { CasusLogo } from "./logo";
import { SENTENCES, TARGET, pickLetters, tokenize, type Token } from "./sentences";

// ── timing (seconds) ────────────────────────────────────────────────
const WORD_STAGGER = 0.075;
const WORD_IN = 0.7;
const HOLD = 2.1;
const EXIT = 0.6;
const GATHER = 1.5; // letters travelling into the word
const WORD_HOLD = 1.1; // "casus" set in Geist before it turns into the logo

const LAST = SENTENCES.length - 1;
const FINAL_TOKENS = tokenize(SENTENCES[LAST]);
const PICKS = new Set(pickLetters(SENTENCES[LAST], TARGET));
const PICK_ORDER = pickLetters(SENTENCES[LAST], TARGET);

const EASE = [0.22, 1, 0.36, 1] as const;

const sentenceVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: WORD_STAGGER } },
  exit: { opacity: 0, filter: "blur(10px)", y: -8, transition: { duration: EXIT, ease: EASE } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 10 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: WORD_IN, ease: EASE } },
};

type Phase = { step: "sentence"; index: number } | { step: "gather" } | { step: "logo" };

function readTime(tokens: Token[]) {
  return tokens.length * WORD_STAGGER + WORD_IN;
}

export function Sequence() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>({ step: "sentence", index: 0 });
  const [run, setRun] = useState(0);

  // Advance the timeline. One timeout per phase; cleared on change/unmount.
  useEffect(() => {
    if (reduce) return;
    let ms = 0;
    let next: Phase;
    if (phase.step === "sentence") {
      const tokens = tokenize(SENTENCES[phase.index]);
      const isLast = phase.index === LAST;
      // index > 0 mounts only after the previous sentence has exited
      ms = ((phase.index > 0 ? EXIT : 0) + readTime(tokens) + HOLD) * 1000;
      next = isLast ? { step: "gather" } : { step: "sentence", index: phase.index + 1 };
    } else if (phase.step === "gather") {
      ms = (GATHER + WORD_HOLD) * 1000;
      next = { step: "logo" };
    } else {
      return;
    }
    const t = setTimeout(() => setPhase(next), ms);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  const shown: Phase = reduce ? { step: "logo" } : phase;
  const onFinal = shown.step === "sentence" && shown.index === LAST;
  const gathered = shown.step === "gather" || shown.step === "logo";

  return (
    <div className="seq" key={run}>
      <AnimatePresence mode="wait">
        {shown.step === "sentence" && shown.index < LAST ? (
          <Sentence key={shown.index} tokens={tokenize(SENTENCES[shown.index])} />
        ) : onFinal || shown.step === "gather" ? (
          <FinalSentence key="final" collapsed={shown.step === "gather"} />
        ) : null}
      </AnimatePresence>

      {gathered && <Word toLogo={shown.step === "logo"} />}

      <AnimatePresence>
        {shown.step === "logo" && (
          <motion.div
            className="outro"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            <p className="outro-line">
              Z czym <em>przychodzisz?</em>
            </p>
            <p className="outro-soon">Wkrótce dla lekarzy</p>
            {!reduce && (
              <button
                type="button"
                className="replay"
                onClick={() => {
                  setPhase({ step: "sentence", index: 0 });
                  setRun((r) => r + 1);
                }}
              >
                Odtwórz jeszcze raz
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Sentence({ tokens }: { tokens: Token[] }) {
  return (
    <motion.p className="sentence" variants={sentenceVariants} initial="hidden" animate="visible" exit="exit">
      {tokens.map((t, i) => (
        <motion.span key={i} variants={wordVariants} className={t.italic ? "word accent" : "word"}>
          {t.text}
          {i < tokens.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.p>
  );
}

/**
 * The last sentence, rendered per character. The picked letters carry a
 * layoutId; once `collapsed`, they are swapped for invisible placeholders and
 * the matching letters in <Word> take over the layoutId — motion animates the
 * shared layout transition, so each letter flies from its spot into the word.
 */
function FinalSentence({ collapsed }: { collapsed: boolean }) {
  let charIndex = 0;
  return (
    <motion.p className="sentence" variants={sentenceVariants} initial="hidden" animate="visible">
      {FINAL_TOKENS.map((t, wi) => {
        const chars = [...t.text].map((ch) => {
          const idx = charIndex++;
          const order = PICK_ORDER.indexOf(idx);
          if (PICKS.has(idx) && !collapsed) {
            return (
              <motion.span key={idx} layoutId={`letter-${order}`} className="char pick">
                {ch}
              </motion.span>
            );
          }
          return (
            <motion.span
              key={idx}
              className="char"
              animate={collapsed ? { opacity: 0, filter: "blur(8px)" } : { opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: collapsed ? (idx % 7) * 0.025 : 0, ease: EASE }}
              style={PICKS.has(idx) ? { visibility: "hidden" } : undefined}
            >
              {ch}
            </motion.span>
          );
        });
        if (wi < FINAL_TOKENS.length - 1) charIndex++; // account for the space
        return (
          <motion.span key={wi} variants={wordVariants} className={t.italic ? "word accent" : "word"}>
            {chars}
            {wi < FINAL_TOKENS.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </motion.p>
  );
}

function Word({ toLogo }: { toLogo: boolean }) {
  return (
    <div className="word-stage">
      <motion.span
        className="casus-word"
        animate={toLogo ? { opacity: 0, filter: "blur(10px)", scale: 0.96 } : { opacity: 1, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {[...TARGET].map((ch, i) => (
          <motion.span
            key={i}
            layoutId={`letter-${i}`}
            className="char"
            transition={{ layout: { duration: GATHER, ease: EASE, delay: i * 0.06 } }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>

      <motion.div
        className="logo-wrap"
        initial={false}
        animate={toLogo ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0, filter: "blur(10px)", scale: 1.04 }}
        transition={{ duration: 0.9, delay: toLogo ? 0.15 : 0, ease: EASE }}
      >
        <CasusLogo className="logo" />
      </motion.div>
    </div>
  );
}
