# v3 after: measurements and QA (Phase 7, 27 Sep 2026)

Production build (`npm run build && npm start`) of `redesign/v3`, measured in
the Claude Code cloud container, the same way as [baseline.md](./baseline.md).
Lighthouse is now 13.5 (the baseline used 12). Lab figures from a shared CPU
with simulated slow-4G throttling: use them for direction, not as real-device
numbers.

## Before and after

| Measure | Before (v2) | After (v3) | Target |
| :-- | --: | --: | --: |
| Home page height, 1440 × 900 | 15,928 px | 9,760 px | ≤ 10,500 px |
| Home visible words, 1440 | 1,338 | 395 (kept by decision #11) | ≤ 350 |
| First-load JS `/` | 191 kB | 189 kB | ≤ 190 KB |
| First-load JS `/contact` | 169 kB | 166 kB | — |
| Routes | 42 | 43 (+ `/careers`) | parity |

### Lighthouse (Performance / Accessibility / Best Practices / SEO)

| Page | Mobile before | Mobile after | LCP before → after | CLS after | TBT before → after | Desktop after |
| :-- | :-- | :-- | :-- | --: | :-- | :-- |
| `/` | 73 / 92 / 100 / 100 | **93 / 100 / 100 / 100** | 4.0 s → 3.0 s | 0.012 | 430 → 100 ms | 100 / 100 / 100 / 100 |
| `/services/strategy` | 90 / 92 / 100 / 100 | **96 / 100 / 100 / 100** | 3.6 s → 2.8 s | 0 | 40 → 60 ms | 99 / 100 / 100 / 100 |
| `/contact` | 95 / 97 / 96 / 100 | **93 / 100 / 100 / 100** | 3.0 s → 3.2 s | 0 | 40 → 60 ms | 100 / 100 / 100 / 100 |
| `/insights` | — | **96 / 100 / 100 / 100** | — → 2.7 s | 0 | — → 40 ms | 100 / 100 / 100 / 100 |
| `/insights/[slug]` (test article) | — | **95 / 100 / 100 / 100** | — → 2.8 s | 0 | — → 50 ms | 100 / 100 / 100 / 100 |

**LCP.** The mobile LCP target (≤ 2.2 s) is **not met** in the simulation.
The LCP element is the hero H1, and in the unthrottled trace it paints with the
first frame (observed LCP = FCP = 0.18 s): the blur-in does not delay it.
The simulated figure charges the framework and Framer Motion JavaScript that
downloads alongside it on slow 4G. The next lever would be trimming that
shared JavaScript (for example moving more sections to CSS-only motion);
worth measuring on a real mid-range Android after deploy before spending on it.

Fixes made during Phase 7:
- 3D scenes (three.js) now start on the visitor's first interaction or after
  8 s (`src/lib/whenAwake.ts`), not while the page is still loading: mobile TBT
  on `/` went from 370 ms to 80–110 ms and Performance from 85 to 93.
- The header logo was preloaded at 1080–1920 px for a 28 px slot; it now
  requests a correctly sized file and no longer competes with first paint.

## §14 checklist

| Item | Status |
| :-- | :-- |
| typecheck, lint, build pass, no new warnings | Done |
| No hard-coded copy in components | Done (last strings moved into `src/content`) |
| No new dependencies beyond rule 8 | three.js (decision #5) and Keystatic + Markdoc (decision #21) were approved; nothing else |
| No console errors or hydration warnings | Done: 44 routes (incl. a test article) at 1440 and 390 (`scripts/qa-sweep.mjs`) |
| Tokens everywhere, no stray hex | Done (only the viewport `themeColor` meta, which cannot use a CSS variable) |
| SectionTag numbering, guides, crosshairs | Done |
| Night sheets have grain; paper default | Done |
| Treated images in grids | Replaced by vectors and 3D (decision #4) |
| Home visible words ≤ 350 | 395, kept as approved (decision #11) |
| No invented testimonials, logos, stats, team, case studies | Done; `showTestimonials` false; Our Work hidden and empty |
| No "WordPress"; no em dashes in new short copy | Done (titles keep the site's "Title — KeshavCo" pattern) |
| Social links hidden while `#` | Done |
| Reduced motion shows complete static pages | Done (checked home, process, industries, packages) |
| Auto-moving elements pause offscreen, on hover/focus, with the toggle | Done |
| Keyboard: panels, menus, tabs, accordions; Escape; focus return | Done (contact tabs: arrows, Home/End; FAQ chips are toggle buttons) |
| axe: zero serious/critical | Done: 15 templates × 1440/390 × motion on/off, zero violations of any severity |
| No horizontal scroll 360–1920 | Done: 44 routes × 8 widths (`scripts/overflow-check.mjs`) |
| Phone: H1 and primary CTA above the fold at 390 × 844 | Done on every route with a hero button (articles lead with the H1 and summary) |
| Lighthouse mobile ≥ 90 / 100 / 100 / 100 on `/` | Done: 93 / 100 / 100 / 100 |
| LCP ≤ 2.2 s | **Not met** in simulation (3.0 s on `/`), see above |
| CLS ≤ 0.05 | Done (0.012) |
| First-load JS `/` ≤ 190 KB | Done (189 kB) |
| Canvases DPR ≤ 1.5, paused offscreen and when hidden | Done |
| 42/42 routes parity; `/lab` not indexable, not in sitemap | Done ([route-parity.md](./route-parity.md)); `/lab` now 404 unless `NEXT_PUBLIC_LAB=1` |
| Contact form posts to `/api/enquiry`; `#book`; Cal fallback | Done: enquiry submitted end to end; `#book` opens booking; with Cal blocked (as in this sandbox) the fallback appears after 9 s |
| OG image at `/opengraph-image` | Done (200, 1200 × 630) |
