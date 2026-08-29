# Brand assets

The supplied Keshav Consultancy artwork. Every logo on the site resolves
through `src/content/brand.ts`, which points here — replacing a file updates
the header, footer, hero and page heroes with no code change.

| File | Used for |
| :--- | :------- |
| `mark.png` | **Every logo on the site** — header, footer, hero, page heroes |
| `logo-horizontal.png` | Supplied lockup. Not used on the site — see below |
| `logo-vertical.png` | Supplied lockup. Not used on the site — see below |

`src/app/icon.png` (the favicon) is `mark.png` composited on the brand navy in
a rounded square. Regenerate it if the mark changes.

## Why only the mark is used on the site

The mark is authored with real transparency and holds up on both the white and
the navy sections, so one file serves everywhere — there is no reversed variant
to keep in step.

The two lockups are stored here as masters for decks, email signatures and
social profiles, but the site does not use them:

- **`logo-horizontal.png` has an opaque white background**, which would show as
  a white box on every dark section.
- **Both lockups set the wordmark in deep navy**, which all but disappears on
  the navy sections. Only the green "GROWTH." in the tagline survives.

So the header and footer pair `mark.png` with the wordmark as live text. That
keeps it crisp at any size, lets it recolour per background, and means the
lockups never need a reversed export.

If a reversed lockup (white wordmark, transparent background) is produced
later, add it here and the header and footer can switch to it.

## Replacing the artwork

Drop a new file in at the same path. SVG is preferred over PNG — the mark
renders from 36px in the header to roughly 600px in the hero — in which case
also update the path and `markSize` in `src/content/brand.ts`.
