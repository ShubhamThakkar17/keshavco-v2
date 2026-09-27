"use client";

import GLCanvas from "@/components/graphics/gl/GLCanvas";
import type { TerrainOptions } from "@/components/graphics/gl/scenes/terrain";

const loadTerrain = () => import("@/components/graphics/gl/scenes/terrain");

/**
 * The dot-matrix growth landscape (WebGL, see `gl/scenes/terrain.ts`), used
 * as the hero's lower band and the footer's top bookend. The caller sizes it.
 * Without WebGL a static dot pattern stands in.
 */
export default function DotField({
  tone = "paper",
  amplitude = 1,
  className = "",
}: {
  tone?: TerrainOptions["tone"];
  amplitude?: number;
  className?: string;
}) {
  const dot = tone === "night" ? "rgb(124 58 237 / 0.35)" : "rgb(15 23 42 / 0.16)";
  return (
    <GLCanvas
      load={loadTerrain}
      options={{ tone, amplitude }}
      interactive
      className={className}
      fallback={
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${dot} 1px, transparent 1.2px)`,
            backgroundSize: "10px 10px",
            maskImage: "linear-gradient(to bottom, transparent, black 60%)",
          }}
        />
      }
    />
  );
}
