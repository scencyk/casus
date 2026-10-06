"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const TYPE_MS = 42;
const DELETE_MS = 14;
const HOLD_MS = 2600;
const GAP_MS = 380;

type Props = {
  text: string;
  /** Called once the current text has been typed, held and fully deleted. */
  onDone: () => void;
};

export function QueryTyper({ text, onDone }: Props) {
  const reduce = useReducedMotion();
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let delay: number;
    let step: () => void;

    if (!deleting && length < text.length) {
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
        onDone();
      };
    }

    const t = setTimeout(step, delay);
    return () => clearTimeout(t);
  }, [reduce, deleting, length, text.length, onDone]);

  return (
    <p className="query" aria-label={text}>
      <span aria-hidden="true">{reduce ? text : text.slice(0, length)}</span>
      <span className="query-caret" aria-hidden="true" />
    </p>
  );
}
