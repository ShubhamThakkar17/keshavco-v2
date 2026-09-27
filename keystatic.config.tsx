import { collection, config, fields } from "@keystatic/core";
import { brand } from "@/content/brand";
import { block, wrapper } from "@keystatic/core/content-components";
import {
  calloutTones,
  graphicOptions,
  industryOptions,
  insightTopics,
  serviceOptions,
} from "@/content/cms";

/**
 * Keystatic: the admin for Insights articles and Our Work case studies
 * (decision log #21). The editor lives at /keystatic.
 *
 * - Development: content is read and written on disk (`local`).
 * - Deployed: content is committed to the GitHub repository (`github`), so
 *   publishing an article is a commit and Vercel rebuilds the site in a
 *   minute or two. Sign-in is GitHub, and only people with write access to
 *   the repository can edit. Setup: docs/cms/README.md.
 *
 * Articles are Markdoc files in src/content/insights, images go to
 * public/images/insights, and the blocks below are the ready-made graphics an
 * author can insert (rendered by src/components/cms/Markdoc.tsx).
 */

const options = <T extends { value: string; label: string }>(list: readonly T[]) =>
  list.map(({ value, label }) => ({ value, label }));

const graphicSelect = (label: string, description?: string) =>
  fields.select({ label, description, options: options(graphicOptions), defaultValue: "hero-engine" });

const caption = fields.text({ label: "Caption (optional)" });

/* Editor previews: a plain summary of each block, so an article reads
   sensibly while it is being written (the real graphic renders on the site). */
const graphicLabel = (value: string) => graphicOptions.find((option) => option.value === value)?.label ?? value;

function Preview({ title, lines }: { title: string; lines: (string | undefined)[] }) {
  return (
    <div style={{ fontSize: 14, lineHeight: 1.5 }}>
      <strong>{title}</strong>
      {lines.filter(Boolean).map((line, index) => (
        <div key={index} style={{ opacity: 0.75 }}>
          {line}
        </div>
      ))}
    </div>
  );
}

/** Blocks available inside the article and case-study editors. */
export const contentComponents = {
  graphic: block({
    label: "Graphic",
    description: "One of the site's ready-made vector or motion graphics.",
    schema: { name: graphicSelect("Graphic"), caption },
    ContentView: ({ value }) => <Preview title={graphicLabel(value.name)} lines={[value.caption]} />,
  }),
  flowSteps: block({
    label: "Steps flow",
    description: "Two to six steps joined by a moving dotted line.",
    schema: {
      steps: fields.array(fields.text({ label: "Step", validation: { length: { min: 1, max: 40 } } }), {
        label: "Steps",
        itemLabel: (props) => props.value || "Step",
        validation: { length: { min: 2, max: 6 } },
      }),
      caption,
    },
    ContentView: ({ value }) => <Preview title={value.steps.join(" → ")} lines={[value.caption]} />,
  }),
  funnel: block({
    label: "Funnel",
    description: "Stages that narrow, for example visits, enquiries, meetings, sales.",
    schema: {
      stages: fields.array(
        fields.object({
          label: fields.text({ label: "Stage", validation: { length: { min: 1 } } }),
          value: fields.number({ label: "Number", validation: { isRequired: true } }),
        }),
        {
          label: "Stages",
          itemLabel: (props) => `${props.fields.label.value}: ${props.fields.value.value ?? ""}`,
          validation: { length: { min: 2, max: 6 } },
        },
      ),
      caption,
    },
    ContentView: ({ value }) => (
      <Preview title="Funnel" lines={[value.stages.map((stage) => `${stage.label}: ${stage.value ?? ""}`).join(" → "), value.caption]} />
    ),
  }),
  barChart: block({
    label: "Bar chart",
    description: "Bars that grow into place. Use real numbers and name the source in the caption.",
    schema: {
      bars: fields.array(
        fields.object({
          label: fields.text({ label: "Label", validation: { length: { min: 1 } } }),
          value: fields.number({ label: "Value", validation: { isRequired: true } }),
        }),
        {
          label: "Bars",
          itemLabel: (props) => `${props.fields.label.value}: ${props.fields.value.value ?? ""}`,
          validation: { length: { min: 2, max: 10 } },
        },
      ),
      unit: fields.text({ label: "Unit after each value (optional), for example % or L" }),
      caption,
    },
    ContentView: ({ value }) => (
      <Preview title="Bar chart" lines={[value.bars.map((bar) => `${bar.label} ${bar.value ?? ""}${value.unit}`).join(" · "), value.caption]} />
    ),
  }),
  keyFigure: block({
    label: "Key figure",
    description: "One number, what it measures, and where it comes from.",
    schema: {
      value: fields.text({ label: "Figure, for example 42% or 3×", validation: { length: { min: 1, max: 12 } } }),
      label: fields.text({ label: "What it measures", validation: { length: { min: 1 } } }),
      source: fields.text({ label: "Source", validation: { length: { min: 1 } } }),
    },
    ContentView: ({ value }) => <Preview title={`${value.value} ${value.label}`} lines={[`Source: ${value.source}`]} />,
  }),
  callout: wrapper({
    label: "Callout",
    description: "A highlighted note, takeaway or warning around some text.",
    schema: {
      tone: fields.select({ label: "Type", options: options(calloutTones), defaultValue: "note" }),
      title: fields.text({ label: "Title (optional)" }),
    },
  }),
  pullQuote: block({
    label: "Pull quote",
    description: "A line from this article, set large.",
    schema: { text: fields.text({ label: "Line", multiline: true, validation: { length: { min: 1 } } }) },
    ContentView: ({ value }) => <Preview title={`“${value.text}”`} lines={[]} />,
  }),
};

