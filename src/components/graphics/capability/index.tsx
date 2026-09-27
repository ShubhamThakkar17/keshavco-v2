import LiveSvg from "@/components/motion/LiveSvg";
import StrategyArt from "./Strategy";
import BrandingArt from "./Branding";
import TechnologyArt from "./Technology";
import DigitalMarketingArt from "./DigitalMarketing";

const art: Record<string, () => React.ReactElement> = {
  strategy: StrategyArt,
  branding: BrandingArt,
  technology: TechnologyArt,
  "digital-marketing": DigitalMarketingArt,
};

/**
 * The isometric illustration for a service pillar (brief §7.1). Decorative.
 * `active` controls the entrance (panels play it when they open); leave it
 * undefined to play when scrolled into view. Colour follows `currentColor`,
 * so set a text colour on the parent (ink on paper, white on night).
 */
export default function CapabilityArt({
  slug,
  active,
  className = "h-auto w-full",
}: {
  slug: string;
  active?: boolean;
  className?: string;
}) {
  const Art = art[slug] ?? StrategyArt;
  return (
    <span className="art block">
      <LiveSvg viewBox="0 0 400 320" className={className} drawn={active} fill="none">
        <Art />
      </LiveSvg>
    </span>
  );
}
