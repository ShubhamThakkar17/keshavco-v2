import React from "react";
import Markdoc, { type RenderableTreeNodes } from "@markdoc/markdoc";
import Graphic from "@/components/cms/Graphic";
import { BarChart, FlowSteps, Funnel } from "@/components/cms/ArticleGraphics";
import { ArticleImage, ArticleLink, Callout, KeyFigure, PullQuote } from "@/components/cms/Blocks";

/**
 * Renders editor content (Markdoc, transformed in src/lib/cms.ts) as an
 * <article class="article"> with the site's typography (globals.css) and the
 * block components.
 */
export default function MarkdocContent({ content, idPrefix }: { content: RenderableTreeNodes; idPrefix: string }) {
  let graphics = 0;
  const components = {
    // Each graphic gets its own id prefix for its SVG patterns.
    Graphic: (props: { name: string; caption?: string }) => {
      graphics += 1;
      return <Graphic {...props} id={`${idPrefix}-g${graphics}`} />;
    },
    FlowSteps,
    Funnel,
    BarChart,
    KeyFigure,
    Callout,
    PullQuote,
    ArticleImage,
    ArticleLink,
  };
  return <>{Markdoc.renderers.react(content, React, { components })}</>;
}
