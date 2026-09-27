export const processPage = {
  eyebrow: "Our process",
  h1: "How we take a business from growth problem to result",
  intro:
    "There is nothing exotic about how we work, and that is deliberate. Understand the business properly, agree a written plan, execute it well, measure it honestly, and improve it every quarter. Most growth failures happen because one of these five stages was skipped.",
  cta: {
    heading: "This process starts with one conversation",
    body: "A 30-minute growth consultation. We will ask about your business, tell you what we see, and be direct about whether we are the right partner for it.",
  },
  seo: {
    title: "Our Process — From Growth Problem to Result",
    description:
      "Discover, strategy, execute, measure, scale. See how KeshavCo takes a business from a growth problem to a measurable result.",
  },
};

export const processStages = [
  {
    number: "01",
    /** v3: `body` as three scannable points for the stage panels. */
    points: [
      "How you make money, who buys and why.",
      "Your sales process, and what happens to every enquiry.",
      "Your market, your competitors and where growth is leaking.",
    ],
    title: "Discover",
    /** v3 one-liner (condensed from \`lead\`) for the home process row. */
    line: "Understand the business first.",
    lead: "We start by understanding your business, not your marketing.",
    body: "We examine how you make money, who actually buys and why, what your sales process looks like, where enquiries currently come from and what happens to them. We analyse your market and the competitors your buyers are comparing you to. Then we identify the gaps — the places where growth is leaking or has never been built.",
    outcome:
      "A clear, evidence-based read of where your growth actually stands — including the things nobody in the business has said out loud.",
  },
  {
    number: "02",
    /** v3: `body` as three scannable points for the stage panels. */
    points: [
      "Priorities and their sequence, with reasoning for every channel.",
      "Budget allocation, targets and a reporting rhythm.",
      "Reviewed with your leadership before anything is executed.",
    ],
    title: "Create Strategy",
    /** v3 one-liner (condensed from \`lead\`) for the home process row. */
    line: "A written plan before a budget.",
    lead: "We give you a written plan before we ask for a budget.",
    body: "The roadmap sets the priorities and their sequence, selects the channels with reasoning behind each one, allocates budget, defines targets and sets the reporting rhythm. Every channel is planned as one campaign. We review it with your leadership and adjust it before anything is executed.",
    outcome: "A growth roadmap your leadership team can approve, question and hold us to.",
  },
  {
    number: "03",
    /** v3: `body` as three scannable points for the stage panels. */
    points: [
      "Specialists coordinated across creative, media and technology.",
      "Campaigns run, projects delivered and vendors kept to the calendar.",
      "One team and one point of contact for you.",
    ],
    title: "Execute",
    /** v3 one-liner (condensed from \`lead\`) for the home process row. */
    line: "We do the work and manage the rest.",
    lead: "We do the work and manage everyone else who does.",
    body: "We coordinate specialists across creative, media and technology. We run the campaigns, deliver the projects, manage the vendors and keep everything moving to the calendar. You brief one team and receive one point of contact — not five status calls.",
    outcome: "Work that actually ships, on schedule, without becoming your project to manage.",
  },
  {
    number: "04",
    /** v3: `body` as three scannable points for the stage panels. */
    points: [
      "Monthly performance against the targets we agreed.",
      "Plain answers on what worked, what did not and what changes.",
      "Continuous optimisation, not an annual review.",
    ],
    title: "Measure",
    /** v3 one-liner (condensed from \`lead\`) for the home process row. */
    line: "Business outcomes, not platform activity.",
    lead: "We report on business outcomes, not platform activity.",
    body: "Every month you receive performance against the targets we agreed — enquiries, cost per lead, conversion, pipeline, market response. We say plainly what worked, what did not and what we are changing. Optimisation is continuous, not an annual review.",
    outcome: "Monthly reporting in business language, with the honest version included.",
  },
  {
    number: "05",
    /** v3: `body` as three scannable points for the stage panels. */
    points: [
      "Expansion into new markets, segments and channels.",
      "Higher efficiency from what already works.",
      "Quarterly planning with your leadership.",
    ],
    title: "Scale",
    /** v3 one-liner (condensed from \`lead\`) for the home process row. */
    line: "Build on what works.",
    lead: "We build on what works and compound it.",
    body: "Once the growth system is producing results, the work shifts to expansion — new markets, new segments, new channels, higher efficiency. Quarterly planning with your leadership keeps the strategy aligned with where the business is going, not where it was.",
    outcome: "A long-term partner whose plan evolves with your business.",
  },
];

/* v3 /process (docs/REDESIGN-V3.md §9.4): labels and short lines. */
export const processV3 = {
  tag: "PROCESS",
  short: "Understand, plan, execute, measure, improve. Most growth failures skip one of these five stages.",
  overview: "// HOW WE WORK",
  track: { tag: "FIVE STAGES", title: "Nothing exotic. Just done properly." },
  outcome: "OUTCOME",
  of: "/",
  cta: { tag: "START HERE" },
} as const;
