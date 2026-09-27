"use client";

import GLCanvas from "@/components/graphics/gl/GLCanvas";

const loadWordmark = () => import("@/components/graphics/gl/scenes/wordmark");

/**
 * The footer's giant "KeshavCo", built from dots in 3D (WebGL, see
 * `gl/scenes/wordmark.ts`). The real word is in the DOM as screen-reader text;
 * without WebGL it renders as plain gradient type.
 */
export default function DotWordmark({
  text,
  className = "h-[clamp(7rem,18vw,16.25rem)] w-full",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className="relative">
      <span className="sr-only">{text}</span>
      <GLCanvas
        load={loadWordmark}
        options={{ text }}
        interactive
        className={className}
        fallback={
          <p className="text-gradient-brand type-display-xxl absolute inset-0 grid place-items-center">
            {text}
          </p>
        }
      />
    </div>
  );
}
