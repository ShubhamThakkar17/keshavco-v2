import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/motion/Reveal";

import { faqPage, faqs } from "@/content/faq";
import { images } from "@/content/images";
import { cta } from "@/content/site";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...faqPage.seo, path: "/faq" });

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "FAQ", href: "/faq" },
        ])}
      />

      <PageHero
        eyebrow={faqPage.eyebrow}
        title={faqPage.h1}
        intro={faqPage.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        image={images.workspace}
      >
        <Button href={cta.primary.href} variant="light" size="lg" withArrow>
          {cta.primary.label}
        </Button>
      </PageHero>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page max-w-4xl">
          <Accordion items={faqs} defaultOpen={0} />
        </div>
      </section>

      <section className="bg-navy-50 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            title={faqPage.closing.heading}
            body={faqPage.closing.body}
            align="center"
          >
            <Reveal delay={0.15}>
              <div className="mt-9 flex justify-center">
                <Button href={cta.secondary.href} size="lg" withArrow>
                  {cta.secondary.label}
                </Button>
              </div>
            </Reveal>
          </SectionHeading>
        </div>
      </section>

      <CtaBand variant="general" supportLine={2} />
    </>
  );
}
