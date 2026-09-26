# KeshavCo v3 changelog

Work happens on the `redesign/v3` branch, one commit per phase of
`docs/REDESIGN-V3.md` §13.

## Phase 0: Baseline

- Removed the duplicate brand PNGs at the repo root and the placeholder
  `docs/brand-source/x` (originals remain in `docs/brand-source/`).
- Ignored `docs/v3/refs/` (third-party reference material).
- Added dev-only QA tooling: `playwright` (1.56, matches the installed
  Chromium) and `@axe-core/playwright`.
- `scripts/route-audit.mjs`: records status, title, description, canonical,
  H1s and JSON-LD for every sitemap URL → `docs/v3/routes-before.json`.
- `scripts/wordcount.mjs`: visible words in `main` and page height.
- `docs/v3/baseline.md`: word count, height, first-load JS and Lighthouse
  before any visual change.

## Phase 1: Foundations

Tokens and type
- `globals.css`: v3 colour tokens (paper, night, ink, signal, growth, lines),
  radius and easing tokens, the `type-*` scale utilities, `sheet-pad`,
  `hatch`, and a `night:` variant that styles anything inside a
  `data-tone="night"` sheet. Removed the global heading letter-spacing.
  Moved the default border colour into the base layer so colour utilities win.
- `ink-3` fails contrast for text (2.4:1 on paper), so it is reserved for
  placeholders and decoration; small labels use `ink-2`, and small text on
  night is at least 60% white.
- Fonts: Geist Mono (labels only) added; Sora weights set to 400–700;
  only Sora is preloaded.

Motion system
- `src/lib/motion.ts` (ease, dur, stagger, viewport tokens).
- `useReducedMotionSafe` now honours both the OS setting and the site toggle
  (`<html data-motion="off">`), live, via `useSyncExternalStore`.
- A boot script restores the toggle before first paint and marks `html.js`.
- Lenis: `lerp 0.1`, touch stays native, instance shared through
  `src/lib/lenis.ts` (`lockScroll` / `unlockScroll` for menus).
- New primitives: `BlurInWords` (CSS, LCP-safe), `ScrambleText`,
  `ScrambleRotate`, `TextRoll` (CSS), `Odometer`, `DrawPath` (CSS),
  `FlowLine` (SMIL packets), `LiveSvg` (draw-on-enter host that pauses loops
  offscreen, when hidden and for reduced motion), `StickyStory`,
  `ExpandingPanels`, `SheetStack`, `FooterReveal`, `Magnetic`.
- Retuned: `Reveal`, `SplitText`, `ScrollHighlightText`, `Parallax`,
  `Marquee` (pauses on hover and offscreen). `SplitText` and
  `ScrollHighlightText` no longer put `aria-label` on generic elements (a
  baseline Lighthouse accessibility failure).

UI
- New: `SectionTag`, `SectionHead`, `Chip`, `Brackets`, `Crosshair`,
  `GridGuides`, `Sheet`, `GiantWord`, `StatTile`, `MotionToggle`.
- Rebuilt: `Button` (solid / ghost / link with icon tile, label roll and
  arrow swap; v2 variant names still map onto it) and `Accordion` (rows and
  pills).

Playground and tooling
- `/lab` (noindex, unlinked, not in the sitemap) shows every primitive in
  paper and night, with a Motion On/Off preview.
- `scripts/shoot.mjs` (checkpoint screenshots, `--stitch` for real
  scroll-position captures), `sharp` added as a dev dependency.
