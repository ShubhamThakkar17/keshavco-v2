/**
 * Image registry.
 *
 * Every photo is from Unsplash under the Unsplash License (free for
 * commercial use, no attribution required). Source photo IDs are recorded in
 * public/images/CREDITS.md so any image can be traced back or replaced.
 *
 * Dimensions are stored here so `next/image` can reserve layout space and
 * avoid cumulative layout shift.
 */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const image = (
  name: string,
  width: number,
  height: number,
  alt: string,
): SiteImage => ({ src: `/images/${name}.jpg`, width, height, alt });

export const images = {
  teamMeeting: image(
    "team-meeting",
    1600,
    1067,
    "A growth review in progress — one team walking a client through the plan",
  ),
  consultation: image(
    "consultation",
    1400,
    933,
    "A growth consultation in progress across a meeting table",
  ),
  planning: image("planning", 1400, 935, "Working through a growth roadmap together"),
  boardroom: image("boardroom", 1400, 933, "A leadership review session"),
  branding: image("branding", 1400, 933, "Colour, type and material samples on a design desk"),
  designBoards: image("design-boards", 1400, 1120, "Brand and print design boards laid out"),
  technology: image("technology", 1400, 933, "A performance dashboard on screen"),
  digitalMarketing: image(
    "digital-marketing",
    1400,
    933,
    "Campaign performance trending up on a laptop screen",
  ),
  workspace: image("workspace", 1400, 933, "A bright, open studio workspace"),
  office: image("office", 1400, 1229, "An open-plan office floor"),
} as const;

export const industryImages: Record<string, SiteImage> = {
  manufacturing: image(
    "ind-manufacturing",
    1100,
    734,
    "A modern production line on a factory floor",
  ),
  healthcare: image("ind-healthcare", 1100, 733, "A contemporary medical centre building"),
  education: image("ind-education", 1100, 732, "Students crossing a university campus"),
  "real-estate": image("ind-real-estate", 1100, 733, "High-rise towers seen from street level"),
  d2c: image("ind-d2c", 1100, 825, "Consumer product packaging arranged on a surface"),
  retail: image("ind-retail", 1100, 756, "A bright modern retail store interior"),
  "professional-services": image(
    "ind-professional-services",
    1100,
    733,
    "An open-plan professional services office",
  ),
};

/** One lead image per service pillar. */
export const pillarImages: Record<string, SiteImage> = {
  strategy: images.planning,
  branding: images.branding,
  technology: images.technology,
  "digital-marketing": images.digitalMarketing,
};
