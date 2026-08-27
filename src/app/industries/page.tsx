import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import IndustryExplorer from "@/components/sections/IndustryExplorer";
import CtaBand from "@/components/sections/CtaBand";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { industriesPage } from "@/content/industries";
import { cta } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  ...industriesPage.seo,
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
        ])}
      />

      <PageHero
        eyebrow={industriesPage.eyebrow}
        title={industriesPage.h1}
        intro={industriesPage.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      >
        <Button href={cta.primary.href} variant="light" size="lg" withArrow>
          {cta.primary.label}
        </Button>
      </PageHero>

      <section className="bg-navy-50 py-24 sm:py-32">
        <div className="container-page">
          <IndustryExplorer />
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="container-page">
          <SectionHeading
            title={industriesPage.alsoWorkingWith.heading}
            body={industriesPage.alsoWorkingWith.note}
            align="center"
          />
          <Reveal delay={0.15}>
            <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
              {industriesPage.alsoWorkingWith.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-navy-900/10 px-5 py-2.5 text-sm text-navy-600 transition-colors hover:border-navy-900/30 hover:bg-navy-50"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand variant="industries" supportLine={2} />
    </>
  );
}
