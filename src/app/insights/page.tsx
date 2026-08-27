import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { SectionHeading } from "@/components/ui/Section";
import JsonLd from "@/components/ui/JsonLd";

import { insightsPage } from "@/content/misc";
import { newsletter } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...insightsPage.seo, path: "/insights" });

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
        ])}
      />

      <PageHero
        eyebrow={insightsPage.eyebrow}
        title={insightsPage.h1}
        intro={insightsPage.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Editorial plan"
            title={insightsPage.plannedHeading}
            body="These are the pieces in production. Nothing is linked yet because nothing is published yet — subscribe below and the first one will reach you before it reaches this page."
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.08}>
            {insightsPage.planned.map((article, index) => (
              <RevealItem key={article.title}>
                <SpotlightCard className="flex h-full flex-col rounded-3xl border border-navy-900/10 bg-navy-50/60 p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-white px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-navy-500">
                      {article.topic}
                    </span>
                    <span className="font-display text-xs font-semibold tabular-nums text-navy-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-display mt-6 flex-1 text-xl font-bold leading-snug tracking-tight text-navy-900 sm:text-2xl">
                    {article.title}
                  </h2>
                  <p className="mt-6 text-xs uppercase tracking-[0.14em] text-navy-400">
                    In preparation
                  </p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="bg-navy-50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading title={newsletter.heading} body={newsletter.body} align="center" />
          <p className="mt-8 text-center text-sm text-navy-500">
            Use the form in the footer to subscribe.
          </p>
        </div>
      </section>

      <CtaBand variant="insights" supportLine={0} />
    </>
  );
}
