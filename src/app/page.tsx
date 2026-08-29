import Link from "next/link";
import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import IndustryMarquee from "@/components/sections/IndustryMarquee";
import CapabilityShowcase from "@/components/sections/CapabilityShowcase";
import IndustryRail from "@/components/sections/IndustryRail";
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
import MediaFrame from "@/components/ui/MediaFrame";
import { Eyebrow, SectionHeading } from "@/components/ui/Section";

import {
  advantageBand,
  capabilityBand,
  faqSection,
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
import { images } from "@/content/images";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "KeshavCo — Business Growth Partner in India",
  description:
    "We help businesses solve growth problems. Strategy, branding, technology and digital marketing under one partner. Book a growth consultation.",
  path: "/",
});

/**
 * The home page shows the short version of everything. Where the copy document
 * has three paragraphs, this shows one and links to the page that carries the
 * rest — the full text still lives in src/content and is rendered in full on
 * About, Services and Process.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      <Hero />
      <IndustryMarquee />

      {/* ---------------------------------------------------- Who we are */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <MediaFrame
              image={images.teamMeeting}
              className="aspect-[4/3] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
              overlay={
                <div className="p-8">
                  <p className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                    &ldquo;An external growth department — not another vendor.&rdquo;
                  </p>
                </div>
              }
            />

            <div>
              <Reveal duration={0.55}>
                <Eyebrow>{whoWeAre.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.9rem]">
                <SplitText text={whoWeAre.heading} />
              </h2>

              {/* One paragraph here; About carries the full story. */}
              <div className="mt-7">
                <ScrollHighlightText
                  text={whoWeAre.body[0]}
                  className="text-[1.02rem] leading-relaxed text-navy-600"
                />
              </div>

              <RevealGroup className="mt-9 grid gap-4 sm:grid-cols-2">
                {whoWeAre.principles.map((principle) => (
                  <RevealItem key={principle.title}>
                    <SpotlightCard className="h-full rounded-2xl border border-navy-900/10 bg-navy-50/60 p-6">
                      <span
                        aria-hidden="true"
                        className="bg-gradient-brand block h-1 w-8 rounded-full"
                      />
                      <h3 className="font-display mt-4 text-base font-semibold tracking-tight text-navy-900">
                        {principle.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-[0.85rem] leading-relaxed text-navy-500">
                        {principle.body}
                      </p>
                    </SpotlightCard>
                  </RevealItem>
                ))}
              </RevealGroup>

              <Reveal delay={0.15}>
                <div className="mt-8">
                  <Button href="/about" variant="secondary" withArrow>
                    Read our story
                  </Button>
                </div>
              </Reveal>
            </div>
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
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
            <div>
              <Reveal duration={0.5}>
                <Eyebrow tone="light">{capabilityBand.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.9rem]">
                <SplitText text={capabilityBand.heading} />
              </h2>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-pretty text-[1.02rem] leading-relaxed text-white/65">
                  {capabilityBand.body[1]}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-9">
                  <Button href={cta.primary.href} variant="light" size="lg" withArrow>
                    {cta.primary.label}
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="grid gap-5">
              <MediaFrame
                image={images.workspace}
                className="aspect-[16/9] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
                drift={6}
              />
              <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-4">
                {proofCounters.map((counter) => (
                  <RevealItem key={counter.label} className="bg-navy-950 p-5 sm:p-6">
                    <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                      <span className="text-gradient-brand">
                        <Counter value={counter.value} suffix={counter.suffix} />
                      </span>
                    </p>
                    <p className="mt-2 text-[0.72rem] leading-snug text-white/50">
                      {counter.label}
                    </p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Services */}
      <section id="services" className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Reveal duration={0.5}>
                <Eyebrow>{servicesSection.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.9rem]">
                <SplitText text={servicesSection.headingPrefix} />
                <SplitText
                  text={servicesSection.headingAccent}
                  className="text-gradient-brand block"
                  delay={0.1}
                />
              </h2>
            </div>
            <Reveal delay={0.15}>
              <Link
                href="/services"
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-navy-900"
              >
                All services
                <span
                  aria-hidden="true"
                  className="text-indigo-brand transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-14">
            <CapabilityShowcase />
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Industries rail */}
      <IndustryRail />

      {/* ------------------------------------------------- Why KeshavCo */}
      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div>
              <Reveal duration={0.5}>
                <Eyebrow>{whyKeshavCo.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.9rem]">
                <SplitText text={whyKeshavCo.headingPrefix} />
                <SplitText
                  text={whyKeshavCo.headingAccent}
                  className="text-gradient-brand block"
                  delay={0.1}
                />
              </h2>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-navy-500">
                  {whyKeshavCo.body}
                </p>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-4">
              {whyKeshavCo.cards.map((card, index) => (
                <RevealItem key={card.title}>
                  <SpotlightCard className="flex items-start gap-5 rounded-2xl border border-navy-900/10 bg-white p-6 transition-transform duration-500 hover:-translate-y-0.5">
                    <span className="font-display shrink-0 text-lg font-extrabold tabular-nums">
                      <span className="text-gradient-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span>
                      <h3 className="font-display text-lg font-bold tracking-tight text-navy-900">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-[0.9rem] leading-relaxed text-navy-500">
                        {card.body}
                      </p>
                    </span>
                  </SpotlightCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Packages */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="max-w-3xl">
            <Reveal duration={0.5}>
              <Eyebrow>{packagesPage.homeEyebrow}</Eyebrow>
            </Reveal>
            <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.9rem]">
              <SplitText text="Engagements built around" />
              <SplitText
                text="outcomes, not service lists"
                className="text-gradient-brand block"
                delay={0.1}
              />
            </h2>
          </div>

          <div className="mt-14">
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
      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal duration={0.5}>
              <Eyebrow>{processSection.eyebrow}</Eyebrow>
            </Reveal>
            <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.9rem]">
              <SplitText text={processSection.heading} />
            </h2>
            <div className="mt-8">
              <MediaFrame
                image={images.planning}
                className="aspect-[4/3] w-full"
                sizes="(max-width: 1024px) 100vw, 35vw"
                drift={6}
                tint={false}
              />
            </div>
            <Reveal delay={0.15}>
              <div className="mt-8">
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
          </div>
          <ProcessTimeline stages={processSection.steps} />
        </div>
      </section>

      {/* ------------------------------------------------- Why partner */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <div className="max-w-2xl">
            <h2 className="font-display text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl lg:text-[2.9rem]">
              <SplitText text={whyPartner.heading} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-navy-500">
                {whyPartner.body}
              </p>
            </Reveal>
          </div>

          {/* Bento: three cards plus a photo tile and the support panel. */}
          <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3">
            {whyPartner.cards.map((card) => (
              <RevealItem key={card.title}>
                <SpotlightCard className="h-full rounded-3xl border border-navy-900/10 bg-navy-50/60 p-7">
                  <span aria-hidden="true" className="bg-gradient-brand block h-1 w-10 rounded-full" />
                  <h3 className="font-display mt-5 text-lg font-bold tracking-tight text-navy-900">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-navy-500">{card.body}</p>
                </SpotlightCard>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <MediaFrame
              image={images.consultation}
              className="aspect-[16/10] w-full lg:col-span-2"
              sizes="(max-width: 1024px) 100vw, 66vw"
              drift={7}
            />
            <Reveal direction="left" delay={0.1}>
              <div className="grain flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-navy-950 p-7 text-white">
                <div className="relative z-10">
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {whyPartner.support.heading}
                  </h3>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-2 inline-block text-sm text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {site.email}
                  </a>
                  <p className="mt-5 text-[0.88rem] leading-relaxed text-white/60">
                    {whyPartner.support.body}
                  </p>
                </div>
                <div className="relative z-10 mt-8">
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
        <div className="container-page relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
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
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Reveal duration={0.5}>
                <Eyebrow>{insightsPage.teaser.eyebrow}</Eyebrow>
              </Reveal>
              <h2 className="font-display mt-5 text-balance text-3xl font-bold leading-[1.08] tracking-tight text-navy-900 sm:text-4xl">
                <SplitText text={insightsPage.teaser.heading} />
              </h2>
              <div className="mt-8">
                <MediaFrame
                  image={images.designBoards}
                  className="aspect-[4/3] w-full"
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  drift={6}
                  tint={false}
                />
              </div>
              <Reveal delay={0.15}>
                <div className="mt-8">
                  <Button href="/insights" variant="secondary" withArrow>
                    {insightsPage.teaser.button}
                  </Button>
                </div>
              </Reveal>
            </div>

            <RevealGroup className="divide-y divide-navy-900/10 border-t border-navy-900/10 lg:mt-16">
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
