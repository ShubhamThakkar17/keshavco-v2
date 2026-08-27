import Link from "next/link";
import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import IndustryMarquee from "@/components/sections/IndustryMarquee";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PackagesStack from "@/components/sections/PackagesStack";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";

import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import SplitText from "@/components/motion/SplitText";
import Counter from "@/components/motion/Counter";
import SpotlightCard from "@/components/motion/SpotlightCard";

import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/ui/JsonLd";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";

import {
  advantageBand,
  capabilityBand,
  faqSection,
  midCta,
  processSection,
  proofCounters,
  servicesSection,
  showTestimonials,
  whoWeAre,
  whyKeshavCo,
  whyPartner,
} from "@/content/home";
import { packagesPage } from "@/content/packages";
import { insightsPage } from "@/content/misc";
import { homeFaqs } from "@/content/faq";
import { cta, site } from "@/content/site";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "KeshavCo — Business Growth Partner in India",
  description:
    "We help businesses solve growth problems. Strategy, branding, technology and digital marketing under one partner. Book a growth consultation.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <Hero />
      <IndustryMarquee />

      {/* ---------------------------------------------------- Who we are */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <Reveal duration={0.55}>
                <Eyebrow>{whoWeAre.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="font-display mt-6 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.9rem]">
                <SplitText text={whoWeAre.heading} />
              </h2>
              <Reveal delay={0.15}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/about" variant="secondary" withArrow>
                    Read our story
                  </Button>
                </div>
              </Reveal>
            </div>

            <div>
              <ScrollHighlightText
                text={whoWeAre.body[0]}
                className="font-display text-xl font-semibold leading-snug text-navy-900 sm:text-2xl"
              />
              <Reveal delay={0.05}>
                <p className="mt-7 text-[1rem] leading-relaxed text-navy-500">
                  {whoWeAre.body[1]}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-[1rem] leading-relaxed text-navy-500">
                  {whoWeAre.body[2]}
                </p>
              </Reveal>

              <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2">
                {whoWeAre.principles.map((principle) => (
                  <RevealItem key={principle.title}>
                    <SpotlightCard className="h-full rounded-2xl border border-navy-900/10 bg-navy-50/60 p-7">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-navy-900">
                        {principle.title}
                      </h3>
                      <p className="mt-3 text-[0.9rem] leading-relaxed text-navy-500">
                        {principle.body}
                      </p>
                    </SpotlightCard>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Why KeshavCo */}
      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow={whyKeshavCo.eyebrow}
            title={whyKeshavCo.headingPrefix}
            accent={whyKeshavCo.headingAccent}
            body={whyKeshavCo.body}
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {whyKeshavCo.cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.09} direction="up">
                <SpotlightCard className="h-full rounded-3xl border border-navy-900/10 bg-white p-8 transition-transform duration-500 hover:-translate-y-1">
                  <span className="font-display block text-xs font-semibold tabular-nums text-navy-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-navy-900">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[0.94rem] leading-relaxed text-navy-500">{card.body}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------- What you get band */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, #4F46E5, transparent)" }}
        />
        <div className="container-page relative z-10">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <SectionHeading
              eyebrow={capabilityBand.eyebrow}
              title={capabilityBand.heading}
              body={capabilityBand.body}
              tone="light"
            >
              <Reveal delay={0.24}>
                <div className="mt-10">
                  <Button href={cta.primary.href} variant="light" size="lg" withArrow>
                    {cta.primary.label}
                  </Button>
                </div>
              </Reveal>
            </SectionHeading>

            <RevealGroup className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-3xl border border-white/10 bg-white/10">
              {proofCounters.map((counter) => (
                <RevealItem key={counter.label} className="bg-navy-950 p-7 sm:p-9">
                  <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                    <span className="text-gradient-brand">
                      <Counter value={counter.value} suffix={counter.suffix} />
                    </span>
                  </p>
                  <p className="mt-3 text-[0.82rem] leading-snug text-white/50">{counter.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Services */}
      <section id="services" className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow={servicesSection.eyebrow}
            title={servicesSection.headingPrefix}
            accent={servicesSection.headingAccent}
            body={servicesSection.body}
          />
          <div className="mt-16">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Packages */}
      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            eyebrow={packagesPage.homeEyebrow}
            title="Engagements built around"
            accent="outcomes, not service lists"
            body={packagesPage.homeBody}
          />

          <div className="mt-16">
            <PackagesStack />
          </div>

          <Reveal>
            <p className="mt-12 flex flex-col gap-2 text-sm text-navy-500 sm:flex-row sm:items-center sm:gap-3">
              {packagesPage.note}
              <Link
                href="/growth-packages"
                className="font-semibold text-navy-900 underline-offset-4 transition-colors hover:text-indigo-brand hover:underline"
              >
                See what is included →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ Process */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow={processSection.eyebrow}
              title={processSection.heading}
              body={processSection.body}
            >
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <Link
                    href="/process"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-900"
                  >
                    See the full five-stage process
                    <span
                      aria-hidden="true"
                      className="text-indigo-brand transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </Reveal>
            </SectionHeading>
          </div>
          <ProcessTimeline stages={processSection.steps} />
        </div>
      </section>

      {/* ------------------------------------------------- Mid-page CTA */}
      <section className="bg-gradient-brand relative overflow-hidden py-16 sm:py-20">
        <div className="container-page relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <h2 className="font-display max-w-2xl text-balance text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2.1rem]">
            <SplitText text={midCta.heading} />
          </h2>
          <Reveal direction="left" delay={0.1}>
            <Button
              href={cta.primary.href}
              size="lg"
              withArrow
              className="bg-white text-navy-900 hover:bg-white/90"
            >
              {cta.primary.label}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- Why partner */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading title={whyPartner.heading} body={whyPartner.body} />

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <RevealGroup className="grid gap-5 sm:grid-cols-2">
              {whyPartner.cards.map((card, index) => (
                <RevealItem
                  key={card.title}
                  className={index === 0 ? "sm:col-span-2" : undefined}
                >
                  <SpotlightCard className="h-full rounded-3xl border border-navy-900/10 bg-navy-50/60 p-8">
                    <span
                      aria-hidden="true"
                      className="bg-gradient-brand block h-1 w-10 rounded-full"
                    />
                    <h3 className="font-display mt-6 text-xl font-bold tracking-tight text-navy-900">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[0.94rem] leading-relaxed text-navy-500">
                      {card.body}
                    </p>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal direction="left" delay={0.15}>
              <div className="grain flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-navy-950 p-8 text-white">
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    {whyPartner.support.heading}
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-3 inline-block text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {site.email}
                  </a>
                  <p className="mt-6 text-[0.92rem] leading-relaxed text-white/60">
                    {whyPartner.support.body}
                  </p>
                </div>
                <div className="relative z-10 mt-10">
                  <Button href={cta.secondary.href} variant="light" withArrow>
                    {cta.secondary.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {showTestimonials && <Testimonials />}

      {/* ---------------------------------------------- Advantage band */}
      <section className="grain relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 bottom-0 h-[30rem] w-[30rem] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, #7C3AED, transparent)" }}
        />
        <div className="container-page relative z-10 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading title={advantageBand.heading} body={advantageBand.body} tone="light" />
          <div>
            <RevealGroup className="divide-y divide-white/10 border-y border-white/10">
              {advantageBand.points.map((point) => (
                <RevealItem key={point}>
                  <p className="flex items-start gap-4 py-5 text-[0.98rem] leading-snug text-white/75">
                    <span
                      aria-hidden="true"
                      className="bg-gradient-brand mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    {point}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <Button href={cta.primary.href} variant="light" size="lg" withArrow>
                  {cta.primary.label}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Insights */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <SectionHeading
              eyebrow={insightsPage.teaser.eyebrow}
              title={insightsPage.teaser.heading}
              body={insightsPage.teaser.body}
            >
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <Button href="/insights" variant="secondary" withArrow>
                    {insightsPage.teaser.button}
                  </Button>
                </div>
              </Reveal>
            </SectionHeading>

            <RevealGroup className="divide-y divide-navy-900/10 border-t border-navy-900/10">
              {insightsPage.planned.slice(0, 4).map((article, index) => (
                <RevealItem key={article.title}>
                  <div className="group flex items-start gap-6 py-6">
                    <span className="font-display pt-1 text-xs font-semibold tabular-nums text-navy-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-navy-900 transition-colors group-hover:text-indigo-brand sm:text-xl">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-navy-400">
                        {article.topic}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- FAQ */}
      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow={faqSection.eyebrow}
              title={faqSection.heading}
              body={faqSection.body}
            >
              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href={cta.primary.href} withArrow>
                    {cta.primary.label}
                  </Button>
                  <Button href="/faq" variant="secondary">
                    All questions
                  </Button>
                </div>
              </Reveal>
            </SectionHeading>
          </div>
          <Accordion items={homeFaqs} />
        </div>
      </section>

      <CtaBand variant="general" supportLine={0} />
    </>
  );
}
