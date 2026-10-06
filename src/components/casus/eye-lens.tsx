"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Cursor } from "@/components/ui/cursor";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SRC = `${BASE}/eye-halftone.png`;

// Same spring for the ring (viewport coords) and the mask (image coords) so they stay aligned.
const SPRING = { stiffness: 260, damping: 28, mass: 0.6 };
// Lens size scales with the eye (--eye-w is set in CSS): sharp radius = 24% of the image width.
const LENS_R = "calc(var(--eye-w) * 0.24)";

const RING_VARIANTS = {
  initial: { scale: 0.4, opacity: 0, filter: "blur(6px)" },
  animate: { scale: 1, opacity: 1, filter: "blur(0px)" },
  exit: { scale: 0.4, opacity: 0, filter: "blur(6px)" },
};
const RING_TRANSITION = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

/**
 * The halftone eye. On hover the picture blurs and a sharp "lens" follows the
 * cursor — the ring is motion-primitives' <Cursor>, the sharp area is a masked
 * copy of the image driven by the same spring.
 */
export function EyeLens() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  const mask = useMotionTemplate`radial-gradient(circle ${LENS_R} at ${sx}% ${sy}%, #000 62%, transparent 100%)`;

  const track = useCallback(
    (x: number, y: number) => {
      const r = frameRef.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(((x - r.left) / r.width) * 100);
      my.set(((y - r.top) / r.height) * 100);
    },
    [mx, my],
  );

  return (
    <div
      className="landing-eye"
      aria-hidden="true"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      data-active={active || undefined}
    >
      <div className="eye-frame" ref={frameRef}>
        <Image className="eye-base" src={SRC} alt="" width={735} height={701} priority />
        <motion.div className="eye-sharp" style={{ maskImage: mask, WebkitMaskImage: mask }}>
          <Image src={SRC} alt="" width={735} height={701} />
        </motion.div>
      </div>

      <Cursor
        attachToParent
        springConfig={SPRING}
        variants={RING_VARIANTS}
        transition={RING_TRANSITION}
        onPositionChange={track}
      >
        <div className="lens-ring" />
      </Cursor>
    </div>
  );
}
