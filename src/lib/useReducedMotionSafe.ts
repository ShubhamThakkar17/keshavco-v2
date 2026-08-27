"use client";

import { useEffect, useState } from "react";

/**
 * `prefers-reduced-motion`, resolved only after mount.
 *
 * Framer's own `useReducedMotion` can resolve to a different value on the
 * server than on the client's first render. Any component that branches on it
 * to render *different markup* — a split heading vs. a plain string, a counter
 * at 0 vs. at its final value — then hydrates with mismatched output, which
 * React reports as a hydration error and repairs by re-rendering the subtree.
 *
 * Returning `false` until mounted keeps the first client render identical to
 * the server's, then flips to the real preference on the next commit. Reduced
 * motion still wins; it just wins one paint later.
 */
export default function useReducedMotionSafe(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
