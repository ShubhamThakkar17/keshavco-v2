"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * One huge, low-contrast word that drifts sideways with the scroll (Spartan's
 * section words). Pure decoration: it repeats the section label at 5–6%
 * contrast, so it is drawn as CSS generated content rather than DOM text.
 * Screen readers, crawlers, contrast checkers and the word count all skip it.
 * Two per page at most.
 */
export default function GiantWord({
  word,
  className = "",
}: {
  word: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
    >
      <motion.p
        data-word={word}
        className="type-display-xxl whitespace-nowrap text-center text-ink/[0.06] before:content-[attr(data-word)] night:text-white/[0.05]"
        style={reduceMotion ? undefined : { x }}
      />
    </div>
  );
}
