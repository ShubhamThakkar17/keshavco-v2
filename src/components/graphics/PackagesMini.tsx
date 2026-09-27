import WaveLines from "@/components/graphics/WaveLines";
import Brackets from "@/components/ui/Brackets";
import { growthPackages } from "@/content/packages";
import { homeV3 } from "@/content/home";

/**
 * /growth-packages hero art: the packages panel in miniature. Four columns,
 * the featured one in night with the wave texture, placeholder lines where
 * the inclusions sit. Decorative.
 */
export default function PackagesMini() {
  return (
    <div className="relative grid grid-cols-4 overflow-hidden rounded-[var(--radius-md)] border border-ink/15 bg-card">
      {growthPackages.map((pkg, index) => {
        const featured = pkg.slug === homeV3.packages.featured;
        return (
          <div
            key={pkg.slug}
            className={`relative flex aspect-[1/1.9] flex-col border-l border-ink/10 p-3 first:border-l-0 sm:p-4 ${
              featured ? "bg-night text-white" : "text-ink"
            }`}
          >
            {featured && (
              <span data-tone="night" className="absolute inset-0 overflow-hidden text-white">
                <WaveLines />
              </span>
            )}
            <span className="relative type-mono-s opacity-60">{`.${String(index + 1).padStart(2, "0")}`}</span>
            <span className="relative mt-3 font-display text-base font-semibold tracking-[-0.02em] sm:text-lg">
              {pkg.name}
            </span>
            <span className="relative mt-auto space-y-2">
              {[82, 64, 74].map((width) => (
                <span
                  key={width}
                  className={`block h-1.5 rounded-full ${featured ? "bg-white/25" : "bg-ink/10"}`}
                  style={{ width: `${width}%` }}
                />
              ))}
            </span>
            <span
              className={`relative mt-5 block h-6 rounded-[6px] ${featured ? "bg-white" : "border border-ink/15"}`}
            />
            {featured && <Brackets inset={6} />}
          </div>
        );
      })}
    </div>
  );
}
