import type { CSSProperties } from "react";

/**
 * A 9px Indigo "+" marking where the highlighted guide meets a hairline.
 * Centred on its own position, so place it with `left`/`top` at the
 * intersection. Decorative only.
 */
export default function Crosshair({
  className = "",
  style,
  size = 9,
}: {
  className?: string;
  style?: CSSProperties;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`guide-cross pointer-events-none absolute block -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ width: size, height: size, ...style }}
    >
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-signal" />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-signal" />
    </span>
  );
}
