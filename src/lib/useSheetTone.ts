"use client";

import { useEffect, useState } from "react";

/**
 * Which tone ("paper" or "night") sits under the header's band, so the
 * floating nav can flip to its night styling over dark sheets (brief §9.1).
 *
 * Reads the stack of elements at a point 44px from the top (below the pill's
 * top edge), skipping the header itself, and takes the nearest ancestor with
 * `data-tone`. Updated on scroll and resize, at most once per frame.
 */
export default function useSheetTone(probeY = 44): "paper" | "night" {
  const [tone, setTone] = useState<"paper" | "night">("paper");

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const stack = document.elementsFromPoint(window.innerWidth / 2, probeY);
      for (const element of stack) {
        if (element.closest("header")) continue;
        const toned = element.closest<HTMLElement>("[data-tone]");
        if (toned) {
          setTone(toned.dataset.tone === "night" ? "night" : "paper");
          return;
        }
      }
      setTone("paper");
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [probeY]);

  return tone;
}
