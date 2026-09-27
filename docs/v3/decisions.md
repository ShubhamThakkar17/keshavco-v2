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
