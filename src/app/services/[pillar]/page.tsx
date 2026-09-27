import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import LinkCells from "@/components/sections/LinkCells";
import ProcessFlow from "@/components/sections/ProcessFlow";
import PackageCard from "@/components/sections/PackageCard";
import CapabilityArt from "@/components/graphics/capability";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import Overview from "@/components/ui/Overview";
import CheckList from "@/components/ui/CheckList";
import CtaRow from "@/components/ui/CtaRow";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/motion/Reveal";

import { getPillar, pillars, servicesV3 } from "@/content/services";
import { growthPackages } from "@/content/packages";
import { processStages } from "@/content/process";
import { cta } from "@/content/site";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

type Params = { params: Promise<{ pillar: string }> };

export function generateStaticParams() {
  return pillars.map((pillar) => ({ pillar: pillar.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return pageMetadata({ ...pillar.seo, path: `/services/${pillar.slug}` });
}

/**
 * Pillar page (brief §9.4): hero with the pillar art → what this solves
 * (overview + the problem as three cards) → sub-service cells → outcomes
 * checklist → the process in brief → related engagement and the pillar CTA.
 */
export default async function PillarPage({ params }: Params) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const copy = servicesV3.pillar;
  const path = `/services/${pillar.slug}`;
  const ctaButton = cta[pillar.ctaVariant];
  const packageSlug = servicesV3.relatedPackage[pillar.slug];
  const packageIndex = growthPackages.findIndex((pkg) => pkg.slug === packageSlug);
  const related = growthPackages[packageIndex];
  const problems = servicesV3.problemCards[pillar.slug] ?? [];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: pillar.name,
          description: pillar.seo.description,
          path,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: pillar.name, href: path },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: pillar.name }]}
        tag={pillar.eyebrow.toUpperCase()}
        title={pillar.h1}
        line={pillar.tagline}
        actions={
          <>
            <Button href={ctaButton.href} size="lg">
              {ctaButton.short}
            </Button>
            <Button href="#services" variant="ghost" size="lg">
              {`${pillar.name} ${copy.services.suffix}`}
            </Button>
          </>
        }
        art={<CapabilityArt slug={pillar.slug} className="h-auto w-full" />}
      />

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <Overview note={copy.overview} text={pillar.intro} />
          <SectionHead index={2} tag={copy.problem.tag} title={copy.problem.title} className="mt-24 lg:mt-32" />
          <ol className="mt-12 grid gap-3 md:grid-cols-3">
            {problems.map((problem, index) => (
              <Reveal key={problem} as="li" delay={index * 0.08} className="block">
                <div className="flex h-full min-h-44 flex-col justify-between gap-8 rounded-[var(--radius-md)] border border-line bg-card p-6">
                  <span className="type-mono inline-flex items-center gap-1.5 text-ink-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
                    {`.${String(index + 1).padStart(2, "0")}`}
                  </span>
                  <p className="font-display text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.02em] text-balance text-ink">{problem}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Sheet>

      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div id="services" className="container-page scroll-mt-24">
          <SectionHead
            index={3}
            tag={copy.services.tag}
            title={`${pillar.name} ${copy.services.suffix}.`}
            line={copy.services.line}
          />
          <div className="mt-12">
            <LinkCells
              items={pillar.subServices.map((service, index) => ({
                key: service.slug,
                index: `.${String(index + 1).padStart(2, "0")}`,
                title: service.name,
                body: service.blurb,
                href: `${path}/${service.slug}`,
              }))}
            />
          </div>
        </div>
      </Sheet>

      <Sheet tone="night" guides={{ accent: 3 }}>
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHead index={4} tag={copy.outcomes.tag} title={copy.outcomes.title} line={copy.outcomes.line} stacked />
          </div>
          <div className="lg:col-span-7">
            <CheckList items={pillar.outcomes} />
          </div>
        </div>
      </Sheet>

      <Sheet tone="paper-2" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead
            index={5}
            tag={copy.process.tag}
            title={copy.process.title}
            action={
              <Button href={copy.process.action.href} variant="link">
                {copy.process.action.label}
              </Button>
            }
          />
          <div className="mt-16">
            <ProcessFlow stages={processStages} />
          </div>
        </div>
      </Sheet>

      <Sheet tone="paper" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={6} tag={copy.next.tag} title={copy.next.title} />
          <div className="mt-12 grid gap-3 lg:grid-cols-12">
            <div className="lg:col-span-5">{related && <PackageCard pkg={related} index={packageIndex} />}</div>
            <div className="flex flex-col gap-3 lg:col-span-7">
              <CtaRow
                heading={pillar.ctaHeading}
                actions={<Button href={ctaButton.href}>{ctaButton.short}</Button>}
                className="flex-1 [&>div]:h-full"
              />
              <nav aria-label={copy.next.others} className="rounded-[var(--radius-md)] border border-line bg-card p-6">
                <p className="type-mono-s text-ink-2">{copy.next.others}</p>
                <ul className="mt-3 grid gap-x-6 sm:grid-cols-3">
                  {pillars
                    .filter((other) => other.slug !== pillar.slug)
                    .map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/services/${other.slug}`}
                          className="group flex min-h-11 items-center justify-between gap-3 border-b border-line text-[0.9375rem] font-medium text-ink transition-colors hover:text-signal sm:border-b-0"
                        >
                          {other.name}
                          <span aria-hidden="true" className="text-signal transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Sheet>
    </>
  );
}
