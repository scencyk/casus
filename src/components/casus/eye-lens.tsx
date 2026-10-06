"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SRC = `${BASE}/eye-halftone.png`;

const SPRING = { stiffness: 260, damping: 28, mass: 0.6 };
// Lens size scales with the eye (--eye-w is set in CSS): sharp radius = 24% of the image width.
const LENS_R = "calc(var(--eye-w) * 0.24)";

/**
 * The halftone eye. On hover the picture blurs and a sharp "lens" follows the
 * cursor — a masked copy of the image whose position springs after the pointer.
 */
export function EyeLens() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);
  const mask = useMotionTemplate`radial-gradient(circle ${LENS_R} at ${sx}% ${sy}%, #000 62%, transparent 100%)`;

  // Motion values update outside React — no re-render per mouse move.
  const track = (e: React.MouseEvent) => {
    const r = frameRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      className="landing-eye"
      aria-hidden="true"
      onMouseEnter={(e) => {
        track(e);
        sx.jump(mx.get());
        sy.jump(my.get());
        setActive(true);
      }}
      onMouseMove={track}
      onMouseLeave={() => setActive(false)}
      data-active={active || undefined}
    >
      <div className="eye-frame" ref={frameRef}>
        <Image className="eye-base" src={SRC} alt="" width={735} height={701} priority />
        <motion.div className="eye-sharp" style={{ maskImage: mask, WebkitMaskImage: mask }}>
          <Image src={SRC} alt="" width={735} height={701} />
        </motion.div>
      </div>
    </div>
  );
}
