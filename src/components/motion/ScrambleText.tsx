"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/+>";
const FRAME_MS = 28;

/**
 * Mono text that decodes from random glyphs into its final value (Oberon).
 * Runs once when it scrolls into view (or on mount), and again whenever
 * `text` changes after that, which is how `ScrambleRotate` cycles phrases.
 *
 * The server renders the final text, so crawlers, no-JS visitors and reduced
 * motion all get real words. The animation rewrites the text node's value in
 * place, so React keeps ownership of the node. Mono glyphs share one width,
 * so the line never reflows while it scrambles.
 */
export default function ScrambleText({
  text,
  as = "span",
  className,
  trigger = "inView",
  delay = 0,
  duration = 600,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  trigger?: "inView" | "mount";
  /** Milliseconds before the first scramble. */
  delay?: number;
  /** Milliseconds, capped at 600 by the brief. */
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const [armed, setArmed] = useState(trigger === "mount");
  const firstRun = useRef(true);
  // Latest text, so an interrupted scramble always settles on the current value.
  const latest = useRef(text);
  useLayoutEffect(() => {
    latest.current = text;
  }, [text]);

  useEffect(() => {
    if (armed || trigger !== "inView") return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [armed, trigger]);

  useEffect(() => {
    const node = ref.current?.firstChild;
    if (!armed || reduceMotion || !node || node.nodeType !== Node.TEXT_NODE) return;

    const total = Math.min(duration, 600);
    const wait = firstRun.current ? delay : 0;
    firstRun.current = false;
    let start = 0;
    let last = 0;
    let frame = 0;

    const tick = (now: number) => {
      if (!start) start = now + wait;
      if (now < start) {
        frame = requestAnimationFrame(tick);
        return;
      }
      if (now - last >= FRAME_MS) {
        last = now;
        const progress = Math.min(1, (now - start) / total);
        const resolved = Math.floor(progress * text.length);
        let out = "";
        for (let i = 0; i < text.length; i += 1) {
          const char = text[i];
          out +=
            i < resolved || char === " "
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        node.nodeValue = out;
        if (progress >= 1) {
          node.nodeValue = text;
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      node.nodeValue = latest.current;
    };
  }, [armed, reduceMotion, text, delay, duration]);

  const Tag = as;
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
