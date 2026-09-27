import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import SectionHead from "@/components/ui/SectionHead";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";
import Brackets from "@/components/ui/Brackets";
import Crosshair from "@/components/ui/Crosshair";
import StatTile from "@/components/ui/StatTile";
import Accordion from "@/components/ui/Accordion";
import GiantWord from "@/components/ui/GiantWord";
import MotionToggle from "@/components/ui/MotionToggle";
import BlurInWords from "@/components/motion/BlurInWords";
import ScrambleText from "@/components/motion/ScrambleText";
import ScrambleRotate from "@/components/motion/ScrambleRotate";
import TextRoll from "@/components/motion/TextRoll";
import Odometer from "@/components/motion/Odometer";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import LiveSvg from "@/components/motion/LiveSvg";
import DrawPath from "@/components/motion/DrawPath";
import FlowLine from "@/components/motion/FlowLine";
import Magnetic from "@/components/motion/Magnetic";
import Marquee from "@/components/motion/Marquee";
import FooterReveal from "@/components/motion/FooterReveal";
import { GlDemo, PanelsDemo, StoryDemo } from "./LabDemos";
import HeroEngine from "@/components/graphics/HeroEngine";
import CapabilityArt from "@/components/graphics/capability";
import IndustryIcon from "@/components/graphics/industry/IndustryIcon";
import IndustryScene from "@/components/graphics/industry/IndustryScene";
import ProcessIcon from "@/components/graphics/process/ProcessIcon";
import { CheckIcon, CompareRowIcon, CrossIcon } from "@/components/graphics/CompareIcons";
import ChevronStack from "@/components/graphics/ChevronStack";
import WaveLines from "@/components/graphics/WaveLines";
import NotFoundArt from "@/components/graphics/NotFoundArt";
import ChannelHub from "@/components/graphics/ChannelHub";
import { industries } from "@/content/industries";
import { lab } from "@/content/lab";
import { homeFaqs } from "@/content/faq";
import { industryStrip } from "@/content/home";
import { pillars } from "@/content/services";

/**
 * /lab: the v3 primitive playground (brief §13 Phase 1). Not linked, not in
 * the sitemap (which is generated from content), and noindex.
 */
export const metadata: Metadata = {
  title: lab.seo.title,
  description: lab.seo.description,
  robots: { index: false, follow: false },
};

const swatches = [
  ["paper", "bg-paper"],
  ["paper-2", "bg-paper-2"],
  ["paper-3", "bg-paper-3"],
  ["card", "bg-card"],
  ["night", "bg-night"],
  ["night-2", "bg-night-2"],
  ["night-3", "bg-night-3"],
  ["ink", "bg-ink"],
  ["ink-2", "bg-ink-2"],
  ["ink-3", "bg-ink-3"],
  ["signal", "bg-signal"],
  ["signal-2", "bg-signal-2"],
  ["growth", "bg-growth"],
  ["growth-ink", "bg-growth-ink"],
] as const;

const typeScale = [
  ["type-display-xl", "display-xl"],
  ["type-display-l", "display-l"],
  ["type-display-m", "display-m"],
  ["type-stat", "stat"],
  ["type-body-l", "body-l"],
  ["type-body", "body"],
  ["type-body-s", "body-s"],
  ["type-mono", "mono"],
  ["type-mono-s", "mono-s"],
] as const;

function UiShowcase() {
  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-12">
      <div className="space-y-10 lg:col-span-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact#book">{lab.labels.solid}</Button>
          <Button href="#lab-story" variant="ghost">
            {lab.labels.ghost}
          </Button>
          <Button href="/services" variant="link">
            {lab.labels.link}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact#book" size="lg">
            {lab.labels.solid}
          </Button>
          <Button href="#lab-story" size="lg" variant="ghost">
            {lab.labels.ghost}
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {lab.labels.chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-10">
          <div className="type-mono-s relative grid h-24 w-40 place-items-center">
            <Brackets />
            {lab.labels.brackets}
          </div>
          <div className="type-mono-s relative h-24 w-40">
            <span className="absolute inset-x-0 top-1/2 h-px bg-line night:bg-line-night" />
            <span className="absolute inset-y-0 left-1/2 w-px bg-signal/35" />
            <Crosshair style={{ left: "50%", top: "50%" }} />
            <span className="absolute bottom-0 left-0">{lab.labels.crosshair}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:col-span-6">
        {lab.counters.map((counter, index) => (
          <StatTile
            key={counter.label}
            value={counter.value}
            label={counter.label}
            delay={index * 120}
          />
        ))}
      </div>
    </div>
  );
}

