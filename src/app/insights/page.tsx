import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import SubscribeForm from "@/components/sections/SubscribeForm";
import InsightCard from "@/components/cms/InsightCard";
import Reveal from "@/components/motion/Reveal";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import CtaRow from "@/components/ui/CtaRow";
import Chip from "@/components/ui/Chip";
import Brackets from "@/components/ui/Brackets";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { ctaBands, insightsPage, insightsV3 } from "@/content/misc";
import { cta, newsletter } from "@/content/site";
import { getInsights } from "@/lib/cms";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...insightsPage.seo, path: "/insights" });

/**
 * /insights (brief §9.4). Articles come from the /keystatic editor
 * (src/content/insights): published ones fill a masonry grid of image and
 * text cards; drafts marked "upcoming" are listed as DRAFTING, with no link.
 * Then the newsletter form and the CTA.
 */
export default async function InsightsPage() {
  const copy = insightsV3;
  const band = ctaBands.insights;
  const { published, upcoming } = await getInsights();
  let index = 1;
  const next = () => (index += 1);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
        ])}
      />

      <PageHero
        short
        crumbs={[{ label: "Insights" }]}
        tag={copy.tag}
        title={insightsPage.h1}
        line={insightsPage.intro}
        actions={
          <Button href="#subscribe" size="lg">
            {newsletter.button}
          </Button>
        }
      />

      {published.length > 0 && (
        <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
          <div className="container-page">
            <SectionHead index={next()} tag={copy.latest.tag} title={copy.latest.title} />
            <div className="mt-12 columns-1 gap-3 md:columns-2 lg:columns-3">
              {published.map((post, i) => (
                <InsightCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </Sheet>
      )}

      <Sheet tone={published.length > 0 ? "paper-2" : "paper"} guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          {upcoming.length > 0 && (
            <>
              <SectionHead index={next()} tag={copy.planned.tag} title={insightsPage.plannedHeading} line={published.length > 0 ? copy.planned.lineOnceLive : copy.planned.line} />
              <ol className="mt-12 border-t border-line">
                {upcoming.map((article, i) => (
                  <Reveal key={article.slug} as="li" delay={i * 0.05} className="block border-b border-line">
                    <div className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-6">
                      <span className="type-mono text-ink-2">{`.${String(i + 1).padStart(2, "0")}`}</span>
                      <div>
                        <p className="type-mono-s text-ink-2">{article.topicLabel}</p>
                        <h3 className="mt-1.5 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                          {article.title}
                        </h3>
                      </div>
                      <Chip className="justify-self-start sm:justify-self-end">
                        <span aria-hidden="true" className="mr-2 h-1.5 w-1.5 rounded-full bg-signal" />
                        {copy.planned.status}
                      </Chip>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </>
          )}

          <div
            id="subscribe"
            data-tone="night"
            className={`grain relative scroll-mt-28 overflow-hidden rounded-[var(--radius-lg)] bg-night p-7 text-white sm:p-10 lg:p-14 ${
              upcoming.length > 0 ? "mt-20 lg:mt-28" : ""
            }`}
          >
            <Brackets inset={12} />
            <div className="relative z-[1] grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="lg:col-span-6">
                <p className="type-mono-s text-white/60">{copy.subscribe.tag}</p>
                <h2 className="type-display-l mt-5">{newsletter.heading}</h2>
                <p className="type-body-l mt-4 max-w-md text-white/70">{newsletter.body}</p>
              </div>
              <div className="lg:col-span-6">
                <SubscribeForm />
              </div>
            </div>
          </div>

          <CtaRow
            className="mt-16"
            heading={band.heading}
            body={band.body}
            actions={<Button href={cta.primary.href}>{cta.primary.short}</Button>}
          />
        </div>
      </Sheet>
    </>
  );
}
