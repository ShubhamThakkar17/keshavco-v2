import type { CSSProperties } from "react";

/**
 * Chevron stack (brief §4): three nested chevrons derived from the mark's
 * layers, used as a divider, a section ornament and a loader. A motif only;
 * the logo itself is never redrawn.
 *
 * `eye` adds the green "result" dot at the core. `loader` staggers the
 * chevrons upward on a loop (reduced motion holds them still).
 */
export default function ChevronStack({
  className = "h-10 w-10",
  eye = false,
  loader = false,
  strokeWidth = 1.5,
}: {
  className?: string;
  eye?: boolean;
  loader?: boolean;
  strokeWidth?: number;
}) {
  // Nested, not stacked: one shared baseline, three apex heights.
  const paths = ["M4 36 L24 12 L44 36", "M11.5 36 L24 21 L36.5 36", "M19 36 L24 30 L29 36"];
  return (
    <svg
      viewBox="0 0 48 44"
      fill="none"
      aria-hidden="true"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d, index) => (
        <path
          key={d}
          d={d}
          className={loader ? "chevron-loader" : undefined}
          style={{ "--i": index } as CSSProperties}
          opacity={1 - index * 0.2}
        />
      ))}
      {eye && <circle cx="24" cy="38.5" r="2.4" className="fill-growth" stroke="none" />}
    </svg>
  );
}
