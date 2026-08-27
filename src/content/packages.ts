export type GrowthPackage = {
  slug: string;
  name: string;
  audience: string;
  /** Short version used in the home page section. */
  summary: string;
  situation: string;
  whatWeDo: string;
  includes: string[];
  considerIf: string;
};

export const packagesPage = {
  eyebrow: "Growth packages",
  h1Prefix: "Engagements built around",
  h1Accent: "outcomes",
  intro: [
    "We do not sell services by the hour or by the deliverable. We take on a growth outcome and build the plan required to reach it. These four engagements cover the situations we are asked about most — launching, generating demand, entering new markets, and scaling with senior support.",
    "Every engagement is scoped to your business after a growth consultation. That is why there are no prices here: the plan comes first, the proposal follows.",
  ],
  homeEyebrow: "Choose your starting point",
  homeBody:
    "Most businesses do not need everything at once. They need the right thing for their stage. These four engagements map to the four problems we are asked to solve most often — launching, generating demand, entering new markets and scaling with senior support.",
  note: "Every engagement is scoped to your business. Pricing follows the plan, not a price list.",
  howItWorks: [
    {
      q: "Not sure which one fits?",
      a: "Most businesses are not, at first. The growth consultation exists to answer exactly that — we look at your business, tell you what stage you are actually at, and recommend the engagement that fits.",
    },
    {
      q: "Can we combine them?",
      a: "Yes. Many clients start with Launch or Grow and move into Scale as the relationship matures. Engagements are a starting structure, not a boundary.",
    },
    {
      q: "How is pricing decided?",
      a: "After the consultation. We scope the plan first, then price it. You will receive a written proposal with the deliverables, timelines and investment clearly stated before anything begins.",
    },
  ],
  seo: {
    title: "Growth Packages — Launch, Grow, Expand, Scale",
    description:
      "Four engagements built around outcomes, not service lists. Find the right starting point for your business stage.",
  },
};

export const growthPackages: GrowthPackage[] = [
  {
    slug: "launch",
    name: "Launch",
    audience: "For businesses going to market for the first time",
    summary:
      "You have a product, a service or a new venture and no market presence. Launch gives you a credible identity, a working digital front door and a first campaign that puts you in front of real buyers.",
    situation:
      "You have a business, a product or a new venture and no presence in the market. Every first impression is still ahead of you, and the first six months will decide how seriously buyers take you.",
    whatWeDo:
      "We build a complete market-ready foundation — a brand that looks credible, a website that converts, active channels and a launch campaign that puts you in front of real buyers rather than an audience of well-wishers.",
    includes: [
      "Brand identity and logo",
      "Website",
      "Social media setup and launch content",
      "Launch campaign across selected channels",
      "Pitch deck or company profile",
    ],
    considerIf:
      "you are starting a new business, launching a new division or product line, or your existing presence does not reflect the business you are building.",
  },
  {
    slug: "grow",
    name: "Grow",
    audience: "For businesses that need predictable enquiries",
    summary:
      "Referrals have taken you as far as they will. Grow builds a repeatable demand engine: found in search, present where your buyers spend time, with every lead captured and tracked instead of lost.",
    situation:
      "Referrals and existing customers have taken you as far as they will. Growth is now unpredictable, and there is no reliable way to increase enquiries when you need them.",
    whatWeDo:
      "We build a demand engine — visibility in search, presence where your buyers spend time, content that answers their questions, and a CRM that ensures no enquiry is lost. Every source is tracked so you know what produced what.",
    includes: [
      "SEO",
      "Paid advertising (Google and Meta)",
      "Content and creative",
      "CRM setup and lead tracking",
      "Analytics and monthly reporting",
    ],
    considerIf:
      "enquiries are inconsistent, you cannot say which channel produces your customers, or leads arrive but are not converting.",
  },
  {
    slug: "expand",
    name: "Expand",
    audience: "For businesses entering new markets or categories",
    summary:
      "A new city, a new segment, a new product line. Expand combines positioning, digital demand and sales enablement into one coordinated market-entry campaign.",
    situation:
      "A new city, a new segment or a new product line — where nobody knows your name and your existing reputation does not travel with you.",
    whatWeDo:
      "We build the market-entry campaign: positioning built for the new market, digital demand capture where that audience is already searching, a localised digital presence, and sales material that supports the team on the ground.",
    includes: [
      "Market positioning and messaging",
      "Go-to-market and campaign strategy",
      "Digital campaigns for the new market",
      "Localised website or landing pages",
      "Sales support material and enablement",
    ],
    considerIf:
      "you are entering a new geography, launching into a new customer segment, or your existing positioning does not travel to the market you are targeting.",
  },
  {
    slug: "scale",
    name: "Scale",
    audience: "For businesses that need a growth team, not a project",
    summary:
      "An ongoing partnership where we function as your growth department — setting direction, running the calendar, managing specialists and reviewing performance with your leadership every month.",
    situation:
      "Growth now requires ongoing leadership. There is more to coordinate than any one person on your team can hold, and hiring a full growth department is either premature or too slow.",
    whatWeDo:
      "We function as your growth department. We set direction, own the marketing calendar, manage specialists and vendors, advise on technology decisions, and review performance with your leadership every month.",
    includes: [
      "Business consulting",
      "Growth strategy and quarterly planning",
      "Marketing leadership",
      "Vendor and specialist management",
      "Monthly leadership reviews",
      "Technology consulting",
    ],
    considerIf:
      "you are managing multiple agencies, you need senior marketing leadership without a full-time hire, or growth has become too complex to run alongside your day job.",
  },
];
