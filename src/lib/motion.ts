/**
 * Motion tokens (docs/REDESIGN-V3.md §6.2). Every Framer Motion transition on
 * the site reads from here so the timing stays one system. The same curves
 * exist as CSS variables in globals.css (`--ease-out-expo` and friends).
 */
export const ease = {
  /** Default for reveals. */
  outExpo: [0.16, 1, 0.3, 1],
  /** Panels, sheets, menus. */
  inOutQuart: [0.76, 0, 0.24, 1],
  /** Tiny UI pops only (chips, dots). */
  outBack: [0.34, 1.56, 0.64, 1],
} as const;

/** Seconds. */
export const dur = { micro: 0.2, ui: 0.45, reveal: 0.8, hero: 1.2, story: 1 } as const;

/** Seconds between siblings. */
export const stagger = { letters: 0.025, words: 0.045, items: 0.07 } as const;

/** Shared `whileInView` viewport: fire once, a little before the fold. */
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;
