"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Footer revealed from behind the page (Spartan): the footer is sticky to the
 * bottom of the viewport underneath `main`, which scrolls away over it.
 *
 * A bottom-sticky element only reveals cleanly when it fits in the viewport;
 * a taller footer would have its top cut off. So the reveal is switched on
 * only while the footer fits, and otherwise the footer sits in normal flow.
 * (`main` needs `position: relative; z-index: 1` and a background, set in
 * the layout.)
 */
export default function FooterReveal({
  children,
  className = "",
  as = "footer",
}: {
  children: ReactNode;
  className?: string;
  as?: "footer" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const measure = () => setFits(node.offsetHeight <= window.innerHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`${fits ? "sticky bottom-0" : "relative"} z-0 ${className}`}
      data-reveal={fits ? "" : undefined}
    >
      {children}
    </Tag>
  );
}
