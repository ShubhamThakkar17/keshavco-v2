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
