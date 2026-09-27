import type { Metadata } from "next";

import PageHero from "@/components/layout/PageHero";
import Compare from "@/components/sections/Compare";
import AboutMark from "@/components/graphics/AboutMark";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import Reveal from "@/components/motion/Reveal";
import Sheet from "@/components/ui/Sheet";
import SectionHead from "@/components/ui/SectionHead";
import SectionTag from "@/components/ui/SectionTag";
import Overview from "@/components/ui/Overview";
import StatTile from "@/components/ui/StatTile";
import Brackets from "@/components/ui/Brackets";
import CtaRow from "@/components/ui/CtaRow";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/ui/JsonLd";

import { aboutPage, aboutV3 } from "@/content/about";
import { cta } from "@/content/site";
import { toParagraphs } from "@/lib/text";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ ...aboutPage.seo, path: "/about" });

/**
 * /about (brief §9.4): hero (mark + chevrons) → where we started → why we
 * exist (scroll-filled statement) → mission and vision → principles as big
 * numbered rows → how we are structured, with structural counts → founders
 * (only once real names and photos are supplied) → With / Without → CTA.
 */
export default function AboutPage() {
  const copy = aboutV3;
  const [whyLead, ...whyRest] = aboutPage.whyWeExist.body;
  let index = 1;
  const next = () => (index += 1);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ])}
      />

      <PageHero
        crumbs={[{ label: "About" }]}
        tag={copy.tag}
        title={aboutPage.h1}
        line={copy.short}
        actions={
          <>
            <Button href={cta.primary.href} size="lg">
              {cta.primary.short}
            </Button>
            <Button href={copy.processLink.href} variant="ghost" size="lg">
              {copy.processLink.label}
            </Button>
          </>
        }
        art={<AboutMark />}
      />

      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <Overview note={copy.overview} text={aboutPage.intro} />
          <div className="mt-24 grid gap-10 lg:mt-32 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionTag index={next()} label={copy.why.tag} />
              <h2 className="type-display-l mt-6 text-ink">{aboutPage.whyWeExist.heading}</h2>
            </div>
            <div className="lg:col-span-8">
              {/* Starts at half strength so even the unfilled words keep 3:1 contrast. */}
              <ScrollHighlightText text={whyLead} className="type-display-m text-balance text-ink" from={0.5} />
              <div className="mt-10 max-w-[62ch] space-y-5">
                {toParagraphs(whyRest).map((paragraph, i) => (
                  <Reveal key={i}>
                    <p className="type-body-l text-pretty text-ink-2">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Sheet>

      <Sheet tone="night" guides={{ accent: 3 }}>
        <div className="container-page">
          <SectionTag index={next()} label={copy.mission.tag} />
          <div className="mt-12 grid gap-3 lg:grid-cols-2">
            {aboutPage.missionVision.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08}>
                <div className="relative h-full rounded-[var(--radius-md)] border border-line-night bg-night-2 p-7 sm:p-10">
                  <Brackets inset={10} />
                  <h2 className="type-mono text-white/60">{item.label}</h2>
                  <p className="type-display-m mt-6 text-pretty text-white">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Sheet>

      <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={next()} tag={copy.values.tag} title={copy.values.title} />
          <ol className="mt-12 border-t border-line">
            {aboutPage.values.map((value, i) => (
              <Reveal key={value.title} as="li" className="block border-b border-line">
                <div className="grid gap-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
                  <p className="type-mono text-ink-2 lg:col-span-1">{`.${String(i + 1).padStart(2, "0")}`}</p>
                  <h3 className="type-display-m text-ink lg:col-span-4">{value.title}</h3>
                  <p className="type-body-l max-w-xl text-pretty text-ink-2 lg:col-span-7">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Sheet>

      <Sheet tone="paper-2" overlap={false} stack={false} guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={next()} tag={copy.structure.tag} title={copy.structure.title} />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-8">
            {[aboutPage.howWeWork, aboutPage.network].map((block) => (
              <div key={block.heading}>
                <h3 className="type-mono text-ink">{block.heading}</h3>
                <div className="mt-4 space-y-4">
                  {toParagraphs(block.body).map((paragraph, i) => (
                    <Reveal key={i}>
                      <p className="type-body text-pretty text-ink-2">{paragraph}</p>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {copy.stats.map((stat, i) => (
              <StatTile key={stat.label} value={stat.value} label={stat.label} delay={i * 120} className="bg-card" />
            ))}
          </div>
        </div>
      </Sheet>

      {copy.founders.people.length > 0 && (
        <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
          <div className="container-page">
            <SectionHead index={next()} tag={copy.founders.tag} title={copy.founders.title} />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {copy.founders.people.map((person) => (
                <li key={person.name} className="flex items-center gap-5 rounded-[var(--radius-md)] border border-line bg-card p-5">
                  <span className="relative grid h-20 w-20 place-items-center bg-paper-2 font-display text-2xl font-semibold text-ink">
                    <Brackets />
                    {person.initials}
                  </span>
                  <span>
                    <span className="type-display-m block text-ink">{person.name}</span>
                    <span className="type-mono-s mt-1 block text-ink-2">{person.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Sheet>
      )}

      <Sheet tone="night" guides={{ accent: 3 }}>
        <div className="container-page">
          <SectionHead index={next()} tag={copy.compare.tag} title={copy.compare.title} align="center" />
          <Compare />
        </div>
      </Sheet>

      <Sheet tone="paper" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <CtaRow
            tag={copy.cta.tag}
            heading={aboutPage.cta.heading}
            body={aboutPage.cta.body}
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
