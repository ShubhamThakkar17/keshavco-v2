"use client";

import { useSyncExternalStore } from "react";
import { setMotionOff } from "@/lib/motionPreference";
import { motionToggle } from "@/content/site";

/**
 * "Motion: On / Off" (brief §6.6). Flips `<html data-motion>`, which every
 * motion primitive and the global CSS honour, and remembers the choice.
 * Reflects only the site setting; the OS reduced-motion preference is
 * respected separately and cannot be overridden from here.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => observer.disconnect();
}
const getSnapshot = () => document.documentElement.getAttribute("data-motion") === "off";
const getServerSnapshot = () => false;

export default function MotionToggle({
  label = motionToggle.label,
  onLabel = motionToggle.on,
  offLabel = motionToggle.off,
  className = "",
}: {
  label?: string;
  onLabel?: string;
  offLabel?: string;
  className?: string;
}) {
  const off = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      aria-pressed={off}
      onClick={() => setMotionOff(!off)}
      className={`type-mono inline-flex items-center gap-2 ${className}`}
    >
      <span>{label}:</span>
      <span className={off ? "opacity-45" : "text-signal night:text-white"}>{onLabel}</span>
      <span aria-hidden="true" className="opacity-45">
        /
      </span>
      <span className={off ? "text-signal night:text-white" : "opacity-45"}>{offLabel}</span>
    </button>
  );
}
