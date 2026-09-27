# v3 handover (27 Sep 2026)

All phases (0–8) are done on `redesign/v3` and pushed. **Nothing is merged
and nothing was deployed to production.** Vercel builds a preview of the
branch on every push:

**Preview:** https://keshavco-v2-git-redesign-v3-shubhamthakkar17s-projects.vercel.app
(behind Vercel login: open it while signed in).

## State

- 43 routes (42 original, unchanged on title, description, canonical and
  JSON-LD, plus `/careers`), Insights articles from the editor, and the
  hidden Our Work pages. See [route-parity.md](./route-parity.md).
- QA and Lighthouse: [after.md](./after.md). Mobile Performance 93–96,
  Accessibility / Best Practices / SEO 100 everywhere; mobile LCP is still
  above 2.2 s in the simulation (the real first paint includes the H1).
- Decisions: [decisions.md](./decisions.md). Changes by phase:
  [CHANGELOG.md](./CHANGELOG.md).

## What needs you

1. **Forms:** in Google Drive → "KeshavCo website forms", follow the setup
   doc: paste the script, deploy, add `ENQUIRY_WEBHOOK_URL` in Vercel.
2. **Editor:** create the GitHub App and add four variables in Vercel
   ([docs/cms/README.md](../cms/README.md)).
3. **Review the preview**, then merge `redesign/v3` into the production
   branch when you are happy (I have not merged).
4. Still open from brief §15: social profile URLs, legal copy, real proof
   (testimonials, logos, case studies), founders' details, Geist Mono
   approval.

## Journey depth: measured, with suggestions (not applied)

Visible words in `main` and page height, production build:

| Page | Words | Height 1440 | Height 390 |
| :-- | --: | --: | --: |
| Home | 394 | 9,760 | 12,269 |
| Services hub | 497 | 6,516 | 10,096 |
| Pillar (Strategy) | 443 | 5,318 | 8,054 |
| Sub-service | 186 | 3,054 | 4,278 |
| Growth Packages | 936 | 7,794 | 11,683 |
| Industries | 530 | 7,936 | 9,837 |
| Process | 268–382 | 5,174 | 5,944 |
| About | 680 | 6,378 | 8,818 |
| Contact | 387 | 3,437 | 5,908 |
| Careers | 180 | 3,497 | 4,702 |
| FAQ | 137 | 2,682 | 3,380 |
| Insights | 153 | 3,102 | 4,084 |

The click depth is fine: every sub-service is one hover away in the header
strip, and "Book a consultation" is in the header, on every page and in the
footer. What makes the journey feel long is **repetition**: the same blocks
appear on several pages. Candidate trims, largest effect first:

1. **Pillar pages:** drop the "How the work runs" process block (it repeats
   the home page and `/process`, and the pillar already links there). About
   900 px shorter on each of the four pages.
2. **Growth Packages:** the includes matrix repeats the chips in the sticky
   cards. Keep one: either the matrix (drop the chips) or the chips (drop the
   matrix). About 1,300 px on phones.
3. **About:** the With / Without block repeats the home page. Replace it with
   a one-line link to the home section, or drop it. About 900 px.
4. **Services hub:** the services FAQ repeats `/faq`. Keep the "Not sure which
   service you need?" prompt and link to `/faq`. About 1,100 px.
5. **Home on phones** (12,269 px): show industries as the scrolling strip only
   (drop the grid below 768 px) and show 3 of the 5 FAQs. About 1,800 px.
6. **Not recommended:** folding the 26 sub-service pages into their pillar
   pages. It would shorten the journey but remove 26 pages that search engines
   index for specific services.

Say which of 1–5 to apply and I will make the changes.
