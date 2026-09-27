import type { CSSProperties } from "react";
import Crosshair from "@/components/ui/Crosshair";

/**
 * The visible layout grid (brief §5.3). Dashed vertical guides at every second
 * column edge of the 12-column content grid: 7 edges (6 bays) on desktop,
 * 4 edges on tablet, the two outer edges on mobile. One guide per sheet is
 * solid Indigo at 35%, and horizontal hairlines can mark where content blocks
 * start, with a crosshair where they meet the Indigo guide.
 *
 * Absolutely positioned inside a `relative` parent (usually a `Sheet`), and
 * aligned to `container-page` so it lines up with the content above it.
 */

/** Left offset of desktop edge `k` (0–6) inside the content box. */
const desktopEdge = (k: number) =>
  k === 0 ? "0px" : k === 6 ? "calc(100% - 1px)" : `calc((100% + 24px) * ${k} / 6 - 12px)`;
/** Tablet edges: thirds of the grid. */
const tabletEdge = (k: number) => `calc((100% + 24px) * ${k} / 3 - 12px)`;

export default function GridGuides({
  accent = 0,
  rules = [],
  animate = false,
  className = "",
}: {
  /** Desktop edge (0–6) drawn in solid Indigo; `null` for none. Below the
   *  desktop breakpoint the accent sits on the left edge. */
  accent?: number | null;
  /** `top` values (any CSS length) for horizontal hairlines. `"pad"` means
   *  the sheet's own top padding, so the line sits where content starts. */
  rules?: string[];
  /** Draw the guides in from the top on load (hero only). */
  animate?: boolean;
  className?: string;
}) {
  const line = "guide-line guide-dash absolute inset-y-0 w-px";
  const tops = rules.map((top) => (top === "pad" ? "var(--sheet-pad, 128px)" : top));
  const accentLeft = accent === null ? null : desktopEdge(accent);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${animate ? "guides-animate" : ""} ${className}`}
    >
      {tops.map((top) => (
        <span
          key={`rule-${top}`}
          className="guide-line absolute inset-x-0 h-px bg-line night:bg-line-night"
          style={{ top }}
        />
      ))}

      <div className="container-page relative h-full">
        <div className="relative h-full">
          {/* Outer edges, every breakpoint. */}
          {accent !== 0 && <span className={line} style={{ left: 0 }} />}
          <span className={line} style={{ left: "calc(100% - 1px)" }} />

          {/* Tablet: thirds. */}
          {[1, 2].map((k) => (
            <span
              key={`t${k}`}
              className={`${line} hidden md:block lg:hidden`}
              style={{ left: tabletEdge(k) }}
            />
          ))}

          {/* Desktop: sixths. */}
          {[1, 2, 3, 4, 5].map((k) =>
            k === accent ? null : (
              <span
                key={`d${k}`}
                className={`${line} hidden lg:block`}
                style={{ left: desktopEdge(k) }}
              />
            ),
          )}

          {accentLeft !== null && (
            <span
              className="guide-line absolute inset-y-0 left-0 w-px bg-signal/35 lg:left-[var(--accent-x)]"
              style={{ "--accent-x": accentLeft } as CSSProperties}
            />
          )}

          {accentLeft !== null &&
            tops.map((top) => (
              <Crosshair
                key={`cross-${top}`}
                className="left-0 lg:left-[var(--accent-x)]"
                style={{ top, "--accent-x": accentLeft } as CSSProperties}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
