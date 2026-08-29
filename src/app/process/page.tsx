import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CtaBand from "@/components/sections/CtaBand";
import Button from "@/components/ui/Button";
import MediaFrame from "@/components/ui/MediaFrame";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Section";
import JsonLd from "@/components/ui/JsonLd";

import { processPage, processStages } from "@/content/process";
import { images } from "@/content/images";
import { cta } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...processPage.seo, path: "/process" });

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Process", href: "/process" },
        ])}
      />

      <PageHero
        eyebrow={processPage.eyebrow}
        title={processPage.h1}
        intro={processPage.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Process" }]}
        image={images.planning}
      >
        <Button href={cta.primary.href} variant="light" size="lg" withArrow>
          {cta.primary.label}
        </Button>
      </PageHero>

      {/* Sticky heading and imagery on the left so the timeline is not a
          lone column of text in a wide empty page. */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal duration={0.5}>
              <Eyebrow>Five stages</Eyebrow>
            </Reveal>
            <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl">
              <SplitText text="Nothing exotic. Just done properly." />
            </h2>
            <div className="mt-8">
              <MediaFrame
                image={images.boardroom}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 32vw"
                drift={6}
                tint={false}
              />
            </div>
            <RevealGroup className="mt-8 grid grid-cols-5 gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10">
              {processStages.map((stage) => (
                <RevealItem key={stage.number} className="bg-white p-3 text-center">
                  <span className="font-display block text-sm font-bold tabular-nums">
                    <span className="text-gradient-brand">{stage.number}</span>
                  </span>
                  <span className="mt-1 block text-[0.62rem] leading-tight text-navy-400">
                    {stage.title}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <ProcessTimeline stages={processStages} />
        </div>
      </section>

      <CtaBand variant="general" supportLine={0} />
    </>
  );
}
