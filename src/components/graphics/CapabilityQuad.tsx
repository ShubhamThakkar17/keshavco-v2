import CapabilityArt from "@/components/graphics/capability";
import Crosshair from "@/components/ui/Crosshair";
import { pillars } from "@/content/services";

/**
 * /services hero art: the four capability illustrations in a 2 × 2 blueprint
 * grid with mono labels and a crosshair where the cells meet. Decorative
 * (the pillar rows below carry the words).
 */
export default function CapabilityQuad() {
  return (
    <div className="relative grid grid-cols-2 border-l border-t border-dashed border-ink/20">
      {pillars.map((pillar) => (
        <div key={pillar.slug} className="border-b border-r border-dashed border-ink/20 p-3 sm:p-4">
          <p className="type-mono-s text-ink-2">{pillar.name}</p>
          <CapabilityArt slug={pillar.slug} className="mt-1 h-auto w-full" />
        </div>
      ))}
      <Crosshair size={14} style={{ left: "50%", top: "50%" }} />
    </div>
  );
}
