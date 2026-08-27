"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Moves its children against the scroll direction across the element's own
 * viewport crossing. `speed` is in viewport-height units.
 */
export default function Parallax({
  children,
  speed = 0.15,
  className,
  scale = false,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  /** Also eases a 1.12 → 1 scale, for image reveals. */
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);
  const s = useTransform(smooth, [0, 0.5, 1], [1.12, 1.02, 1.12]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, scale: scale ? s : undefined }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
