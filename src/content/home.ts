/**
 * Home page copy.
 *
 * Two sections ship switched off, per the copy document's own guidance:
 *  - `showTestimonials` — never publish invented quotes. Flip on once real,
 *    permissioned quotes replace the placeholders in `testimonials`.
 *  - `placeholderCounters` — the "[X]+ projects delivered" style counters.
 *    Replace the values with defensible figures, then swap them into
 *    `proofCounters` below.
 */

export const showTestimonials = false;

export const hero = {
  eyebrow: "KeshavCo — Business Growth Partner",
  headingPrefix: "We help businesses solve",
  rotatingWords: [
    "growth problems",
    "market entry",
    "lead generation",
    "brand positioning",
    "scale challenges",
  ],
  /** Shown in the hero. Kept to two sentences — the full version is below. */
  subheading:
    "Most businesses do not have a marketing problem. They have a coordination problem — and one partner who owns the strategy, runs the execution and reports on the result.",
  /** The complete positioning paragraph, used where there is room for it. */
  subheadingFull:
    "Most businesses do not have a marketing problem. They have a coordination problem — a branding agency here, a web developer there, an ads freelancer somewhere else, and nobody accountable for the outcome. KeshavCo replaces that with one partner who owns the strategy, runs the execution and reports on the result.",
  quote: "An external growth department — not another vendor.",
};

export const industryStrip = {
  heading:
    "Trusted by businesses across manufacturing, healthcare, education, real estate and retail.",
  items: [
    "Manufacturing",
    "Healthcare",
    "Education",
    "Real Estate",
    "D2C",
    "Retail",
    "Professional Services",
  ],
};

export const whoWeAre = {
  eyebrow: "Who we are",
  heading: "Built to think like owners, not vendors",
  body: [
    "KeshavCo is a business growth partner. We work with companies that have a real business to run and no appetite for managing five agencies to get one outcome.",
    "We start with the business problem — margin, market share, sales cycle, capacity, positioning — and then decide what marketing, technology or brand work is actually required. Sometimes the answer is a campaign. Sometimes it is a pricing change, a better sales process, or a website that finally does its job. We tell you which.",
    "Everything we recommend, we can execute. Everything we execute, we measure.",
  ],
  principles: [
    {
      title: "Clarity before creativity",
      body: "Good work starts with a clear diagnosis. We would rather spend the first two weeks understanding your business than the first two weeks designing.",
    },
    {
      title: "Owned outcomes, not delivered tasks",
      body: "A campaign that runs is not a result. We agree on the number that matters before we start, and we report against it every month.",
    },
  ],
};

export const whyKeshavCo = {
  eyebrow: "Why KeshavCo",
  headingPrefix: "One partner.",
  headingAccent: "Strategy to execution.",
  body: "Businesses lose more growth to fragmentation than to budget. When six specialists each own a piece, nobody owns the result — and the founder becomes the project manager. We consolidate that. One strategy, one team, one point of accountability.",
  cards: [
    {
      title: "Business-first thinking",
      body: "We diagnose the business before we prescribe the marketing. If the fix is not a campaign, we will say so.",
    },
    {
      title: "Every channel under one plan",
      body: "Your website, your ads, your content and your sales material should be making the same argument to the same buyer. With one partner, they do.",
    },
    {
      title: "Leadership-level consulting, execution-level delivery",
      body: "You get senior thinking on the strategy and a coordinated specialist network doing the work — without hiring either.",
    },
  ],
};

export const capabilityBand = {
  eyebrow: "What you get",
  heading: "An external growth department",
  body: [
    "Hiring a full in-house growth team — strategist, brand lead, marketer, developer, media buyer, analyst — is expensive and slow. Working with six vendors is cheap and chaotic. KeshavCo is the third option: a senior growth team you engage when you need it, that already knows how to work together.",
    "We plan the roadmap, choose the channels, coordinate the specialists, manage the vendors and report on what it produced.",
  ],
};

/**
 * Structural facts about the engagement — not performance claims.
 * Swap for `placeholderCounters` once real figures are agreed.
 */
