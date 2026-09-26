"use client";

import { useEffect, useRef, useState, type ReactNode, type SVGProps } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * The host `<svg>` for every animated diagram. It owns the lifecycle the brief
 * asks of all ambient motion:
 *
 * - sets `data-drawn` the first time it scrolls into view, which plays the
 *   `DrawPath` strokes and fades `FlowLine`s in (or on mount with `drawOnMount`);
 * - pauses its SMIL packets and CSS loops (`data-paused`) while offscreen,
 *   while the tab is hidden, and for reduced motion.
 *
 * Decorative by default (`aria-hidden`); pass `title` to give a meaningful
 * diagram an accessible name.
 */
export default function LiveSvg({
  children,
  title,
  drawOnMount = false,
  drawn: drawnProp,
  className,
  ...rest
}: Omit<SVGProps<SVGSVGElement>, "ref"> & {
  children: ReactNode;
  title?: string;
  drawOnMount?: boolean;
  /** Controlled draw state, for diagrams driven by a parent (e.g. a panel opening). */
  drawn?: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const [seen, setSeen] = useState(drawOnMount);
  const [visible, setVisible] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const paused = reduceMotion || !visible || tabHidden;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (paused) node.pauseAnimations();
    else node.unpauseAnimations();
  }, [paused]);

  const drawn = drawnProp ?? (seen || reduceMotion);

  return (
    <svg
      ref={ref}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
      data-drawn={drawn ? "" : undefined}
      data-paused={paused ? "" : undefined}
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}
