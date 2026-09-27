"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Rolling-digit counter (Sentira). Each digit is a 0–9 strip that rolls to
 * its target when the counter first scrolls into view, rightmost digit first.
 *
 * The final value is server-rendered twice over: as screen-reader text (so
 * assistive tech and crawlers read "26", not "0123456789…") and as the strips'
 * resting position. With JavaScript on, CSS parks the strips at 0 until the
 * counter is seen (see `.odometer` in globals.css), so there is no flash of
 * the final value first. Reduced motion shows the final value immediately.
 */
export default function Odometer({
  value,
  className = "",
  delay = 0,
}: {
  value: number | string;
  className?: string;
  /** Milliseconds added before the roll. */
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [run, setRun] = useState(false);
  const chars = String(value).split("");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const digitCount = chars.filter((c) => /\d/.test(c)).length;
  let digitIndex = 0;

  return (
    <span
      ref={ref}
      className={`odometer relative inline-flex tabular-nums ${className}`}
      data-run={run ? "" : undefined}
    >
      <span className="sr-only" data-wc="count">
        {value}
      </span>
      <span aria-hidden="true" data-wc="skip" className="inline-flex">
        {chars.map((char, index) => {
          if (!/\d/.test(char)) {
            return <span key={index}>{char}</span>;
          }
          const fromRight = digitCount - 1 - digitIndex;
          digitIndex += 1;
          return (
            <span key={index} className="relative inline-block h-[1em] overflow-hidden leading-none">
              <span
                className="odo-strip"
                style={
                  {
                    "--d": Number(char),
                    "--odo-delay": `${delay + fromRight * 110}ms`,
                  } as CSSProperties
                }
              >
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n} className="block h-[1em] leading-none">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
