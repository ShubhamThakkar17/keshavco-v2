"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { dur, ease, stagger as staggers } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 16, y: 0 },
  right: { x: -16, y: 0 },
  none: { x: 0, y: 0 },
};

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. */
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Adds a short blur-in — nice on headings, expensive on long lists. */
  blur?: boolean;
  once?: boolean;
  amount?: number;
  as?: ElementType;
};

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = dur.reveal,
  direction = "up",
  blur = false,
  once = true,
  amount = 0.12,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotionSafe();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const offset = offsets[direction];

  if (reduceMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        filter: blur ? "blur(8px)" : undefined,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: blur ? "blur(0px)" : undefined }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: ease.outExpo }}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its `RevealItem` children as the group scrolls in. */
export function RevealGroup({
  children,
  className,
  stagger = staggers.items,
  delay = 0,
  amount = 0.1,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  once?: boolean;
  as?: ElementType;
}) {
  const reduceMotion = useReducedMotionSafe();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduceMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: ElementType;
}) {
  const reduceMotion = useReducedMotionSafe();
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const offset = offsets[direction];

  if (reduceMotion) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: dur.reveal, ease: ease.outExpo },
    },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
