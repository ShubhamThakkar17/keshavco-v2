import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import ProcessTrack from "@/components/sections/ProcessTrack";
import ProcessMini from "@/components/graphics/ProcessMini";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import Overview from "@/components/ui/Overview";
import CtaRow from "@/components/ui/CtaRow";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { processPage, processStages, processV3 } from "@/content/process";
import { cta } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...processPage.seo, path: "/process" });

/**
 * /process (brief §9.4): hero → overview → the five stages on a pinned
 * horizontal track (stacked on phones and with reduced motion) → CTA.
 */
export default function ProcessPage() {
  const copy = processV3;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Process", href: "/process" },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Process" }]}
        tag={copy.tag}
        title={processPage.h1}
        line={copy.short}
        actions={
          <Button href={cta.primary.href} size="lg">
            {cta.primary.short}
          </Button>
        }
        art={<ProcessMini />}
      />

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <Overview note={copy.overview} text={processPage.intro} />
          <SectionHead index={2} tag={copy.track.tag} title={copy.track.title} className="mt-24 lg:mt-32" />
        </div>
        <div className="mt-12">
          <ProcessTrack stages={processStages} />
        </div>
        <div className="container-page mt-16 lg:mt-8">
          <CtaRow
            tag={copy.cta.tag}
            heading={processPage.cta.heading}
            body={processPage.cta.body}
            actions={
              <>
                <Button href={cta.primary.href}>{cta.primary.short}</Button>
                <Button href={cta.secondary.href} variant="ghost">
                  {cta.secondary.short}
                </Button>
              </>
            }
          />
        </div>
      </Sheet>
    </>
  );
}
