/**
 * Options the Insights and Our Work editors offer (keystatic.config.ts), kept
 * as plain data so the admin bundle never imports the graphics themselves.
 * The keys map to components in src/components/cms/Graphic.tsx.
 */
import { industries } from "@/content/industries";
import { pillars } from "@/content/services";

export const insightTopics = [
  { value: "growth-operations", label: "Growth operations" },
  { value: "marketing-strategy", label: "Marketing strategy" },
  { value: "measurement", label: "Measurement" },
  { value: "leadership", label: "Leadership" },
  { value: "branding", label: "Branding" },
  { value: "technology", label: "Technology" },
  { value: "digital-marketing", label: "Digital marketing" },
  ...industries.map((industry) => ({ value: industry.slug, label: industry.name })),
] as const;

/** Ready-made vector and motion graphics an author can drop into a page. */
export const graphicOptions = [
  { value: "hero-engine", label: "Growth engine: channels into one hub, out to results" },
  { value: "channel-hub", label: "Channel hub: every channel wired into one plan" },
  { value: "process-flow", label: "Process: the five stages" },
  { value: "capability-strategy", label: "Strategy (isometric)" },
  { value: "capability-branding", label: "Branding (isometric)" },
  { value: "capability-technology", label: "Technology (isometric)" },
  { value: "capability-digital-marketing", label: "Digital marketing (isometric)" },
  ...industries.map((industry) => ({ value: `industry-${industry.slug}`, label: `Industry scene: ${industry.name}` })),
  { value: "industry-cluster", label: "The seven industries (icon cluster)" },
  { value: "packages", label: "Packages panel (miniature)" },
  { value: "network", label: "Core team and specialist network" },
  { value: "compare", label: "With KeshavCo vs without (table)" },
  { value: "mark", label: "KeshavCo mark with chevrons" },
  { value: "waves", label: "Wave texture (banner)" },
  { value: "dot-field", label: "3D dot landscape (banner)" },
] as const;

export type GraphicKey = (typeof graphicOptions)[number]["value"];

export const calloutTones = [
  { value: "note", label: "Note" },
  { value: "takeaway", label: "Key takeaway" },
  { value: "warning", label: "Watch out" },
] as const;

export const serviceOptions = pillars.map((pillar) => ({ value: pillar.slug, label: pillar.name }));
export const industryOptions = industries.map((industry) => ({ value: industry.slug, label: industry.name }));
