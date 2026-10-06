'use client';
import React, { useEffect, useState, useRef } from 'react';
import {
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  AnimatePresence,
  Transition,
  Variant,
} from 'motion/react';
import { cn } from '@/lib/utils';

export type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

const INSTANT: SpringOptions = { duration: 0 };

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  // Keep the latest callback in a ref so the listener is attached only once.
  const onPositionChangeRef = useRef(onPositionChange);
  useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  }, [onPositionChange]);

  useEffect(() => {
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!attachToParent) document.body.style.cursor = 'none';

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChangeRef.current?.(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', updatePosition, { passive: true });
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      if (!attachToParent) document.body.style.cursor = '';
    };
  }, [attachToParent, cursorX, cursorY]);

  const cursorXSpring = useSpring(cursorX, springConfig || INSTANT);
  const cursorYSpring = useSpring(cursorY, springConfig || INSTANT);

  useEffect(() => {
    const parent = attachToParent ? cursorRef.current?.parentElement : null;
    if (!parent) return;

    // Named handlers so removeEventListener actually detaches them.
    const onEnter = () => {
      parent.style.cursor = 'none';
      setIsVisible(true);
    };
    const onLeave = () => {
      parent.style.cursor = '';
      setIsVisible(false);
    };

    parent.addEventListener('mouseenter', onEnter);
    parent.addEventListener('mouseleave', onLeave);
    return () => {
      parent.removeEventListener('mouseenter', onEnter);
      parent.removeEventListener('mouseleave', onLeave);
    };
  }, [attachToParent]);

  return (
    <motion.div
      ref={cursorRef}
      className={cn('pointer-events-none fixed left-0 top-0 z-50', className)}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
