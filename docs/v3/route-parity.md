# Route parity: v2 → v3

Generated 2026-09-27 from `docs/v3/routes-before.json` and `docs/v3/routes-after.json` (`scripts/route-parity.mjs`).

## Result

- **42/42** original routes match on status, title, meta description, canonical, robots and JSON-LD types, with exactly one H1 each.
- **1** new route: `/careers`.
- **42** routes gained an `og:image` (`/opengraph-image`, 1200 × 630).
- **2** H1s read differently (listed below).
- **Failures:** none.

## H1 wording changes

| Route | Before | After |
| :-- | :-- | :-- |
| `/` | We help businesses solve brand positioninggrowth problemsgrowth problems, market entry, lead generation, brand positioning, scale challenges | One partner. Strategy to execution. |
| `/growth-packages` | Engagements built aroundoutcomes | Engagements built around outcomes |

## New route: `/careers`

- Status 200, title "Careers at KeshavCo — Open Applications"
- Description: Work on growth end to end. KeshavCo takes open applications from senior people across strategy, brand, technology and media.
- Canonical https://keshavco.com/careers, robots `index, follow`, 1 H1 ("Build growth with us")
- JSON-LD: BreadcrumbList, Organization

## Every route

| Route | Match | JSON-LD | H1 |
| :-- | :-: | :-- | :-- |
| `/` | yes | FAQPage, Organization | One partner. Strategy to execution. |
| `/services` | yes | BreadcrumbList, Organization | Services built around growth outcomes |
| `/growth-packages` | yes | BreadcrumbList, Organization | Engagements built around outcomes |
| `/industries` | yes | BreadcrumbList, Organization | Growth looks different in every industry |
| `/about` | yes | BreadcrumbList, Organization | We exist because growth got fragmented |
| `/process` | yes | BreadcrumbList, Organization | How we take a business from growth problem to result |
| `/insights` | yes | BreadcrumbList, Organization | Thinking worth your time |
| `/faq` | yes | BreadcrumbList, FAQPage, Organization | Questions businesses ask us |
| `/contact` | yes | BreadcrumbList, Organization | Let's talk about your growth problem |
| `/careers` | new | BreadcrumbList, Organization | Build growth with us |
| `/privacy-policy` | yes | Organization | Privacy Policy |
| `/terms-of-use` | yes | Organization | Terms of Use |
| `/disclaimer` | yes | Organization | Disclaimer |
| `/services/strategy` | yes | BreadcrumbList, Organization, Service | Decide where growth comes from — before you spend on it |
| `/services/strategy/business-consulting` | yes | BreadcrumbList, Organization, Service | Fix the constraint holding your business back |
| `/services/strategy/growth-strategy` | yes | BreadcrumbList, Organization, Service | A written plan for your next stage of revenue |
| `/services/strategy/go-to-market-strategy` | yes | BreadcrumbList, Organization, Service | Enter a new market without guessing |
| `/services/strategy/brand-strategy` | yes | BreadcrumbList, Organization, Service | Give buyers a reason to choose you over a cheaper option |
| `/services/strategy/marketing-strategy` | yes | BreadcrumbList, Organization, Service | Spend on marketing with a reason behind every line |
| `/services/strategy/fractional-growth-partner` | yes | BreadcrumbList, Organization, Service | Senior growth leadership without a full-time hire |
| `/services/branding` | yes | BreadcrumbList, Organization, Service | Look like the business you are becoming |
| `/services/branding/brand-identity` | yes | BreadcrumbList, Organization, Service | A brand system that holds together everywhere |
| `/services/branding/logo-design` | yes | BreadcrumbList, Organization, Service | A mark that works everywhere your business appears |
| `/services/branding/packaging-design` | yes | BreadcrumbList, Organization, Service | Packaging that earns the pick-up |
| `/services/branding/company-profile` | yes | BreadcrumbList, Organization, Service | The document that establishes you as the credible choice |
| `/services/branding/pitch-deck` | yes | BreadcrumbList, Organization, Service | Make the argument, not the feature list |
| `/services/branding/creative-design` | yes | BreadcrumbList, Organization, Service | Consistent creative, at the volume your growth needs |
| `/services/technology` | yes | BreadcrumbList, Organization, Service | Build the infrastructure your growth runs on |
| `/services/technology/website-development` | yes | BreadcrumbList, Organization, Service | We build digital experiences that convert visitors into customers |
| `/services/technology/ecommerce` | yes | BreadcrumbList, Organization, Service | Online stores built to sell, not just to list |
| `/services/technology/mobile-apps` | yes | BreadcrumbList, Organization, Service | Apps built where they genuinely earn their place |
| `/services/technology/crm` | yes | BreadcrumbList, Organization, Service | Stop losing leads you already paid for |
| `/services/technology/automation` | yes | BreadcrumbList, Organization, Service | Remove the manual work slowing your team down |
| `/services/technology/ai-integrations` | yes | BreadcrumbList, Organization, Service | Apply AI where it pays for itself |
| `/services/digital-marketing` | yes | BreadcrumbList, Organization, Service | Be found by customers who are already looking |
| `/services/digital-marketing/seo` | yes | BreadcrumbList, Organization, Service | Get discovered by customers actively searching for you |
| `/services/digital-marketing/google-ads` | yes | BreadcrumbList, Organization, Service | Capture demand at the moment of intent |
| `/services/digital-marketing/meta-ads` | yes | BreadcrumbList, Organization, Service | Reach the right audience on Facebook and Instagram |
| `/services/digital-marketing/email-marketing` | yes | BreadcrumbList, Organization, Service | Turn your existing database into revenue |
| `/services/digital-marketing/whatsapp-marketing` | yes | BreadcrumbList, Organization, Service | Reach customers where Indian buyers respond |
| `/services/digital-marketing/lead-generation` | yes | BreadcrumbList, Organization, Service | Campaigns built around qualified enquiries |
| `/services/digital-marketing/content-marketing` | yes | BreadcrumbList, Organization, Service | Answer what your buyers are researching |
| `/services/digital-marketing/social-media` | yes | BreadcrumbList, Organization, Service | A presence that supports your sales conversations |