export const editorOptions = {
  heading: [2, 3] as const,
  image: { directory: "public/images/insights", publicPath: "/images/insights/" },
};

const cover = (directory: string) =>
  fields.conditional(
    fields.select({
      label: "Cover",
      options: [
        { value: "graphic", label: "Ready-made graphic" },
        { value: "image", label: "Uploaded image" },
        { value: "none", label: "None" },
      ],
      defaultValue: "graphic",
    }),
    {
      graphic: graphicSelect("Cover graphic"),
      image: fields.object({
        src: fields.image({ label: "Cover image", directory, publicPath: directory.replace(/^public/, "") + "/" }),
        alt: fields.text({ label: "Describe the image (alt text)" }),
      }),
      none: fields.empty(),
    },
  );

export default config({
  // Local files in development, unless NEXT_PUBLIC_KEYSTATIC_STORAGE=github is
  // set to run Keystatic's one-time GitHub App setup from a laptop.
  storage:
    process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github"
      ? { kind: "local" }
      : { kind: "github", repo: { owner: "ShubhamThakkar17", name: "keshavco-v2" } },
  ui: {
    brand: {
      name: "KeshavCo",
      // eslint-disable-next-line @next/next/no-img-element -- the editor is outside next/image's reach
      mark: () => <img src={brand.mark} alt="" width={20} height={22} />,
    },
  },
  collections: {
    insights: collection({
      label: "Insights",
      slugField: "title",
      path: "src/content/insights/*",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "status", "publishedAt"],
      schema: {
        title: fields.slug({ name: { label: "Title", validation: { length: { min: 1, max: 110 } } } }),
        status: fields.select({
          label: "Status",
          description: "Only published articles appear on the site.",
          options: [
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ],
          defaultValue: "draft",
        }),
        upcoming: fields.checkbox({
          label: "While in draft, list the title under “What we are writing next”",
          defaultValue: true,
        }),
        publishedAt: fields.date({ label: "Publish date", defaultValue: { kind: "today" } }),
        topic: fields.select({ label: "Topic", options: options(insightTopics), defaultValue: "growth-operations" }),
        summary: fields.text({
          label: "Summary",
          description: "One or two sentences for the card, search results and social previews (under 30 words).",
          multiline: true,
          validation: { length: { max: 240 } },
        }),
        author: fields.text({ label: "Author", defaultValue: "KeshavCo" }),
        cover: cover("public/images/insights"),
        seoTitle: fields.text({ label: "Search title (optional)", description: "Leave empty to use the title." }),
        body: fields.markdoc({ label: "Article", options: editorOptions, components: contentComponents }),
      },
    }),
    work: collection({
      label: "Our Work (hidden page)",
      slugField: "title",
      path: "src/content/work/*",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "client", "published"],
      schema: {
        title: fields.slug({ name: { label: "Case study title", validation: { length: { min: 1, max: 110 } } } }),
        published: fields.checkbox({
          label: "Published",
          description: "Real work only, with the client's permission. Unpublished case studies never appear.",
          defaultValue: false,
        }),
        client: fields.text({ label: "Client name (or a description if confidential)" }),
        industry: fields.select({ label: "Industry", options: options(industryOptions), defaultValue: industryOptions[0].value }),
        services: fields.multiselect({ label: "Capabilities involved", options: options(serviceOptions) }),
        year: fields.text({ label: "Year" }),
        summary: fields.text({ label: "Summary (under 30 words)", multiline: true, validation: { length: { max: 240 } } }),
        problem: fields.text({ label: "The problem", multiline: true }),
        approach: fields.text({ label: "What we did", multiline: true }),
        result: fields.text({ label: "The result (verifiable facts only)", multiline: true }),
        cover: cover("public/images/work"),
        body: fields.markdoc({
          label: "Full story (optional)",
          options: { ...editorOptions, image: { directory: "public/images/work", publicPath: "/images/work/" } },
          components: contentComponents,
        }),
      },
    }),
  },
});
