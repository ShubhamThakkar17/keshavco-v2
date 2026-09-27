/**
 * /careers (decision log #7). Everything here is drawn from what the site
 * already says about how KeshavCo is structured (src/content/about.ts) and the
 * approved careers note on /contact. No openings, team members, perks or
 * salaries are invented: the page takes open applications only.
 */
export const careersPage = {
  tag: "CAREERS",
  h1: "Build growth with us",
  short: "We are always interested in senior people across strategy, brand, technology and media.",
  overview: "// HOW WE ARE STRUCTURED",
  intro:
    "KeshavCo runs as a core strategy and delivery team supported by a vetted specialist network. Both are selected for the specific job, and both are held to the same standard.",
  ways: {
    tag: "TWO WAYS IN",
    title: "Join the core team or the network.",
    items: [
      {
        label: "CORE TEAM",
        title: "Strategy, priorities and reporting",
        body: "The people who know each client's business, set the plan and answer for the outcome.",
      },
      {
        label: "SPECIALIST NETWORK",
        title: "Production, media, development and content",
        body: "Specialists we select per project, manage end to end and hold to our standards.",
      },
    ],
  },
  apply: {
    tag: "OPEN APPLICATION",
    title: "Tell us what you do best.",
    line: "We do not list openings here. Send an open application and we will read it properly.",
  },
  form: {
    fields: {
      name: { label: "Your name", placeholder: "Full name" },
      email: { label: "Email", placeholder: "name@example.com" },
      phone: { label: "Phone", placeholder: "+91" },
      city: { label: "City", placeholder: "Where you are based" },
      link: {
        label: "CV or portfolio link",
        placeholder: "LinkedIn, Google Drive or portfolio URL",
        hint: "A link we can open without signing in.",
      },
      message: { label: "What you do best", placeholder: "Your work, your experience and what you would bring" },
    },
    areaLabel: "Area",
    areaPlaceholder: "Select an area",
    areas: ["Strategy", "Brand and design", "Technology", "Media and performance", "Content and production", "Other"],
    joinLabel: "Interested in",
    joinOptions: ["Core team", "Specialist network", "Either"],
    submit: "Send application",
    sending: "Sending…",
    consent: "We use your details only to consider your application. We do not share them.",
    requiredError: "This field is required.",
    emailError: "Please enter a valid email address.",
    linkError: "Please enter a link that starts with http:// or https://.",
    error: "Please check the highlighted fields and try again.",
    failed: "That did not go through. Please try again, or email",
    success: {
      heading: "Thank you. We have your application.",
      body: "We read every application. If there is a fit, we will be in touch.",
    },
  },
  seo: {
    title: "Careers at KeshavCo — Open Applications",
    description:
      "Work on growth end to end. KeshavCo takes open applications from senior people across strategy, brand, technology and media.",
  },
} as const;
