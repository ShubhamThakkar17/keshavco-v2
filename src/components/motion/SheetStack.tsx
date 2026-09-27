"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * The "sheet stack" depth effect (Spartan): as a sheet scrolls away under the
 * next one, it eases back to 96% and dims by up to 12%, so the incoming sheet
 * reads as sliding over it. Only the tail of the sheet is affected: the effect
 * runs from its bottom edge reaching the viewport bottom to leaving the top.
 *
 * Renders the sheet element itself so server content passes straight through.
 */
export default function SheetStack({
  as = "section",
  className,
  style,
  children,
  ...rest
}: {
  as?: "section" | "div" | "header";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
  "data-tone"?: string;
  "data-sheet"?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.12]);
  const Tag = motion[as];

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={reduceMotion ? style : { ...style, scale, transformOrigin: "50% 100%" }}
      {...rest}
    >
      {children}
      {!reduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit] bg-night"
          style={{ opacity: dim }}
        />
      )}
    </Tag>
  );
}
