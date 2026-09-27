"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, useRef } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Manifesto paragraph that fills in word by word as it crosses the viewport:
 * each word tracks its own slice of the section's scroll progress, from
 * `from` opacity to full.
 *
 * Words stay readable text in order (no aria-label on the paragraph, which is
 * not allowed on a `p`, and no aria-hidden on the words).
 */
export default function ScrollHighlightText({
  text,
  className = "",
  from = 0.18,
}: {
  text: string;
  className?: string;
  /** Opacity of a word before it is reached. */
  from?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.42"],
  });

  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = (index + 1) / words.length;
        return (
          <Fragment key={`${word}-${index}`}>
            <Word progress={scrollYProgress} range={[start, end]} from={from}>
              {word}
            </Word>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  from,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  from: number;
}) {
  const opacity = useTransform(progress, range, [from, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  );
}
