"use client";

import { useScroll, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * The one pinned, scroll-scrubbed story on the site (brief §6.3): a tall
 * track (220vh desktop, 170vh mobile) with a 100svh sticky frame. Children get
 * the track's 0–1 progress as a motion value and map it to state.
 *
 * With reduced motion there is no pinning at all: `fallback` renders instead
 * (for the problem story, the "Before" and "After" frames stacked).
 */
export default function StickyStory({
  children,
  fallback,
  id,
  className = "",
  frameClassName = "",
}: {
  children: (progress: MotionValue<number>) => ReactNode;
  fallback: ReactNode;
  id?: string;
  className?: string;
  frameClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The ref stays on the same element either way, so `useScroll` always has
  // a mounted target.
  return (
    <div
      id={id}
      ref={ref}
      className={`relative ${reduceMotion ? "" : "h-[170vh] lg:h-[220vh]"} ${className}`}
    >
      {reduceMotion ? (
        fallback
      ) : (
        <div className={`sticky top-0 h-[100svh] overflow-hidden ${frameClassName}`}>
          {children(scrollYProgress)}
        </div>
      )}
    </div>
  );
}
