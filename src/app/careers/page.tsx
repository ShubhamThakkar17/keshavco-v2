import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import CareersForm from "@/components/sections/CareersForm";
import NetworkArt from "@/components/graphics/NetworkArt";
import Reveal from "@/components/motion/Reveal";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import Overview from "@/components/ui/Overview";
import Brackets from "@/components/ui/Brackets";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { careersPage } from "@/content/careers";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...careersPage.seo, path: "/careers" });

/**
 * /careers (decision log #7, route 43): how KeshavCo is structured, the two
 * ways in, and an open application. No openings, people or perks are listed
 * because none have been supplied.
 */
export default function CareersPage() {
  const copy = careersPage;
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Careers", href: "/careers" },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Careers" }]}
        tag={copy.tag}
        title={copy.h1}
        line={copy.short}
        actions={
          <Button href="#apply" size="lg">
            {copy.form.submit}
          </Button>
        }
        art={<NetworkArt />}
      />

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <Overview note={copy.overview} text={copy.intro} />
          <SectionHead index={2} tag={copy.ways.tag} title={copy.ways.title} className="mt-24 lg:mt-32" />
          <ul className="mt-12 grid gap-3 md:grid-cols-2">
            {copy.ways.items.map((item, index) => (
              <Reveal key={item.label} as="li" delay={index * 0.08} className="block">
                <div className="relative h-full rounded-[var(--radius-md)] border border-line bg-card p-7 sm:p-9">
                  {index === 0 && <Brackets inset={-1} />}
                  <p className="type-mono-s text-ink-2">{item.label}</p>
                  <h3 className="type-display-m mt-5 text-ink">{item.title}</h3>
                  <p className="type-body mt-3 max-w-md text-pretty text-ink-2">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Sheet>

      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div id="apply" className="container-page grid scroll-mt-24 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionHead index={3} tag={copy.apply.tag} title={copy.apply.title} line={copy.apply.line} stacked />
          </div>
          <div className="rounded-[var(--radius-lg)] border border-line bg-card p-6 sm:p-9 lg:col-span-7">
            <CareersForm />
          </div>
        </div>
      </Sheet>
    </>
  );
}
