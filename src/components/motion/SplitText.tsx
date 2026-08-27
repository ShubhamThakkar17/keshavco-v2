"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

type SplitTextProps = {
  text: string;
  className?: string;
  as?: ElementType;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  /** Rendered after the last word — used for a rotating word or a full stop. */
  trailing?: ReactNode;
};

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Masked, word-by-word heading reveal. Each word sits in an `overflow-hidden`
 * span so it rises out of the line above it rather than fading in place.
 *
 * The whole string stays in one accessible node — screen readers read the
 * heading, not a pile of one-word spans.
 */
export default function SplitText({
  text,
  className,
  as = "span",
  stagger = 0.055,
  delay = 0,
  once = true,
  amount = 0.35,
  trailing,
}: SplitTextProps) {
  const reduceMotion = useReducedMotionSafe();
  const Tag = as as ElementType;
  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <Tag className={className}>
        {text}
        {trailing ? <> {trailing}</> : null}
      </Tag>
    );
  }

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.span;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={trailing ? undefined : text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom pb-[0.12em]"
          aria-hidden="true"
        >
          <motion.span className="inline-block" variants={wordVariants}>
            {word}
            {index < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
      {trailing ? (
        <>
          {" "}
          {trailing}
        </>
      ) : null}
    </MotionTag>
  );
}
