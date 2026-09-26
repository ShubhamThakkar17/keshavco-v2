/**
 * Blueprint corner brackets: four 10px L-shapes in Indigo, framing a key tile
 * (hero hub, micro-stats, the active process step, the featured package).
 * Decorative only. The parent must be `position: relative`.
 */
export default function Brackets({
  size = 10,
  inset = 0,
  className = "",
}: {
  size?: number;
  /** Pixels outside (negative) or inside (positive) the parent's edge. */
  inset?: number;
  className?: string;
}) {
  const corner = "absolute border-signal";
  const box = { width: size, height: size, borderWidth: 0 } as const;
  const w = "1.5px";
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span
        className={corner}
        style={{ ...box, top: inset, left: inset, borderTopWidth: w, borderLeftWidth: w }}
      />
      <span
        className={corner}
        style={{ ...box, top: inset, right: inset, borderTopWidth: w, borderRightWidth: w }}
      />
      <span
        className={corner}
        style={{ ...box, bottom: inset, left: inset, borderBottomWidth: w, borderLeftWidth: w }}
      />
      <span
        className={corner}
        style={{ ...box, bottom: inset, right: inset, borderBottomWidth: w, borderRightWidth: w }}
      />
    </span>
  );
}
