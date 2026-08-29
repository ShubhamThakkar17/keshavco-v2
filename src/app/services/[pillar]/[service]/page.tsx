import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { SectionHeading } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { allServicePaths, getSubService } from "@/content/services";
import { pillarImages } from "@/content/images";
import { cta } from "@/content/site";
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

export default async function SubServicePage({ params }: Params) {
  const { pillar: pillarSlug, service: serviceSlug } = await params;
  const found = getSubService(pillarSlug, serviceSlug);
  if (!found) notFound();

  const { pillar, service } = found;
  const pillarPath = `/services/${pillar.slug}`;
  const path = `${pillarPath}/${service.slug}`;
  const ctaButton = cta[service.cta];
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
        eyebrow={`${pillar.name} — ${service.name}`}
        title={service.h1}
        intro={service.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: pillar.name, href: pillarPath },
          { label: service.name },
        ]}
        image={pillarImages[pillar.slug]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={ctaButton.href} variant="light" size="lg" withArrow>
            {ctaButton.label}
          </Button>
          <Link
            href={pillarPath}
            className="inline-flex h-14 items-center text-sm text-white/55 transition-colors hover:text-white"
          >
            ← Back to {pillar.name}
          </Link>
        </div>
      </PageHero>

      {/* ------------------------------------------------- What you get */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="What you get"
              title="Three things this changes"
              body="Every engagement is scoped to your business, but this is the shape of the outcome."
            />
          </div>

          <RevealGroup className="grid gap-5" stagger={0.1}>
            {service.points.map((point, index) => (
              <RevealItem key={point}>
                <SpotlightCard className="flex gap-6 rounded-3xl border border-navy-900/10 bg-navy-50/60 p-8">
                  <span className="font-display shrink-0 text-2xl font-extrabold tabular-nums">
                    <span className="text-gradient-brand">0{index + 1}</span>
                  </span>
                  <p className="text-[1.02rem] leading-relaxed text-navy-700">{point}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------------------------------- Where this sits + CTA */}
      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow={pillar.name}
            title="This is one part of a bigger plan"
            body={`${service.name} rarely works on its own. It sits inside ${pillar.name.toLowerCase()}, which sits inside a growth plan that decides what to do first and why.`}
          />

          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((sibling) => (
              <RevealItem key={sibling.slug}>
                <Link
                  href={`${pillarPath}/${sibling.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-navy-900/10 bg-white p-6 transition-colors hover:border-navy-900/30"
                >
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-navy-900">
                      {sibling.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[0.85rem] leading-relaxed text-navy-500">
                      {sibling.blurb}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-indigo-brand transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-navy-900/10 bg-white p-9 sm:flex-row sm:items-center">
              <p className="font-display max-w-lg text-balance text-xl font-semibold tracking-tight text-navy-900">
                {pillar.ctaHeading}
              </p>
              <Button href={cta[pillar.ctaVariant].href} withArrow>
                {cta[pillar.ctaVariant].label}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand variant="service" supportLine={1} />
    </>
  );
}
