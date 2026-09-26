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
