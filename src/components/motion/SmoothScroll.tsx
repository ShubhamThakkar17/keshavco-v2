"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { setLenis } from "@/lib/lenis";

/**
 * Lenis inertial scrolling for wheel input, wired to the rAF loop.
 *
 * Touch devices keep native scrolling (`syncTouch: false`). Skipped entirely
 * when the visitor prefers reduced motion or has switched motion off:
 * hijacking the scroll wheel is exactly what that setting asks us not to do.
 * The instance is shared through `@/lib/lenis` so menus can pause it.
 */
export default function SmoothScroll() {
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
    });
    setLenis(lenis);

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
      lenis.scrollTo(target as HTMLElement, { offset: -24 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      setLenis(null);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
