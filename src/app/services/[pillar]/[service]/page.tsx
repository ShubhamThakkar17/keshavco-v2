import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import CapabilityArt from "@/components/graphics/capability";
import { CheckIcon } from "@/components/graphics/CompareIcons";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import CtaRow from "@/components/ui/CtaRow";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/motion/Reveal";

import { allServicePaths, getSubService, partOfBody, servicesV3 } from "@/content/services";
import { cta } from "@/content/site";
import { toParagraphs } from "@/lib/text";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

type Params = { params: Promise<{ pillar: string; service: string }> };

export function generateStaticParams() {
  return allServicePaths.map((entry) => ({ pillar: entry.pillar, service: entry.service }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { pillar: pillarSlug, service: serviceSlug } = await params;
  const found = getSubService(pillarSlug, serviceSlug);
  if (!found) return {};
  return pageMetadata({
    ...found.service.seo,
    path: `/services/${pillarSlug}/${serviceSlug}`,
  });
}

/**
 * Sub-service page (brief §9.4): hero (tag = pillar, H1, blurb) → the intro
 * and the three points as numbered cells → "part of" strip with the sibling
 * services as chips and the pillar CTA. Service JSON-LD unchanged.
 */
export default async function SubServicePage({ params }: Params) {
  const { pillar: pillarSlug, service: serviceSlug } = await params;
  const found = getSubService(pillarSlug, serviceSlug);
  if (!found) notFound();

  const { pillar, service } = found;
  const copy = servicesV3.service;
  const pillarPath = `/services/${pillar.slug}`;
  const path = `${pillarPath}/${service.slug}`;
  const ctaButton = cta[service.cta];
  const pillarCta = cta[pillar.ctaVariant];
  const siblings = pillar.subServices.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: service.seo.description,
          path,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: pillar.name, href: pillarPath },
          { label: service.name, href: path },
        ])}
      />

      <PageHero
        crumbs={[
          { label: "Services", href: "/services" },
          { label: pillar.name, href: pillarPath },
          { label: service.name },
        ]}
        tag={pillar.name.toUpperCase()}
        title={service.h1}
        line={service.blurb}
        actions={
          <>
            <Button href={ctaButton.href} size="lg">
              {ctaButton.short}
            </Button>
            <Button href={pillarPath} variant="ghost" size="lg">
              {`${copy.back} ${pillar.name}`}
            </Button>
          </>
        }
        art={<CapabilityArt slug={pillar.slug} className="h-auto w-full" />}
      />

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={2} tag={copy.tag} title={copy.title} line={copy.line} />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <p className="type-mono text-ink-2">{copy.overview}</p>
              {toParagraphs(service.intro).map((paragraph, index) => (
                <Reveal key={index}>
                  <p className="type-body-l mt-5 text-pretty text-ink">{paragraph}</p>
                </Reveal>
              ))}
            </div>
            <ol className="grid gap-3 lg:col-span-8 lg:col-start-5">
              {service.points.map((point, index) => (
                <Reveal key={point} as="li" delay={index * 0.08} className="block">
                  <div className="grid grid-cols-[auto_1fr_auto] items-start gap-5 rounded-[var(--radius-md)] border border-line bg-card p-6 sm:p-7">
                    <span className="type-mono inline-flex items-center gap-1.5 text-ink-2">
                      <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
                      {`.${String(index + 1).padStart(2, "0")}`}
                    </span>
                    <p className="type-body-l text-pretty text-ink">{point}</p>
                    <span className="mt-1 text-growth-ink">
                      <CheckIcon />
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Sheet>

      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={3} tag={`${copy.partOf.tag} ${pillar.name.toUpperCase()}`} title={copy.partOf.title} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <p className="type-body-l max-w-xl text-pretty text-ink-2 lg:col-span-5">
              {partOfBody(service.name, pillar.name)}
            </p>
            <nav aria-label={`${copy.siblings} ${pillar.name}`} className="lg:col-span-7">
              <p className="type-mono-s text-ink-2">{`${copy.siblings} ${pillar.name}`}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {siblings.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      href={`${pillarPath}/${sibling.slug}`}
                      className="type-mono-s inline-flex min-h-11 items-center rounded-[var(--radius-sm)] bg-card px-3 text-ink-2 transition-colors hover:bg-ink hover:text-white lg:min-h-9"
                    >
                      {sibling.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <CtaRow
            className="mt-16"
            heading={pillar.ctaHeading}
            actions={
              <>
                <Button href={pillarCta.href}>{pillarCta.short}</Button>
                <Button href={pillarPath} variant="ghost">
                  {`${servicesV3.hub.explore} ${pillar.name}`}
                </Button>
              </>
            }
          />
        </div>
      </Sheet>
    </>
  );
}
