import type { CSSProperties } from "react";

/**
 * Hover label roll (Sentira/Spartan). On hover or keyboard focus of the
 * nearest `.roll-host` ancestor, each letter lifts one line with a 12ms
 * stagger and a copy rises in from below.
 *
 * Pure CSS (see `.text-roll` in globals.css): the copy is a text-shadow, not a
 * second DOM string. The split letters are hidden from assistive tech, which
 * would otherwise announce them one by one, and the real label sits beside
 * them as screen-reader text. `data-wc` tells the word-count script to count
 * the label once.
 */
export default function TextRoll({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="sr-only" data-wc="count">
        {children}
      </span>
      <span aria-hidden="true" className="text-roll" data-wc="skip">
        {[...children].map((char, index) => (
          <span key={index} style={{ "--i": index } as CSSProperties}>
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
