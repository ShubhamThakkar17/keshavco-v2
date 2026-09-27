export const insightsPage = {
  eyebrow: "Insights",
  h1: "Thinking worth your time",
  intro:
    "Practical writing on growth, marketing and business building for Indian businesses. No trend commentary.",
  /**
   * The publishing schedule. These are titles, not published articles — there
   * are no links because there is nothing to link to yet. Replace this list
   * with real posts as they go live.
   */
  plannedHeading: "What we are writing next",
  // These five titles are now draft entries in src/content/insights (edit
  // them in the /keystatic editor); the list below is kept as approved copy.
  planned: [
    {
      title: "Why hiring five vendors costs more than one growth partner",
      topic: "Growth operations",
    },
    {
      title: "What manufacturing companies get wrong about digital enquiries",
      topic: "Manufacturing",
    },
    {
      title: "How to plan a channel mix you can actually defend",
      topic: "Marketing strategy",
    },
    {
      title: "The five numbers every business owner should see monthly",
      topic: "Measurement",
    },
    {
      title: "When to hire a marketing head, and when to hire a growth partner",
      topic: "Leadership",
    },
  ],
  teaser: {
    eyebrow: "Insights",
    heading: "Thinking worth your time",
    body: "Practical writing on growth, marketing and business building for Indian businesses. No trend commentary.",
    button: "Read our Insights",
  },
  seo: {
    title: "Insights on Business Growth — KeshavCo",
    description:
      "Practical writing on growth, marketing, brand and business building for Indian businesses. No trend commentary.",
  },
};

export const contactPage = {
  eyebrow: "Contact",
  h1: "Let's talk about your growth problem",
  intro:
    "The most useful conversations start with a specific problem — enquiries that have dried up, a market you cannot break into, a brand that no longer matches the business, or growth that has become too complex to manage alone. Bring us that, and we will tell you what we would do about it.",
  consultation: {
    heading: "What a growth consultation involves",
    body: [
      "A 30-minute conversation. We will ask about your business, your market and what has already been tried. You will get our honest read on where the growth problem actually sits and what we would prioritise.",
      "There is no cost, no deck and no obligation. If we are not the right partner for your situation, we will say so and point you in a better direction.",
    ],
  },
  notes: [
    {
      title: "For proposals",
      body: 'If you already know what you need, choose "Request Proposal" in the enquiry form and include the scope. We will come back with a written proposal.',
    },
    {
      title: "For partnerships and vendors",
      body: 'Write to us with "Partnership" in the subject line.',
    },
    {
      title: "For careers",
      body: "Write to us at hello@keshavco.com with your interest in joining.",
    },
  ],
  seo: {
    title: "Contact KeshavCo — Book a Growth Consultation",
    description:
      "Tell us your growth problem. A 30-minute consultation, no obligation, with an honest read on what your business should do next.",
  },
};

/** Reusable CTA bands, keyed as in §12 of the copy document. */
export const ctaBands = {
  general: {
    heading: "Ready to solve your growth problem?",
    body: "One conversation is usually enough to know whether we can help. Thirty minutes, no obligation.",
    button: "primary" as const,
  },
  service: {
    heading: "Not sure if this is what your business needs?",
    body: "Tell us the problem instead of the service. We will tell you what actually needs to happen first.",
    button: "secondary" as const,
  },
  packages: {
    heading: "Let's scope the right engagement",
    body: "We will look at your business, recommend the engagement that fits, and send a written proposal.",
    button: "tertiary" as const,
  },
  industries: {
    heading: "We know how growth works in your industry",
    body: "Bring us your specific situation. We will bring what we have learned from working in it.",
    button: "primary" as const,
  },
  footer: {
    heading: "One partner. Strategy to execution.",
    body: "Stop managing vendors. Start building growth.",
    button: "primary" as const,
  },
  insights: {
    heading: "Want this thinking applied to your business?",
    body: "Reading about growth is useful. Having someone accountable for it is better.",
    button: "primary" as const,
  },
};

