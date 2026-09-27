import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import MarkdocContent from "@/components/cms/Markdoc";
import CoverArt from "@/components/cms/CoverArt";
import BlurInWords from "@/components/motion/BlurInWords";
import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import Breadcrumb from "@/components/ui/Breadcrumb";
import CtaRow from "@/components/ui/CtaRow";
import Chip from "@/components/ui/Chip";
import Brackets from "@/components/ui/Brackets";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { breadcrumbV3 } from "@/content/misc";
import { ourWork, showOurWork } from "@/content/work";
import { cta } from "@/content/site";
import { toParagraphs } from "@/lib/text";
import { getCaseStudies, getCaseStudy } from "@/lib/cms";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  if (!showOurWork()) return [];
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    ...pageMetadata({ title: `${study.title} — KeshavCo`, description: study.summary, path: `/our-work/${slug}` }),
    ...(ourWork.visible ? {} : { robots: { index: false, follow: false } }),
  };
}

/** A case study: header with the facts, problem / what we did / result, the full story. */
export default async function CaseStudyPage({ params }: Params) {
  if (!showOurWork()) notFound();
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const labels = ourWork.labels;
  const path = `/our-work/${slug}`;
  const facts = [
    { label: labels.client, value: study.client },
    { label: labels.industry, value: study.industryLabel },
    { label: labels.year, value: study.year },
  ].filter((fact) => fact.value);
  const blocks = [
    { label: labels.problem, text: study.problem },
    { label: labels.approach, text: study.approach },
    { label: labels.result, text: study.result },
  ].filter((block) => block.text);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Our Work", href: "/our-work" },
          { label: study.title, href: path },
        ])}
      />
      <Sheet tone="paper-2" inset pad={false} guides={{ accent: 0, animate: true }}>
        <div className="container-page pb-12 pt-28 md:pb-16 lg:pb-20 lg:pt-36">
          <Breadcrumb items={[{ label: breadcrumbV3.home, href: "/" }, { label: "Our Work", href: "/our-work" }, { label: study.title }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <SectionTag index={1} label={ourWork.tag} trigger="mount" />
              <h1 className="type-display-page mt-6 max-w-[22ch] text-ink">
                <BlurInWords text={study.title} />
              </h1>
              {study.summary && <p className="type-body-l mt-6 max-w-xl text-pretty text-ink-2">{study.summary}</p>}
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="type-mono-s text-ink-2">{fact.label}</dt>
                    <dd className="mt-1 text-[0.9375rem] text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {study.services.length > 0 && (
                <ul aria-label={labels.services} className="mt-6 flex flex-wrap gap-1.5">
                  {study.services.map((service) => (
                    <li key={service}>
                      <Chip>{service}</Chip>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {study.cover.kind !== "none" && (
              <div className="relative lg:col-span-5">
                <Brackets inset={-6} />
                <CoverArt cover={study.cover} id={`study-${slug}`} priority className="aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-line" />
              </div>
            )}
          </div>
        </div>
      </Sheet>

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          {blocks.length > 0 && (
            <div className="grid gap-3 md:grid-cols-3">
              {blocks.map((block, index) => (
                <div key={block.label} className={`rounded-[var(--radius-md)] border p-6 sm:p-7 ${index === blocks.length - 1 ? "border-transparent bg-night text-white" : "border-line bg-card"}`} data-tone={index === blocks.length - 1 ? "night" : undefined}>
                  <p className="type-mono-s text-ink-2 night:text-white/60">{block.label}</p>
                  {toParagraphs(block.text).map((paragraph) => (
                    <p key={paragraph} className="type-body mt-3 text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="mt-16 grid gap-8 lg:grid-cols-12">
            <p className="type-mono text-ink-2 lg:col-span-3">{labels.story}</p>
            <div className="min-w-0 max-w-[68ch] lg:col-span-8 lg:col-start-5">
              <MarkdocContent content={study.content} idPrefix={`w-${slug}`} />
              <p className="mt-16 border-t border-line pt-6">
                <Link href={ourWork.all.href} className="type-mono-s text-ink-2 hover:text-signal">
                  {`← ${ourWork.all.label}`}
                </Link>
              </p>
            </div>
          </div>
          <CtaRow
            className="mt-20"
            heading={ourWork.cta.heading}
            body={ourWork.cta.body}
            actions={<Button href={cta.primary.href}>{cta.primary.short}</Button>}
          />
        </div>
      </Sheet>
    </>
  );
}
