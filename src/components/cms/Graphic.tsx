import type { ReactNode } from "react";
import HeroEngine from "@/components/graphics/HeroEngine";
import ChannelHub from "@/components/graphics/ChannelHub";
import CapabilityArt from "@/components/graphics/capability";
import IndustryScene from "@/components/graphics/industry/IndustryScene";
import IndustryCluster from "@/components/graphics/IndustryCluster";
import PackagesMini from "@/components/graphics/PackagesMini";
import NetworkArt from "@/components/graphics/NetworkArt";
import AboutMark from "@/components/graphics/AboutMark";
import WaveLines from "@/components/graphics/WaveLines";
import DotField from "@/components/graphics/DotField";
import ProcessFlow from "@/components/sections/ProcessFlow";
import Compare from "@/components/sections/Compare";
import { processStages } from "@/content/process";
import type { GraphicKey } from "@/content/cms";

/**
 * The ready-made graphics an editor can pick (list: src/content/cms.ts).
 * Every one is decorative or carries its own screen-reader sentence, and all
 * of them pause offscreen and respect the Motion switch.
 */
export function renderGraphic(name: GraphicKey | string, id: string): ReactNode {
  if (name.startsWith("capability-")) {
    return <CapabilityArt slug={name.replace("capability-", "")} className="mx-auto h-auto w-full max-w-xl" />;
  }
  if (name.startsWith("industry-") && name !== "industry-cluster") {
    return <IndustryScene slug={name.replace("industry-", "")} className="mx-auto h-auto w-full max-w-xl" />;
  }
  switch (name) {
    case "hero-engine":
      return <HeroEngine idPrefix={id} />;
    case "channel-hub":
      return <ChannelHub />;
    case "process-flow":
      return <ProcessFlow stages={processStages} />;
    case "industry-cluster":
      return <div className="mx-auto max-w-lg"><IndustryCluster /></div>;
    case "packages":
      return <div className="mx-auto max-w-lg"><PackagesMini /></div>;
    case "network":
      return <div className="mx-auto max-w-xl"><NetworkArt /></div>;
    case "compare":
      return (
        <div data-tone="night" className="-mx-2 rounded-[var(--radius-md)] bg-night px-2 pb-2 pt-px text-white sm:-mx-4">
          <Compare />
        </div>
      );
    case "mark":
      return <AboutMark />;
    case "waves":
      return (
        <div data-tone="night" className="relative h-48 overflow-hidden rounded-[var(--radius-sm)] bg-night text-white sm:h-64">
          <WaveLines />
        </div>
      );
    case "dot-field":
      return (
        <div className="h-48 overflow-hidden rounded-[var(--radius-sm)] sm:h-64">
          <DotField tone="paper" amplitude={1} className="h-full w-full" />
        </div>
      );
    default:
      return null;
  }
}

/** A graphic block in an article: framed, with an optional mono caption. */
export default function Graphic({ name, caption, id }: { name: string; caption?: string; id: string }) {
  const graphic = renderGraphic(name, id);
  if (!graphic) return null;
  return (
    <figure className="not-prose my-10">
      <div className="text-ink/75 rounded-[var(--radius-md)] border border-line bg-card p-4 sm:p-8">{graphic}</div>
      {caption && <figcaption className="type-mono-s mt-3 text-ink-2">{caption}</figcaption>}
    </figure>
  );
}
