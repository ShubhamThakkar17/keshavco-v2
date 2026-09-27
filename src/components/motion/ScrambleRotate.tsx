"use client";

import { useEffect, useRef, useState } from "react";
import ScrambleText from "@/components/motion/ScrambleText";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Cycles mono phrases, decoding each one in with `ScrambleText` (replaces the
 * v2 RotatingWords). Pauses while hovered or focused, while offscreen and
 * while the tab is hidden; reduced motion holds the first phrase.
 *
 * The rotating copy is hidden from assistive tech (it would be read on every
 * change); the full list is provided once as screen-reader text instead.
 * Width is reserved for the longest phrase so nothing around it moves.
 */
export default function ScrambleRotate({
  phrases,
  interval = 2600,
  className = "",
}: {
  phrases: readonly string[];
  interval?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const longest = phrases.reduce((a, b) => (a.length >= b.length ? a : b), "");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || !inView || held || phrases.length < 2) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => (current + 1) % phrases.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduceMotion, inView, held, interval, phrases.length]);

  return (
    <span
      ref={ref}
      className={`relative inline-grid align-baseline ${className}`}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <span className="sr-only">
        {phrases.join(", ")}
      </span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">
        <ScrambleText text={reduceMotion ? phrases[0] : phrases[index]} />
      </span>
    </span>
  );
}
