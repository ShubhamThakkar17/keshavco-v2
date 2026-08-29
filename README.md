# KeshavCo — keshavco.com

Marketing site for **Keshav Consultancy Pvt. Ltd.** — a business growth partner.
Built as a scroll-led agency site: every section is choreographed to the
scroll position rather than simply fading in.

## Stack

| Piece | Choice |
| :---- | :----- |
| Framework | Next.js 15 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4 (CSS-first config in `src/app/globals.css`) |
| Motion | Framer Motion 12 |
| Smooth scroll | Lenis |
| Type | Sora (display) + Inter (body), via `next/font` |
| Booking | Cal.com (`@calcom/embed-react`) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project layout

```
src/
  app/                      routes (App Router)
    page.tsx                home
    about/ services/ growth-packages/ industries/
    process/ faq/ contact/ insights/
    services/[pillar]/                    4 pillar pages
    services/[pillar]/[service]/          26 sub-service pages
    privacy-policy/ terms-of-use/ disclaimer/
    api/enquiry/route.ts    contact form endpoint
    sitemap.ts robots.ts icon.svg not-found.tsx
  components/
    layout/                 Header, Footer, PageHero, LegalPage
    motion/                 the scroll-animation primitives
    sections/               composed page sections
    ui/                     Button, Logo, Accordion, Section, Breadcrumb…
  content/                  ALL COPY LIVES HERE — typed modules, no CMS
  lib/                      seo helpers
```

**All copy is in `src/content/`.** Editing text never means touching a
component. Each module maps to a section of the source copy document.

## Visual system

The site is graphic-led, not text-led. Three layers do that work.

### 1. The brand mark

The supplied Keshav Consultancy artwork lives in `public/brand/` and resolves
through `src/content/brand.ts`, so every logo — header, footer, favicon and the
large hero graphic — comes from one file. Replacing it updates all of them.

The mark is authored with real transparency and holds up on both the white and
the navy sections, so a single file serves everywhere; there is no reversed
variant to keep in step. The header and footer pair it with the wordmark as
live text, which keeps it crisp at any size and lets it recolour per
background — the supplied lockups set the wordmark in deep navy, which would
disappear on the dark sections. `public/brand/README.md` covers this.

`BrandFeature` renders the mark at display size over a brand-coloured halo: it
rises in on load, breathes on a long loop and drifts against the scroll. It is
the hero graphic and the fallback visual on inner pages without a photograph.

### 2. Photography

Seventeen photographs in `public/images/`, registered with dimensions and alt
text in `src/content/images.ts`. Every page hero, capability card, industry
panel and section break is led by one. All are Unsplash-licensed (free for
commercial use); `public/images/CREDITS.md` records every source ID so any
image can be traced or swapped.

**These are placeholders for real KeshavCo work.** Replace them with client
projects, team portraits and case-study photography as they become available —
`src/content/images.ts` is the only file that needs editing.

### 3. Composition devices

- `MediaFrame` — a photograph that wipes open from the bottom while the image
  drifts against the scroll inside it
- `CapabilityShowcase` — capability cards where the photograph *is* the card;
  one line of copy, and the sub-service list expands on hover
- `IndustryRail` — a pinned section that holds still while seven industry cards
  travel sideways
- Bento grids mixing cards, photographs and the support panel

### Text density

The home page deliberately shows the short version: one paragraph where the
copy document has three, a written one-line `tagline` on every card, and detail
that expands on hover instead of sitting open. Nothing was deleted — the full
approved copy still lives in `src/content` and is rendered in full on About,
Services, the pillar pages and Process, which is where someone who wants the
detail goes.

Cards use written `tagline` fields rather than truncating a paragraph, so a
short line never reads as a fragment.

## Scroll animation system

The animation vocabulary is deliberately small and reused everywhere, so the
site feels like one object rather than a pile of effects.

| Primitive | File | What it does |
| :-------- | :--- | :----------- |
| `SmoothScroll` | `motion/SmoothScroll.tsx` | Lenis inertial scrolling + anchor handling |
| `Reveal` / `RevealGroup` / `RevealItem` | `motion/Reveal.tsx` | Fade + translate (+ optional blur) on enter, with stagger |
| `SplitText` | `motion/SplitText.tsx` | Masked word-by-word heading reveal |
| `RotatingWords` | `motion/RotatingWords.tsx` | Kinetic headline phrase swap (hero, footer) |
| `ScrollHighlightText` | `motion/ScrollHighlightText.tsx` | Manifesto paragraph that fills in word by word against scroll progress |
| `Parallax` | `motion/Parallax.tsx` | Counter-scroll drift, optional scale |
| `Marquee` | `motion/Marquee.tsx` | Infinite rail whose speed and direction react to scroll velocity |
| `Counter` | `motion/Counter.tsx` | Count-up on first view |
| `SpotlightCard` | `motion/SpotlightCard.tsx` | Pointer-tracking gradient spotlight |
| `ScrollProgress` | `motion/ScrollProgress.tsx` | Gradient reading indicator under the header |

Composed behaviours built on those: the hero's multi-rate aurora parallax, the
header's condense-and-flip-tone transition, the sticky-stacking growth package
cards (`sections/PackagesStack.tsx`), the scroll-filled process spine
(`sections/ProcessTimeline.tsx`), the sticky industry index
(`sections/IndustryExplorer.tsx`), and the pinned horizontal testimonial rail
(`sections/Testimonials.tsx`).

