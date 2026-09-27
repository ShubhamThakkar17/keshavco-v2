export const site = {
  name: "KeshavCo",
  legalName: "Keshav Consultancy Pvt. Ltd.",
  domain: "keshavco.com",
  url: "https://keshavco.com",
  email: "hello@keshavco.com",
  phone: "+91 70411 92168",
  phoneHref: "tel:+917041192168",
  // Pre-launch placeholder. Not shown on the site (decision log #19).
  workingHours: "[Monday – Saturday, 10:00 am – 7:00 pm IST]",
  /** Offices (decision log #20): footer, /contact and Organization JSON-LD. */
  offices: [
    { city: "Vadodara", region: "Gujarat" },
    { city: "Mumbai", region: "Maharashtra" },
    { city: "Indore", region: "Madhya Pradesh" },
  ],
  tagline: "One partner. Strategy to execution.",
  description:
    "KeshavCo is the business growth partner for companies that would rather build one relationship than manage six vendors. Strategy, branding, technology, marketing and execution under one team.",
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
} as const;

/** Cal.com booking. Change the event here and every CTA follows. */
export const booking = {
  namespace: "discovery",
  calLink: "hello-kc/discovery",
  directUrl: "https://cal.com/hello-kc/discovery",
  heading: "Pick a time that suits you",
  body: "A 30-minute growth consultation. No cost, no deck, no obligation — bring the problem and you will leave with a point of view.",
} as const;

export const cta = {
  primary: { label: "Book a Growth Consultation", short: "Book a consultation", href: "/contact#book" },
  secondary: { label: "Talk to an Expert", short: "Send an enquiry", href: "/contact" },
  tertiary: { label: "Request Proposal", short: "Request proposal", href: "/contact?intent=proposal" },
} as const;

export const ctaSupportLines = [
  "A 30-minute call. No pitch deck, no obligation.",
  "We will tell you what we would do before you hire us.",
  "Bring your growth problem. Leave with a point of view.",
] as const;

export type NavItem = { label: string; href: string; hasMegaMenu?: boolean };

export const nav: NavItem[] = [
  { label: "Services", href: "/services", hasMegaMenu: true },
  { label: "Growth Packages", href: "/growth-packages" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

/**
 * v3 navigation (decision log #6): the four service pillars sit directly in
 * the bar (their sub-services open in a horizontal strip, generated from
 * `pillars`), followed by these links. Insights and Careers live in the
 * footer and the mobile menu.
 */
export const navV3 = {
  links: [
    { label: "Packages", href: "/growth-packages" },
    { label: "Industries", href: "/industries" },
    { label: "About", href: "/about" },
  ],
  mobileExtras: [
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  allServices: "All services",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  primaryLabel: "Primary",
  servicesLabel: "services",
} as const;

export const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Strategy", href: "/services/strategy" },
      { label: "Branding", href: "/services/branding" },
      { label: "Technology", href: "/services/technology" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Growth Packages", href: "/growth-packages" },
      { label: "Industries", href: "/industries" },
      { label: "Process", href: "/process" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const footer = {
  eyebrow: "Hello. We are listening",
  headingPrefix: "Let's talk about",
  rotatingWords: ["your growth problem", "your next market", "your business plan"],
  legalLine: `© ${new Date().getFullYear()} ${site.legalName} All rights reserved.`,
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
} as const;

/** v3 footer: the merged closing CTA (decision log #3) and compact links. */
export const footerV3 = {
  tag: "CONTACT",
  headingPrefix: footer.headingPrefix,
  rotatingWords: footer.rotatingWords,
  /** Carried over from the retired mid-page CTA band ("Ready to solve…"). */
  line: "One conversation is usually enough to know whether we can help. Thirty minutes, no obligation.",
  columns: [
    { title: "Services", links: footerColumns[0].links },
    { title: "Company", links: footerColumns[1].links },
    { title: "Legal", links: footer.legalLinks },
  ],
  legalLine: `© ${new Date().getFullYear()} ${site.legalName.toUpperCase()}`,
  wordmark: site.name,
  navLabel: "Footer",
} as const;

export const contactForm = {
  heading: "Send us an enquiry",
  body: "Tell us where your business is today and where you want it to be. We respond to every enquiry within one working day.",
  fields: [
    { name: "name", label: "Your name", placeholder: "Full name", type: "text", required: true },
    { name: "email", label: "Work email", placeholder: "name@company.com", type: "email", required: true },
    { name: "phone", label: "Phone", placeholder: "+91", type: "tel", required: false },
    { name: "company", label: "Company", placeholder: "Company name", type: "text", required: false },
  ],
  industries: [
    "Manufacturing",
    "Healthcare",
    "Education",
    "Real Estate",
    "D2C",
    "Retail",
    "Professional Services",
    "Other",
  ],
  interests: [
    "Growth strategy",
    "Branding",
    "Website or technology",
    "Digital marketing",
    "Not sure yet — help me decide",
  ],
  messageLabel: "Tell us about your business",
  messagePlaceholder: "Where you are today, and where you want to be",
  submitLabel: "Send Enquiry",
  consent: "We use your details only to respond to this enquiry. We do not share them.",
  success: {
    heading: "Thank you. We have your enquiry.",
    body: `A member of our team will respond within one working day. If it is urgent, write to ${site.email}.`,
  },
  error: `That did not go through. Please check the highlighted fields and try again, or email ${site.email}.`,
  requiredError: "This field is required.",
  emailError: "Please enter a valid email address.",
} as const;

export const newsletter = {
  heading: "Insights, once a month.",
  body: "Practical thinking on growth, marketing and business building. No promotions.",
  placeholder: "Work email",
  button: "Subscribe",
  success: "You are subscribed. Look for us in your inbox next month.",
} as const;

/** Footer switch that turns decorative motion off site-wide (brief §6.6). */
export const motionToggle = { label: "Motion", on: "On", off: "Off" } as const;
