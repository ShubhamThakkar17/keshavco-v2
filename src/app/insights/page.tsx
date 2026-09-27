import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import SubscribeForm from "@/components/sections/SubscribeForm";
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
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...insightsPage.seo, path: "/insights" });

/**
 * /insights (brief §9.4), while nothing is published: short hero → the
 * planned titles as mono rows marked DRAFTING (no links, nothing to link
 * to) → the newsletter form → CTA.
 */
export default function InsightsPage() {
  const copy = insightsV3;
  const band = ctaBands.insights;
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

      <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={2} tag={copy.planned.tag} title={insightsPage.plannedHeading} line={copy.planned.line} />
          <ol className="mt-12 border-t border-line">
            {insightsPage.planned.map((article, index) => (
              <Reveal key={article.title} as="li" delay={index * 0.05} className="block border-b border-line">
                <div className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-6">
                  <span className="type-mono text-ink-2">{`.${String(index + 1).padStart(2, "0")}`}</span>
                  <div>
                    <p className="type-mono-s text-ink-2">{article.topic}</p>
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

          <div
            id="subscribe"
            data-tone="night"
            className="grain relative mt-20 scroll-mt-28 overflow-hidden rounded-[var(--radius-lg)] bg-night p-7 text-white sm:p-10 lg:mt-28 lg:p-14"
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
