"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-800 shadow-[0_8px_30px_-12px_rgb(15_23_42/0.5)]",
  secondary:
    "border border-navy-900/15 bg-white/60 text-navy-900 backdrop-blur hover:border-navy-900/35 hover:bg-white",
  ghost: "text-navy-900 hover:text-indigo-brand px-0",
  light:
    "border border-white/25 bg-white/10 text-white backdrop-blur hover:border-white/60 hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[0.95rem]",
};

export type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

/**
 * Pill button with a magnetic pull toward the cursor. The pull is small on
 * purpose — enough to feel responsive, not enough to make it hard to click.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  withArrow = false,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const reduceMotion = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 });

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `${base} ${variants[variant]} ${variant === "ghost" ? "" : sizes[size]} ${className}`;

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <span
          aria-hidden="true"
          className="relative z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </>
  );

  // The springs stay parked at 0 when the handlers are not attached, so the
  // reduced-motion path renders a completely static button.
  const style = { x: springX, y: springY };
  const handleMove = reduceMotion ? undefined : onMouseMove;
  const handleLeave = reduceMotion ? undefined : reset;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <motion.a
          href={href}
          className={classes}
          style={style}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <motion.span
        className="inline-flex"
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <Link href={href} className={classes}>
          {inner}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {inner}
    </motion.button>
  );
}
