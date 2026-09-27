import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import WorkCard from "@/components/cms/WorkCard";
import ChevronStack from "@/components/graphics/ChevronStack";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import CtaRow from "@/components/ui/CtaRow";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { ourWork, showOurWork } from "@/content/work";
import { cta } from "@/content/site";
import { getCaseStudies } from "@/lib/cms";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ ...ourWork.seo, path: "/our-work" }),
  // Hidden until launched (src/content/work.ts): never indexed before then.
  ...(ourWork.visible ? {} : { robots: { index: false, follow: false } }),
};

/**
 * /our-work (hidden): case studies written in the /keystatic editor. Returns
 * 404 until `ourWork.visible` is true, except on previews with
 * OUR_WORK_PREVIEW=1.
 */
export default async function OurWorkPage() {
  if (!showOurWork()) notFound();
  const studies = await getCaseStudies();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Our Work", href: "/our-work" },
        ])}
      />
      <PageHero
        short
        crumbs={[{ label: "Our Work" }]}
        tag={ourWork.tag}
        title={ourWork.h1}
        line={ourWork.short}
        actions={
          <Button href={cta.primary.href} size="lg">
            {cta.primary.short}
          </Button>
        }
      />
      <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={2} tag={ourWork.list.tag} title={ourWork.list.title} />
          {studies.length > 0 ? (
            <div className="mt-12 grid gap-3 md:grid-cols-2">
              {studies.map((study) => (
                <WorkCard key={study.slug} study={study} />
              ))}
            </div>
          ) : (
            <div className="mt-12 flex flex-col items-start gap-5 rounded-[var(--radius-md)] border border-dashed border-line p-8 sm:p-12">
              <ChevronStack className="h-10 w-10 text-signal" loader />
              <h3 className="type-display-m text-ink">{ourWork.empty.heading}</h3>
              <p className="type-body max-w-lg text-ink-2">{ourWork.empty.body}</p>
            </div>
          )}
          <CtaRow
            className="mt-16"
            heading={ourWork.cta.heading}
            body={ourWork.cta.body}
            actions={<Button href={cta.primary.href}>{cta.primary.short}</Button>}
          />
        </div>
      </Sheet>
    </>
  );
}
