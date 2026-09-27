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

## Phase 2: Graphics

Decisions from Checkpoint 1 are recorded in `docs/v3/decisions.md` (three.js
approved, motion graphics instead of photographs, navbar, careers, forms).

3D (three.js, lazy)
- `graphics/gl/GLCanvas.tsx`: one host for every WebGL scene. Imports the
  scene (and three.js) only near the viewport and after idle, caps DPR at
  1.5, throttles frames, pauses offscreen and in hidden tabs, draws one
  static frame for reduced motion, and falls back to a static graphic if
  WebGL is unavailable. three.js lands in two lazy chunks (about 124 KB
  gzipped) and never in first-load JS.
- Scenes: `DotField` (3D dot-matrix growth terrain, noise in the vertex
  shader, pointer ripple; paper and night), `ChevronParticles` (thousands of
  points converge from a scattered cloud into the chevron stack and green eye;
  scroll-scrubbed or auto), `DotWordmark` (the word in Sora sampled into dots
  in 3D, tilts and parts around the pointer).
- `simplex-noise` was not needed: the noise runs on the GPU (Ashima GLSL,
  MIT).

Vectors (SVG, CSS and SMIL; paused offscreen by `LiveSvg`)
- `HeroEngine` (7 inputs → hatched hub → 3 outputs, packets every 900ms,
  vertical layout below 768px), `CoordinationStory` (tangle → hub, scrubbed by
  scroll; static before/after frames for reduced motion), `CapabilityArt`
  (Strategy, Branding, Technology, Digital Marketing, isometric),
  `IndustryIcon` ×7, `IndustryScene` ×7 (animated isometric vignettes that
  replace the stock photos), `ProcessIcon` ×5, `CompareIcons`, `ChevronStack`
  (with loader), `WaveLines`, `NotFoundArt`, `ChannelHub`.
- `graphics/iso.ts`: shared isometric projection helpers; diagram labels live
  in `src/content/graphics.ts`.

Other
- `src/app/opengraph-image.tsx` (1200 × 630) with OFL fonts in `src/app/_og/`;
  `pageMetadata` now attaches it to every page (42/42 routes carry og:image;
  titles, descriptions and canonicals unchanged).
- Photo treatment (brief §7.3) dropped per decision #4.
- `/lab` shows every graphic in paper and night.

## Phase 3: Home page

- `src/app/page.tsx` rebuilt as ten sections (brief §9.2), all copy from
  `homeV3` in `src/content/home.ts` (plus short `line` fields on packages and
  process stages; approved long copy untouched):
  S1 `HomeHero` (inset card, guides draw in, blur-in H1, scramble rotator,
  hero engine, stat tiles over the 3D dot field) · S2 `IndustryStrip` ·
  S3 `ProblemStory` (pinned, scroll-scrubbed tangle → hub, headline swap at
  55%) · S4 `Manifesto` (the merged "Who we are" + "What you get", with the
  3D chevron particles assembling on scroll) · S5 `CapabilityPanels` ·
  S6 `IndustryGrid` (animated scenes instead of photos) · S7 `ProcessFlow`
  (packet walks the chain; active stage gets brackets and the green eye) ·
  S8 `PackagesPanel` (featured night column follows hover/focus) ·
  S9 `Compare` (With / Without, VS chip) · S10 `FaqSplit` (5 questions).
