# KeshavCo: keshavco.com

Marketing site for **Keshav Consultancy Pvt. Ltd.**, a business growth partner.
Version 3, "Growth Blueprint": a paper-and-navy canvas with visible grid
guides, mono annotations, live vector diagrams, 3D dot fields and scroll
storytelling. The brief is `docs/REDESIGN-V3.md`; the decisions taken with
Shubham during the build (which win over the brief) are in
`docs/v3/decisions.md`.

## Stack

| Piece | Choice |
| :---- | :----- |
| Framework | Next.js 15 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4 (CSS-first config and v3 tokens in `src/app/globals.css`) |
| Motion | Framer Motion 12, CSS keyframes, SMIL (SVG packets) |
| Smooth scroll | Lenis |
| 3D | three.js, loaded lazily (decision #5) |
| Type | Sora (display), Inter (body), Geist Mono (labels), via `next/font` |
| Booking | Cal.com (`@calcom/embed-react`) |
| Editor | Keystatic + Markdoc for Insights and Our Work (decision #21) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 (editor at /keystatic, on local files)
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project layout

```
src/
  app/                        routes (App Router)
    page.tsx                  home (ten sections)
    services/ [pillar]/ [pillar]/[service]/   hub, 4 pillars, 26 services
    growth-packages/ industries/ process/ about/ contact/ careers/ faq/
    insights/ insights/[slug]/                articles from the editor
    our-work/ our-work/[slug]/                portfolio (hidden until launched)
    privacy-policy/ terms-of-use/ disclaimer/ not-found.tsx
    keystatic/                the editor (Keystatic admin UI)
    api/enquiry/ api/careers/ api/subscribe/ api/keystatic/
    lab/                      component playground (404 unless NEXT_PUBLIC_LAB=1)
    opengraph-image.tsx sitemap.ts robots.ts
  components/
    layout/                   Header, MobileMenu, Footer, PageHero, LegalPage, SiteChrome
    motion/                   motion primitives (below)
    graphics/                 vectors, isometric art, WebGL scenes (gl/)
    sections/                 composed page sections
    cms/                      article renderer, blocks, cards
    forms/                    shared form fields
    ui/                       Button, Sheet, SectionHead, SectionTag, Chip, …
  content/                    ALL COPY LIVES HERE (typed modules)
    insights/ work/           editor content (Markdoc files)
  lib/                        seo, forms delivery, CMS reader, motion helpers
keystatic.config.tsx          editor collections and blocks
docs/                         brief, v3 records, forms and editor guides
scripts/                      audits and QA (below)
```

**All copy is in `src/content/`.** Editing text never means touching a
component. Approved long copy is kept; v3 adds `short` / `line` fields and
`*V3` label objects next to it.

## Visual system

- **Tokens** (`globals.css`, brief §5): paper / paper-2 / paper-3 / card,
  night / night-2 / night-3, ink / ink-2, signal (Indigo), growth (green, for
  outcomes only), line and guide colours; radii 6 / 16 / 28; `type-*`
  utilities from `display-xxl` to `mono-s`; `sheet-pad` section rhythm.
- **Sheets.** Each section is a `Sheet` (paper, paper-2 or night) with rounded
  top corners that overlap the one above; night sheets carry film grain. As a
  sheet scrolls away it eases back and dims (`SheetStack`). The header reads
  the sheet's `data-tone` and flips to night styling over dark sheets.
- **Blueprint devices.** `GridGuides` (six dashed guides, one Indigo),
  `Crosshair`, `Brackets`, numbered `SectionTag`s, mono labels, `GiantWord`.
- **Imagery.** Vectors and 3D instead of photographs (decision #4). The
  licensed stock photos stay in `public/images/` (credits in
  `public/images/CREDITS.md`) but are not used. The brief's photo
  dither/duotone script was therefore not built.
- **Brand mark.** `public/brand/` through `src/content/brand.ts`; never
  redrawn. The chevron motif (`ChevronStack`) is derived from its layers.

## Motion system

One small vocabulary, reused everywhere (`src/components/motion/`):

| Primitive | What it does |
| :-- | :-- |
| `SmoothScroll` | Lenis inertial scrolling, anchor offsets, scroll lock for the menu |
| `Reveal` | Fade and rise on enter, with stagger |
| `SplitText`, `BlurInWords` | Masked word reveal for H2s; CSS blur-in for H1s (LCP-safe) |
| `ScrambleText`, `ScrambleRotate` | Mono labels that decode in; the hero rotator |
| `TextRoll`, `RollingWords` | Label roll on hover; the footer's rolling line |
| `Odometer` | Digit strips for stat tiles |
| `ScrollHighlightText` | Statement that fills word by word with scroll |
| `DrawPath`, `FlowLine`, `LiveSvg` | Stroke drawing, dotted flows with packets, and the SVG host that pauses them offscreen |
| `StickyStory` | The pinned problem story on the home page |
| `StackCards` | Sticky overlapping cards (packages, industries) |
| `ExpandingPanels` | Capability panels |
| `SheetStack`, `FooterReveal` | Sheet recede; footer revealed from behind the page |
| `Parallax`, `Marquee`, `Magnetic`, `ScrollProgress` | Supporting effects |

**Reduced motion is first-class.** `useReducedMotionSafe()` honours both the
OS setting and the footer's Motion On/Off switch (`html[data-motion="off"]`,
remembered in `localStorage`). With motion off, pinned stories become static
frames, sticky stacks become plain stacks, canvases draw one still frame, and
nothing is hidden. Every auto-moving element also pauses offscreen, when the
tab is hidden, and on hover or focus.

## Graphics

`src/components/graphics/`:

- **Diagrams:** `HeroEngine` (channels into one hub, out to results),
  `CoordinationStory` (vendor tangle to hub), `ChannelHub`, `ProcessMini`,
  `PackagesMini`, `IndustryCluster`, `NetworkArt`, `CapabilityQuad`,
  `AboutMark`, `NotFoundArt`, `WaveLines`, `CompareIcons`.
- **Isometric art:** `capability/*` (four pillars), `industry/IndustryScene`
  (seven animated scenes), `industry/IndustryIcon`, `process/ProcessIcon`,
  with shared projection helpers in `iso.ts`.
- **WebGL** (`gl/`): `DotField` (terrain), `DotWordmark` (footer),
  `ChevronParticles` (manifesto). Loaded only when near the viewport and
  after the visitor's first interaction (or 8 s), DPR capped at 1.5, paused
  offscreen; a static frame with reduced motion.
- Labels and screen-reader sentences for diagrams: `src/content/graphics.ts`.

## Insights editor and Our Work

Articles are written at **`/keystatic`** and saved into this repository;
Vercel republishes in a minute or two. Editors can insert the site's
ready-made graphics and configurable ones (steps flow, funnel, bar chart, key
figure, callout, pull quote). **Setup and writing guide:
[docs/cms/README.md](docs/cms/README.md).** Until the GitHub App variables
are set, the site builds normally and `/keystatic` says it is not connected.

`/our-work` (portfolio and case studies) is built but hidden: 404, noindex,
not in the sitemap. Preview with `OUR_WORK_PREVIEW=1`; launch by setting
`visible: true` in `src/content/work.ts`.

## Forms

| Form | Route | Delivery |
| :-- | :-- | :-- |
| Enquiry (`/contact`) | `/api/enquiry` (unchanged from v2) | `ENQUIRY_WEBHOOK_URL` |
| Careers (`/careers`) | `/api/careers` | `FORMS_WEBHOOK_URL`, else `ENQUIRY_WEBHOOK_URL` |
| Newsletter (`/insights`) | `/api/subscribe` | same |

All three go to one Google Apps Script web app that adds a row to a Google
Sheet (a tab per form) and emails hello@keshavco.com. Each form has a hidden
honeypot. Without a webhook, submissions are written to the server log.
**Setup: [docs/forms/README.md](docs/forms/README.md)** (the Sheet already
exists in Google Drive, folder "KeshavCo website forms").

## Booking: Cal.com

`/contact#book` opens the "Book a call" tab with the Cal.com event
`hello-kc/discovery` (config: `booking` in `src/content/site.ts`). Every
"Book a consultation" button points there. `BookingEmbed` waits for Cal's
iframe; if none appears within nine seconds it shows a direct link and the
phone number. `/contact?intent=proposal&package=grow` opens the enquiry tab
with "Request proposal" and the package preselected.

## Environment variables

| Variable | Needed for |
| :-- | :-- |
| `ENQUIRY_WEBHOOK_URL` | Form delivery (the Apps Script URL with `?key=`) |
| `FORMS_WEBHOOK_URL` | Optional: careers and newsletter to a different endpoint |
| `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | The `/keystatic` editor on a deployment |
| `OUR_WORK_PREVIEW=1` | Preview the hidden Our Work pages (Preview environment only) |
| `NEXT_PUBLIC_LAB=1` | Show the `/lab` component playground |

## Scope note: services

Two pillars from the source copy document, **Offline Marketing** and
**Community & PR**, are intentionally not in this build. To add them back,
append the pillar objects to `pillars` in `src/content/services.ts`; the
navigation strip, services pages, sitemap and routes are all generated from
that array.

## Pre-launch checklist

- [x] Phone number: +91 70411 92168
- [x] Offices: Vadodara, Mumbai, Indore (footer, `/contact`, JSON-LD)
- [x] Open Graph image (`src/app/opengraph-image.tsx`)
- [x] Commitment lines confirmed (decision #17)
- [ ] **Forms:** deploy the Apps Script and set `ENQUIRY_WEBHOOK_URL`
      (`docs/forms/README.md`)
- [ ] **Editor:** create the GitHub App and set the four Keystatic variables
      (`docs/cms/README.md`)
- [ ] **Social profile URLs:** `site.social` (all `#`, so hidden)
- [ ] **Legal pages:** placeholder text in `legalPages` (`src/content/misc.ts`)
- [ ] **Real proof:** testimonials (`showTestimonials` is `false`), client
      logos, case studies in Our Work: only real, permissioned material
- [ ] **Founders block** on `/about`: names, roles and photos when possible
- [ ] **SVG logo files** (optional; the PNG mark is used everywhere)
- [ ] **Geist Mono** approved as the label font
- [ ] **Canonical domain:** `site.url` is `https://keshavco.com`

## SEO

Titles and descriptions live beside the copy in `src/content/`.
`src/lib/seo.ts` builds page metadata (with the shared Open Graph image) and
JSON-LD for Organization (with office addresses), BreadcrumbList, FAQPage,
Service and BlogPosting. `sitemap.ts` is generated from the content modules
and the published articles; `/lab`, `/keystatic` and the hidden Our Work pages
are never in it. `docs/v3/route-parity.md` shows the v2 → v3 parity (42/42
routes unchanged, plus `/careers`).

## Accessibility

Skip link, one `<h1>` per page, labelled fields with inline errors,
`aria-invalid` and focus moved to the first invalid field, `aria-expanded`
on menus, panels and accordions, keyboard tabs on `/contact`, Escape closes
overlays and returns focus, visible focus, 4.5:1 body contrast, decorative
art `aria-hidden` and meaningful diagrams with a screen-reader sentence.
axe reports no violations on any template (`scripts/axe.mjs`).

## Scripts

| Script | Purpose |
| :-- | :-- |
| `scripts/route-audit.mjs` | Status, title, description, canonical, H1s and JSON-LD for every sitemap URL |
| `scripts/route-parity.mjs` | Compares two audits into `docs/v3/route-parity.md` |
| `scripts/wordcount.mjs` | Visible words and height of a page |
| `scripts/copy-audit.mjs` | Paragraph (≤ 60 words) and heading budgets per route |
| `scripts/qa-sweep.mjs` | Console errors, hydration warnings, H1 count, phone fold |
| `scripts/overflow-check.mjs` | Horizontal overflow at any set of widths |
| `scripts/axe.mjs` | axe-core on every template, phone and desktop, motion on and off |
| `scripts/shoot.mjs` | Full-page or stitched screenshots |

Run them against `npm start` (default base `http://localhost:3000`).
Measurements before and after: `docs/v3/baseline.md`, `docs/v3/after.md`.
