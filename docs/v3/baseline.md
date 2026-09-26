# v3 baseline (before the redesign)

Measured on 26 Sep 2026 against a production build (`next build && next start`)
of commit `57aa1cb`, in the Claude Code cloud container. Lighthouse numbers are
lab figures from a shared container CPU with simulated throttling: use them to
compare before and after, not as real-device results.

## Home page budgets

Measured with `scripts/wordcount.mjs` (visible words inside `main` after one
full scroll, closed FAQ answers excluded).

| Metric | 1440 × 900 | 390 × 844 | v3 target |
| :-- | --: | --: | --: |
| Visible words in `main` | 1,339 | 1,286 | ≤ 350 |
| Visible words incl. header + footer | 1,454 | 1,391 | n/a |
| Page height | 15,928 px | 22,009 px | ≤ 10,500 px (1440) |
| Content sections | 13 (+ testimonials, off) | same | 10 |

## First-load JS (from `next build`, compressed)

| Route | First Load JS |
| :-- | --: |
| `/` | 191 kB |
| `/services` | 177 kB |
| `/services/[pillar]` | 167 kB |
| `/contact` | 169 kB |
| Shared by all | 103 kB |

Target for `/`: ≤ 190 KB.

## Lighthouse 12 (Performance / Accessibility / Best Practices / SEO)

| Page | Mobile | LCP | CLS | TBT | Desktop | LCP |
| :-- | :-- | --: | --: | --: | :-- | --: |
| `/` | 73 / 92 / 100 / 100 | 4.0 s | 0.002 | 430 ms | 99 / 92 / 100 / 100 | 0.8 s |
| `/services/strategy` | 90 / 92 / 100 / 100 | 3.6 s | 0.001 | 40 ms | 100 / 92 / 100 / 100 | 0.6 s |
| `/contact` | 95 / 97 / 96 / 100 | 3.0 s | 0 | 40 ms | 99 / 97 / 96 / 100 | 0.6 s |

Failing audits worth fixing in v3:

- Accessibility: `aria-prohibited-attr` (`aria-label` on non-landmark `span`/`p`
  from `SplitText` and `ScrollHighlightText`), `color-contrast` (home).
- Best practices: `errors-in-console` on `/contact` (the Cal.com embed is
  blocked in the build sandbox, so this may not reproduce in production).

## Routes

`docs/v3/routes-before.json`: 42/42 routes return 200, each with exactly one
H1, a canonical and a meta description. JSON-LD: Organization on 42 pages,
BreadcrumbList on 38, Service on 30, FAQPage on 2 (`/` and `/faq`).

## Reference screenshots

Skipped. The three Framer reference sites serve a Let's Encrypt chain
(ISRG "Root YE") that the bundled Chromium 141 does not trust, and certificate
checks were not bypassed for an optional step.
