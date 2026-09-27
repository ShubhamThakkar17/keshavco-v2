/**
 * Our Work (portfolio). Hidden until there is real, permissioned work to
 * show (brief §15, item 10): the page returns 404, stays out of the sitemap
 * and is not linked. Case studies are written in the /keystatic editor
 * ("Our Work") and appear only when marked published.
 *
 * To launch: set `visible` to true and add the link to the navigation. To
 * preview on a Vercel preview deployment before that, set the environment
 * variable OUR_WORK_PREVIEW=1 for Preview only.
 */
export const ourWork = {
  visible: false,
  tag: "OUR WORK",
  h1: "Our work",
  short: "Selected engagements, published with our clients' permission.",
  list: { tag: "CASE STUDIES", title: "Problems we were asked to solve." },
  empty: {
    heading: "The first case studies are being written.",
    body: "We publish work only with the client's permission and with results we can verify.",
  },
  labels: {
    client: "CLIENT",
    industry: "INDUSTRY",
    year: "YEAR",
    services: "CAPABILITIES",
    problem: "THE PROBLEM",
    approach: "WHAT WE DID",
    result: "THE RESULT",
    story: "THE FULL STORY",
    read: "Read the case study",
  },
  all: { label: "All work", href: "/our-work" },
  cta: {
    heading: "Have a similar problem?",
    body: "Tell us where the business is today and where it needs to be.",
  },
  seo: {
    title: "Our Work — KeshavCo",
    description:
      "Selected engagements across strategy, branding, technology and digital marketing, published with our clients' permission.",
  },
} as const;

export const showOurWork = () => ourWork.visible || process.env.OUR_WORK_PREVIEW === "1";
