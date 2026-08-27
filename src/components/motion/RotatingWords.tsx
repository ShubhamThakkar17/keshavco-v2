"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * The theme's signature kinetic headline: one phrase swaps for the next on a
 * timer, with the container width easing between them so the line does not jump.
 */
export default function RotatingWords({
  words,
  className,
  interval = 2600,
  gradient = true,
}: {
  words: readonly string[];
  className?: string;
  interval?: number;
  gradient?: boolean;
}) {
  const reduceMotion = useReducedMotionSafe();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, reduceMotion, words.length]);

  const accent = gradient ? "text-gradient-brand" : "";

  if (reduceMotion) {
    return <span className={`${accent} ${className ?? ""}`}>{words[0]}</span>;
  }

  return (
    <span className={`relative inline-grid align-bottom ${className ?? ""}`}>
      {/* An invisible copy of the longest phrase reserves the line width. */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <span className="col-start-1 row-start-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[index]}
            className={`inline-block whitespace-nowrap ${accent}`}
            initial={{ y: "100%", opacity: 0, rotateX: -35 }}
            animate={{ y: "0%", opacity: 1, rotateX: 0 }}
            exit={{ y: "-100%", opacity: 0, rotateX: 35 }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
