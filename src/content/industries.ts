export const industriesPage = {
  eyebrow: "Industries",
  h1: "Growth looks different in every industry",
  intro:
    "A manufacturing company selling to distributors and a D2C brand selling to consumers do not have the same growth problem, and they should not receive the same plan. We work across seven industries where we understand the buying process, the sales cycle and the channels that actually work.",
  alsoWorkingWith: {
    heading: "Also working with",
    items: ["Startups", "Hospitality", "SaaS companies", "Founders launching new ventures"],
    note: "If your industry is not listed, the process is the same — we start with your business and its buying journey, not a template.",
  },
  seo: {
    title: "Industries We Serve — KeshavCo",
    description:
      "Growth partnership for manufacturing, healthcare, education, real estate, D2C, retail and professional services businesses.",
  },
};

export type Industry = {
  slug: string;
  name: string;
  /** One line for cards and rails — written, not truncated from `problem`. */
  tagline: string;
  problem: string;
  help: string;
  typicalWork: string[];
};

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    tagline: "Long sales cycles, technical buyers, and no presence where they research.",
    name: "Manufacturing",
    problem:
      "Long sales cycles, technical buyers, dealer and distributor networks, and a digital presence that has not kept pace with the scale of the business. Buyers research online and buy offline — and most manufacturers are invisible in the research stage.",
    help: "We build the credibility layer manufacturers are usually missing — a website and company profile that hold up in procurement, and search visibility for the products and applications buyers look for. Where the sales cycle is long, we build the CRM and follow-up structure to survive it.",
    typicalWork: [
      "Company profile",
      "Website and product catalogue",
      "SEO for technical search terms",
      "Dealer and sales collateral",
      "CRM and lead tracking",
      "Lead generation campaigns",
    ],
  },
  {
    slug: "healthcare",
    tagline: "Trust is the entire purchase decision, and regulation limits the claims.",
    name: "Healthcare",
    problem:
      "Trust is the entire purchase decision, regulations limit what you can claim, and patients or partners choose based on credibility they can verify. Reputation and reach must grow together, carefully.",
    help: "We build visibility that respects the sensitivity of the category — a professional digital presence, local search visibility where patients look first, and content that informs rather than sells and establishes the expertise behind the institution.",
    typicalWork: [
      "Brand identity",
      "Website and appointment systems",
      "Local SEO",
      "Content and patient education",
      "Google Ads for local intent",
      "CRM and enquiry follow-up",
    ],
  },
  {
    slug: "education",
    tagline: "Admissions run on a calendar, and the decision-maker is rarely the student.",
    name: "Education",
    problem:
      "Admissions run on a calendar, the decision-maker is often not the student, and every institution in the market is making the same claims in the same window.",
    help: "We build admissions campaigns around the actual decision journey — parent and student — combining digital demand capture with content that answers what families are really weighing up. Every enquiry is tracked from first click to counselling.",
    typicalWork: [
      "Brand positioning",
      "Admissions campaigns",
      "Lead generation and CRM",
      "Content and student communication",
      "Local and paid search",
      "Social media for parents and students",
    ],
  },
  {
    slug: "real-estate",
    tagline: "Lead quality matters more than lead volume, and follow-up decides everything.",
    name: "Real Estate",
    problem:
      "High-value, high-consideration purchases where a single enquiry is worth a great deal — so lead quality matters more than lead volume, and follow-up decides everything.",
    help: "We build campaigns for qualified site visits, not raw enquiry counts. Digital demand capture, project branding, and a CRM that ensures no serious buyer goes unattended.",
    typicalWork: [
      "Project branding",
      "Website and microsites",
      "Performance campaigns",
      "CRM and channel partner management",
      "Creative and sales collateral",
      "WhatsApp follow-up",
    ],
  },
  {
    slug: "d2c",
    tagline: "Growth stalls the moment paid spend stops.",
    name: "D2C",
    problem:
      "Rising acquisition costs, thin differentiation and a business that only works if customers come back. Growth stalls the moment paid spend stops.",
    help: "We work on both sides of the unit economics — packaging and brand that justify the price, ecommerce that converts and encourages repeat purchase, and retention through email and WhatsApp so revenue is not entirely rented from ad platforms.",
    typicalWork: [
      "Brand identity and packaging",
      "Ecommerce",
      "Meta and Google campaigns",
      "Email and WhatsApp retention",
      "Content and creative",
      "Analytics and cohort reporting",
    ],
  },
  {
    slug: "retail",
    tagline: "Footfall depends on local visibility; the last three feet decide the sale.",
    name: "Retail",
    problem:
      "Footfall depends on visibility in a local catchment, and the last three feet inside the store decide the sale. Online presence supports the visit rather than replacing it.",
    help: "We build the local visibility that fills the catchment — local search and maps presence, offer campaigns with a measurable response, WhatsApp and loyalty communication that brings customers back, and a brand system your stores can apply consistently.",
    typicalWork: [
      "Brand identity and store signage system",
      "Local SEO and maps",
      "Offer campaigns",
      "Loyalty and WhatsApp communication",
      "Ecommerce",
      "Store launch campaigns",
    ],
  },
  {
    slug: "professional-services",
    tagline: "You sell expertise buyers cannot evaluate before they buy.",
    name: "Professional Services",
    problem:
      "You sell expertise that buyers cannot evaluate before they buy. The decision is made on credibility, referral and reputation — and most firms have no visible presence to support any of the three.",
    help: "We make the expertise visible. Positioning that separates you from firms making the same claims, content that demonstrates thinking rather than describing services, and a digital presence that holds up when a prospective client checks you before the first meeting.",
    typicalWork: [
      "Brand and positioning",
      "Website and credentials material",
      "Content and thought leadership",
      "SEO for service and location terms",
      "Company profile and pitch material",
      "CRM and enquiry follow-up",
    ],
  },
];
