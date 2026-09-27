# Checkpoint 4: status record (27 Sep 2026)

Phases 5 and 6 are done and pushed to `redesign/v3`. Nothing is merged; no
deploy was made. Next up: Phase 7 (QA at every width, Lighthouse, full axe
pass) and Phase 8 (gate `/lab`, README, preview URL).

## Where things stand

| Item | Result | Target |
| :-- | :-- | :-- |
| Routes | 43/43 return 200 (42 original + `/careers`) | all 200 |
| Route parity | 42/42 original routes: same title, description, canonical, robots and JSON-LD types, one H1 each ([route-parity.md](./route-parity.md)) | 42/42 |
| Paragraphs on inner pages | longest rendered paragraph 57 words, FAQ answers included (`scripts/copy-audit.mjs`) | ≤ 60 |
| H2s | none over 8 words | ≤ 8 |
| H1s over 8 words | 8 routes, all approved H1s kept unchanged (list below) | ≤ 8 |
| Home | unchanged: 395 visible words, 9,760 px, first-load JS 188 kB | — |
| Largest inner first-load JS | `/contact` 166 kB | — |
| axe (14 templates × 1440/390 × motion on/off) | no serious or critical issues after two fixes | 0 |
| Horizontal overflow at 360 and 390 | none on all 43 routes after one fix | none |
| Console | no errors or hydration warnings on any template | none |
| "WordPress" anywhere | none | none |
| Em dashes in new short copy | none (only the site's existing "Title — KeshavCo" title pattern) | none |

Screenshots: `docs/v3/shots/cp4/` (not versioned): every template stitched at
1440 and 390, plus `preview/` with desktop and phone side by side. Stitched
captures show sticky sections mid-transition (a dimmed card, a half-slid
track), which is what a visitor sees at that scroll position.

## What was built

- **Shared:** new `PageHero` (inset card, mono breadcrumb, tag, blur-in H1,
  short line, page vector), `Overview` (long copy split at sentence breaks),
  `CtaRow`, `LinkCells`, `CheckList`, `StackCards` (sticky overlapping cards).
- **Templates:** `/services`, 4 pillar pages, 26 sub-service pages,
  `/growth-packages`, `/industries`, `/process`, `/about`, `/contact`, `/faq`,
  `/insights`, 3 legal pages, 404, and the new `/careers`.
- **Forms:** enquiry (restyled; adds "type of enquiry" and "package", both
  preselected from `?intent=proposal&package=`), careers and Insights
  subscribe. Setup for the Google Sheet + email in
  [docs/forms/README.md](../forms/README.md).

## Decisions for Shubham

1. **New copy to approve.** Everything below is derived from approved copy,
   but the wording is new:
   - `/careers`: the whole page (`src/content/careers.ts`), including "We do
     not list openings here" and "If there is a fit, we will be in touch".
   - `/contact`: "What happens next" (reply within one working day; a
     30-minute consultation; a written proposal if we are the right partner).
   - Pillar "What this solves" cards (3 per pillar), process stage points
     (3 per stage), industry "how we help" lines, and the short hero line on
     each page (`servicesV3`, `processV3`, `industriesV3` and friends).
2. **H1s over 8 words.** Keep them (they are the search headings), or supply
   shorter ones: `/process` (10), `/services/strategy` (10),
   `/services/strategy/brand-strategy` (11), `…/growth-strategy` (9),
   `…/marketing-strategy` (9), `/services/branding/company-profile` (9),
   `/services/technology/website-development` (9), `…/ecommerce` (9).
3. **Careers note on `/contact`.** It now links to `/careers`, but its text
   still says "write to us with 'Careers' in the subject line". Update the
   text to point at the careers page?
4. **Working hours.** `/contact` shows the placeholder
   "[Monday – Saturday, 10:00 am – 7:00 pm IST]" (as v2 did). Confirm the
   hours, or hide the row until confirmed.

## Brief §15 open items

| # | Item | Status |
| :-- | :-- | :-- |
| 1 | SVG logo files | Open. `mark.png` used everywhere; nothing blocked. |
| 2 | Founders' photos | Open. Needs names and roles too: the founders block on `/about` is built but hidden until real details arrive. |
| 3 | Confirm "you own every account" and "ad spend paid direct, no mark-up" with Krupal | Open. Shown in the With / Without rows (home, `/about`) and the `/growth-packages` note. |
| 4 | Social profile URLs | Open. Still `#`, so hidden in the footer and on `/contact`. |
| 5 | Office city line | Open. Not added to the footer or Organization JSON-LD. |
| 6 | Working hours | Open. Placeholder visible on `/contact` (decision 4 above). |
| 7 | `ENQUIRY_WEBHOOK_URL` | Open. Now the Apps Script URL for all three forms: follow `docs/forms/README.md`, then add it in Vercel. Until then submissions go to the server log only. |
| 8 | Approve Geist Mono | Open. Used for labels only. |
| 9 | Insights out of the main nav | Done. Footer and mobile menu only. |
| 10 | Real proof | Open. Nothing shipped; `showTestimonials` is still `false`. |

## Known limitations

- The forms were tested against the API routes with the server-log fallback;
  a real Sheet + email round trip needs the Apps Script deployed (item 7).
- `/process` pins its horizontal track only on desktops with motion allowed;
  phones and reduced motion get the stacked panels.
- The Vercel preview is behind Vercel login and its build status is still
  unverified from here.
