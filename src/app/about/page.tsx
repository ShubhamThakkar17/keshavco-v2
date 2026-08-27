import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import SpotlightCard from "@/components/motion/SpotlightCard";
import Counter from "@/components/motion/Counter";
import { SectionHeading } from "@/components/ui/Section";
import JsonLd from "@/components/ui/JsonLd";
import Button from "@/components/ui/Button";

import { aboutPage } from "@/content/about";
import { pillars } from "@/content/services";
import { cta } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...aboutPage.seo, path: "/about" });

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ])}
      />

      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={aboutPage.h1}
        intro={aboutPage.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      >
        <Button href={cta.primary.href} variant="light" size="lg" withArrow>
          {cta.primary.label}
        </Button>
      </PageHero>

      {/* ------------------------------------------------ Why we exist */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading title={aboutPage.whyWeExist.heading} />
          </div>
          <div>
            <ScrollHighlightText
              text={aboutPage.whyWeExist.body[0]}
              className="font-display text-xl font-semibold leading-snug text-navy-900 sm:text-2xl"
            />
            {aboutPage.whyWeExist.body.slice(1).map((paragraph, index) => (
              <Reveal key={index} delay={0.05 * index}>
                <p className="mt-6 text-[1rem] leading-relaxed text-navy-500">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Mission and vision */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-20 h-[34rem] w-[34rem] rounded-full opacity-30 blur-[130px]"
          style={{ background: "radial-gradient(closest-side, #4F46E5, transparent)" }}
        />
        <div className="container-page relative z-10">
          <RevealGroup className="grid gap-5 lg:grid-cols-2">
            {aboutPage.missionVision.map((item) => (
              <RevealItem key={item.label}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-9 backdrop-blur-sm">
                  <span className="text-gradient-brand font-display text-sm font-bold uppercase tracking-[0.2em]">
                    {item.label}
                  </span>
                  <p className="font-display mt-6 text-xl leading-snug text-white/85 sm:text-2xl">
                    {item.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-20">
            <SectionHeading title="What we hold ourselves to" tone="light" />
            <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {aboutPage.values.map((value, index) => (
                <RevealItem key={value.title} className="bg-navy-950 p-8">
                  <span className="font-display block text-xs font-semibold tabular-nums text-white/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-5 text-lg font-bold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-white/55">{value.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ----------------------------------------- Structure + network */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                title={aboutPage.howWeWork.heading}
                body={aboutPage.howWeWork.body}
              />
            </div>
            <div>
              <SectionHeading title={aboutPage.network.heading} body={aboutPage.network.body} />
            </div>
          </div>

          <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <RevealItem key={pillar.slug}>
                <SpotlightCard className="h-full rounded-2xl border border-navy-900/10 bg-navy-50/60 p-7">
                  <p className="font-display text-base font-semibold tracking-tight text-navy-900">
                    {pillar.name}
                  </p>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-navy-500">
                    {pillar.subServices.map((s) => s.name).join(" · ")}
                  </p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-3">
              {[
                { value: 4, label: "Capabilities under one plan" },
                { value: 26, label: "Specialist services" },
                { value: 7, label: "Industries we work in" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-8 text-center">
                  <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                    <span className="text-gradient-brand">
                      <Counter value={stat.value} />
                    </span>
                  </p>
                  <p className="mt-3 text-[0.85rem] text-navy-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand variant="general" supportLine={2} />
    </>
  );
}
