import type { CSSProperties, ElementType } from "react";

/**
 * H1 word blur-in (Sentira): each word rises 18px out of a 10px blur with a
 * 45ms stagger over 1.2s.
 *
 * Deliberately CSS, not Framer Motion: the animation starts with the first
 * paint rather than after hydration, and words start at 0.2 opacity, never 0,
 * so the heading still counts as the LCP element straight away. Reduced motion
 * (OS or site toggle) is handled by the global rule in globals.css.
 */
export default function BlurInWords({
  text,
  as = "span",
  className = "",
  delay = 150,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** Milliseconds before the first word. */
  delay?: number;
}) {
  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag className={className} style={{ "--blur-delay": `${delay}ms` } as CSSProperties}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="blur-in-word" style={{ "--i": index } as CSSProperties}>
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
