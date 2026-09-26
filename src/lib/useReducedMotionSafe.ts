"use client";

import { useSyncExternalStore } from "react";

/**
 * "Should this visitor get reduced motion?", resolved only after hydration.
 *
 * True when the OS asks for `prefers-reduced-motion: reduce` **or** the site's
 * own footer toggle has set `<html data-motion="off">`. Both are watched, so
 * flipping either updates every component live.
 *
 * The server snapshot is always `false`, so the first client render matches
 * the server's markup; React then re-renders with the real value. Components
 * that branch on this to render different markup (a split heading vs. a plain
 * string) therefore never hydrate with a mismatch. Reduced motion still wins,
 * one commit later.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function getSnapshot() {
  return (
    window.matchMedia(QUERY).matches ||
    document.documentElement.getAttribute("data-motion") === "off"
  );
}

const getServerSnapshot = () => false;

export default function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