- The mid-page CTA band is gone; its line lives in the footer (decision #3).
- Retired: `Hero`, `IndustryMarquee`, `IndustryRail`, `RotatingWords`.
- Measured (production build): 9,760 px tall at 1440 × 900 (was 15,928);
  395 visible words in `main` excluding diagram labels, 451 including them
  (was 1,338; target 350); first-load JS 190 kB (target ≤ 190). axe: no
  violations at 1440 and 390, motion on and off.
- `scripts/wordcount.mjs` now skips screen-reader-only text and reports
  diagram (SVG) labels separately (`--svg true`).

## Phase 4: Global shell

- Header: floating nav pill with the four service pillars, then Packages ·
  Industries · About (decision #6); hovering or focusing a pillar opens a
  horizontal strip of its sub-services under the bar. Hides on scroll down
  after 160px, returns on scroll up, flips to night styling over night
  sheets (`src/lib/useSheetTone.ts`). 2px brand-gradient progress line.
- Mobile menu: full-screen night sheet (clip-path reveal, guides, numbered
  links, CTA, email, phone), scroll locked via Lenis, focus trapped, Escape
  closes and returns focus.
- Footer: revealed from behind `main`; 3D dot-field bookend, `[09] CONTACT`,
  "Let's talk about" + rolling line, the merged CTA line and two buttons,
  compact link columns, mono contact row (social links hidden while their
  URL is `#`), Motion On/Off switch, 3D dot wordmark, legal line.
- `layout.tsx`: paper body; `main` lifts off the footer (z-index, rounded
  bottom corners).

## Phase 5: Inner pages, careers and forms

- `PageHero` rebuilt (brief §9.3): inset paper card, mono breadcrumb, page
  tag, blur-in H1 (`type-display-page`), one short line, actions and a
  page-specific vector (`CapabilityQuad`, `CapabilityArt`, `PackagesMini`,
  `IndustryCluster`, `ProcessMini`, `AboutMark`, `NetworkArt`). No 3D on
  inner pages.
- Templates (brief §9.4): `/services` (pillar rows, supporting cells, channel
  hub, service FAQs), pillar pages (overview, problem as three cards,
  sub-service cells, outcomes checklist, process in brief, related package,
  pillar CTA), 26 sub-service pages (intro, three numbered points, "part of"
  strip), `/growth-packages` (panel + ad-spend note, sticky package cards,
  includes matrix, the three questions), `/industries` (seven sticky night
  cards led by the animated scenes, `id={slug}` kept), `/process` (pinned
  horizontal track on desktop, stacked on phones and with reduced motion),
  `/about` (manifesto, mission and vision, principles, structure, structural
  counts, With / Without; founders block ready but hidden until real names
  and photos are supplied), `/contact` (split: H1, direct rows and "what
  happens next" beside booking / enquiry tabs; `#book` selects booking,
  `?intent=proposal&package=` preselects the form, 9-second Cal fallback
  unchanged), `/faq` (topic chips over light rows, FAQPage JSON-LD keeps all
  nine), `/insights` (DRAFTING rows, newsletter form), legal pages (68ch
  reading layout, mono headings) and the 404 (`NotFoundArt`).
- New `/careers` page (decision #7, route 43, added to the sitemap): how
  KeshavCo is structured, two ways in, and an open application with a CV or
  portfolio link field. No openings, people or perks invented.
- Forms (decisions #8 and #9): v3 underline fields shared by all forms
  (`src/components/forms/Field.tsx`) with a hidden honeypot. New
  `/api/careers` and `/api/subscribe` forward to `FORMS_WEBHOOK_URL` or
  `ENQUIRY_WEBHOOK_URL` (`src/lib/forms.ts`); `/api/enquiry` is unchanged.
  Google Apps Script (sheet tab per form + email to hello@keshavco.com) and
  setup guide in `docs/forms/`.
- Every page's long approved copy is still rendered, split between sentences
  so no paragraph runs over 60 words (`src/lib/text.ts`). New section labels
  and short lines live in `servicesV3`, `packagesV3`, `industriesV3`,
  `processV3`, `aboutV3`, `faqV3`, `contactV3`, `insightsV3`, `legalV3`,
  `notFoundV3` and `careersPage`.
- Careers added to the footer's Company column and the mobile menu.
- Retired: `CapabilityShowcase`, `PackagesStack`, `ProcessTimeline`,
  `CtaBand`, `SpotlightCard`, `Counter`, `BrandFeature`, `MediaFrame`,
  `IndustryExplorer`, `PillarIcon`, `Section` (`Eyebrow`, `SectionHeading`).
- Fix: the footer wordmark no longer throws when its canvas has no size yet.
- `scripts/overflow-check.mjs`: horizontal-overflow check for every route.
- `scripts/axe.mjs`: axe-core on one route per template, desktop and phone, motion on and off.

## Phase 6: Copy compression and parity

- Short hero lines and compressed variants for every inner page live in the
  content modules; every long approved field is still rendered, split at
  sentence breaks. Longest rendered paragraph: 57 words.
- `docs/v3/routes-after.json` and `docs/v3/route-parity.md`: 42/42 original
  routes keep their title, description, canonical, robots and JSON-LD types
  with one H1 each; `/careers` is route 43. `/growth-packages` H1 now reads
  "Engagements built around outcomes" (v2 rendered it without the space).
- `scripts/copy-audit.mjs` (paragraph and heading budgets per route) and
  `scripts/route-parity.mjs` (parity report).
- Fixes from the checks: package and industry inclusion chips wrap on narrow
  phones (360px overflow); `/about` statement keeps 3:1 contrast before it
  fills; `/faq` gains an H2 above the questions; failed form submits move
  focus to the first invalid field.
