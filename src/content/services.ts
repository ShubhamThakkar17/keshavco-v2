export type CtaVariant = "primary" | "secondary" | "tertiary";

export type SubService = {
  slug: string;
  name: string;
  /** One-line description used in the pillar page "What we do" list and the mega-menu. */
  blurb: string;
  h1: string;
  intro: string;
  points: [string, string, string];
  cta: CtaVariant;
  seo: { title: string; description: string };
};

export type Pillar = {
  slug: string;
  name: string;
  eyebrow: string;
  /** Short line used on the home and services-hub capability cards. */
  cardBody: string;
  /** A single written line for image-led cards, where a paragraph will not fit. */
  tagline: string;
  h1: string;
  intro: string;
  problem: string;
  subServices: SubService[];
  outcomes: string[];
  ctaHeading: string;
  ctaVariant: CtaVariant;
  seo: { title: string; description: string };
};

export const pillars: Pillar[] = [
  {
    slug: "strategy",
    name: "Strategy",
    eyebrow: "Strategy",
    tagline: "Know what you are solving before you spend on solving it.",
    cardBody:
      "Before you spend on marketing, you need to know what you are solving. We build the growth plan: where the revenue comes from, which markets to enter, how to position, and what to do first.",
    h1: "Decide where growth comes from — before you spend on it",
    intro:
      "Marketing budgets are often the first thing a business increases and the last thing it questions. We work the other way around. We start with the business — margins, market, buyer, capacity, competition — and build a growth plan that tells you where the next stage of revenue is coming from and what it will take to get there. Then, and only then, do we talk about channels.",
    problem:
      "Most growth plans are actually marketing plans. They assume the product is right, the pricing is right, the market is right and the sales process works — and that the only missing ingredient is visibility. Often it is not. We have seen businesses spend heavily on ads to solve what was really a positioning problem, a channel-conflict problem or a sales follow-up problem. Strategy work is what prevents that.",
    outcomes: [
      "A written growth strategy your leadership team can act on",
      "A clear view of which markets, segments and channels deserve investment",
      "A budget allocation with reasoning behind every line",
      "Defined targets and a reporting rhythm to track them",
      "An execution plan we can deliver, or hand to your team",
    ],
    ctaHeading: "Ready to build the plan?",
    ctaVariant: "primary",
    seo: {
      title: "Business & Growth Strategy Consulting — KeshavCo",
      description:
        "Growth strategy, go-to-market planning and business consulting that decides where growth comes from before you spend on marketing.",
    },
    subServices: [
      {
        slug: "business-consulting",
        name: "Business Consulting",
        blurb:
          "A structured read of how your business actually makes money, where it leaks, and which constraint to fix first.",
        h1: "Fix the constraint holding your business back",
        intro:
          "Growth problems are rarely where they appear. Falling enquiries can be a positioning problem. Flat revenue can be a pricing problem. We examine how your business actually makes money, identify the real constraint, and recommend what to change first.",
        points: [
          "A structured diagnosis of your business model, margins and market position",
          "A prioritised list of what to fix, in what order, and why",
          "Recommendations you can act on with or without us",
        ],
        cta: "primary",
        seo: {
          title: "Business Consulting Services — KeshavCo",
          description:
            "We diagnose the real constraint holding your business back and recommend what to fix first, with reasoning you can act on.",
        },
      },
      {
        slug: "growth-strategy",
        name: "Growth Strategy",
        blurb:
          "A written roadmap for the next stage of revenue: priorities, sequence, budget allocation and targets.",
        h1: "A written plan for your next stage of revenue",
        intro:
          "Ambition without a roadmap becomes activity. We build a growth strategy that names where the next stage of revenue comes from, what has to be true to get there, and what your team should do first.",
        points: [
          "A revenue roadmap with sequence, ownership and timelines",
          "Budget allocated across channels with reasoning behind each line",
          "Targets and a monthly reporting rhythm to track them",
        ],
        cta: "primary",
        seo: {
          title: "Growth Strategy Consulting — KeshavCo",
          description:
            "A written roadmap for your next stage of revenue: priorities, channels, budget allocation and targets your leadership can approve.",
        },
      },
      {
        slug: "go-to-market-strategy",
        name: "Go-To-Market Strategy",
        blurb:
          "How you enter a new city, segment or category — pricing, positioning, channel mix, sales enablement and launch sequence.",
        h1: "Enter a new market without guessing",
        intro:
          "A new city, segment or product line is the most expensive place to learn by trial and error. We build the entry plan — positioning, pricing, channel mix, sales enablement and launch sequence — before the spend begins.",
        points: [
          "Market and competitor analysis specific to your entry",
          "Positioning and pricing built for that market, not copied from your existing one",
          "A launch plan across channels and sales, with a defined first 90 days",
        ],
        cta: "secondary",
        seo: {
          title: "Go-To-Market Strategy Services — KeshavCo",
          description:
            "Enter a new city, segment or category with a plan — positioning, pricing, channel mix and a defined first 90 days.",
        },
      },
      {
        slug: "brand-strategy",
        name: "Brand Strategy",
        blurb:
          "What you stand for, who you are for, and why a buyer should choose you over a cheaper option.",
        h1: "Give buyers a reason to choose you over a cheaper option",
        intro:
          "When buyers cannot tell the difference between you and a competitor, they decide on price. Brand strategy defines what you stand for, who you are for, and the argument that makes you the obvious choice.",
        points: [
          "Clear positioning, audience definition and differentiation",
          "Messaging your sales team and marketing can both use",
          "A brand platform that supports premium pricing",
        ],
        cta: "secondary",
        seo: {
          title: "Brand Strategy Consulting — KeshavCo",
          description:
            "Positioning, audience and differentiation that give buyers a reason to choose you over a cheaper option.",
        },
      },
      {
        slug: "marketing-strategy",
        name: "Marketing Strategy",
        blurb: "The channel plan: what to run, on what budget, in what order, measured against what.",
        h1: "Spend on marketing with a reason behind every line",
        intro:
          "Most marketing budgets are last year's budget with an increase. We build the channel plan from your business objectives — what to run, on what budget, in what order, measured against what.",
        points: [
          "A channel plan with budget allocation and stated rationale",
          "Every channel planned as one campaign, not separate silos",
          "Defined KPIs and a reporting format your leadership will actually read",
        ],
        cta: "primary",
        seo: {
          title: "Marketing Strategy Services — KeshavCo",
          description:
            "A channel plan with budget allocation and reasoning behind every line, with all channels planned as one campaign.",
        },
      },
      {
        slug: "fractional-growth-partner",
        name: "Fractional Growth Partner",
        blurb:
          "Senior growth leadership embedded with your team on a retained basis, without a full-time hire.",
        h1: "Senior growth leadership without a full-time hire",
        intro:
          "Many businesses need marketing leadership before they can justify a full-time CMO. We embed with your team on a retained basis — setting direction, managing agencies and vendors, reviewing performance and building internal capability.",
        points: [
          "Senior marketing leadership at a fraction of the cost of a hire",
          "Direction and accountability for your existing marketing team and vendors",
          "Monthly leadership reviews against agreed growth targets",
        ],
        cta: "secondary",
        seo: {
          title: "Fractional CMO & Growth Partner — KeshavCo",
          description:
            "Senior marketing leadership on a retained basis — direction, vendor management and monthly reviews without a full-time hire.",
        },
      },
    ],
  },
  {
    slug: "branding",
    name: "Branding",
    eyebrow: "Branding",
    tagline: "Buyers decide how serious you are in seconds.",
    cardBody:
      "Buyers decide how serious you are in seconds. We build brand identities, profiles and pitch material that make a growing business look like the credible choice.",
    h1: "Look like the business you are becoming",
    intro:
      "Buyers form a judgement about your business in seconds — from your logo on an invoice, your profile in a tender, your deck in a boardroom. When a capable company looks improvised, it loses deals it should have won and negotiates from a weaker position. We build brands that make serious businesses look serious.",
    problem:
      "Growing businesses outgrow their brand quietly. The identity was designed when the company was a third of its size. The company profile has not been updated in three years. Every department makes its own presentation template. Nothing is wrong exactly — but nothing signals scale, either. Meanwhile a smaller competitor with better material is winning the meeting.",
    outcomes: [
      "A brand system that holds together across digital, print and physical spaces",
      "Sales and credibility material your team is confident sending",
      "Consistency that no longer depends on one person policing it",
      "A brand that supports premium pricing instead of undermining it",
    ],
    ctaHeading: "Building or rebuilding your brand?",
    ctaVariant: "secondary",
    seo: {
      title: "Brand Identity & Branding Services — KeshavCo",
      description:
        "Brand identity, logo, packaging, company profiles and pitch decks that make growing businesses look like the credible choice.",
    },
    subServices: [
      {
        slug: "brand-identity",
        name: "Brand Identity",
        blurb:
          "A complete visual and verbal system: logo, colour, typography, imagery, tone and usage rules your whole team can apply consistently.",
        h1: "A brand system that holds together everywhere",
        intro:
          "A logo is not a brand. We build the complete system — visual and verbal — so your business looks consistent whether the touchpoint is a website, a tender document or a factory gate.",
        points: [
          "Logo, colour, typography, imagery and tone as one documented system",
          "Usage guidelines your whole team can follow without supervision",
          "Templates for the material your business produces most often",
        ],
        cta: "secondary",
        seo: {
          title: "Brand Identity Design Services — KeshavCo",
          description:
            "A complete visual and verbal brand system with usage guidelines your whole team can apply consistently.",
        },
      },
      {
        slug: "logo-design",
        name: "Logo Design",
        blurb:
          "A mark that works at every size, on every surface, from a website header to a factory gate.",
        h1: "A mark that works everywhere your business appears",
        intro:
          "Your logo will appear on a phone screen, an invoice, a hoarding and a uniform. We design marks that stay legible and distinctive across all of them, with the file formats and rules to keep it that way.",
        points: [
          "A distinctive mark tested at every size and application",
          "Complete file formats for print, digital and fabrication",
          "Clear usage rules so it stays consistent as your team grows",
        ],
        cta: "secondary",
        seo: {
          title: "Professional Logo Design Services — KeshavCo",
          description:
            "Distinctive marks tested at every size and application, with complete file formats and clear usage rules.",
        },
      },
      {
        slug: "packaging-design",
        name: "Packaging Design",
        blurb:
          "Packaging that earns attention on a shelf and survives the realities of production and distribution.",
        h1: "Packaging that earns the pick-up",
        intro:
          "On a crowded shelf, packaging is your entire sales pitch. We design packaging that stands out, communicates quickly, and works within the constraints of your production and distribution.",
        points: [
          "Shelf-tested design built for your category and price point",
          "Production-ready artwork with material and process guidance",
          "Consistency across variants, sizes and future launches",
        ],
        cta: "secondary",
        seo: {
          title: "Packaging Design Services — KeshavCo",
          description:
            "Shelf-ready packaging that earns the pick-up and works within your production and distribution constraints.",
        },
      },
      {
        slug: "company-profile",
        name: "Company Profile",
        blurb:
          "The document your sales team, your bankers and your tender applications rely on to establish credibility.",
        h1: "The document that establishes you as the credible choice",
        intro:
          "Your company profile does the talking in tenders, partner conversations and first meetings you are not in. We build one that reflects the scale and seriousness of the business you actually run.",
        points: [
          "A profile structured around what buyers and partners assess",
          "Design and writing that signals scale, not a template",
          "Print and digital versions your team can use immediately",
        ],
        cta: "tertiary",
        seo: {
          title: "Company Profile Design — KeshavCo",
          description:
            "The document that establishes credibility in tenders, partner conversations and first meetings you are not in.",
        },
      },
      {
        slug: "pitch-deck",
        name: "Pitch Deck",
        blurb:
          "A narrative-led investor or client deck that makes the argument clearly instead of listing features.",
        h1: "Make the argument, not the feature list",
        intro:
          "Most decks describe a company. The ones that work make an argument. We build investor and client decks with a clear narrative, evidence in the right places, and design that supports the story.",
        points: [
          "A narrative structure built for your specific audience and ask",
          "Data and proof presented so it is understood in seconds",
          "An editable master deck your team can adapt confidently",
        ],
        cta: "tertiary",
        seo: {
          title: "Pitch Deck Design Services — KeshavCo",
          description:
            "Investor and client decks built on a clear narrative, with evidence in the right places and design that supports the story.",
        },
      },
      {
        slug: "creative-design",
        name: "Creative Design",
        blurb:
          "Ongoing campaign creative, collateral and communication that stays consistent as volume grows.",
        h1: "Consistent creative, at the volume your growth needs",
        intro:
          "As campaigns scale, creative consistency is usually the first casualty. We provide ongoing design across campaigns, collateral and communication so everything you publish looks like it came from the same company.",
        points: [
          "Ongoing campaign and collateral design at a predictable turnaround",
          "Consistency across digital and print formats",
          "One creative team that already knows your brand",
        ],
        cta: "secondary",
        seo: {
          title: "Creative Design Services — KeshavCo",
          description:
            "Ongoing campaign and collateral design at predictable turnaround, consistent across digital and print.",
        },
      },
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    eyebrow: "Technology",
    tagline: "The digital infrastructure your growth actually runs on.",
    cardBody:
      "We build the digital infrastructure your growth runs on — websites that convert, ecommerce that scales, CRMs that stop leads leaking, and automation that removes manual work.",
    h1: "Build the infrastructure your growth runs on",
    intro:
      "Marketing brings people to your business. Technology determines whether they convert, whether the lead reaches a salesperson, and whether anyone follows up. We build the digital layer between demand and revenue — websites that convert, commerce that scales, CRMs that stop leads leaking, and automation that removes the manual work slowing your team down.",
    problem:
      "Most businesses have a website; far fewer have a website that does a job. Enquiries arrive in a shared inbox and get answered when someone remembers. Customer data sits across three spreadsheets and one person's phone. Ad spend increases, but conversion does not — because the problem was never traffic. Fixing the infrastructure is usually cheaper than buying more traffic.",
    outcomes: [
      "A website that generates enquiries rather than describing your company",
      "Every lead captured, assigned and traceable",
      "Fewer hours lost to manual, repeatable work",
      "Systems that hold up as volume increases",
      "Clear visibility into what your digital investment produced",
    ],
    ctaHeading: "Need to fix the infrastructure first?",
    ctaVariant: "secondary",
    seo: {
      title: "Website, CRM & Automation Services — KeshavCo",
      description:
        "Websites that convert, ecommerce, mobile apps, CRM, automation and AI integrations — the infrastructure your growth runs on.",
    },
    subServices: [
      {
        slug: "website-development",
        name: "Website Development",
        blurb:
          "Digital experiences designed to convert visitors into enquiries, built to load fast and rank well.",
        h1: "We build digital experiences that convert visitors into customers",
        intro:
          "A website should generate enquiries, not just exist. We build fast, well-structured sites designed around how your buyers actually decide — with the tracking to prove what is working.",
        points: [
          "Built for conversion, with clear paths to enquiry on every page",
          "Fast, mobile-first and structured to rank in search",
          "Analytics and lead tracking configured from day one",
        ],
        cta: "primary",
        seo: {
          title: "Website Development Services — KeshavCo",
          description:
            "We build digital experiences that convert visitors into customers — fast, mobile-first and structured to rank.",
        },
      },
      {
        slug: "ecommerce",
        name: "Ecommerce",
        blurb:
          "Online stores built for catalogue depth, repeat purchase and the operational reality of fulfilment.",
        h1: "Online stores built to sell, not just to list",
        intro:
          "Ecommerce succeeds on the details — catalogue structure, checkout friction, repeat purchase, and the operational reality behind every order. We build stores that hold up as volume grows.",
        points: [
          "Catalogue and checkout designed to reduce drop-off",
          "Payments, logistics and inventory integrated cleanly",
          "Built for repeat purchase, not just first-time conversion",
        ],
        cta: "secondary",
        seo: {
          title: "Ecommerce Development Services — KeshavCo",
          description:
            "Online stores built to sell — catalogue, checkout, payments and logistics designed for repeat purchase and scale.",
        },
      },
      {
        slug: "mobile-apps",
        name: "Mobile Apps",
        blurb:
          "Apps built where they genuinely improve customer experience or internal operations — not because everyone has one.",
        h1: "Apps built where they genuinely earn their place",
        intro:
          "An app is a serious investment and a permanent commitment. We build them when they measurably improve customer experience or internal operations — and we will tell you when a good mobile website is the better answer.",
        points: [
          "A clear case for the app before development begins",
          "Built for the platforms your users actually use",
          "Planned for maintenance and iteration, not just launch",
        ],
        cta: "secondary",
        seo: {
          title: "Mobile App Development — KeshavCo",
          description:
            "Apps built where they measurably improve customer experience or operations, with a clear case made before development.",
        },
      },
      {
        slug: "crm",
        name: "CRM",
        blurb: "A single system where every lead is captured, assigned, followed up and reported on.",
        h1: "Stop losing leads you already paid for",
        intro:
          "Most businesses lose more revenue to poor follow-up than to poor marketing. A properly configured CRM captures every enquiry, assigns it, tracks the follow-up and shows leadership what is actually happening in the pipeline.",
        points: [
          "Every lead captured from every source, automatically",
          "Clear ownership, follow-up rules and escalation",
          "Pipeline visibility your sales team and leadership both trust",
        ],
        cta: "primary",
        seo: {
          title: "CRM Setup & Implementation — KeshavCo",
          description:
            "Stop losing leads you already paid for. Every enquiry captured, assigned, followed up and visible to leadership.",
        },
      },
      {
        slug: "automation",
        name: "Automation",
        blurb:
          "Removing the repetitive manual work in enquiry handling, follow-ups, reporting and internal handoffs.",
        h1: "Remove the manual work slowing your team down",
        intro:
          "Enquiry routing, follow-up reminders, report generation, internal handoffs — hours disappear into work that does not need a human. We identify the repeatable processes and automate them.",
        points: [
          "An audit of where manual effort is being spent",
          "Automated workflows across enquiries, follow-ups and reporting",
          "Time returned to the work that actually needs your team",
        ],
        cta: "secondary",
        seo: {
          title: "Business Process Automation — KeshavCo",
          description:
            "Automate enquiry routing, follow-ups, reporting and internal handoffs, and return hours to your team.",
        },
      },
      {
        slug: "ai-integrations",
        name: "AI Integrations",
        blurb:
          "Practical applications of AI in support, content operations, lead qualification and internal knowledge, deployed where they pay for themselves.",
        h1: "Apply AI where it pays for itself",
        intro:
          "AI is useful in specific places — customer support, lead qualification, content operations, internal knowledge. We identify where it makes commercial sense in your business, implement it properly, and skip the rest.",
        points: [
          "A practical assessment of where AI helps your operations",
          "Implementation integrated with your existing systems",
          "Measured against time saved or revenue gained, not novelty",
        ],
        cta: "secondary",
        seo: {
          title: "AI Integration Services — KeshavCo",
          description:
            "Practical AI in support, lead qualification, content operations and internal knowledge, measured on time and revenue.",
        },
      },
    ],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    eyebrow: "Digital Marketing",
    tagline: "Get found by the customers already searching for what you sell.",
    cardBody:
      "We help your business get found by customers already searching for what you sell, and turn that attention into qualified enquiries you can track.",
    h1: "Be found by customers who are already looking",
    intro:
      "The most valuable customer is the one already searching for what you sell. Digital marketing, done properly, puts you in front of them at that moment — and then puts every resulting enquiry somewhere you can see it. We plan digital as a demand system, not a set of channel activities.",
    problem:
      "Digital spend rises steadily while nobody can say what it produced. Leads come in but are not tracked to a sale. The agency reports impressions and engagement; the business wants enquiries and revenue. We connect the two — every rupee mapped to a channel, every channel mapped to a result.",
    outcomes: [
      "A steady flow of enquiries you can measure and forecast",
      "Clear cost per lead and cost per acquisition by channel",
      "Visibility where your buyers are already searching",
      "A database that produces repeat revenue",
      "Monthly reporting in business terms, not platform metrics",
    ],
    ctaHeading: "Want predictable enquiries?",
    ctaVariant: "primary",
    seo: {
      title: "Digital Marketing Services in India — KeshavCo",
      description:
        "SEO, Google Ads, Meta Ads, email, WhatsApp and lead generation that turn search demand into qualified enquiries you can measure.",
    },
    subServices: [
      {
        slug: "seo",
        name: "SEO",
        blurb:
          "We help your business get discovered by customers actively searching for what you sell.",
        h1: "Get discovered by customers actively searching for you",
        intro:
          "Search is where buying decisions begin. We make sure your business appears when your customers look — through technical fixes, content built around real search intent, and authority that compounds over time.",
        points: [
          "Visibility for the terms your buyers actually search",
          "A steady flow of enquiries that does not stop when spend stops",
          "Technical, content and authority work as one plan",
        ],
        cta: "primary",
        seo: {
          title: "SEO Services in India — KeshavCo",
          description:
            "Get discovered by customers actively searching for your products and services, with enquiries that do not stop when spend stops.",
        },
      },
      {
        slug: "google-ads",
        name: "Google Ads",
        blurb:
          "Capturing high-intent demand at the moment of search, at a cost per enquiry that makes commercial sense.",
        h1: "Capture demand at the moment of intent",
        intro:
          "Someone searching for your product today is the most valuable audience you will reach. We build and manage campaigns that capture that demand at a cost per enquiry your business can justify.",
        points: [
          "Campaigns built around commercial intent, not traffic volume",
          "Continuous optimisation of cost per qualified enquiry",
          "Reporting in enquiries and revenue, not clicks and impressions",
        ],
        cta: "primary",
        seo: {
          title: "Google Ads Management — KeshavCo",
          description:
            "Capture high-intent demand at a cost per enquiry your business can justify, reported in enquiries not clicks.",
        },
      },
      {
        slug: "meta-ads",
        name: "Meta Ads",
        blurb:
          "Reaching the right audience on Facebook and Instagram with creative built for the platform, not repurposed from print.",
        h1: "Reach the right audience on Facebook and Instagram",
        intro:
          "Meta works when the audience, creative and offer are built for the platform. We plan campaigns around your actual buyer, with creative made for the feed rather than adapted from a brochure.",
        points: [
          "Precise audience targeting and structured testing",
          "Creative built for the platform and refreshed before it fatigues",
          "Measured on qualified enquiries, not engagement",
        ],
        cta: "secondary",
        seo: {
          title: "Facebook & Instagram Ads — KeshavCo",
          description:
            "Precise targeting and platform-native creative, measured on qualified enquiries rather than engagement.",
        },
      },
      {
        slug: "email-marketing",
        name: "Email Marketing",
        blurb:
          "Turning your existing database into repeat business and referrals instead of a dormant list.",
        h1: "Turn your existing database into revenue",
        intro:
          "Most businesses sit on a list of past customers and old enquiries doing nothing. Email is the cheapest revenue you own — when the segmentation, timing and content are right.",
        points: [
          "Segmented campaigns based on customer behaviour and stage",
          "Automated sequences for onboarding, nurture and win-back",
          "Revenue attributed directly to email",
        ],
        cta: "secondary",
        seo: {
          title: "Email Marketing Services — KeshavCo",
          description:
            "Turn your existing database into repeat revenue through segmented campaigns and automated sequences.",
        },
      },
      {
        slug: "whatsapp-marketing",
        name: "WhatsApp Marketing",
        blurb:
          "Reaching customers where Indian buyers actually respond, with permission-based campaigns and structured follow-up.",
        h1: "Reach customers where Indian buyers respond",
        intro:
          "WhatsApp gets read. Used properly — permission-based, well-timed and genuinely useful — it outperforms most channels for follow-up, offers and service communication.",
        points: [
          "Compliant, permission-based campaigns on the official API",
          "Automated follow-up and enquiry handling",
          "Higher response rates than email or SMS, tracked properly",
        ],
        cta: "secondary",
        seo: {
          title: "WhatsApp Marketing Services — KeshavCo",
          description:
            "Compliant, permission-based WhatsApp campaigns on the official API, with response rates email cannot match.",
        },
      },
      {
        slug: "lead-generation",
        name: "Lead Generation",
        blurb: "End-to-end campaigns designed around qualified enquiries, not traffic.",
        h1: "Campaigns built around qualified enquiries",
        intro:
          "Traffic is not the objective. We build end-to-end lead generation — targeting, creative, landing page, capture, qualification and follow-up — designed around enquiries your sales team can actually work.",
        points: [
          "Complete funnels, not isolated campaigns",
          "Lead qualification built in, so sales time is not wasted",
          "Clear cost per qualified lead by channel",
        ],
        cta: "primary",
        seo: {
          title: "Lead Generation Services — KeshavCo",
          description:
            "Complete funnels built around qualified enquiries — targeting, creative, landing page, capture and follow-up.",
        },
      },
      {
        slug: "content-marketing",
        name: "Content Marketing",
        blurb:
          "Content that answers what your buyers are researching and builds authority in your category.",
        h1: "Answer what your buyers are researching",
        intro:
          "Before buyers enquire, they research. Content marketing puts your business into that research — answering real questions, building authority and creating the trust that makes the sales conversation easier.",
        points: [
          "Content planned around actual buyer questions and search demand",
          "Authority that supports SEO, sales and reputation together",
          "A publishing rhythm that is sustainable, not a one-off push",
        ],
        cta: "secondary",
        seo: {
          title: "Content Marketing Services — KeshavCo",
          description:
            "Content planned around real buyer questions and search demand, building authority that supports SEO and sales.",
        },
      },
      {
        slug: "social-media",
        name: "Social Media",
        blurb:
          "A consistent, credible presence that supports sales conversations instead of chasing engagement.",
        h1: "A presence that supports your sales conversations",
        intro:
          "Your social profiles are checked before meetings, before tenders and before purchases. We build a consistent, credible presence that reflects the business you are — rather than chasing engagement for its own sake.",
        points: [
          "A content approach built around your buyer, not trends",
          "Consistent publishing across the platforms that matter to you",
          "Profiles that strengthen credibility when someone checks",
        ],
        cta: "secondary",
        seo: {
          title: "Social Media Marketing — KeshavCo",
          description:
            "A consistent, credible presence that strengthens sales conversations instead of chasing engagement.",
        },
      },
    ],
  },
];

/** Capabilities we offer inside engagements but do not sell as standalone pillar pages. */
export const supportingCapabilities = [
  {
    name: "Fractional Growth Partner",
    body: "Senior marketing leadership on your team, without a full-time hire.",
    href: "/services/strategy/fractional-growth-partner",
  },
  {
    name: "Vendor Management",
    body: "We manage the specialists so you stop chasing them.",
    href: "/contact",
  },
  {
    name: "Growth Audits",
    body: "A structured read of where your growth is leaking, and what to fix first.",
    href: "/services/strategy/business-consulting",
  },
] as const;

export const getPillar = (slug: string) => pillars.find((p) => p.slug === slug);

export const getSubService = (pillarSlug: string, serviceSlug: string) => {
  const pillar = getPillar(pillarSlug);
  if (!pillar) return undefined;
  const service = pillar.subServices.find((s) => s.slug === serviceSlug);
  return service ? { pillar, service } : undefined;
};

export const allServicePaths = pillars.flatMap((pillar) =>
  pillar.subServices.map((service) => ({ pillar: pillar.slug, service: service.slug })),
);
