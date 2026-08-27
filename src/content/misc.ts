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
      body: 'We are always interested in senior people across strategy, brand, technology and media. Write to us with "Careers" in the subject line.',
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
