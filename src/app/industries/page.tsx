import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import IndustryCluster from "@/components/graphics/IndustryCluster";
import IndustryScene from "@/components/graphics/industry/IndustryScene";
import StackCards from "@/components/motion/StackCards";
import Reveal from "@/components/motion/Reveal";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import Overview from "@/components/ui/Overview";
import CtaRow from "@/components/ui/CtaRow";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { industries, industriesPage, industriesV3 } from "@/content/industries";
import { ctaBands } from "@/content/misc";
import { cta } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  ...industriesPage.seo,
  path: "/industries",
});

/**
 * /industries (brief §9.4, decision log #4): hero → overview → IndustryStack,
 * seven sticky night cards led by each industry's animated isometric scene
 * (in place of photographs), numbered 01 to 07 → also working with → CTA.
 * Each card keeps `id={slug}` for the home page links.
 */
export default function IndustriesPage() {
  const copy = industriesV3;
  const band = ctaBands.industries;
  const total = String(industries.length).padStart(2, "0");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
        ])}
      />

      <PageHero
        crumbs={[{ label: "Industries" }]}
        tag={copy.tag}
        title={industriesPage.h1}
        line={copy.short}
        actions={
          <>
            <Button href={cta.primary.href} size="lg">
              {cta.primary.short}
            </Button>
            <Button href={`#${industries[0].slug}`} variant="ghost" size="lg">
              {copy.jump}
            </Button>
          </>
        }
        art={<IndustryCluster />}
      />

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <Overview note={copy.overview} text={industriesPage.intro} />
          <SectionHead index={2} tag={copy.stack.tag} title={copy.stack.title} className="mt-24 lg:mt-32" />
          <StackCards
            className="mt-12"
            items={industries.map((industry, index) => ({
              key: industry.slug,
              node: (
                <article
                  key={industry.slug}
                  id={industry.slug}
                  data-tone="night"
                  className="grain relative scroll-mt-28 overflow-hidden rounded-[var(--radius-lg)] bg-night text-white"
                  style={{ "--grain-opacity": 0.22 } as React.CSSProperties}
                >
                  <div className="relative z-[1] grid gap-8 p-6 sm:p-9 lg:min-h-[min(calc(100svh-140px),680px)] lg:grid-cols-12 lg:gap-8 lg:p-12">
                    <div className="flex flex-col lg:col-span-5">
                      <p className="type-stat text-white">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="type-display-l mt-8 lg:mt-auto">{industry.name}</h3>
                      <p className="type-body-l mt-4 max-w-md text-pretty text-white/70">{industry.tagline}</p>
                      <p className="type-mono-s mt-8 text-white/60">{copy.help}</p>
                      <p className="type-body mt-2 max-w-md text-pretty text-white/85">{industry.helpLine}</p>
                      <p className="type-mono-s mt-6 text-white/60">{copy.work}</p>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {industry.typicalWork.map((item) => (
                          <li key={item}>
                            <Chip wrap>{item}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative hidden lg:col-span-7 lg:flex lg:flex-col">
                      <p className="type-stat self-end text-white/25">{total}</p>
                      <div className="flex flex-1 items-center justify-center text-white/75">
                        <IndustryScene slug={industry.slug} className="h-auto w-full max-w-[34rem]" />
                      </div>
                    </div>
                    <div className="mx-auto w-full max-w-sm text-white/75 lg:hidden">
                      <IndustryScene slug={industry.slug} className="h-auto w-full" />
                    </div>
                  </div>
                </article>
              ),
            }))}
          />
        </div>
      </Sheet>

      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={3} tag={copy.also.tag} title={`${industriesPage.alsoWorkingWith.heading}.`} />
          <p className="type-body-l mt-6 max-w-2xl text-pretty text-ink-2">{industriesPage.alsoWorkingWith.note}</p>
          <Reveal className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {industriesPage.alsoWorkingWith.items.map((item) => (
                <li key={item} className="type-mono inline-flex h-10 items-center rounded-[var(--radius-sm)] border border-line bg-card px-4 text-ink">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <CtaRow
            className="mt-16"
            heading={band.heading}
            body={band.body}
            actions={
              <>
                <Button href={cta.primary.href}>{cta.primary.short}</Button>
                <Button href={cta.secondary.href} variant="ghost">
                  {cta.secondary.short}
                </Button>
              </>
            }
          />
        </div>
      </Sheet>
    </>
  );
}
