import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import CapabilityShowcase from "@/components/sections/CapabilityShowcase";
import CtaBand from "@/components/sections/CtaBand";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { SectionHeading } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { servicesHub } from "@/content/about";
import { images } from "@/content/images";
import { cta } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...servicesHub.seo, path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ])}
      />

      <PageHero
        eyebrow={servicesHub.eyebrow}
        title={servicesHub.h1}
        intro={servicesHub.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image={images.planning}
      >
        <Button href={cta.primary.href} variant="light" size="lg" withArrow>
          {cta.primary.label}
        </Button>
      </PageHero>

      {/* -------------------------------------------- Positioning band */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <SectionHeading
            eyebrow={servicesHub.positioning.eyebrow}
            title={servicesHub.positioning.headingPrefix}
            accent={servicesHub.positioning.headingAccent}
            body={servicesHub.positioning.body}
          />
          <RevealGroup className="grid gap-5 self-center">
            {servicesHub.positioning.cards.map((card) => (
              <RevealItem key={card.title}>
                <SpotlightCard className="rounded-3xl border border-navy-900/10 bg-navy-50/60 p-8">
                  <h3 className="font-display text-xl font-bold tracking-tight text-navy-900">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[0.94rem] leading-relaxed text-navy-500">{card.body}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------- Capability cards */}
      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Capabilities"
            title="Four capabilities."
            accent="One growth plan."
            body="Each capability below is a full practice with its own specialists. They are planned together, and priced as one engagement."
          />
          <div className="mt-16">
            <CapabilityShowcase />
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Not sure where to start */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            title={servicesHub.notSure.heading}
            body={servicesHub.notSure.body}
            align="center"
          >
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button href={cta.primary.href} size="lg" withArrow>
                  {cta.primary.label}
                </Button>
                <Button href={cta.secondary.href} variant="secondary" size="lg">
                  {cta.secondary.label}
                </Button>
              </div>
            </Reveal>
          </SectionHeading>
        </div>
      </section>

      <CtaBand variant="service" supportLine={2} />
    </>
  );
}
