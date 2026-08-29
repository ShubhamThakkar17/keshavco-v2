import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { SectionHeading } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import MediaFrame from "@/components/ui/MediaFrame";
import JsonLd from "@/components/ui/JsonLd";
import PillarIcon from "@/components/ui/PillarIcon";

import { getPillar, pillars } from "@/content/services";
import { pillarImages, images } from "@/content/images";
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

export default async function PillarPage({ params }: Params) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const path = `/services/${pillar.slug}`;
  const ctaButton = cta[pillar.ctaVariant];

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
        eyebrow={pillar.eyebrow}
        title={pillar.h1}
        intro={pillar.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: pillar.name },
        ]}
        image={pillarImages[pillar.slug]}
      >
        <Button href={cta.primary.href} variant="light" size="lg" withArrow>
          {cta.primary.label}
        </Button>
      </PageHero>

      {/* ------------------------------------------ The problem this solves */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading title="The problem this solves" />
            <div className="mt-8">
              <MediaFrame
                image={images.consultation}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 30vw"
                drift={6}
                tint={false}
              />
            </div>
          </div>
          <ScrollHighlightText
            text={pillar.problem}
            className="font-display text-xl font-medium leading-snug text-navy-900 sm:text-[1.6rem]"
          />
        </div>
      </section>

      {/* ------------------------------------------------------ What we do */}
      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we do"
            title={`${pillar.name} services`}
            body={`Each of these is a page of its own. Start where your problem is, or take the whole practice as part of a growth plan.`}
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2" stagger={0.07}>
            {pillar.subServices.map((service, index) => (
              <RevealItem key={service.slug}>
                <SpotlightCard className="h-full rounded-3xl border border-navy-900/10 bg-white">
                  <Link
                    href={`${path}/${service.slug}`}
                    className="flex h-full flex-col p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-indigo-brand transition-colors duration-500 group-hover:bg-navy-900 group-hover:text-white">
                        <PillarIcon slug={pillar.slug} className="h-5 w-5" />
                      </span>
                      <span className="font-display text-xs font-semibold tabular-nums text-navy-300">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-navy-900">
                      {service.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-navy-500">
                      {service.blurb}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
                      Learn more
                      <span
                        aria-hidden="true"
                        className="text-indigo-brand transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ----------------------------------------------------- Outcomes */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 h-[30rem] w-[30rem] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, #7C3AED, transparent)" }}
        />
        <div className="container-page relative z-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Outcomes"
            title="What you get"
            body="Not a list of deliverables — the state your business is in when the work is done."
            tone="light"
          />
          <RevealGroup className="divide-y divide-white/10 border-y border-white/10">
            {pillar.outcomes.map((outcome) => (
              <RevealItem key={outcome}>
                <p className="flex items-start gap-4 py-5 text-[0.98rem] leading-snug text-white/75">
                  <span
                    aria-hidden="true"
                    className="bg-gradient-brand mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                  />
                  {outcome}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------- Pillar CTA */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-navy-900/10 bg-navy-50 p-9 sm:p-12 lg:flex-row lg:items-center">
              <h2 className="font-display max-w-xl text-balance text-2xl font-bold leading-tight tracking-tight text-navy-900 sm:text-3xl">
                {pillar.ctaHeading}
              </h2>
              <Button href={ctaButton.href} size="lg" withArrow>
                {ctaButton.label}
              </Button>
            </div>
          </Reveal>

          {/* Sibling capabilities */}
          <div className="mt-16">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy-400">
              Explore the other capabilities
            </p>
            <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-3">
              {pillars
                .filter((other) => other.slug !== pillar.slug)
                .map((other) => (
                  <RevealItem key={other.slug}>
                    <Link
                      href={`/services/${other.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-navy-900/10 p-6 transition-colors hover:border-navy-900/30 hover:bg-navy-50"
                    >
                      <span className="font-display text-base font-semibold tracking-tight text-navy-900">
                        {other.name}
                      </span>
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
          </div>
        </div>
      </section>

      <CtaBand variant="service" supportLine={1} />
    </>
  );
}
