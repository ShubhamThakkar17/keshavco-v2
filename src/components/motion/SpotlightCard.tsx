"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Card with a brand-gradient spotlight that tracks the pointer. Pointer-only —
 * touch users get the plain card, which is the correct behaviour.
 */
export default function SpotlightCard({
  children,
  className = "",
  radius = 380,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
}) {
  const reduceMotion = useReducedMotionSafe();
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgb(79 70 229 / 0.13), rgb(124 58 237 / 0.06) 40%, transparent 68%)`;

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  const onMouseLeave = () => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  };

  return (
    <div
      className={`group relative isolate overflow-hidden ${className}`}
      onMouseMove={reduceMotion ? undefined : onMouseMove}
      onMouseLeave={reduceMotion ? undefined : onMouseLeave}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      {children}
    </div>
  );
}
