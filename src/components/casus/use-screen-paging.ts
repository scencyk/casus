"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect } from "react";

const DURATION = 1.1; // seconds per full-screen move
const EASE = [0.76, 0, 0.24, 1] as const; // slow-fast-slow, curtain-like
const SWIPE_PX = 30;

/**
 * Full-screen paging for a two-screen page: any downward intent (wheel,
 * swipe, keys) pulls the hero all the way up, any upward intent brings it all
 * the way back. CSS scroll-snap can't do this here because the second screen
 * is sticky, so it never offers a snap point of its own.
 */
export function useScreenPaging() {
  const reduce = useReducedMotion();

  useEffect(() => {
    let moving = false;
    const page = () => Math.round(window.scrollY / window.innerHeight);

    const moveTo = (to: number) => {
      if (moving) return;
      const from = window.scrollY;
      if (Math.abs(to - from) < 1) return;
      if (reduce) {
        window.scrollTo(0, to);
        return;
      }
      moving = true;
      animate(from, to, {
        duration: DURATION,
        ease: EASE,
        onUpdate: (v) => window.scrollTo(0, v),
        onComplete: () => {
          moving = false;
        },
      });
    };

    // From the screen we are on (or closest to), one screen up or down.
    const go = (dir: 1 | -1) => moveTo(Math.min(1, Math.max(0, page() + dir)) * window.innerHeight);

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 4) return;
      go(e.deltaY > 0 ? 1 : -1);
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // we drive the scroll ourselves
      if (touchY === null) return;
      const dy = touchY - (e.touches[0]?.clientY ?? touchY);
      if (Math.abs(dy) > SWIPE_PX) {
        go(dy > 0 ? 1 : -1);
        touchY = null;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      const down = ["ArrowDown", "PageDown", " ", "End"].includes(e.key);
      const up = ["ArrowUp", "PageUp", "Home"].includes(e.key);
      if (!down && !up) return;
      e.preventDefault();
      go(down ? 1 : -1);
    };

    // Scrollbar drags and resizes can leave us between screens — settle on the nearest.
    const settle = () => moveTo(page() * window.innerHeight);

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scrollend", settle);
    window.addEventListener("resize", settle);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scrollend", settle);
      window.removeEventListener("resize", settle);
    };
  }, [reduce]);
}
