import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import PackagesStack from "@/components/sections/PackagesStack";
import CtaBand from "@/components/sections/CtaBand";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { packagesPage } from "@/content/packages";
import { images } from "@/content/images";
import { cta } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  ...packagesPage.seo,
  path: "/growth-packages",
});

export default function GrowthPackagesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Growth Packages", href: "/growth-packages" },
        ])}
      />

      <PageHero
        eyebrow={packagesPage.eyebrow}
        title={packagesPage.h1Prefix}
        accent={packagesPage.h1Accent}
        intro={packagesPage.intro[0]}
        crumbs={[{ label: "Home", href: "/" }, { label: "Growth Packages" }]}
        image={images.boardroom}
      >
        <Button href={cta.primary.href} variant="light" size="lg" withArrow>
          {cta.primary.label}
        </Button>
      </PageHero>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <PackagesStack detailed />
        </div>
      </section>

      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="How engagements work"
              title="The three questions we always get"
            >
              <Reveal delay={0.2}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href={cta.primary.href} withArrow>
                    {cta.primary.label}
                  </Button>
                  <Button href={cta.secondary.href} variant="secondary">
                    {cta.secondary.label}
                  </Button>
                </div>
              </Reveal>
            </SectionHeading>
          </div>

          <RevealGroup className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {packagesPage.howItWorks.map((item) => (
              <RevealItem key={item.q}>
                <div className="py-8">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-navy-900">
                    {item.q}
                  </h3>
                  <p className="mt-3 max-w-2xl text-[0.96rem] leading-relaxed text-navy-500">
                    {item.a}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand variant="packages" supportLine={1} />
    </>
  );
}
