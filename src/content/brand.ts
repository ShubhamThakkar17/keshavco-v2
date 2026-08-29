/**
 * Brand assets.
 *
 * Every logo on the site — header, footer, favicon, the large hero graphic —
 * resolves through this file, so swapping in the supplied master artwork is a
 * file replacement in `public/brand/`, not a code change. See
 * `public/brand/README.md`.
 *
 * `mark` is used on light grounds; `markLight` on the dark navy sections.
 */
export const brand = {
  mark: "/brand/mark.svg",
  markLight: "/brand/mark-light.svg",
  /** Intrinsic size of the mark artwork, for layout reservation. */
  markSize: { width: 512, height: 512 },
  wordmark: "Keshav Consultancy",
  /** Shown under the wordmark in the footer and the logo lockup. */
  tagline: "Strategy. Branding. Digital. Growth.",
  alt: "Keshav Consultancy",
} as const;
