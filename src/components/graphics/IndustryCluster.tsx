import IndustryIcon from "@/components/graphics/industry/IndustryIcon";
import Brackets from "@/components/ui/Brackets";
import { industries } from "@/content/industries";

/**
 * /industries hero art: the seven industry icons as a blueprint tile cluster
 * (4 over 3, offset half a tile), each with its mono name. Decorative.
 */
export default function IndustryCluster() {
  const rows = [industries.slice(0, 4), industries.slice(4)];
  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={`grid grid-cols-4 gap-2 ${rowIndex === 1 ? "pl-[12.5%] pr-[12.5%] [grid-template-columns:repeat(3,minmax(0,1fr))]" : ""}`}>
          {row.map((industry, index) => (
            <div
              key={industry.slug}
              className="relative flex aspect-square flex-col items-center justify-center gap-2 border border-dashed border-ink/20 bg-card/60 p-2 text-ink"
            >
              {rowIndex === 0 && index === 1 && <Brackets inset={-4} />}
              <IndustryIcon slug={industry.slug} className="h-9 w-9 sm:h-11 sm:w-11" />
              <span className="type-mono-s hidden text-center text-[0.5625rem] text-ink-2 sm:block">{industry.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
