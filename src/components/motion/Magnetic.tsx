"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * A small pull towards the pointer, for the one primary CTA in the hero.
 * Capped at 6px so the target never moves away from the click. Mouse only.
 */
export default function Magnetic({
  children,
  strength = 6,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 });

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2 * strength);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2 * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduceMotion) return <span className={`inline-flex ${className}`}>{children}</span>;

  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
