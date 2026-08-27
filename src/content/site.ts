export const site = {
  name: "KeshavCo",
  legalName: "Keshav Consultancy Pvt. Ltd.",
  domain: "keshavco.com",
  url: "https://keshavco.com",
  email: "hello@keshavco.com",
  // Pre-launch placeholders — see README checklist.
  phone: "[Phone number]",
  addressLines: ["[Address line 1]", "[City, State, PIN]"],
  workingHours: "[Monday – Saturday, 10:00 am – 7:00 pm IST]",
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

export const cta = {
  primary: { label: "Book a Growth Consultation", href: "/contact" },
  secondary: { label: "Talk to an Expert", href: "/contact" },
  tertiary: { label: "Request Proposal", href: "/contact?intent=proposal" },
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
