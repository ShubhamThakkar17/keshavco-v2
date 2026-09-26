import type { CSSProperties, SVGProps } from "react";

/**
 * A stroke that draws itself on (brief §6.3): 0.9s, 80ms stagger by `index`.
 *
 * `pathLength={1}` normalises the length, so one CSS rule (`.draw` in
 * globals.css) animates any path when its `LiveSvg` host gains `data-drawn`.
 * Pure CSS, so it costs no JavaScript per path; reduced motion shows it drawn.
 */
export default function DrawPath({
  index = 0,
  delay = 0,
  className = "",
  style,
  ...rest
}: SVGProps<SVGPathElement> & {
  /** Position in the stagger sequence. */
  index?: number;
  /** Extra milliseconds before this path's turn. */
  delay?: number;
}) {
  return (
    <path
      pathLength={1}
      className={`draw ${className}`}
      style={{ "--i": index, "--draw-delay": `${delay}ms`, ...style } as CSSProperties}
      {...rest}
    />
  );
}
