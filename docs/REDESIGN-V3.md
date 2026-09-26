# KeshavCo v3: Website Redesign Brief for Claude Code
 
**Repo:** `github.com/ShubhamThakkar17/keshavco-v2` (Next.js 15 · React 19 · Tailwind v4 · Framer Motion 12 · Lenis)
**Live today:** https://keshavco-v2.vercel.app
**Design references studied:** spartanai.framer.website · sentira.framer.website · oberon.framer.website
**Brief version:** v1.0 · 27 Sep 2026 · Owner: Shubham Thakkar (Keshav Consultancy)
 
---
 
## 0. How to use this file (for Shubham)
 
1. Copy this file into the repo as `docs/REDESIGN-V3.md` and commit it on `main`. (The repo is public. If you would rather keep the brief private, keep it outside the repo and give Claude Code its full path instead.)
2. Copy the brand files from `Keshav Co/KC - BRANDING/` into the repo at `docs/brand-source/` (logo-1.png, logo-2.png, logomark.png, brandkit-1.png) so Claude Code can see them.
3. Open Claude Code in the repo folder and paste the **Kickoff prompt** below.
4. At each checkpoint Claude Code stops and shows you screenshots. Reply with the matching **Checkpoint prompt** (or your changes).
### Kickoff prompt (paste into Claude Code)
 
```text
You are redesigning the KeshavCo marketing site in this repo into "v3".
Read docs/REDESIGN-V3.md completely before touching any file. It is the source of truth for design, motion, copy budgets and process.
 
Then:
1. Enter plan mode. Produce a phase-by-phase plan that maps to Section 13 (Phases 0 to 8) of the brief, listing the files you will create, change or retire in each phase. Wait for my approval.
2. After approval, create the branch `redesign/v3` and execute Phase 0 and Phase 1 only.
3. Stop at Checkpoint 1: run typecheck, lint and build, then show me Playwright screenshots of /lab at 1440px and 390px wide, and list anything in the brief you could not follow and why.
 
Rules: follow Section 2 (Hard rules) without exception. Where the brief and the codebase disagree on FACTS (routes, content, config), the codebase wins. Where they disagree on DESIGN, the brief wins. Never invent testimonials, client logos, statistics or case studies. Commit at the end of every phase with a clear message.
```
 
### Checkpoint prompts
 
```text
CHECKPOINT 1 APPROVED. Execute Phase 2 (vectors, canvas graphics, image treatment). Stop at Checkpoint 2 with screenshots of every new graphic on /lab, at 1440 and 390, plus one reduced-motion screenshot.
```
```text
CHECKPOINT 2 APPROVED. Execute Phase 3 and Phase 4 (home page and global shell). Stop at Checkpoint 3 with full-page screenshots of / at 1440, 1024 and 390, a 10-second screen recording or GIF of the hero and the problem story if you can produce one, and the home page word count.
```
```text
CHECKPOINT 3 APPROVED. Execute Phases 5 and 6 (inner pages and copy compression). Stop at Checkpoint 4 with full-page screenshots of one page per template and the route parity report.
```
```text
CHECKPOINT 4 APPROVED. Execute Phase 7 (QA) and Phase 8 (preview deploy). Do not merge to main. Give me the preview URL and the QA report.
```
 
---
 
## 1. Mission and success criteria
 
Turn a long, text-heavy site (home page ≈ 1,500 words, ≈ 15,700 px tall, stock photos in rounded cards) into a **minimal, visual, motion-led** site where diagrams, vectors, treated imagery and choreographed scroll explain what KeshavCo does, and words are used only where a picture cannot do the job.
 
KeshavCo's positioning in one line: *most businesses do not have a marketing problem, they have a coordination problem; KeshavCo is the one partner that owns strategy, execution and the result.* Every visual on the new site should make that idea visible.
 
**Measurable targets**
 
| Metric | Today | Target |
| :-- | :-- | :-- |
| Visible words on `/` (excluding collapsed FAQ answers) | ≈ 1,500 | **≤ 350** |
| Home page height at 1440 × 900 (including the footer reveal) | ≈ 15,700 px | **≤ 10,500 px** |
| Content sections on `/` | 14 | **10** (plus the footer) |
| Lighthouse mobile Performance / Accessibility / Best Practices / SEO | not measured | **≥ 90 / 100 / 100 / 100** |
| LCP (mobile, simulated 4G) | not measured | **≤ 2.2 s** |
| CLS | not measured | **≤ 0.05** |
| First-load JS for `/` (gzip) | not measured | **≤ 190 KB** |
| Routes returning 200 | 42 | **42, same URLs, same titles and descriptions** |
 
---
 
## 2. Hard rules (non-negotiable)
 
1. **No fabricated proof.** Never invent testimonials, client names or logos, team members, case studies, ratings, "X businesses served" figures or results. The reference sites are full of fake proof; KeshavCo has none yet and must not fake it. Keep `showTestimonials = false`. The only numbers allowed are structural facts already in `src/content/home.ts` (`proofCounters`: 4 capabilities, 26 services, 7 industries, 1 point of accountability) and facts already in content (30-minute consultation).
2. **Do not copy the references.** Borrow patterns (layout ideas, motion ideas, typographic rhythm). Do not copy their images, illustrations, copy, logos, icon files or exact compositions.
3. **Keep every route.** All 42 URLs in `src/app/sitemap.ts` keep their paths, `<title>`, meta description, canonical and JSON-LD. One `<h1>` per page. No content that matters for SEO may exist only inside a canvas or an image.
4. **All copy stays in `src/content/`.** Components never hard-code copy. When shortening, add `short` / `line` fields next to the long ones instead of deleting approved copy (the long copy still renders on inner pages).
5. **Brand is fixed:** colours Deep Navy `#0F172A`, Indigo `#4F46E5`, Purple `#7C3AED`, Green `#22C55E`; type Sora (display) + Inter (body). You may add **one** mono face (Geist Mono) for labels. Do not recolour or redraw the logo. The logo files are in `public/brand/`.
6. **Never write "WordPress"** anywhere client-facing (house rule). Say "custom-built website" if needed.
7. **Do not touch business plumbing** beyond restyling: `src/app/api/enquiry/route.ts`, the Cal.com config in `src/content/site.ts` (`booking`), `src/lib/seo.ts` (extend only), `sitemap.ts`, `robots.ts`.
8. **Dependencies:** allowed to add `simplex-noise` (runtime), `sharp` (dev, image script) and dev-only QA tooling (`playwright`, `@axe-core/playwright`, Lighthouse via `npx`). Anything else (GSAP, three.js, Lottie, R3F, icon packs, UI kits) needs my approval first. Use inline SVG + Framer Motion + 2D canvas.
9. **Reduced motion is a first-class mode**, not an afterthought (Section 6.6). Every moving thing also has a pause control or stops by itself within 5 seconds (WCAG 2.2.2).
10. **Git:** work on `redesign/v3`. Commit per phase. Never force-push, never merge to `main`, never deploy to production. Vercel preview deploys only.
11. **Copy style:** in new or shortened copy, prefer full stops and commas over em dashes. Indian English is fine; keep the existing voice (plain, direct, senior).
---
 
## 3. What exists today (facts from the repo)
 
**Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4 with CSS-first tokens in `src/app/globals.css`, Framer Motion 12, Lenis smooth scroll, `next/font` (Sora + Inter), Cal.com embed. All copy in typed modules under `src/content/`. `README.md` documents everything; read it.
 
**Routes (42):** `/`, `/services`, 4 pillars (`/services/strategy`, `/branding`, `/technology`, `/digital-marketing`), 26 sub-services (6 + 6 + 6 + 8), `/growth-packages`, `/industries`, `/about`, `/process`, `/insights`, `/faq`, `/contact`, `/privacy-policy`, `/terms-of-use`, `/disclaimer`.
 
**Current look:** dark navy hero with glowing mark, white/navy-50 alternating sections, 17 Unsplash photos in rounded cards, gradient text accents, many paragraphs. Motion is already decent (Lenis, SplitText, scroll highlight, pinned industry rail, sticky package stack) but it decorates text instead of replacing it.
 
**Keep, evolve or retire**
 
| Existing file | Decision | Notes |
| :-- | :-- | :-- |
| `motion/SmoothScroll.tsx` | Keep | Lenis. Add `lenis.stop()` while the mobile menu is open. |
| `motion/Reveal.tsx`, `SplitText.tsx`, `Parallax.tsx`, `Marquee.tsx`, `ScrollProgress.tsx` | Keep, restyle | Re-tune durations to the new tokens (6.2). |
| `motion/ScrollHighlightText.tsx` | Keep | Used for the manifesto line. |
| `motion/Counter.tsx` | Replace | New `Odometer` (rolling digits). |
| `motion/RotatingWords.tsx` | Replace | New `ScrambleRotate` in mono. |
| `motion/SpotlightCard.tsx` | Retire | Off-direction. |
| `graphics/BrandFeature.tsx` | Retire from hero | Keep only for `not-found.tsx` if useful. |
| `sections/Hero.tsx` | Replace | New `HeroEngine` hero. |
| `sections/IndustryMarquee.tsx` | Evolve | Mono strip with separators. |
| `sections/CapabilityShowcase.tsx` | Replace | New `CapabilityPanels` (expanding panels). |
| `sections/IndustryRail.tsx` | Replace on `/` | New `IndustryGrid`. |
| `sections/IndustryExplorer.tsx` | Replace on `/industries` | New `IndustryStack` (sticky full-bleed cards). |
| `sections/PackagesStack.tsx` | Replace | New `PackagesPanel` (joined columns). |
| `sections/ProcessTimeline.tsx` | Replace | New `ProcessFlow`. |
| `sections/CtaBand.tsx` | Replace | CTA moves into `FooterReveal`. |
| `sections/Testimonials.tsx` | Keep, stays off | Restyle only; flag stays `false`. |
| `sections/BookingEmbed.tsx`, `ContactForm.tsx` | Keep logic, restyle | Mono labels, underline inputs. |
| `ui/MediaFrame.tsx` | Evolve | Becomes `TreatedImage`. |
| `ui/Button.tsx` | Rebuild | Icon-tile button + text roll. |
| `ui/Section.tsx` (`Eyebrow`, `SectionHeading`) | Rebuild | New `SectionTag` + `SectionHead`. |
| `ui/Accordion.tsx` | Restyle | Pill rows, see 5.4. |
| `layout/Header.tsx`, `Footer.tsx`, `PageHero.tsx` | Rebuild | See Section 9. |
 
