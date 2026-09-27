import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import StatTile from "@/components/ui/StatTile";
import Button from "@/components/ui/Button";
import BlurInWords from "@/components/motion/BlurInWords";
import ScrambleRotate from "@/components/motion/ScrambleRotate";
import Magnetic from "@/components/motion/Magnetic";
import Parallax from "@/components/motion/Parallax";
import HeroEngine from "@/components/graphics/HeroEngine";
import DotField from "@/components/graphics/DotField";
import { homeV3, proofCounters } from "@/content/home";
import { cta, site } from "@/content/site";

/**
 * S1 Hero (brief §9.2): an inset card with the blueprint guides drawing in,
 * the tagline as the H1 (blur-in, LCP-safe), the mono rotator, one line, two
 * CTAs, the hero engine on the right, and the four structural stats over a
 * 3D dot landscape. The card recedes as the page scrolls over it.
 */
export default function HomeHero() {
  const { hero } = homeV3;
  return (
    <Sheet
      tone="paper-2"
      inset
      pad={false}
      guides={{ accent: 0, animate: true }}
      className="lg:min-h-[min(calc(100svh-24px),920px)]"
    >
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 h-[34%] min-h-40 [mask-image:linear-gradient(to_bottom,transparent,black_45%)]">
        <DotField tone="paper" amplitude={0.9} className="h-full w-full" />
      </div>

      <div className="container-page relative pb-8 pt-28 md:pb-10 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <Parallax speed={0.06} className="lg:col-span-6">
            <SectionTag index={1} label={hero.tag} trigger="mount" />
            <h1 className="type-display-xl mt-6 max-w-[12ch] text-ink">
              <BlurInWords text={site.tagline} />
            </h1>
            <p className="type-mono mt-7 text-ink">
              {hero.rotatorPrefix} <ScrambleRotate phrases={hero.rotator} className="text-signal" />
            </p>
            <p className="type-body-l mt-5 max-w-md text-pretty text-ink-2">{hero.line}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic className="w-full sm:w-auto">
                <Button href={cta.primary.href} size="lg" className="w-full sm:w-auto">
                  {cta.primary.short}
                </Button>
              </Magnetic>
              <Button href={hero.secondary.href} variant="ghost" size="lg" className="w-full sm:w-auto">
                {hero.secondary.label}
              </Button>
            </div>
          </Parallax>

          <Parallax speed={0.03} className="text-ink/70 lg:col-span-6">
            <HeroEngine idPrefix="hero-engine" />
          </Parallax>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 lg:mt-16 lg:grid-cols-4">
          {proofCounters.map((counter, index) => (
            <StatTile
              key={counter.label}
              value={counter.value}
              label={homeV3.statLabels[index]}
              delay={900 + index * 120}
              className="bg-paper-2/70 backdrop-blur-[2px]"
            />
          ))}
        </div>
      </div>
    </Sheet>
  );
}
