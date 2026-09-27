import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import PackagesPanel from "@/components/sections/PackagesPanel";
import IncludesMatrix from "@/components/sections/IncludesMatrix";
import PackagesMini from "@/components/graphics/PackagesMini";
import StackCards from "@/components/motion/StackCards";
import Reveal from "@/components/motion/Reveal";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import Overview from "@/components/ui/Overview";
import CtaRow from "@/components/ui/CtaRow";
import Chip from "@/components/ui/Chip";
import Brackets from "@/components/ui/Brackets";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { growthPackages, packagesPage, packagesV3 } from "@/content/packages";
import { ctaBands } from "@/content/misc";
import { cta } from "@/content/site";
import { toParagraphs } from "@/lib/text";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  ...packagesPage.seo,
  path: "/growth-packages",
});

/**
 * /growth-packages (brief §9.4): hero → the packages panel with the ad-spend
 * note → one sticky card per package → includes matrix → the three questions
 * everyone asks, and the proposal prompt.
 */
export default function GrowthPackagesPage() {
  const copy = packagesV3;
  const band = ctaBands.packages;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Growth Packages", href: "/growth-packages" },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Growth Packages" }]}
        tag={copy.tag}
        title={packagesPage.h1Prefix}
        accent={packagesPage.h1Accent}
        line={copy.short}
        actions={
          <>
            <Button href={cta.primary.href} size="lg">
              {cta.primary.short}
            </Button>
            <Button href={cta.tertiary.href} variant="ghost" size="lg">
              {cta.tertiary.short}
            </Button>
          </>
        }
        art={<PackagesMini />}
      />

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <Overview note={copy.overview} text={packagesPage.intro} />
          <SectionHead index={2} tag={copy.panel.tag} title={copy.panel.title} className="mt-24 lg:mt-32" />
          <div className="mt-12">
            <PackagesPanel packages={growthPackages} />
          </div>
          <p className="type-mono-s mt-5 text-ink-2">{copy.note}</p>
        </div>
      </Sheet>

      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }} className="overflow-visible">
        <div className="container-page">
          <SectionHead index={3} tag={copy.stack.tag} title={copy.stack.title} />
          <StackCards
            className="mt-12"
            items={growthPackages.map((pkg, index) => ({
              key: pkg.slug,
              node: (
                <article
                  key={pkg.slug}
                  id={pkg.slug}
                  className="scroll-mt-28 grid min-w-0 gap-10 rounded-[var(--radius-lg)] border border-line bg-card p-6 shadow-[0_24px_48px_-32px_rgb(15_23_42/0.35)] sm:p-9 lg:grid-cols-12 lg:gap-8 lg:p-12"
                >
                  <div className="flex flex-col lg:col-span-4">
                    <p className="type-mono text-ink-2">{`.${String(index + 1).padStart(2, "0")} / 0${growthPackages.length}`}</p>
                    <h3 className="type-display-l mt-5 text-ink">{pkg.name}</h3>
                    <p className="type-body-l mt-3 max-w-xs text-pretty text-ink-2">{pkg.audience}</p>
                    <div className="mt-8 lg:mt-auto lg:pt-10">
                      <Button href={`${cta.tertiary.href}&package=${pkg.slug}`}>{cta.tertiary.short}</Button>
                    </div>
                  </div>
                  <div className="grid gap-8 lg:col-span-8 lg:grid-cols-2">
                    <div>
                      <p className="type-mono-s text-ink-2">{copy.stack.situation}</p>
                      {toParagraphs(pkg.situation).map((paragraph) => (
                        <p key={paragraph} className="type-body mt-3 text-pretty text-ink">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="type-mono-s text-ink-2">{copy.stack.whatWeDo}</p>
                      {toParagraphs(pkg.whatWeDo).map((paragraph) => (
                        <p key={paragraph} className="type-body mt-3 text-pretty text-ink">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="lg:col-span-2">
                      <p className="type-mono-s text-ink-2">{copy.stack.includes}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {pkg.includes.map((item) => (
                          <li key={item}>
                            <Chip wrap>{item}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative px-5 py-4 lg:col-span-2">
                      <Brackets />
                      <p className="type-body-s text-pretty text-ink-2">
                        <span className="type-mono-s mr-2 text-ink">{copy.stack.considerIf}</span>
                        {pkg.considerIf}
                      </p>
                    </div>
                  </div>
                </article>
              ),
            }))}
          />
        </div>
      </Sheet>

      <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={4} tag={copy.matrix.tag} title={copy.matrix.title} />
          <Reveal className="mt-12">
            <IncludesMatrix packages={growthPackages} />
          </Reveal>
        </div>
      </Sheet>

      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={5} tag={copy.questions.tag} title={copy.questions.title} />
          <ul className="mt-12 grid border-l border-t border-dashed border-line md:grid-cols-3">
            {packagesPage.howItWorks.map((item, index) => (
              <Reveal key={item.q} as="li" delay={index * 0.08} className="block border-b border-r border-dashed border-line p-6 sm:p-7">
                <h3 className="type-mono text-ink">{item.q}</h3>
                <p className="type-body mt-3 text-pretty text-ink-2">{item.a}</p>
              </Reveal>
            ))}
          </ul>
          <CtaRow
            className="mt-16"
            heading={band.heading}
            body={band.body}
            actions={
              <>
                <Button href={cta.tertiary.href}>{cta.tertiary.short}</Button>
                <Button href={cta.primary.href} variant="ghost">
                  {cta.primary.short}
                </Button>
              </>
            }
          />
        </div>
      </Sheet>
    </>
  );
}
