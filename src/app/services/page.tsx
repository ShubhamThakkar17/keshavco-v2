import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import PillarRows from "@/components/sections/PillarRows";
import LinkCells from "@/components/sections/LinkCells";
import FaqSplit from "@/components/sections/FaqSplit";
import CapabilityQuad from "@/components/graphics/CapabilityQuad";
import ChannelHub from "@/components/graphics/ChannelHub";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import Overview from "@/components/ui/Overview";
import CtaRow from "@/components/ui/CtaRow";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import Reveal from "@/components/motion/Reveal";

import { servicesHub } from "@/content/about";
import { faqs } from "@/content/faq";
import { pillars, servicesV3, supportingCapabilities } from "@/content/services";
import { cta } from "@/content/site";
import { toParagraphs } from "@/lib/text";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...servicesHub.seo, path: "/services" });

/**
 * /services (brief §9.4): hero → pillar rows → supporting capabilities →
 * channel hub ("planned together") → service FAQs with the "not sure" prompt.
 */
export default function ServicesPage() {
  const copy = servicesV3.hub;
  const { positioning, notSure } = servicesHub;
  const serviceFaqs = copy.faq.ids
    .map((id) => faqs.find((faq) => faq.id === id))
    .filter((faq): faq is (typeof faqs)[number] => Boolean(faq));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Services" }]}
        tag={copy.tag}
        title={servicesHub.h1}
        line={copy.short}
        actions={
          <>
            <Button href={cta.primary.href} size="lg">
              {cta.primary.short}
            </Button>
            <Button href={cta.secondary.href} variant="ghost" size="lg">
              {cta.secondary.short}
            </Button>
          </>
        }
        art={<CapabilityQuad />}
      />

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <Overview note={copy.overview} text={servicesHub.intro} />
          <SectionHead index={2} tag={copy.rows.tag} title={copy.rows.title} line={copy.rows.line} className="mt-24 lg:mt-32" />
          <div className="mt-12">
            <PillarRows pillars={pillars} />
          </div>
        </div>
      </Sheet>

      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={3} tag={copy.supporting.tag} title={copy.supporting.title} />
          <div className="mt-12">
            <LinkCells
              items={supportingCapabilities.map((item) => ({
                key: item.name,
                title: item.name,
                body: item.body,
                href: item.href,
              }))}
            />
          </div>
        </div>
      </Sheet>

      <Sheet tone="night" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead
            index={4}
            tag={copy.planned.tag}
            title={`${positioning.headingPrefix} ${positioning.headingAccent}.`}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-5">
              {toParagraphs(positioning.body).map((paragraph, index) => (
                <Reveal key={index}>
                  <p className="type-body-l text-pretty text-white/75">{paragraph}</p>
                </Reveal>
              ))}
              <ul className="mt-10 space-y-3">
                {positioning.cards.map((card, index) => (
                  <Reveal key={card.title} as="li" delay={0.08 * index} className="block">
                    <div className="rounded-[var(--radius-md)] border border-line-night bg-night-2 p-5 sm:p-6">
                      <h3 className="type-mono text-white">{card.title}</h3>
                      <p className="type-body-s mt-2 text-pretty text-white/65">{card.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div className="text-white/70 lg:col-span-7">
              <ChannelHub />
            </div>
          </div>
        </div>
      </Sheet>

      <FaqSplit
        items={serviceFaqs}
        index={5}
        tag={copy.faq.tag}
        title={copy.faq.title}
        all={copy.faq.all}
        variant="rows"
        after={
          <CtaRow
            tag={copy.notSure.tag}
            heading={notSure.heading}
            body={notSure.body}
            actions={
              <>
                <Button href={cta.primary.href}>{cta.primary.short}</Button>
                <Button href={cta.secondary.href} variant="ghost">
                  {cta.secondary.short}
                </Button>
              </>
            }
          />
        }
      />
    </>
  );
}
