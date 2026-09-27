import type { ReactNode } from "react";

/**
 * Mono micro-label chip for sub-services and tags. Adapts to night sheets.
 * `wrap` lets a long label break onto two lines instead of overflowing a
 * narrow column (package inclusions on phones).
 */
export default function Chip({
  children,
  wrap = false,
  className = "",
}: {
  children: ReactNode;
  wrap?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`type-mono-s inline-flex items-center rounded-[var(--radius-sm)] bg-paper-2 px-2.5 text-ink-2 night:bg-white/[0.06] night:text-white/70 ${
        wrap ? "min-h-[26px] py-1" : "h-[26px] whitespace-nowrap"
      } ${className}`}
    >
      {children}
    </span>
  );
}
