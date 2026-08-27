"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Lenis inertial scrolling, wired to the rAF loop.
 *
 * Skipped entirely when the visitor prefers reduced motion — hijacking the
 * scroll wheel is exactly what that setting is asking us not to do.
 */
export default function SmoothScroll() {
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // In-page anchors have to go through Lenis or they jump past the target.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -100 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
