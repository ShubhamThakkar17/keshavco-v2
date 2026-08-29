/**
 * Brand assets.
 *
 * Every logo on the site — header, footer, favicon, the large hero graphic —
 * resolves through this file, so replacing the artwork in `public/brand/` is
 * all it takes to update them. See `public/brand/README.md`.
 *
 * The mark is authored with transparency and reads on both the white and the
 * navy sections, so there is no separate reversed version to keep in step.
 */
export const brand = {
  mark: "/brand/mark.png",
  /** Intrinsic size of the mark artwork, for layout reservation. */
  markSize: { width: 946, height: 1024 },
  /** Supplied lockups, kept for decks, email signatures and social profiles.
   *  Not used on the site: the header and footer pair the mark with live text
   *  so the wordmark stays crisp and can recolour per background. Note the
   *  horizontal lockup has an opaque white background. */
  lockupHorizontal: "/brand/logo-horizontal.png",
  lockupVertical: "/brand/logo-vertical.png",
  wordmark: "Keshav Consultancy",
  tagline: "Strategy. Branding. Digital. Growth.",
  alt: "Keshav Consultancy",
} as const;
