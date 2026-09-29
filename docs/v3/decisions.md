# v3 decisions log

Decisions taken with Shubham during the build. Where one of these differs
from `docs/REDESIGN-V3.md`, the decision here wins.

## At Checkpoint 1 (27 Sep 2026)

| # | Topic | Decision | Affects |
| :-- | :-- | :-- | :-- |
| 1 | Branch | Work on `redesign/v3` (pushes confirmed working). | all |
| 2 | "Who we are" + "What you get" | Merge into one home section (the manifesto on the night sheet): one idea, no repeated paragraphs. | Phase 3 |
| 3 | Mid-page CTA band + footer CTA | Merge: the "Ready to solve…" band is removed and its line and button live in the footer's "Let's talk about…" block. | Phases 3, 4 |
| 4 | Imagery | Motion graphics, vectors and 3D instead of photographs. Stock photos are not used in the v3 layouts; industries get animated isometric scenes. The photo dither/duotone step (brief §7.3) is dropped. Photos stay in `public/images/` for now (licensed, credited) but unused. | Phases 2, 3, 5 |
| 5 | 3D | three.js (WebGL) is approved (brief §2 rule 8 exception). Loaded lazily after first paint so it stays out of first-load JS; reduced motion and no-WebGL get a static fallback. React Three Fiber is not used, to keep the bundle small. | Phase 2 onwards |
| 6 | Navbar | The four services (Strategy, Branding, Technology, Digital Marketing) sit directly in the nav, then Packages, Industries, About, then the Book CTA. Hovering a service opens a horizontal strip of its sub-services under the bar. Careers and Insights live in the footer and the mobile menu. | Phase 4 |
| 7 | Careers | New `/careers` page (route 43) with an open-application form. No invented openings, team members or perks. CV is a link field (LinkedIn, Drive or portfolio). | Phase 5 |
| 8 | Form delivery | Enquiry, careers and insights-subscribe submissions go to one Google Apps Script web app that appends a row to a Google Sheet (a tab per form) and emails hello@keshavco.com. No new packages. Setup guide and script live in `docs/forms/`. | Phase 5 |
| 9 | Insights | Its subscribe form delivers the same way as the other forms. | Phase 5 |
| 10 | Copy | Trim wherever needed to meet the brief's budgets; long approved copy stays in `src/content`. | Phases 3, 6 |

## At Checkpoint 3 (27 Sep 2026)

| # | Topic | Decision | Affects |
| :-- | :-- | :-- | :-- |
| 11 | Home word budget | Keep the home page as reviewed (395 visible words at 1440, against the brief's 350). None of the offered cuts applied. | Phase 3 |

## Calls made during Phases 5 and 6 (for review at Checkpoint 4)

| # | Topic | Call | Where |
| :-- | :-- | :-- | :-- |
| 12 | Inner-page H1s | Kept exactly as approved, including the 8 over the brief's 8-word budget, because they are the pages' search headings. | 8 routes, see checkpoint-4.md |
| 13 | `/contact` default tab | "Send an enquiry" by default; `#book` (every "Book a consultation" button) opens "Book a call". | `ContactTabs` |
| 14 | Inner-page closing prompt | A compact, page-specific CTA card (pillar `ctaHeading`, `ctaBands.packages`, `processPage.cta`…), never the footer's line, so decision #3 holds. | all inner pages |
| 15 | Founders block | Built but not rendered: no founder names, roles or photos exist in the content, and nothing is invented. | `/about`, `aboutV3.founders` |
| 16 | Form secret | The Apps Script shared secret travels as `?key=` in the webhook URL (Apps Script cannot read headers), so `/api/enquiry` stays untouched. | `docs/forms/` |

## At Checkpoint 4 (27 Sep 2026)

| # | Topic | Decision | Affects |
| :-- | :-- | :-- | :-- |
| 17 | Commitment lines | Confirmed as written: "You own every account and asset" and "Ad spend paid direct, no mark-up". Say nothing more (a separate agency fee may apply per project), so never "no fees". | home, `/about`, `/growth-packages` |
| 18 | Careers note on `/contact` | "Write to us at hello@keshavco.com with your interest in joining." (links to email). | `contactPage.notes` |
| 19 | Working hours | Not shown anywhere. | `/contact` |
| 20 | Offices | Vadodara, Mumbai and Indore: footer mono row, `/contact`, Organization JSON-LD (`address`). | site-wide |
| 21 | Insights admin | Keystatic editor at `/keystatic`, content saved to the repository through a GitHub App; new packages `@keystatic/core`, `@keystatic/next`, `@markdoc/markdoc` (approved with the request for an admin backend). Ready-made and configurable motion graphics are insertable blocks. | `/insights`, `docs/cms/` |
| 22 | Our Work | Portfolio page and case-study template built but hidden (404, noindex, not in the sitemap, not linked) until there is real, permissioned work. | `/our-work` |
| 23 | Long H1s | Kept: measured on phones (at most 5 lines at 360px, no broken words, primary button above the fold). | 8 routes |
| 24 | Other §15 items | No SVG logo exists; founders stay hidden (NDA); social profiles not yet; Geist Mono unanswered, still used for labels only. | — |
| 25 | Forms sheet | Created in Google Drive, folder "KeshavCo website forms" (sheet with Enquiries, Careers, Subscribers tabs, the script and setup steps). Script deployment and the Vercel variable need the owner's Google login. | `docs/forms/` |

## After launch (29 Sep 2026)

| # | Topic | Decision | Affects |
| :-- | :-- | :-- | :-- |
| 26 | Form delivery | Email through Resend is the main channel (owner's request; new package `resend`). Every form emails shubhamthakkar1701@gmail.com, shubham@keshavco.com and hello@keshavco.com with Reply-To set to the sender. The Google Sheet stays an optional second channel, and a Google Form embed was not used. `/api/enquiry` now shares the delivery code with the other two forms and drops honeypot submissions. On production, a submission that no channel accepted shows the error with the email address, instead of a thank-you. | `src/lib/email.ts`, `src/lib/forms.ts`, `/api/*` |
