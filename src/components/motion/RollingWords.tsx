"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { ease } from "@/lib/motion";

/**
 * A line that rolls vertically through phrases (the footer heading's second
 * line). Pauses while hovered or focused, offscreen, and in hidden tabs;
 * reduced motion holds the first phrase. Width is reserved for the longest
 * phrase; the full list is given once to screen readers.
 */
export default function RollingWords({
  words,
  interval = 2800,
  className = "",
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || held || !inView || words.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduceMotion, held, inView, interval, words.length]);

  const current = reduceMotion ? words[0] : words[index];

  return (
    <span
      ref={ref}
      className={`relative inline-grid overflow-hidden align-bottom ${className}`}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
    >
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={current}
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.7, ease: ease.inOutQuart }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
