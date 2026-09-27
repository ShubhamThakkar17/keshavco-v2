import "server-only";
import { createReader } from "@keystatic/core/reader";
import { fields } from "@keystatic/core";
import Markdoc, { type Config, type Node, type RenderableTreeNodes } from "@markdoc/markdoc";
import keystaticConfig, { contentComponents, editorOptions } from "../../keystatic.config";
import { graphicOptions, industryOptions, insightTopics, serviceOptions, type GraphicKey } from "@/content/cms";
import { insightsPage } from "@/content/misc";

/**
 * Server-side access to the Keystatic content (Insights articles and Our Work
 * case studies). Everything is read from the repository at build time, so
 * pages stay static; publishing in the editor commits a change and Vercel
 * rebuilds.
 */
export const reader = createReader(process.cwd(), keystaticConfig);

export type Cover =
  | { kind: "graphic"; graphic: GraphicKey }
  | { kind: "image"; src: string; alt: string }
  | { kind: "none" };

type RawCover =
  | { discriminant: "graphic"; value: string }
  | { discriminant: "image"; value: { src: string | null; alt: string } }
  | { discriminant: "none"; value: null };

function toCover(raw: RawCover): Cover {
  if (raw.discriminant === "graphic" && graphicOptions.some((option) => option.value === raw.value)) {
    return { kind: "graphic", graphic: raw.value as GraphicKey };
  }
  if (raw.discriminant === "image" && raw.value.src) {
    return { kind: "image", src: raw.value.src, alt: raw.value.alt };
  }
  return { kind: "none" };
}

const label = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((option) => option.value === value)?.label ?? value;

/* ------------------------------------------------------------ Markdoc --- */

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);

function textOf(node: Node): string {
  if (node.type === "text") return String(node.attributes.content ?? "");
  return node.children.map(textOf).join(node.type === "paragraph" ? " " : "");
}

const baseConfig = fields.markdoc.createMarkdocConfig({
  options: editorOptions,
  components: contentComponents,
  render: {
    tags: {
      graphic: "Graphic",
      flowSteps: "FlowSteps",
      funnel: "Funnel",
      barChart: "BarChart",
      keyFigure: "KeyFigure",
      callout: "Callout",
      pullQuote: "PullQuote",
    },
    nodes: { image: "ArticleImage", link: "ArticleLink" },
  },
});

/** Headings get stable ids so the contents list can link to them. */
export const markdocConfig: Config = {
  ...baseConfig,
  nodes: {
    ...baseConfig.nodes,
    // The root <article> carries the typography (`.article` in globals.css).
    document: {
      ...Markdoc.nodes.document,
      transform(node, config) {
        return new Markdoc.Tag("article", { class: "article" }, node.transformChildren(config));
      },
    },
    heading: {
      ...(baseConfig.nodes?.heading ?? Markdoc.nodes.heading),
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        return new Markdoc.Tag(`h${node.attributes.level}`, { ...attributes, id: slugify(textOf(node)) }, children);
      },
    },
  },
};

export function transformBody(node: Node): RenderableTreeNodes {
  return Markdoc.transform(node, markdocConfig);
}

export function readingMinutes(node: Node) {
  const words = textOf(node).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function headingsOf(node: Node) {
  const out: { id: string; text: string }[] = [];
  const walk = (current: Node) => {
    if (current.type === "heading" && current.attributes.level === 2) {
      const text = textOf(current);
      out.push({ id: slugify(text), text });
    }
    current.children.forEach(walk);
  };
  walk(node);
  return out;
}

/* ----------------------------------------------------------- Insights --- */

export type InsightSummary = {
  slug: string;
  title: string;
  topic: string;
  topicLabel: string;
  summary: string;
  author: string;
  publishedAt: string | null;
  cover: Cover;
  readingMinutes: number;
};

export async function getInsights() {
  const entries = await reader.collections.insights.all();
  const published: InsightSummary[] = [];
  const upcoming: { slug: string; title: string; topicLabel: string }[] = [];

  for (const { slug, entry } of entries) {
    if (entry.status === "published") {
      const { node } = await entry.body();
      published.push({
        slug,
        title: entry.title,
        topic: entry.topic,
        topicLabel: label(insightTopics, entry.topic),
        summary: entry.summary,
        author: entry.author,
        publishedAt: entry.publishedAt,
        cover: toCover(entry.cover as RawCover),
        readingMinutes: readingMinutes(node),
      });
    } else if (entry.upcoming) {
      upcoming.push({ slug, title: entry.title, topicLabel: label(insightTopics, entry.topic) });
    }
  }

  published.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  // Drafts keep the editorial plan's order; new ones follow alphabetically.
  const order = (title: string) => {
    const index = insightsPage.planned.findIndex((item) => item.title === title);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  };
  upcoming.sort((a, b) => order(a.title) - order(b.title) || a.title.localeCompare(b.title));
  return { published, upcoming };
}

export async function getInsight(slug: string) {
  const entry = await reader.collections.insights.read(slug);
  if (!entry || entry.status !== "published") return null;
  const { node } = await entry.body();
  return {
    slug,
    title: entry.title,
    seoTitle: entry.seoTitle,
    topic: entry.topic,
    topicLabel: label(insightTopics, entry.topic),
    summary: entry.summary,
    author: entry.author,
    publishedAt: entry.publishedAt,
    cover: toCover(entry.cover as RawCover),
    readingMinutes: readingMinutes(node),
    headings: headingsOf(node),
    content: transformBody(node),
  };
}

/* ----------------------------------------------------------- Our Work --- */

export type CaseStudySummary = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  industryLabel: string;
  services: string[];
  year: string;
  summary: string;
  cover: Cover;
};

export async function getCaseStudies(): Promise<CaseStudySummary[]> {
  const entries = await reader.collections.work.all();
  return entries
    .filter(({ entry }) => entry.published)
    .map(({ slug, entry }) => ({
      slug,
      title: entry.title,
      client: entry.client,
      industry: entry.industry,
      industryLabel: label(industryOptions, entry.industry),
      services: entry.services.map((value) => label(serviceOptions, value)),
      year: entry.year,
      summary: entry.summary,
      cover: toCover(entry.cover as RawCover),
    }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

export async function getCaseStudy(slug: string) {
  const entry = await reader.collections.work.read(slug);
  if (!entry || !entry.published) return null;
  const { node } = await entry.body();
  return {
    slug,
    title: entry.title,
    client: entry.client,
    industryLabel: label(industryOptions, entry.industry),
    services: entry.services.map((value) => label(serviceOptions, value)),
    year: entry.year,
    summary: entry.summary,
    problem: entry.problem,
    approach: entry.approach,
    result: entry.result,
    cover: toCover(entry.cover as RawCover),
    content: transformBody(node),
  };
}
