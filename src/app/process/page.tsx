import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CtaBand from "@/components/sections/CtaBand";
import Button from "@/components/ui/Button";
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

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page max-w-4xl">
          <ProcessTimeline stages={processStages} />
        </div>
      </section>

      <CtaBand variant="general" supportLine={0} />
    </>
  );
}
