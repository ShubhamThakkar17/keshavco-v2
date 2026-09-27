"use client";

import type { MotionValue } from "framer-motion";
import GLCanvas from "@/components/graphics/gl/GLCanvas";
import ChevronStack from "@/components/graphics/ChevronStack";
import type { ChevronOptions } from "@/components/graphics/gl/scenes/chevrons";

const loadChevrons = () => import("@/components/graphics/gl/scenes/chevrons");

/**
 * 3D particle sculpture: scattered points converge into the chevron stack
 * with the green eye (WebGL, see `gl/scenes/chevrons.ts`). Pass `progress`
 * to scrub it with scroll; otherwise it assembles once when first seen.
 * Without WebGL the flat chevron stack stands in.
 */
export default function ChevronParticles({
  tone = "night",
  progress,
  className = "aspect-square w-full",
}: {
  tone?: ChevronOptions["tone"];
  progress?: MotionValue<number>;
  className?: string;
}) {
  return (
    <GLCanvas
      load={loadChevrons}
      options={{ tone, mode: progress ? "scroll" : "auto" }}
      progress={progress}
      interactive
      fps={40}
      className={className}
      fallback={
        <div className="absolute inset-0 grid place-items-center text-signal">
          <ChevronStack eye className="h-1/2 w-1/2" />
        </div>
      }
    />
  );
}
