"use client";

import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { wrap } from "@/lib/wrap";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Infinite marquee whose speed and direction react to scroll velocity — scroll
 * down and it accelerates, scroll up and it runs backwards. Falls back to a
 * static, wrapped row when reduced motion is set.
 */
export default function Marquee({
  children,
  baseVelocity = 3,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotionSafe();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_t, delta) => {
    if (reduceMotion) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) directionFactor.current = -1;
    else if (factor > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  if (reduceMotion) {
    return (
      <div className={`flex flex-wrap gap-x-10 gap-y-3 ${className ?? ""}`}>{children}</div>
    );
  }

  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <motion.div className={`flex w-max flex-nowrap ${className ?? ""}`} style={{ x }}>
        {/* Four copies so the -50% wrap never exposes an edge on wide screens. */}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-nowrap items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
