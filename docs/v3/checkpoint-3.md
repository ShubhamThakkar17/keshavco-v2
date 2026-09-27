# Checkpoint 3: status record (27 Sep 2026)

Phases 0–4 are done and pushed to `redesign/v3`. Nothing is merged; no
deploy was made. Next up: Phase 5 (inner pages, careers page, forms).

## Where things stand

| Item | Result | Target |
| :-- | :-- | :-- |
| Routes | 42/42 return 200; titles, descriptions, canonicals, JSON-LD types and one H1 each unchanged | parity |
| Home height (1440 × 900) | 9,760 px (was 15,928) | ≤ 10,500 |
| Home visible words, 1440 | 395, or 451 counting diagram labels (was 1,338) | ≤ 350 |
| Home visible words, 390 | 461 (industry taglines always visible on phones) | ≤ 350 |
| First-load JS `/` | 190 kB | ≤ 190 KB |
| three.js | lazy chunks, loaded only when a 3D scene is on screen | not in first load |
| axe on `/` | no violations (1440, 390; motion on and off) | 0 serious |
| Console | no errors or hydration warnings | none |

Screenshots: `docs/v3/shots/cp3/` (not versioned; full-page at 1440, 1024 and
390 plus a video of the hero and problem story).

## Decisions waiting for Shubham

1. **Word budget.** To get from 395 to about 350 on desktop, pick any of:
   - show the process stage lines only on the active stage (about −25 words);
   - show 4 sub-service chips per capability panel instead of all (about −8);
   - drop compare row 5 (ad spend, also unconfirmed) until confirmed (−10);
   - show 4 FAQs instead of 5 (−7).
2. **Brief §15 open items** still open: SVG logo files, founders' photos,
   confirming "you own every account" and "ad spend paid direct, no mark-up"
   with Krupal (both appear on the home Compare card), social URLs, office
   city line, working hours, `ENQUIRY_WEBHOOK_URL`.

## Known limitations

- The 3D was checked in headless Chromium's software renderer; real-device
  smoothness and Lighthouse numbers come in Phase 7.
- Inner pages still use the v2 templates inside the new header and footer,
  so they show the old dark hero and a duplicate CTA band until Phase 5.
- Tablets 1024–1279px show the nav without the wordmark text so the four
  services fit.