export const legalPages = {
  "privacy-policy": {
    title: "Privacy Policy",
    intro:
      "This page is a placeholder. The published privacy policy must be reviewed and approved before launch.",
    sections: [
      {
        heading: "What we collect",
        body: "When you submit an enquiry we collect the name, work email, phone number, company, industry and message you provide. We also collect anonymous usage analytics about how this site is used.",
      },
      {
        heading: "How we use it",
        body: "We use your details only to respond to your enquiry and to maintain our record of the conversation. We do not sell or share your details with third parties for their own marketing.",
      },
      {
        heading: "Your choices",
        body: "You can ask us to correct or delete the details we hold about you at any time by writing to us.",
      },
    ],
  },
  "terms-of-use": {
    title: "Terms of Use",
    intro:
      "This page is a placeholder. The published terms must be reviewed and approved before launch.",
    sections: [
      {
        heading: "Use of this site",
        body: "This website and its content are provided for information about our services. You may not reproduce or redistribute the content without written permission.",
      },
      {
        heading: "Enquiries",
        body: "Submitting an enquiry does not create a contractual relationship. Any engagement begins with a written proposal accepted by both parties.",
      },
      {
        heading: "Changes",
        body: "We may update these terms and the content of this site at any time.",
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    intro:
      "This page is a placeholder. The published disclaimer must be reviewed and approved before launch.",
    sections: [
      {
        heading: "No guarantee of outcome",
        body: "Content on this site describes how we work and the outcomes we aim for. It is not a guarantee of any specific commercial result — results depend on the business, the market and the plan agreed with you.",
      },
      {
        heading: "Third-party references",
        body: "Platform, publication and technology names on this site belong to their respective owners and are referenced descriptively.",
      },
    ],
  },
} as const;

export const notFound = {
  heading: "This page has moved or does not exist.",
  body: "The link may be outdated. Start from the homepage, or tell us what you were looking for.",
};

/* ---------------------------------------------------------------------------
   v3 labels and short lines for /contact, /insights, legal pages and the 404
   (docs/REDESIGN-V3.md §9.4). The approved copy above is unchanged.
--------------------------------------------------------------------------- */

export const contactV3 = {
  tag: "CONTACT",
  short: "Bring a specific problem. We will tell you what we would do about it.",
  overview: "// WHERE TO START",
  tabs: { label: "How would you like to reach us?", book: "Book a call", enquiry: "Send an enquiry" },
  /** Phone-only jump links to the card below the contact details. */
  jump: { book: { label: "Book a call", href: "#book" }, enquiry: { label: "Send an enquiry", href: "#enquiry" } },
  direct: { tag: "DIRECT", email: "EMAIL", phone: "PHONE", offices: "OFFICES", follow: "FOLLOW" },
  next: {
    tag: "WHAT HAPPENS NEXT",
    steps: [
      "We reply within one working day.",
      "A 30-minute consultation on your growth problem.",
      "A written proposal, if we are the right partner.",
    ],
  },
  covers: {
    label: "What the call covers",
    items: [
      "Where your growth problem actually sits",
      "What we would prioritise, and in what order",
      "Whether we are the right partner, honestly",
    ],
  },
  phonePrompt: "Prefer to talk now?",
  other: { tag: "OTHER WAYS TO REACH US", title: "Proposals, partners and careers." },
  careersSubject: "Interest in joining KeshavCo",
} as const;

/** Words inside the booking embed while it loads or if it fails. */
export const bookingEmbedCopy = {
  loading: "Loading available times…",
  failedHeading: "The calendar did not load.",
  failedBody: "Open it in a new tab, or use the enquiry form and we will come back with times.",
  openLink: "Open the booking page",
} as const;

/** Extra labels for the v3 enquiry form (fields themselves: `contactForm`). */
export const contactFormV3 = {
  intentLabel: "Type of enquiry",
  intents: [
    { value: "enquiry", label: "General enquiry" },
    { value: "proposal", label: "Request proposal" },
  ],
  packageLabel: "Package (optional)",
  packagePlaceholder: "Not sure yet",
  industryLabel: "Industry",
  industryPlaceholder: "Select your industry",
  interestLabel: "What do you need help with?",
  interestPlaceholder: "Select an area",
  sending: "Sending…",
  failed: "Something went wrong sending that. Please email",
  /** Hidden anti-spam field; people never see or fill it. */
  honeypotLabel: "Leave this field empty",
} as const;

export const insightsV3 = {
  tag: "INSIGHTS",
  planned: {
    tag: "EDITORIAL PLAN",
    line: "Nothing is linked yet because nothing is published yet. Subscribers get the first piece first.",
    /** Used once at least one article is published. */
    lineOnceLive: "Pieces in progress. Subscribers get each one before it reaches this page.",
    status: "DRAFTING",
  },
  latest: { tag: "LATEST", title: "Latest thinking." },
  article: {
    minRead: "MIN READ",
    by: "BY",
    contents: "On this page",
    more: { tag: "KEEP READING", title: "More insights." },
    all: { label: "All insights", href: "/insights" },
  },
  subscribe: {
    tag: "NEWSLETTER",
    emailLabel: "Work email",
    error: "Please enter a valid work email.",
    failed: "That did not go through. Please try again, or email",
    sending: "Subscribing…",
  },
} as const;

export const legalV3 = {
  tag: "LEGAL",
  crumb: "Legal",
  questions: "Questions about this page? Write to",
} as const;

export const notFoundV3 = {
  tag: "404",
  home: { label: "Back to homepage", href: "/" },
  contact: { label: "Tell us what you were looking for", href: "/contact" },
  startHere: "Or start here",
  packages: { label: "Growth Packages", href: "/growth-packages" },
} as const;

/** Mono breadcrumb: the label for the first crumb on every inner page. */
export const breadcrumbV3 = { home: "Home", label: "Breadcrumb" } as const;

/** The /keystatic editor's own page (only seen by the team). */
export const cmsAdmin = {
  title: "KeshavCo editor",
  tag: "EDITOR",
  notConnected: {
    heading: "The editor is not connected yet.",
    body: "Connect the GitHub App described in docs/cms/README.md, then redeploy. Articles and case studies can be edited here after that.",
  },
} as const;
