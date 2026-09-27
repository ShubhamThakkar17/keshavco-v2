"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, type ElementType, type ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { dur, ease, stagger as staggers, viewport } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  className?: string;
  as?: ElementType;
  /** Seconds between each word. */
  stagger?: number;
  delay?: number;
  once?: boolean;
  /** Fraction of the element that must be visible before it plays. */
  amount?: number;
  /** Rendered after the last word, for a rotating word or a full stop. */
  trailing?: ReactNode;
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: dur.reveal, ease: ease.outExpo } },
};

/**
 * Masked, word-by-word heading reveal (H2s). Each word sits in an
 * `overflow-hidden` span so it rises out of the line rather than fading in
 * place.
 *
 * The words stay real text in reading order: no aria-label on the wrapper
 * (not allowed on a generic span) and no aria-hidden on the words, so screen
 * readers and crawlers read the heading exactly as written.
 */
export default function SplitText({
  text,
  className,
  as = "span",
  stagger = staggers.words,
  delay = 0,
  once = true,
  amount,
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
      viewport={amount === undefined ? { ...viewport, once } : { once, amount }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span className="inline-block" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
      {trailing ? <> {trailing}</> : null}
    </MotionTag>
  );
}