export const proofCounters = [
  { value: 4, suffix: "", label: "Capabilities planned as one system" },
  { value: 26, suffix: "", label: "Specialist services available to you" },
  { value: 7, suffix: "", label: "Industries we know the buying process in" },
  { value: 1, suffix: "", label: "Point of accountability for the outcome" },
];

/** Replace the values, then use this list instead of `proofCounters`. */
export const placeholderCounters = [
  { value: 0, suffix: "+", label: "Businesses advised" },
  { value: 0, suffix: "+", label: "Campaigns executed" },
  { value: 7, suffix: "", label: "Industries served" },
  { value: 0, suffix: "", label: "Cities covered" },
];

export const servicesSection = {
  eyebrow: "What we do",
  headingPrefix: "Four capabilities.",
  headingAccent: "One growth plan.",
  body: "We do not sell services in isolation. Every capability below exists because businesses need it to solve a specific growth problem — and because it works better when it is planned alongside the others.",
};

export const processSection = {
  eyebrow: "How we work",
  heading: "From growth problem to measurable result",
  body: "Our process is deliberately unglamorous. Understand the business, agree the plan, execute it properly, measure it honestly, and improve it every quarter.",
  steps: [
    {
      number: "01",
      title: "Discover",
      body: "We study your business, your market and your numbers before we recommend anything. Where demand actually comes from, what competitors are doing, and where growth is leaking.",
    },
    {
      number: "02",
      title: "Create Strategy",
      body: "You get a written growth roadmap: the priorities, the channels, the budget split, the sequence and the targets — reviewed with you before a rupee is spent.",
    },
    {
      number: "03",
      title: "Execute and Measure",
      body: "We coordinate the specialists, run the campaigns and deliver the projects — then report against the numbers we agreed, and adjust what is not working.",
    },
  ],
};

export const midCta = {
  heading: "Ready to fix the growth problem you have been postponing?",
};

export const whyPartner = {
  heading: "Why businesses partner with KeshavCo",
  body: "We are not the cheapest option and we are not trying to be. We are the option that removes coordination from your desk and puts accountability in one place.",
  cards: [
    {
      title: "Transparent execution",
      body: "You see the plan, the spend, the work and the results. No black boxes, no invented metrics, no reporting theatre.",
    },
    {
      title: "One team, one point of contact",
      body: "You brief one team. We manage the specialists behind it. You never coordinate a vendor, chase a deliverable or explain your business twice.",
    },
    {
      title: "Outcome-focused",
      body: "We agree the number that matters before we start — enquiries, cost per lead, sales cycle, market entry — and we are measured against it.",
    },
  ],
  support: {
    heading: "Talk to someone senior",
    body: "Every enquiry is read by a senior member of our team, not a form-filling assistant. Tell us the problem and we will tell you whether we are the right partner for it.",
  },
};

export const testimonials = {
  eyebrow: "Client perspective",
  heading: "What our clients say",
  body: "We are collecting these properly, with permission and real numbers, rather than publishing anonymous praise.",
  items: [
    {
      quote:
        "[Client quote about the value of working with one partner instead of several vendors.]",
      name: "[Name]",
      role: "[Designation], [Company]",
      industry: "[Industry]",
    },
    {
      quote:
        "[Client quote about a specific, measurable outcome — enquiries, cost per lead, market entry.]",
      name: "[Name]",
      role: "[Designation], [Company]",
      industry: "[Industry]",
    },
    {
      quote: "[Client quote about the quality of strategic thinking, not just execution.]",
      name: "[Name]",
      role: "[Designation], [Company]",
      industry: "[Industry]",
    },
  ],
};

export const advantageBand = {
  heading: "The KeshavCo advantage",
  body: "One strategic partner across strategy, brand, technology and digital marketing — with the seniority to advise and the network to execute.",
  points: [
    "Growth plans built on your business numbers, not channel trends",
    "Every channel planned as one campaign, not separate budgets",
    "A trusted specialist network, managed by us and invisible to you",
    "Monthly reviews with leadership, against agreed targets",
  ],
};

export const faqSection = {
  eyebrow: "FAQs",
  heading: "Questions businesses ask us first",
  body: "If yours is not here, ask it directly.",
};