export default function LabPage() {
  // Gated (brief Phase 8): the playground only exists when NEXT_PUBLIC_LAB=1.
  if (process.env.NEXT_PUBLIC_LAB !== "1") notFound();
  return (
    <>
      {/* ------------------------------------------------------------ Cover */}
      <Sheet
        tone="night"
        overlap={false}
        stack={false}
        pad={false}
        guides={{ accent: 0, rules: ["168px"], animate: true }}
        className="pb-24 pt-44 lg:pb-32"
      >
        <div className="container-page">
          <SectionTag index={0} label={lab.cover.tag} trigger="mount" />
          <h1 className="type-display-xl mt-6 max-w-4xl">
            <BlurInWords text={lab.cover.title} />
          </h1>
          <p className="type-body-l mt-6 max-w-xl text-white/65">{lab.cover.line}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <span className="type-mono-s text-white/60">{lab.cover.motionLabel}</span>
            <MotionToggle className="text-white" />
          </div>
        </div>
      </Sheet>

      {/* ----------------------------------------------------------- Tokens */}
      <Sheet tone="paper-2" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead index={1} tag={lab.sections.tokens.tag} title={lab.sections.tokens.title} />
          <p className="type-mono-s mt-14 text-ink-2">{lab.labels.swatches}</p>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-7">
            {swatches.map(([name, cls]) => (
              <div key={name}>
                <span className={`block h-16 rounded-[var(--radius-sm)] border border-line ${cls}`} />
                <span className="type-mono-s mt-2 block text-ink-2">{name}</span>
              </div>
            ))}
          </div>
          <p className="type-mono-s mt-14 text-ink-2">{lab.labels.typeScale}</p>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {typeScale.map(([cls, name]) => (
              <div key={name} className="grid gap-2 py-5 lg:grid-cols-12 lg:items-baseline">
                <span className="type-mono-s text-ink-2 lg:col-span-2">{name}</span>
                <span className={`${cls} truncate lg:col-span-10`}>{lab.specimen}</span>
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* --------------------------------------------------------- UI paper */}
      <Sheet tone="paper" guides={{ accent: 3, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead
            index={2}
            tag={lab.sections.uiPaper.tag}
            title={lab.sections.uiPaper.title}
            line={lab.sections.uiPaper.line}
            action={
              <Button href="/services" variant="link">
                {lab.labels.link}
              </Button>
            }
          />
          <UiShowcase />
          <div className="mt-16 max-w-3xl">
            <Accordion items={homeFaqs.slice(0, 3)} />
          </div>
        </div>
      </Sheet>

      {/* --------------------------------------------------------- UI night */}
      <Sheet tone="night" guides={{ accent: 0, rules: ["pad"] }}>
        <div className="container-page">
          <SectionHead
            index={3}
            tag={lab.sections.uiNight.tag}
            title={lab.sections.uiNight.title}
            line={lab.sections.uiNight.line}
            action={
              <Button href="/services" variant="link">
                {lab.labels.link}
              </Button>
            }
          />
          <UiShowcase />
          <div className="mt-16 max-w-3xl">
            <Accordion items={homeFaqs.slice(0, 3)} variant="pills" defaultOpen={0} />
          </div>
        </div>
      </Sheet>

      {/* ------------------------------------------------------ Text motion */}
      <Sheet tone="paper-2" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={4} tag={lab.sections.text.tag} title={lab.sections.text.title} />
          <div className="mt-16 grid gap-14 lg:grid-cols-2">
            <div className="space-y-8">
              <p className="type-display-l">
                <BlurInWords text={lab.specimen} delay={0} />
              </p>
              <p className="type-mono text-signal">
                <ScrambleText text={lab.labels.scramble} />
              </p>
              <p className="type-mono text-ink">
                {lab.labels.rotatePrefix} <ScrambleRotate phrases={lab.rotating} className="text-signal" />
              </p>
              <p className="type-display-m">
                <a href="#lab-story" className="roll-host inline-block">
                  <TextRoll>{lab.labels.ghost}</TextRoll>
                </a>
              </p>
              <div className="flex items-end gap-8">
                <span className="type-stat">
                  <Odometer value={26} />
                </span>
                <span className="type-stat">
                  <Odometer value={7} delay={200} />
                </span>
                <span className="type-mono-s pb-2 text-ink-2">{lab.labels.odometer}</span>
              </div>
            </div>
            <ScrollHighlightText text={lab.manifesto} className="type-display-m" from={0.16} />
          </div>
        </div>
      </Sheet>

      {/* --------------------------------------------------------- Diagrams */}
      <Sheet tone="paper" guides={{ accent: 2 }}>
        <div className="container-page">
          <SectionHead index={5} tag={lab.sections.diagrams.tag} title={lab.sections.diagrams.title} />
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-12">
            <div className="relative border border-line bg-card p-6 lg:col-span-8">
              <LiveSvg viewBox="0 0 640 300" className="h-auto w-full text-ink/70">
                {lab.labels.diagramInputs.map((label, index) => {
                  const y = 60 + index * 90;
                  return (
                    <g key={label}>
                      <rect x="20" y={y - 22} width="120" height="44" className="fill-card stroke-current" strokeWidth="1.25" />
                      <text x="36" y={y + 4} className="fill-current font-mono text-[11px]">
                        {label}
                      </text>
                      <FlowLine
                        d={`M140 ${y} C 220 ${y}, 220 150, 290 150`}
                        packets={1}
                        begin={index * 0.6}
                        index={index}
                        className="stroke-ink/50"
                      />
                    </g>
                  );
                })}
                <rect x="290" y="100" width="100" height="100" className="fill-card stroke-current" strokeWidth="1.25" />
                {[0, 1, 2].map((n) => (
                  <DrawPath
                    key={n}
                    index={n}
                    d={`M${315 + n * 8} ${176 - n * 10} L340 ${128 + n * 10} L${365 - n * 8} ${176 - n * 10}`}
                    fill="none"
                    className="stroke-signal"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
                <FlowLine d="M390 150 L 500 150" packets={2} duration={1.6} index={4} className="stroke-ink/50" packetClassName="fill-growth" />
                <rect x="500" y="128" width="120" height="44" className="fill-card stroke-current" strokeWidth="1.25" />
                <circle cx="604" cy="150" r="4" className="fill-growth" />
                <text x="514" y="154" className="fill-current font-mono text-[11px]">
                  {lab.labels.diagramOutput}
                </text>
              </LiveSvg>
              <Brackets inset={-6} />
            </div>
            <div className="lg:col-span-4">
              <Magnetic>
                <Button href="/contact#book" size="lg">
                  {lab.labels.solid}
                </Button>
              </Magnetic>
              <p className="type-mono-s mt-4 text-ink-2">{lab.labels.magnetic}</p>
            </div>
          </div>
        </div>
      </Sheet>

      {/* --------------------------------------------------------------- 3D */}
      <Sheet tone="paper-2" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={10} tag={lab.sections.gl.tag} title={lab.sections.gl.title} />
          <div className="mt-14">
            <GlDemo />
          </div>
        </div>
      </Sheet>

      {/* ---------------------------------------------------- Hero engine */}
      <Sheet tone="paper-2" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={11} tag={lab.sections.engine.tag} title={lab.sections.engine.title} />
          <div className="mx-auto mt-14 max-w-3xl text-ink/70">
            <HeroEngine idPrefix="lab-engine" />
          </div>
        </div>
      </Sheet>

      {/* ------------------------------------------------- Capability art */}
      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={12} tag={lab.sections.capability.tag} title={lab.sections.capability.title} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.slug} className="rounded-[var(--radius-md)] border border-line bg-card p-4 text-ink/70">
                <p className="type-mono-s text-ink-2">{pillar.name}</p>
                <CapabilityArt slug={pillar.slug} />
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2" data-tone="night">
            {pillars.slice(0, 2).map((pillar) => (
              <div key={pillar.slug} className="rounded-[var(--radius-md)] bg-night-2 p-4 text-white/70">
                <p className="type-mono-s text-white/60">{pillar.name}</p>
                <CapabilityArt slug={pillar.slug} />
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* ------------------------------------------------- Industry scenes */}
      <Sheet tone="paper-2" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={13} tag={lab.sections.industries.tag} title={lab.sections.industries.title} />
          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry.slug} className="group bg-paper-2 p-5 text-ink/70">
                <div className="flex items-center gap-3">
                  <span className="grid h-14 w-14 place-items-center border border-line bg-card text-ink">
                    <IndustryIcon slug={industry.slug} />
                  </span>
                  <span className="type-mono-s text-ink">{industry.name}</span>
                </div>
                <IndustryScene slug={industry.slug} className="mt-4 h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </Sheet>

      {/* ------------------------------------------------------ Small parts */}
      <Sheet tone="paper" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={14} tag={lab.sections.parts.tag} title={lab.sections.parts.title} />
          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div className="space-y-10">
              <div className="flex flex-wrap items-end gap-8">
                {lab.labels.processStages.map((stage, i) => (
                  <div key={stage} className="text-center">
                    <span className="relative inline-grid place-items-center p-2 text-ink">
                      {i === 2 && <Brackets inset={-4} />}
                      <ProcessIcon stage={stage} active={i === 2 || i === 3 || i === 4} />
                    </span>
                    <p className="type-mono-s mt-2 text-ink-2">{stage}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-6 text-ink">
                <span className="text-growth-ink"><CheckIcon /></span>
                <span className="text-ink-2"><CrossIcon /></span>
                {lab.labels.compareRows.map((row) => (
                  <CompareRowIcon key={row} kind={row} />
                ))}
              </div>
              <div className="flex items-center gap-8 text-signal">
                <ChevronStack eye className="h-12 w-12" />
                <span className="flex items-center gap-3">
                  <ChevronStack loader className="h-8 w-8" />
                  <span className="type-mono-s text-ink-2">{lab.labels.loader}</span>
                </span>
              </div>
              <div className="text-ink/70">
                <NotFoundArt />
              </div>
            </div>
            <div className="relative min-h-80 overflow-hidden rounded-[var(--radius-md)] bg-night text-white" data-tone="night">
              <WaveLines />
            </div>
          </div>
        </div>
      </Sheet>

      {/* ------------------------------------------------------ Channel hub */}
      <Sheet tone="paper-2" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={15} tag={lab.sections.hub.tag} title={lab.sections.hub.title} />
          <div className="mx-auto mt-14 max-w-3xl text-ink/70">
            <ChannelHub />
          </div>
        </div>
      </Sheet>

      {/* ------------------------------------------------------------ Story */}
      <Sheet tone="paper-2" pad={false} id="lab-story">
        <StoryDemo />
      </Sheet>

      {/* ----------------------------------------------------------- Panels */}
      <Sheet tone="night" guides={{ accent: 0 }}>
        <div className="container-page">
          <SectionHead index={7} tag={lab.sections.panels.tag} title={lab.sections.panels.title} />
          <div className="mt-14">
            <PanelsDemo pillars={pillars} />
          </div>
        </div>
      </Sheet>

      {/* ---------------------------------------------------------- Ambient */}
      <Sheet tone="paper" guides={{ accent: 0 }}>
        <GiantWord word={lab.sections.ambient.tag.split(" ")[0]} />
        <div className="container-page">
          <SectionHead index={8} tag={lab.sections.ambient.tag} title={lab.sections.ambient.title} />
        </div>
        <div className="mt-14 border-y border-line py-5">
          <Marquee baseVelocity={2} className="type-mono text-ink">
            {industryStrip.items.map((item) => (
              <span key={item} className="flex items-center gap-10 pr-10">
                {item.toUpperCase()}
                <span aria-hidden="true" className="text-signal">
                  +
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </Sheet>

      {/* ---------------------------------------------------- Footer reveal */}
      <Sheet tone="paper-2">
        <div className="container-page">
          <SectionHead index={9} tag={lab.sections.footer.tag} title={lab.sections.footer.title} />
          <p className="type-mono-s mt-10 text-ink-2">{lab.labels.scrollHint}</p>
          <div className="mt-4 h-[420px] overflow-y-auto rounded-[var(--radius-md)] border border-line bg-night" data-lenis-prevent>
            <div className="relative z-[1] h-[560px] rounded-b-[var(--radius-lg)] bg-paper p-8">
              <p className="type-display-m">{lab.specimen}</p>
            </div>
            <FooterReveal as="div" className="bg-night p-8 text-white">
              <div data-tone="night">
                <SectionTag index={9} label={lab.sections.footer.tag} />
                <p className="type-display-l mt-6">{lab.footerWords[0]}</p>
              </div>
            </FooterReveal>
          </div>
        </div>
      </Sheet>
    </>
  );
}
