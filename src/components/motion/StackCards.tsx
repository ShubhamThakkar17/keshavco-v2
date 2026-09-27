"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Sticky, overlapping cards (brief §9.4: packages and industries). On desktop
 * each card pins below the header while the next one slides over it; the
 * covered card eases back to 95% and dims. Phones and reduced motion get a
 * plain stack with no pinning.
 */
function Card({
  index,
  count,
  progress,
  top,
  still,
  children,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  top: number;
  still: boolean;
  children: ReactNode;
}) {
  const start = index / count;
  const end = (index + 1) / count;
  const last = index === count - 1;
  const scale = useTransform(progress, [start, end], [1, last ? 1 : 0.95]);
  const dim = useTransform(progress, [start, end], [0, last ? 0 : 0.35]);

  return (
    <div
      className={still ? "" : "lg:sticky"}
      style={still ? undefined : { top: `${top + index * 14}px` }}
    >
      <motion.div
        className="relative origin-top"
        style={still ? undefined : { scale }}
      >
        {children}
        {!still && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 hidden rounded-[var(--radius-lg)] bg-night lg:block"
            style={{ opacity: dim }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default function StackCards({
  items,
  top = 96,
  className = "",
}: {
  items: { key: string; node: ReactNode }[];
  /** Pixels from the viewport top where the first card pins. */
  top?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className={`flex flex-col gap-4 lg:gap-8 ${className}`}>
      {items.map((item, index) => (
        <Card
          key={item.key}
          index={index}
          count={items.length}
          progress={scrollYProgress}
          top={top}
          still={reduceMotion}
        >
          {item.node}
        </Card>
      ))}
    </div>
  );
}
