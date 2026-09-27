export const aboutPage = {
  eyebrow: "Our story",
  h1: "We exist because growth got fragmented",
  intro: [
    "Somewhere along the way, growing a business turned into managing suppliers. A branding agency for the identity. A developer for the website. An SEO consultant. A media buyer. Six relationships, six invoices, six versions of your brand — and one founder holding it together in the gaps.",
    "KeshavCo was built to end that. We are a business growth partner: one team that sets the strategy, runs the execution and answers for the outcome.",
  ],
  whyWeExist: {
    heading: "Why we exist",
    body: [
      "Most businesses do not fail at growth because of a bad campaign. They fail because nobody owns growth as a whole.",
      "Marketing runs without a business strategy behind it. Sales does not know what the campaign promised. The website was built two years ago by someone who has stopped replying. Each piece looks reasonable. Together they do not add up to a plan.",
      "We take that whole picture as our responsibility. We look at the business first — what it sells, to whom, at what margin, through which channel — and then we build the growth system around it. Brand, technology and marketing become instruments of one plan rather than separate projects.",
      "That is the difference between hiring an agency and appointing a growth partner.",
    ],
  },
  missionVision: [
    {
      label: "Mission",
      body: "To give ambitious businesses a single, accountable partner for growth — combining business strategy, brand, technology and marketing under one plan and one team.",
    },
    {
      label: "Vision",
      body: "To become the growth department that India's most ambitious businesses rely on, from their first market to their tenth.",
    },
  ],
  values: [
    {
      title: "Business first",
      body: "We are advisors before we are marketers. If the growth problem is not a marketing problem, we will tell you — even when that means less work for us.",
    },
    {
      title: "Transparency",
      body: "You see the strategy, the spend, the work and the numbers. Every month, without asking.",
    },
    {
      title: "Execution",
      body: "Strategy without delivery is a document. We are judged on what actually shipped and what it produced.",
    },
    {
      title: "Partnership",
      body: "We are built for multi-year relationships. That only works if we make you money, so we behave accordingly.",
    },
  ],
  howWeWork: {
    heading: "How we are structured",
    body: [
      "KeshavCo operates as a core strategy and delivery team supported by a vetted specialist network. Your growth plan, priorities and reporting sit with our core team — the people who know your business. The specialised execution — production, media buying, development and content — is delivered by specialists we have worked with, selected for the specific job.",
      "You brief one team. We manage the rest. You never coordinate a vendor, chase a deliverable or explain your business twice.",
    ],
  },
  network: {
    heading: "Our network",
    body: [
      "Growth in India is not executed from one office. A product launch might need a design studio in one city, a development team in another, and a content and production partner for the campaign — all inside the same six weeks.",
      "Over the years we have built a network of specialists across creative, media, technology and production. We select from it per project, manage it end to end, and hold it to our standards. You get access to specialist depth with the simplicity of a single partner and a single point of accountability.",
    ],
  },
  cta: {
    heading: "Let's talk about your growth problem",
    body: "Bring us the thing that is not working — the enquiries that dried up, the market you cannot crack, the brand that no longer reflects the business. We will tell you what we would do.",
  },
  seo: {
    title: "About KeshavCo — Your External Growth Department",
    description:
      "KeshavCo is a business growth partner, not an agency. One team for strategy, brand, technology and marketing. Learn why we exist and how we work.",
  },
};

export const servicesHub = {
  eyebrow: "What we do",
  h1: "Services built around growth outcomes",
  intro:
    "Every capability we offer exists to solve a specific growth problem — being invisible in your market, losing leads you already paid for, entering a city where nobody knows your name, or looking smaller than you are. Choose a capability below, or start with the problem and let us recommend the plan.",
  positioning: {
    eyebrow: "How we are different",
    headingPrefix: "Capabilities that are",
    headingAccent: "planned together",
    body: "Anyone can sell you SEO. Very few can tell you whether SEO is the right thing for your business this quarter, how it should work alongside your sales team, and what to stop doing to fund it. That judgement is the service. The execution follows from it.",
    cards: [
      {
        title: "One strategy behind every channel",
        body: "Your website, your ads, your content and your sales material should be making the same argument to the same buyer. When one team plans all of it, they do.",
      },
      {
        title: "Senior thinking, coordinated delivery",
        body: "Strategy is set by people who have run growth for businesses. Execution is delivered by specialists we manage. You engage one team either way.",
      },
    ],
  },
  notSure: {
    heading: "Not sure which service you need?",
    body: [
      'Most businesses that call us do not open with a service — they open with a problem. "Enquiries have dropped." "We are entering Pune." "We look smaller than our competitors." That is the right way to start the conversation.',
      "Tell us the problem. We will tell you what actually needs to happen, in what order, and what it will take.",
    ],
  },
  seo: {
    title: "Business Growth Services — KeshavCo",
    description:
      "Strategy, branding, technology and digital marketing — planned together as one growth system. Explore our services.",
  },
};

/* v3 /about (docs/REDESIGN-V3.md §9.4): labels and short lines. */
export const aboutV3 = {
  tag: "OUR STORY",
  short: "One team that sets the strategy, runs the execution and answers for the outcome.",
  overview: "// WHERE WE STARTED",
  processLink: { label: "How we work", href: "/process" },
  why: { tag: "WHY WE EXIST" },
  mission: { tag: "MISSION AND VISION" },
  values: { tag: "PRINCIPLES", title: "What we hold ourselves to." },
  structure: { tag: "HOW WE WORK", title: "One core team, a vetted network." },
  /** Structural facts (counted from the content), not performance claims. */
  stats: [
    { value: 4, label: "CAPABILITIES UNDER ONE PLAN" },
    { value: 26, label: "SPECIALIST SERVICES" },
    { value: 7, label: "INDUSTRIES WE WORK IN" },
  ],
  /**
   * Founders block (brief §9.4): real names, roles and photos only. Empty
   * until supplied, so the block does not render (brief §15, item 2).
   */
  founders: {
    tag: "FOUNDERS",
    title: "The people accountable for your growth.",
    people: [] as { name: string; role: string; initials: string; photo?: string }[],
  },
  compare: { tag: "WHY KESHAVCO", title: "What changes with one partner." },
  cta: { tag: "START HERE" },
} as const;
