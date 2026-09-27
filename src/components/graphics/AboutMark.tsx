import { LogoMark } from "@/components/ui/Logo";
import ChevronStack from "@/components/graphics/ChevronStack";
import Brackets from "@/components/ui/Brackets";

/**
 * /about hero art: the mark (never redrawn) in a bracketed, hatched tile, with
 * the chevron motif stepping away on either side. Decorative.
 */
export default function AboutMark() {
  return (
    <div className="relative mx-auto flex aspect-[5/4] w-full max-w-[30rem] items-center justify-center">
      <div className="absolute inset-y-[18%] left-0 right-0 flex items-center justify-between text-ink/25">
        <ChevronStack className="h-10 w-10 -rotate-90 opacity-40" />
        <ChevronStack className="h-10 w-10 rotate-90 opacity-40" />
      </div>
      <div className="absolute inset-y-[18%] left-[14%] right-[14%] flex items-center justify-between text-ink/45">
        <ChevronStack className="h-12 w-12 -rotate-90" loader />
        <ChevronStack className="h-12 w-12 rotate-90" loader />
      </div>
      <div className="hatch relative grid aspect-square w-[42%] place-items-center p-3">
        <Brackets inset={-8} />
        <div className="grid h-full w-full place-items-center bg-card">
          <LogoMark className="h-[46%] w-[46%]" />
        </div>
      </div>
    </div>
  );
}