---
 
## 4. Design direction: "Growth Blueprint"
 
**Concept.** KeshavCo is the firm that turns scattered marketing into one engineered growth system. The site should look like the *blueprint of that system*: a calm paper-and-navy canvas with visible layout guides, numbered sections, mono annotations, and live diagrams where parts flow into one hub and come out as results. Dark "night" sheets carry the atmospheric moments (manifesto, capabilities, comparison, footer) with a dot-matrix growth landscape that echoes the peacock-feather mark.
 
**Brand motif.** The KeshavCo mark reads as a stylised peacock feather (a nod to the Keshav name): nested chevrons around a green "eye". Use two derived motifs, never altering the logo itself:
- **Chevron stack**: 3 nested chevrons (like the mark's layers) as a vector device for section dividers, loaders and the hub frame.
- **The eye**: a small green teardrop/dot that marks "the result" in diagrams (the output node, the live dot, the active step).
### 4.1 What we take from each reference
 
| Reference | Take this | Where it goes on KeshavCo |
| :-- | :-- | :-- |
| **Oberon** (primary structure) | Visible column guides with one highlighted accent column; crosshair `+` markers and corner brackets; numbered section tags (`[02] AREAS`); Geist Mono uppercase annotations; animated node diagram in the hero (files flowing into a logo hub); dot-matrix landscape; typewriter/scramble text reveals; line icons with a solid accent square; process as columns joined by dotted arrows with labels like `DATA IN >`; results as big-number rows; industry grid with chevron lists; hub-and-spoke integrations diagram with travelling particles; dithered 1-bit photography; background bands that shift tone between sections. | Whole grid system, hero diagram, section tags, process, industries, image treatment. Orange accent becomes **Indigo**. |
| **Spartan** (layout and polish) | Inset hero card (page margin ≈ 12px, radius ≈ 20 to 28px) over a full-bleed visual; floating pill nav + separate CTA pill with an icon tile; oversized, tightly-tracked display type (Inter Display 56 to 70px, tracking −0.04em); scroll-scrubbed word fill for a manifesto sentence; stat bento cards; horizontal **expanding panels** with isometric line-art (collapsed panels show a vertical mono label); section "sheets" with rounded corners that overlap the previous section; giant low-contrast section words (≈ 200px); joined pricing panel with one dark featured column and a subtle wave-line texture; dark pill FAQ accordions; **footer reveal** with a giant wordmark. | Header, hero frame, manifesto, capabilities, packages, FAQ, footer, sheet stacking. |
| **Sentira** (mood and texture) | Letter/word blur-in for the hero headline; film grain on dark; particle-wave terrain as a top and bottom bookend; brand-tinted halftone imagery; **odometer** rolling counters; pill section tags with a small icon; service rows with tags and an expanding image; process cards with grainy gradient orbs; "With us / Without us" comparison card with a centre VS chip; full-width case cards with a blurred copy of the image behind a sharper inset; text-roll hover on nav and buttons. | Hero headline motion, dark sheets, counters, comparison section, industry stack on `/industries`, button hovers. |
 
**The mix rule:** Oberon's system is the skeleton, Spartan's composition is the body, Sentira's texture is the skin. Do not use all three references' tricks in one viewport. Maximum one "hero" effect per screen.
 
---
 
## 5. Design system
 
### 5.1 Colour tokens (add to `@theme` in `globals.css`, keep the existing navy scale)
 
```css
@theme {
  /* Surfaces */
  --color-paper:    #F4F5F7;  /* default light background (cool paper) */
  --color-paper-2:  #E8EBF1;  /* alternate band (Oberon's second band, cooled) */
  --color-paper-3:  #DCE1EA;  /* third band / pressed states */
  --color-card:     #FFFFFF;
  --color-night:    #080D18;  /* = navy-950, dark sheets */
  --color-night-2:  #0F172A;  /* = navy-900, dark cards */
  --color-night-3:  #17213A;  /* raised dark card */
 
  /* Ink */
  --color-ink:      #0F172A;
  --color-ink-2:    #47608E;  /* secondary text on paper */
  --color-ink-3:    #8A9BB8;  /* tertiary, placeholders, disabled */
 
  /* Signals */
  --color-signal:   #4F46E5;  /* Indigo: Oberon's orange role */
  --color-signal-2: #7C3AED;  /* Purple: gradients only */
  --color-growth:   #22C55E;  /* Green: results, live dots, the "eye" */
  --color-growth-ink: #15803D; /* green text on paper (large text only) */
 
  /* Lines */
  --color-line:       rgb(15 23 42 / 0.10);
  --color-guide:      rgb(15 23 42 / 0.07);   /* dashed column guides */
  --color-line-night: rgb(255 255 255 / 0.10);
  --color-guide-night: rgb(255 255 255 / 0.06);
}
```
 
Usage rules:
- **Paper is the default** (not white). White `#FFF` only for cards and tiles on paper.
- **Indigo is the only accent on paper** (section-number chip, highlighted guide column, crosshairs, chevrons `>`, active states, focus rings, links on hover).
- **Green only means "result"**: output nodes, the live dot, positive arrows, the feather eye. Green text only on night backgrounds (contrast), or ≥ 24px on paper using `--color-growth-ink`.
- **Brand gradient** (`indigo → purple → green`, the existing `--gradient-brand`) appears at most once per viewport: the dot-landscape colouring, the footer wordmark, a 2px rule. No gradient text in body sections anymore.
- Night sheets carry the existing `grain` utility at ~0.25 opacity.
### 5.2 Typography
 
Add Geist Mono via `next/font/google` (`Geist_Mono`, variable `--font-mono`). Keep Sora and Inter.
 
| Token | Font | Size (clamp) | Weight | Tracking | Line height | Use |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| `display-xxl` | Sora | `clamp(4rem, 14vw, 13rem)` | 700 | −0.05em | 0.9 | Giant section words, footer wordmark |
| `display-xl` | Sora | `clamp(2.75rem, 6vw, 5.5rem)` | 600 | −0.045em | 0.98 | H1 |
| `display-l` | Sora | `clamp(2.1rem, 3.8vw, 3.5rem)` | 600 | −0.04em | 1.02 | H2 |
| `display-m` | Sora | `clamp(1.5rem, 2.2vw, 2rem)` | 600 | −0.03em | 1.1 | H3, panel titles, big numbers labels |
| `stat` | Sora | `clamp(2.5rem, 5vw, 4.5rem)` | 500 | −0.04em | 1 | Odometer numbers |
| `body-l` | Inter | 1.125rem | 400 | −0.005em | 1.55 | Lead lines (max 1 per section) |
| `body` | Inter | 1rem | 400 | 0 | 1.6 | Paragraphs (inner pages) |
| `body-s` | Inter | 0.875rem | 400 | 0 | 1.55 | Card lines |
| `mono` | Geist Mono | 0.8125rem | 500 | 0.02em | 1.45 | UPPERCASE labels, tags, annotations, nav meta |
| `mono-s` | Geist Mono | 0.6875rem | 500 | 0.04em | 1.4 | Micro labels on diagrams, `// 01`, coordinates |
 
Rules: headlines are short enough to hold 1 to 3 lines at desktop; use `text-balance`. Mono is always uppercase except code-like fragments (`// 01`). Never set more than 2 lines of mono in a row. Remove the global `h1..h5` letter-spacing rule in favour of these tokens.
 
### 5.3 Grid, spacing, shape
 
- **Layout grid:** 12 columns, max content width 84rem (keep `container-page`), gutters 24px desktop, 16px mobile.
- **Visible guides (`GridGuides` component):** absolutely positioned, `aria-hidden`, drawn per sheet. Desktop shows **6 dashed vertical guides** aligned to every 2nd column edge; tablet 4; mobile 2 (edges only). Guide style: 1px dashed `--color-guide` (dash 4, gap 4). **One guide per sheet is solid Indigo at 35% opacity** (Oberon's orange line), placed at the left edge of the content column the headline sits in. Horizontal hairlines (solid `--color-line`) mark the top of each section's content block. Put a 9px **crosshair `+`** in Indigo where the highlighted guide meets a horizontal hairline.
- **Corner brackets (`Brackets` component):** 10px L-shaped corners, 1.5px Indigo, on key tiles (hero hub, micro-stats, active process step, featured package).
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160. Section padding: 128px top/bottom desktop, 88px tablet, 72px mobile.
- **Radius:** `--radius-sm: 6px` (buttons' icon tile, chips), `--radius-md: 16px` (cards, tiles), `--radius-lg: 28px` (sheets, hero inset, big media). Diagrams and grid cells stay square (0) for the blueprint feel. Pills (999px) only for the nav pill and the section tag on night sheets.
- **Elevation:** almost none. Cards on paper: 1px `--color-line` border, no shadow. Floating UI (nav pill, menus): `0 1px 0 rgb(255 255 255/.6) inset, 0 12px 32px -12px rgb(15 23 42/.25)` + `backdrop-filter: blur(14px)`.
- **Sheets:** each major section is a `Sheet` with `rounded-t-[28px]` and `-mt-7` so it overlaps the one above (Spartan). Tones: `paper`, `paper-2`, `night`. The sheet sets `data-tone` so the header can flip colour (see 9.1).
### 5.4 Core components (build these first, show them all on `/lab`)
 
| Component | Spec |
| :-- | :-- |
| `SectionTag` | Oberon style: a 28×28 Indigo square with the two-digit number in white mono, joined to a paper-3 chip with the label in mono uppercase. On night sheets: Indigo square + `night-3` chip. Label reveal uses `ScrambleText`. Props: `index`, `label`. |
| `SectionHead` | `SectionTag` + H2 (`display-l`, `SplitText` masked reveal) + optional one line (`body-l`, max 18 words) + optional right-aligned action. Layout: tag and H2 left in columns 1 to 7, action bottom-right. |
| `Button` | Two variants. **Solid**: ink background, white text, left **icon tile** (36×36, radius 6, paper background, ink arrow/chevron glyph) inset 4px, text 15px Inter 500, height 44 (48 on `lg`). **Ghost**: 1px line border, transparent. On night: inverted. Hover: `TextRoll` on the label and the icon tile's arrow slides out right and a new one slides in from the left (220ms). Focus ring 2px Indigo, offset 3px. |
| `Chip` | Mono-s uppercase, 26px tall, radius 6, `paper-2` bg (night: white/6%). Used for sub-services, tags. |
| `TreatedImage` | Evolution of `MediaFrame`. Stacks a 1-bit dithered layer over the duotone (or colour) layer. See 7.3. Props: `image`, `treatment: "dither" \| "duo" \| "color"`, `reveal: "hover" \| "inView" \| "none"`, `radius`. |
| `Brackets`, `Crosshair`, `GridGuides` | Blueprint ornaments, all `aria-hidden`. |
| `StatTile` | Mono label + `Odometer` number + optional one-line note; corner brackets. |
| `Accordion` (restyle) | Light: white rows on paper, 1px line, 64px min height, Inter 500 17px question, `+` rotates to `×`. Night: rows as dark pills (`night-2`, radius 16) like Spartan. Height animates with FM `layout`. Keep `aria-expanded`. |
| `Sheet` | Section wrapper: tone, overlap, guides, `data-tone`, optional `grain`. |
| `GiantWord` | One huge low-contrast word (`display-xxl`, ink at 6% on paper, white at 5% on night) that drifts horizontally with scroll (Parallax x: −8% → 8%). Max 2 on the home page. |
 
 
---
 
## 6. Motion system
 
### 6.1 Principles
 
1. **Motion explains, it does not decorate.** Every animated element either shows a relationship (parts flowing into one hub), a change of state (chaos to order), or guides attention to the next action.
2. **One lead animation per viewport.** Everything else in view is quiet (fades, small rises).
3. **Scroll owns storytelling, time owns ambience.** Stories (problem, process) are scroll-scrubbed; ambient loops (terrain, particles) are slow and pausable.
4. **Fast in, never in the way.** Entrance reveals finish within 0.9s; nothing blocks reading or clicking.
### 6.2 Tokens (add to `@theme` and a `src/lib/motion.ts` export)
 
```ts
export const ease = {
  outExpo: [0.16, 1, 0.3, 1],     // default for reveals
  inOutQuart: [0.76, 0, 0.24, 1], // panels, sheets, menus
  outBack: [0.34, 1.56, 0.64, 1], // tiny UI pops only (chips, dots)
} as const;
export const dur = { micro: 0.2, ui: 0.45, reveal: 0.8, hero: 1.2, story: 1 } as const;
export const stagger = { letters: 0.025, words: 0.045, items: 0.07 } as const;
export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;
```
 
Lenis: `lerp: 0.1`, `wheelMultiplier: 1`, `smoothWheel: true`, `syncTouch: false` (touch devices keep native scrolling; test on iOS Safari).
 
### 6.3 Primitive inventory
 
| Primitive | Status | Behaviour | Used in |
| :-- | :-- | :-- | :-- |
| `Reveal` / `RevealGroup` | keep | opacity 0 → 1, y 24 → 0, optional blur 8 → 0; stagger `items` | everywhere |
| `SplitText` | keep | masked word rise for H2 | section heads |
| `BlurInWords` | **new** | words: blur 10px → 0, y 18 → 0, opacity 0.2 → 1, stagger `words`, `dur.hero`. Do not start the H1 at opacity 0 (protects LCP). | hero H1, page hero H1 |
| `ScrambleText` | **new** | mono text decodes from random glyphs (`A–Z 0–9 / + >`) to final, 28ms per frame, 600ms max; runs once on enter | section tags, diagram labels, mono lines |
| `ScrambleRotate` | **new** (replaces RotatingWords) | cycles phrases with ScrambleText every 2.6s; pauses on hover/focus and when offscreen; `aria-live="off"`, full list in sr-only text | hero rotator, footer heading |
| `TextRoll` | **new** | label duplicated; on hover the first copy slides up −100% and the second slides in from 100%, 280ms `outExpo`, 12ms per-letter stagger | nav links, buttons |
| `Odometer` | **new** (replaces Counter) | each digit is a vertical strip 0–9; rolls to target on enter with per-digit delay (right digit first), 1.1s; tabular numerals; renders final value in SSR for crawlers | hero micro-stats, stat tiles |
| `DrawPath` | **new** | SVG `pathLength` 0 → 1 on enter (FM `motion.path`), 0.9s, stagger 0.08 per path | all line illustrations |
| `FlowLine` | **new** | dotted connector (`stroke-dasharray: 2 6`) with dash offset animating (CSS, 1.2s linear infinite) and 1 to 3 "packets" (4px circles) travelling along the path via `offset-path` or FM keyframes on `getPointAtLength` | hero engine, problem story, process, hub |
| `ScrollHighlightText` | keep | word fill against scroll | manifesto |
| `StickyStory` | **new** | pinned container (height 220vh desktop, 170vh mobile) exposing `progress` (0–1) via `useScroll`; children map progress to state | problem story |
| `ExpandingPanels` | **new** | horizontal accordion; active panel flex-grow 6, others 1; `layout` animation `inOutQuart` 0.7s; collapsed panels show a rotated mono label; auto-advance every 6s until the user interacts, pauses offscreen | capabilities |
| `SheetStack` | **new** | each `Sheet` overlaps the previous; while a sheet scrolls over, the previous sheet's inner content scales 1 → 0.96 and dims 0 → 12% (Spartan) | page shell |
| `FooterReveal` | **new** | footer is `position: sticky; bottom: 0; z-index: 0` behind `main` (`z-index: 1`, paper background, rounded bottom corners 28px); main scrolls away to reveal it | global |
| `GiantWord` | **new** | see 5.4 | 2 per home page max |
| `Marquee` | keep | reacts to scroll velocity; add pause on hover and when reduced motion | industry strip |
| `Magnetic` | **optional** | primary CTA only, max 6px pull | hero CTA |
 
Do **not** add: custom cursors, page-wide preloaders, scroll-jacking beyond the one `StickyStory`, parallax on body text, hover tilt on cards.
 
### 6.4 Canvas graphics (2D canvas, no WebGL)
 
**`DotField`** (hero bottom, night bookends). A perspective dot-matrix terrain.
- Grid: desktop 140 × 48 points, tablet 100 × 36, mobile 64 × 26. Cap `devicePixelRatio` at 1.5.
- Height: `y = simplex3(x*0.045, z*0.06, t*0.00012) * amp` (+ a second octave at half amplitude). Project with a simple pinhole camera (fov ≈ 55°, camera tilted down ≈ 18°). Dot radius 0.6 to 1.8px by depth; alpha by depth.
- Colour: on paper, ink at 10 to 28% alpha with ~4% of dots Indigo; on night, a height-mapped brand gradient (low = Indigo, mid = Purple, peaks = Green) at 35 to 90% alpha.
- A soft upward "growth ridge": bias height with a smoothstep ramp left-to-right so the landscape rises towards the right edge (the growth curve, subtly).
- Interaction: pointer creates a gentle ripple (radius 120px, 400ms decay). None on touch.
- Performance: `requestAnimationFrame` only while in view (IntersectionObserver), ~30fps throttle, pause when `document.hidden`. Reduced motion: draw one static frame.
**`DotWordmark`** (footer). Renders "KeshavCo" in Sora 700 on an offscreen canvas, samples it on a 6px (desktop) / 4px (mobile) grid, draws a dot for each covered cell. Dots breathe with the same noise field; pointer repels within 80px. Colour: brand gradient across the word. Provide real text in an `sr-only` span.
 
**`HubParticles`** (optional, integrations hub on `/services`): particles travelling along spokes into the centre; can be SVG instead of canvas if under 40 moving elements.
 
### 6.5 Choreography of the first load (home)
 
| t (ms) | What happens |
| :-- | :-- |
| 0 | Page paints with H1, sub, CTAs already laid out (no layout shift). |
| 0 to 500 | Grid guides draw from top to bottom (scaleY 0 → 1, `inOutQuart`), crosshairs pop (`outBack`). |
| 150 to 1100 | `SectionTag` scrambles in; H1 `BlurInWords`. |
| 500 to 900 | Sub line and CTAs rise (Reveal). Nav pill slides down 12px and fades in. |
| 600 to 2200 | Hero engine: input tiles appear in a scatter-then-settle, `FlowLine`s draw, hub frame brackets snap in, packets start flowing, output nodes light with the green eye. |
| 900 to 1600 | Micro-stats Odometers roll. |
| 1000+ | DotField fades in from 0 to 100% over 800ms. |
 
### 6.6 Reduced motion (`prefers-reduced-motion: reduce` or the footer "Motion off" toggle)
 
- Lenis is never initialised.
- All reveals render final state. Scramble renders final text. Odometers show final values.
- Canvas graphics draw one static frame. `FlowLine` shows static dotted lines, no packets.
- `StickyStory` becomes two stacked static frames ("Before" and "After") with no pinning.
- `ExpandingPanels` stops auto-advance; panels still open on click.
- Marquees stop; they become a wrapped row.
- Add a small **"Motion: On / Off"** toggle in the footer (mono). It sets `data-motion="off"` on `<html>` and stores the choice in `localStorage` (wrapped in try/catch). `useReducedMotionSafe()` must honour both the media query and this attribute.
---
 
## 7. Visual asset plan
 
### 7.1 Vector inventory (inline SVG React components in `src/components/graphics/`)
 
Style for all vectors: 1.25px strokes (1.5px on mobile), `stroke-linecap: round`, ink at 70% on paper / white at 70% on night, **one solid Indigo square** (or the green eye for "result") as the accent, isometric 30° projection for illustrations, flat 2D for icons. `viewBox` based, `currentColor` driven, `aria-hidden` with an sr-only description where meaningful. Animate with `DrawPath` + small transforms.
 
| Component | Description | Animation |
| :-- | :-- | :-- |
| `HeroEngine` | Left: 7 small "file" tiles (folded corner, like Oberon's) labelled in mono-s: `BRAND`, `WEBSITE`, `SEO`, `ADS`, `SOCIAL`, `CRM`, `CONTENT`, arranged in a loose 3-column cluster. Centre-right: the **hub**, a 128px square with a 12px diagonal-hatch Indigo border (hatch = repeating 45° lines), corner brackets, the KeshavCo mark (`public/brand/mark.png` via `next/image`, or SVG if supplied) centred on white. Right: 3 output nodes with icons and mono-s labels: `ENQUIRIES`, `PIPELINE`, `MONTHLY REPORT`; the nearest output carries the green eye. Dotted `FlowLine`s from every input to the hub, and hub to outputs. Tiny mono-s annotations on lines: `// COORDINATED`, `// MEASURED`. | Load sequence in 6.5. Then loop: every 900ms a packet leaves a random input, reaches the hub (hub brackets pulse 1.00 → 1.04), and 300ms later a green packet exits to an output. Hover an input tile: it lifts 2px and its line brightens. Mobile: vertical layout (inputs row on top, hub, outputs row at bottom). |
| `CoordinationStory` | Used in the `StickyStory`. **State A:** a central node `YOU` with 6 vendor nodes scattered around (`BRANDING AGENCY`, `WEB DEVELOPER`, `ADS FREELANCER`, `SEO VENDOR`, `SOCIAL AGENCY`, `PRINTER`), each tied to `YOU` and to 1 or 2 other vendors with crossing, tangled dashed curves (ink 30%); a few small warning glyphs (`!`, a clock) near `YOU`, drawn in ink (no red anywhere on the site). **State B:** vendors slide into a tidy vertical column on the left, all lines straighten and route into the KeshavCo hub, one clean solid line runs from the hub to `YOU`, the green eye appears on `YOU`. | Scroll progress 0 to 0.35 hold State A with lines gently jittering (±2px); 0.35 to 0.75 morph (node positions interpolate, curves flatten by interpolating control points, tangled lines fade out, new straight lines `DrawPath` in); 0.75 to 1 hold State B. The headline swaps with a masked vertical roll at 0.55. |
| `CapabilityArt/Strategy` | Isometric grid plane; three stacked translucent planes (labels mono-s `NOW`, `PLAN`, `TARGET`); a dotted route climbs from the lowest plane through the middle to a small flag on the top plane; Indigo square at the flag. | Route draws; planes rise 8px in sequence when the panel opens. |
| `CapabilityArt/Branding` | Three isometric cards fanned from a stack: a logo card (showing the **chevron stack** motif), a colour card (4 swatches outlined, one solid Indigo), a type card (`Aa`). | Cards fan out from the stack (rotate/translate) on panel open. |
| `CapabilityArt/Technology` | Isometric browser window and a phone, both linked by dotted lines to a small 3-layer server stack; one node is Indigo. | Packets travel browser → server → phone on a loop while the panel is open. |
| `CapabilityArt/DigitalMarketing` | Isometric bar chart of 5 rising bars on a grid; a target ring floating above the tallest bar; a small arrow climbing with the green eye at its tip. | Bars grow in sequence (spring), arrow climbs. |
| `IndustryIcon/*` (7) | 40px line icons: Manufacturing (gear + factory roofline), Healthcare (shield with cross), Education (cap + calendar page), Real Estate (building + location pin), D2C (box + cart), Retail (storefront awning), Professional Services (briefcase + document). Each with one Indigo accent square. | `DrawPath` on enter; on hover the accent square hops 2px. |
| `ProcessIcon/*` (5) | Discover (magnifier over a dot grid), Create Strategy (route with waypoints), Execute (two interlocking gears), Measure (gauge with needle), Scale (three stacked blocks growing). | Draw on enter; active step gets brackets and the green eye. |
| `CompareIcons` | Small check/cross glyphs and 5 row icons (plan, contact, review, ownership, spend). | none |
| `ChevronStack` | 3 nested chevrons derived from the mark, used as a divider and a loading indicator. | Chevrons stagger-fade upward (loader only). |
| `WaveLines` | 14 thin horizontal sine lines for the featured package column texture (Spartan's Pro column). | Slow phase drift, 20s loop, pauses offscreen. |
| `Hatch`, `Brackets`, `Crosshair`, `GridGuides` | Ornaments. | Guides draw on load only. |
| `NotFoundArt` | A single file tile falling off the grid with a dotted line ending in `404`. | Gentle float. |
 
### 7.2 Canvas graphics
 
`DotField` and `DotWordmark` as specified in 6.4.
 
### 7.3 Photography: make the stock look bespoke
 
The 17 Unsplash photos in `public/images/` stay (they are licensed and credited in `CREDITS.md`) but are **never shown raw in grids again**. Create `scripts/treat-images.mjs` (Node + `sharp`, run manually, commit outputs):
 
1. **Duotone** → `public/images/treated/{name}-duo.webp`: greyscale, contrast +10%, map shadows to `#0F172A` and highlights to `#E8EBF1`; 1600px wide max.
2. **Dither** → `public/images/treated/{name}-dither.png`: resize to 50% of display width, greyscale, apply an 8×8 **Bayer ordered dither** to 1-bit, then upscale ×2 with nearest-neighbour (chunky pixels like Oberon). Output as a PNG with ink `#0F172A` pixels on transparent (so it sits on paper or night).
3. Register both variants in `src/content/images.ts` (extend `SiteImage` with `duo` and `dither` paths). Keep the original for full-colour reveals.
```js
// Bayer 8x8 core (use in the script)
const B8 = [0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,12,44,4,36,14,46,6,38,60,28,52,20,62,30,54,22,3,35,11,43,1,33,9,41,51,19,59,27,49,17,57,25,15,47,7,39,13,45,5,37,63,31,55,23,61,29,53,21];
// pixel on if luminance(0..255) < (B8[(y%8)*8 + (x%8)] + 0.5) * 4
```
 
`TreatedImage` behaviour: dither layer on top of the duotone. On hover (desktop) a radial mask centred on the pointer (`mask-image: radial-gradient(circle at var(--x) var(--y), transparent 0 120px, black 180px)`) dissolves the dither to reveal the colour photo; on touch and on `inView` reveal, the mask grows from the centre to cover the frame once (900ms). Reduced motion: show the duotone only.
 
### 7.4 New imagery (shot list, when you can)
 
Stock is a stop-gap. In priority order:
1. **Founders:** real photos of Shubham and Krupal (waist-up, plain wall, window light, navy/grey clothing). Needed for `/about`. Never AI-generate people presented as the team.
2. **Work in progress:** real screenshots of KeshavCo deliverables (with client permission) for a future case-study block. Until then, no case studies.
3. **India-context industry scenes** to replace the 7 industry photos (Unsplash licence, search terms): `indian factory floor`, `india hospital corridor`, `indian school campus`, `ahmedabad skyline`, `packaging flatlay india`, `indian retail store`, `indian office meeting`. Drop files into `public/images/incoming/` and re-run the treatment script.
4. **Optional AI-generated abstract plates** (only abstract, never people or fake work), consistent prompt: *"Minimal abstract 3D render, dot-matrix landscape made of tiny glowing particles rising towards the right, deep navy #080D18 background, indigo and violet particles with a few green highlights at the peaks, soft fog, cinematic, no text, 16:9"*. The canvas `DotField` already covers this, so this is optional.
### 7.5 Open Graph image
 
Add `src/app/opengraph-image.tsx` using `next/og` (1200 × 630): night background, dot-grid pattern drawn with absolutely positioned dots, "One partner. Strategy to execution." in Sora 600, the mark, and `KESHAVCO.COM` in mono. Per-pillar OG images optional.
 
---
 
## 8. Copy rules and proposed short copy
 
### 8.1 Budgets
 
| Element | Max |
| :-- | :-- |
| H1 | 8 words |
| H2 | 8 words |
| Lead line under a heading | 18 words, one sentence, optional |
| Card / panel line | 12 words |
| Mono label | 4 words |
| Paragraphs on `/` | **zero** (FAQ answers excepted, collapsed by default) |
| Visible words on `/` | ≤ 350 |
| Inner pages | Keep the full approved copy, but break it into scannable blocks (Section 9.4). No paragraph over 60 words. |
 
### 8.2 Where copy lives
 
Add a `short` object to the relevant content modules (for example `home.ts → heroV3`, `problemStory`, `manifesto`, `compare`) and new optional fields such as `line` on pillars, industries, packages and process stages. Never delete the long fields.
 
### 8.3 Proposed home copy (use verbatim unless it breaks a budget; lines marked **NEW** are derived from approved copy, everything else is already in `src/content`)
 
| Section | Copy |
| :-- | :-- |
| Hero tag | `[01] BUSINESS GROWTH PARTNER` |
| Hero H1 | **One partner. Strategy to execution.** (existing `site.tagline`) |
| Hero rotator (mono) | `WE SOLVE →` `GROWTH PROBLEMS` / `MARKET ENTRY` / `LEAD GENERATION` / `BRAND POSITIONING` / `SCALE CHALLENGES` (existing `hero.rotatingWords`) |
| Hero line | **NEW** Strategy, branding, technology and marketing, run by one accountable team. |
| Hero CTAs | `Book a consultation` → `/contact#book` · `See how it works` → `#problem` |
| Hero micro-stats | `4` CAPABILITIES · `26` SERVICES · `7` INDUSTRIES · `1` POINT OF ACCOUNTABILITY (existing `proofCounters`) |
| Strip | `BUILT FOR` + the 7 industries (existing `industryStrip.items`) |
| Problem tag | `[02] THE PROBLEM` |
| Problem state A | **NEW** **Six vendors. Nobody owns the result.** (from `whyKeshavCo.body`) |
| Problem state B | **One strategy. One team. One point of accountability.** (existing `whyKeshavCo.body`) |
| Manifesto | We diagnose the business before we prescribe the marketing. Everything we recommend, we can execute. Everything we execute, we measure. (joined from `whyKeshavCo.cards[0]` and `whoWeAre.body[2]`) |
| Capabilities | `[03] CAPABILITIES` · **Four capabilities. One growth plan.** · panels use each pillar's existing `tagline` |
| Industries | `[04] INDUSTRIES` · **Growth looks different in every industry.** · cells use existing industry `tagline` |
| Process | `[05] PROCESS` · **From growth problem to measurable result.** · stage titles from `processStages`, output labels: `DIAGNOSIS >`, `ROADMAP >`, `DELIVERY >`, `REPORT >`, `COMPOUND >` |
| Packages | `[06] PACKAGES` · **Engagements built around outcomes, not service lists.** · names and `audience` lines from `growthPackages`, first 4 `includes` each |
| Compare | `[07] WHY KESHAVCO` · **NEW** **What changes with one partner.** (rows in 9.2) |
| FAQ | `[08] FAQ` · **Questions businesses ask us first.** · existing `homeFaqs` |
| Footer | `[09] CONTACT` · **Let's talk about** + rotator (existing `footer.rotatingWords`) · `Book a consultation` · mono row: email, phone, city |
 
 
---
 
## 9. Page-by-page specification
 
### 9.1 Global shell
 
**Header (`layout/Header.tsx`, rebuild)**
- **Desktop:** two floating elements, 20px from the top, aligned to the container.
  - Left **nav pill** (height 52, radius 999, `paper/75` + `backdrop-blur(14px)`, 1px line): mark 28px + "KeshavCo" (Sora 600, 16px), a 1px divider, then links `Services ▾` · `Packages` (→ `/growth-packages`) · `Industries` · `About` in Inter 500 14px with `TextRoll`. Active route: Indigo 4px dot under the label. `Insights` leaves the nav until real posts exist (the route stays live and in the footer).
  - Right **CTA**: solid `Button` with icon tile, label `Book a consultation` → `/contact#book`.
- **Scroll behaviour:** after 160px, hide on scroll down (y −120%, 300ms `inOutQuart`), show on scroll up. The header reads the `data-tone` of the sheet under it (IntersectionObserver with a thin rootMargin band at 40px from the top) and flips to night styling (`night-3/70`, white text) over night sheets. Keep `ScrollProgress` as a 2px brand-gradient line pinned to the very top of the viewport.
- **Services mega menu:** opens on hover (150ms intent delay) or click. Panel drops below the pill (y −8 → 0, 250ms), 760px wide, radius 20, paper, 1px line. 4 columns: a 40px simplified pillar icon, pillar name (Sora 600), its sub-services (Inter 14, `TextRoll`), and `All services →` at the bottom. Escape closes; `aria-expanded` on the trigger; closes on route change.
- **Mobile (< 1024px):** the pill holds mark + wordmark + a menu button (icon tile with two lines that morph to ×). The menu is a full-screen night sheet revealed with `clip-path: inset(0 0 100% 0) → inset(0)` (500ms `inOutQuart`), with `GridGuides`, links in `display-l` staggered 60ms with mono index numbers (`01`…`05`), and at the bottom a full-width CTA plus mono email and phone. Lock scroll (`lenis.stop()`), trap focus inside, Escape and the × close it, return focus to the trigger.
**Footer (`FooterReveal`, rebuild)**, night sheet revealed from behind `main`:
1. `DotField` bookend, 200px tall, fading into night at the bottom.
2. `SectionTag [09] CONTACT` + H2 **Let's talk about** followed by a second line that rolls through `footer.rotatingWords` (Sora, vertical masked roll, 2.8s per phrase, pauses on hover).
3. CTAs: `Book a consultation` (solid, inverted) and `Send an enquiry` (ghost) → `/contact`.
4. Mono row aligned to the guides: `HELLO@KESHAVCO.COM` · `+91 70411 92168` · social links (**render only links whose href is not `#`**) · `MOTION: ON / OFF` toggle.
5. Three compact mono link columns: Services (4 pillars), Company (About, Packages, Industries, Process, Insights, Contact), Legal (3 pages).
6. `DotWordmark` "KeshavCo" spanning the container width (max 260px tall).
7. Mono-s legal line: `© {year} KESHAV CONSULTANCY PVT. LTD.`
`main` gets `position: relative; z-index: 1; background: var(--color-paper); border-radius: 0 0 28px 28px` so it lifts off the footer.
 
### 9.2 Home page (`src/app/page.tsx`), section by section
 
Target order and tones:
 
| # | Section | Sheet tone | Approx. height @1440 |
| :-- | :-- | :-- | :-- |
| S1 | Hero | paper-2 inset card | 100svh (max 920) |
| S2 | Industry strip | paper | 64 |
| S3 | Problem story `#problem` | paper | 220vh (pinned) |
| S4 | Manifesto | night | 560 |
| S5 | Capabilities | night (same sheet) | 820 |
| S6 | Industries | paper | 900 |
| S7 | Process | paper-2 | 720 |
| S8 | Packages | paper | 920 |
| S9 | With / Without | night | 760 |
| S10 | FAQ | paper | 720 |
| F | Footer reveal | night | ≈ 900 |
 
**S1 Hero**
- Frame: `Sheet` inset, 12px page margin (8px mobile), radius 28 (20 mobile), `paper-2`, `GridGuides` with the Indigo guide at the left edge of column 1.
- Left (cols 1 to 6): `SectionTag [01] BUSINESS GROWTH PARTNER` → H1 **One partner. Strategy to execution.** (`display-xl`, `BlurInWords`, 3 lines max) → mono rotator `WE SOLVE → [phrase]` (`ScrambleRotate`) → hero line (`body-l`, ink-2) → CTA row (`Book a consultation` solid with `Magnetic`, `See how it works` ghost, smooth-scrolls to `#problem`).
- Right (cols 7 to 12): `HeroEngine` (≈ 620 × 500), vertically centred.
- Bottom inside the card: `DotField` (paper variant) occupying the lower 30% behind content; above it, a row of 4 `StatTile`s aligned to guide columns, each with brackets: `Odometer` number (`stat` size) + mono label.
- Mobile (390 × 844): order tag, H1, rotator, line, CTAs (full width, stacked), `HeroEngine` vertical (≈ 360px tall), stats 2 × 2, `DotField` (short). The H1 and primary CTA must be above the fold.
- Motion: 6.5. On scroll, the hero content drifts up 8% and the engine 4% (subtle parallax), the card scales to 0.97 as S3 slides over it (`SheetStack`).
**S2 Industry strip**
- 64px band on paper, top and bottom hairlines. Left fixed label: Indigo square + mono `BUILT FOR`. Right: `Marquee` of the 7 industry names in mono uppercase separated by an Indigo `+`. Velocity-reactive, pauses on hover. Reduced motion: wrapped static row.
**S3 Problem story (`#problem`)**
- `StickyStory` 220vh (170vh mobile). The sticky frame is 100vh with guides.
- Left (cols 1 to 4): `SectionTag [02] THE PROBLEM`, the swapping headline (`display-l`): A = **Six vendors. Nobody owns the result.** → B = **One strategy. One team. One point of accountability.** (masked vertical roll at progress 0.55), and a mono progress indicator `BEFORE ────●──── AFTER` whose dot tracks progress.
- Right (cols 5 to 12): `CoordinationStory` (7.1) scrubbed by progress.
- Mobile: illustration on top (≈ 55vh), headline below.
- sr-only text describes both states in one sentence each.
**S4 Manifesto** (start of a night sheet, rounded top overlapping S3)
- Left (cols 1 to 3): `ChevronStack` in white 40% + mono `// HOW WE THINK`.
- Right (cols 4 to 12): the manifesto sentence set in `display-l` with `ScrollHighlightText` (words go from white 16% to white 100% as they cross the viewport centre). Under it, mono `STRATEGY · BRANDING · TECHNOLOGY · DIGITAL MARKETING`.
- Then a `GiantWord` "Capabilities" (white 5%) drifting across as the transition into S5.
**S5 Capabilities** (same night sheet)
- `SectionHead` `[03] CAPABILITIES` / **Four capabilities. One growth plan.** with action `All services →`.
- `ExpandingPanels`, 560px tall, 4 panels (Strategy, Branding, Technology, Digital Marketing), gap 8px. Panel: `night-2` fill, 1px `line-night`, radius 16.
  - **Collapsed (≈ 96px wide):** mono `01` at top, the pillar name rotated −90° reading bottom-to-top in mono, `+` at the bottom.
  - **Expanded:** left 45%: mono `01 / 04`, name (`display-m`), pillar `tagline` (white 70%), sub-service `Chip`s (6 to 8), ghost button `Explore Strategy` → `/services/strategy`. Right 55%: the pillar's `CapabilityArt` in white strokes, animating while open.
  - Opens on hover (desktop, 120ms intent), click and keyboard (buttons with `aria-expanded`, arrow keys move between panels). Auto-advance every 6s until the user interacts; pauses offscreen.
- Mobile: vertical accordion; each item 72px collapsed; expanded shows art (220px), tagline, chips, button. One open at a time.
**S6 Industries** (paper sheet)
- `SectionHead` `[04] INDUSTRIES` / **Growth looks different in every industry.** / action `All industries →`.
- `IndustryGrid`: 4 × 2 cells on desktop (7 industries + 1 CTA cell), square-ish (≈ 1 : 0.9), separated by dashed guide lines (Oberon cells, no card backgrounds).
  - Cell: `IndustryIcon` inside a 56px white tile with 1px line (top-left); name in mono uppercase (bottom-left); industry `tagline` (`body-s`, ink-2) below the name, revealed with `ScrambleText` on hover/focus on desktop, always visible on mobile.
  - Hover/focus: the upper 55% of the cell reveals the industry's `TreatedImage` (dither → colour mask reveal from the pointer) with `clip-path: inset(100% 0 0 0) → inset(0)`, 500ms; the icon tile's accent square hops. Whole cell links to `/industries#{slug}`.
  - CTA cell: Indigo `+` crosshair, mono `YOUR INDUSTRY?`, `Talk to us →` → `/contact`.
- Mobile: 2 columns × 4 rows; no image reveal (keeps it light).
**S7 Process** (paper-2 band, no rounded overlap: a tone change like Oberon)
- `SectionHead` `[05] PROCESS` / **From growth problem to measurable result.** / action `See the full process →` (`/process`).
- `ProcessFlow`: 5 equal columns aligned to guides. Each: a white number tile `.01` (Indigo dot + mono digits), the stage title in mono uppercase (2 lines), the `ProcessIcon`, and the stage `lead` line (`body-s`). Between icons, `FlowLine`s with mono-s output labels above them: `DIAGNOSIS >`, `ROADMAP >`, `DELIVERY >`, `REPORT >`, `COMPOUND >`.
- Motion: lines draw left to right on enter; then a packet travels the whole chain in a 7s loop, and the stage it reaches gets brackets and the green eye for 1.2s. Pauses offscreen.
- Mobile: vertical timeline (icons in a left rail joined by a vertical dotted line, text on the right).
**S8 Packages** (paper sheet)
- `GiantWord` "Packages" (ink 6%) behind the head.
- `SectionHead` `[06] PACKAGES` / **Engagements built around outcomes, not service lists.** / action `Compare packages →` (`/growth-packages`).
- `PackagesPanel`: one panel (radius 16, 1px line, white) with 4 equal columns divided by 1px lines. Column: mono `01`, name (`display-m`), `audience` line (`body-s`, ink-2), hairline, 4 `includes` with Indigo `>` markers, bottom-aligned ghost button `Request proposal` → `/contact?intent=proposal&package={slug}`.
- **Featured column** (default: Grow) is night with `WaveLines` texture, white text and an inverted solid button. The featured state **follows hover and focus** (a shared FM `layoutId` background slides between columns, 450ms `inOutQuart`) and returns to Grow on leave. No "most popular" badge (no data to back it).
- Under the panel, mono line (confirm with Krupal first, see 15): `AD SPEND IS PAID DIRECTLY TO THE PLATFORM. NO MARK-UP.`
- Mobile: 4 stacked cards; Grow is the night card; includes collapsed behind a `+`.
**S9 With / Without** (night sheet)
- Centered `SectionHead` `[07] WHY KESHAVCO` / **What changes with one partner.**
- Card (max 960px, radius 20, `night-2`, 1px `line-night`), two columns with a centre `VS` chip (44px white circle, mono ink):
| With KeshavCo | Without |
| :-- | :-- |
| One plan across every channel | Five vendors, five plans |
| One point of contact | You become the project manager |
| Monthly leadership reviews | Activity reports, not outcomes |
| You own every account and asset | Accounts scattered across freelancers |
| Ad spend paid direct, no mark-up | Mark-ups buried in media bills |
 
  - Left column: `night-3` with a soft Indigo-to-Purple glow in one corner, row icons in white, text white. Right column: transparent, `×` glyphs, text white 45%.
  - Motion: rows reveal in pairs (left from x −16, right from x 16), check icons draw. Hovering a row highlights its pair.
- Mobile: With card, `VS` chip, Without card.
- Rows 4 and 5 restate house rules (client owns ad accounts; ad budget is pass-through). Confirm before launch.
**S10 FAQ** (paper sheet)
- Left (cols 1 to 5, sticky): `SectionHead` `[08] FAQ` / **Questions businesses ask us first.** + buttons `Book a consultation` and `All questions` (`/faq`).
- Right (cols 6 to 12): `Accordion` in the night-pill style (rows `night-2`, radius 16, white text), 5 `homeFaqs`. Keep FAQPage JSON-LD.
Removed from `/` (still available on inner pages): who-we-are paragraphs, "What you get" band, "Why KeshavCo" cards, "Why partner" bento, advantage band, insights teaser, mid CTA band.
 
### 9.3 Shared inner-page hero (`PageHero`, rebuild)
 
Inset card like S1 but `min-height: 64svh` (auto on mobile): mono `Breadcrumb`, `SectionTag` with the page label, H1 (`BlurInWords`, `display-xl` scaled down one step), one intro line (new `short` field, ≤ 18 words), and a page-specific vector on the right: pillar `CapabilityArt`, industry icon cluster, `ProcessFlow` mini, `PackagesPanel` mini, or `ChevronStack` + mark for About. No `DotField` here (home and footer only).
 
### 9.4 Inner page templates
 
| Route | Layout |
| :-- | :-- |
| `/services` | `PageHero` → 4 full-width **pillar rows** (not cards): name (`display-l`) + tagline left, `CapabilityArt` right, sub-service chips below; row hover shifts to `paper-2` and plays the art. → Supporting capabilities (3 mono cells). → **Channel hub**: KeshavCo hub with spokes to mono labels `GOOGLE` `META` `INSTAGRAM` `LINKEDIN` `WHATSAPP` `YOUTUBE` `EMAIL` `SEO` `CRM` `WEBSITE` and particles flowing in (no third-party logos unless I approve). → FAQ (services-related) → footer. |
| `/services/[pillar]` (4) | `PageHero` (pillar art) → "What this solves": the pillar `problem` compressed into 3 short cards → sub-service grid (Oberon cells: icon, name, `blurb`, →) → `outcomes` as a checklist with green eyes → mini `ProcessFlow` → related package (from `growthPackages`) → CTA uses `ctaHeading`. |
| `/services/[pillar]/[service]` (26) | `PageHero` (tag = pillar name, H1 = existing `h1`, line = `blurb`) → `intro` as one paragraph max 60 words → the 3 `points` as 3 numbered cells with small icons → "Part of {pillar}" strip with sibling services as chips → CTA per `cta` variant. Keep the Service JSON-LD. |
| `/growth-packages` | `PageHero` → full `PackagesPanel` → one `StickyStack` card per package (sticky, overlapping): `situation`, `whatWeDo` (≤ 60 words each), `includes` chips, `considerIf` as a bracketed note → an includes matrix table (rows = deliverables, columns = packages, ● marks) → CTA. |
| `/industries` | `PageHero` → `IndustryStack`: 7 full-bleed sticky cards (Sentira case-card style): a blurred duotone copy of the photo fills the card, a sharper `TreatedImage` inset (60% width) sits centred, big numbers `01` left and `07` right (`stat` size), industry name (`display-l`), `tagline`, `typicalWork` chips, `help` compressed to one line. Each card is `sticky; top: 88px`; the covered card scales to 0.95 and dims. Each card keeps `id={slug}` for the home links. Mobile: no sticky, simple stack. → "Also working with" chips → CTA. |
| `/process` | `PageHero` → desktop: a pinned horizontal track of 5 stage panels (translate X with scroll, 300vh): number, title, `lead`, `body` as 3 bullets, `outcome` in a bracketed box with the green eye. Mobile: vertical. → CTA from `processPage.cta`. |
| `/about` | `PageHero` (mark + `ChevronStack`) → manifesto (`ScrollHighlightText`) → principles as big numbered statements (one per row, mono number, `display-m`) → founders block: 2 cards with **real photos when supplied**; until then, initials in a bracketed tile and name/role only. Never invent bios. → With/Without (compact) → CTA. |
| `/contact` | Split. Left: `SectionHead`, mono contact rows, "What happens next" as a 3-step mini flow. Right: a card with tabs `Book a call` / `Send an enquiry` holding `BookingEmbed` and `ContactForm` (underline inputs, mono labels, Oberon-style). `#book` selects the booking tab; `?intent=proposal&package=` preselects the form fields. Keep the 9-second Cal fallback. |
| `/faq` | Short `PageHero` → grouped `Accordion` (light rows) with topic `Chip` filters → CTA. Keep FAQPage JSON-LD. |
| `/insights` | While nothing is published: short `PageHero`, planned titles as mono rows with a `DRAFTING` status chip (no links), newsletter form. When posts exist: Spartan-style masonry alternating image and text cards. |
| Legal (3) | Plain reading layout, 68ch measure, mono section headings, fade-in only. |
| `not-found` | `NotFoundArt` + three links. |
 
---
 
## 10. Responsive rules
 
- Test widths: **360, 390, 430, 768, 1024, 1280, 1440, 1920**. No horizontal scroll at any width (`overflow-x: clip` stays on `body`).
- Guides: 2 (mobile) / 4 (tablet) / 6 (desktop).
- Hero inset margin 8px on mobile, 12px from 768px.
- `display-xl` never below 2.75rem; H1s never break a word; use `text-balance`.
- Pinned/sticky stories shorten on mobile (Section 9.2). If a pinned section feels sluggish on a mid-range Android, fall back to the reduced-motion layout below 768px.
- Canvas densities per 6.4. `HeroEngine` and `CoordinationStory` switch to vertical layouts below 768px.
- Hover-only content is always reachable by tap and focus. Tap targets ≥ 44 × 44.
- Header: desktop pill ≥ 1024px, compact pill below.
---
 
## 11. Accessibility and SEO parity
 
- Keep everything the README lists: skip link, one H1 per page, labelled fields, `aria-invalid`, `aria-expanded`, Escape closes menus, visible focus, reduced motion.
- All decorative SVG and canvas: `aria-hidden="true"`. Meaningful diagrams (`HeroEngine`, `CoordinationStory`, `ProcessFlow`, channel hub) carry an sr-only sentence.
- Contrast: body text ≥ 4.5:1, large text ≥ 3:1. Check Indigo on paper, white 70% on night, mono-s labels.
- `ExpandingPanels`, tabs and accordions are keyboard-operable with correct roles.
- Auto-moving content (rotators, marquees, auto-advance, canvases) pauses on hover/focus, offscreen, and via the footer motion toggle.
- SEO: titles, descriptions, canonicals, JSON-LD (Organization, BreadcrumbList, FAQPage, Service) unchanged or improved. Headings stay real text. `sitemap.ts` excludes `/lab`. Add `opengraph-image`. Produce the parity report in Phase 6.
---
 
## 12. Performance budget and techniques
 
- Budgets from Section 1. Measure before (Phase 0) and after (Phase 7).
- Load `DotField`, `DotWordmark` and the canvas-heavy pieces with `next/dynamic` (`ssr: false`) and start them after `requestIdleCallback` or the first interaction; reserve their space to avoid CLS.
- Server Components by default; `"use client"` only on interactive leaves. Keep content modules out of client bundles where possible (pass props).
- Fonts: Sora (400, 500, 600, 700), Inter (variable), Geist Mono (500); `display: swap`, Latin subset; preload Sora only.
- Images: `next/image` with accurate `sizes`, AVIF/WebP (already configured), treated variants pre-generated. Hero has no raster image, so LCP is the H1 text.
- Animate only `transform`, `opacity`, `filter` (blur sparingly), `clip-path`. No layout-thrashing reads inside scroll handlers; use FM motion values.
- Every loop (`requestAnimationFrame`, CSS infinite animations) stops offscreen and when `document.hidden`.
---
 
## 13. Execution plan (phases and checkpoints)
 
Run `npm run typecheck && npm run lint && npm run build` at the end of every phase. Commit at the end of every phase (`v3: phase N, <summary>`). Keep `docs/v3/CHANGELOG.md` updated.
 
**Phase 0: Baseline** (no visual changes)
- Create branch `redesign/v3`. `npm ci`. Build.
- Save `docs/v3/routes-before.json`: for every sitemap URL, status, `<title>`, meta description, canonical, H1 count (script: `scripts/route-audit.mjs` using Playwright against `npm start`).
- Lighthouse (mobile + desktop) for `/`, `/services/strategy`, `/contact` → `docs/v3/baseline.md`.
- Optional: screenshot the three reference sites with Playwright at 1440 and 390 into `docs/v3/refs/` for your own reference. **Add `docs/v3/refs/` to `.gitignore`** (third-party material, public repo).
**Phase 1: Foundations** → Checkpoint 1
- Tokens (5.1, 5.2, 5.3, 6.2) in `globals.css` and `src/lib/motion.ts`; Geist Mono via `next/font`.
- Update `useReducedMotionSafe` to honour `html[data-motion="off"]`.
- UI: `SectionTag`, `SectionHead`, `Button`, `Chip`, `Brackets`, `Crosshair`, `GridGuides`, `Sheet`, `GiantWord`, `StatTile`, `Accordion` (both styles).
- Motion: `BlurInWords`, `ScrambleText`, `ScrambleRotate`, `TextRoll`, `Odometer`, `DrawPath`, `FlowLine`, `StickyStory`, `ExpandingPanels` (with placeholder content), `SheetStack`, `FooterReveal`.
- `/lab` route (`robots: noindex`, not in sitemap, not linked) that shows every primitive in paper and night tones, plus a reduced-motion preview toggle.
**Phase 2: Graphics** → Checkpoint 2
- All vectors in 7.1, `DotField`, `DotWordmark`, `WaveLines`.
- `scripts/treat-images.mjs` + generated `public/images/treated/*` + `TreatedImage`; extend `src/content/images.ts`.
- `src/app/opengraph-image.tsx`.
- Add all to `/lab`.
**Phase 3: Home page**
- Add `short`/`line` fields and new home objects to `src/content/home.ts` (and others) per 8.3.
- Build S1 to S10 in order in `src/app/page.tsx`, retiring components per the table in Section 3.
**Phase 4: Global shell** → Checkpoint 3
- Header (desktop pill, mega menu, mobile sheet), `FooterReveal` footer, `ScrollProgress` restyle, motion toggle, `SheetStack` wiring in `layout.tsx`.
- Report the home page visible word count (`scripts/wordcount.mjs`: Playwright, count words in visible text nodes of `main`, excluding closed accordion panels).
**Phase 5: Inner pages**
- `PageHero`, then the templates in 9.4 in this order: `/services`, pillar, sub-service, `/growth-packages`, `/industries`, `/process`, `/about`, `/contact`, `/faq`, `/insights`, legal, 404.
**Phase 6: Copy compression and parity** → Checkpoint 4
- Add `short` intros and compressed variants in `src/content/*` for every inner page (never delete long fields).
- Produce `docs/v3/routes-after.json` and a diff report `docs/v3/route-parity.md` (must show 42/42 routes, identical titles, descriptions and canonicals, exactly one H1 each).
**Phase 7: QA and polish**
- Section 14 checklist. Fix everything. Lighthouse after → `docs/v3/after.md` with the before/after table.
- axe (`@axe-core/playwright`) on every template: zero serious or critical issues.
**Phase 8: Preview and handover**
- Push `redesign/v3`; report the Vercel preview URL (the project deploys previews from branches; if not, tell me instead of deploying another way).
- Gate `/lab` behind `process.env.NEXT_PUBLIC_LAB === "1"` (404 otherwise).
- Update `README.md` (visual system, motion system, graphics, image script) and `docs/v3/CHANGELOG.md`.
- Do not merge.
---
 
## 14. QA checklist (definition of done)
 
**Build and code**
- [ ] `typecheck`, `lint`, `build` pass with zero warnings introduced.
- [ ] No hard-coded copy in components; all copy in `src/content/`.
- [ ] No new dependencies beyond Section 2, rule 8.
- [ ] No console errors or hydration warnings on any template.
**Design fidelity**
- [ ] Tokens used everywhere (no stray hex values in components).
- [ ] Every section has a `SectionTag` with the right number; guides and crosshairs align to the grid at 1440 and 1024.
- [ ] One lead animation per viewport; nothing moves that has no job.
- [ ] Night sheets have grain; paper is the default background.
- [ ] Treated images everywhere photos appear in grids; no raw stock in grids.
**Content and truth**
- [ ] Home visible words ≤ 350.
- [ ] No invented testimonials, logos, stats, team or case studies. `showTestimonials` is still `false`.
- [ ] No "WordPress" anywhere client-facing. No em dashes in new short copy.
- [ ] Social links hidden while their href is `#`.
**Motion and accessibility**
- [ ] Reduced motion (OS setting and footer toggle) shows complete, static, fully readable pages.
- [ ] Every auto-moving element pauses offscreen, on hover/focus, and with the toggle.
- [ ] Keyboard: every panel, menu, tab and accordion operable; focus visible; Escape closes overlays; focus returns.
- [ ] axe: zero serious/critical.
**Responsive and performance**
- [ ] No horizontal scroll at 360 to 1920.
- [ ] Mobile hero: H1 and primary CTA above the fold at 390 × 844.
- [ ] Lighthouse mobile ≥ 90 / 100 / 100 / 100 on `/`; LCP ≤ 2.2s; CLS ≤ 0.05; first-load JS for `/` ≤ 190 KB gzip.
- [ ] Canvases capped at DPR 1.5, paused offscreen and when the tab is hidden.
**SEO and plumbing**
- [ ] 42/42 routes, same titles, descriptions, canonicals, JSON-LD; one H1 per page; `/lab` not indexable and not in the sitemap.
- [ ] Contact form still posts to `/api/enquiry`; `/contact#book` opens booking; Cal fallback still works.
- [ ] OG image renders at `/opengraph-image`.
---
 
## 15. Open items for Shubham (Claude Code: list these back to me at Checkpoint 4 with their status)
 
1. **SVG logo files** (mark and a reversed horizontal lockup) from the designer. The site works with `mark.png` until then.
2. **Founders' photos** for `/about` (real photos only).
3. **Confirm the two commitment lines** (S8 mono line and S9 rows 4 and 5: "you own every account", "ad spend paid direct, no mark-up") with Krupal before launch.
4. **Social profile URLs** (currently `#`, so hidden).
5. **Office city line** for local SEO (for example Vadodara, serving Ahmedabad and Surat). Add to the footer mono row and Organization JSON-LD once confirmed.
6. **Working hours** placeholder in `site.workingHours`.
7. **`ENQUIRY_WEBHOOK_URL`** in Vercel env before launch (existing README item).
8. **Approve Geist Mono** as a brand-guideline extension (labels only).
9. **Insights**: keep out of the main nav until the first real post is published.
10. **Real proof** (client logos, permissioned testimonials, case studies): the components can be built later; nothing ships without real material.
---
 
## Appendix A: Reference teardown (measured in Chrome, 27 Sep 2026)
 
**Spartan AI** (spartanai.framer.website), light, Swiss-minimal, ≈ 14,660px tall at 1547px wide
- Type: Inter Display. Hero 70px/77 w500, tracking −2.8px, first line at 40% ink ("Scale your ideas." grey, "Build with AI." black). Section statements 54 to 56px/60 w500, tracking −2px. Giant section words 200px/220 w700, tracking −8px (Our Works, Experiences, Pricing) in a slide-in ticker. Body 16px/24 w300. Mono labels in Geist Mono / IBM Plex Mono (`// Model v4.0.2`, `001`, `CAPABILITIES`).
- Colour: #FFFFFF, #F0F0F0 panels, #1A1A1A ink and dark sheets, #242424 / #292828 dark cards, translucent whites for glass.
- Radii: 10, 14, 16, 20, 30, pills. Section sheets with rounded bottom corners overlapping the next.
- Sections: inset hero card with cinematic image and floating glass card (right) · scroll-filled statement + stat bento (dark stat card, avatar stack card, dial graphic card, quote card) · works grid (logo tiles + 2 × 2 mono stat cells) · dark capabilities with horizontal expanding panels and isometric line art · vision (portrait + scroll-filled statement) · "engineering" row of 4 line icons · testimonial carousel (logo+avatar chip, quote, mono name) · dark video band with play ring · process accordion with isometric illustration · team portraits on coloured backgrounds · 4-column joined pricing panel, dark featured column with wave texture, monthly/annual toggle · FAQ as dark pills on a grey panel · insights masonry (image cards alternating with text cards) · sticky footer reveal with a giant wordmark cut over a landscape image.
- Motion: word-by-word scroll colour fill, blur-in paragraphs, counters, section-word ticker slide-in (x −60 → 0, opacity), panel expand, footer reveal.
**Sentira** (sentira.framer.website), dark, editorial, ≈ 11,950px tall
- Type: LT Remark (serif) for display: hero wordmark 170px/161, section H2 52px/64, service names 46px, big numbers 68px. Geist 14px/21 w500 for UI and body.
- Colour: #060606 page, #121212 / #1E1E1E cards, white text, a green accent (halftone greens), film grain across the page.
- Radii: 4, 6, 10 to 18, pills.
- Sections: centred nav (links left, logo centre, CTA right) · hero wordmark with letter blur-in, particle-wave terrain image under it · "brands we've helped" strip · about with a stats bento (green halftone statue image + odometer counters list) · services as accordion rows (icon, serif name, superscript number, tag chips, +; expanded shows image and CTA) · process: 3 cards with grainy gradient orbs holding the numbers · testimonial split (quote card + large portrait) · case studies as full-width cards (blurred image background, sharper halftone inset, big 01/05 numbers either side, stat) · With vs Without comparison with centre VS · team carousel (portrait, mono role, name, social links, `01 / 06`) · centred FAQ pills · gradient contact strip · closing CTA with the terrain as a bottom bookend · 4-column footer.
- Motion: duplicated labels for text-roll hovers, odometer digits (each digit rendered as a strip), blur-in letters, fades.
**Oberon** (oberon.framer.website), light, technical blueprint, ≈ 8,870px tall
- Type: Inter for headings (hero 75px/72 w500, tracking −3.75px; H2 48px/48, tracking −2.4px). Geist Mono 15px/20 w500 uppercase for almost all UI copy; Geist Mono 26px for step numbers with an orange `.` prefix.
- Colour: paper #F2F0EE, white bands, khaki band #DBDBD3, ink #202020, dark band ≈ #202020 with grain, accent orange #ED4F00. Radius 0 almost everywhere.
- Grid: 6 dashed vertical guides, one orange guide, horizontal hairlines, orange crosshairs, orange corner brackets.
- Sections (numbered 01 to 12): hero with animated node diagram (7 numbered file tiles → dotted lines → orange hatched hub with logo → 3 output file tiles) over a dithered dot landscape; 3 mono proof points with brackets · trusted-by logo row · "What we can automate" 2 × 2 grid with line icons + typed mono titles + grey descriptions · process: 4 columns with icons joined by dotted arrows labelled `DATA IN >`, `DECISION >`, `EXECUTION >`, `RESULT >` · results as big-number rows · dark case study with a dithered 1-bit photo, problem / what we did / result row and an orange CTA · industry grid with icon tiles and orange `>` lists · integrations hub (logo in bracketed square, tool logos around, particles on spokes, canvas) · "why choose us" numbered cells over the dot landscape · testimonials with dithered portrait grid and rating · dark 3-column pricing with icon tiles · FAQ 2-column grid · contacts with mono email/phone and an underline form.
- Motion: typewriter/scramble reveals on mono text, count-ups, dotted-line flows, canvas dithering, dropdown menu from the hamburger with an orange active item.
---
 
## Appendix B: Target file map (new or rebuilt)
 
```
src/
  app/
    lab/page.tsx                    # gated playground (noindex)
    opengraph-image.tsx
  components/
    ui/        SectionTag.tsx SectionHead.tsx Button.tsx Chip.tsx StatTile.tsx
               Brackets.tsx Crosshair.tsx GridGuides.tsx Sheet.tsx GiantWord.tsx
               TreatedImage.tsx Accordion.tsx
    motion/    BlurInWords.tsx ScrambleText.tsx ScrambleRotate.tsx TextRoll.tsx
               Odometer.tsx DrawPath.tsx FlowLine.tsx StickyStory.tsx
               ExpandingPanels.tsx SheetStack.tsx FooterReveal.tsx Magnetic.tsx
               (+ kept: Reveal, SplitText, Parallax, Marquee, ScrollHighlightText,
                SmoothScroll, ScrollProgress)
    graphics/  HeroEngine.tsx CoordinationStory.tsx ChevronStack.tsx WaveLines.tsx
               DotField.tsx DotWordmark.tsx NotFoundArt.tsx ChannelHub.tsx
               capability/{Strategy,Branding,Technology,DigitalMarketing}.tsx
               industry/{7 icons}.tsx  process/{5 icons}.tsx  ornaments/Hatch.tsx
    sections/  HomeHero.tsx IndustryStrip.tsx ProblemStory.tsx Manifesto.tsx
               CapabilityPanels.tsx IndustryGrid.tsx IndustryStack.tsx ProcessFlow.tsx
               PackagesPanel.tsx Compare.tsx FaqSplit.tsx
               (+ restyled: BookingEmbed, ContactForm, Testimonials)
    layout/    Header.tsx MegaMenu.tsx MobileMenu.tsx Footer.tsx PageHero.tsx LegalPage.tsx
  lib/         motion.ts useReducedMotionSafe.ts (updated) useSheetTone.ts
scripts/       treat-images.mjs route-audit.mjs wordcount.mjs
docs/v3/       CHANGELOG.md baseline.md after.md routes-before.json routes-after.json route-parity.md
```
 