### Reduced motion

Every primitive checks `useReducedMotionSafe()`. With
`prefers-reduced-motion: reduce` the site renders fully static: Lenis is never
initialised, parallax and scroll-linked transforms are dropped, rotating words
settle on the first phrase, and `globals.css` neutralises transitions. Nothing
is hidden — reduced motion never costs content.

## Scope note — services

Two pillars from the source copy document, **Offline Marketing** and
**Community & PR**, are intentionally not in this build. They are removed from
navigation, the services grid, the footer, the sitemap and all SEO metadata,
and prose that promised offline media buying or PR has been rewritten so the
site does not advertise a capability it does not have a page for.

To add them back later: append the pillar objects to `pillars` in
`src/content/services.ts` (structure and copy for both are in the source
document) — the mega-menu, services grid, sitemap, pillar routes and
sub-service routes are all generated from that array and pick them up with no
other changes.

The **Expand** growth package and the **Industries** "typical work" lists were
adjusted for the same reason.

## Booking — Cal.com

`/contact#book` embeds the Cal.com event `hello-kc/discovery` inline via
`@calcom/embed-react` (namespace `discovery`, month view). Every "Book a
Growth Consultation" button on the site points at that anchor. The event,
namespace and direct URL are configured in one place — `booking` in
`src/content/site.ts`.

`BookingEmbed` judges readiness by watching for Cal's `iframe` to appear,
**not** by whether `getCalApi()` resolved — that promise settles as soon as
the queue is set up, whether or not `embed.js` actually loads. If no iframe
appears within nine seconds the component shows a fallback with a direct link
to the booking page and the phone number, so an ad blocker, a locked-down
corporate network or a Cal outage never leaves an empty box.

> The build sandbox blocks `app.cal.com`, so the embed was verified through
> its fallback path rather than with a live calendar. Check the calendar
> renders on the first real deploy.

## Contact form

`ContactForm` posts JSON to `POST /api/enquiry`. The route validates the
payload, then:

- if `ENQUIRY_WEBHOOK_URL` is set, forwards the submission there (CRM, inbox
  automation, or a form service) and fails loudly if delivery fails;
- otherwise logs a warning with the payload so nothing is silently dropped in
  development.

**Set `ENQUIRY_WEBHOOK_URL` before launch**, or replace the route body with a
direct email/CRM integration. The newsletter form in the footer is currently
UI-only and needs the same treatment.

## Pre-launch checklist

Everything below is a real placeholder in the codebase, not a nice-to-have.

- [x] **Phone number** — +91 70411 92168
- [ ] **Working hours** — `site.workingHours` in `src/content/site.ts`
- [ ] **Social profile URLs** — `site.social` (all currently `#`)
- [ ] **Enquiry delivery** — set `ENQUIRY_WEBHOOK_URL`
- [ ] **Newsletter signup** — wire the footer form to a provider
- [x] **Logo** — supplied artwork installed in `public/brand/`
- [ ] **Reversed lockup** (optional) — if a white-wordmark, transparent-background
      lockup is produced, add it to `public/brand/` and the header and footer can
      use it instead of the mark-plus-live-text pairing
- [ ] **Photography** — the 17 images in `public/images/` are licensed stock
      standing in for real work. Replace with KeshavCo project photography,
      client work and team portraits; update `src/content/images.ts`
- [ ] **Open Graph image** — add `src/app/opengraph-image.png` (1200×630, dark,
      logo + "One partner. Strategy to execution.")
- [ ] **Legal pages** — `legalPages` in `src/content/misc.ts` holds placeholder
      text for Privacy Policy, Terms of Use and Disclaimer. Replace with
      reviewed copy.
- [ ] **Testimonials** — `showTestimonials` in `src/content/home.ts` is `false`
      and the quotes are placeholders. Flip it on only with real, permissioned
      quotes. The carousel component is built and ready.
- [ ] **Counters** — the home band shows structural facts (4 capabilities,
      26 services, 7 industries, 1 point of accountability), which are true.
      `placeholderCounters` in `src/content/home.ts` holds the
      "businesses advised / campaigns executed" version for when defensible
      figures exist.
- [ ] **Client logos** — the home strip currently runs the industry list, per
      the copy document's own fallback. Swap `industryStrip.items` for logos
      once permissions are cleared.
- [ ] **Insights** — `/insights` lists planned titles with no links because
      nothing is published. Replace `insightsPage.planned` with real posts and
      add article routes.
- [ ] **Canonical domain** — `site.url` is `https://keshavco.com`; confirm
      before the sitemap and Open Graph tags go live.

## SEO

Per-page titles and descriptions come straight from the source copy document
and live beside the copy they describe. `src/lib/seo.ts` builds the metadata
objects plus JSON-LD for Organization, BreadcrumbList, FAQPage and Service.
`sitemap.ts` and `robots.ts` generate from the content modules, so new services
appear automatically.

## Accessibility

Skip link, one `<h1>` per page, labelled form fields with inline errors and
`aria-invalid`, `aria-expanded` on the accordion and menus, Escape closes the
menus, visible focus rings, and full reduced-motion support. Decorative motion
layers are `aria-hidden`; `SplitText` keeps headings as single readable nodes.
