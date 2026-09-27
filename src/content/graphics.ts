/**
 * Words that appear inside the v3 diagrams and illustrations, plus the one
 * sentence each meaningful diagram gives to screen readers (brief §11).
 * Labels are mono uppercase by design; keep them to four words or fewer.
 */

export const heroEngine = {
  inputs: ["BRAND", "WEBSITE", "SEO", "ADS", "SOCIAL", "CRM", "CONTENT"],
  outputs: ["ENQUIRIES", "PIPELINE", "MONTHLY REPORT"],
  notes: ["// COORDINATED", "// MEASURED"],
  description:
    "Diagram: brand, website, SEO, ads, social, CRM and content all feed one KeshavCo hub, which turns them into enquiries, pipeline and a monthly report.",
} as const;

export const coordinationStory = {
  you: "YOU",
  hub: "KESHAVCO",
  vendors: [
    "BRANDING AGENCY",
    "WEB DEVELOPER",
    "ADS FREELANCER",
    "SEO VENDOR",
    "SOCIAL AGENCY",
    "PRINTER",
  ],
  before:
    "Before: six separate vendors each connect to you and to each other in a tangle, and nobody owns the result.",
  after:
    "After: the same six specialists route through one KeshavCo hub, with one clean line of accountability to you.",
} as const;

export const capabilityArt = {
  strategy: { planes: ["NOW", "PLAN", "TARGET"] },
  branding: { type: "Aa" },
} as const;

export const channelHub = {
  channels: [
    "GOOGLE",
    "META",
    "INSTAGRAM",
    "LINKEDIN",
    "WHATSAPP",
    "YOUTUBE",
    "EMAIL",
    "SEO",
    "CRM",
    "WEBSITE",
  ],
  description:
    "Diagram: every channel, from Google and Meta to email, CRM and the website, feeds one KeshavCo hub that plans and measures them together.",
} as const;

export const notFoundArt = { code: "404" } as const;

/** /careers hero: the core team and the specialist network around it. */
export const networkArt = {
  core: "CORE TEAM",
  nodes: ["STRATEGY", "BRAND", "TECHNOLOGY", "MEDIA", "CONTENT", "PRODUCTION"],
} as const;
